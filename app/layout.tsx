export const metadata = {
  title: 'Yurie',
  description: 'Yurie ChatKit App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5, user-scalable=yes" />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <script src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js" async></script>
        <style>{`
          :root { color-scheme: light dark; }
          html, body { 
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          @media (prefers-color-scheme: dark) {
            html, body { background-color: #000000; }
          }
        `}</style>
      </head>
      <body style={{ margin: 0, minHeight: '100svh' }}>{children}</body>
    </html>
  )
}


