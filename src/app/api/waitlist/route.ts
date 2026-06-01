// EmbrOS — Waitlist API (Prisma / Railway Postgres)
//
// POST /api/waitlist  → Insert a new waitlist signup (deduped by email)
// GET  /api/waitlist  → Return total waitlist count
//
// Stores into the Railway Postgres `Waitlist` table via Prisma, so it works
// on the Railway deploy with only DATABASE_URL set (no Supabase needed).

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { email, name, source } = body as { email?: string; name?: string; source?: string }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Already on the list?
    const existing = await prisma.waitlist.findUnique({ where: { email: normalizedEmail } })
    if (existing) {
      return NextResponse.json({ error: 'This email is already on the waitlist' }, { status: 409 })
    }

    await prisma.waitlist.create({
      data: {
        email: normalizedEmail,
        name: (name || '').trim() || null,
        source: (source || 'landing-page').slice(0, 60),
      },
    })

    const count = await prisma.waitlist.count()

    return NextResponse.json({ success: true, position: count, message: 'You are on the waitlist!' })
  } catch (err) {
    console.error('[Waitlist] POST error:', err)
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const count = await prisma.waitlist.count()
    return NextResponse.json({ count })
  } catch (err) {
    console.error('[Waitlist] GET error:', err)
    return NextResponse.json({ count: 0 })
  }
}
