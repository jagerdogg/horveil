const articles = [
  {
    id: 1,
    source: 'Hodinkee',
    author: 'Andy Hoffman',
    title: 'TAG Heuer names Béatrice Goasglas as new CEO — the first woman to lead the brand in its 166-year history',
    take: 'Three CEOs in under three years — this internal promotion signals LVMH wants stability over star power. Smart move quietly made.',
    time: '2 hours ago',
    readTime: '5 min read',
    tag: 'Industry',
    tagColor: '#f0ebe2',
    tagText: '#7a5f3a',
    thumbBg: '#0d1a10',
    dialColor: '#1D9E75',
    handColor: '#9FE1CB',
    h: '-30deg',
    m: '65deg',
  },
  {
    id: 2,
    source: 'Hodinkee',
    author: 'Tim Jeffreys',
    title: 'Essays: Could the most radical watchmaking innovation for 2026 be a paintbrush?',
    take: 'The argument is better than the headline — dial artistry is quietly becoming the real arms race heading into W&W.',
    time: '6 hours ago',
    readTime: '12 min read',
    tag: 'Long read',
    tagColor: '#f0ebe2',
    tagText: '#7a5f3a',
    thumbBg: '#1a1200',
    dialColor: '#BA7517',
    handColor: '#FAC775',
    h: '-50deg',
    m: '80deg',
  },
  {
    id: 3,
    source: 'Monochrome',
    author: 'Rebecca Doulton',
    title: 'Introducing — Beaubleu and the Monnaie de Paris join forces to strike the dials of La Pièce 1 & 2',
    take: 'Coin-struck dials from a 1,000-year-old mint. Independent watchmaking at its most audacious — and most French.',
    time: 'Yesterday',
    readTime: '6 min read',
    tag: 'New release',
    tagColor: '#faf0e6',
    tagText: '#8B6F47',
    thumbBg: '#0a0a14',
    dialColor: '#534AB7',
    handColor: '#AFA9EC',
    h: '-20deg',
    m: '100deg',
  },
  {
    id: 4,
    source: 'Worn & Wound',
    author: 'Windup Watch Shop',
    title: 'The Roundup: Zodiac × GiantMouse, the Spinnaker Fleuss 40, and more value-packed picks',
    take: 'The Zodiac collab is the standout — GiantMouse design sensibility on a name with actual heritage.',
    time: 'Yesterday',
    readTime: '5 min read',
    tag: 'Roundup',
    tagColor: '#e8f2ec',
    tagText: '#2d6e45',
    thumbBg: '#0d1a0d',
    dialColor: '#3B6D11',
    handColor: '#C0DD97',
    h: '-60deg',
    m: '50deg',
  },
  {
    id: 5,
    source: 'Fratello',
    author: 'Various',
    title: 'Photo report: Highlights from the 2026 British Watchmakers Day — Christopher Ward, Bremont, Fears and more',
    take: 'The C1 Loco 7326 selling out in 24 minutes tells you everything about where British watchmaking confidence is right now.',
    time: '2 days ago',
    readTime: '6 min read',
    tag: 'Report',
    tagColor: '#e8f2ec',
    tagText: '#2d6e45',
    thumbBg: '#0a1414',
    dialColor: '#0F6E56',
    handColor: '#5DCAA5',
    h: '-35deg',
    m: '90deg',
  },
]

export default function Feed() {
  return (
    <div style={{
      maxWidth: '1120px',
      margin: '0 auto',
      padding: '32px 40px',
    }}>

      {/* Eyebrow */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '14px',
      }}>
        <span style={{
          fontSize: '10px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#8B6F47',
        }}>
          Today's feed
        </span>
        <div style={{ flex: 1, height: '1px', background: '#ece9e2' }} />
      </div>

      {/* Article list */}
      <div style={{
        border: '1px solid #ece9e2',
        borderRadius: '18px',
        overflow: 'hidden',
        background: '#ffffff',
      }}>
        {articles.map((article, index) => (
          <div
            key={article.id}
            style={{
              display: 'flex',
              gap: '14px',
              padding: '14px 16px',
              borderBottom: index < articles.length - 1 ? '1px solid #ece9e2' : 'none',
              cursor: 'pointer',
              alignItems: 'flex-start',
            }}
          >
            {/* Thumbnail */}
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '10px',
              background: article.thumbBg,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                border: `3px solid ${article.dialColor}`,
                background: article.thumbBg,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: '50%',
                  left: 'calc(50% - 1px)',
                  width: '2px',
                  height: '9px',
                  background: article.handColor,
                  borderRadius: '1px',
                  transformOrigin: 'bottom center',
                  transform: `rotate(${article.h})`,
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '50%',
                  left: 'calc(50% - 0.5px)',
                  width: '1px',
                  height: '12px',
                  background: article.handColor,
                  borderRadius: '1px',
                  transformOrigin: 'bottom center',
                  transform: `rotate(${article.m})`,
                }} />
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: '10px',
                color: '#8B6F47',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '3px',
                fontWeight: 500,
              }}>
                {article.source} · {article.author}
              </p>
              <p style={{
                fontSize: '13px',
                fontWeight: 500,
                color: '#1a1a18',
                lineHeight: 1.45,
                marginBottom: '4px',
              }}>
                {article.title}
              </p>
              <p style={{
                fontSize: '12px',
                color: '#6b6860',
                lineHeight: 1.5,
                marginBottom: '6px',
                fontStyle: 'italic',
              }}>
                {article.take}
              </p>
              <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                fontSize: '11px',
                color: '#9e9b94',
              }}>
                <span>{article.readTime}</span>
                <span>·</span>
                <span>{article.time}</span>
                <span style={{
                  fontSize: '10px',
                  padding: '2px 8px',
                  borderRadius: '100px',
                  background: article.tagColor,
                  color: article.tagText,
                  fontWeight: 500,
                }}>
                  {article.tag}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}