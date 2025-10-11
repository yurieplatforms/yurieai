export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const apiKey = process.env.OPENAI_API_KEY
  const workflowId = process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID
  if (!apiKey || !workflowId) {
    return res.status(500).json({ error: 'Missing OPENAI_API_KEY or NEXT_PUBLIC_CHATKIT_WORKFLOW_ID' })
  }

  try {
    const deviceId = (req.body?.deviceId as string | undefined)?.trim() || globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)

    const response = await fetch('https://api.openai.com/v1/chatkit/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'chatkit_beta=v1',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        workflow: { id: workflowId },
        user: deviceId,
      }),
    })

    const json = await response.json()
    if (!response.ok) {
      return res.status(response.status).json(json)
    }

    const clientSecret = json?.client_secret as string | undefined
    if (!clientSecret) {
      return res.status(500).json({ error: 'client_secret missing in response' })
    }
    return res.status(200).json({ client_secret: clientSecret })
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to create session' })
  }
}


