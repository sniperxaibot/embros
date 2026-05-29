// FORGE - Database Client (Prisma)
// Railway PostgreSQL connection
//
// Setup:
// 1. Add PostgreSQL service in Railway dashboard
// 2. Railway auto-injects DATABASE_URL
// 3. Run: npx prisma db push (creates tables)
// 4. Run: npx prisma generate (generates client types)
//
// For development without DATABASE_URL, this module gracefully degrades.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let db: any = null
let prismaAvailable = false

try {
  // Dynamic import to avoid errors when Prisma client isn't generated yet
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { PrismaClient } = require('@prisma/client')
  const globalForPrisma = globalThis as any

  db = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = db
  }
  prismaAvailable = true
} catch {
  console.log('[DB] Prisma client not generated yet. Run: npx prisma generate')
  console.log('[DB] Using local-only mode until database is connected.')
}

export { db, prismaAvailable }

// ─── Helper to check DB availability ───
export function requireDb() {
  if (!prismaAvailable || !db) {
    throw new Error('Database not connected. Add PostgreSQL service in Railway dashboard and run: npx prisma db push')
  }
  return db
}

// ─── User Operations ───
export async function createUser(data: { email?: string; name: string }) {
  const d = requireDb()
  return d.user.create({ data })
}

export async function getUserById(id: string) {
  const d = requireDb()
  return d.user.findUnique({ where: { id } })
}

export async function getUserByEmail(email: string) {
  const d = requireDb()
  return d.user.findUnique({ where: { email } })
}

// ─── Project Operations ───
export async function createProject(data: {
  userId: string; name: string; description?: string; idea?: string; template?: string; techStack?: string[]
}) {
  const d = requireDb()
  return d.project.create({ data })
}

export async function getUserProjects(userId: string) {
  const d = requireDb()
  return d.project.findMany({ where: { userId }, orderBy: { updatedAt: 'desc' } })
}

export async function updateProject(id: string, data: Record<string, any>) {
  const d = requireDb()
  return d.project.update({ where: { id }, data })
}

export async function deleteProject(id: string) {
  const d = requireDb()
  return d.project.delete({ where: { id } })
}

// ─── Course Operations ───
export async function getCourses() {
  const d = requireDb()
  return d.course.findMany({
    where: { isPublished: true },
    include: { modules: { include: { lessons: { select: { id: true, title: true } } } } },
    orderBy: { createdAt: 'asc' },
  })
}

export async function getCourseBySlug(slug: string) {
  const d = requireDb()
  return d.course.findUnique({
    where: { slug },
    include: { modules: { include: { lessons: true }, orderBy: { order: 'asc' } } },
  })
}

// ─── Progress Operations ───
export async function markLessonComplete(userId: string, lessonId: string) {
  const d = requireDb()
  return d.lessonProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    create: { userId, lessonId, completed: true, completedAt: new Date() },
    update: { completed: true, completedAt: new Date() },
  })
}

export async function getUserProgress(userId: string) {
  const d = requireDb()
  return d.lessonProgress.findMany({
    where: { userId, completed: true },
    include: { lesson: { select: { id: true, title: true, moduleId: true } } },
  })
}
