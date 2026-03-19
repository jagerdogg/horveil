import { supabase } from '../../lib/supabase'
import ArticleImage from './ArticleImage'

interface Article {
  id: string
  title: string
  url: string
  source: string
  published_at: string
  summary: string
  image_url: string | null
  tag: string
  horveil_take: string | null
  featured: boolean
}

async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('Error fetching articles:', error)
    return []
  }

  return data || []
}

export default async function Feed() {
  const articles = await getArticles()

  if (articles.length === 0) {
    return (
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>
        <p style={{ color: 'var(--muted)', textAlign: 'center' }}>No articles yet. Check back soon.</p>
      </section>
    )
  }

  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 500 }}>Today's Feed</h2>
            <span style={{ background: 'var(--gold-pale)', color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 500, padding: '4px 10px', borderRadius: '100px' }}>
              {articles.length} stories
            </span>
          </div>

          <a href={featured.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ background: 'white', borderRadius: '18px', border: '1px solid var(--border)', padding: '28px', marginBottom: '16px' }}>
              <ArticleImage
                src={featured.image_url}
                alt={featured.title}
                style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', marginBottom: '20px' }}
              />
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <span style={{ background: 'var(--dark)', color: 'white', fontSize: '0.7rem', fontWeight: 600, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Featured</span>
                <span style={{ background: 'var(--gold-pale)', color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 500, padding: '4px 10px', borderRadius: '100px' }}>{featured.source}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 500, lineHeight: 1.3, marginBottom: '12px' }}>{featured.title}</h3>
              {featured.horveil_take ? (
                <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: '14px', marginBottom: '12px' }}>
                  <p style={{ fontStyle: 'italic', color: 'var(--gold)', fontSize: '0.95rem' }}>"{featured.horveil_take}"</p>
                </div>
              ) : (
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{featured.summary?.slice(0, 200)}...</p>
              )}
            </div>
          </a>

          {rest.map((article) => (
            <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ background: 'white', borderRadius: '14px', border: '1px solid var(--border)', padding: '20px 24px', marginBottom: '12px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <ArticleImage
                  src={article.image_url}
                  alt={article.title}
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px', flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ background: 'var(--gold-pale)', color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 500, padding: '3px 8px', borderRadius: '100px' }}>{article.source}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 500, lineHeight: 1.35, marginBottom: '6px' }}>{article.title}</h3>
                  {article.horveil_take && (
                    <p style={{ fontStyle: 'italic', color: 'var(--gold)', fontSize: '0.85rem' }}>"{article.horveil_take}"</p>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div style={{ width: '300px', flexShrink: 0 }}>
          <div style={{ background: 'var(--dark)', borderRadius: '18px', padding: '28px', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'white', fontSize: '1.1rem', marginBottom: '8px' }}>Get the daily digest</h3>
            <p style={{ color: '#9e9b94', fontSize: '0.85rem', marginBottom: '16px' }}>5 stories, one take each. Monday to Friday.</p>
            <a href="#" style={{ display: 'block', background: 'var(--gold)', color: 'white', textAlign: 'center', padding: '12px', borderRadius: '100px', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none' }}>Subscribe free</a>
          </div>

          <div style={{ background: 'white', borderRadius: '18px', border: '1px solid var(--border)', padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 500, marginBottom: '16px' }}>Sources</h3>
            {['Fratello', 'aBlogtoWatch', 'Monochrome', 'Worn & Wound', 'WatchTime', 'SJX'].map(source => (
              <div key={source} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)' }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{source}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
