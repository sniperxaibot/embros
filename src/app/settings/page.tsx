'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Settings, User, Mail, Globe, Shield, BookOpen,
  Sparkles, FolderOpen, Flame, LayoutDashboard,
  LogOut, Camera, Check
} from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase-browser'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Courses', href: '/courses', icon: BookOpen },
  { label: 'Prompts', href: '/prompts', icon: Sparkles },
  { label: 'Templates', href: '/templates', icon: FolderOpen },
  { label: 'Settings', href: '/settings', icon: Settings },
]

export default function SettingsPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [language, setLanguage] = useState<'en' | 'ro'>('en')
  const [tier, setTier] = useState<'free' | 'pro'>('free')
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const supabase = createBrowserClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }
        setEmail(user.email || '')
        setName(user.user_metadata?.full_name || user.user_metadata?.name || '')
        setTier(user.user_metadata?.tier || 'free')
        setLanguage(user.user_metadata?.language || 'en')
      } catch {
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [router])

  const handleSave = async () => {
    setSaved(false)
    try {
      const supabase = createBrowserClient()
      await supabase.auth.updateUser({
        data: { full_name: name, language, tier },
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      // Silent fail - user can retry
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#f59e0b] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#e2e2e7] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-56 border-r border-[#252529] bg-[#111113] flex-col shrink-0 sticky top-0 h-screen">
        <div className="h-14 flex items-center gap-2 px-4 border-b border-[#252529]">
          <div className="w-7 h-7 rounded-lg bg-[#f59e0b] flex items-center justify-center">
            <Flame className="w-4 h-4 text-[#0a0a0b]" />
          </div>
          <span className="font-bold text-sm tracking-tight">forge</span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = item.href === '/settings'
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-[#f59e0b]/10 text-[#f59e0b]' : 'text-[#94949c] hover:text-[#e2e2e7] hover:bg-[#1a1a1e]'}`}>
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-3 border-t border-[#252529] space-y-1">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#94949c]">
            <div className="w-6 h-6 rounded-full bg-[#f59e0b]/15 flex items-center justify-center">
              <User className="w-3 h-3 text-[#f59e0b]" />
            </div>
            <span className="truncate">Builder</span>
          </div>
          <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#94949c] hover:text-[#e2e2e7] hover:bg-[#1a1a1e] transition-colors w-full">
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-40 border-b border-[#252529] bg-[#0a0a0b]/90 backdrop-blur-xl lg:hidden">
          <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#f59e0b] flex items-center justify-center">
                <Flame className="w-4 h-4 text-[#0a0a0b]" />
              </div>
              <span className="font-bold text-sm tracking-tight">forge</span>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="mb-8">
            <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2 mb-2">
              <Settings className="w-6 h-6 text-[#f59e0b]" /> Settings
            </h1>
            <p className="text-sm text-[#6b6b73]">Manage your profile and preferences.</p>
          </div>

          {/* Profile Section */}
          <section className="mb-8 p-6 rounded-2xl border border-[#252529] bg-[#111113]">
            <h2 className="text-sm font-semibold mb-5 flex items-center gap-2">
              <User className="w-4 h-4 text-[#f59e0b]" /> Profile
            </h2>

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-[#f59e0b]/15 flex items-center justify-center">
                  <span className="text-xl font-bold text-[#f59e0b]">
                    {name ? name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#252529] border border-[#323238] flex items-center justify-center hover:bg-[#323238] transition-colors">
                  <Camera className="w-3 h-3 text-[#94949c]" />
                </button>
              </div>
              <div>
                <p className="text-sm font-medium">{name || 'Builder'}</p>
                <p className="text-xs text-[#6b6b73]">{email}</p>
              </div>
            </div>

            {/* Name */}
            <div className="mb-4">
              <label htmlFor="settings-name" className="mb-1.5 block text-sm font-medium text-[#9ca3af]">
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Display Name</span>
              </label>
              <input
                id="settings-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full min-h-[44px] rounded-lg border border-[#252529] bg-[#1a1a1e] px-3 text-sm text-[#e2e2e7] placeholder-[#6b7280] outline-none transition focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/30"
              />
            </div>

            {/* Email (read-only) */}
            <div className="mb-4">
              <label htmlFor="settings-email" className="mb-1.5 block text-sm font-medium text-[#9ca3af]">
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email</span>
              </label>
              <input
                id="settings-email"
                type="email"
                value={email}
                disabled
                className="w-full min-h-[44px] rounded-lg border border-[#252529] bg-[#1a1a1e] px-3 text-sm text-[#6b6b73] outline-none cursor-not-allowed"
              />
            </div>
          </section>

          {/* Preferences Section */}
          <section className="mb-8 p-6 rounded-2xl border border-[#252529] bg-[#111113]">
            <h2 className="text-sm font-semibold mb-5 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#3b82f6]" /> Preferences
            </h2>

            {/* Language Toggle */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-[#9ca3af]">Language</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${language === 'en' ? 'bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30' : 'bg-[#1a1a1e] text-[#94949c] border border-[#252529] hover:text-[#e2e2e7]'}`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('ro')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${language === 'ro' ? 'bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30' : 'bg-[#1a1a1e] text-[#94949c] border border-[#252529] hover:text-[#e2e2e7]'}`}
                >
                  Romana
                </button>
              </div>
            </div>
          </section>

          {/* Tier Section */}
          <section className="mb-8 p-6 rounded-2xl border border-[#252529] bg-[#111113]">
            <h2 className="text-sm font-semibold mb-5 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#a855f7]" /> Subscription
            </h2>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${tier === 'pro' ? 'bg-[#f59e0b]/15 text-[#f59e0b]' : 'bg-[#252529] text-[#94949c]'}`}
              >
                {tier === 'pro' ? 'PRO' : 'FREE'}
              </span>
              <p className="text-xs text-[#6b6b73]">
                {tier === 'pro' ? 'You have access to all courses, prompts, and templates.' : 'Upgrade to PRO for full access to all content and features.'}
              </p>
            </div>
            {tier === 'free' && (
              <button className="btn-primary mt-4 text-sm">
                Upgrade to PRO
              </button>
            )}
          </section>

          {/* Save Button */}
          <div className="flex items-center gap-3">
            <button onClick={handleSave} className="btn-primary">
              {saved ? <><Check className="w-4 h-4" /> Saved</> : 'Save Changes'}
            </button>
            {saved && <span className="text-xs text-[#10b981]">Changes saved successfully.</span>}
          </div>
        </main>
      </div>
    </div>
  )
}
