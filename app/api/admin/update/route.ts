import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase'

export async function POST(request: Request) {
  const { id, horveil_take, in_newsletter, featured } = await request.json()

  const { error } = await supabaseAdmin
    .from('articles')
    .update({ horveil_take, in_newsletter, featured })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}