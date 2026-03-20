export default function About() {
  return (
    <main style={{ background: 'var(--background)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '72px 24px 96px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
          <div style={{ height: '1px', width: '32px', background: 'var(--gold)' }} />
          <span style={{ color: 'var(--gold)', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>About</span>
          <div style={{ height: '1px', width: '32px', background: 'var(--gold)' }} />
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 400, lineHeight: 1.2, marginBottom: '48px', color: 'var(--foreground)' }}>
          The life you carry on your wrist<br />
          <em style={{ color: 'var(--gold)' }}>into an ordinary Wednesday.</em>
        </h1>

        <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.85, color: '#3a3a38' }}>

          <img
            src="/stephen.jpg"
            alt="Stephen, founder of Horveil"
            style={{
              float: 'right',
              width: '190px',
              height: '190px',
              objectFit: 'cover',
              objectPosition: '60% 0%',
              borderRadius: '50%',
              border: '3px solid var(--gold)',
              marginLeft: '32px',
              marginBottom: '16px',
            }}
          />

          <p style={{ marginBottom: '24px' }}>
            I grew up in the late eighties obsessed with watches. Not in any sophisticated way, LEDs, LCDs, anything that felt like the future strapped to a wrist. James Bond didn't help.
          </p>

          <p style={{ marginBottom: '24px' }}>
            By my teens it had become something else. GQ entered the picture. Watches started meaning something about who you were, or maybe who you wanted to be. At sixteen I walked into a dive shop, spotted a TAG Heuer Formula 1 in the case, remembered an ad I'd seen somewhere, and handed over two hundred Canadian dollars I probably shouldn't have spent. I had no idea what I was buying. I just knew it felt right.
          </p>

          <p style={{ marginBottom: '24px' }}>
            Thirty years later I'd owned Rolex, Breitling, IWC, Panerai. I'd chased allocations and flipped pieces and convinced myself each new arrival was the one. I even owned a watch that by every objective measure should have been the grail. It made me feel like an imposter. I sold it.
          </p>

          <p style={{ marginBottom: '24px' }}>
            What I kept was a Tudor Ranger. Thirty-six millimetres, Dune dial, perfectly proportioned. It makes me think of Hemingway. Of Fleming. Of people who just went and did things without making a big deal about it. I also kept a Speedmaster, two Seikos, and the quiet satisfaction of finally knowing what I actually like.
          </p>

          <p style={{ marginBottom: '24px' }}>
            I built Horveil because I was spending an hour every morning reading watch sites and still missing half of what mattered. Five stories. One honest line each. That's it.
          </p>

          <p style={{ marginBottom: '24px' }}>
            Watches aren't really about watches. They're about what you love when you stop trying to impress anyone. The life you carry on your wrist into an ordinary Wednesday.
          </p>

          <p style={{ marginBottom: '0' }}>
            That's what this is about.
          </p>

        </div>

        <div style={{ borderTop: '1px solid var(--border)', marginTop: '48px', paddingTop: '32px', clear: 'both' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--foreground)', marginBottom: '4px' }}>
            <strong>Stephen</strong> · Essex, Ontario
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--muted)', fontStyle: 'italic' }}>
            Currently wearing: Seiko Marine Master
          </p>
        </div>

        <div style={{ background: 'var(--dark)', borderRadius: '18px', padding: '32px', marginTop: '48px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'white', fontSize: '1.2rem', fontWeight: 400, marginBottom: '8px' }}>Get the daily digest</h3>
          <p style={{ color: '#9e9b94', fontSize: '0.85rem', marginBottom: '20px' }}>Five stories. One honest line each. Monday to Friday.</p>
          <a href="/" style={{ display: 'inline-block', background: 'var(--gold)', color: 'white', padding: '12px 28px', borderRadius: '100px', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none' }}>Subscribe free</a>
        </div>

      </div>
    </main>
  )
}
