import { Analytics } from '@vercel/analytics/next'
import { Fraunces, Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const fraunces = Fraunces({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Inger & Alex',
  description: 'Ultra-modern literary website for a steampunk and urban fantasy novelist. Discover immersive worlds, captivating characters, and groundbreaking storytelling.',
  icons: {
    icon: '/inger-logo.png',
    shortcut: '/inger-logo.png',
    apple: '/inger-logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: [{ color: '#0a0a0a' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`} style={{ fontFamily: 'var(--font-sans)' }}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
