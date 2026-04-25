export const config = {
  runtime: 'edge',
}

export default async function handler(req: Request) {
  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env vars')
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await req.json()
    const { text, parse_mode } = body

    if (!text) {
      return new Response(JSON.stringify({ error: 'Missing "text" in request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
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
    return new Response(JSON.stringify(data), {
      status: telegramRes.ok ? 200 : 502,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Telegram API error:', error)
    return new Response(JSON.stringify({ error: 'Failed to send message' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
