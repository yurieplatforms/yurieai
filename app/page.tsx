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

  const openProfileSettings = (): void => {
    alert('Open Profile Settings')
  }

  const openHomePage = (): void => {
    window.location.assign('/')
  }

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
      leftAction: {
        icon: 'home',
        onClick: openHomePage,
      },
      rightAction: {
        icon: isDark ? 'light-mode' : 'dark-mode',
        onClick: toggleTheme,
      },
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
      greeting: '',
      prompts: [
        { icon: 'book-open', label: 'Ancient Rome facts', prompt: 'Tell me fascinating facts about Ancient Rome' },
        { icon: 'atom', label: 'How does AI work?', prompt: 'Explain how artificial intelligence works in simple terms' },
        { icon: 'book-closed', label: 'Best mystery novels', prompt: 'Recommend some gripping mystery novels I should read' },
        { icon: 'globe', label: 'Origin of the universe', prompt: 'What do we know about the origin of the universe?' },
        { icon: 'map-pin', label: 'World War II turning points', prompt: 'What were the key turning points of World War II?' },
        { icon: 'lab', label: 'Climate change solutions', prompt: 'What are the most promising solutions to climate change?' },
        { icon: 'star', label: 'Classic films to watch', prompt: 'What are some must-watch classic films from cinema history?' },
        { icon: 'lightbulb', label: 'Human brain mysteries', prompt: 'What are some unsolved mysteries about the human brain?' },
        { icon: 'confetti', label: 'Music evolution', prompt: 'How has music evolved over the past century?' },
        { icon: 'bolt', label: 'Future technology', prompt: 'What breakthrough technologies might we see in the next 10 years?' },
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


