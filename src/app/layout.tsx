import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0b',
}

export const metadata: Metadata = {
  title: 'Forge — Build What You Care About',
  description: 'AI-powered builder for everyone. Pick a template, tell the AI what you want, watch it build.',
  manifest: '/manifest.json',
  icons: { icon: '/favicon.svg', apple: '/icon-192.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0a0b] text-[#e2e2e7] antialiased">
        {children}
      </body>
    </html>
  )
}
