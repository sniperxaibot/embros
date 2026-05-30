// FORGE — Waitlist API
// Stores signups in a local JSON file (dev) — ready for Supabase migration

import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const WAITLIST_FILE = path.join(DATA_DIR, 'waitlist.json')

async function getWaitlist(): Promise<WaitlistEntry[]> {
  try {
    const raw = await fs.readFile(WAITLIST_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function saveWaitlist(entries: WaitlistEntry[]) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(WAITLIST_FILE, JSON.stringify(entries, null, 2))
}

interface WaitlistEntry {
  id: string
  email: string
  name: string
  createdAt: string
  source: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, name } = body

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const entries = await getWaitlist()

    // Check for duplicates
    if (entries.some(e => e.email === normalizedEmail)) {
      return NextResponse.json({ error: 'This email is already on the waitlist' }, { status: 409 })
    }

    const entry: WaitlistEntry = {
      id: 'wl-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8),
      email: normalizedEmail,
      name: (name || '').trim(),
      createdAt: new Date().toISOString(),
      source: 'landing-page',
    }

    entries.push(entry)
    await saveWaitlist(entries)

    return NextResponse.json({
      success: true,
      position: entries.length,
      message: 'You are on the waitlist!',
    })
  } catch (err) {
    console.error('Waitlist error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const entries = await getWaitlist()
    return NextResponse.json({ count: entries.length })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}
