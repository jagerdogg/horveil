export default function Footer() {
  const links = ['About', 'Newsletter', 'Sources', 'Privacy', 'Contact']
  return (
    <footer style={{ background: '#1a1a18', color: '#444', textAlign: 'center', padding: '32px 40px', fontSize: '12px', marginTop: '20px', lineHeight: 1.8 }}>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '24px', justifyContent: 'center' }}>
        {links.map((link) => (
          <a key={link} href="#" style={{ color: '#555', textDecoration: 'none', fontSize: '12px' }}>
            {link}
          </a>
        ))}
      </div>
      <div>
        © 2026 <span style={{ color: '#8B6F47' }}>Horveil</span> · Watch culture, deeper · Built for enthusiasts, by one.
      </div>
    </footer>
  )
}
