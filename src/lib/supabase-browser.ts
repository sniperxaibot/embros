// FORGE — Supabase Browser Client
// For Client Components only

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    '[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
      'Set them in .env.local. Authentication will not work.'
  )
}

export function createBrowserClient() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
