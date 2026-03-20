import Navbar from './components/Navbar'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{ background: 'var(--background)', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '96px 24px', textAlign: 'center' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ height: '1px', width: '32px', background: 'var(--gold)' }} />
          <span style={{ color: 'var(--gold)', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>404</span>
          <div style={{ height: '1px', width: '32px', background: 'var(--gold)' }} />
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400, marginBottom: '16px' }}>
          Nothing here.
        </h1>

        <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '40px' }}>
          That page does not exist. Maybe it was moved, or maybe you took a wrong turn somewhere between the dial and the caseback.
        </p>

        <Link href="/" style={{ display: 'inline-block', background: 'var(--gold)', color: 'white', padding: '12px 28px', borderRadius: '100px', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none' }}>
          Back to the feed
        </Link>

      </div>
    </main>
  )
}
