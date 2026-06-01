'use client'

import { useState, useEffect, useCallback } from 'react'
import { useForgeStore } from '../store/index'
import { ForgeLogo, ForgeMark } from '../components/ForgeLogo'
import { ArrowRight, Menu, X, Plus, Minus, Mail, Command, CornerDownLeft, Boxes, Layers, Cpu, Globe, Rocket, GitBranch, GraduationCap, Brain, BookOpen, FileText, FolderOpen, MessageSquare, ChevronRight } from 'lucide-react'

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

// ── Community ────────────────────────────────────────────────────────────────

const DISCORD_URL = 'https://discord.gg/GCNzrkWP'

function DiscordIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3.2a.074.074 0 0 0-.079.037c-.34.6-.717 1.385-.98 2.003a18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.997-2.003.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C1.27 7.92.63 11.38.944 14.793a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127c-.598.349-1.225.645-1.873.891a.076.076 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-3.94-.838-7.37-2.549-10.4a.061.061 0 0 0-.031-.028ZM8.02 12.71c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
    </svg>
  )
}

// ── Bilingual copy (EN / RO) ─────────────────────────────────────────────────

type Lang = 'en' | 'ro'

const copy = {
  en: {
    nav: { system: 'How it works', agents: 'Agents', learning: 'Learning', content: 'Content', access: 'Access', join: 'Join waitlist' },
    status: 'STATUS: PRIVATE BETA',
    hero: {
      kicker: 'THE AI BUILDER OS · FOR BUILDERS, NOT JUST DEVELOPERS',
      t1: 'Build anything.', t2: 'Learn everything.',
      sub: 'EmbrOS is the AI Builder Operating System. Describe an idea — a team of AI agents designs, builds and ships the real product, and teaches you exactly what you need, exactly when you need it. Build first. Learn as you go.',
      cta: 'Join the waitlist', cta2: 'See how it works',
      seats: (n: number) => `${n} / 100 builders · free for the first · no credit card`,
    },
    runson: 'runs on',
    discord: 'Join the Discord',
    cap: ['Plan', 'Build', 'Debug', 'Test', 'Deploy', 'Teach', 'Learn', 'Mentor', 'Remember', 'Ship'],
    loop: {
      kicker: '// THE LOOP', title: 'Build first. Learn what you need. Repeat.',
      sub: 'Not “learn to code first.” EmbrOS flips it — you build a real product, and it teaches you the exact skill the moment you hit it.',
      steps: [
        ['01', 'Describe your idea', 'Tell EmbrOS what you want to build, in plain English or Romanian. No tech jargon, no prerequisites.'],
        ['02', 'Agents plan & build', 'An orchestrator assigns specialists. They write real code, real files, real tests — and explain as they go.'],
        ['03', 'It detects what you don’t know', 'EmbrOS watches how you build and spots the exact concepts you’re missing.'],
        ['04', 'It teaches — just in time', 'A 90-second lesson appears right inside your project. Never a separate course tab.'],
        ['05', 'You ship & grow', 'Deploy a real product. Your skill profile levels up. Next time, you need less help.'],
      ],
    },
    why: {
      kicker: '// WHY EMBROS', title: 'Not a chatbot. Not a course. An operating system.',
      cards: [
        ['Orchestrated agent team', 'An orchestrator breaks your goal into tasks and dispatches specialists — they build, debug, test and deploy in parallel.'],
        ['Learns you over time', 'A private engine remembers your projects, decisions and skill profile. Every build makes it sharper about you.'],
        ['Teaches as it builds', 'Just-in-time lessons tied to your real code, plus courses, books and prompts. Bilingual, EN · RO.'],
        ['Runs anywhere', 'Web, native macOS / Windows / Linux, and a real CLI. Your projects and agents sync across all of them.'],
      ],
    },
    agents: { kicker: '// THE TEAM', title: 'A whole team, online.', note: '+ spin up custom agents for your own workflow' },
    learn: {
      kicker: '// ADAPTIVE LEARNING', t1: 'It builds with you.', t2: 'And teaches as it goes.',
      sub: 'EmbrOS spots the exact concepts you’re missing and drops a 90-second lesson right inside your project. Every build grows your skill profile.',
      chips: ['just-in-time lessons', 'weakness detection', 'skill profile', 'assistance that fades', 'EN · RO'],
      map: 'your skill map', growing: '↑ growing', learningNow: '· learning now',
      lessonT: 'Lesson · Stripe webhooks', lessonD: 'Injected into your build · 90 seconds · EN · RO →',
    },
    content: {
      kicker: '// CONTENT LIBRARY', title: 'Courses, books & lessons — built in.',
      sub: 'A full library written for builders, not students. Every course, book and prompt available in English and Romanian.',
      tabs: { courses: 'Courses', books: 'Books', prompts: 'Prompts', templates: 'Templates' },
    },
    platforms: { kicker: '// WORKS EVERYWHERE', title: 'In your browser. On your machine.', sub: 'Start instantly on the web, go deeper with the native app and CLI on any OS. Projects, agents and progress sync everywhere.' },
    who: {
      kicker: '// WHO IT’S FOR', title: 'For people who want to build like a developer — without being one.',
      items: [
        ['Non-technical creators', 'Deep domain expertise, zero code.'],
        ['Founders', 'Validate and launch MVPs without hiring a dev team first.'],
        ['Career changers', 'A guided path that actually ships products.'],
        ['Students', 'Portfolio pieces that matter, not toy exercises.'],
        ['Professionals', 'Internal tools and side projects, faster.'],
      ],
    },
    access: {
      kicker: '// ACCESS', title: 'Start free. Scale when ready.',
      free: { tier: 'Free', price: '$0', tag: '/forever', feats: ['1 active project', '3 agent runs / day', '3 starter courses', 'community access', 'EN · RO content'] },
      pro: { tier: 'Pro', price: '$15', tag: '/month', rec: 'RECOMMENDED', feats: ['unlimited projects', 'all 12 agents', 'all courses & books', 'priority runs', 'deployment tools', 'native + CLI'] },
      join: 'Join the waitlist',
    },
    faqTitle: 'Questions',
    faq: [
      ['What exactly is EmbrOS?', 'The AI Builder Operating System. You describe what you want to build, a team of agents constructs it, and EmbrOS teaches you the skills you need along the way. Not a course platform, not a chatbot, not a VS Code fork.'],
      ['Do I need to know how to code?', 'No. EmbrOS is built for people who have never written a line of code. You describe your idea in plain English or Romanian; the agents handle the technical work and teach you as they go.'],
      ['Is it only for beginners?', 'No. Set the assistance level — from “do it for me” to “let me drive.” It works for total beginners and for professionals who just want to ship faster.'],
      ['How is this different from Cursor or ChatGPT?', 'Cursor is an editor for developers; ChatGPT answers questions. EmbrOS orchestrates a team of agents inside a workspace with memory, adaptive lessons, content, and one-click deploys — an operating system, not a single tool.'],
      ['Is it really bilingual?', 'Yes. English and Romanian are equal from day one — agents, courses, books and lessons all speak both, with cultural adaptation, not just translation.'],
      ['When does it launch?', 'Private beta now. Join the waitlist — the first builders get in first, free.'],
    ],
    final: { t1: 'Bring the idea.', t2: 'We bring the system.', sub: 'Join the first builders shaping EmbrOS. Early access, free for the first, building in public.', join: 'Join the waitlist', seats: (n: number) => `${n} / 100 seats` },
    footer: { tagline: 'Build anything. Learn everything.', os: 'AI BUILDER OPERATING SYSTEM · EN · RO' },
    wl: { title: 'Request access', sub: 'Early access. Free for the first builders.', email: 'Email', name: 'Name (optional)', emailPh: 'your@email.com', namePh: 'What should we call you?', button: 'Request access', joining: 'Joining…', granted: '› access granted', onList: 'You’re on the list.', welcome: 'Welcome aboard', position: 'position', emailAt: (e: string) => `We’ll email ${e} at launch.`, close: 'Close', spam: 'NO SPAM · UNSUBSCRIBE ANYTIME', err: 'Please enter a valid email address.', neterr: 'Network error. Please check your connection.' },
  },
  ro: {
    nav: { system: 'Cum funcționează', agents: 'Agenți', learning: 'Învățare', content: 'Conținut', access: 'Acces', join: 'Înscrie-te' },
    status: 'STARE: BETA PRIVAT',
    hero: {
      kicker: 'SISTEMUL DE OPERARE PENTRU BUILDERI · NU DOAR PENTRU PROGRAMATORI',
      t1: 'Construiește orice.', t2: 'Învață tot.',
      sub: 'EmbrOS este sistemul de operare pentru a construi cu AI. Descrii o idee, iar o echipă de agenți o proiectează, o construiește și o lansează ca produs real — și te învață exact ce-ți trebuie, fix când îți trebuie. Construiești întâi, înveți pe parcurs.',
      cta: 'Intră pe lista de așteptare', cta2: 'Vezi cum funcționează',
      seats: (n: number) => `${n} / 100 builderi · gratuit pentru primii · fără card`,
    },
    runson: 'rulează pe',
    discord: 'Intră pe Discord',
    cap: ['Planifică', 'Construiește', 'Depanează', 'Testează', 'Lansează', 'Predă', 'Învață', 'Îndrumă', 'Reține', 'Livrează'],
    loop: {
      kicker: '// BUCLA', title: 'Construiește întâi. Învață ce-ți trebuie. Repetă.',
      sub: 'Nu „învață mai întâi să programezi". EmbrOS inversează regula — construiești un produs real, iar el te învață exact ce-ți trebuie, fix în clipa în care ai nevoie.',
      steps: [
        ['01', 'Descrie-ți ideea', 'Spune-i lui EmbrOS ce vrei să construiești, în română sau engleză. Fără jargon tehnic, fără cunoștințe prealabile.'],
        ['02', 'Agenții planifică și construiesc', 'Un agent orchestrator împarte munca între specialiști. Scriu cod real, fișiere reale, teste reale — și îți explică pe parcurs.'],
        ['03', 'Detectează ce nu știi', 'EmbrOS observă cum construiești și găsește exact conceptele care îți lipsesc.'],
        ['04', 'Te învață fix la timp', 'O lecție de 90 de secunde apare direct în proiectul tău — niciodată într-un tab de curs separat.'],
        ['05', 'Lansezi și crești', 'Publici un produs real. Nivelul tău de competențe crește. Data viitoare ai nevoie de mai puțin ajutor.'],
      ],
    },
    why: {
      kicker: '// DE CE EMBROS', title: 'Nu un chatbot. Nu un curs. Un sistem de operare.',
      cards: [
        ['Echipă de agenți orchestrată', 'Un orchestrator împarte obiectivul în sarcini și le repartizează specialiștilor — construiesc, depanează, testează și lansează în paralel.'],
        ['Te cunoaște tot mai bine', 'Un motor privat îți reține proiectele, deciziile și nivelul de competențe. Cu fiecare proiect te înțelege mai bine.'],
        ['Te învață chiar în timp ce construiește', 'Lecții fix la momentul potrivit, legate de codul tău real, plus cursuri, cărți și prompturi. Bilingv, EN · RO.'],
        ['Rulează oriunde', 'Web, nativ pe macOS / Windows / Linux și un CLI real. Proiectele și agenții se sincronizează peste tot.'],
      ],
    },
    agents: { kicker: '// ECHIPA', title: 'O echipă întreagă, online.', note: '+ creează agenți personalizați pentru fluxul tău de lucru' },
    learn: {
      kicker: '// ÎNVĂȚARE ADAPTIVĂ', t1: 'Construiește cu tine.', t2: 'Și te învață pe parcurs.',
      sub: 'EmbrOS găsește exact conceptele care îți lipsesc și îți dă o lecție de 90 de secunde chiar în proiect. Fiecare proiect îți crește nivelul de competențe.',
      chips: ['lecții fix la timp', 'detectarea lacunelor', 'profil de competențe', 'ajutor care scade treptat', 'EN · RO'],
      map: 'harta ta de competențe', growing: '↑ în creștere', learningNow: '· înveți acum',
      lessonT: 'Lecție · Stripe webhooks', lessonD: 'Inserată în proiectul tău · 90 de secunde · EN · RO →',
    },
    content: {
      kicker: '// BIBLIOTECA', title: 'Cursuri, cărți și lecții — incluse.',
      sub: 'O bibliotecă întreagă, scrisă pentru builderi, nu pentru studenți. Toate cursurile, cărțile și prompturile sunt în engleză și română.',
      tabs: { courses: 'Cursuri', books: 'Cărți', prompts: 'Prompturi', templates: 'Template-uri' },
    },
    platforms: { kicker: '// MERGE PESTE TOT', title: 'În browser. Pe mașina ta.', sub: 'Pornești instant în browser, apoi mergi mai departe cu aplicația nativă și cu CLI-ul, pe orice sistem de operare. Proiectele, agenții și progresul se sincronizează peste tot.' },
    who: {
      kicker: '// PENTRU CINE', title: 'Pentru cei care vor să construiască precum un programator — fără să fie unul.',
      items: [
        ['Creatori non-tehnici', 'Expertiză într-un domeniu, dar zero cod.'],
        ['Fondatori', 'Validează și lansează un MVP fără să angajezi întâi o echipă.'],
        ['Reconversie profesională', 'Un parcurs ghidat care chiar duce la produse livrate.'],
        ['Studenți', 'Proiecte de portofoliu care contează, nu exerciții de jucărie.'],
        ['Profesioniști', 'Unelte interne și proiecte secundare, mai repede.'],
      ],
    },
    access: {
      kicker: '// ACCES', title: 'Începe gratuit. Crești când ești gata.',
      free: { tier: 'Free', price: '$0', tag: '/mereu', feats: ['1 proiect activ', '3 rulări de agent / zi', '3 cursuri introductive', 'acces la comunitate', 'conținut EN · RO'] },
      pro: { tier: 'Pro', price: '$15', tag: '/lună', rec: 'RECOMANDAT', feats: ['proiecte nelimitate', 'toți cei 12 agenți', 'toate cursurile și cărțile', 'rulări prioritare', 'unelte de lansare', 'nativ + CLI'] },
      join: 'Intră pe listă',
    },
    faqTitle: 'Întrebări',
    faq: [
      ['Ce este, mai exact, EmbrOS?', 'Sistemul de operare pentru a construi cu AI. Descrii ce vrei, o echipă de agenți construiește, iar EmbrOS te învață pe parcurs competențele de care ai nevoie. Nu o platformă de cursuri, nu un chatbot, nu un fork de VS Code.'],
      ['Trebuie să știu să programez?', 'Nu. EmbrOS e făcut pentru oameni care n-au scris niciodată o linie de cod. Descrii ideea în română sau engleză, iar agenții se ocupă de partea tehnică și te învață pe parcurs.'],
      ['E doar pentru începători?', 'Nu. Reglezi nivelul de ajutor — de la „fă-o tu în locul meu" la „lasă-mă pe mine". Merge și pentru începători absoluți, și pentru profesioniști care vor doar să livreze mai repede.'],
      ['Cu ce diferă de Cursor sau ChatGPT?', 'Cursor e un editor pentru programatori, iar ChatGPT răspunde la întrebări. EmbrOS orchestrează o echipă de agenți într-un spațiu de lucru cu memorie, lecții adaptive, conținut și lansare dintr-un click — un sistem de operare, nu o singură unealtă.'],
      ['Chiar e bilingv?', 'Da. Engleza și româna sunt egale din prima zi — agenții, cursurile, cărțile și lecțiile sunt în ambele limbi, cu adaptare culturală, nu doar traducere.'],
      ['Când se lansează?', 'Beta privat acum. Intră pe listă — primii builderi intră primii, gratuit.'],
    ],
    final: { t1: 'Tu aduci ideea.', t2: 'Noi aducem sistemul.', sub: 'Alătură-te primilor builderi care construiesc EmbrOS. Acces timpuriu, gratuit pentru primii, dezvoltat în public.', join: 'Intră pe lista de așteptare', seats: (n: number) => `${n} / 100 locuri` },
    footer: { tagline: 'Construiește orice. Învață tot.', os: 'SISTEM DE OPERARE AI · EN · RO' },
    wl: { title: 'Cere acces', sub: 'Acces timpuriu. Gratuit pentru primii builderi.', email: 'Email', name: 'Nume (opțional)', emailPh: 'adresa@email.com', namePh: 'Cum să-ți spunem?', button: 'Cere acces', joining: 'Se trimite…', granted: '› acces acordat', onList: 'Ești pe listă.', welcome: 'Bine ai venit', position: 'poziția', emailAt: (e: string) => `Îți scriem pe ${e} la lansare.`, close: 'Închide', spam: 'FĂRĂ SPAM · TE POȚI DEZABONA ORICÂND', err: 'Introdu o adresă de email validă.', neterr: 'Eroare de rețea. Verifică-ți conexiunea.' },
  },
} as const

