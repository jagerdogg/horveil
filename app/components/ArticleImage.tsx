'use client'

interface Props {
  src: string | null
  alt: string
  style: React.CSSProperties
}

export default function ArticleImage({ src, alt, style }: Props) {
  return (
    <img
      src={src || '/placeholder-watch.svg'}
      alt={alt}
      style={style}
      onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-watch.svg' }}
    />
  )
}
