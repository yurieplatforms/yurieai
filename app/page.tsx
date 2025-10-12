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
    startScreen: {
      greeting: '',
      prompts: [
        { icon: 'circle-question', label: 'Ancient Rome facts', prompt: 'Tell me fascinating facts about Ancient Rome' },
        { icon: 'circle-question', label: 'How does AI work?', prompt: 'Explain how artificial intelligence works in simple terms' },
        { icon: 'circle-question', label: 'Best mystery novels', prompt: 'Recommend some gripping mystery novels I should read' },
        { icon: 'circle-question', label: 'Origin of the universe', prompt: 'What do we know about the origin of the universe?' },
        { icon: 'circle-question', label: 'World War II turning points', prompt: 'What were the key turning points of World War II?' },
        { icon: 'circle-question', label: 'Climate change solutions', prompt: 'What are the most promising solutions to climate change?' },
        { icon: 'circle-question', label: 'Classic films to watch', prompt: 'What are some must-watch classic films from cinema history?' },
        { icon: 'circle-question', label: 'Human brain mysteries', prompt: 'What are some unsolved mysteries about the human brain?' },
        { icon: 'circle-question', label: 'Music evolution', prompt: 'How has music evolved over the past century?' },
        { icon: 'circle-question', label: 'Future technology', prompt: 'What breakthrough technologies might we see in the next 10 years?' },
      ],
    },
  }

  const { control } = useChatKit(options)
  return (
    <div style={{ height: '100dvh', width: '100vw' }}>
      <ChatKit control={control} style={{ height: '100%', width: '100%' }} />
    </div>
  )
}