// ── Static data ──────────────────────────────────────────────────────────────

const skills: [string, number][] = [
  ['react & components', 78],
  ['apis & auth', 64],
  ['databases', 52],
  ['stripe & webhooks', 28],
  ['deployment', 41],
]

const agents = [
  ['01', 'orchestrator', 'plans & delegates'],
  ['02', 'architect', 'system & schema design'],
  ['03', 'builder', 'writes full-stack code'],
  ['04', 'frontend', 'interface & interaction'],
  ['05', 'backend', 'apis & business logic'],
  ['06', 'database', 'data modelling'],
  ['07', 'debugger', 'finds & fixes faults'],
  ['08', 'tester', 'qa & coverage'],
  ['09', 'mentor', 'teaches you'],
  ['10', 'tutor.ro', 'romanian guidance'],
  ['11', 'deployer', 'ships it live'],
  ['12', 'auditor', 'launch readiness'],
]

const launcherRows = [
  { icon: Boxes, title: 'Orchestrate build', sub: 'Orchestrator · plan & dispatch', sel: true },
  { icon: Layers, title: 'Generate the interface', sub: 'Frontend agent' },
  { icon: Cpu, title: 'Wire Stripe billing', sub: 'Backend agent' },
  { icon: GitBranch, title: 'Write & run tests', sub: 'Tester agent' },
  { icon: Rocket, title: 'Deploy to production', sub: 'Deployer agent' },
]

