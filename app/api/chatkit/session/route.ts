import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY
  const workflowId = process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID
  if (!apiKey || !workflowId) {
    return new Response(JSON.stringify({
      error: 'Missing OPENAI_API_KEY or NEXT_PUBLIC_CHATKIT_WORKFLOW_ID',
      hint: 'Set these in .env.local and restart the dev server',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await req.json().catch(() => ({} as any))
    const deviceId = (body?.deviceId as string | undefined)?.trim() || crypto.randomUUID()
    const response = await fetch('https://api.openai.com/v1/chatkit/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'chatkit_beta=v1',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ workflow: { id: workflowId }, user: deviceId }),
    })
    const text = await response.text()
    if (!response.ok) {
      return new Response(JSON.stringify({
        error: 'OpenAI ChatKit error',
        status: response.status,
        details: safeJson(text),
      }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    const json = safeJson(text)
    const clientSecret = (json as any)?.client_secret as string | undefined
    if (!clientSecret) {
      return new Response(JSON.stringify({ error: 'client_secret missing in response', details: json }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    return new Response(JSON.stringify({ client_secret: clientSecret }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Failed to create session', details: String(err?.message || err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

function safeJson(text: string) {
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}


