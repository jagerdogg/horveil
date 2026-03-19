import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/?confirmed=false', request.url))
  }

  const { error } = await supabase
    .from('subscribers')
    .update({ confirmed: true, confirmation_token: null })
    .eq('confirmation_token', token)

  if (error) {
    return NextResponse.redirect(new URL('/?confirmed=false', request.url))
  }

  return NextResponse.redirect(new URL('/?confirmed=true', request.url))
}
