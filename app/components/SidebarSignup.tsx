'use client'

import { useState } from 'react'

export default function SidebarSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle')

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
    <div style={{ background: 'var(--dark)', borderRadius: '18px', padding: '28px' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', color: 'white', fontSize: '1.1rem', marginBottom: '8px' }}>Get the daily digest</h3>
      <p style={{ color: '#9e9b94', fontSize: '0.85rem', marginBottom: '16px' }}>5 stories, one take each. Monday to Friday. Always free.</p>

      {status === 'success' ? (
        <p style={{ color: 'var(--gold-light)', fontStyle: 'italic', fontSize: '0.9rem' }}>Almost there. Check your inbox to confirm.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{
              padding: '10px 14px', borderRadius: '100px',
              border: '1px solid #2e2e2c',
              background: 'rgba(255,255,255,0.05)',
              color: 'white', fontSize: '0.85rem', outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '10px', borderRadius: '100px',
              background: 'var(--gold)', color: 'white',
              fontWeight: 500, fontSize: '0.85rem',
              border: 'none', cursor: 'pointer',
            }}
          >
            {status === 'loading' ? 'Joining...' : 'Subscribe free'}
          </button>
        </form>
      )}

      {status === 'duplicate' && (
        <p style={{ color: 'var(--gold-light)', marginTop: '8px', fontSize: '0.8rem' }}>You're already subscribed.</p>
      )}
      {status === 'error' && (
        <p style={{ color: '#e07070', marginTop: '8px', fontSize: '0.8rem' }}>Something went wrong. Try again.</p>
      )}
    </div>
  )
}
