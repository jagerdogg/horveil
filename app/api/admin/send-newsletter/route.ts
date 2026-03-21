import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function buildEmailHtml(articles: any[], date: string) {
  const storiesHtml = articles.map((article) => `
    <div style="background: #fff; border-radius: 8px; border: 0.5px solid #E0DBD3; overflow: hidden; margin-bottom: 12px;">
      <div style="height: 180px; overflow: hidden;">
        <img src="${article.image_url || 'https://horveil.com/placeholder-watch.svg'}" alt="" style="width: 100%; height: 180px; object-fit: cover; background: #1a1a18;" />
      </div>
      <div style="padding: 16px 20px;">
        <div style="font-size: 11px; color: #8B6F47; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px;">${article.source}</div>
        <div style="font-size: 16px; font-weight: 500; color: #1A1A1A; font-family: Georgia, serif; line-height: 1.4; margin-bottom: 10px;">${article.title}</div>
        ${article.horveil_take ? `
          <div style="font-size: 13px; color: #8B6F47; font-style: italic; line-height: 1.5; border-left: 2px solid #8B6F47; padding-left: 10px; margin-bottom: 12px;">"${article.horveil_take}" <span style="font-style: normal; font-size: 11px; color: #9e9b94;">— S</span></div>
        ` : ''}
        <a href="${article.url}" style="font-size: 12px; color: #8B6F47; text-decoration: none; letter-spacing: 0.5px;">Read the full story</a>
      </div>
    </div>
  `).join('')

  return `
    <div style="background: #F9F7F4; padding: 2rem 1rem; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background: #F9F7F4;">
        <div style="text-align: center; padding: 2rem 0 1.5rem;">
          <div style="font-size: 26px; font-weight: 500; letter-spacing: -0.5px; color: #1A1A1A; font-family: Georgia, serif;">Hor<span style="color: #8B6914;">veil</span></div>
          <div style="font-size: 12px; color: #888; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px;">watch culture, deeper</div>
          <div style="width: 40px; height: 1px; background: #8B6914; margin: 14px auto 0;"></div>
        </div>
        <div style="text-align: center; padding: 0 0 1.5rem;">
          <div style="font-size: 13px; color: #888;">${date} · Five stories worth your time</div>
        </div>
        ${storiesHtml}
        <div style="border-top: 0.5px solid #E0DBD3; margin-top: 2rem; padding-top: 1.5rem; text-align: center;">
          <div style="font-size: 13px; font-family: Georgia, serif; color: #1A1A1A; margin-bottom: 4px;">Hor<span style="color: #8B6914;">veil</span></div>
          <div style="font-size: 11px; color: #aaa; margin-bottom: 12px; letter-spacing: 1px; text-transform: uppercase;">watch culture, deeper</div>
          <div style="font-size: 11px; color: #bbb; margin-bottom: 6px;">You are receiving this because you signed up at horveil.com</div>
          <div style="font-size: 11px; color: #bbb; margin-bottom: 12px;">Enjoying this? <a href="https://horveil.com" style="color: #8B6914; text-decoration: none;">Forward it to a friend</a> and let them sign up.</div>
          <div style="font-size: 11px;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe" style="color: #8B6914; text-decoration: none; margin: 0 8px;">Unsubscribe</a>
            <span style="color: #ddd;">·</span>
            <a href="https://horveil.com" style="color: #8B6914; text-decoration: none; margin: 0 8px;">horveil.com</a>
          </div>
          <div style="font-size: 11px; color: #ccc; margin-top: 12px;">© 2026 Horveil</div>
        </div>
      </div>
    </div>
  `
}

export async function POST(request: Request) {
  const { password, force, test } = await request.json()

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const since = new Date()
  since.setHours(since.getHours() - 24)

  const { data: articles, error: articlesError } = await supabase
    .from('articles')
    .select('*')
    .eq('in_newsletter', true)
    .gte('created_at', since.toISOString())
    .order('published_at', { ascending: false })
    .limit(5)

  if (articlesError || !articles || articles.length === 0) {
    return NextResponse.json({ error: 'No newsletter articles selected' }, { status: 400 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const html = buildEmailHtml(articles, date)

  if (test) {
    const testEmail = process.env.HORVEIL_TEST_EMAIL
    if (!testEmail) {
      return NextResponse.json({ error: 'No test email configured' }, { status: 500 })
    }
    await resend.emails.send({
      from: 'Stephen at Horveil <hello@horveil.com>',
      replyTo: 'stephen.horveil@gmail.com',
      to: testEmail,
      subject: `[TEST] Horveil · ${date}`,
      html,
    })
    return NextResponse.json({ success: true, sent: 1, test: true })
  }

  if (!force) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const { data: todaySends } = await supabase
      .from('newsletter_sends')
      .select('id')
      .gte('sent_at', today.toISOString())
      .limit(1)

    if (todaySends && todaySends.length > 0) {
      return NextResponse.json({ error: 'Newsletter already sent today' }, { status: 409 })
    }
  }

  const { data: subscribers, error: subsError } = await supabase
    .from('subscribers')
    .select('email')
    .eq('confirmed', true)

  if (subsError || !subscribers || subscribers.length === 0) {
    return NextResponse.json({ error: 'No confirmed subscribers' }, { status: 400 })
  }

  const { error: sendError } = await resend.batch.send(
    subscribers.map(s => ({
      from: 'Stephen at Horveil <hello@horveil.com>',
      replyTo: 'stephen.horveil@gmail.com',
      to: s.email,
      subject: `Horveil · ${date}`,
      html,
    }))
  )

  if (sendError) {
    return NextResponse.json({ error: sendError.message }, { status: 500 })
  }

  await supabase
    .from('newsletter_sends')
    .insert([{ subscriber_count: subscribers.length }])

  return NextResponse.json({ success: true, sent: subscribers.length })
}
