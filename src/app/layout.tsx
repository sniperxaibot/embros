import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0b',
}

export const metadata: Metadata = {
  title: 'Forge — AI Builder Operating System',
  description: 'Forge is the AI Builder Operating System that teaches anyone to build real products with AI agents. Not a chatbot. Not a course platform. An operating system for builders.',
  keywords: ['AI builder', 'build products', 'AI agents', 'learn to code', 'no-code', 'AI operating system', 'forge', 'builder platform'],
  openGraph: {
    title: 'Forge — AI Builder Operating System',
    description: 'Teaches anyone to build real products with AI agents. Not a chatbot. Not a course platform. An operating system for builders.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Forge',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forge — AI Builder Operating System',
    description: 'Teaches anyone to build real products with AI agents. Not a chatbot. Not a course platform.',
  },
  manifest: '/manifest.json',
  icons: { icon: '/favicon.svg', apple: '/icon-192.png' },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[#0a0a0b] text-[#e2e2e7] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
