// FORGE — Dashboard Page
// Shows the user's projects, a create-project button, and a skill-map preview.
// Protected by middleware (redirects to /login if not authenticated).

'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Plus, FolderOpen, Clock, Zap, BarChart3, BookOpen,
  ChevronRight, Sparkles, Target, Code2, Flame,
  MessageSquare, GraduationCap, Rocket, Bot
} from 'lucide-react'

interface ProjectSummary {
  id: string
  name: string
  description: string | null
  status: string
  techStack: string
  createdAt: string
  updatedAt: string
}

// Status badge colour map
const STATUS_COLORS: Record<string, string> = {
  planning: '#f59e0b',
  building: '#3b82f6',
  testing: '#a855f7',
  deployed: '#10b981',
}

const STATUS_ICONS: Record<string, typeof Zap> = {
  planning: Target,
  building: Code2,
  testing: Bot,
  deployed: Rocket,
}

export default function DashboardPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<ProjectSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [creating, setCreating] = useState(false)

  // Fetch projects on mount
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/projects')
      if (res.status === 401) {
        router.push('/login')
        return
      }
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setProjects(data.projects || [])
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load projects')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Create a new project via API
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim() || creating) return

    setCreating(true)
    setError(null)

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName.trim(),
          description: newDescription.trim() || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create project')
        return
      }

      // If DB connected, navigate to project workspace
      // If not connected, the API returns a mock project
      setShowCreate(false)
      setNewName('')
      setNewDescription('')

      if (!data.warning) {
        // DB connected — go to workspace
        router.push(`/workspace/${data.project.id}`)
      } else {
        // DB not connected — just refresh list
        fetchProjects()
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create project')
    } finally {
      setCreating(false)
    }
  }

  // Parse tech stack from JSON string
  const parseTech = (raw: string): string[] => {
    try {
      return JSON.parse(raw)
    } catch {
      return []
    }
  }

  const skillCategories = [
    { name: 'Frontend', level: 35, icon: Code2, color: '#3b82f6', skills: ['HTML/CSS', 'JavaScript', 'React'] },
    { name: 'Backend', level: 20, icon: Zap, color: '#a855f7', skills: ['Node.js', 'APIs', 'Databases'] },
    { name: 'AI & ML', level: 10, icon: Bot, color: '#f59e0b', skills: ['Prompts', 'Models', 'Agents'] },
    { name: 'DevOps', level: 5, icon: Rocket, color: '#10b981', skills: ['Git', 'CI/CD', 'Deploy'] },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#e2e2e7]">
      {/* ─── Top Bar ─── */}
      <header className="sticky top-0 z-40 border-b border-[#252529] bg-[#0a0a0b]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#f59e0b] flex items-center justify-center">
              <Flame className="w-4 h-4 text-[#0a0a0b]" />
            </div>
            <span className="font-bold text-sm tracking-tight">forge</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/prompts"
              className="flex items-center gap-1.5 text-xs text-[#94949c] hover:text-[#e2e2e7] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" /> Prompts
            </Link>
            <Link
              href="/templates"
              className="flex items-center gap-1.5 text-xs text-[#94949c] hover:text-[#e2e2e7] transition-colors"
            >
              <FolderOpen className="w-3.5 h-3.5" /> Templates
            </Link>
            <div className="w-7 h-7 rounded-full bg-[#f59e0b]/15 flex items-center justify-center">
              <span className="text-[10px] font-semibold text-[#f59e0b]">U</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* ─── Welcome Banner ─── */}
        <div className="mb-8 p-6 rounded-2xl border border-[#252529] bg-gradient-to-br from-[#f59e0b]/5 to-transparent">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-[#f59e0b]" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold mb-1">Welcome back, Builder 🔥</h1>
              <p className="text-sm text-[#6b6b73] max-w-lg">
                Your AI workspace is ready. Continue a project or start something new — the agents are standing by.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Error Banner ─── */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="p-1 hover:bg-red-500/10 rounded">
              <span className="sr-only">Dismiss</span>
              ✕
            </button>
          </div>
        )}

        {/* ─── Projects Section ─── */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-[#f59e0b]" /> Projects
              </h2>
              <p className="text-xs text-[#45454c] mt-0.5">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="btn-primary text-sm"
            >
              <Plus className="w-4 h-4" /> New Project
            </button>
          </div>

          {/* Create project modal overlay */}
          {showCreate && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/60" onClick={() => setShowCreate(false)} />
              <div className="relative w-full max-w-md bg-[#111113] border border-[#252529] rounded-2xl p-6 shadow-2xl shadow-black/50">
                <h3 className="text-lg font-semibold mb-4">New Project</h3>
                <form onSubmit={handleCreate} className="space-y-4">
                  <div>
                    <label htmlFor="proj-name" className="mb-1.5 block text-sm font-medium text-[#9ca3af]">
                      Project Name
                    </label>
                    <input
                      id="proj-name"
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      required
                      placeholder="My Awesome App"
                      className="min-h-[44px] w-full rounded-lg border border-[#252529] bg-[#1a1a1e] px-3 text-sm text-[#e2e2e7] placeholder-[#6b7280] outline-none transition focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="proj-desc" className="mb-1.5 block text-sm font-medium text-[#9ca3af]">
                      Description <span className="text-[#45454c]">(optional)</span>
                    </label>
                    <textarea
                      id="proj-desc"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      rows={3}
                      placeholder="A brief description of what you want to build..."
                      className="w-full rounded-lg border border-[#252529] bg-[#1a1a1e] px-3 py-2 text-sm text-[#e2e2e7] placeholder-[#6b7280] outline-none transition focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/30 resize-none"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowCreate(false)}
                      className="btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={creating || !newName.trim()}
                      className="btn-primary flex-1"
                    >
                      {creating ? 'Creating…' : 'Create Project'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Project cards */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-5 rounded-xl border border-[#252529] bg-[#111113] animate-pulse">
                  <div className="h-4 w-32 bg-[#252529] rounded mb-3" />
                  <div className="h-3 w-full bg-[#252529] rounded mb-2" />
                  <div className="h-3 w-2/3 bg-[#252529] rounded" />
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border border-dashed border-[#252529] bg-[#111113]/50">
              <FolderOpen className="w-10 h-10 text-[#252529] mx-auto mb-3" />
              <h3 className="font-semibold mb-1">No projects yet</h3>
              <p className="text-sm text-[#6b6b73] mb-4">Create your first project to get started.</p>
              <button onClick={() => setShowCreate(true)} className="btn-primary">
                <Plus className="w-4 h-4" /> Create Project
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => {
                const statusColor = STATUS_COLORS[project.status] || '#6b6b73'
                const StatusIcon = STATUS_ICONS[project.status] || Code2
                const tech = parseTech(project.techStack)

                return (
                  <div
                    key={project.id}
                    className="group p-5 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] hover:border-[#323238] transition-all cursor-pointer"
                    onClick={() => router.push(`/workspace/${project.id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-sm group-hover:text-[#f59e0b] transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-xs text-[#45454c] mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(project.updatedAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric',
                          })}
                        </p>
                      </div>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0"
                        style={{ backgroundColor: statusColor + '15', color: statusColor }}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {project.status}
                      </span>
                    </div>

                    {project.description && (
                      <p className="text-xs text-[#6b6b73] mb-3 line-clamp-2">{project.description}</p>
                    )}

                    {tech.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {tech.slice(0, 4).map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-[#252529] text-[#6b6b73]">
                            {t}
                          </span>
                        ))}
                        {tech.length > 4 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#252529] text-[#6b6b73]">
                            +{tech.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-[10px] text-[#45454c] group-hover:text-[#f59e0b] transition-colors">
                      Open project <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* ─── Skill Map Preview ─── */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#3b82f6]" /> Skill Map
              </h2>
              <p className="text-xs text-[#45454c] mt-0.5">Your builder proficiency across domains</p>
            </div>
            <Link
              href="/learn"
              className="text-xs text-[#f59e0b] hover:underline flex items-center gap-1"
            >
              View full map <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillCategories.map((cat) => {
              const Icon = cat.icon
              return (
                <div
                  key={cat.name}
                  className="p-4 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: cat.color + '15' }}
                    >
                      <Icon className="w-4 h-4" style={{ color: cat.color }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">{cat.name}</h3>
                      <p className="text-[10px] text-[#45454c]">{cat.level}%</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 bg-[#252529] rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: cat.level + '%', backgroundColor: cat.color }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((skill) => (
                      <span key={skill} className="text-[10px] px-1.5 py-0.5 rounded bg-[#252529] text-[#6b6b73]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ─── Quick Actions ─── */}
        <section>
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-5">
            <BarChart3 className="w-5 h-5 text-[#10b981]" /> Quick Actions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'Browse Courses',
                desc: 'Structured learning paths with AI mentorship',
                icon: BookOpen,
                color: '#3b82f6',
                href: '/courses',
              },
              {
                title: 'AI Prompts Library',
                desc: 'Copy-paste prompts for Cursor, Codex, Claude',
                icon: MessageSquare,
                color: '#a855f7',
                href: '/prompts',
              },
              {
                title: 'Project Templates',
                desc: 'Starter templates for common project types',
                icon: FolderOpen,
                color: '#f59e0b',
                href: '/templates',
              },
            ].map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group p-5 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] hover:border-[#323238] transition-all"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: action.color + '15' }}
                >
                  <action.icon className="w-4.5 h-4.5" style={{ color: action.color }} />
                </div>
                <h3 className="text-sm font-semibold mb-1 group-hover:text-[#f59e0b] transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs text-[#6b6b73]">{action.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-[#252529] mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between text-xs text-[#45454c]">
          <span>© 2025 Forge. Built to make you a builder.</span>
          <div className="flex items-center gap-1">
            <Flame className="w-3 h-3 text-[#f59e0b]" />
            <span className="text-[#f59e0b]">v0.2.0</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
