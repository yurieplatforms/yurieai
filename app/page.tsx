'use client'

import { ChatKit, useChatKit } from '@openai/chatkit-react'
import type { ChatKitOptions } from '@openai/chatkit'

export default function Page() {
  const options: ChatKitOptions = {
    api: {
      async getClientSecret(currentClientSecret: string | null) {
        void currentClientSecret
        const deviceId = localStorage.getItem('chatkit_device_id') || crypto.randomUUID()
        localStorage.setItem('chatkit_device_id', deviceId)
        const res = await fetch('/api/chatkit/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deviceId }),
        })
        if (!res.ok) throw new Error('Failed to fetch ChatKit client_secret')
        const { client_secret } = await res.json()
        return client_secret as string
      },
    },
    theme: {
      colorScheme: 'dark',
      radius: 'pill',
      density: 'normal',
      color: {
        accent: { primary: '#7F91E0', level: 3 },
        surface: { background: '#000000', foreground: '#202020' },
      },
      typography: {
        baseSize: 18,
        fontFamily:
          '"OpenAI Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
        fontFamilyMono:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
        fontSources: [
          {
            family: 'OpenAI Sans',
            src: 'https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-Regular.woff2',
            weight: 400,
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
    composer: {
      placeholder: 'Message Yurie',
      attachments: { enabled: false },
    },
    startScreen: { greeting: '', prompts: [] },
  }

  const { control } = useChatKit(options)
  return (
    <div style={{ height: '100dvh', width: '100vw' }}>
      <ChatKit control={control} style={{ height: '100%', width: '100%' }} />
    </div>
  )
}


