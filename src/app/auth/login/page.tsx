'use client'

import { createBrowserClient } from '@/lib/supabase-browser'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Flame, ArrowRight, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [magicLinkSent, setMagicLinkSent] = useState(false)

  const supabase = createBrowserClient()

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
    setLoading(false)
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      setError(error.message)
    } else {
      setMagicLinkSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="w-8 h-8 text-[#f59e0b]" />
            <span className="text-2xl font-bold text-white">Forge</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-[#9ca3af]">Sign in to continue building</p>
        </div>

        <div className="bg-[#111114] border border-[#1f1f23] rounded-2xl p-6 space-y-4">
          {magicLinkSent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#f59e0b]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flame className="w-8 h-8 text-[#f59e0b]" />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">Check your email</h2>
              <p className="text-[#9ca3af] text-sm">We sent a magic link to <span className="text-white">{email}</span></p>
              <button onClick={() => setMagicLinkSent(false)} className="mt-4 text-[#f59e0b] text-sm hover:underline">
                Try another method
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-2 p-1 bg-[#0a0a0b] rounded-lg">
                <button
                  onClick={() => setPassword('')}
                  className={`flex-1 py-2 text-sm rounded-md transition ${!password ? 'bg-[#f59e0b] text-[#0a0a0b] font-semibold' : 'text-[#9ca3af] hover:text-white'}`}
                >
                  Magic Link
                </button>
                <button
                  onClick={() => setPassword(' ')}
                  className={`flex-1 py-2 text-sm rounded-md transition ${password ? 'bg-[#f59e0b] text-[#0a0a0b] font-semibold' : 'text-[#9ca3af] hover:text-white'}`}
                >
                  Password
                </button>
              </div>

              <form onSubmit={password ? handleEmailLogin : handleMagicLink} className="space-y-4">
                <div>
                  <label className="block text-sm text-[#9ca3af] mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 bg-[#0a0a0b] border border-[#1f1f23] rounded-xl text-white placeholder-[#4b5563] focus:outline-none focus:border-[#f59e0b] transition-colors"
                  />
                </div>

                {password && (
                  <div>
                    <label className="block text-sm text-[#9ca3af] mb-1.5">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required={!!password}
                      className="w-full px-4 py-3 bg-[#0a0a0b] border border-[#1f1f23] rounded-xl text-white placeholder-[#4b5563] focus:outline-none focus:border-[#f59e0b] transition-colors"
                    />
                  </div>
                )}

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full py-3 bg-[#f59e0b] text-[#0a0a0b] font-semibold rounded-xl hover:bg-[#f59e0b]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  {password ? 'Sign In' : 'Send Magic Link'}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#1f1f23]" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-[#111114] px-2 text-[#4b5563]">or continue with</span></div>
              </div>

              <button
                onClick={async () => {
                  setLoading(true)
                  await supabase.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: `${window.location.origin}/auth/callback` } })
                  setLoading(false)
                }}
                className="w-full py-3 bg-[#1f1f23] text-white rounded-xl hover:bg-[#2a2a2e] transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                Continue with GitHub
              </button>
            </>
          )}
        </div>

        <p className="text-center text-[#4b5563] text-sm mt-6">
          Don't have an account? <Link href="/register" className="text-[#f59e0b] hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  )
}
