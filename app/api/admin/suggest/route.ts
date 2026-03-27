import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export async function POST(request: Request) {
  try {
    const { title, summary, source } = await request.json()

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 150,
      messages: [
        {
          role: 'user',
          content: `You are writing editorial one-liners for Horveil, a watch news digest written by Stephen, a collector who has seen enough hype cycles to know what actually matters.

The voice: warm, direct, culturally aware. Sees past the marketing. Knows why something is genuinely interesting versus just expensive. Watches connect to bigger things — racing, diving, adventure, design, Bond, the open road. Never sycophantic toward brands.

Rules:
- No em dashes
- No exclamation marks
- No collector jargon or snobbery
- Natural spoken language, like telling a friend over a pint
- One sentence, max 20 words
- Focus on the actual story — what makes it interesting, who it's really for, or whether it's worth the money
- Never say "worth paying attention to", "quietly", "this matters", "deserves a look", "stands out", or any phrase that sounds like AI summarizing something
- Never start with "This", "It", or the brand name
- Sound like a person with an opinion, not a content generator

Article: "${title}"
Source: ${source}
Summary: ${summary}

Write one editorial take. Just the sentence, nothing else.`
        }
      ]
    })

    const take = message.content[0].type === 'text' ? message.content[0].text.trim() : null
    return NextResponse.json({ take })

  } catch (error: any) {
    console.error('Suggest error:', error)
    return NextResponse.json({ error: error.message || 'Failed to generate suggestion' }, { status: 500 })
  }
}