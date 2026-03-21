export default function Footer() {
  return (
    <footer style={{ background: '#1a1a18', color: '#444', textAlign: 'center', padding: '32px 40px', fontSize: '12px', marginTop: '20px', lineHeight: 1.8 }}>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="/about" style={{ color: '#555', textDecoration: 'none', fontSize: '12px' }}>About</a>
        <a href="/privacy" style={{ color: '#555', textDecoration: 'none', fontSize: '12px' }}>Privacy</a>
      </div>
      <div>
        © 2026 <span style={{ color: '#8B6F47' }}>Horveil</span> · Watch culture, deeper · Built for enthusiasts, by one.
      </div>
    </footer>
  )
}
