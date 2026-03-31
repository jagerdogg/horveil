import Link from 'next/link'

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 20px',
      background: '#ffffff',
      borderBottom: '1px solid #ece9e2',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
        <img
          src="/wordmark_split.svg"
          alt="Horveil"
          style={{ height: '28px', width: 'auto', display: 'block' }}
        />
      </Link>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '13px', color: '#6b6860', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
          Feed
        </Link>
        <Link href="/archive" style={{ fontSize: '13px', color: '#6b6860', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
          Archive
        </Link>
        <Link href="/about" style={{ fontSize: '13px', color: '#6b6860', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
          About
        </Link>
        <Link href="/#subscribe" style={{
          fontSize: '12px',
          padding: '8px 14px',
          borderRadius: '100px',
          background: '#8B6F47',
          color: '#ffffff',
          textDecoration: 'none',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 500,
          whiteSpace: 'nowrap',
        }}>
          Subscribe
        </Link>
      </div>
    </nav>
  )
}
