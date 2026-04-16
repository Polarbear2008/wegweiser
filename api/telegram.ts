import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env vars')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  try {
    const { text, parse_mode } = req.body

    if (!text) {
      return res.status(400).json({ error: 'Missing "text" in request body' })
    }

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: parse_mode || 'HTML',
        }),
      }
    )

    const data = await telegramRes.json()
    return res.status(telegramRes.ok ? 200 : 502).json(data)
  } catch (error) {
    console.error('Telegram API error:', error)
    return res.status(500).json({ error: 'Failed to send message' })
  }
}
