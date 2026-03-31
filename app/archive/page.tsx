import { supabase } from '../../lib/supabase'
import Link from 'next/link'

export const revalidate = 0

interface SendWithArticles {
  id: string
  sent_date: string
  sent_at: string
  subscriber_count: number
  newsletter_articles: {
    source: string
    horveil_take: string | null
    position: number
  }[]
}

async function getSends(): Promise<SendWithArticles[]> {
  const { data } = await supabase
    .from('newsletter_sends')
    .select(`
      id,
      sent_date,
      sent_at,
      subscriber_count,
      newsletter_articles (
        source,
        horveil_take,
        position
      )
    `)
    .order('sent_at', { ascending: false })

  return data || []
}

function groupByMonth(sends: SendWithArticles[]) {
  const groups: Record<string, SendWithArticles[]> = {}
  sends.forEach(send => {
    const date = new Date(send.sent_date)
    const key = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    if (!groups[key]) groups[key] = []
    groups[key].push(send)
  })
  return groups
}

export default async function ArchivePage() {
  const sends = await getSends()
  const grouped = groupByMonth(sends)

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px' }}>

      <div style={{ marginBottom: '8px' }}>
        <Link href="/" style={{ fontSize: '13px', color: 'var(--gold)', textDecoration: 'none' }}>Horveil</Link>
        <span style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 8px' }}>›</span>
        <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Archive</span>
      </div>

      <div style={{ marginBottom: '40px', marginTop: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 500, color: 'var(--foreground)', margin: '0 0 8px' }}>Archive</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: 0 }}>Every edition, every take. The full record.</p>
      </div>

      {sends.length === 0 ? (
        <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '48px' }}>No editions yet.</p>
      ) : (
        Object.entries(grouped).map(([month, monthSends]) => (
          <div key={month}>
            <div style={{
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              fontWeight: 500,
              margin: '2rem 0 0.75rem',
              paddingBottom: '8px',
              borderBottom: '1px solid var(--border)',
            }}>
              {month}
            </div>

            {monthSends.map(send => {
              const date = new Date(send.sent_date)
              const day = date.getDate()
              const dow = date.toLocaleDateString('en-US', { weekday: 'short' })
              const sources = send.newsletter_articles
                .sort((a, b) => a.position - b.position)
                .map(a => a.source)
              const leadTake = send.newsletter_articles
                .sort((a, b) => a.position - b.position)
                .find(a => a.horveil_take)?.horveil_take

              return (
                <Link
                  key={send.id}
                  href={`/archive/${send.sent_date}`}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <div style={{
                    background: 'white',
                    borderRadius: '14px',
                    border: '1px solid var(--border)',
                    padding: '1rem 1.25rem',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    transition: 'border-color 0.15s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#8b6f47')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  >
                    <div style={{ minWidth: '52px', textAlign: 'center', paddingTop: '2px' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 500, color: 'var(--foreground)', lineHeight: 1 }}>{day}</div>
                      <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '3px' }}>{dow}</div>
                    </div>
                    <div style={{ width: '1px', background: 'var(--border)', alignSelf: 'stretch', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                        {sources.map(source => (
                          <span key={source} style={{
                            fontSize: '0.7rem',
                            color: 'var(--gold)',
                            background: 'var(--gold-pale)',
                            padding: '3px 8px',
                            borderRadius: '100px',
                            whiteSpace: 'nowrap',
                          }}>{source}</span>
                        ))}
                      </div>
                      {leadTake && (
                        <p style={{
                          fontFamily: 'var(--font-display)',
                          fontStyle: 'italic',
                          fontSize: '0.875rem',
                          color: 'var(--muted)',
                          lineHeight: 1.5,
                          borderLeft: '2px solid var(--gold)',
                          paddingLeft: '10px',
                          margin: '0 0 6px',
                        }}>
                          {leadTake}
                        </p>
                      )}
                      <p style={{ fontSize: '0.75rem', color: 'var(--subtle)', margin: 0 }}>
                        {sources.length} {sources.length === 1 ? 'story' : 'stories'} · {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ))
      )}

      <div style={{
        marginTop: '3rem',
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
