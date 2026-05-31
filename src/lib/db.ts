// FORGE — Prisma Client (singleton)
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (typeof window === 'undefined') {
  globalForPrisma.prisma = prisma
}
