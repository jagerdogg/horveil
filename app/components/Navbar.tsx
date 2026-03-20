import Link from 'next/link'

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 40px',
      background: '#ffffff',
      borderBottom: '1px solid #ece9e2',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: '10px' }}>
        <span style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '22px',
          fontWeight: 600,
          color: '#1a1a18',
          letterSpacing: '-0.02em',
        }}>
          Hor<span style={{ color: '#8B6F47' }}>veil</span>
        </span>
        <span style={{
          fontSize: '11px',
          color: '#9e9b94',
          fontWeight: 300,
          letterSpacing: '0.02em',
        }}>
          watch culture, deeper
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '13px', color: '#6b6860', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
          Feed
        </Link>
        <Link href="/about" style={{ fontSize: '13px', color: '#6b6860', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
          About
        </Link>
        <Link href="/#subscribe" style={{
          fontSize: '13px',
          padding: '8px 20px',
          borderRadius: '100px',
          background: '#8B6F47',
          color: '#ffffff',
          textDecoration: 'none',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 500,
        }}>
          Get the newsletter
        </Link>
      </div>
    </nav>
  )
}
