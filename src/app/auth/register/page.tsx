'use client'

import { getBrowserClient } from '@/lib/supabase-safe'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Loader2 } from 'lucide-react'
import { ForgeLogo, ForgeMark } from '@/components/ForgeLogo'

export const dynamic = 'force-dynamic'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checkEmail, setCheckEmail] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = getBrowserClient()
    if (!supabase) { setError('Client not ready'); setLoading(false); return }
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { name: name.trim() } }
    })
    if (error) {
      setError(error.message)
    } else {
      setCheckEmail(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ForgeLogo markClass="w-8 h-8" wordClass="text-2xl" />
          </div>
          <h1 className="text-xl font-semibold mb-1">Create your account</h1>
          <p className="text-sm text-[#6b6b73]">Start building with AI agents</p>
        </div>

        <div className="bg-[#111113] border border-[#252529] rounded-2xl p-6 space-y-4">
          {checkEmail ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-[#f59e0b]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <ForgeMark className="w-6 h-6" />
              </div>
              <h2 className="text-sm font-semibold mb-1">Check your email</h2>
              <p className="text-xs text-[#6b6b73]">Confirmation link sent to <span className="text-[#e2e2e7]">{email}</span></p>
            </div>
          ) : (
            <>
              <form onSubmit={handleRegister} className="space-y-3">
                <div>
                  <label className="block text-xs text-[#6b6b73] mb-1">Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required
                    className="w-full px-3 py-2.5 bg-[#0a0a0b] border border-[#252529] rounded-lg text-sm placeholder-[#45454c] outline-none focus:border-[#f59e0b]" />
                </div>
                <div>
                  <label className="block text-xs text-[#6b6b73] mb-1">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required
                    className="w-full px-3 py-2.5 bg-[#0a0a0b] border border-[#252529] rounded-lg text-sm placeholder-[#45454c] outline-none focus:border-[#f59e0b]" />
                </div>
                <div>
                  <label className="block text-xs text-[#6b6b73] mb-1">Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" required minLength={6}
                    className="w-full px-3 py-2.5 bg-[#0a0a0b] border border-[#252529] rounded-lg text-sm placeholder-[#45454c] outline-none focus:border-[#f59e0b]" />
                </div>
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <button type="submit" disabled={loading || !email || !password}
                  className="w-full py-2.5 bg-[#f59e0b] text-[#0a0a0b] font-semibold rounded-lg text-sm hover:bg-[#fbbf24] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  Create Account
                </button>
              </form>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#252529]" /></div>
                <div className="relative flex justify-center text-[10px]"><span className="bg-[#111113] px-2 text-[#45454c]">or</span></div>
              </div>

              <button onClick={async () => {
                setLoading(true)
                const supabase = getBrowserClient()
                if (supabase) await supabase.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: `${window.location.origin}/auth/callback` } })
                setLoading(false)
              }} className="w-full py-2.5 bg-[#1a1a1e] text-[#94949c] rounded-lg text-sm hover:bg-[#252529] transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                Continue with GitHub
              </button>
            </>
          )}
        </div>
        <p className="text-center text-[#45454c] text-xs mt-4">
          Already have an account? <Link href="/login" className="text-[#f59e0b] hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
