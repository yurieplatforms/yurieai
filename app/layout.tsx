export const metadata = {
  title: 'Yurie',
  description: 'Yurie ChatKit App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0b0b0b" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js" async></script>
        <style>{`
          :root { color-scheme: light dark; }
          html, body { background-color: #0b0b0b; }
          @media (prefers-color-scheme: light) {
            html, body { background-color: #ffffff; }
          }
        `}</style>
      </head>
      <body style={{ margin: 0, minHeight: '100svh', backgroundColor: '#0b0b0b' }}>{children}</body>
    </html>
  )
}


