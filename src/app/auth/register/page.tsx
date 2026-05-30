'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase-browser'

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createBrowserClient()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: name.trim() },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    setLoading(false)

    if (error) {
      if (error.message.includes('already registered')) {
        setError('An account with this email already exists. Please sign in instead.')
      } else {
        setError(error.message)
      }
      return
    }

    setSuccess(true)
  }

  return (
    <div className="w-full max-w-sm">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f59e0b] text-[#0a0a0b] text-xl font-bold">
          F
        </div>
        <h1 className="text-2xl font-bold text-[#e2e2e7]">Create your account</h1>
        <p className="mt-1 text-sm text-[#9ca3af]">Start building with Forge</p>
      </div>

      {/* Success state */}
      {success ? (
        <div className="rounded-lg border border-[#252529] bg-[#111113] p-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-[#e2e2e7]">Check your email</h2>
          <p className="mt-1 text-sm text-[#9ca3af]">
            We sent a confirmation link to <span className="text-[#f59e0b]">{email}</span>.
            Click it to activate your account.
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-xs text-[#6b7280]">
              Didn&apos;t receive it? Check your spam folder.
            </p>
            <Link
              href="/login"
              className="inline-block min-h-[44px] text-sm font-medium text-[#f59e0b] hover:underline"
            >
              ← Back to sign in
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Error message */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Register form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#9ca3af]">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                placeholder="Jane Doe"
                className="min-h-[44px] w-full rounded-lg border border-[#252529] bg-[#111113] px-3 text-sm text-[#e2e2e7] placeholder-[#6b7280] outline-none transition focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/30"
              />
            </div>

            <div>
              <label htmlFor="reg-email" className="mb-1.5 block text-sm font-medium text-[#9ca3af]">
                Email
              </label>
              <input
                id="reg-email"
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
              <label htmlFor="reg-password" className="mb-1.5 block text-sm font-medium text-[#9ca3af]">
                Password
              </label>
              <input
                id="reg-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="Minimum 6 characters"
                minLength={6}
                className="min-h-[44px] w-full rounded-lg border border-[#252529] bg-[#111113] px-3 text-sm text-[#e2e2e7] placeholder-[#6b7280] outline-none transition focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/30"
              />
              <p className="mt-1 text-xs text-[#6b7280]">Must be at least 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="min-h-[44px] w-full rounded-lg bg-[#f59e0b] px-4 text-sm font-semibold text-[#0a0a0b] transition hover:bg-[#d97706] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>
        </>
      )}

      {/* Login link */}
      <p className="mt-8 text-center text-sm text-[#9ca3af]">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-[#f59e0b] hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  )
}
