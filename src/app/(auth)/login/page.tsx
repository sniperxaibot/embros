'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase-browser'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createBrowserClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [magicLinkLoading, setMagicLinkLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [magicLinkSent, setMagicLinkSent] = useState(false)

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    setLoading(false)

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please try again.')
      } else if (error.message.includes('Email not confirmed')) {
        setError('Please confirm your email address before signing in.')
      } else {
        setError(error.message)
      }
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMagicLinkLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    setMagicLinkLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setMagicLinkSent(true)
  }

  return (
    <div className="w-full max-w-sm">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f59e0b] text-[#0a0a0b] text-xl font-bold">
          F
        </div>
        <h1 className="text-2xl font-bold text-[#e2e2e7]">Welcome to Forge</h1>
        <p className="mt-1 text-sm text-[#9ca3af]">Sign in to your account</p>
      </div>

      {/* Magic link success message */}
      {magicLinkSent ? (
        <div className="rounded-lg border border-[#252529] bg-[#111113] p-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-[#e2e2e7]">Check your email</h2>
          <p className="mt-1 text-sm text-[#9ca3af]">
            We sent a login link to <span className="text-[#f59e0b]">{email}</span>
          </p>
          <button
            onClick={() => setMagicLinkSent(false)}
            className="mt-4 min-h-[44px] text-sm text-[#f59e0b] hover:underline"
          >
            ← Back to sign in
          </button>
        </div>
      ) : (
        <>
          {/* Error message */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Password login form */}
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#9ca3af]">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="min-h-[44px] w-full rounded-lg border border-[#252529] bg-[#111113] px-3 text-sm text-[#e2e2e7] placeholder-[#6b7280] outline-none transition focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/30"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#9ca3af]">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                minLength={6}
                className="min-h-[44px] w-full rounded-lg border border-[#252529] bg-[#111113] px-3 text-sm text-[#e2e2e7] placeholder-[#6b7280] outline-none transition focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="min-h-[44px] w-full rounded-lg bg-[#f59e0b] px-4 text-sm font-semibold text-[#0a0a0b] transition hover:bg-[#d97706] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#252529]" />
            <span className="text-xs text-[#6b7280]">or</span>
            <div className="h-px flex-1 bg-[#252529]" />
          </div>

          {/* Magic link */}
          <form onSubmit={handleMagicLink}>
            <p className="mb-2 text-xs text-[#9ca3af]">
              We&apos;ll email you a magic link for a password-free sign in.
            </p>
            <button
              type="submit"
              disabled={magicLinkLoading || !email.trim()}
              className="min-h-[44px] w-full rounded-lg border border-[#252529] bg-[#111113] px-4 text-sm font-medium text-[#e2e2e7] transition hover:bg-[#1a1a1e] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {magicLinkLoading ? 'Sending link…' : 'Send me a login link'}
            </button>
          </form>
        </>
      )}

      {/* Create account link */}
      <p className="mt-8 text-center text-sm text-[#9ca3af]">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-medium text-[#f59e0b] hover:underline">
          Create Account
        </Link>
      </p>
    </div>
  )
}
