'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Sparkles, Copy, Check, Search, Filter, MessageSquare,
  Code2, Zap, Bot, Rocket, BookOpen, Flame,
  LayoutDashboard, Settings, FolderOpen, LogOut, User
} from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Courses', href: '/courses', icon: BookOpen },
  { label: 'Prompts', href: '/prompts', icon: Sparkles },
  { label: 'Templates', href: '/templates', icon: FolderOpen },
  { label: 'Settings', href: '/settings', icon: Settings },
]

interface Prompt {
  id: string
  title: string
  category: string
  content: string
  icon: typeof Code2
  color: string
}

const PROMPTS: Prompt[] = [
  { id: '1', title: 'Build a landing page', category: 'Frontend', content: 'Create a responsive landing page with a hero section, features grid, testimonials, and CTA. Use Tailwind CSS, mobile-first design, and semantic HTML. Include smooth scroll animations.', icon: Code2, color: '#3b82f6' },
  { id: '2', title: 'REST API scaffold', category: 'Backend', content: 'Generate a REST API with CRUD endpoints for a resource. Include input validation, error handling middleware, authentication checks, and proper HTTP status codes. Use Express or Next.js API routes.', icon: Zap, color: '#10b981' },
  { id: '3', title: 'Debug this error', category: 'Debugging', content: 'I have the following error: [paste error]. The relevant code is: [paste code]. Explain what causes this error and provide a fix. Show the corrected code with comments explaining the changes.', icon: Bot, color: '#ef4444' },
  { id: '4', title: 'Write unit tests', category: 'Testing', content: 'Write comprehensive unit tests for the following function: [paste function]. Cover edge cases, error scenarios, and typical usage. Use Jest/Vitest with descriptive test names and arrange-act-assert pattern.', icon: Rocket, color: '#a855f7' },
  { id: '5', title: 'Database schema design', category: 'Backend', content: 'Design a PostgreSQL schema for a [describe app]. Include tables, relationships, indexes, and RLS policies for Supabase. Add created_at/updated_at timestamps and proper constraints.', icon: Zap, color: '#f59e0b' },
  { id: '6', title: 'Refactor for readability', category: 'Code Quality', content: 'Refactor the following code for better readability and maintainability: [paste code]. Extract functions where appropriate, improve naming, remove duplication, and add TypeScript types.', icon: Code2, color: '#06b6d4' },
  { id: '7', title: 'AI agent system prompt', category: 'AI', content: 'Write a system prompt for an AI agent that [describe purpose]. Include role definition, capabilities, constraints, output format, and example interactions. Make it concise but thorough.', icon: Bot, color: '#8b5cf6' },
  { id: '8', title: 'Git commit messages', category: 'Workflow', content: 'Review these changes and write a conventional commit message. Use the format: type(scope): description. Types: feat, fix, refactor, docs, test, chore. Keep the subject under 72 characters.', icon: MessageSquare, color: '#f97316' },
  { id: '9', title: 'Component architecture', category: 'Frontend', content: 'Design the component architecture for a [describe feature]. List each component with its props interface, state management approach, and data flow. Use React with TypeScript.', icon: Code2, color: '#3b82f6' },
  { id: '10', title: 'Deploy checklist', category: 'Workflow', content: 'Create a production deployment checklist for a Next.js app on Vercel. Include environment variables, database migrations, DNS, SSL, monitoring, error tracking, and rollback plan.', icon: Rocket, color: '#10b981' },
  { id: '11', title: 'Code review prompt', category: 'Code Quality', content: 'Review this pull request for: security vulnerabilities, performance issues, code style, error handling, edge cases, and test coverage. Provide specific suggestions with code examples.', icon: MessageSquare, color: '#06b6d4' },
  { id: '12', title: 'RAG pipeline setup', category: 'AI', content: 'Design a RAG pipeline that: ingests documents, chunks them, generates embeddings, stores in a vector DB, and retrieves relevant context for LLM queries. Include code for each step.', icon: Bot, color: '#a855f7' },
]

const CATEGORIES = ['All', 'Frontend', 'Backend', 'AI', 'Debugging', 'Testing', 'Code Quality', 'Workflow']

export default function PromptsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filtered = PROMPTS.filter((p) => {
    const matchCat = category === 'All' || p.category === category
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const handleCopy = async (prompt: Prompt) => {
    await navigator.clipboard.writeText(prompt.content)
    setCopiedId(prompt.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

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
            const isActive = item.href === '/prompts'
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
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-[#a855f7]" /> AI Prompts Library
            </h1>
            <p className="text-sm text-[#6b6b73]">Copy-paste prompts for Cursor, Claude, Codex, and other AI tools. Click to copy.</p>
          </div>

          {/* Search + Filters */}
          <div className="mb-6 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#45454c]" />
              <input
                type="text"
                placeholder="Search prompts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full min-h-[44px] pl-10 pr-4 rounded-lg border border-[#252529] bg-[#1a1a1e] text-sm text-[#e2e2e7] placeholder-[#6b7280] outline-none transition focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/30"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-[#45454c]" />
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${category === cat ? 'bg-[#f59e0b]/15 text-[#f59e0b]' : 'bg-[#1a1a1e] text-[#94949c] hover:text-[#e2e2e7] border border-[#252529]'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((prompt) => {
              const Icon = prompt.icon
              const isCopied = copiedId === prompt.id
              return (
                <div key={prompt.id} className="group p-5 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] hover:border-[#323238] transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: prompt.color + '15' }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: prompt.color }} />
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#252529] text-[#6b6b73]">{prompt.category}</span>
                  </div>
                  <h3 className="text-sm font-semibold mb-2">{prompt.title}</h3>
                  <p className="text-xs text-[#6b6b73] mb-4 line-clamp-3">{prompt.content}</p>
                  <button
                    onClick={() => handleCopy(prompt)}
                    className={`w-full py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${isCopied ? 'bg-[#10b981]/15 text-[#10b981]' : 'bg-[#252529] text-[#94949c] hover:text-[#e2e2e7] hover:bg-[#323238]'}`}
                  >
                    {isCopied ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy Prompt</>}
                  </button>
                </div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 rounded-2xl border border-dashed border-[#252529] bg-[#111113]/50">
              <MessageSquare className="w-10 h-10 text-[#252529] mx-auto mb-3" />
              <h3 className="font-semibold mb-1">No prompts found</h3>
              <p className="text-sm text-[#6b6b73]">Try a different search or category.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
