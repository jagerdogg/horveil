import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const FEEDS = [
  { url: 'https://www.hodinkee.com/articles.rss', source: 'Hodinkee' },
  { url: 'https://www.fratellowatches.com/feed/', source: 'Fratello' },
  { url: 'https://www.ablogtowatch.com/feed/', source: 'aBlogtoWatch' },
  { url: 'https://monochrome-watches.com/feed/', source: 'Monochrome' },
  { url: 'https://wornandwound.com/feed/', source: 'Worn & Wound' },
  { url: 'https://www.watchtime.com/feed/', source: 'WatchTime' },
  { url: 'https://www.timepiecesandmore.com/feed/', source: 'Time+Tide' },
  { url: 'https://sjxwatch.com/feed/', source: 'SJX' },
]

async function parseFeed(url: string, source: string) {
  try {
    const res = await fetch(url, { next: { revalidate: 0 } })
    const text = await res.text()

    const items: any[] = []
    const itemMatches = text.matchAll(/<item>([\s\S]*?)<\/item>/g)

    for (const match of itemMatches) {
      const item = match[1]
      const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)?.[1] || ''
      const link = item.match(/<link>(.*?)<\/link>|<link[^>]*href="(.*?)"/)?.[1] || ''
      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || ''
      const description = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/)?.[1] || ''
      const imageUrl = item.match(/<media:content[^>]*url="(.*?)"|<enclosure[^>]*url="(.*?)"/)?.[1] || ''

      if (title && link) {
        items.push({
          title: title.trim(),
          url: link.trim(),
          source,
          published_at: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
          summary: description.replace(/<[^>]*>/g, '').slice(0, 300).trim(),
          image_url: imageUrl || null,
          tag: source,
        })
      }
    }

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

  const allArticles = (await Promise.all(FEEDS.map(f => parseFeed(f.url, f.source)))).flat()

  const { error } = await supabase
    .from('articles')
    .upsert(allArticles, { onConflict: 'url' })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, count: allArticles.length })
}
