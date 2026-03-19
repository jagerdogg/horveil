'use client'

import { useState } from 'react'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (res.ok) {
      setStatus('success')
      setEmail('')
    } else if (res.status === 409) {
      setStatus('duplicate')
    } else {
      setStatus('error')
    }
  }

  return (
    <section style={{ background: 'var(--dark)', color: 'white', padding: '80px 24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 500, lineHeight: 1.15, marginBottom: '24px' }}>
          Every story worth your time.<br />
          <em style={{ color: 'var(--gold-light)' }}>One honest take each.</em>
        </h1>
        <p style={{ color: '#a09d96', fontSize: '1.1rem', marginBottom: '40px', maxWidth: '520px', margin: '0 auto 40px' }}>
          Too many tabs. Not enough signal. Horveil is the fix. One email, five stories, Monday to Friday.
        </p>

        {status === 'success' ? (
          <p style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.2rem' }}>
            You're in. First issue lands Monday.
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                padding: '14px 20px', borderRadius: '100px', border: '1px solid #3a3a38',
                background: '#2a2a28', color: 'white', fontSize: '1rem', width: '280px', outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                padding: '14px 28px', borderRadius: '100px', background: 'var(--gold)',
                color: 'white', fontWeight: 500, fontSize: '1rem', border: 'none', cursor: 'pointer'
              }}
            >
              {status === 'loading' ? 'Joining...' : 'Get the newsletter'}
            </button>
          </form>
        )}

        {status === 'duplicate' && (
          <p style={{ color: 'var(--gold-light)', marginTop: '12px', fontSize: '0.9rem' }}>You're already subscribed!</p>
        )}
        {status === 'error' && (
          <p style={{ color: '#e07070', marginTop: '12px', fontSize: '0.9rem' }}>Something went wrong. Try again.</p>
        )}

        <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginTop: '48px', color: '#6b6860' }}>
          <div><strong style={{ color: 'white', display: 'block', fontSize: '1.4rem' }}>Fresh</strong>every day</div>
          <div><strong style={{ color: 'white', display: 'block', fontSize: '1.4rem' }}>5</strong>in your inbox</div>
          <div><strong style={{ color: 'white', display: 'block', fontSize: '1.4rem' }}>1</strong>take each</div>
        </div>
      </div>
    </section>
  )
}