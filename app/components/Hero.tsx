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
    <section style={{ background: 'var(--dark)', color: 'white', padding: '56px 24px 80px', position: 'relative', overflow: 'hidden' }}>

      <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '28px' }}>
          <div style={{ height: '1px', width: '32px', background: 'var(--gold)' }} />
          <span style={{ color: 'var(--gold)', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>watch culture, deeper</span>
          <div style={{ height: '1px', width: '32px', background: 'var(--gold)' }} />
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.1rem, 5vw, 3.4rem)',
          fontWeight: 400,
          lineHeight: 1.18,
          marginBottom: '24px',
          letterSpacing: '-0.01em',
        }}>
          Every story worth your time.<br />
          <em style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>One honest take each.</em>
        </h1>

        <p style={{ color: '#857f78', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '460px', margin: '0 auto 40px' }}>
          Too many tabs. Not enough signal. Horveil is the fix. One email, five stories, Monday to Friday.
        </p>

        {status === 'success' ? (
          <p style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.2rem' }}>
            Almost there. Check your inbox to confirm your spot.
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                padding: '13px 22px', borderRadius: '100px',
                border: '1px solid #2e2e2c',
                background: 'rgba(255,255,255,0.05)',
                color: 'white', fontSize: '0.95rem', width: '260px', outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                padding: '13px 28px', borderRadius: '100px',
                background: 'var(--gold)', color: 'white',
                fontWeight: 500, fontSize: '0.95rem',
                border: 'none', cursor: 'pointer', letterSpacing: '0.01em',
              }}
            >
              {status === 'loading' ? 'Joining...' : 'Get the newsletter'}
            </button>
          </form>
        )}

        {status === 'duplicate' && (
          <p style={{ color: 'var(--gold-light)', marginTop: '12px', fontSize: '0.875rem' }}>You're already subscribed.</p>
        )}
        {status === 'error' && (
          <p style={{ color: '#e07070', marginTop: '12px', fontSize: '0.875rem' }}>Something went wrong. Try again.</p>
        )}

        <p style={{ color: '#6b6860', fontSize: '0.75rem', marginTop: '10px', textAlign: 'center' }}>
          No spam. No tracking. Unsubscribe anytime.
        </p>

        <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', marginTop: '56px' }}>
          {[['5', 'stories daily'], ['1', 'honest take each'], ['Free', 'always']].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 400, color: 'white', lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: '0.78rem', color: '#6b6860', marginTop: '6px', letterSpacing: '0.05em' }}>{label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
