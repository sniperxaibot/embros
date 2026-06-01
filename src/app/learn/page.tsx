'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen, Code2, Zap, Bot, Rocket, GraduationCap,
  Filter, ChevronRight, Flame, LayoutDashboard, Settings,
  FolderOpen, Sparkles, LogOut, User
} from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Courses', href: '/courses', icon: BookOpen },
  { label: 'Prompts', href: '/prompts', icon: Sparkles },
  { label: 'Templates', href: '/templates', icon: FolderOpen },
  { label: 'Settings', href: '/settings', icon: Settings },
]

interface Course {
  id: string
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  lessons: number
  icon: typeof Code2
  color: string
}

const COURSES: Course[] = [
  { id: '1', title: 'HTML & CSS Foundations', description: 'Learn the building blocks of every website. Structure content with HTML and style it with CSS.', level: 'beginner', lessons: 12, icon: Code2, color: '#3b82f6' },
  { id: '2', title: 'JavaScript Essentials', description: 'Master variables, functions, loops, and DOM manipulation to make pages interactive.', level: 'beginner', lessons: 18, icon: Zap, color: '#f59e0b' },
  { id: '3', title: 'React for Builders', description: 'Build modern UIs with components, state, and hooks. Create your first single-page app.', level: 'intermediate', lessons: 15, icon: Code2, color: '#06b6d4' },
  { id: '4', title: 'Node.js & APIs', description: 'Build backend services, REST APIs, and connect to databases with Node.js and Express.', level: 'intermediate', lessons: 14, icon: Rocket, color: '#10b981' },
  { id: '5', title: 'AI Agents & Prompting', description: 'Learn to design AI agents, write effective prompts, and integrate LLMs into your apps.', level: 'advanced', lessons: 10, icon: Bot, color: '#a855f7' },
  { id: '6', title: 'Full-Stack with Next.js', description: 'Combine frontend and backend with Next.js. Server components, API routes, and deployment.', level: 'advanced', lessons: 20, icon: Rocket, color: '#ef4444' },
  { id: '7', title: 'Git & Version Control', description: 'Track changes, collaborate with others, and manage code history like a professional.', level: 'beginner', lessons: 8, icon: Code2, color: '#f97316' },
  { id: '8', title: 'Database Design', description: 'Design schemas, write queries, and manage data with SQL and Supabase.', level: 'intermediate', lessons: 11, icon: Zap, color: '#8b5cf6' },
]

const LEVEL_COLORS: Record<string, string> = {
  beginner: '#10b981',
  intermediate: '#f59e0b',
  advanced: '#ef4444',
}

export default function LearnPage() {
  const [filter, setFilter] = useState<string>('all')

  const filtered = filter === 'all' ? COURSES : COURSES.filter((c) => c.level === filter)

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#e2e2e7] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-56 border-r border-[#252529] bg-[#111113] flex-col shrink-0 sticky top-0 h-screen">
        <div className="h-14 flex items-center gap-2 px-4 border-b border-[#252529]">
          <div className="w-7 h-7 rounded-lg bg-[#f59e0b] flex items-center justify-center">
            <Flame className="w-4 h-4 text-[#0a0a0b]" />
          </div>
          <span className="font-bold text-sm tracking-tight">embrOS</span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = item.href === '/courses'
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-[#f59e0b]/10 text-[#f59e0b]' : 'text-[#94949c] hover:text-[#e2e2e7] hover:bg-[#1a1a1e]'}`}>
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-3 border-t border-[#252529] space-y-1">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#94949c]">
            <div className="w-6 h-6 rounded-full bg-[#f59e0b]/15 flex items-center justify-center">
              <User className="w-3 h-3 text-[#f59e0b]" />
            </div>
            <span className="truncate">Builder</span>
          </div>
          <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#94949c] hover:text-[#e2e2e7] hover:bg-[#1a1a1e] transition-colors w-full">
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-40 border-b border-[#252529] bg-[#0a0a0b]/90 backdrop-blur-xl lg:hidden">
          <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#f59e0b] flex items-center justify-center">
                <Flame className="w-4 h-4 text-[#0a0a0b]" />
              </div>
              <span className="font-bold text-sm tracking-tight">embrOS</span>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2 mb-2">
              <GraduationCap className="w-6 h-6 text-[#f59e0b]" /> Learning Hub
            </h1>
            <p className="text-sm text-[#6b6b73]">Structured courses to take you from zero to builder. Pick a track and start learning.</p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <Filter className="w-4 h-4 text-[#45454c]" />
            {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === level ? 'bg-[#f59e0b]/15 text-[#f59e0b]' : 'bg-[#1a1a1e] text-[#94949c] hover:text-[#e2e2e7] border border-[#252529]'}`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((course) => {
              const Icon = course.icon
              const levelColor = LEVEL_COLORS[course.level]
              return (
                <div key={course.id} className="group p-5 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] hover:border-[#323238] transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: course.color + '15' }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: course.color }} />
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: levelColor + '15', color: levelColor }}>
                      {course.level}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold mb-1 group-hover:text-[#f59e0b] transition-colors">{course.title}</h3>
                  <p className="text-xs text-[#6b6b73] mb-3 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#45454c] flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> {course.lessons} lessons
                    </span>
                    <span className="text-[10px] text-[#45454c] group-hover:text-[#f59e0b] transition-colors flex items-center gap-0.5">
                      Start <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 rounded-2xl border border-dashed border-[#252529] bg-[#111113]/50">
              <BookOpen className="w-10 h-10 text-[#252529] mx-auto mb-3" />
              <h3 className="font-semibold mb-1">No courses found</h3>
              <p className="text-sm text-[#6b6b73]">Try changing the filter.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
