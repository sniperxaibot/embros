import { createServerClient } from '@/lib/supabase'
import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

async function getUser() {
  const supabase = await createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user ?? null
}

// ─── GET single project ───
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const project = await prisma.project.findFirst({
    where: { id: params.id, userId: user.id },
  })

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }

  return NextResponse.json(project)
}
