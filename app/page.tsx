'use client'

import { ChatKit, useChatKit } from '@openai/chatkit-react'
import type { ChatKitOptions } from '@openai/chatkit'
import { useMemo, useState, useEffect } from 'react'

export default function Page() {
  const [isDark, setIsDark] = useState(() => {
    // Initialize based on system preference
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return true
  })

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  const toggleTheme = (): void => {
    setIsDark((value) => !value)
  }

  const options: ChatKitOptions = useMemo(() => ({
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
    header: {
      title: {
        enabled: false,
      },
      rightAction: {
        icon: isDark ? 'light-mode' : 'dark-mode',
        onClick: toggleTheme,
      },
    },
    threadItemActions: {
      feedback: false,
    },
    theme: {
      colorScheme: isDark ? 'dark' : 'light',
      radius: 'pill',
      density: 'normal',
      color: {
        accent: { primary: '#7F91E0', level: 3 },
        ...(isDark && { surface: { background: '#000000', foreground: '#202020' } }),
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
      greeting: 'What\'s on your mind?',
      prompts: [
        { icon: 'globe', label: 'Viking exploration secrets', prompt: 'What amazing places did the Vikings reach and how did they navigate the seas?' },
        { icon: 'atom', label: 'Quantum computers', prompt: 'How do quantum computers work and why could they change everything?' },
        { icon: 'star', label: 'Black holes explained', prompt: 'What happens inside a black hole and what would you experience falling into one?' },
        { icon: 'confetti', label: 'Video game evolution', prompt: 'How have video games evolved from Pong to modern virtual reality?' },
        { icon: 'map-pin', label: 'Lost civilizations', prompt: 'Tell me about mysterious ancient civilizations that vanished without a trace' },
        { icon: 'lab', label: 'CRISPR gene editing', prompt: 'What is CRISPR technology and how might it reshape medicine and humanity?' },
        { icon: 'book-closed', label: 'Hidden movie masterpieces', prompt: 'What are some incredible films that most people have never heard of?' },
        { icon: 'bolt', label: 'Brain-computer interfaces', prompt: 'How close are we to connecting our brains directly to computers?' },
        { icon: 'lightbulb', label: 'Dreams and consciousness', prompt: 'Why do we dream and what can dreams tell us about consciousness?' },
        { icon: 'book-open', label: 'Unsolved history mysteries', prompt: 'What are the most intriguing unsolved mysteries from history?' },
      ],
    },
  }), [isDark])

  const { control } = useChatKit(options)
  return (
    <div style={{ height: '100dvh', width: '100vw', position: 'relative' }}>
      <ChatKit control={control} style={{ height: '100%', width: '100%' }} />
    </div>
  )
}