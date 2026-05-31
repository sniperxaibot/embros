// FORGE — Safe Supabase browser client
// Only creates client when window is available (client-side only)

import { createClient, SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

export function getBrowserClient(): SupabaseClient | null {
  if (typeof window === 'undefined') return null
  if (client) return client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) return null

  client = createClient(url, key)
  return client
}
