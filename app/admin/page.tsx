'use client'

import { useState, useEffect } from 'react'

interface Article {
  id: string
  title: string
  url: string
  source: string
  published_at: string
  summary: string
  image_url: string | null
  horveil_take: string | null
  featured: boolean
  in_newsletter: boolean
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState<string | null>(null)
  const [suggesting, setSuggesting] = useState<string | null>(null)
  const [takes, setTakes] = useState<Record<string, string>>({})
  const [newsletter, setNewsletter] = useState<Record<string, boolean>>({})
  const [featured, setFeatured] = useState<Record<string, boolean>>({})

  async function login(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) setAuthed(true)
    else alert('Wrong password')
  }

  async function loadArticles() {
    setLoading(true)
    const res = await fetch('/api/admin/articles')
    const data = await res.json()
    setArticles(data)
    const t: Record<string, string> = {}
    const n: Record<string, boolean> = {}
    const f: Record<string, boolean> = {}
    data.forEach((a: Article) => {
      t[a.id] = a.horveil_take || ''
      n[a.id] = a.in_newsletter || false
      f[a.id] = a.featured || false
    })
    setTakes(t)
    setNewsletter(n)
    setFeatured(f)
    setLoading(false)
  }

  useEffect(() => {
    if (authed) loadArticles()
  }, [authed])

  async function save(id: string) {
    setSaving(id)
    await fetch('/api/admin/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        horveil_take: takes[id] || null,
        in_newsletter: newsletter[id] || false,
        featured: featured[id] || false,
      }),
    })
    setSaving(null)
  }

  async function suggestTake(article: Article) {
    setSuggesting(article.id)
    const res = await fetch('/api/admin/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: article.title, summary: article.summary, source: article.source }),
    })
    const data = await res.json()
    if (data.take) {
      setTakes(prev => ({ ...prev, [article.id]: data.take }))
    }
    setSuggesting(null)
  }

  const newsletterCount = Object.values(newsletter).filter(Boolean).length

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: '#1a1a18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={login} style={{ background: '#2a2a28', padding: '48px', borderRadius: '18px', width: '320px' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#c9a96e', fontSize: '1.8rem', marginBottom: '8px', textAlign: 'center' }}>Horveil</h1>
          <p style={{ color: '#6b6860', fontSize: '0.85rem', textAlign: 'center', marginBottom: '32px' }}>Admin</p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #3a3a38', background: '#1a1a18', color: 'white', fontSize: '1rem', marginBottom: '16px', outline: 'none' }}
          />
          <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '10px', background: '#8B6F47', color: 'white', fontWeight: 500, fontSize: '1rem', border: 'none', cursor: 'pointer' }}>
            Enter
          </button>
        </form>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f4f0', padding: '32px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', color: '#1a1a18' }}>Horveil Admin</h1>
            <p style={{ color: '#6b6860', fontSize: '0.85rem', marginTop: '4px' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div style={{ background: newsletterCount === 5 ? '#2d5a27' : '#8B6F47', color: 'white', padding: '8px 16px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 500 }}>
            {newsletterCount}/5 newsletter
          </div>
        </div>

        {loading ? (
          <p style={{ color: '#6b6860', textAlign: 'center', padding: '48px' }}>Loading articles...</p>
        ) : (
          articles.map(article => (
            <div key={article.id} style={{ background: 'white', borderRadius: '14px', border: `1px solid ${newsletter[article.id] ? '#8B6F47' : '#ece9e2'}`, padding: '24px', marginBottom: '16px', transition: 'border-color 0.2s' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                {article.image_url && (
                  <img src={article.image_url} alt="" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span style={{ background: '#f5f0e8', color: '#8B6F47', fontSize: '0.7rem', fontWeight: 500, padding: '3px 8px', borderRadius: '100px' }}>{article.source}</span>
                    <span style={{ color: '#9e9b94', fontSize: '0.75rem', paddingTop: '3px' }}>
                      {new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', fontWeight: 500, color: '#1a1a18', textDecoration: 'none', lineHeight: 1.4, display: 'block', marginBottom: '12px' }}>
                    {article.title}
                  </a>
                  <textarea
                    value={takes[article.id] || ''}
                    onChange={e => setTakes(prev => ({ ...prev, [article.id]: e.target.value }))}
                    placeholder="Write your one-line take..."
                    rows={2}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ece9e2', fontSize: '0.9rem', fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#8B6F47', resize: 'vertical', outline: 'none', marginBottom: '12px' }}
                  />
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem', color: '#6b6860' }}>
                      <input
                        type="checkbox"
                        checked={newsletter[article.id] || false}
                        onChange={e => setNewsletter(prev => ({ ...prev, [article.id]: e.target.checked }))}
                      />
                      Newsletter
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem', color: '#6b6860' }}>
                      <input
                        type="checkbox"
                        checked={featured[article.id] || false}
                        onChange={e => setFeatured(prev => ({ ...prev, [article.id]: e.target.checked }))}
                      />
                      Featured
                    </label>
                    <button
                      onClick={() => suggestTake(article)}
                      disabled={suggesting === article.id}
                      style={{ padding: '8px 16px', borderRadius: '100px', background: '#f5f0e8', color: '#8B6F47', fontWeight: 500, fontSize: '0.85rem', border: '1px solid #e8e0d0', cursor: 'pointer' }}
                    >
                      {suggesting === article.id ? 'Thinking...' : '✦ Suggest'}
                    </button>
                    <button
                      onClick={() => save(article.id)}
                      disabled={saving === article.id}
                      style={{ marginLeft: 'auto', padding: '8px 20px', borderRadius: '100px', background: '#8B6F47', color: 'white', fontWeight: 500, fontSize: '0.85rem', border: 'none', cursor: 'pointer' }}
                    >
                      {saving === article.id ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
