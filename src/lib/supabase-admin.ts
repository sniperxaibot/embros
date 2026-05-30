// FORGE — Supabase Admin Client (Service Role)
//
// ⚠️ SERVER-ONLY. Never import this in client components or expose to the browser.
// The service_role key bypasses Row Level Security (RLS).
//
// Use this for:
//   - Admin API endpoints that need to bypass RLS
//   - Server-side data migrations
//   - Any operation requiring elevated privileges
//
// Typical usage:
//   import { createAdminClient } from '@/lib/supabase-admin'
//   const supabase = createAdminClient()
//   const { data, error } = await supabase.from('waitlist').select('*')

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn(
    '[Supabase Admin] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. ' +
      'Set them in .env.local. Admin operations will fail.'
  )
}

// Cached client singleton (server-side only, safe because service_role is secret)
let cachedAdminClient: ReturnType<typeof createClient> | null = null

export function createAdminClient() {
  if (cachedAdminClient) return cachedAdminClient

  cachedAdminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  return cachedAdminClient
}
