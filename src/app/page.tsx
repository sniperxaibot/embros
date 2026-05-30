'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useForgeStore } from '../store/index'
import { Flame, Bot, Rocket, Target, Code2, BookOpen, ArrowRight, Menu, X, Plus, FolderOpen, MessageSquare, ChevronRight, Lightbulb, Mail, CheckCircle, Users, Cpu, GraduationCap, Globe, ArrowDown, Zap, Shield, Sparkles, ChevronDown } from 'lucide-react'

export default function Page() {
  const { view, setView } = useForgeStore()
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

// ── Agent data ──────────────────────────────────────────────────────────────

const agentSteps = [
  { text: "I will build a SaaS dashboard with auth, Stripe, and dark theme. Assigning to Builder Agent...", tags: ['Next.js', 'Stripe', 'Auth'] },
  { text: "Creating project structure... Running tests... All passing. Ready for your review.", tags: ['Files: 12', 'Tests: OK'] },
  { text: "I noticed you have not worked with Stripe before. Quick lesson: Stripe uses webhooks.", tags: ['Lesson: Stripe', '2 min'] },
  { text: "Deploying to Vercel... Build complete. Your dashboard is live.", tags: ['Deployed', 'Live'] },
]

const agentCards = [
  { name: 'Orchestrator', role: 'Lead agent', color: '#f59e0b' },
  { name: 'Builder', role: 'Full-stack dev', color: '#3b82f6' },
  { name: 'Frontend', role: 'UI/UX specialist', color: '#10b981' },
  { name: 'Backend', role: 'API and database', color: '#a855f7' },
  { name: 'Debugger', role: 'Fix and optimize', color: '#ef4444' },
  { name: 'Tester', role: 'QA and validation', color: '#f59e0b' },
  { name: 'Mentor', role: 'Teach and guide', color: '#3b82f6' },
  { name: 'Architect', role: 'System design', color: '#10b981' },
  { name: 'Researcher', role: 'Find and analyze', color: '#a855f7' },
  { name: 'Writer', role: 'Content and docs', color: '#f59e0b' },
  { name: 'Deployer', role: 'Ship and monitor', color: '#10b981' },
  { name: 'Romanian', role: 'RO tutor', color: '#ef4444' },
]

// ── Landing Page ────────────────────────────────────────────────────────────

function LandingPage({ onStart }: { onStart: () => void }) {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [showWaitlist, setShowWaitlist] = useState(false)
  const [waitlistSource, setWaitlistSource] = useState('hero')
  const [agentDemo, setAgentDemo] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setAgentDemo(prev => (prev + 1) % agentSteps.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openWaitlist = useCallback((source: string) => {
    setWaitlistSource(source)
    setShowWaitlist(true)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ═══ NAV ═══ */}
      <nav className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-300 ${scrolled ? 'border-[#252529] bg-[#0a0a0b]/90 backdrop-blur-xl' : 'border-transparent bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#f59e0b] flex items-center justify-center">
              <Flame className="w-5 h-5 text-[#0a0a0b]" />
            </div>
            <span className="text-lg font-bold tracking-tight font-sans">forge</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-[#94949c]">
            <a href="#product" className="hover:text-[#e2e2e7] transition-colors">Product</a>
            <a href="#how" className="hover:text-[#e2e2e7] transition-colors">How it works</a>
            <a href="#comparison" className="hover:text-[#e2e2e7] transition-colors">Why Forge</a>
            <a href="#pricing" className="hover:text-[#e2e2e7] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[#e2e2e7] transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => openWaitlist('nav')} className="btn-primary text-sm">Notify me</button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 hover:bg-[#1a1a1e] rounded-lg transition-colors">
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-[#252529] bg-[#0a0a0b]/95 backdrop-blur-xl px-4 py-4 space-y-3">
            {[
              { href: '#product', label: 'Product' },
              { href: '#how', label: 'How it works' },
              { href: '#comparison', label: 'Why Forge' },
              { href: '#pricing', label: 'Pricing' },
              { href: '#faq', label: 'FAQ' },
            ].map(link => (
              <a key={link.href} href={link.href} onClick={() => setMobileMenu(false)} className="block text-sm text-[#94949c] hover:text-[#e2e2e7] py-2 transition-colors">{link.label}</a>
            ))}
            <button onClick={() => { openWaitlist('mobile-nav'); setMobileMenu(false) }} className="btn-primary w-full mt-2">Notify me</button>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 relative">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#f59e0b]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#f59e0b]/20 bg-[#f59e0b]/5 text-xs text-[#f59e0b]">
              <Cpu className="w-3.5 h-3.5" />
              AI Builder Operating System
            </div>
          </div>

          <h1 className="text-center text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-4 sm:mb-6">
            Built to make you<br />
            <span className="text-[#f59e0b]">a builder.</span>
          </h1>

          <p className="text-center text-base sm:text-lg md:text-xl text-[#6b6b73] max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Forge is an AI Builder Operating System that teaches you to build real products with AI agents.
            Not a chatbot. Not a course platform. An operating system for builders.
          </p>

          {/* Agent demo window */}
          <div className="max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="bg-[#111113] border border-[#252529] rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#252529] bg-[#0a0a0b]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]/60" />
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b]/60" />
                  <div className="w-3 h-3 rounded-full bg-[#10b981]/60" />
                </div>
                <span className="text-[10px] font-mono text-[#45454c] ml-2">forge-workspace</span>
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-4 h-4 text-[#f59e0b]" />
                  </div>
                  <div className="bg-[#1a1a1e] rounded-xl rounded-tl-sm px-4 py-2.5 text-sm text-[#e2e2e7] flex-1">
                    Build me a SaaS dashboard with user auth and Stripe billing
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-[#3b82f6]" />
                  </div>
                  <div className="bg-[#1a1a1e] rounded-xl rounded-tl-sm px-4 py-3 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono text-[#3b82f6]">ORCHESTRATOR AGENT</span>
                      <span className="text-[10px] text-[#10b981] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block animate-pulse" />
                        Working...
                      </span>
                    </div>
                    <p className="text-sm text-[#94949c] leading-relaxed">{agentSteps[agentDemo].text}</p>
                    <div className="flex gap-2 mt-3">
                      {agentSteps[agentDemo].tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#252529] text-[#6b6b73]">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 sm:mb-10">
            <button onClick={() => openWaitlist('hero')} className="btn-primary w-full sm:w-auto text-base px-6 py-3">
              <Mail className="w-5 h-5" /> Notify me
            </button>
            <a href="#how" className="btn-secondary w-full sm:w-auto text-base px-6 py-3">
              See how it works <ArrowDown className="w-4 h-4" />
            </a>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap text-xs text-[#45454c]">
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Join the waitlist</span>
            <span className="flex items-center gap-1.5"><Bot className="w-3.5 h-3.5" /> 12 AI agents</span>
            <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> 10 courses</span>
            <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> EN + RO</span>
          </div>
        </div>
      </section>

      {/* ═══ PRODUCT / WHY WHAT HOW ═══ */}
      <section id="product" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#252529]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] text-[#f59e0b] uppercase tracking-widest mb-3 font-mono">Product</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">One workspace. Every tool you need.</h2>
            <p className="text-[#6b6b73] max-w-xl mx-auto">Not a chatbot. Not a course platform. An AI operating system for builders.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              { icon: Sparkles, title: 'What — Build real products', desc: 'Describe your idea. AI agents write real code, real files, real tests. You watch, learn, and ship.', color: '#f59e0b' },
              { icon: GraduationCap, title: 'Why — Learn by building', desc: 'Forget months of tutorials. Forge detects what you don\'t know and teaches it at the right moment.', color: '#3b82f6' },
              { icon: Zap, title: 'How — Agent orchestration', desc: '12 specialized AI agents work together on your project. From planning to deployment.', color: '#10b981' },
            ].map(card => (
              <div key={card.title} className="p-6 rounded-2xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] transition-colors group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: card.color + '15' }}>
                  <card.icon className="w-5 h-5" style={{ color: card.color }} />
                </div>
                <h3 className="text-base font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-[#6b6b73] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Preview mockup */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-[#111113] border border-[#252529] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#252529] bg-[#0a0a0b]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]/60" />
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b]/60" />
                  <div className="w-3 h-3 rounded-full bg-[#10b981]/60" />
                </div>
                <span className="text-[10px] font-mono text-[#45454c] ml-2">forge.app/dashboard</span>
              </div>
              <div className="flex min-h-[300px] sm:min-h-[380px]">
                <div className="hidden sm:block w-48 border-r border-[#252529] p-3 bg-[#0a0a0b]">
                  <div className="flex items-center gap-2 mb-4">
                    <Flame className="w-5 h-5 text-[#f59e0b]" />
                    <span className="font-bold text-sm">forge</span>
                  </div>
                  <div className="space-y-1">
                    {['Projects', 'Courses', 'Books', 'Prompts', 'Templates'].map(item => (
                      <div key={item} className={`text-[11px] px-2.5 py-1.5 rounded-lg cursor-default transition-colors ${item === 'Projects' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' : 'text-[#6b6b73] hover:text-[#94949c]'}`}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-sm">My Projects</h3>
                      <p className="text-[10px] text-[#45454c]">3 active — 1 shipped</p>
                    </div>
                    <button className="text-[10px] px-3 py-1.5 rounded-lg bg-[#f59e0b] text-[#0a0a0b] font-medium">+ New</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { name: 'SaaS Dashboard', status: 'Building', color: '#3b82f6', progress: 65 },
                      { name: 'AI Chatbot', status: 'Planning', color: '#f59e0b', progress: 20 },
                      { name: 'Landing Page', status: 'Shipped', color: '#10b981', progress: 100 },
                    ].map(p => (
                      <div key={p.name} className="p-3 rounded-xl border border-[#252529] bg-[#1a1a1e]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium">{p.name}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: p.color + '15', color: p.color }}>{p.status}</span>
                        </div>
                        <div className="h-1 bg-[#252529] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000" style={{ width: p.progress + '%', backgroundColor: p.color }} />
                        </div>
                        <p className="text-[9px] text-[#45454c] mt-1">{p.progress}% complete</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#252529]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] text-[#f59e0b] uppercase tracking-widest mb-3 font-mono">How it works</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">From idea to shipped product in days.</h2>
            <p className="text-[#6b6b73] max-w-lg mx-auto">Three steps. Agents handle the complexity. You learn as you go.</p>
          </div>

          {[
            { n: '01', t: 'Describe your idea', d: 'Tell Forge what you want to build — a SaaS tool, a bot, a landing page, anything. No technical language needed.', icon: Lightbulb, color: '#f59e0b' },
            { n: '02', t: 'Agents build and teach', d: '12 AI agents generate the project plan, write real code, and inject lessons exactly when you need them.', icon: Bot, color: '#3b82f6' },
            { n: '03', t: 'Ship it live', d: 'Deploy your product with one click. Real code. Real users. Real portfolio.', icon: Rocket, color: '#10b981' },
          ].map((s, idx) => (
            <div key={s.n} className="flex gap-4 sm:gap-6 mb-8 sm:mb-10 last:mb-0 group">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-[#111113] border border-[#252529] flex items-center justify-center shrink-0 group-hover:border-[#f59e0b]/30 transition-colors">
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                {idx < 2 && <div className="w-px h-8 sm:h-10 bg-[#252529] mt-2" />}
              </div>
              <div className="pt-1">
                <div className="text-[10px] font-mono mb-1 tracking-wider" style={{ color: s.color }}>STEP {s.n}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1">{s.t}</h3>
                <p className="text-sm text-[#6b6b73] leading-relaxed">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ AGENTS ═══ */}
      <section id="agents" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#252529]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] text-[#f59e0b] uppercase tracking-widest mb-3 font-mono">AI Agents</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">12 AI agents. One team.</h2>
            <p className="text-[#6b6b73] max-w-lg mx-auto">Specialized agents for every part of the build process. From planning to deployment.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {agentCards.map(a => (
              <div key={a.name} className="p-4 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] hover:border-[#252529]/80 text-center transition-all group">
                <div className="w-8 h-8 rounded-lg mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: a.color + '10' }}>
                  <Bot className="w-4 h-4" style={{ color: a.color }} />
                </div>
                <h4 className="text-xs font-semibold mb-0.5">{a.name}</h4>
                <p className="text-[10px] text-[#45454c]">{a.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section id="comparison" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#252529]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] text-[#f59e0b] uppercase tracking-widest mb-3 font-mono">Why Forge</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">The old way vs. Forge.</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Old way */}
            <div className="p-6 rounded-2xl border border-[#ef4444]/20 bg-[#ef4444]/5">
              <div className="flex items-center gap-2 mb-5">
                <X className="w-5 h-5 text-[#ef4444]" />
                <h3 className="font-semibold text-[#ef4444]">Old Way</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Months of video tutorials',
                  'Learn theory, never build',
                  'Fragmented tools that don\'t talk',
                  'Generic exercises, no real products',
                  'No mentorship, just content',
                  'Ship in 6+ months (or never)',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#94949c]">
                    <X className="w-4 h-4 text-[#ef4444]/60 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-4 border-t border-[#ef4444]/10">
                <p className="text-xs text-[#6b6b73]">Time to first product: <span className="text-[#ef4444] font-medium">6+ months</span></p>
              </div>
            </div>

            {/* Forge */}
            <div className="p-6 rounded-2xl border border-[#10b981]/20 bg-[#10b981]/5 relative">
              <div className="absolute -top-3 left-4 px-2 py-0.5 rounded-full bg-[#10b981] text-[#0a0a0b] text-[10px] font-bold">RECOMMENDED</div>
              <div className="flex items-center gap-2 mb-5">
                <Flame className="w-5 h-5 text-[#f59e0b]" />
                <h3 className="font-semibold text-[#f59e0b]">Forge</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Build from day one',
                  'Learn what you need, when you need it',
                  'One workspace: idea → ship',
                  'Real products, real portfolio',
                  'AI mentors + 12 agents',
                  'Ship in days, not months',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#94949c]">
                    <CheckCircle className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-4 border-t border-[#10b981]/10">
                <p className="text-xs text-[#6b6b73]">Time to first product: <span className="text-[#10b981] font-medium">days</span></p>
              </div>
            </div>
          </div>

          {/* Quick comparison rows */}
          <div className="mt-6 space-y-2">
            {[
              { label: 'Learning style', old: 'Static courses', forge: 'Adaptive, just-in-time' },
              { label: 'AI usage', old: 'Chat only', forge: '12 orchestrated agents' },
              { label: 'Output', old: 'Exercises', forge: 'Real products' },
              { label: 'Mentorship', old: 'None', forge: 'AI Mentor agent' },
              { label: 'Languages', old: 'English only', forge: 'EN + RO' },
            ].map((row, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl border border-[#252529] bg-[#111113]">
                <span className="text-sm text-[#ef4444] line-through shrink-0 sm:w-40">{row.old}</span>
                <ArrowRight className="w-4 h-4 text-[#45454c] shrink-0 hidden sm:block" />
                <span className="text-sm text-[#10b981] font-medium">{row.forge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#252529]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] text-[#f59e0b] uppercase tracking-widest mb-3 font-mono">Pricing</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Start free. Scale when ready.</h2>
            <p className="text-[#6b6b73] max-w-lg mx-auto">No credit card. No hidden fees. Build genuinely free.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            {/* Free */}
            <div className="p-6 rounded-2xl border border-[#252529] bg-[#111113]">
              <h3 className="text-sm font-semibold text-[#94949c] mb-1">Free</h3>
              <div className="text-4xl font-bold mb-4">$0<span className="text-sm font-normal text-[#6b6b73]">/mo</span></div>
              <ul className="space-y-2.5 mb-6">
                {[
                  '1 active project',
                  '3 agent runs / day',
                  '3 starter courses',
                  'Community access',
                  'EN + RO content',
                ].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#94949c]">
                    <CheckCircle className="w-4 h-4 text-[#6b6b73] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => openWaitlist('pricing-free')} className="btn-secondary w-full">Get started free</button>
            </div>

            {/* Pro */}
            <div className="p-6 rounded-2xl border-2 border-[#f59e0b]/40 bg-[#f59e0b]/5 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#f59e0b] text-[#0a0a0b] text-[10px] font-bold tracking-wide">POPULAR</div>
              <h3 className="text-sm font-semibold text-[#f59e0b] mb-1">Pro</h3>
              <div className="text-4xl font-bold mb-1">$15<span className="text-sm font-normal text-[#6b6b73]">/mo</span></div>
              <p className="text-xs text-[#45454c] mb-4">$12/mo billed annually</p>
              <ul className="space-y-2.5 mb-6">
                {[
                  'Unlimited projects',
                  'All 12 AI agents',
                  'All courses, books, prompts',
                  'Priority agent processing',
                  'Deployment tools',
                  'API access',
                ].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#94949c]">
                    <CheckCircle className="w-4 h-4 text-[#f59e0b] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => openWaitlist('pricing-pro')} className="btn-primary w-full">Get Pro</button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#252529]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] text-[#f59e0b] uppercase tracking-widest mb-3 font-mono">FAQ</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Common questions</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'What exactly is Forge? Is it a course platform?',
                a: 'No. Forge is an AI Builder Operating System. It\'s not a course platform, not a chatbot, and not an IDE like VS Code. You describe what you want to build, and 12 AI agents construct it while teaching you the skills you need along the way.',
              },
              {
                q: 'Do I need to know how to code?',
                a: 'No. Forge is designed for people who have never written a line of code. You describe your idea in plain English (or Romanian), and the AI agents handle the technical details. You learn by building, not by studying theory.',
              },
              {
                q: 'What can I actually build with Forge?',
                a: 'Web apps, SaaS products, landing pages, AI chatbots, automation tools, APIs, and more. If it\'s a digital product, you can build it. The agents write real, production-ready code — not toy examples.',
              },
              {
                q: 'How is this different from ChatGPT or Cursor?',
                a: 'ChatGPT is a chatbot — it answers questions but doesn\'t build projects. Cursor is a code editor for developers — it helps write code but doesn\'t teach or orchestrate multiple agents. Forge combines an adaptive learning system, 12 specialized AI agents, and a builder workspace into one platform.',
              },
              {
                q: 'What languages does Forge support?',
                a: 'Forge is bilingual from day one: English and Romanian. All courses, prompts, and agent conversations are available in both languages, with cultural adaptation — not just translation.',
              },
              {
                q: 'Is the free tier actually free?',
                a: 'Yes. The Free tier gives you 1 project, 3 agent runs per day, and access to 3 starter courses. No credit card required. No hidden limits. Upgrade to Pro ($15/mo) for unlimited access.',
              },
              {
                q: 'When will Forge launch?',
                a: 'We\'re currently in private beta. Join the waitlist to get early access. Free tier users get access at launch, with Pro features rolling out in the first month.',
              },
              {
                q: 'Can I export my code?',
                a: 'Absolutely. Your code belongs to you. All projects can be exported, deployed to your own hosting, or pushed to your GitHub repository at any time.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="border border-[#252529] rounded-xl overflow-hidden bg-[#111113]">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-[#1a1a1e] transition-colors"
                >
                  <h3 className="text-sm sm:text-base font-medium pr-4">{faq.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-[#6b6b73] shrink-0 transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                    <p className="text-sm text-[#6b6b73] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#252529] relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#f59e0b]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-2xl mx-auto text-center relative">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#f59e0b]/15 flex items-center justify-center">
              <Flame className="w-7 h-7 text-[#f59e0b]" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to forge something real?</h2>
          <p className="text-[#6b6b73] mb-8 max-w-md mx-auto">Join builders already on the waitlist. Get early access. Free tier at launch.</p>
          <button onClick={() => openWaitlist('bottom-cta')} className="btn-primary text-base sm:text-lg px-8 py-4">
            <Mail className="w-5 h-5" /> Notify me on launch
          </button>
          <p className="text-xs text-[#45454c] mt-4">No spam. One email when we launch. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-[#252529] py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#f59e0b]" />
              <span className="font-bold">forge</span>
            </div>
            <nav className="flex items-center gap-6 text-xs text-[#45454c]">
              <a href="#product" className="hover:text-[#6b6b73] transition-colors">Product</a>
              <a href="#how" className="hover:text-[#6b6b73] transition-colors">How it works</a>
              <a href="#pricing" className="hover:text-[#6b6b73] transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-[#6b6b73] transition-colors">FAQ</a>
            </nav>
            <div className="flex items-center gap-4 text-xs text-[#45454c]">
              <span className="hover:text-[#6b6b73] cursor-pointer transition-colors">English</span>
              <span className="hover:text-[#6b6b73] cursor-pointer transition-colors">Română</span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-[#252529] text-center">
            <p className="text-xs text-[#323238]">© 2026 Forge — AI Builder Operating System. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ═══ WAITLIST MODAL ═══ */}
      {showWaitlist && <WaitlistModal onClose={() => setShowWaitlist(false)} source={waitlistSource} />}
    </div>
  )
}

// ── Waitlist Modal ──────────────────────────────────────────────────────────

function WaitlistModal({ onClose, source }: { onClose: () => void; source: string }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [position, setPosition] = useState<number | null>(null)

  const handleSubmit = async () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          source,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setSubmitted(true)
        setPosition(data.position ?? null)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection.')
    }
    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) handleSubmit()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#111113] border border-[#252529] rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl shadow-black/60 animate-[fadeIn_0.2s_ease-out]">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 text-[#6b6b73] hover:text-[#94949c] transition-colors">
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-[#10b981]/15 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-[#10b981]" />
            </div>
            <h3 className="text-xl font-bold mb-2">You&apos;re on the list!</h3>
            <p className="text-sm text-[#6b6b73] mb-1">
              Welcome aboard{name ? `, ${name}` : ''}.
            </p>
            {position && (
              <p className="text-xs text-[#45454c] mb-4">
                You&apos;re #{position} on the waitlist.
              </p>
            )}
            <p className="text-xs text-[#45454c] mb-6">
              We&apos;ll email you at <span className="text-[#e2e2e7]">{email}</span> when we launch.
            </p>
            <button onClick={onClose} className="btn-secondary">Close</button>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/15 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-[#f59e0b]" />
            </div>
            <h3 className="text-xl font-bold mb-1">Join the waitlist</h3>
            <p className="text-[#6b6b73] text-sm mb-6">Get notified when we launch. Free tier available for everyone.</p>
            <div className="space-y-3" onKeyDown={handleKeyDown}>
              <div>
                <label className="block text-sm font-medium mb-1.5">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  placeholder="your@email.com"
                  className="w-full bg-[#0a0a0b] border border-[#252529] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#f59e0b] transition-colors placeholder:text-[#45454c]"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Name (optional)</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="What should we call you?"
                  className="w-full bg-[#0a0a0b] border border-[#252529] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#f59e0b] transition-colors placeholder:text-[#45454c]"
                />
              </div>
              {error && <p className="text-xs text-[#ef4444]">{error}</p>}
              <button onClick={handleSubmit} disabled={loading} className="btn-primary w-full mt-2 justify-center">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Joining...
                  </span>
                ) : (
                  'Notify me'
                )}
              </button>
            </div>
            <p className="text-[10px] text-[#45454c] mt-4 text-center">No spam. Unsubscribe anytime. We respect your inbox.</p>
          </>
        )}
      </div>
    </div>
  )
}

// ── Other Pages (preserved) ─────────────────────────────────────────────────

function OnboardingPage({ onComplete }: { onComplete: () => void }) {
  const { login } = useForgeStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [step, setStep] = useState(0)
  const handleSubmit = () => { login(email || 'builder@forge.local', name || 'Builder'); onComplete() }
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#f59e0b] flex items-center justify-center mx-auto mb-4">
            <Flame className="w-7 h-7 text-[#0a0a0b]" />
          </div>
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
            <button onClick={() => setStep(1)} className="btn-primary w-full mt-2 justify-center">Continue <ArrowRight className="w-4 h-4" /></button>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-3">
            <h3 className="font-semibold mb-3">What do you want to build?</h3>
            {['A website or landing page', 'A SaaS product', 'A mobile app', 'A bot or automation', 'I have an idea'].map(idea => (
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
      id, name: newIdea.slice(0, 40), description: newIdea, idea: newIdea,
      status: 'planning', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      template: 'Blank', techStack: ['Next.js'], features: [], mvpScope: [],
      roadmap: [], assignedAgents: ['orchestrator'], files: [{ id: 'f1', name: 'README.md', type: 'file', language: 'markdown', content: '# ' + newIdea }],
      lessons: [], notes: '',
    })
    setShowNew(false); setNewIdea('')
  }
  return (
    <div className="min-h-screen">
      <header className="h-14 border-b border-[#252529] flex items-center px-4 sm:px-6 gap-3 bg-[#111113]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#f59e0b] flex items-center justify-center"><Flame className="w-4 h-4 text-[#0a0a0b]" /></div>
          <span className="font-bold">forge</span>
        </div>
        <div className="flex-1" />
        <button onClick={() => setView('courses')} className="p-2 hover:bg-[#1a1a1e] rounded-lg text-[#6b6b73]"><BookOpen className="w-4 h-4" /></button>
        <button onClick={() => setView('books')} className="p-2 hover:bg-[#1a1a1e] rounded-lg text-[#6b6b73]"><BookOpen className="w-4 h-4" /></button>
        <button onClick={() => setView('prompts')} className="p-2 hover:bg-[#1a1a1e] rounded-lg text-[#6b6b73]"><MessageSquare className="w-4 h-4" /></button>
        <button onClick={() => setView('templates')} className="p-2 hover:bg-[#1a1a1e] rounded-lg text-[#6b6b73]"><FolderOpen className="w-4 h-4" /></button>
      </header>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-1">Welcome back, {user?.name || 'Builder'}</h1>
          <p className="text-sm text-[#6b6b73]">What do you want to build today?</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <button onClick={() => setShowNew(true)} className="p-4 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] text-left"><Plus className="w-5 h-5 text-[#f59e0b] mb-2" /><div className="text-sm font-medium">New Project</div></button>
          <button onClick={() => setView('courses')} className="p-4 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] text-left"><BookOpen className="w-5 h-5 text-[#3b82f6] mb-2" /><div className="text-sm font-medium">Courses</div></button>
          <button onClick={() => setView('books')} className="p-4 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] text-left"><BookOpen className="w-5 h-5 text-[#10b981] mb-2" /><div className="text-sm font-medium">Books</div></button>
          <button onClick={() => setView('templates')} className="p-4 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] text-left"><FolderOpen className="w-5 h-5 text-[#a855f7] mb-2" /><div className="text-sm font-medium">Templates</div></button>
        </div>
        {showNew && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowNew(false)} />
            <div className="relative bg-[#111113] border border-[#252529] rounded-xl p-6 w-full max-w-lg">
              <h2 className="text-lg font-bold mb-4">Describe your idea</h2>
              <textarea value={newIdea} onChange={e => setNewIdea(e.target.value)} placeholder="I want to build a..." className="w-full bg-[#0a0a0b] border border-[#252529] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#f59e0b] placeholder:text-[#45454c] h-28 resize-none" />
              <div className="flex gap-3 mt-4">
                <button onClick={startProject} className="btn-primary flex-1 justify-center" disabled={!newIdea.trim()}>Generate</button>
                <button onClick={() => setShowNew(false)} className="btn-secondary">Cancel</button>
              </div>
            </div>
          </div>
        )}
        <h2 className="text-lg font-semibold mb-4">Your Projects</h2>
        {projects.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-[#252529] rounded-xl">
            <p className="text-[#6b6b73] text-sm mb-4">No projects yet.</p>
            <button onClick={() => setShowNew(true)} className="btn-primary text-sm"><Plus className="w-4 h-4" /> New Project</button>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map(p => (
              <button key={p.id} onClick={() => { setActiveProject(p.id); setView('ide'); }} className="w-full text-left p-4 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] transition-colors">
                <h3 className="font-medium text-sm">{p.name}</h3>
                <ChevronRight className="w-4 h-4 text-[#45454c]" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function IDEPanelPage() {
  const { activeProject, setView } = useForgeStore()
  if (!activeProject) return <div className="min-h-screen flex items-center justify-center"><p className="text-[#6b6b73]">No project selected</p></div>
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-14 border-b border-[#252529] flex items-center px-4 gap-3 bg-[#111113]">
        <button onClick={() => setView('dashboard')} className="text-sm text-[#6b6b73]">Back</button>
        <span className="font-bold text-sm">{activeProject.name}</span>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <p className="text-[#6b6b73]">IDE Panel — coming soon</p>
      </div>
    </div>
  )
}

function CoursesPage() {
  const { setView } = useForgeStore()
  return (
    <div className="min-h-screen">
      <header className="h-14 border-b border-[#252529] flex items-center px-4 gap-3 bg-[#111113]">
        <button onClick={() => setView('dashboard')} className="text-sm text-[#6b6b73]">Back</button>
        <span className="font-bold">Courses</span>
      </header>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">Courses</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['AI Builder Foundations', 'Prompt Engineering', 'Agentic Development', 'Building SaaS with AI', 'MCP and Tool Agents', 'Launching Products'].map(c => (
            <div key={c} className="p-5 rounded-xl border border-[#252529] bg-[#111113]">
              <h3 className="font-semibold">{c}</h3>
              <p className="text-xs text-[#45454c] mt-1">12 lessons</p>
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
      <header className="h-14 border-b border-[#252529] flex items-center px-4 gap-3 bg-[#111113]">
        <button onClick={() => setView('dashboard')} className="text-sm text-[#6b6b73]">Back</button>
        <span className="font-bold">Books</span>
      </header>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">Books and Guides</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['The Forge Builder Handbook', 'From Idea to Product', 'Building with AI Agents', 'The AI Founder Playbook'].map(b => (
            <div key={b} className="p-5 rounded-xl border border-[#252529] bg-[#111113]">
              <h3 className="font-semibold">{b}</h3>
              <p className="text-xs text-[#45454c] mt-1">8 chapters</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PromptsPage() {
  const { setView } = useForgeStore()
  return (
    <div className="min-h-screen">
      <header className="h-14 border-b border-[#252529] flex items-center px-4 gap-3 bg-[#111113]">
        <button onClick={() => setView('dashboard')} className="text-sm text-[#6b6b73]">Back</button>
        <span className="font-bold">Prompts</span>
      </header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">Prompt Library</h1>
        <div className="space-y-3">
          {[
            { t: 'Create Component', c: 'Create a React component with TypeScript and Tailwind.' },
            { t: 'Debug Error', c: 'I am getting this error. Explain cause, fix, and prevention.' },
            { t: 'Product Plan', c: 'Plan: Create product brief, target audience, features, MVP scope.' },
          ].map(p => (
            <div key={p.t} className="p-4 rounded-xl border border-[#252529] bg-[#111113]">
              <h3 className="font-medium text-sm mb-1">{p.t}</h3>
              <p className="text-xs text-[#6b6b73]">{p.c}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TemplatesPage() {
  const { setView } = useForgeStore()
  return (
    <div className="min-h-screen">
      <header className="h-14 border-b border-[#252529] flex items-center px-4 gap-3 bg-[#111113]">
        <button onClick={() => setView('dashboard')} className="text-sm text-[#6b6b73]">Back</button>
        <span className="font-bold">Templates</span>
      </header>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">Project Templates</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['SaaS Application', 'Landing Page', 'AI Chatbot', 'Telegram Bot', 'Automation Tool', 'API Backend'].map(t => (
            <div key={t} className="p-5 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] transition-colors">
              <h3 className="font-semibold">{t}</h3>
              <p className="text-xs text-[#45454c] mt-1">Starter template</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
