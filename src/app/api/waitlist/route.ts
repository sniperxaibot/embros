// FORGE — Waitlist API (Supabase Edition)
//
// POST /api/waitlist  → Insert a new waitlist signup (with duplicate check)
// GET  /api/waitlist  → Return total waitlist count

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'

interface WaitlistInsert {
  email: string
  name: string
  source: string
  created_at: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, name } = body as { email?: string; name?: string }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const supabase = createAdminClient()

    // Check for duplicates
    const { data: existing, error: selectError } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', normalizedEmail)
      .maybeSingle()

    if (selectError && selectError.code !== 'PGRST116') {
      console.error('[Waitlist] Duplicate check error:', selectError)
    }

    if (existing) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 409 }
      )
    }

    const newEntry: WaitlistInsert = {
      email: normalizedEmail,
      name: (name || '').trim(),
      source: 'landing-page',
      created_at: new Date().toISOString(),
    }

    const { error: insertError } = await supabase.from('waitlist').insert(newEntry as any)

    if (insertError) {
      console.error('[Waitlist] Insert error:', insertError)
      return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
    }

    // Get updated count for position
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({
      success: true,
      position: count ?? 0,
      message: 'You are on the waitlist!',
    })
  } catch (err) {
    console.error('[Waitlist] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('[Waitlist] Count error:', error)
      return NextResponse.json({ count: 0 })
    }

    return NextResponse.json({ count: count ?? 0 })
  } catch (err) {
    console.error('[Waitlist] Count unexpected error:', err)
    return NextResponse.json({ count: 0 })
  }
}
