'use client'

import { useState, useEffect } from 'react'
import { useForgeStore } from '../store/index'
import { Flame, Bot, Rocket, Target, Code2, BookOpen, ArrowRight, Menu, X, Plus, FolderOpen, MessageSquare, ChevronRight, Lightbulb, Mail, CheckCircle, Users, Cpu, GraduationCap, Globe, ArrowDown } from 'lucide-react'

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

const agentSteps = [
  { text: "I will build a SaaS dashboard with auth, Stripe, and dark theme. Assigning to Builder Agent...", tags: ['Next.js', 'Stripe', 'Auth'] },
  { text: "Creating project structure... Running tests... All passing. Ready for your review.", tags: ['Files: 12', 'Tests: OK'] },
  { text: "I noticed you have not worked with Stripe before. Quick lesson: Stripe uses webhooks.", tags: ['Lesson: Stripe', '2 min'] },
  { text: "Deploying to Vercel... Build complete. Your dashboard is live.", tags: ['Deployed', 'Live'] },
]

const agentCards = [
  { name: 'Orchestrator', role: 'Lead agent' },
  { name: 'Builder', role: 'Full-stack dev' },
  { name: 'Frontend', role: 'UI/UX specialist' },
  { name: 'Backend', role: 'API and database' },
  { name: 'Debugger', role: 'Fix and optimize' },
  { name: 'Tester', role: 'QA and validation' },
  { name: 'Mentor', role: 'Teach and guide' },
  { name: 'Architect', role: 'System design' },
  { name: 'Researcher', role: 'Find and analyze' },
  { name: 'Writer', role: 'Content and docs' },
  { name: 'Deployer', role: 'Ship and monitor' },
  { name: 'Romanian', role: 'RO tutor' },
]