const whyIcons = [Boxes, Brain, GraduationCap, Globe]

const contentLib = {
  courses: ['AI Builder Foundations', 'Prompt Engineering for Real Software', 'Agentic Development', 'Building SaaS with AI', 'MCP & Tool Agents', 'Launching Products'],
  coursesRo: ['Fundamentele Builderului AI', 'Prompt Engineering pentru Software Real', 'Dezvoltare Agentică', 'Construiește SaaS cu AI', 'Agenți MCP & Tool', 'Lansarea Produselor'],
  books: ['The EmbrOS Builder Handbook', 'From Idea to Product', 'Building with AI Agents', 'Human-in-the-Loop Engineering', 'The AI Founder Playbook'],
  booksRo: ['Manualul Builderului EmbrOS', 'De la Idee la Produs', 'Construind cu Agenți AI', 'Inginerie Human-in-the-Loop', 'Playbook-ul Fondatorului AI'],
}

// ── Landing ──────────────────────────────────────────────────────────────────

function LandingPage({ onStart }: { onStart: () => void }) {
  const [lang, setLang] = useState<Lang>('en')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [showWaitlist, setShowWaitlist] = useState(false)
  const [waitlistSource, setWaitlistSource] = useState('hero')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [contentTab, setContentTab] = useState<'courses' | 'books' | 'prompts' | 'templates'>('courses')
  const [scrolled, setScrolled] = useState(false)
  const [waitCount, setWaitCount] = useState<number | null>(null)

  useEffect(() => {
    const s = typeof window !== 'undefined' ? localStorage.getItem('embros-lang') : null
    if (s === 'ro' || s === 'en') setLang(s)
  }, [])
  const switchLang = (l: Lang) => { setLang(l); try { localStorage.setItem('embros-lang', l) } catch {} }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    fetch('/api/waitlist').then(r => r.json()).then(d => { if (typeof d?.count === 'number') setWaitCount(d.count) }).catch(() => {})
  }, [])
  useReveal(lang)

  const openWaitlist = useCallback((source: string) => { setWaitlistSource(source); setShowWaitlist(true) }, [])
  const t = copy[lang]
  const wl = waitCount ?? 0

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* background */}
      <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-stage" />
        <div className="absolute inset-0 bg-grain" />
        <div className="beam absolute top-0 left-1/2 -translate-x-1/2 w-[680px] max-w-[90%] h-px" />
      </div>

      {/* system bar */}
      <div className="hidden sm:flex items-center justify-between h-7 px-5 border-b border-[var(--line)] text-[var(--faint)] font-mono text-[10px] tracking-[0.18em] uppercase">
        <span>EMBROS<span className="text-[var(--line-bright,#3b342d)]">//</span>AI-BUILDER-OS</span>
        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" /> {t.status}</span>
        <span>REL v0.1.0 — EN · RO</span>
      </div>

      {/* nav */}
      <nav className={`sticky top-0 z-50 border-b transition-colors duration-300 ${scrolled ? 'border-[var(--line)] bg-[var(--bg)]/70 backdrop-blur-xl' : 'border-transparent'}`}>
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <ForgeLogo markClass="w-7 h-7" wordClass="text-lg" />
          <div className="hidden md:flex items-center gap-7 text-sm text-[var(--dim)]">
            <a href="#loop" className="ulink hover:text-[var(--text)] transition-colors">{t.nav.system}</a>
            <a href="#agents" className="ulink hover:text-[var(--text)] transition-colors">{t.nav.agents}</a>
            <a href="#learn" className="ulink hover:text-[var(--text)] transition-colors">{t.nav.learning}</a>
            <a href="#content" className="ulink hover:text-[var(--text)] transition-colors">{t.nav.content}</a>
            <a href="#access" className="ulink hover:text-[var(--text)] transition-colors">{t.nav.access}</a>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" aria-label="Discord" title={t.discord} className="hidden sm:inline-flex p-2 rounded-lg text-[var(--dim)] hover:text-[#5865f2] hover:bg-[var(--glass-2)] transition-colors"><DiscordIcon className="w-5 h-5" /></a>
            <LangToggle lang={lang} onChange={switchLang} />
            <button onClick={() => openWaitlist('nav')} className="btn-primary text-sm hidden sm:inline-flex">{t.nav.join}</button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 -mr-2 text-[var(--dim)]">{mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-[var(--line)] bg-[var(--bg)] px-5 py-3 space-y-1 text-sm">
            {[['#loop', t.nav.system], ['#agents', t.nav.agents], ['#learn', t.nav.learning], ['#content', t.nav.content], ['#access', t.nav.access]].map(([h, l]) => (
              <a key={h} href={h} onClick={() => setMobileMenu(false)} className="block py-2.5 text-[var(--dim)]">{l}</a>
            ))}
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2.5 text-[var(--dim)]"><DiscordIcon className="w-4 h-4" /> {t.discord}</a>
            <button onClick={() => { setMobileMenu(false); openWaitlist('nav') }} className="btn-primary w-full mt-2">{t.nav.join}</button>
          </div>
        )}
      </nav>

      {/* hero */}
      <header className="relative px-5 sm:px-8 pt-16 sm:pt-24 pb-10 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="rise kicker mb-6">{t.hero.kicker}</p>
          <h1 className="rise font-bold tracking-[-0.03em] leading-[0.98]" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', animationDelay: '60ms' }}>
            {t.hero.t1}<br /><span className="gold-text">{t.hero.t2}</span>
          </h1>
          <p className="rise mt-6 max-w-xl mx-auto text-[var(--dim)] text-base sm:text-lg leading-relaxed" style={{ animationDelay: '140ms' }}>{t.hero.sub}</p>
          <div className="rise mt-8 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: '200ms' }}>
            <button onClick={() => openWaitlist('hero')} className="btn-primary text-base px-6"><Mail className="w-4 h-4" /> {t.hero.cta}</button>
            <a href="#loop" className="btn-secondary text-base px-6">{t.hero.cta2} <ArrowRight className="w-4 h-4" /></a>
          </div>
          <p className="rise mt-5 font-mono text-xs text-[var(--faint)] uppercase tracking-[0.14em]" style={{ animationDelay: '240ms' }}>{t.hero.seats(wl)}</p>
        </div>
        <div className="rise relative max-w-2xl mx-auto mt-12 sm:mt-16" style={{ animationDelay: '320ms' }}>
          <div className="absolute -inset-x-12 -top-12 -bottom-8 glow-gold blur-[70px] opacity-55 pointer-events-none" />
          <div className="floaty"><CommandCenter /></div>
        </div>
      </header>

      {/* capability marquee */}
      <section className="relative overflow-hidden border-y border-[var(--line)] py-4">
        <div className="flex whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          {[0, 1].map(k => (
            <div key={k} className="marquee flex items-center gap-8 pr-8 shrink-0 font-mono text-sm uppercase tracking-[0.16em] text-[var(--dim)]" aria-hidden={k === 1}>
              {t.cap.map((w, i) => (<span key={i} className="flex items-center gap-8">{w}<span className="text-[var(--gold)]">✦</span></span>))}
            </div>
          ))}
        </div>
      </section>

      {/* THE LOOP */}
      <section id="loop" className="max-w-[1180px] mx-auto px-5 sm:px-8 py-24 sm:py-32" data-reveal>
        <div className="max-w-2xl mb-12">
          <p className="kicker mb-4 text-[var(--gold-bright)]">{t.loop.kicker}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.05]">{t.loop.title}</h2>
          <p className="mt-4 text-[var(--dim)]">{t.loop.sub}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {t.loop.steps.map(([n, ti, d], i) => (
            <div key={n} className="relative glass bezel rounded-2xl p-5 hover:bg-[var(--glass-2)] transition-colors">
              <div className="font-mono text-xs text-[var(--gold-bright)] mb-3">{n}</div>
              <h3 className="text-sm font-semibold mb-1.5">{ti}</h3>
              <p className="text-[var(--dim)] text-xs leading-relaxed">{d}</p>
              {i < 4 && <ArrowRight className="hidden lg:block absolute top-1/2 -right-2.5 -translate-y-1/2 w-4 h-4 text-[var(--faint)]" />}
            </div>
          ))}
        </div>
      </section>

      {/* WHY — bento */}
      <section className="max-w-[1180px] mx-auto px-5 sm:px-8 pb-24 sm:pb-32" data-reveal>
        <div className="max-w-2xl mb-10">
          <p className="kicker mb-4 text-[var(--gold-bright)]">{t.why.kicker}</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em]">{t.why.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.why.cards.map(([ti, d], i) => {
            const Icon = whyIcons[i]
            return (
              <div key={i} className={`rounded-2xl p-6 ${i === 0 ? 'glass stroke-gold bezel' : 'glass bezel'} hover:bg-[var(--glass-2)] transition-colors`}>
                <Icon className="w-5 h-5 text-[var(--gold-bright)] mb-4" />
                <h3 className="text-base font-semibold mb-1.5">{ti}</h3>
                <p className="text-[var(--dim)] text-sm leading-relaxed">{d}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* AGENTS */}
      <section id="agents" className="max-w-[1180px] mx-auto px-5 sm:px-8 pb-24 sm:pb-32" data-reveal>
        <div className="max-w-2xl mb-10">
          <p className="kicker mb-4 text-[var(--gold-bright)]">{t.agents.kicker}</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em]">{t.agents.title}</h2>
        </div>
        <div className="glass bezel rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[3rem_1fr_2fr_auto] gap-4 px-5 sm:px-7 h-10 items-center border-b border-[var(--line)] font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--faint)] min-w-[480px]">
            <span>pid</span><span>agent</span><span className="hidden sm:block">role</span><span>status</span>
          </div>
          <div className="overflow-x-auto">
            {agents.map(([pid, name, role]) => (
              <div key={pid} className="group grid grid-cols-[3rem_1fr_2fr_auto] gap-4 px-5 sm:px-7 py-3 items-center border-b border-[var(--line)] last:border-0 font-mono text-[13px] min-w-[480px] hover:bg-[var(--glass-2)] transition-colors">
                <span className="text-[var(--faint)]">{pid}</span>
                <span className="text-[var(--text)] group-hover:text-[var(--gold-bright)] transition-colors">{name}</span>
                <span className="hidden sm:block text-[var(--dim)]">{role}</span>
                <span className="flex items-center gap-1.5 text-[var(--gold-bright)] text-[11px] uppercase tracking-wider"><span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />online</span>
              </div>
            ))}
          </div>
        </div>
        <p className="kicker mt-4">{t.agents.note}</p>
      </section>

      {/* ADAPTIVE LEARNING */}
      <section id="learn" className="max-w-[1180px] mx-auto px-5 sm:px-8 pb-24 sm:pb-32" data-reveal>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <p className="kicker mb-4 text-[var(--gold-bright)]">{t.learn.kicker}</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.05]">{t.learn.t1}<br /><span className="gold-text">{t.learn.t2}</span></h2>
            <p className="mt-5 text-[var(--dim)] leading-relaxed max-w-md">{t.learn.sub}</p>
            <div className="mt-6 flex flex-wrap gap-2">{t.learn.chips.map(c => (<span key={c} className="px-3 py-1.5 rounded-full glass text-xs text-[var(--dim)]">{c}</span>))}</div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 glow-gold blur-[55px] opacity-40 pointer-events-none" />
            <div className="relative glass bezel rounded-2xl p-5 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="kicker flex items-center gap-2"><Brain className="w-3.5 h-3.5 text-[var(--gold-bright)]" /> {t.learn.map}</span>
                <span className="kicker text-[var(--gold-bright)]">{t.learn.growing}</span>
              </div>
              <div className="space-y-4">
                {skills.map(([name, lvl]) => {
                  const learning = name === 'stripe & webhooks'
                  return (
                    <div key={name}>
                      <div className="flex items-center justify-between text-[12px] font-mono mb-1.5">
                        <span className="text-[var(--text)]">{name}{learning && <span className="ml-2 text-[10px] text-[var(--gold-bright)] uppercase tracking-wider">{t.learn.learningNow}</span>}</span>
                        <span className="text-[var(--faint)]">{lvl}%</span>
                      </div>
                      <div className="h-[3px] rounded bg-white/[0.06]"><div className="h-full rounded" style={{ width: lvl + '%', background: learning ? 'linear-gradient(90deg,#ffd866,#e8a019)' : 'var(--gold)' }} /></div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-5 pt-4 border-t border-[var(--line)] flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-[var(--gold)]/12 border border-[var(--gold)]/25 flex items-center justify-center shrink-0"><GraduationCap className="w-4 h-4 text-[var(--gold-bright)]" /></span>
                <p className="text-[12px] text-[var(--dim)] leading-relaxed"><span className="text-[var(--text)] font-medium">{t.learn.lessonT}</span><br />{t.learn.lessonD}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT LIBRARY */}
      <section id="content" className="max-w-[1180px] mx-auto px-5 sm:px-8 pb-24 sm:pb-32" data-reveal>
        <div className="max-w-2xl mb-8">
          <p className="kicker mb-4 text-[var(--gold-bright)]">{t.content.kicker}</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em]">{t.content.title}</h2>
          <p className="mt-4 text-[var(--dim)]">{t.content.sub}</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          {(['courses', 'books', 'prompts', 'templates'] as const).map(tab => (
            <button key={tab} onClick={() => setContentTab(tab)} className={`px-4 py-2 rounded-lg text-sm transition-colors ${contentTab === tab ? 'bg-[var(--gold)]/12 text-[var(--gold-bright)] ring-1 ring-inset ring-[var(--gold)]/25' : 'glass text-[var(--dim)] hover:text-[var(--text)]'}`}>
              {t.content.tabs[tab]}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {(contentTab === 'courses'
            ? (lang === 'ro' ? contentLib.coursesRo : contentLib.courses)
            : contentTab === 'books'
              ? (lang === 'ro' ? contentLib.booksRo : contentLib.books)
              : contentTab === 'prompts'
                ? ['Create Component', 'Debug Error', 'Product Plan', 'Refactor Safely', 'Write Tests', 'Ship Checklist']
                : ['SaaS Application', 'Landing Page', 'AI Chatbot', 'Telegram Bot', 'Automation Tool', 'API Backend']
          ).map((item, i) => (
            <div key={i} className="glass bezel rounded-xl p-4 flex items-center gap-3 hover:bg-[var(--glass-2)] transition-colors">
              <span className="w-8 h-8 rounded-lg bg-[var(--gold)]/12 border border-[var(--gold)]/20 flex items-center justify-center shrink-0 text-[var(--gold-bright)]">
                {contentTab === 'courses' ? <GraduationCap className="w-4 h-4" /> : contentTab === 'books' ? <BookOpen className="w-4 h-4" /> : contentTab === 'prompts' ? <MessageSquare className="w-4 h-4" /> : <FolderOpen className="w-4 h-4" />}
              </span>
              <span className="text-sm text-[var(--text)] truncate">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="max-w-[1180px] mx-auto px-5 sm:px-8 pb-24 sm:pb-32" data-reveal>
        <div className="max-w-2xl mb-8">
          <p className="kicker mb-4 text-[var(--gold-bright)]">{t.platforms.kicker}</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em]">{t.platforms.title}</h2>
          <p className="mt-4 text-[var(--dim)]">{t.platforms.sub}</p>
        </div>
        <div className="chrome bezel rounded-xl px-5 py-4 flex items-center justify-between flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--dim)]">
          <span className="text-[var(--faint)]">{t.runson}</span>
          {['Web', 'macOS', 'Windows', 'Linux', 'CLI'].map(p => (<span key={p} className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[var(--gold)]" />{p}</span>))}
        </div>
        <div className="mt-3 glass bezel rounded-xl px-5 py-4 font-mono text-xs sm:text-sm flex items-center gap-3 overflow-x-auto">
          <span className="text-[var(--faint)] shrink-0">$</span>
          <span className="text-[var(--text)]">curl -fsSL embros.xyz/install <span className="text-[var(--faint)]">|</span> sh</span>
          <span className="ml-auto text-[var(--gold-bright)] shrink-0 hidden sm:inline">→ installing embros…</span>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="max-w-[1180px] mx-auto px-5 sm:px-8 pb-24 sm:pb-32" data-reveal>
        <div className="max-w-2xl mb-10">
          <p className="kicker mb-4 text-[var(--gold-bright)]">{t.who.kicker}</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] leading-[1.1]">{t.who.title}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.who.items.map(([ti, d], i) => (
            <div key={i} className="glass bezel rounded-2xl p-6 hover:bg-[var(--glass-2)] transition-colors">
              <div className="font-mono text-xs text-[var(--gold-bright)] mb-3">0{i + 1}</div>
              <h3 className="text-base font-semibold mb-1.5">{ti}</h3>
              <p className="text-[var(--dim)] text-sm">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ACCESS */}
      <section id="access" className="max-w-[1180px] mx-auto px-5 sm:px-8 pb-24 sm:pb-32" data-reveal>
        <div className="max-w-2xl mb-10">
          <p className="kicker mb-4 text-[var(--gold-bright)]">{t.access.kicker}</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em]">{t.access.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[t.access.free, { ...t.access.pro, hot: true }].map((p: any) => (
            <div key={p.tier} className={`rounded-2xl p-7 sm:p-9 ${p.hot ? 'glass stroke-gold bezel' : 'glass bezel'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">{p.tier}</h3>
                {p.hot && <span className="kicker text-[var(--gold-bright)]">{p.rec}</span>}
              </div>
              <div className="flex items-baseline gap-1 mb-7">
                <span className="text-5xl font-bold tracking-tight" style={{ color: p.hot ? 'var(--gold-bright)' : 'var(--text)' }}>{p.price}</span>
                <span className="text-sm text-[var(--faint)]">{p.tag}</span>
              </div>
              <ul className="space-y-0 mb-8">
                {p.feats.map((f: string) => (<li key={f} className="flex items-center justify-between py-2.5 border-t border-[var(--line)] text-[13px] text-[var(--dim)]"><span>{f}</span><span className="text-[var(--gold-bright)]">✓</span></li>))}
              </ul>
              <button onClick={() => openWaitlist('access-' + p.tier)} className={p.hot ? 'btn-primary w-full' : 'btn-secondary w-full'}>{t.access.join}</button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[820px] mx-auto px-5 sm:px-8 pb-24 sm:pb-32" data-reveal>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] mb-8">{t.faqTitle}</h2>
        <div className="border-t border-[var(--line)]">
          {t.faq.map(([q, a], i) => (
            <div key={i} className="border-b border-[var(--line)]">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center gap-5 py-5 text-left group">
                <span className="flex-1 text-base sm:text-lg font-medium group-hover:text-[var(--gold-bright)] transition-colors">{q}</span>
                <span className="shrink-0 text-[var(--dim)]">{openFaq === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}</span>
              </button>
              {openFaq === i && <p className="pb-6 -mt-1 pr-8 text-[var(--dim)] text-sm sm:text-base leading-relaxed max-w-2xl">{a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL */}
      <section className="relative px-5 sm:px-8 pb-28" data-reveal>
        <div className="max-w-[1180px] mx-auto relative glass stroke-gold bezel rounded-3xl px-6 sm:px-12 py-16 sm:py-24 text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[560px] max-w-full h-[320px] glow-gold blur-[60px] opacity-80" />
          <h2 className="relative text-3xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] mb-5">{t.final.t1}<br /><span className="gold-text">{t.final.t2}</span></h2>
          <p className="relative text-[var(--dim)] max-w-md mx-auto mb-8">{t.final.sub}</p>
          <div className="relative flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => openWaitlist('final')} className="btn-primary text-base px-7"><Mail className="w-4 h-4" /> {t.final.join}</button>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary text-base px-6"><DiscordIcon className="w-4 h-4" /> {t.discord}</a>
          </div>
          <p className="relative mt-5 font-mono text-xs text-[var(--faint)] uppercase tracking-[0.14em]">{t.final.seats(wl)}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-[1180px] mx-auto px-5 sm:px-8 py-12 border-t border-[var(--line)]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
          <div>
            <ForgeLogo markClass="w-8 h-8" wordClass="text-2xl" />
            <p className="mt-3 text-sm text-[var(--faint)]">{t.footer.tagline}</p>
          </div>
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6 text-sm text-[var(--dim)]">
              <a href="#loop" className="ulink">{t.nav.system}</a>
              <a href="#agents" className="ulink">{t.nav.agents}</a>
              <a href="#access" className="ulink">{t.nav.access}</a>
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="ulink flex items-center gap-1.5"><DiscordIcon className="w-4 h-4" /> Discord</a>
            </nav>
            <LangToggle lang={lang} onChange={switchLang} />
          </div>
        </div>
        <div className="mt-10 pt-5 border-t border-[var(--line)] flex flex-col sm:flex-row justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--faint)]">
          <span>© 2026 EmbrOS — embros.xyz</span>
          <span>{t.footer.os}</span>
        </div>
      </footer>

      {showWaitlist && <WaitlistModal onClose={() => setShowWaitlist(false)} source={waitlistSource} t={t.wl} />}
    </div>
  )
}

// ── Language toggle ──────────────────────────────────────────────────────────

function LangToggle({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className="flex items-center rounded-lg glass p-0.5 text-xs font-mono">
      {(['en', 'ro'] as Lang[]).map(l => (
        <button key={l} onClick={() => onChange(l)} className={`px-2.5 py-1 rounded-md uppercase tracking-wider transition-colors ${lang === l ? 'bg-[var(--gold)] text-[#1a1206] font-semibold' : 'text-[var(--dim)] hover:text-[var(--text)]'}`}>{l}</button>
      ))}
    </div>
  )
}

// ── Command Center (Raycast-style launcher) ──────────────────────────────────

function CommandCenter() {
  const query = 'Build me a SaaS dashboard with auth + Stripe'
  const [typed, setTyped] = useState('')
  useEffect(() => {
    let i = 0
    const t = setInterval(() => { i++; setTyped(query.slice(0, i)); if (i >= query.length) clearInterval(t) }, 45)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="relative glass bezel rounded-2xl overflow-hidden text-left shadow-[0_50px_140px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-3 px-5 h-[64px] border-b border-[var(--line)]">
        <ForgeMark className="w-6 h-6 shrink-0" />
        <span className="text-base sm:text-[17px] text-[var(--text)] flex-1 truncate">{typed}<span className="cursor-blink text-[var(--gold-bright)]">▍</span></span>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-[var(--gold)]/12 text-[var(--gold-bright)] border border-[var(--gold)]/20">AI</span>
      </div>
      <div className="flex items-center justify-between px-5 pt-3 pb-1"><span className="kicker">Agents</span><span className="kicker">5 results</span></div>
      <div className="px-2 pb-2">
        {launcherRows.map((r, i) => (
          <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${r.sel ? 'bg-[var(--gold)]/12 ring-1 ring-inset ring-[var(--gold)]/25' : ''}`}>
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${r.sel ? 'bg-[var(--gold)] text-[#1a1206]' : 'bg-white/[0.05] text-[var(--gold-bright)] border border-[var(--line)]'}`}><r.icon className="w-4 h-4" /></span>
            <div className="min-w-0 flex-1">
              <div className={`text-sm truncate ${r.sel ? 'text-[var(--text)] font-medium' : 'text-[var(--dim)]'}`}>{r.title}</div>
              <div className="text-[11px] text-[var(--faint)] truncate">{r.sub}</div>
            </div>
            {r.sel ? <span className="shrink-0 flex items-center gap-1.5 font-mono text-[10px] text-[var(--gold-bright)] uppercase tracking-wider">Run <CornerDownLeft className="w-3.5 h-3.5" /></span> : <span className="shrink-0 font-mono text-[11px] text-[var(--faint)]">⏎</span>}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-4 h-11 border-t border-[var(--line)]">
        <ForgeLogo markClass="w-4 h-4" wordClass="text-xs" glow={false} className="opacity-80" />
        <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--faint)]">
          <kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-[var(--line)]">↑↓</kbd><span className="hidden sm:inline">navigate</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-[var(--line)]">⏎</kbd><span className="hidden sm:inline">run</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-[var(--line)]">⌘K</kbd><span>actions</span>
        </div>
      </div>
    </div>
  )
}

// ── Scroll reveal hook ───────────────────────────────────────────────────────

function useReveal(dep?: unknown) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const els = Array.from(document.querySelectorAll('[data-reveal]'))
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [dep])
}

// ── Waitlist Modal ──────────────────────────────────────────────────────────

function WaitlistModal({ onClose, source, t }: { onClose: () => void; source: string; t: any }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [position, setPosition] = useState<number | null>(null)

  const handleSubmit = async () => {
    if (!email.trim() || !email.includes('@')) { setError(t.err); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email.trim(), name: name.trim(), source }) })
      const data = await res.json()
      if (res.ok) { setSubmitted(true); setPosition(data.position ?? null) }
      else setError(data.error || t.neterr)
    } catch { setError(t.neterr) }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass bezel rounded-2xl w-full max-w-md animate-fadeIn overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-40 glow-gold blur-[40px] pointer-events-none" />
        <div className="relative flex items-center justify-between px-5 h-11 border-b border-[var(--line)] font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--faint)]">
          <span className="flex items-center gap-1.5"><Command className="w-3 h-3" /> embros://waitlist</span>
          <button onClick={onClose} className="text-[var(--dim)] hover:text-[var(--text)]"><X className="w-4 h-4" /></button>
        </div>
        {submitted ? (
          <div className="relative p-8 text-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--gold-bright)] mb-4">{t.granted}</div>
            <h3 className="text-2xl font-bold mb-2">{t.onList}</h3>
            <p className="text-[var(--dim)] text-sm mb-1">{t.welcome}{name ? `, ${name}` : ''}.</p>
            {position && <p className="font-mono text-xs text-[var(--faint)] mb-4">{t.position} #{position}</p>}
            <p className="text-[var(--faint)] text-xs mb-6">{t.emailAt(email)}</p>
            <button onClick={onClose} className="btn-secondary">{t.close}</button>
          </div>
        ) : (
          <div className="relative p-7">
            <h3 className="text-2xl font-bold mb-1">{t.title}</h3>
            <p className="text-[var(--dim)] text-sm mb-6">{t.sub}</p>
            <div className="space-y-3" onKeyDown={e => { if (e.key === 'Enter' && !loading) handleSubmit() }}>
              <div>
                <label className="kicker block mb-2">{t.email} *</label>
                <input type="email" value={email} autoFocus onChange={e => { setEmail(e.target.value); setError('') }} placeholder={t.emailPh} className="w-full bg-[var(--bg)] border border-[var(--glass-border)] rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--gold)] transition-colors placeholder:text-[var(--faint)]" />
              </div>
              <div>
                <label className="kicker block mb-2">{t.name}</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder={t.namePh} className="w-full bg-[var(--bg)] border border-[var(--glass-border)] rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--gold)] transition-colors placeholder:text-[var(--faint)]" />
              </div>
              {error && <p className="font-mono text-xs text-[#ff6b6b]">{error}</p>}
              <button onClick={handleSubmit} disabled={loading} className="btn-primary w-full mt-1">{loading ? t.joining : t.button}</button>
            </div>
            <p className="kicker mt-4 text-center">{t.spam}</p>
          </div>
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
  const handleSubmit = () => { login(email || 'builder@embros.xyz', name || 'Builder'); onComplete() }
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mx-auto mb-4"><ForgeMark className="w-7 h-7" glow /></div>
          <h1 className="text-2xl font-bold mb-2">Welcome to EmbrOS</h1>
          <p className="text-[var(--dim)] text-sm">Let&apos;s set up your builder profile.</p>
        </div>
        {step === 0 && (
          <div className="space-y-4">
            <div><label className="block text-sm font-medium mb-1.5">Your name</label><input value={name} onChange={e => setName(e.target.value)} placeholder="What should we call you?" className="w-full bg-[var(--graphite)] border border-[var(--glass-border)] rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--gold)] placeholder:text-[var(--faint)]" /></div>
            <div><label className="block text-sm font-medium mb-1.5">Email (optional)</label><input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="w-full bg-[var(--graphite)] border border-[var(--glass-border)] rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--gold)] placeholder:text-[var(--faint)]" /></div>
            <button onClick={() => setStep(1)} className="btn-primary w-full mt-2">Continue <ArrowRight className="w-4 h-4" /></button>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-3">
            <h3 className="font-semibold mb-3">What do you want to build?</h3>
            {['A website or landing page', 'A SaaS product', 'A mobile app', 'A bot or automation', 'I have an idea'].map(idea => (<button key={idea} onClick={handleSubmit} className="w-full text-left p-3 rounded-lg glass hover:bg-[var(--glass-2)] hover:border-[var(--gold)]/40 text-sm transition-colors">{idea}</button>))}
          </div>
        )}
        <button onClick={handleSubmit} className="text-xs text-[var(--faint)] hover:text-[var(--dim)] mt-4 block mx-auto">Skip for now</button>
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
      <header className="h-14 border-b border-[var(--line)] flex items-center px-4 sm:px-6 gap-3 bg-[var(--bg-2)]">
        <ForgeLogo markClass="w-7 h-7" wordClass="text-base" glow={false} />
        <div className="flex-1" />
        <button onClick={() => setView('courses')} className="p-2 hover:bg-[var(--glass-2)] rounded-lg text-[var(--dim)]"><BookOpen className="w-4 h-4" /></button>
        <button onClick={() => setView('books')} className="p-2 hover:bg-[var(--glass-2)] rounded-lg text-[var(--dim)]"><BookOpen className="w-4 h-4" /></button>
        <button onClick={() => setView('prompts')} className="p-2 hover:bg-[var(--glass-2)] rounded-lg text-[var(--dim)]"><MessageSquare className="w-4 h-4" /></button>
        <button onClick={() => setView('templates')} className="p-2 hover:bg-[var(--glass-2)] rounded-lg text-[var(--dim)]"><FolderOpen className="w-4 h-4" /></button>
      </header>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-8"><h1 className="text-xl sm:text-2xl font-bold mb-1">Welcome back, {user?.name || 'Builder'}</h1><p className="text-sm text-[var(--dim)]">What do you want to build today?</p></div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <button onClick={() => setShowNew(true)} className="p-4 rounded-xl glass hover:bg-[var(--glass-2)] text-left"><Plus className="w-5 h-5 text-[var(--gold-bright)] mb-2" /><div className="text-sm font-medium">New Project</div></button>
          <button onClick={() => setView('courses')} className="p-4 rounded-xl glass hover:bg-[var(--glass-2)] text-left"><BookOpen className="w-5 h-5 text-[var(--gold-bright)] mb-2" /><div className="text-sm font-medium">Courses</div></button>
          <button onClick={() => setView('books')} className="p-4 rounded-xl glass hover:bg-[var(--glass-2)] text-left"><BookOpen className="w-5 h-5 text-[var(--gold-bright)] mb-2" /><div className="text-sm font-medium">Books</div></button>
          <button onClick={() => setView('templates')} className="p-4 rounded-xl glass hover:bg-[var(--glass-2)] text-left"><FolderOpen className="w-5 h-5 text-[var(--gold-bright)] mb-2" /><div className="text-sm font-medium">Templates</div></button>
        </div>
        {showNew && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70" onClick={() => setShowNew(false)} />
            <div className="relative glass rounded-xl p-6 w-full max-w-lg">
              <h2 className="text-lg font-bold mb-4">Describe your idea</h2>
              <textarea value={newIdea} onChange={e => setNewIdea(e.target.value)} placeholder="I want to build a..." className="w-full bg-[var(--bg)] border border-[var(--glass-border)] rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--gold)] placeholder:text-[var(--faint)] h-28 resize-none" />
              <div className="flex gap-3 mt-4"><button onClick={startProject} className="btn-primary flex-1" disabled={!newIdea.trim()}>Generate</button><button onClick={() => setShowNew(false)} className="btn-secondary">Cancel</button></div>
            </div>
          </div>
        )}
        <h2 className="text-lg font-semibold mb-4">Your Projects</h2>
        {projects.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-[var(--glass-border)] rounded-xl"><p className="text-[var(--dim)] text-sm mb-4">No projects yet.</p><button onClick={() => setShowNew(true)} className="btn-primary text-sm"><Plus className="w-4 h-4" /> New Project</button></div>
        ) : (
          <div className="space-y-3">{projects.map(p => (<button key={p.id} onClick={() => { setActiveProject(p.id); setView('ide'); }} className="w-full text-left p-4 rounded-xl glass hover:bg-[var(--glass-2)] transition-colors"><h3 className="font-medium text-sm">{p.name}</h3><ChevronRight className="w-4 h-4 text-[var(--faint)]" /></button>))}</div>
        )}
      </div>
    </div>
  )
}

function IDEPanelPage() {
  const { activeProject, setView } = useForgeStore()
  if (!activeProject) return <div className="min-h-screen flex items-center justify-center"><p className="text-[var(--dim)]">No project selected</p></div>
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-14 border-b border-[var(--line)] flex items-center px-4 gap-3 bg-[var(--bg-2)]"><button onClick={() => setView('dashboard')} className="text-sm text-[var(--dim)]">Back</button><span className="font-bold text-sm">{activeProject.name}</span></header>
      <div className="flex-1 flex items-center justify-center"><p className="text-[var(--dim)]">IDE Panel — coming soon</p></div>
    </div>
  )
}

function CoursesPage() {
  const { setView } = useForgeStore()
  return (
    <div className="min-h-screen">
      <header className="h-14 border-b border-[var(--line)] flex items-center px-4 gap-3 bg-[var(--bg-2)]"><button onClick={() => setView('dashboard')} className="text-sm text-[var(--dim)]">Back</button><span className="font-bold">Courses</span></header>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8"><h1 className="text-xl sm:text-2xl font-bold mb-6">Courses</h1><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{['AI Builder Foundations', 'Prompt Engineering', 'Agentic Development', 'Building SaaS with AI', 'MCP and Tool Agents', 'Launching Products'].map(c => (<div key={c} className="p-5 rounded-xl glass"><h3 className="font-semibold">{c}</h3><p className="text-xs text-[var(--faint)] mt-1">12 lessons</p></div>))}</div></div>
    </div>
  )
}

function BooksPage() {
  const { setView } = useForgeStore()
  return (
    <div className="min-h-screen">
      <header className="h-14 border-b border-[var(--line)] flex items-center px-4 gap-3 bg-[var(--bg-2)]"><button onClick={() => setView('dashboard')} className="text-sm text-[var(--dim)]">Back</button><span className="font-bold">Books</span></header>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8"><h1 className="text-xl sm:text-2xl font-bold mb-6">Books and Guides</h1><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{['The EmbrOS Builder Handbook', 'From Idea to Product', 'Building with AI Agents', 'The AI Founder Playbook'].map(b => (<div key={b} className="p-5 rounded-xl glass"><h3 className="font-semibold">{b}</h3><p className="text-xs text-[var(--faint)] mt-1">8 chapters</p></div>))}</div></div>
    </div>
  )
}

function PromptsPage() {
  const { setView } = useForgeStore()
  return (
    <div className="min-h-screen">
      <header className="h-14 border-b border-[var(--line)] flex items-center px-4 gap-3 bg-[var(--bg-2)]"><button onClick={() => setView('dashboard')} className="text-sm text-[var(--dim)]">Back</button><span className="font-bold">Prompts</span></header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8"><h1 className="text-xl sm:text-2xl font-bold mb-6">Prompt Library</h1><div className="space-y-3">{[{ t: 'Create Component', c: 'Create a React component with TypeScript and Tailwind.' }, { t: 'Debug Error', c: 'I am getting this error. Explain cause, fix, and prevention.' }, { t: 'Product Plan', c: 'Plan: brief, audience, features, MVP scope.' }].map(p => (<div key={p.t} className="p-4 rounded-xl glass"><h3 className="font-medium text-sm mb-1">{p.t}</h3><p className="text-xs text-[var(--dim)]">{p.c}</p></div>))}</div></div>
    </div>
  )
}

function TemplatesPage() {
  const { setView } = useForgeStore()
  return (
    <div className="min-h-screen">
      <header className="h-14 border-b border-[var(--line)] flex items-center px-4 gap-3 bg-[var(--bg-2)]"><button onClick={() => setView('dashboard')} className="text-sm text-[var(--dim)]">Back</button><span className="font-bold">Templates</span></header>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8"><h1 className="text-xl sm:text-2xl font-bold mb-6">Project Templates</h1><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{['SaaS Application', 'Landing Page', 'AI Chatbot', 'Telegram Bot', 'Automation Tool', 'API Backend'].map(t => (<div key={t} className="p-5 rounded-xl glass hover:bg-[var(--glass-2)] transition-colors"><h3 className="font-semibold">{t}</h3><p className="text-xs text-[var(--faint)] mt-1">Starter template</p></div>))}</div></div>
    </div>
  )
}
