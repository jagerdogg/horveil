import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase'

export async function GET() {
  const since = new Date()
  since.setHours(since.getHours() - 24)

  const { data, error } = await supabaseAdmin
    .from('articles')
    .select('*')
    .gte('created_at', since.toISOString())
    .order('published_at', { ascending: false })
    .limit(30)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}