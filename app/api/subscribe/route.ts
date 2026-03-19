import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { randomUUID } from 'crypto'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const token = randomUUID()

  const { error } = await supabase
    .from('subscribers')
    .insert([{ email, confirmation_token: token, confirmed: false }])

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'Horveil <onboarding@resend.dev>',
    to: email,
    subject: 'Confirm your Horveil subscription',
    html: `
      <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; padding: 48px 24px; color: #1a1a18;">
        <h1 style="font-size: 2rem; color: #8B6F47; margin-bottom: 8px;">Horveil</h1>
        <p style="color: #6b6860; font-size: 0.9rem; margin-bottom: 32px;">watch culture, deeper</p>
        <h2 style="font-size: 1.3rem; font-weight: 500; margin-bottom: 16px;">One click to confirm.</h2>
        <p style="color: #6b6860; line-height: 1.7; margin-bottom: 32px;">
          You're almost in. Click below to confirm your subscription and start receiving the Horveil daily digest — five stories, one honest take each, Monday to Friday.
        </p>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/api/confirm?token=${token}" 
           style="display: inline-block; background: #8B6F47; color: white; padding: 14px 32px; border-radius: 100px; text-decoration: none; font-family: sans-serif; font-weight: 500;">
          Confirm subscription
        </a>
        <p style="color: #9e9b94; font-size: 0.8rem; margin-top: 48px;">
          If you didn't sign up for Horveil, you can safely ignore this email.
        </p>
      </div>
    `
  })

  return NextResponse.json({ success: true })
}
