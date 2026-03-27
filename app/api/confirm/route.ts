import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/?confirmed=false', request.url))
  }

  const { error } = await supabaseAdmin
    .from('subscribers')
    .update({ confirmed: true, confirmation_token: null })
    .eq('confirmation_token', token)

  if (error) {
    return NextResponse.redirect(new URL('/?confirmed=false', request.url))
  }

  return NextResponse.redirect(new URL('/?confirmed=true', request.url))
}