// FORGE — Simple file-based storage for development & production fallback
// Used when no database is available (Railway without Prisma)

import { promises as fs } from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

const DATA_DIR = path.join(process.cwd(), 'data')

async function readData(filename: string): Promise<any[]> {
  try {
    const filePath = path.join(DATA_DIR, filename)
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content)
  } catch {
    return []
  }
}

async function writeData(filename: string, data: any[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  const filePath = path.join(DATA_DIR, filename)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

// ─── Waitlist API ───

export async function getWaitlist() {
  return readData('waitlist.json')
}

export async function addToWaitlist(email: string, name?: string, source?: string) {
  const list = await readData('waitlist.json')
  if (list.find((e: any) => e.email === email)) {
    return { success: false, error: 'Already registered' }
  }
  list.push({ email, name: name || '', source: source || 'cli', createdAt: new Date().toISOString() })
  await writeData('waitlist.json', list)
  return { success: true }
}

export async function getWaitlistCount() {
  const list = await readData('waitlist.json')
  return list.length
}

// ─── Projects API (file-based) ───

export async function getProjects(userId: string) {
  const projects = await readData('projects.json')
  return projects.filter((p: any) => p.userId === userId)
}

export async function createProject(userId: string, data: Record<string, any>) {
  const projects = await readData('projects.json')
  const project = {
    id: 'proj_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    userId,
    name: data.name || 'New Project',
    description: data.description || '',
    status: 'planning',
    techStack: data.techStack || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  projects.push(project)
  await writeData('projects.json', projects)
  return project
}

export async function getProject(projectId: string, userId: string) {
  const projects = await readData('projects.json')
  return projects.find((p: any) => p.id === projectId && p.userId === userId) || null
}

// ─── Courses data (static) ───

export const COURSES = [
  {
    id: 'ai-fundamentals',
    slug: 'ai-fundamentals',
    title: 'AI Fundamentals',
    description: 'Learn the basics of AI, machine learning, and how to use AI tools.',
    icon: 'Brain',
    color: '#3b82f6',
    level: 'beginner',
    tags: ['ai', 'basics'],
    totalLessons: 12,
    estimatedHours: 6,
  },
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Web Development Zero to Hero',
    description: 'Build modern web apps with HTML, CSS, JavaScript, and React.',
    icon: 'Code2',
    color: '#f59e0b',
    level: 'beginner',
    tags: ['web', 'html', 'css', 'javascript'],
    totalLessons: 20,
    estimatedHours: 15,
  },
  {
    id: 'startup-builder',
    slug: 'startup-builder',
    title: 'Startup Builder',
    description: 'From idea to MVP. Build, launch, and grow a startup using AI.',
    icon: 'Rocket',
    color: '#10b981',
    level: 'intermediate',
    tags: ['startup', 'mvp', 'launch'],
    totalLessons: 15,
    estimatedHours: 10,
  },
]

export const PROMPTS = [
  { id: '1', title: 'Create a Landing Page', content: 'Create a modern, responsive landing page for [PRODUCT]. Include: hero section with headline and CTA, features grid, testimonials, pricing table, and footer. Use dark theme with amber accents. Mobile-first.', category: 'web', tags: ['landing', 'html', 'css'] },
  { id: '2', title: 'Build a REST API', content: 'Build a REST API for [RESOURCE] with GET, POST, PUT, DELETE endpoints. Use Express.js with TypeScript. Include validation and error handling.', category: 'backend', tags: ['api', 'express', 'typescript'] },
  { id: '3', title: 'Explain This Code', content: 'Explain the following code in simple terms. Break it down line by line:\n\n[PASTE CODE HERE]', category: 'learning', tags: ['explain', 'tutorial'] },
  { id: '4', title: 'Debug This Error', content: 'I got this error: [PASTE ERROR]\n\nHere is my code: [PASTE CODE]\n\nFind the bug and provide the fix.', category: 'debugging', tags: ['debug', 'fix'] },
  { id: '5', title: 'SEO Optimization Plan', content: 'Create an SEO optimization plan for [APPLICATION]. Include: keyword research, on-page SEO checklist, meta tags, content strategy.', category: 'marketing', tags: ['seo', 'marketing', 'growth'] },
  { id: '6', title: 'Write Unit Tests', content: 'Write comprehensive unit tests for: [PASTE CODE]\n\nUse Jest. Include: happy path, edge cases, error cases, mocks.', category: 'testing', tags: ['test', 'jest'] },
]

export const TEMPLATES = [
  { id: '1', slug: 'nextjs-boilerplate', name: 'Next.js Boilerplate', description: 'Next.js 14 starter with TypeScript, Tailwind, App Router.', icon: 'Code2', color: '#f59e0b', techStack: ['Next.js', 'TypeScript', 'Tailwind'], category: 'web' },
  { id: '2', slug: 'saas-starter', name: 'SaaS Starter Kit', description: 'Complete SaaS boilerplate with auth, billing, dashboard.', icon: 'Rocket', color: '#3b82f6', techStack: ['Next.js', 'Supabase', 'Stripe'], category: 'web' },
  { id: '3', slug: 'ai-chat-app', name: 'AI Chat Application', description: 'Streaming AI chat with conversation history.', icon: 'Bot', color: '#a855f7', techStack: ['Next.js', 'OpenRouter'], category: 'ai' },
  { id: '4', slug: 'portfolio-site', name: 'Developer Portfolio', description: 'Clean portfolio site with projects showcase.', icon: 'User', color: '#10b981', techStack: ['Next.js', 'MDX'], category: 'web' },
]
