export const metadata = {
  title: 'Yurie',
  description: 'Yurie ChatKit App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js" async></script>
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}


