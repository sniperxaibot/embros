import { createServerClient } from '@/lib/supabase'
import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

async function getUser() {
  const supabase = await createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user ?? null
}

// ─── LIST / CREATE PROJECTS ───
export async function GET() {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
  })

  return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const project = await prisma.project.create({
    data: {
      userId: user.id,
      name: body.name || 'New Project',
      description: body.description || '',
      idea: body.idea || '',
      template: body.template || null,
      techStack: body.techStack || [],
    }
  })

  return NextResponse.json(project)
}
