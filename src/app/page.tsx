'use client'

import { useState, useCallback } from 'react'
import { useForgeStore } from '../store/index'
import { Flame, Zap, Bot, Rocket, Target, Code2, BookOpen, ArrowRight, Menu, X, Plus, FolderOpen, MessageSquare, ChevronRight, Lightbulb } from 'lucide-react'
import IDEPanel from '../components/IDEPanel'

export default function Page() {
  const { view, setView, isAuthenticated } = useForgeStore()
  if (view === 'landing') return <LandingPage onStart={() => setView('onboarding')} />
  if (view === 'onboarding') return <OnboardingPage onComplete={() => setView('dashboard')} />
  if (view === 'dashboard') return <DashboardPage />
  if (view === 'ide') return <IDEPanelPage />
  if (view === 'courses') return <CoursesPage />
  if (view === 'books') return <BooksPage />
  if (view === 'prompts') return <PromptsPage />
  if (view === 'templates') return <TemplatesPage />
  return <LandingPage onStart={() => setView('onboarding')} />
}

function LandingPage({ onStart }: { onStart: () => void }) {
  const [mobileMenu, setMobileMenu] = useState(false)
  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-[#252529] bg-[#0a0a0b]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#f59e0b] flex items-center justify-center"><Flame className="w-5 h-5 text-[#0a0a0b]" /></div>
            <span className="text-lg font-bold tracking-tight">forge</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-[#94949c]">
            <a href="#features" className="hover:text-[#e2e2e7]">Features</a>
            <a href="#how" className="hover:text-[#e2e2e7]">How it works</a>
            <a href="#courses" className="hover:text-[#e2e2e7]">Courses</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onStart} className="btn-primary text-sm"><Flame className="w-4 h-4" /> Start Building</button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 hover:bg-[#1a1a1e] rounded">{mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-[#252529] bg-[#111113] px-4 py-3 space-y-2">
            <a href="#features" onClick={() => setMobileMenu(false)} className="block py-2 text-sm text-[#94949c]">Features</a>
            <a href="#how" onClick={() => setMobileMenu(false)} className="block py-2 text-sm text-[#94949c]">How it works</a>
            <a href="#courses" onClick={() => setMobileMenu(false)} className="block py-2 text-sm text-[#94949c]">Courses</a>
          </div>
        )}
      </nav>
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#252529] text-xs text-[#94949c] mb-6 sm:mb-8"><Zap className="w-3.5 h-3.5 text-[#f59e0b]" /> AI-Powered Builder Platform</div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-4 sm:mb-6">Anyone can build<br /><span className="text-[#f59e0b]">software now.</span></h1>
          <p className="text-base sm:text-lg md:text-xl text-[#6b6b73] max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">Forge is an AI-native builder platform that helps anyone go from idea to launched product. No coding experience needed.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={onStart} className="btn-primary w-full sm:w-auto text-base"><Flame className="w-5 h-5" /> Start Building - Free</button>
            <a href="#how" className="btn-secondary w-full sm:w-auto">See how it works</a>
          </div>
          <p className="text-xs text-[#45454c] mt-6">Web - Windows - macOS - Linux - iOS - Android</p>
        </div>
      </section>
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#252529]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">What is Forge?</h2>
          <p className="text-[#6b6b73] text-center max-w-lg mx-auto mb-10 sm:mb-14">Three powerful systems working together to make you a builder.</p>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: <Code2 className="w-5 h-5" />, title: 'AI Workspace', desc: 'A Cursor-like editor where AI agents write code, create files, and build features while you learn.', color: '#f59e0b' },
              { icon: <Target className="w-5 h-5" />, title: 'Adaptive Learning', desc: 'Forge detects what you need and teaches it at the right moment. Not courses - just-in-time lessons.', color: '#3b82f6' },
              { icon: <Rocket className="w-5 h-5" />, title: 'Launch System', desc: 'From idea to product brief to deployed app. AI agents handle the technical heavy lifting.', color: '#10b981' },
            ].map(f => (
              <div key={f.title} className="p-6 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] transition-colors">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: f.color + '15' }}><span style={{ color: f.color }}>{f.icon}</span></div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-[#6b6b73] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#252529]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">Who is Forge for?</h2>
          <p className="text-[#6b6b73] text-center max-w-lg mx-auto mb-10 sm:mb-14">If you have an idea, Forge is for you.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { emoji: '🎓', title: 'Students', desc: 'Learn by building real projects, not watching tutorials.' },
              { emoji: '💼', title: 'Professionals', desc: 'Build tools and products without going back to school.' },
              { emoji: '🔄', title: 'Career Changers', desc: 'Transition into tech by actually building, not just studying.' },
              { emoji: '💡', title: 'Founders', desc: 'Validate ideas and ship MVPs in days, not months.' },
            ].map(p => (
              <div key={p.title} className="p-5 rounded-xl border border-[#252529] bg-[#111113] text-center">
                <div className="text-3xl mb-3">{p.emoji}</div>
                <h3 className="font-semibold mb-1">{p.title}</h3>
                <p className="text-xs text-[#6b6b73]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="how" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#252529]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-14">How it works</h2>
          {[
            { n: '01', t: 'Describe your idea', d: 'Tell Forge what you want to build. Any idea, any ambition.', icon: Lightbulb },
            { n: '02', t: 'AI creates your project', d: 'Agents generate real files with real code. HTML, CSS, JavaScript, React.', icon: Bot },
            { n: '03', t: 'Build and learn', d: 'Edit, customize, ask questions. Learn by doing, not watching.', icon: Code2 },
            { n: '04', t: 'Ship it', d: 'Deploy anywhere. Your code, your product, your users.', icon: Rocket },
          ].map(s => (
            <div key={s.n} className="flex gap-4 sm:gap-6 mb-8 sm:mb-10 last:mb-0">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[#111113] border border-[#252529] flex items-center justify-center"><s.icon className="w-5 h-5 text-[#f59e0b]" /></div>
              <div>
                <div className="text-[10px] font-mono text-[#f59e0b] mb-1">STEP {s.n}</div>
                <h3 className="text-base sm:text-lg font-semibold mb-1">{s.t}</h3>
                <p className="text-sm text-[#6b6b73] leading-relaxed">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="courses" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#252529]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">Learn while building</h2>
          <p className="text-[#6b6b73] text-center max-w-lg mx-auto mb-10 sm:mb-14">10 courses with real content. Bilingual English/Romanian.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'AI Builder Foundations', emoji: '🏗️' },
              { title: 'Prompt Engineering', emoji: '✍️' },
              { title: 'Agentic Development', emoji: '🤖' },
              { title: 'Building SaaS with AI', emoji: '🏢' },
              { title: 'MCP & Tool Agents', emoji: '🔌' },
              { title: 'Launching Products', emoji: '🚀' },
            ].map(c => (
              <div key={c.title} className="p-4 rounded-xl border border-[#252529] bg-[#111113] flex items-center gap-3">
                <span className="text-2xl">{c.emoji}</span>
                <span className="text-sm font-medium">{c.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#252529]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to forge something?</h2>
          <p className="text-[#6b6b73] mb-6 sm:mb-8">Open the editor, describe your idea, and start building. It's free.</p>
          <button onClick={onStart} className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"><Flame className="w-5 h-5" /> Open Forge - Free</button>
        </div>
      </section>
      <footer className="border-t border-[#252529] py-8 px-4 text-center">
        <p className="text-sm text-[#45454c] mb-2">Forge v0.2.0 - Where ideas become software.</p>
        <p className="text-xs text-[#252529]">Bilingual: English | Romana</p>
      </footer>
    </div>
  )
}

function OnboardingPage({ onComplete }: { onComplete: () => void }) {
  const { login } = useForgeStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [step, setStep] = useState(0)
  const handleSubmit = () => {
    login(email || 'builder@forge.local', name || 'Builder')
    onComplete()
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#f59e0b] flex items-center justify-center mx-auto mb-4"><Flame className="w-7 h-7 text-[#0a0a0b]" /></div>
          <h1 className="text-2xl font-bold mb-2">Welcome to Forge</h1>
          <p className="text-[#6b6b73] text-sm">Let&apos;s set up your builder profile.</p>
        </div>
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Your name</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="What should we call you?" className="w-full bg-[#111113] border border-[#252529] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#f59e0b] placeholder:text-[#45454c]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email (optional)</label>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="w-full bg-[#111113] border border-[#252529] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#f59e0b] placeholder:text-[#45454c]" />
            </div>
            <button onClick={() => setStep(1)} className="btn-primary w-full mt-2">Continue <ArrowRight className="w-4 h-4" /></button>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold mb-3">What do you want to build?</h3>
            {['A website or landing page', 'A SaaS product', 'A mobile app', 'A bot or automation', 'I have an idea but not sure'].map(idea => (
              <button key={idea} onClick={handleSubmit} className="w-full text-left p-3 rounded-lg border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] hover:border-[#f59e0b]/50 text-sm transition-colors">{idea}</button>
            ))}
          </div>
        )}
        <button onClick={handleSubmit} className="text-xs text-[#45454c] hover:text-[#6b6b73] mt-4 block mx-auto">Skip for now</button>
      </div>
    </div>
  )
}

function DashboardPage() {
  const { user, projects, setView, createProject, setActiveProject } = useForgeStore()
  const [showNew, setShowNew] = useState(false)
  const [newIdea, setNewIdea] = useState('')
  const startProject = () => {
    if (!newIdea.trim()) return
    const id = 'proj-' + Date.now()
    createProject({
      id, name: newIdea.slice(0, 40) + (newIdea.length > 40 ? '...' : ''), description: newIdea, idea: newIdea, status: 'planning', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), template: 'Blank Project', techStack: ['Next.js', 'TypeScript', 'Tailwind'], features: [], mvpScope: [], roadmap: [], assignedAgents: ['orchestrator', 'builder'], files: [{ id: 'f-' + Date.now(), name: 'README.md', type: 'file', language: 'markdown', content: '# ' + newIdea + '\n\nBuilt with Forge.' }], lessons: [], notes: '',
    })
    setShowNew(false)
    setNewIdea('')
  }
  return (
    <div className="min-h-screen">
      <header className="h-14 border-b border-[#252529] flex items-center px-4 sm:px-6 gap-3 bg-[#111113]">
        <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-[#f59e0b] flex items-center justify-center"><Flame className="w-4 h-4 text-[#0a0a0b]" /></div><span className="font-bold">forge</span></div>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <button onClick={() => setView('courses')} className="p-2 hover:bg-[#1a1a1e] rounded-lg text-[#6b6b73]"><BookOpen className="w-4 h-4" /></button>
          <button onClick={() => setView('books')} className="p-2 hover:bg-[#1a1a1e] rounded-lg text-[#6b6b73]"><BookOpen className="w-4 h-4" /></button>
          <button onClick={() => setView('prompts')} className="p-2 hover:bg-[#1a1a1e] rounded-lg text-[#6b6b73]"><MessageSquare className="w-4 h-4" /></button>
          <button onClick={() => setView('templates')} className="p-2 hover:bg-[#1a1a1e] rounded-lg text-[#6b6b73]"><FolderOpen className="w-4 h-4" /></button>
          <div className="h-6 w-px bg-[#252529] mx-1" />
          <div className="w-7 h-7 rounded-full bg-[#f59e0b]/20 flex items-center justify-center text-xs font-bold text-[#f59e0b]">{user?.name?.charAt(0) || 'B'}</div>
        </div>
      </header>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-1">Welcome back, {user?.name || 'Builder'}</h1>
          <p className="text-sm text-[#6b6b73]">What do you want to build today?</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <button onClick={() => setShowNew(true)} className="p-4 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] text-left"><Plus className="w-5 h-5 text-[#f59e0b] mb-2" /><div className="text-sm font-medium">New Project</div><div className="text-xs text-[#6b6b73]">Start from an idea</div></button>
          <button onClick={() => setView('courses')} className="p-4 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] text-left"><BookOpen className="w-5 h-5 text-[#3b82f6] mb-2" /><div className="text-sm font-medium">Courses</div><div className="text-xs text-[#6b6b73]">10 courses</div></button>
          <button onClick={() => setView('books')} className="p-4 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] text-left"><BookOpen className="w-5 h-5 text-[#10b981] mb-2" /><div className="text-sm font-medium">Books</div><div className="text-xs text-[#6b6b73]">5 builder guides</div></button>
          <button onClick={() => setView('templates')} className="p-4 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] text-left"><FolderOpen className="w-5 h-5 text-[#a855f7] mb-2" /><div className="text-sm font-medium">Templates</div><div className="text-xs text-[#6b6b73]">10 starter templates</div></button>
        </div>
        {showNew && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowNew(false)} />
            <div className="relative bg-[#111113] border border-[#252529] rounded-xl p-6 w-full max-w-lg">
              <h2 className="text-lg font-bold mb-4">Describe your idea</h2>
              <textarea value={newIdea} onChange={e => setNewIdea(e.target.value)} placeholder="I want to build a..." className="w-full bg-[#0a0a0b] border border-[#252529] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#f59e0b] placeholder:text-[#45454c] h-28 resize-none" />
              <div className="flex gap-3 mt-4">
                <button onClick={startProject} className="btn-primary flex-1" disabled={!newIdea.trim()}><Zap className="w-4 h-4" /> Generate Project</button>
                <button onClick={() => setShowNew(false)} className="btn-secondary">Cancel</button>
              </div>
            </div>
          </div>
        )}
        <div>
          <h2 className="text-lg font-semibold mb-4">Your Projects</h2>
          {projects.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-[#252529] rounded-xl">
              <FolderOpen className="w-10 h-10 text-[#252529] mx-auto mb-3" />
              <p className="text-[#6b6b73] text-sm mb-4">No projects yet. Start your first one!</p>
              <button onClick={() => setShowNew(true)} className="btn-primary text-sm"><Plus className="w-4 h-4" /> New Project</button>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map(p => (
                <button key={p.id} onClick={() => { setActiveProject(p.id); setView('ide'); }} className="w-full text-left p-4 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] transition-colors group">
                  <div className="flex items-center justify-between">
                    <div><h3 className="font-medium text-sm">{p.name}</h3><p className="text-xs text-[#6b6b73] mt-0.5">{p.template} - {p.files.length} files</p></div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${p.status === 'planning' ? 'bg-[#f59e0b]/15 text-[#f59e0b]' : p.status === 'building' ? 'bg-[#3b82f6]/15 text-[#3b82f6]' : p.status === 'deployed' ? 'bg-[#10b981]/15 text-[#10b981]' : 'bg-[#252529] text-[#6b6b73]'}`}>{p.status}</span>
                      <ChevronRight className="w-4 h-4 text-[#45454c] group-hover:text-[#f59e0b]" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function IDEPanelPage() {
  const { activeProject, setView, updateProject } = useForgeStore()
  if (!activeProject) return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><p className="text-[#6b6b73] mb-4">No project selected</p><button onClick={() => setView('dashboard')} className="btn-primary">Back to Dashboard</button></div></div>
  return (
    <IDEPanel
      initialFiles={activeProject.files}
      projectName={activeProject.name}
      onBack={() => setView('dashboard')}
    />
  )
}

function CoursesPage() {
  const { setView } = useForgeStore()
  const courses = [
    { id: 'c1', title: 'AI Builder Foundations', emoji: '🏗️', color: '#f59e0b', level: 'Beginner', lessons: 12, hours: 8 },
    { id: 'c2', title: 'AI-Assisted Programming', emoji: '💻', color: '#3b82f6', level: 'Beginner', lessons: 15, hours: 10 },
    { id: 'c3', title: 'Prompt Engineering', emoji: '✍️', color: '#a855f7', level: 'Beginner', lessons: 10, hours: 6 },
    { id: 'c4', title: 'Agentic Development', emoji: '🤖', color: '#10b981', level: 'Intermediate', lessons: 14, hours: 12 },
    { id: 'c5', title: 'Human-in-the-Loop Systems', emoji: '🔄', color: '#f97316', level: 'Intermediate', lessons: 10, hours: 8 },
    { id: 'c6', title: 'Autonomous Coding', emoji: '⚡', color: '#ef4444', level: 'Advanced', lessons: 12, hours: 10 },
    { id: 'c7', title: 'MCP & Tool Agents', emoji: '🔌', color: '#06b6d4', level: 'Advanced', lessons: 16, hours: 14 },
    { id: 'c8', title: 'Building SaaS with AI', emoji: '🏢', color: '#8b5cf6', level: 'Intermediate', lessons: 20, hours: 20 },
    { id: 'c9', title: 'Building Bots', emoji: '🤖', color: '#ec4899', level: 'Beginner', lessons: 10, hours: 8 },
    { id: 'c10', title: 'Launching Products', emoji: '🚀', color: '#22c55e', level: 'Intermediate', lessons: 12, hours: 10 },
  ]
  return (
    <div className="min-h-screen">
      <header className="h-14 border-b border-[#252529] flex items-center px-4 sm:px-6 gap-3 bg-[#111113]"><button onClick={() => setView('dashboard')} className="text-sm text-[#6b6b73] hover:text-[#e2e2e7]">{"<- Dashboard"}</button><span className="font-bold">Courses</span></header>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-1">Courses</h1>
        <p className="text-sm text-[#6b6b73] mb-6">Learn by doing. Bilingual English/Romanian.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map(c => (
            <div key={c.id} className="p-5 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] transition-colors">
              <div className="flex items-start justify-between mb-3"><span className="text-2xl">{c.emoji}</span><span className={`text-[10px] px-2 py-0.5 rounded-full ${c.level === 'Beginner' ? 'bg-[#10b981]/15 text-[#10b981]' : c.level === 'Intermediate' ? 'bg-[#f59e0b]/15 text-[#f59e0b]' : 'bg-[#ef4444]/15 text-[#ef4444]'}`}>{c.level}</span></div>
              <h3 className="font-semibold mb-1">{c.title}</h3>
              <p className="text-xs text-[#6b6b73] mb-3">{c.lessons} lessons - {c.hours}h</p>
              <div className="h-1 bg-[#252529] rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: '0%', backgroundColor: c.color }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BooksPage() {
  const { setView } = useForgeStore()
  return (
    <div className="min-h-screen">
      <header className="h-14 border-b border-[#252529] flex items-center px-4 sm:px-6 gap-3 bg-[#111113]"><button onClick={() => setView('dashboard')} className="text-sm text-[#6b6b73] hover:text-[#e2e2e7]">{"<- Dashboard"}</button><span className="font-bold">Books</span></header>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-1">Books & Guides</h1>
        <p className="text-sm text-[#6b6b73] mb-6">Long-form guides for builders. Bilingual English/Romanian.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: 'b1', title: 'The Forge Builder Handbook', emoji: '📖', color: '#f59e0b', chapters: 8 },
            { id: 'b2', title: 'From Idea to Product', emoji: '💡', color: '#3b82f6', chapters: 10 },
            { id: 'b3', title: 'Building with AI Agents', emoji: '🤖', color: '#10b981', chapters: 8 },
            { id: 'b4', title: 'Human-in-the-Loop Engineering', emoji: '🔄', color: '#f97316', chapters: 6 },
            { id: 'b5', title: 'The AI Founder Playbook', emoji: '🚀', color: '#8b5cf6', chapters: 10 },
          ].map(b => (
            <div key={b.id} className="p-5 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] transition-colors">
              <div className="text-3xl mb-3">{b.emoji}</div>
              <h3 className="font-semibold mb-1">{b.title}</h3>
              <p className="text-xs text-[#45454c]">{b.chapters} chapters</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PromptsPage() {
  const { setView } = useForgeStore()
  const [copied, setCopied] = useState<string | null>(null)
  const prompts = [
    { id: 'p1', title: 'Create Component', cat: 'Cursor', content: 'Create a React component that [describe]. Use TypeScript, Tailwind CSS, accessible markup, dark theme (#0a0a0b bg, #f59e0b accent), mobile-responsive. Add comments.' },
    { id: 'p2', title: 'Debug Error', cat: 'Debug', content: "I'm getting this error: [paste]\n\nCode:\n```\n[paste]\n```\n\nPlease: 1) Explain cause 2) Fix 3) Prevention tips." },
    { id: 'p3', title: 'Add Feature', cat: 'Cursor', content: 'Add [feature] to my project. Context: files [list], stack [list], requirements [describe]. Create/modify files with clean code, error handling.' },
    { id: 'p4', title: 'Refactor', cat: 'Refactor', content: 'Refactor this code:\n```\n[paste]\n```\n\nFocus on: readability, performance, modern practices, remove duplication. Explain changes.' },
    { id: 'p5', title: 'Deploy Vercel', cat: 'Deploy', content: 'Deploy this Next.js project to Vercel. Review for issues, suggest env vars, create vercel.json, provide commands.' },
    { id: 'p6', title: 'Agent System', cat: 'Agent', content: 'Set up AI agent system: define agent roles, communication patterns, task delegation, error handling, monitoring.' },
    { id: 'p7', title: 'Product Plan', cat: 'Product', content: 'Plan: [idea]. Create: 1) Product brief 2) Target audience 3) Features (prioritized) 4) MVP scope 5) Tech stack 6) Roadmap 7) Metrics.' },
    { id: 'p8', title: 'API Endpoint', cat: 'Backend', content: 'Create REST endpoint for [resource]. Requirements: [method], Zod validation, error handling, TypeScript, Prisma.' },
    { id: 'p9', title: 'Telegram Bot', cat: 'Bot', content: 'Build Telegram bot: [purpose]. Include grammY setup, command handlers, inline keyboards, state management, deployment.' },
    { id: 'p10', title: 'Code Review (RO)', cat: 'Romanian', content: 'Esti un senior developer roman. Fa un review acestui cod si ofera feedback constructiv in limba romana.' },
  ]
  return (
    <div className="min-h-screen">
      <header className="h-14 border-b border-[#252529] flex items-center px-4 sm:px-6 gap-3 bg-[#111113]"><button onClick={() => setView('dashboard')} className="text-sm text-[#6b6b73] hover:text-[#e2e2e7]">{"<- Dashboard"}</button><span className="font-bold">Prompts</span></header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-1">Prompt Library</h1>
        <p className="text-sm text-[#6b6b73] mb-6">Reusable prompts for AI builders. Click to copy.</p>
        <div className="space-y-3">
          {prompts.map(p => (
            <div key={p.id} className="p-4 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2"><h3 className="font-medium text-sm">{p.title}</h3><span className="text-[10px] px-2 py-0.5 rounded-full bg-[#252529] text-[#6b6b73]">{p.cat}</span></div>
                <button onClick={() => { navigator.clipboard.writeText(p.content); setCopied(p.id); setTimeout(() => setCopied(null), 2000); }} className="text-xs text-[#6b6b73] hover:text-[#f59e0b]">{copied === p.id ? 'Copied!' : 'Copy'}</button>
              </div>
              <pre className="text-xs text-[#94949c] whitespace-pre-wrap font-mono bg-[#0a0a0b] rounded-lg p-3 overflow-x-auto">{p.content}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TemplatesPage() {
  const { setView, createProject } = useForgeStore()
  const templates = [
    { id: 't1', name: 'SaaS Application', emoji: '🏢', color: '#3b82f6', stack: 'Next.js, Prisma, Stripe' },
    { id: 't2', name: 'Landing Page', emoji: '🎯', color: '#f59e0b', stack: 'HTML, CSS, JS' },
    { id: 't3', name: 'AI Chatbot', emoji: '🤖', color: '#a855f7', stack: 'Next.js, OpenRouter' },
    { id: 't4', name: 'Telegram Bot', emoji: '📱', color: '#06b6d4', stack: 'TypeScript, grammY' },
    { id: 't5', name: 'Automation Tool', emoji: '⚡', color: '#f97316', stack: 'TypeScript, Node.js' },
    { id: 't6', name: 'Web3 Dashboard', emoji: '⛓️', color: '#8b5cf6', stack: 'Next.js, wagmi' },
    { id: 't7', name: 'Course Platform', emoji: '🎓', color: '#10b981', stack: 'Next.js, Prisma' },
    { id: 't8', name: 'Mobile App', emoji: '📱', color: '#ec4899', stack: 'React Native, Expo' },
    { id: 't9', name: 'API Backend', emoji: '🔌', color: '#22c55e', stack: 'Express, Prisma' },
    { id: 't10', name: 'Agent Workflow', emoji: '🔄', color: '#f59e0b', stack: 'TypeScript, OpenRouter' },
  ]
  return (
    <div className="min-h-screen">
      <header className="h-14 border-b border-[#252529] flex items-center px-4 sm:px-6 gap-3 bg-[#111113]"><button onClick={() => setView('dashboard')} className="text-sm text-[#6b6b73] hover:text-[#e2e2e7]">{"<- Dashboard"}</button><span className="font-bold">Templates</span></header>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-1">Project Templates</h1>
        <p className="text-sm text-[#6b6b73] mb-6">Start with a template and customize it.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map(t => (
            <button key={t.id} onClick={() => {
              const id = 'proj-' + Date.now()
              createProject({ id, name: t.name, description: t.name + ' project', idea: 'Build a ' + t.name, status: 'planning', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), template: t.name, techStack: t.stack.split(', '), features: [], mvpScope: [], roadmap: [], assignedAgents: ['orchestrator', 'builder'], files: [{ id: 'f-' + Date.now(), name: 'README.md', type: 'file', language: 'markdown', content: '# ' + t.name + '\n\nBuilt with Forge.' }], lessons: [], notes: '' })
            }} className="p-5 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] hover:border-[#f59e0b]/50 text-left transition-colors group">
              <div className="flex items-start justify-between mb-3"><span className="text-2xl">{t.emoji}</span><ArrowRight className="w-4 h-4 text-[#45454c] group-hover:text-[#f59e0b]" /></div>
              <h3 className="font-semibold mb-1">{t.name}</h3>
              <p className="text-[10px] text-[#45454c]">{t.stack}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}