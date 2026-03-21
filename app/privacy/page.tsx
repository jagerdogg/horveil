import Navbar from '../components/Navbar'

export default function Privacy() {
  return (
    <main style={{ background: 'var(--background)', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '72px 24px 96px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
          <div style={{ height: '1px', width: '32px', background: 'var(--gold)' }} />
          <span style={{ color: 'var(--gold)', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Privacy</span>
          <div style={{ height: '1px', width: '32px', background: 'var(--gold)' }} />
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400, marginBottom: '32px' }}>
          Privacy Policy
        </h1>

        <div style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.85, color: '#3a3a38' }}>

          <p style={{ marginBottom: '24px', color: 'var(--muted)', fontStyle: 'italic' }}>
            Last updated: March 2026
          </p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 500, marginBottom: '12px', marginTop: '32px' }}>The short version</h2>
          <p style={{ marginBottom: '24px' }}>
            Horveil collects only your email address when you subscribe. We use it to send you the newsletter. That is it. No tracking, no cookies, no ads, no data sharing. Ever.
          </p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 500, marginBottom: '12px', marginTop: '32px' }}>What we collect</h2>
          <p style={{ marginBottom: '24px' }}>
            When you subscribe to the Horveil newsletter we collect your email address and the date you confirmed your subscription. Nothing else.
          </p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 500, marginBottom: '12px', marginTop: '32px' }}>How we use it</h2>
          <p style={{ marginBottom: '24px' }}>
            Your email address is used solely to send you the Horveil daily digest. We do not sell it, share it, or use it for any other purpose. Your address is never visible to other subscribers.
          </p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 500, marginBottom: '12px', marginTop: '32px' }}>Cookies and tracking</h2>
          <p style={{ marginBottom: '24px' }}>
            Horveil does not use cookies. We do not use analytics, tracking pixels, or any third-party tracking tools. We have no idea how many people visit the site and we prefer it that way.
          </p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 500, marginBottom: '12px', marginTop: '32px' }}>Unsubscribing</h2>
          <p style={{ marginBottom: '24px' }}>
            Every newsletter includes a one-click unsubscribe link. You can also unsubscribe at any time at <a href="/unsubscribe" style={{ color: 'var(--gold)' }}>horveil.com/unsubscribe</a>. Your email is deleted immediately, no questions asked.
          </p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 500, marginBottom: '12px', marginTop: '32px' }}>Email delivery</h2>
          <p style={{ marginBottom: '24px' }}>
            Newsletters are sent via Resend. Your email address is shared with Resend solely for the purpose of delivering your newsletter. Resend's privacy policy is available at resend.com.
          </p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 500, marginBottom: '12px', marginTop: '32px' }}>Contact</h2>
          <p style={{ marginBottom: '24px' }}>
            Questions about privacy? Email <a href="mailto:hello@horveil.com" style={{ color: 'var(--gold)' }}>hello@horveil.com</a>.
          </p>

        </div>
      </div>
    </main>
  )
}
