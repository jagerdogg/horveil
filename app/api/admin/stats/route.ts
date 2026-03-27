import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase'

export async function GET() {
  const { count } = await supabaseAdmin
    .from('subscribers')
    .select('*', { count: 'exact', head: true })
    .eq('confirmed', true)

  return NextResponse.json({ count: count || 0 })
}