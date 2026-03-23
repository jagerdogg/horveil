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
  const [saved, setSaved] = useState<string | null>(null)
  const [suggesting, setSuggesting] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [clearing, setClearing] = useState(false)
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null)
  const [alreadySent, setAlreadySent] = useState(false)
  const [takes, setTakes] = useState<Record<string, string>>({})
  const [newsletter, setNewsletter] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState<string | null>(null)

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
    data.forEach((a: Article) => {
      t[a.id] = a.horveil_take || ''
      n[a.id] = a.in_newsletter || false
    })
    setTakes(t)
    setNewsletter(n)
    setLoading(false)
  }

  async function loadStats() {
    const res = await fetch('/api/admin/stats')
    const data = await res.json()
    setSubscriberCount(data.count)
  }

  useEffect(() => {
    if (authed) {
      loadArticles()
      loadStats()
    }
  }, [authed])

  async function toggleNewsletter(id: string, checked: boolean) {
    const newsletterCount = Object.values(newsletter).filter(Boolean).length
    if (checked && newsletterCount >= 5) return
    setNewsletter(prev => ({ ...prev, [id]: checked }))
    await fetch('/api/admin/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        horveil_take: takes[id] || null,
        in_newsletter: checked,
        featured: checked,
      }),
    })
  }

  async function saveTake(id: string) {
    setSaving(id)
    await fetch('/api/admin/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        horveil_take: takes[id] || null,
        in_newsletter: newsletter[id] || false,
        featured: newsletter[id] || false,
      }),
    })
    setSaving(null)
    setSaved(id)
    setTimeout(() => setSaved(null), 2000)
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

  async function copyXPost(article: Article) {
    const take = takes[article.id]?.trim()
    if (!take) {
      alert('Write a take first.')
      return
    }
    const post = `${take}\n\n${article.url}`
    await navigator.clipboard.writeText(post)
    setCopied(article.id)
    setTimeout(() => setCopied(null), 2000)
  }

  async function sendNewsletter(force = false, test = false) {
    const confirmMsg = test
      ? 'Send a test newsletter to your test email?'
      : force
      ? 'Force send newsletter to all confirmed subscribers?'
      : 'Send newsletter to all confirmed subscribers?'
    if (!confirm(confirmMsg)) return
    setSending(true)
    const res = await fetch('/api/admin/send-newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, force, test }),
    })
    const data = await res.json()
    if (res.status === 409) {
      setAlreadySent(true)
      alert('Newsletter already sent today. Use Force Send to send again.')
    } else if (data.success && data.test) {
      alert('Test email sent to your test address.')
    } else if (data.success) {
      setAlreadySent(true)
      alert(`Sent to ${data.sent} subscriber${data.sent === 1 ? '' : 's'}.`)
    } else {
      alert(`Error: ${data.error}`)
    }
    setSending(false)
  }

  async function fetchNow() {
    setFetching(true)
    const res = await fetch('/api/fetch-feeds', {
      headers: { 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET}` },
    })
    const data = await res.json()
    if (data.success) {
      alert(`Fetched ${data.count} articles. Reloading...`)
      loadArticles()
    } else {
      alert('Fetch failed.')
    }
    setFetching(false)
  }

  async function clearPicks() {
    if (!confirm('Clear all newsletter picks?')) return
    setClearing(true)
    await fetch('/api/admin/clear-picks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    setNewsletter(prev => {
      const cleared: Record<string, boolean> = {}
      Object.keys(prev).forEach(k => cleared[k] = false)
      return cleared
    })
    setClearing(false)
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', color: '#1a1a18' }}>Horveil Admin</h1>
            <p style={{ color: '#6b6860', fontSize: '0.85rem', marginTop: '4px' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            {subscriberCount !== null && (
              <p style={{ color: '#8B6F47', fontSize: '0.85rem', marginTop: '4px', fontWeight: 500 }}>
                {subscriberCount} confirmed subscriber{subscriberCount === 1 ? '' : 's'} · {articles.length} articles today
              </p>
            )}
            {alreadySent && (
              <p style={{ color: '#2d5a27', fontSize: '0.85rem', marginTop: '4px', fontWeight: 500 }}>
                Newsletter sent today
              </p>
            )}
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={fetchNow}
              disabled={fetching}
              style={{ padding: '8px 20px', borderRadius: '100px', background: '#3a3a38', color: 'white', fontWeight: 500, fontSize: '0.85rem', border: 'none', cursor: 'pointer' }}
            >
              {fetching ? 'Fetching...' : 'Fetch now'}
            </button>
            <button
              onClick={clearPicks}
              disabled={clearing || newsletterCount === 0}
              style={{ padding: '8px 20px', borderRadius: '100px', background: newsletterCount === 0 ? '#ccc' : '#c0392b', color: 'white', fontWeight: 500, fontSize: '0.85rem', border: 'none', cursor: newsletterCount === 0 ? 'default' : 'pointer' }}
            >
              {clearing ? 'Clearing...' : 'Clear picks'}
            </button>
            <div style={{ background: newsletterCount === 5 ? '#2d5a27' : '#8B6F47', color: 'white', padding: '8px 16px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 500 }}>
              {newsletterCount}/5 newsletter
            </div>
            {newsletterCount === 5 && (
              <button
                onClick={() => sendNewsletter(false, true)}
                disabled={sending}
                style={{ padding: '8px 20px', borderRadius: '100px', background: '#5a4a38', color: 'white', fontWeight: 500, fontSize: '0.85rem', border: 'none', cursor: 'pointer' }}
              >
                {sending ? 'Sending...' : 'Send test'}
              </button>
            )}
            {newsletterCount === 5 && !alreadySent && (
              <button
                onClick={() => sendNewsletter(false, false)}
                disabled={sending}
                style={{ padding: '8px 20px', borderRadius: '100px', background: '#2d5a27', color: 'white', fontWeight: 500, fontSize: '0.85rem', border: 'none', cursor: 'pointer' }}
              >
                {sending ? 'Sending...' : 'Send newsletter'}
              </button>
            )}
            {newsletterCount === 5 && alreadySent && (
              <button
                onClick={() => sendNewsletter(true, false)}
                disabled={sending}
                style={{ padding: '8px 20px', borderRadius: '100px', background: '#8B4F47', color: 'white', fontWeight: 500, fontSize: '0.85rem', border: 'none', cursor: 'pointer' }}
              >
                {sending ? 'Sending...' : 'Force send'}
              </button>
            )}
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
                        onChange={e => toggleNewsletter(article.id, e.target.checked)}
                      />
                      Newsletter
                    </label>
                    <button
                      onClick={() => suggestTake(article)}
                      disabled={suggesting === article.id}
                      style={{ padding: '8px 16px', borderRadius: '100px', background: '#f5f0e8', color: '#8B6F47', fontWeight: 500, fontSize: '0.85rem', border: '1px solid #e8e0d0', cursor: 'pointer' }}
                    >
                      {suggesting === article.id ? 'Thinking...' : '✦ Suggest'}
                    </button>
                    <button
                      onClick={() => copyXPost(article)}
                      disabled={!takes[article.id]?.trim()}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '100px',
                        background: copied === article.id ? '#2d5a27' : takes[article.id]?.trim() ? '#1a1a18' : '#e8e6e2',
                        color: takes[article.id]?.trim() ? 'white' : '#9e9b94',
                        fontWeight: 500,
                        fontSize: '0.85rem',
                        border: 'none',
                        cursor: takes[article.id]?.trim() ? 'pointer' : 'default',
                        transition: 'background 0.2s',
                      }}
                    >
                      {copied === article.id ? '✓ Copied' : '𝕏 Post'}
                    </button>
                    <button
                      onClick={() => saveTake(article.id)}
                      disabled={saving === article.id}
                      style={{ marginLeft: 'auto', padding: '8px 20px', borderRadius: '100px', background: saved === article.id ? '#2d5a27' : '#8B6F47', color: 'white', fontWeight: 500, fontSize: '0.85rem', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                    >
                      {saving === article.id ? 'Saving...' : saved === article.id ? 'Saved' : 'Save take'}
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
