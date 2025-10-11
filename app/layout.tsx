export const metadata = {
  title: 'Yurie',
  description: 'Yurie ChatKit App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js" async></script>
        <style>{`
          :root { color-scheme: dark; }
          html, body { background-color: #000000; }
        `}</style>
      </head>
      <body style={{ margin: 0, minHeight: '100svh', backgroundColor: '#000000' }}>{children}</body>
    </html>
  )
}


