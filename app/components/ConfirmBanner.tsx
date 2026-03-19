'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function Banner() {
  const params = useSearchParams()
  const confirmed = params.get('confirmed')

  if (confirmed !== 'true') return null

  return (
    <div style={{ background: '#2d5a27', color: 'white', textAlign: 'center', padding: '16px 24px', fontFamily: 'var(--font-display)', fontSize: '1rem' }}>
      You're in. Welcome to Horveil, you're one of our founding readers. ✦
    </div>
  )
}

export default function ConfirmBanner() {
  return (
    <Suspense fallback={null}>
      <Banner />
    </Suspense>
  )
}
