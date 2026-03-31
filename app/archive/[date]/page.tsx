import { supabase } from '../../../lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 3600

interface Article {
  id: string
  title: string
  url: string
  source: string
  image_url: string | null
  horveil_take: string | null
  published_at: string
  position: number
}

interface Send {
  id: string
  sent_date: string
  sent_at: string
  subscriber_count: number
  newsletter_articles: Article[]
}

async function getEdition(date: string): Promise<Send | null> {
  const { data } = await supabase
    .from('newsletter_sends')
    .select(`
      id,
      sent_date,
      sent_at,
      subscriber_count,
      newsletter_articles (
        id,
        title,
        url,
        source,
        image_url,
        horveil_take,
        published_at,
        position
      )
    `)
    .eq('sent_date', date)
    .order('sent_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  return data || null
}

async function getAdjacentEditions(date: string) {
  const { data: all } = await supabase
    .from('newsletter_sends')
    .select('sent_date')
    .order('sent_date', { ascending: true })

  if (!all) return { prev: null, next: null }

  const index = all.findIndex(s => s.sent_date === date)
  return {
    prev: index > 0 ? all[index - 1].sent_date : null,
    next: index < all.length - 1 ? all[index + 1].sent_date : null,
  }
}

export async function generateMetadata({ params }: { params: { date: string } }) {
  const edition = await getEdition(params.date)
  if (!edition) return {}

  const date = new Date(edition.sent_date).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  })

  const sources = edition.newsletter_articles
    .sort((a, b) => a.position - b.position)
    .map(a => a.source)
    .join(', ')

  return {
    title: `Horveil · ${date}`,
    description: `Watch news digest from ${date}. Stories from ${sources}.`,
  }
}

export default async function EditionPage({ params }: { params: { date: string } }) {
  const edition = await getEdition(params.date)
  if (!edition) notFound()

  const { prev, next } = await getAdjacentEditions(params.date)

  const articles = edition.newsletter_articles.sort((a, b) => a.position - b.position)

  const dateFormatted = new Date(edition.sent_date).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  })

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px' }}>

      {/* Breadcrumb */}
      <div style={{ marginBottom: '32px' }}>
        <Link href="/" style={{ fontSize: '13px', color: 'var(--gold)', textDecoration: 'none' }}>Horveil</Link>
        <span style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 8px' }}>›</span>
        <Link href="/archive" style={{ fontSize: '13px', color: 'var(--gold)', textDecoration: 'none' }}>Archive</Link>
        <span style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 8px' }}>›</span>
        <span style={{ fontSize: '13px', color: 'var(--muted)' }}>{dateFormatted}</span>
      </div>

      {/* Header */}
      <div style={{
        textAlign: 'center',
        padding: '2rem 0 2.5rem',
        borderBottom: '1px solid var(--border)',
        marginBottom: '2rem',
      }}>
        <img
          src="/wordmark_split.svg"
          alt="Horveil"
          style={{ height: '32px', width: 'auto', display: 'inline-block', marginBottom: '16px' }}
        />
        <div style={{ width: '40px', height: '1px', background: 'var(--gold)', margin: '0 auto 16px' }} />
        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: 0 }}>
          {dateFormatted} · {articles.length} {articles.length === 1 ? 'story' : 'stories'} worth your time
        </p>
      </div>

      {/* Stories */}
      {articles.map((article, i) => (
        <div key={article.id} style={{
          background: 'white',
          borderRadius: '14px',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          marginBottom: '16px',
        }}>
          {article.image_url && (
            <img
              src={article.image_url}
              alt={article.title}
              style={{
                width: '100%',
                height: i === 0 ? '220px' : '160px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          )}
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <div style={{
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '8px',
            }}>
              {article.source}
            </div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: i === 0 ? '1.2rem' : '1rem',
                fontWeight: 500,
                color: 'var(--foreground)',
                textDecoration: 'none',
                lineHeight: 1.35,
                display: 'block',
                marginBottom: '12px',
              }}
            >
              {article.title}
            </a>
            {article.horveil_take && (
              <div style={{
                borderLeft: '2px solid var(--gold)',
                paddingLeft: '12px',
                marginBottom: '14px',
              }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: '0.9rem',
                  color: 'var(--gold)',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  "{article.horveil_take}" <span style={{ fontStyle: 'normal', fontSize: '0.8rem', color: 'var(--subtle)' }}>— S</span>
                </p>
              </div>
            )}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.8rem', color: 'var(--gold)', textDecoration: 'none' }}
            >
              Read the full story →
            </a>
          </div>
        </div>
      ))}

      {/* Prev / Next navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '2.5rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid var(--border)',
        fontSize: '0.85rem',
      }}>
        {prev ? (
          <Link href={`/archive/${prev}`} style={{ color: 'var(--gold)', textDecoration: 'none' }}>
            ← {new Date(prev).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </Link>
        ) : <span />}
        <Link href="/archive" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Archive</Link>
        {next ? (
          <Link href={`/archive/${next}`} style={{ color: 'var(--gold)', textDecoration: 'none' }}>
            {new Date(next).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} →
          </Link>
        ) : <span />}
      </div>

      {/* Subscribe CTA */}
      <div style={{
        marginTop: '2rem',
        background: 'var(--dark)',
        borderRadius: '18px',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <p style={{ color: '#857f78', fontSize: '0.9rem', margin: '0 0 12px' }}>Get the next edition in your inbox.</p>
        <Link href="/#subscribe" style={{
          background: 'var(--gold)',
          color: 'white',
          fontSize: '0.85rem',
          padding: '10px 22px',
          borderRadius: '100px',
          textDecoration: 'none',
          display: 'inline-block',
        }}>
          Subscribe free
        </Link>
      </div>

    </div>
  )
}
