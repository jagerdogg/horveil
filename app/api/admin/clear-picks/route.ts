import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await supabase
    .from('articles')
    .update({ in_newsletter: false, featured: false })
    .gte('created_at', '2000-01-01')

  return NextResponse.json({ success: true })
}
