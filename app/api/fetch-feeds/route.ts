import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const FEEDS = [
  { url: 'https://feeds.feedburner.com/hodinkee', source: 'Hodinkee' },
  { url: 'https://www.fratellowatches.com/feed/', source: 'Fratello' },
  { url: 'https://www.ablogtowatch.com/feed/', source: 'aBlogtoWatch' },
  { url: 'https://monochrome-watches.com/feed/', source: 'Monochrome' },
  { url: 'https://wornandwound.com/feed/', source: 'Worn & Wound' },
  { url: 'https://revolutionwatch.com/feed/', source: 'Revolution' },
  { url: 'https://twobrokewatchsnobs.com/feed/', source: 'Two Broke Watch Snobs' },
  { url: 'https://timeandtidewatches.com/feed/', source: 'Time+Tide' },
]

function extractTag(xml: string, tag: string): string {
  const patterns = [
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i'),
    new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'),
  ]
  for (const pattern of patterns) {
    const match = xml.match(pattern)
    if (match?.[1]) return match[1].trim()
  }
  return ''
}

function extractImage(xml: string): string {
  const patterns = [
    /<media:content[^>]*url="([^"]*)"[^>]*>/i,
    /<media:thumbnail[^>]*url="([^"]*)"[^>]*>/i,
    /<enclosure[^>]*url="([^"]*)"[^>]*type="image[^>]*>/i,
    /<img[^>]*src="([^"]*)"[^>]*>/i,
  ]
  for (const pattern of patterns) {
    const match = xml.match(pattern)
    if (match?.[1]) return match[1].trim()
  }
  return ''
}

async function parseFeed(url: string, source: string) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Horveil/1.0 RSS Reader' },
      next: { revalidate: 0 }
    })
    if (!res.ok) {
      console.error(`${source}: HTTP ${res.status}`)
      return []
    }
    const text = await res.text()
    const items: any[] = []
    const parts = text.split('<item>')
    parts.shift()

    for (const part of parts) {
      const itemXml = part.split('</item>')[0]
      const title = extractTag(itemXml, 'title')
      const link = extractTag(itemXml, 'link') || extractTag(itemXml, 'guid')
      const pubDate = extractTag(itemXml, 'pubDate')
      const description = extractTag(itemXml, 'description')
      const imageUrl = source === 'aBlogtoWatch' ? null : extractImage(itemXml)

      if (title && link && link.startsWith('http')) {
        items.push({
          title: title.replace(/&amp;/g, '&').replace(/&#038;/g, '&').replace(/&#38;/g, '&').replace(/&#8211;/g, '-').replace(/&#8212;/g, '-').replace(/&#039;/g, "'").replace(/&#x27;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&#8216;/g, "'").replace(/&#8217;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
          url: link,
          source,
          published_at: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
          summary: description.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#038;/g, '&').replace(/&#38;/g, '&').replace(/&#8211;/g, '-').replace(/&#8212;/g, '-').replace(/&#039;/g, "'").replace(/&#x27;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&#8216;/g, "'").replace(/&#8217;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').slice(0, 300).trim(),
          image_url: imageUrl || null,
          tag: source,
          in_newsletter: false,
          featured: false,
        })
      }
    }

    console.log(`${source}: found ${items.length} items`)
    return items.slice(0, 5)
  } catch (e) {
    console.error(`Failed to fetch ${source}:`, e)
    return []
  }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await supabase
    .from('articles')
    .update({ in_newsletter: false, featured: false })
    .gte('created_at', '2000-01-01')

  const results = await Promise.all(FEEDS.map(f => parseFeed(f.url, f.source)))
  const allArticles = results.flat()

  if (allArticles.length === 0) {
    return NextResponse.json({ success: false, error: 'No articles parsed', count: 0 })
  }

  const { error } = await supabase
    .from('articles')
    .upsert(allArticles, { onConflict: 'url' })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, count: allArticles.length })
}
