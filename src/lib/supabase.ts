// FORGE — Supabase Server Client
// For Server Components, Route Handlers, and Server Actions ONLY
// DO NOT import this in Client Components

import {
  createServerClient as ssrCreateServerClient,
  type CookieOptions,
} from '@supabase/ssr'
import { cookies } from 'next/headers'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    '[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
      'Set them in .env.local. Authentication will not work.'
  )
}

export async function createServerClient() {
  const cookieStore = await cookies()

  return ssrCreateServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch {
          // In Server Components, cookies may be read-only.
          // This is expected — use middleware for session refresh.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options })
        } catch {
          // Same as above.
        }
      },
    },
  })
}
