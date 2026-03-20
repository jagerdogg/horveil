'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'

export default function UnsubscribePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleUnsubscribe(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (res.ok) setStatus('success')
    else setStatus('error')
  }

  return (
    <main style={{ background: 'var(--background)', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '96px 24px', textAlign: 'center' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ height: '1px', width: '32px', background: 'var(--gold)' }} />
          <span style={{ color: 'var(--gold)', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Unsubscribe</span>
          <div style={{ height: '1px', width: '32px', background: 'var(--gold)' }} />
        </div>

        {status === 'success' ? (
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 400, marginBottom: '16px' }}>You're unsubscribed.</h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '32px' }}>
              Sorry to see you go. You won't receive any more emails from Horveil.
            </p>
            <a href="/" style={{ color: 'var(--gold)', fontSize: '0.9rem', textDecoration: 'none' }}>Back to horveil.com</a>
          </div>
        ) : (
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 400, marginBottom: '16px' }}>Unsubscribe</h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '32px' }}>
              Enter your email below and you will be removed from the Horveil newsletter immediately.
            </p>
            <form onSubmit={handleUnsubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{ padding: '13px 20px', borderRadius: '100px', border: '1px solid var(--border)', fontSize: '0.95rem', outline: 'none', textAlign: 'center' }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{ padding: '13px', borderRadius: '100px', background: 'var(--dark)', color: 'white', fontWeight: 500, fontSize: '0.95rem', border: 'none', cursor: 'pointer' }}
              >
                {status === 'loading' ? 'Processing...' : 'Unsubscribe'}
              </button>
            </form>
            {status === 'error' && (
              <p style={{ color: '#e07070', marginTop: '12px', fontSize: '0.875rem' }}>Something went wrong. Try again.</p>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
