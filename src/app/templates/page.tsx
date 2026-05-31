'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FolderOpen, Code2, Zap, Bot, Rocket, Globe,
  Filter, ChevronRight, BookOpen, Sparkles, Flame,
  LayoutDashboard, Settings, LogOut, User, Layers
} from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Courses', href: '/courses', icon: BookOpen },
  { label: 'Prompts', href: '/prompts', icon: Sparkles },
  { label: 'Templates', href: '/templates', icon: FolderOpen },
  { label: 'Settings', href: '/settings', icon: Settings },
]

interface Template {
  id: string
  name: string
  description: string
  category: string
  techStack: string[]
  icon: typeof Code2
  color: string
}

const TEMPLATES: Template[] = [
  { id: '1', name: 'SaaS Starter', description: 'Full-stack SaaS boilerplate with auth, billing, dashboard, and landing page. Ready to deploy on Vercel.', category: 'Full-Stack', techStack: ['Next.js', 'Supabase', 'Stripe', 'Tailwind'], icon: Rocket, color: '#f59e0b' },
  { id: '2', name: 'Landing Page', description: 'High-converting landing page with hero, features, testimonials, pricing, and CTA sections.', category: 'Frontend', techStack: ['Next.js', 'Tailwind', 'Framer Motion'], icon: Globe, color: '#3b82f6' },
  { id: '3', name: 'AI Chat App', description: 'Chat interface with streaming responses, message history, and multiple AI provider support.', category: 'AI', techStack: ['Next.js', 'OpenAI', 'Vercel AI SDK'], icon: Bot, color: '#a855f7' },
  { id: '4', name: 'REST API', description: 'Production-ready API with auth, validation, rate limiting, error handling, and OpenAPI docs.', category: 'Backend', techStack: ['Node.js', 'Express', 'PostgreSQL', 'JWT'], icon: Zap, color: '#10b981' },
  { id: '5', name: 'Portfolio Site', description: 'Developer portfolio with project showcase, blog, contact form, and dark mode toggle.', category: 'Frontend', techStack: ['Next.js', 'MDX', 'Tailwind'], icon: Code2, color: '#06b6d4' },
  { id: '6', name: 'E-Commerce Store', description: 'Online store with product catalog, cart, checkout, and order management. Stripe integration.', category: 'Full-Stack', techStack: ['Next.js', 'Supabase', 'Stripe', 'Tailwind'], icon: Layers, color: '#f97316' },
  { id: '7', name: 'Blog Platform', description: 'Content platform with MDX posts, categories, search, RSS feed, and SEO optimization.', category: 'Frontend', techStack: ['Next.js', 'MDX', 'Tailwind', 'Contentlayer'], icon: BookOpen, color: '#8b5cf6' },
  { id: '8', name: 'AI Agent Starter', description: 'Autonomous agent template with tool use, memory, planning loop, and conversation management.', category: 'AI', techStack: ['TypeScript', 'LangChain', 'Supabase', 'OpenAI'], icon: Bot, color: '#ef4444' },
  { id: '9', name: 'Dashboard Admin', description: 'Admin dashboard with data tables, charts, user management, and role-based access control.', category: 'Full-Stack', techStack: ['Next.js', 'Recharts', 'Supabase', 'Tailwind'], icon: LayoutDashboard, color: '#10b981' },
]

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Full-Stack', 'AI']

export default function TemplatesPage() {
  const [category, setCategory] = useState('All')

  const filtered = category === 'All' ? TEMPLATES : TEMPLATES.filter((t) => t.category === category)

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#e2e2e7] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-56 border-r border-[#252529] bg-[#111113] flex-col shrink-0 sticky top-0 h-screen">
        <div className="h-14 flex items-center gap-2 px-4 border-b border-[#252529]">
          <div className="w-7 h-7 rounded-lg bg-[#f59e0b] flex items-center justify-center">
            <Flame className="w-4 h-4 text-[#0a0a0b]" />
          </div>
          <span className="font-bold text-sm tracking-tight">forge</span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = item.href === '/templates'
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
              <span className="font-bold text-sm tracking-tight">forge</span>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2 mb-2">
              <FolderOpen className="w-6 h-6 text-[#f59e0b]" /> Project Templates
            </h1>
            <p className="text-sm text-[#6b6b73]">Starter templates for common project types. Clone and start building in minutes.</p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <Filter className="w-4 h-4 text-[#45454c]" />
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${category === cat ? 'bg-[#f59e0b]/15 text-[#f59e0b]' : 'bg-[#1a1a1e] text-[#94949c] hover:text-[#e2e2e7] border border-[#252529]'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Template Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((template) => {
              const Icon = template.icon
              return (
                <div key={template.id} className="group p-5 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] hover:border-[#323238] transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: template.color + '15' }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: template.color }} />
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#252529] text-[#6b6b73]">{template.category}</span>
                  </div>
                  <h3 className="text-sm font-semibold mb-1 group-hover:text-[#f59e0b] transition-colors">{template.name}</h3>
                  <p className="text-xs text-[#6b6b73] mb-3 line-clamp-2">{template.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {template.techStack.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-[#252529] text-[#6b6b73]">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#45454c] group-hover:text-[#f59e0b] transition-colors">
                    Use template <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 rounded-2xl border border-dashed border-[#252529] bg-[#111113]/50">
              <FolderOpen className="w-10 h-10 text-[#252529] mx-auto mb-3" />
              <h3 className="font-semibold mb-1">No templates found</h3>
              <p className="text-sm text-[#6b6b73]">Try a different category.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
