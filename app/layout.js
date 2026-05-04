// app/layout.js
export const metadata = {
  title: 'Nexus360 — Gestão Inteligente para Negócios Locais',
  description: 'CRM, fidelidade, vendas e muito mais. Tudo em um só lugar.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#080C14', fontFamily: "'DM Sans', sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