function LandingPage({ onStart }: { onStart: () => void }) {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [showWaitlist, setShowWaitlist] = useState(false)
  const [agentDemo, setAgentDemo] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAgentDemo(prev => (prev + 1) % agentSteps.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-[#252529] bg-[#0a0a0b]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#f59e0b] flex items-center justify-center"><Flame className="w-5 h-5 text-[#0a0a0b]" /></div>
            <span className="text-lg font-bold tracking-tight">forge</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-[#94949c]">
            <a href="#product" className="hover:text-[#e2e2e7]">Product</a>
            <a href="#how" className="hover:text-[#e2e2e7]">How it works</a>
            <a href="#agents" className="hover:text-[#e2e2e7]">Agents</a>
            <a href="#pricing" className="hover:text-[#e2e2e7]">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowWaitlist(true)} className="btn-primary text-sm"><Mail className="w-4 h-4" /> Join Waitlist</button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 hover:bg-[#1a1a1e] rounded">{mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
          </div>
        </div>
      </nav>

      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#f59e0b]/20 bg-[#f59e0b]/5 text-xs text-[#f59e0b]">
              <Cpu className="w-3.5 h-3.5" /> AI Builder Operating System
            </div>
          </div>
          <h1 className="text-center text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-4 sm:mb-6">
            Built to make you<br /><span className="text-[#f59e0b]">a builder.</span>
          </h1>
          <p className="text-center text-base sm:text-lg md:text-xl text-[#6b6b73] max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Forge is an AI Builder Operating System that teaches you to build real products with AI agents. Not a chatbot. Not a course platform. An operating system for builders.
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-[#111113] border border-[#252529] rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#252529] bg-[#0a0a0b]">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-[#ef4444]/60" /><div className="w-3 h-3 rounded-full bg-[#f59e0b]/60" /><div className="w-3 h-3 rounded-full bg-[#10b981]/60" /></div>
                <span className="text-[10px] font-mono text-[#45454c] ml-2">forge-workspace</span>
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center shrink-0 mt-0.5"><Users className="w-4 h-4 text-[#f59e0b]" /></div>
                  <div className="bg-[#1a1a1e] rounded-xl rounded-tl-sm px-4 py-2.5 text-sm text-[#e2e2e7] flex-1">Build me a SaaS dashboard with user auth and Stripe billing</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center shrink-0 mt-0.5"><Bot className="w-4 h-4 text-[#3b82f6]" /></div>
                  <div className="bg-[#1a1a1e] rounded-xl rounded-tl-sm px-4 py-3 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono text-[#3b82f6]">ORCHESTRATOR AGENT</span>
                      <span className="text-[10px] text-[#10b981] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block" /> Working...</span>
                    </div>
                    <p className="text-sm text-[#94949c] leading-relaxed">{agentSteps[agentDemo].text}</p>
                    <div className="flex gap-2 mt-3">
                      {agentSteps[agentDemo].tags.map(tag => (<span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#252529] text-[#6b6b73]">{tag}</span>))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <button onClick={() => setShowWaitlist(true)} className="btn-primary w-full sm:w-auto text-base px-6 py-3"><Mail className="w-5 h-5" /> Join the Waitlist</button>
            <a href="#product" className="btn-secondary w-full sm:w-auto text-base px-6 py-3">See how it works <ArrowDown className="w-4 h-4" /></a>
          </div>
          <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap text-xs text-[#45454c]">
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Builders waiting</span>
            <span className="flex items-center gap-1.5"><Bot className="w-3.5 h-3.5" /> 18 AI agents</span>
            <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> 10 courses</span>
            <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> EN + RO</span>
          </div>
        </div>
      </section>

      <section id="product" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#252529]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] text-[#f59e0b] uppercase tracking-wider mb-3">Product</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">One workspace. Every tool you need.</h2>
            <p className="text-[#6b6b73] max-w-xl mx-auto">Not a chatbot. Not a course platform. An operating system for builders.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#111113] border border-[#252529] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#252529] bg-[#0a0a0b]">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-[#ef4444]/60" /><div className="w-3 h-3 rounded-full bg-[#f59e0b]/60" /><div className="w-3 h-3 rounded-full bg-[#10b981]/60" /></div>
                <span className="text-[10px] font-mono text-[#45454c] ml-2">forge.app/dashboard</span>
              </div>
              <div className="flex min-h-[320px] sm:min-h-[400px]">
                <div className="hidden sm:block w-48 border-r border-[#252529] p-3 bg-[#0a0a0b]">
                  <div className="flex items-center gap-2 mb-4"><Flame className="w-5 h-5 text-[#f59e0b]" /><span className="font-bold text-sm">forge</span></div>
                  <div className="space-y-1">
                    {['Projects', 'Courses', 'Books', 'Prompts', 'Templates'].map(item => (
                      <div key={item} className={`text-[11px] px-2.5 py-1.5 rounded-lg ${item === 'Projects' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' : 'text-[#6b6b73]'}`}>{item}</div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div><h3 className="font-semibold text-sm">My Projects</h3><p className="text-[10px] text-[#45454c]">3 active - 1 shipped</p></div>
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
                        <div className="h-1 bg-[#252529] rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: p.progress + '%', backgroundColor: p.color }} /></div>
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

      <section id="how" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#252529]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] text-[#f59e0b] uppercase tracking-wider mb-3">How it works</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">From idea to shipped product.</h2>
          </div>
          {[
            { n: '01', t: 'Describe your idea', d: 'Tell Forge what you want to build. Any ambition, any level.', icon: Lightbulb, color: '#f59e0b' },
            { n: '02', t: 'AI creates your roadmap', d: 'Agents generate a project brief, feature list, and build plan.', icon: Bot, color: '#3b82f6' },
            { n: '03', t: 'Agents build real code', d: '18 specialized agents write real files with real code.', icon: Code2, color: '#10b981' },
            { n: '04', t: 'Detect, Teach, Repeat', d: 'Forge detects gaps, injects lessons, tracks skills.', icon: Target, color: '#a855f7' },
            { n: '05', t: 'Ship it', d: 'Deploy anywhere. Your product, your users, your revenue.', icon: Rocket, color: '#ef4444' },
          ].map(s => (
            <div key={s.n} className="flex gap-4 sm:gap-6 mb-6 sm:mb-8 last:mb-0">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[#111113] border border-[#252529] flex items-center justify-center">
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <div className="text-[10px] font-mono mb-1" style={{ color: s.color }}>STEP {s.n}</div>
                <h3 className="text-base sm:text-lg font-semibold mb-1">{s.t}</h3>
                <p className="text-sm text-[#6b6b73] leading-relaxed">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="agents" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#252529]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] text-[#f59e0b] uppercase tracking-wider mb-3">Agents</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">18 AI agents. One team.</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {agentCards.map(a => (
              <div key={a.name} className="p-4 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e] text-center">
                <h4 className="text-xs font-semibold mb-0.5">{a.name}</h4>
                <p className="text-[10px] text-[#45454c]">{a.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#252529]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] text-[#f59e0b] uppercase tracking-wider mb-3">Why Forge</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">We are not a chatbot.</h2>
          </div>
          <div className="space-y-3">
            {[
              { bad: 'Learn to code first', good: 'Build first, learn what you need' },
              { bad: 'Static courses', good: 'Adaptive learning that detects gaps' },
              { bad: 'Single AI chat', good: '18 orchestrated agent teams' },
              { bad: 'Textbook exercises', good: 'Real products, real users' },
              { bad: 'English-only', good: 'Bilingual EN/RO from day one' },
            ].map((r, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-4 rounded-xl border border-[#252529] bg-[#111113]">
                <span className="text-sm text-[#ef4444] line-through shrink-0">{r.bad}</span>
                <ArrowRight className="w-4 h-4 text-[#45454c] shrink-0 hidden sm:block" />
                <span className="text-sm text-[#10b981] font-medium">{r.good}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#252529]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] text-[#f59e0b] uppercase tracking-wider mb-3">Pricing</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Start free. Scale when ready.</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { tier: 'Free', price: '0', features: ['1 project', '3 agents/day', '3 courses'], featured: false },
              { tier: 'Builder', price: '10', features: ['Unlimited projects', 'All 18 agents', 'All content'], featured: true },
              { tier: 'Pro', price: '29', features: ['Everything in Builder', 'Priority agents', 'API access'], featured: false },
            ].map(p => (
              <div key={p.tier} className={`p-6 rounded-2xl border ${p.featured ? 'border-[#f59e0b]/40 bg-[#f59e0b]/5' : 'border-[#252529] bg-[#111113]'}`}>
                {p.featured && <div className="text-[10px] text-[#f59e0b] font-medium mb-2">POPULAR</div>}
                <div className="text-sm text-[#6b6b73] mb-1">{p.tier}</div>
                <div className="text-4xl font-bold mb-4">{p.price}EU<span className="text-sm font-normal text-[#6b6b73]">/mo</span></div>
                <ul className="space-y-2 mb-6">
                  {p.features.map(f => <li key={f} className="text-sm text-[#94949c]">* {f}</li>)}
                </ul>
                <button onClick={() => setShowWaitlist(true)} className={p.featured ? 'btn-primary w-full' : 'btn-secondary w-full'}>Join waitlist</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#252529]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to forge something real?</h2>
          <p className="text-[#6b6b73] mb-8">Join the waitlist. Be first when we launch.</p>
          <button onClick={() => setShowWaitlist(true)} className="btn-primary text-base sm:text-lg px-8 py-4"><Mail className="w-5 h-5" /> Join the Waitlist</button>
        </div>
      </section>

      <footer className="border-t border-[#252529] py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><Flame className="w-5 h-5 text-[#f59e0b]" /><span className="font-bold">forge</span></div>
          <p className="text-xs text-[#45454c]">2026 Forge - AI Builder Operating System</p>
          <div className="flex items-center gap-4 text-xs text-[#45454c]"><span>English</span><span>Romana</span></div>
        </div>
      </footer>

      {showWaitlist && <WaitlistModal onClose={() => setShowWaitlist(false)} />}
    </div>
  )
}

function WaitlistModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email.trim() || !email.includes('@')) { setError('Please enter a valid email.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email.trim(), name: name.trim() }) })
      if (res.ok) { setSubmitted(true) } else { const d = await res.json(); setError(d.error || 'Error.') }
    } catch { setError('Network error.') }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#111113] border border-[#252529] rounded-2xl p-6 sm:p-8 w-full max-w-md">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 text-[#6b6b73]"><X className="w-5 h-5" /></button>
        {submitted ? (
          <div className="text-center py-4">
            <CheckCircle className="w-16 h-16 text-[#10b981] mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">You are on the list!</h3>
            <button onClick={onClose} className="btn-secondary">Close</button>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/15 flex items-center justify-center mb-4"><Mail className="w-6 h-6 text-[#f59e0b]" /></div>
            <h3 className="text-xl font-bold mb-1">Join the Forge waitlist</h3>
            <p className="text-[#6b6b73] text-sm mb-6">Be first to get access. Free tier at launch.</p>
            <div className="space-y-3">
              <div><label className="block text-sm font-medium mb-1.5">Email *</label><input type="email" value={email} onChange={e => { setEmail(e.target.value); setError('') }} placeholder="your@email.com" className="w-full bg-[#0a0a0b] border border-[#252529] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#f59e0b] placeholder:text-[#45454c]" /></div>
              <div><label className="block text-sm font-medium mb-1.5">Name (optional)</label><input value={name} onChange={e => setName(e.target.value)} placeholder="What should we call you?" className="w-full bg-[#0a0a0b] border border-[#252529] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#f59e0b] placeholder:text-[#45454c]" /></div>
              {error && <p className="text-xs text-[#ef4444]">{error}</p>}
              <button onClick={handleSubmit} disabled={loading} className="btn-primary w-full mt-2">{loading ? 'Joining...' : 'Join Waitlist'}</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

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
          <div className="w-12 h-12 rounded-xl bg-[#f59e0b] flex items-center justify-center mx-auto mb-4"><Flame className="w-7 h-7 text-[#0a0a0b]" /></div>
          <h1 className="text-2xl font-bold mb-2">Welcome to Forge</h1>
          <p className="text-[#6b6b73] text-sm">Let us set up your builder profile.</p>
        </div>
        {step === 0 && (
          <div className="space-y-4">
            <div><label className="block text-sm font-medium mb-1.5">Your name</label><input value={name} onChange={e => setName(e.target.value)} placeholder="What should we call you?" className="w-full bg-[#111113] border border-[#252529] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#f59e0b] placeholder:text-[#45454c]" /></div>
            <div><label className="block text-sm font-medium mb-1.5">Email (optional)</label><input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="w-full bg-[#111113] border border-[#252529] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#f59e0b] placeholder:text-[#45454c]" /></div>
            <button onClick={() => setStep(1)} className="btn-primary w-full mt-2">Continue <ArrowRight className="w-4 h-4" /></button>
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
    createProject({ id, name: newIdea.slice(0, 40), description: newIdea, idea: newIdea, status: 'planning', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), template: 'Blank', techStack: ['Next.js'], features: [], mvpScope: [], roadmap: [], assignedAgents: ['orchestrator'], files: [{ id: 'f1', name: 'README.md', type: 'file', language: 'markdown', content: '# ' + newIdea }], lessons: [], notes: '' })
    setShowNew(false); setNewIdea('')
  }
  return (
    <div className="min-h-screen">
      <header className="h-14 border-b border-[#252529] flex items-center px-4 sm:px-6 gap-3 bg-[#111113]">
        <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-[#f59e0b] flex items-center justify-center"><Flame className="w-4 h-4 text-[#0a0a0b]" /></div><span className="font-bold">forge</span></div>
        <div className="flex-1" />
        <button onClick={() => setView('courses')} className="p-2 hover:bg-[#1a1a1e] rounded-lg text-[#6b6b73]"><BookOpen className="w-4 h-4" /></button>
        <button onClick={() => setView('books')} className="p-2 hover:bg-[#1a1a1e] rounded-lg text-[#6b6b73]"><BookOpen className="w-4 h-4" /></button>
        <button onClick={() => setView('prompts')} className="p-2 hover:bg-[#1a1a1e] rounded-lg text-[#6b6b73]"><MessageSquare className="w-4 h-4" /></button>
        <button onClick={() => setView('templates')} className="p-2 hover:bg-[#1a1a1e] rounded-lg text-[#6b6b73]"><FolderOpen className="w-4 h-4" /></button>
      </header>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-8"><h1 className="text-xl sm:text-2xl font-bold mb-1">Welcome back, {user?.name || 'Builder'}</h1><p className="text-sm text-[#6b6b73]">What do you want to build today?</p></div>
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
              <div className="flex gap-3 mt-4"><button onClick={startProject} className="btn-primary flex-1" disabled={!newIdea.trim()}>Generate</button><button onClick={() => setShowNew(false)} className="btn-secondary">Cancel</button></div>
            </div>
          </div>
        )}
        <h2 className="text-lg font-semibold mb-4">Your Projects</h2>
        {projects.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-[#252529] rounded-xl"><p className="text-[#6b6b73] text-sm mb-4">No projects yet.</p><button onClick={() => setShowNew(true)} className="btn-primary text-sm"><Plus className="w-4 h-4" /> New Project</button></div>
        ) : (
          <div className="space-y-3">{projects.map(p => (<button key={p.id} onClick={() => { setActiveProject(p.id); setView('ide'); }} className="w-full text-left p-4 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e]"><h3 className="font-medium text-sm">{p.name}</h3><ChevronRight className="w-4 h-4 text-[#45454c]" /></button>))}</div>
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
        <p className="text-[#6b6b73]">IDE Panel - Coming soon</p>
      </div>
    </div>
  )
}

function CoursesPage() {
  const { setView } = useForgeStore()
  return (
    <div className="min-h-screen">
      <header className="h-14 border-b border-[#252529] flex items-center px-4 gap-3 bg-[#111113]"><button onClick={() => setView('dashboard')} className="text-sm text-[#6b6b73]">Back</button><span className="font-bold">Courses</span></header>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">Courses</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['AI Builder Foundations', 'Prompt Engineering', 'Agentic Development', 'Building SaaS with AI', 'MCP and Tool Agents', 'Launching Products'].map(c => (
            <div key={c} className="p-5 rounded-xl border border-[#252529] bg-[#111113]"><h3 className="font-semibold">{c}</h3><p className="text-xs text-[#45454c] mt-1">12 lessons</p></div>
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
      <header className="h-14 border-b border-[#252529] flex items-center px-4 gap-3 bg-[#111113]"><button onClick={() => setView('dashboard')} className="text-sm text-[#6b6b73]">Back</button><span className="font-bold">Books</span></header>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">Books and Guides</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['The Forge Builder Handbook', 'From Idea to Product', 'Building with AI Agents', 'The AI Founder Playbook'].map(b => (
            <div key={b} className="p-5 rounded-xl border border-[#252529] bg-[#111113]"><h3 className="font-semibold">{b}</h3><p className="text-xs text-[#45454c] mt-1">8 chapters</p></div>
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
      <header className="h-14 border-b border-[#252529] flex items-center px-4 gap-3 bg-[#111113]"><button onClick={() => setView('dashboard')} className="text-sm text-[#6b6b73]">Back</button><span className="font-bold">Prompts</span></header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">Prompt Library</h1>
        <div className="space-y-3">
          {[{ t: 'Create Component', c: 'Create a React component with TypeScript and Tailwind.' }, { t: 'Debug Error', c: 'I am getting this error. Explain cause, fix, and prevention.' }, { t: 'Product Plan', c: 'Plan: Create product brief, target audience, features, MVP scope.' }].map(p => (
            <div key={p.t} className="p-4 rounded-xl border border-[#252529] bg-[#111113]"><h3 className="font-medium text-sm mb-1">{p.t}</h3><p className="text-xs text-[#6b6b73]">{p.c}</p></div>
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
      <header className="h-14 border-b border-[#252529] flex items-center px-4 gap-3 bg-[#111113]"><button onClick={() => setView('dashboard')} className="text-sm text-[#6b6b73]">Back</button><span className="font-bold">Templates</span></header>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">Project Templates</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['SaaS Application', 'Landing Page', 'AI Chatbot', 'Telegram Bot', 'Automation Tool', 'API Backend'].map(t => (
            <div key={t} className="p-5 rounded-xl border border-[#252529] bg-[#111113] hover:bg-[#1a1a1e]"><h3 className="font-semibold">{t}</h3></div>
          ))}
        </div>
      </div>
    </div>
  )
}
