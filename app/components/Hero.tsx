export default function Hero() {
  return (
    <div style={{
      background: '#1a1a18',
      color: '#fafaf8',
      padding: '52px 40px 44px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Eyebrow */}
      <p style={{
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: '#8B6F47',
        marginBottom: '14px',
      }}>
        Horveil Daily Newsletter
      </p>

      {/* Headline */}
      <h1 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '42px',
        fontWeight: 500,
        lineHeight: 1.15,
        marginBottom: '12px',
        letterSpacing: '-0.02em',
      }}>
        The watch world,{' '}
        <em style={{ color: '#c9a96e' }}>filtered for you.</em>
      </h1>

      {/* Subheading */}
      <p style={{
        fontSize: '14px',
        color: '#9e9b94',
        lineHeight: 1.7,
        maxWidth: '480px',
        margin: '0 auto 10px',
        fontWeight: 300,
      }}>
        Every morning, Monday to Friday — the 5 stories worth your attention,
        each with one honest line of context. No noise, no filler.
      </p>

      {/* Founder quote */}
      <p style={{
        fontSize: '12px',
        color: '#555',
        lineHeight: 1.6,
        maxWidth: '420px',
        margin: '0 auto 28px',
        fontStyle: 'italic',
      }}>
        "I built Horveil because I was spending an hour a day reading watch sites
        and still missing what mattered. Now I spend five minutes."{' '}
        <span style={{ color: '#8B6F47', fontStyle: 'normal', fontWeight: 500 }}>
          — Stephen, founder
        </span>
      </p>

      {/* Email signup form */}
      <div style={{
        display: 'flex',
        gap: '8px',
        maxWidth: '400px',
        margin: '0 auto',
      }}>
        <input
          type="email"
          placeholder="your@email.com"
          style={{
            flex: 1,
            padding: '12px 18px',
            borderRadius: '100px',
            border: '1px solid #2e2e2a',
            background: '#242420',
            color: '#fafaf8',
            fontSize: '13px',
            fontFamily: 'DM Sans, sans-serif',
            outline: 'none',
          }}
        />
        <button style={{
          padding: '12px 22px',
          borderRadius: '100px',
          background: '#8B6F47',
          color: '#ffffff',
          border: 'none',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 500,
          fontFamily: 'DM Sans, sans-serif',
          whiteSpace: 'nowrap',
        }}>
          Get the daily edition
        </button>
      </div>

      {/* Fine print */}
      <p style={{
        fontSize: '11px',
        color: '#444',
        marginTop: '10px',
      }}>
        Free forever. No spam. Unsubscribe in one click. Join the founding readers.
      </p>

      {/* Stats row */}
      <div style={{
        display: 'flex',
        gap: '28px',
        justifyContent: 'center',
        marginTop: '24px',
        paddingTop: '22px',
        borderTop: '1px solid #242420',
      }}>
        {[
          { num: 'Mon–Fri', label: 'Published' },
          { num: '5', label: 'Stories daily' },
          { num: '~10', label: 'Sources curated' },
          { num: 'Free', label: 'Always' },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '22px',
              color: '#fafaf8',
            }}>
              {stat.num}
            </div>
            <div style={{
              fontSize: '10px',
              color: '#555',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginTop: '2px',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}