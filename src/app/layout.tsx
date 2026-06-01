import type { Metadata, Viewport } from 'next'
import { Hanken_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// Clean modern grotesque — white UI type (Linear / Vercel register)
const sans = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

// System monospace — command-center voice (labels, data, ⌘ palette)
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#07070a',
}

export const metadata: Metadata = {
  title: 'EmbrOS — AI Builder Operating System',
  description: 'EmbrOS is the AI Builder Operating System that teaches anyone to build real products with AI agents. Not a chatbot. Not a course platform. An operating system for builders.',
  keywords: ['AI builder', 'build products', 'AI agents', 'learn to code', 'no-code', 'AI operating system', 'embros', 'builder platform'],
  openGraph: {
    title: 'EmbrOS — AI Builder Operating System',
    description: 'Teaches anyone to build real products with AI agents. Not a chatbot. Not a course platform. An operating system for builders.',
    type: 'website',
    locale: 'en_US',
    siteName: 'EmbrOS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EmbrOS — AI Builder Operating System',
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
    <html lang="en" className={`dark ${sans.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[#07070a] text-[#f4f4f7] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
