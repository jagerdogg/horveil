export default function WWBanner() {
  const daysToGo = 31

  return (
    <div style={{
      background: '#1a1a18',
      borderRadius: '14px',
      padding: '14px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '28px 40px 0',
    }}>
      <div>
        <p style={{
          fontSize: '10px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#8B6F47',
          marginBottom: '4px',
        }}>
          Coming up
        </p>
        <p style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '15px',
          color: '#fafaf8',
        }}>
          Watches & Wonders Geneva 2026 — 66 brands, 7 days
        </p>
      </div>

      <div style={{ textAlign: 'right' }}>
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '36px',
          color: '#c9a96e',
          lineHeight: 1,
        }}>
          {daysToGo}
        </div>
        <div style={{
          fontSize: '10px',
          color: '#555',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginTop: '2px',
        }}>
          days to go
        </div>
      </div>
    </div>
  )
}