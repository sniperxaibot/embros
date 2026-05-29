// FORGE - Project Templates
// 10 starter templates with real file content

import type { Template, FileNode } from '../types/index'

function f(id: string, name: string, lang: string, content: string): FileNode {
  return { id, name, type: 'file', language: lang, content }
}

export const TEMPLATES: Template[] = [
  {
    id: 'tpl-1',
    slug: 'saas-app',
    name: 'SaaS Application',
    nameRo: 'Aplicatie SaaS',
    description: 'Full SaaS app with Next.js, auth, dashboard, and Stripe payments.',
    descriptionRo: 'Aplicatie SaaS completa cu Next.js, auth, dashboard si plati Stripe.',
    icon: '🏢',
    color: '#3b82f6',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'Stripe', 'Tailwind'],
    category: 'web',
    files: [
      f('t1-1', 'app/page.tsx', 'tsx', `export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-[#e2e2e7]">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your SaaS</h1>
        <p className="text-[#6b6b73] text-lg mb-8">
          Your SaaS application is ready. Start building features!
        </p>
        <div className="flex gap-4">
          <a href="/dashboard" className="bg-[#f59e0b] text-[#0a0a0b] px-6 py-3 rounded-lg font-semibold hover:bg-[#fbbf24]">
            Go to Dashboard
          </a>
          <a href="/pricing" className="border border-[#252529] px-6 py-3 rounded-lg hover:bg-[#1a1a1e]">
            View Pricing
          </a>
        </div>
      </div>
    </main>
  )
}`),
    ],
  },
  {
    id: 'tpl-2',
    slug: 'landing-page',
    name: 'Landing Page',
    nameRo: 'Landing Page',
    description: 'A beautiful, responsive landing page with hero, features, and CTA.',
    descriptionRo: 'O landing page frumoasa si responsive cu hero, functionalitati si CTA.',
    icon: '🎯',
    color: '#f59e0b',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    category: 'web',
    files: [
      f('t2-1', 'index.html', 'html', `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Product</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav>
    <div class="logo">⚡ MyProduct</div>
    <div class="links">
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
      <a href="#cta" class="cta-nav">Get Started</a>
    </div>
  </nav>
  <section class="hero">
    <h1>Build Something<br><span class="accent">Amazing</span></h1>
    <p>Your journey to building great products starts here.</p>
    <button class="cta-primary" onclick="alert('Coming soon!')">Get Started Free</button>
    <p class="sub">No credit card required</p>
  </section>
  <section id="features" class="features">
    <h2>Why Choose Us</h2>
    <div class="grid">
      <div class="card"><h3>🚀 Fast</h3><p>Ship in weeks, not months.</p></div>
      <div class="card"><h3>🎯 Focused</h3><p>Learn only what you need.</p></div>
      <div class="card"><h3>🤖 AI-Powered</h3><p>AI mentor guides every step.</p></div>
    </div>
  </section>
  <section id="cta" class="cta-section">
    <h2>Ready to start?</h2>
    <p>Join 100+ builders shipping real products.</p>
    <button class="cta-primary">Start Building — Free</button>
  </section>
  <footer>Built with ⚡ MyProduct</footer>
  <script src="script.js"></script>
</body>
</html>`),
      f('t2-2', 'style.css', 'css', `* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #0a0a0b; color: #e2e2e7; line-height: 1.6; }
nav { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 4rem; border-bottom: 1px solid #252529; }
.logo { font-size: 1.25rem; font-weight: 700; }
.links a { color: #94949c; text-decoration: none; margin-left: 2rem; font-size: 0.9rem; }
.links a:hover { color: #f59e0b; }
.cta-nav { background: #f59e0b; color: #0a0a0b !important; padding: 0.5rem 1rem; border-radius: 0.5rem; }
.hero { text-align: center; padding: 8rem 2rem; max-width: 700px; margin: 0 auto; }
.hero h1 { font-size: 4rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; }
.accent { color: #f59e0b; }
.hero p { font-size: 1.2rem; color: #6b6b73; margin-bottom: 2rem; }
.cta-primary { background: #f59e0b; color: #0a0a0b; border: none; padding: 1rem 2.5rem; font-size: 1rem; font-weight: 600; border-radius: 0.5rem; cursor: pointer; }
.cta-primary:hover { background: #fbbf24; }
.sub { font-size: 0.85rem !important; color: #45454c !important; margin-top: 1rem; }
.features { padding: 4rem; max-width: 1000px; margin: 0 auto; }
.features h2 { text-align: center; font-size: 2rem; margin-bottom: 3rem; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.card { background: #111113; border: 1px solid #252529; border-radius: 1rem; padding: 2rem; text-align: center; }
.card h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
.card p { color: #6b6b73; }
.cta-section { text-align: center; padding: 6rem 2rem; border-top: 1px solid #252529; }
.cta-section h2 { font-size: 2rem; margin-bottom: 1rem; }
.cta-section p { color: #6b6b73; margin-bottom: 2rem; }
footer { text-align: center; padding: 2rem; border-top: 1px solid #252529; color: #45454c; font-size: 0.85rem; }
@media (max-width: 768px) { .grid { grid-template-columns: 1fr; } .hero h1 { font-size: 2.5rem; } nav { padding: 1rem 1.5rem; } }`),
      f('t2-3', 'script.js', 'javascript', `console.log('Landing page loaded!');
document.querySelectorAll('.links a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});`),
    ],
  },
  {
    id: 'tpl-3',
    slug: 'ai-chatbot',
    name: 'AI Chatbot',
    nameRo: 'Chatbot AI',
    description: 'An AI-powered chatbot interface with streaming responses.',
    descriptionRo: 'O interfata chatbot cu AI si raspunsuri streaming.',
    icon: '🤖',
    color: '#a855f7',
    techStack: ['Next.js', 'TypeScript', 'OpenRouter', 'React'],
    category: 'ai',
    files: [
      f('t3-1', 'app/page.tsx', 'tsx', `'use client'
import { useState } from 'react'

export default function Chatbot() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!input.trim() || loading) return
    const msg = input.trim()
    setInput('')
    setMessages(m => [...m, { role: 'user', content: msg }])
    setLoading(true)
    // AI integration goes here
    setMessages(m => [...m, { role: 'assistant', content: 'AI response placeholder' }])
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#e2e2e7] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full">
        {messages.map((m, i) => (
          <div key={i} className={\`mb-4 \${m.role === 'user' ? 'text-right' : ''}\`}>
            <div className={\`inline-block rounded-lg px-4 py-2 max-w-[80%] \${
              m.role === 'user' ? 'bg-[#f59e0b] text-[#0a0a0b]' : 'bg-[#111113] border border-[#252529]'
            }\`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-[#252529] p-4">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask me anything..."
            className="flex-1 bg-[#111113] border border-[#252529] rounded-lg px-4 py-2 text-sm outline-none focus:border-[#f59e0b]"
          />
          <button onClick={send} className="bg-[#f59e0b] text-[#0a0a0b] px-4 py-2 rounded-lg font-semibold">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}`),
    ],
  },
  {
    id: 'tpl-4',
    slug: 'telegram-bot',
    name: 'Telegram Bot',
    nameRo: 'Bot Telegram',
    description: 'A Telegram bot with commands, inline keyboards, and state management.',
    descriptionRo: 'Un bot Telegram cu comenzi, inline keyboards si management de stare.',
    icon: '📱',
    color: '#06b6d4',
    techStack: ['TypeScript', 'grammY', 'Node.js'],
    category: 'bot',
    files: [
      f('t4-1', 'bot.ts', 'typescript', `import { Bot, Context, session, SessionFlavor } from 'grammy'

interface SessionData {
  step: 'idle' | 'awaiting_name' | 'awaiting_idea'
}

type MyContext = Context & SessionFlavor<SessionData>

const bot = new Bot<MyContext>(process.env.BOT_TOKEN || '')

bot.use(session({ initial: () => ({ step: 'idle' }) }))

bot.command('start', async (ctx) => {
  await ctx.reply('Welcome to Forge Bot! 🔥\\n\\nUse /idea to share your project idea.')
})

bot.command('idea', async (ctx) => {
  ctx.session.step = 'awaiting_idea'
  await ctx.reply('Tell me about your project idea. What do you want to build?')
})

bot.on('message', async (ctx) => {
  if (ctx.session.step === 'awaiting_idea') {
    const idea = ctx.message.text
    await ctx.reply(\`Great idea: "\${idea}"\\n\\nHere's what I suggest:\\n1. Start with an MVP\\n2. Use Next.js + Tailwind\\n3. Deploy to Vercel\\n\\nUse /help for more commands.\`)
    ctx.session.step = 'idle'
  }
})

bot.command('help', async (ctx) => {
  await ctx.reply('Commands:\\n/start - Start the bot\\n/idea - Share your idea\\n/help - Show this help')
})

console.log('Bot starting...')
bot.start()`),
    ],
  },
  {
    id: 'tpl-5',
    slug: 'automation-tool',
    name: 'Automation Tool',
    nameRo: 'Unealta de Automatizare',
    description: 'A workflow automation tool with triggers and actions.',
    descriptionRo: 'O unealta de automatizare cu triggeri si actiuni.',
    icon: '⚡',
    color: '#f97316',
    techStack: ['TypeScript', 'Node.js', 'Cron', 'APIs'],
    category: 'automation',
    files: [
      f('t5-1', 'automation.ts', 'typescript', `// Forge Automation Tool
// Define triggers and actions

interface Trigger {
  type: 'schedule' | 'webhook' | 'event'
  config: Record<string, any>
}

interface Action {
  type: 'http' | 'email' | 'file' | 'notify'
  config: Record<string, any>
}

interface Workflow {
  name: string
  trigger: Trigger
  actions: Action[]
}

const workflows: Workflow[] = [
  {
    name: 'Daily Report',
    trigger: { type: 'schedule', config: { cron: '0 9 * * *' } },
    actions: [
      { type: 'http', config: { url: 'https://api.example.com/data', method: 'GET' } },
      { type: 'file', config: { path: './reports/daily.txt', content: 'report_data' } },
      { type: 'notify', config: { message: 'Daily report generated!' } },
    ],
  },
]

console.log(\`Loaded \${workflows.length} workflows\`)
workflows.forEach(w => console.log(\`- \${w.name}: \${w.trigger.type}\`))`),
    ],
  },
  {
    id: 'tpl-6',
    slug: 'web3-dashboard',
    name: 'Web3 Dashboard',
    nameRo: 'Dashboard Web3',
    description: 'A Web3 dashboard for tracking wallets, tokens, and DeFi positions.',
    descriptionRo: 'Un dashboard Web3 pentru urmarire portofele, tokeni si pozitii DeFi.',
    icon: '⛓️',
    color: '#8b5cf6',
    techStack: ['Next.js', 'TypeScript', 'wagmi', 'viem', 'Tailwind'],
    category: 'web3',
    files: [
      f('t6-1', 'app/page.tsx', 'tsx', `export default function Web3Dashboard() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-[#e2e2e7] p-6">
      <h1 className="text-2xl font-bold mb-6">Web3 Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111113] border border-[#252529] rounded-xl p-4">
          <h3 className="text-[#6b6b73] text-sm mb-1">Total Balance</h3>
          <p className="text-2xl font-bold">$0.00</p>
        </div>
        <div className="bg-[#111113] border border-[#252529] rounded-xl p-4">
          <h3 className="text-[#6b6b73] text-sm mb-1">Tokens</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-[#111113] border border-[#252529] rounded-xl p-4">
          <h3 className="text-[#6b6b73] text-sm mb-1">NFTs</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>
      <div className="mt-6 bg-[#111113] border border-[#252529] rounded-xl p-4">
        <h3 className="font-semibold mb-4">Recent Transactions</h3>
        <p className="text-[#6b6b73] text-sm">Connect your wallet to see transactions.</p>
      </div>
    </main>
  )
}`),
    ],
  },
  {
    id: 'tpl-7',
    slug: 'course-platform',
    name: 'Course Platform',
    nameRo: 'Platforma de Cursuri',
    description: 'A mini course platform with lessons, progress tracking, and quizzes.',
    descriptionRo: 'O mini platforma de cursuri cu lectii, urmarire progres si quiz-uri.',
    icon: '🎓',
    color: '#10b981',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind'],
    category: 'web',
    files: [
      f('t7-1', 'app/page.tsx', 'tsx', `export default function CoursePlatform() {
  const courses = [
    { title: 'AI Builder Foundations', lessons: 12, progress: 0 },
    { title: 'Prompt Engineering', lessons: 10, progress: 0 },
    { title: 'Building SaaS with AI', lessons: 20, progress: 0 },
  ]

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-[#e2e2e7] p-6">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>
      <div className="space-y-4">
        {courses.map((c, i) => (
          <div key={i} className="bg-[#111113] border border-[#252529] rounded-xl p-4">
            <h3 className="font-semibold">{c.title}</h3>
            <p className="text-[#6b6b73] text-sm mt-1">{c.lessons} lessons</p>
            <div className="mt-3 h-2 bg-[#252529] rounded-full overflow-hidden">
              <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: \`\${c.progress}%\` }} />
            </div>
            <p className="text-xs text-[#6b6b73] mt-1">{c.progress}% complete</p>
          </div>
        ))}
      </div>
    </main>
  )
}`),
    ],
  },
  {
    id: 'tpl-8',
    slug: 'mobile-app',
    name: 'Mobile App (React Native)',
    nameRo: 'Aplicatie Mobil (React Native)',
    description: 'A React Native mobile app starter with navigation and state management.',
    descriptionRo: 'Un starter aplicatie mobil React Native cu navigare si management de stare.',
    icon: '📱',
    color: '#ec4899',
    techStack: ['React Native', 'TypeScript', 'Expo', 'React Navigation'],
    category: 'mobile',
    files: [
      f('t8-1', 'App.tsx', 'tsx', `import { View, Text, StyleSheet, ScrollView } from 'react-native'

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Mobile App</Text>
        <Text style={styles.subtitle}>Built with Forge</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Welcome!</Text>
        <Text style={styles.cardText}>
          Your React Native app is ready. Start building features!
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0b' },
  header: { padding: 24, paddingTop: 60, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#e2e2e7' },
  subtitle: { fontSize: 16, color: '#6b6b73', marginTop: 8 },
  card: { margin: 16, padding: 20, backgroundColor: '#111113', borderRadius: 12, borderWidth: 1, borderColor: '#252529' },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#e2e2e7', marginBottom: 8 },
  cardText: { fontSize: 14, color: '#6b6b73', lineHeight: 20 },
})`),
    ],
  },
  {
    id: 'tpl-9',
    slug: 'api-backend',
    name: 'API Backend',
    nameRo: 'Backend API',
    description: 'A REST API with Express, Prisma, and PostgreSQL.',
    descriptionRo: 'Un REST API cu Express, Prisma si PostgreSQL.',
    icon: '🔌',
    color: '#22c55e',
    techStack: ['Express', 'TypeScript', 'Prisma', 'PostgreSQL'],
    category: 'backend',
    files: [
      f('t9-1', 'src/index.ts', 'typescript', `import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Example CRUD routes
app.get('/api/items', async (req, res) => {
  const items = await prisma.item.findMany()
  res.json(items)
})

app.post('/api/items', async (req, res) => {
  const { name, description } = req.body
  const item = await prisma.item.create({ data: { name, description } })
  res.status(201).json(item)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(\`API running on port \${PORT}\`)
})`),
    ],
  },
  {
    id: 'tpl-10',
    slug: 'agent-workflow',
    name: 'Agent Workflow',
    nameRo: 'Workflow Agent',
    description: 'A multi-agent workflow system with task delegation and monitoring.',
    descriptionRo: 'Un sistem de workflow multi-agent cu delegare si monitorizare.',
    icon: '🔄',
    color: '#f59e0b',
    techStack: ['TypeScript', 'Node.js', 'OpenRouter', 'Agent Pattern'],
    category: 'ai',
    files: [
      f('t10-1', 'agents/orchestrator.ts', 'typescript', `// Forge Agent Orchestrator
// Coordinates multiple AI agents for complex tasks

interface Agent {
  id: string
  name: string
  role: string
  systemPrompt: string
}

interface Task {
  id: string
  description: string
  assignedAgent: string
  status: 'pending' | 'in_progress' | 'completed' | 'failed'
  result?: string
}

const agents: Agent[] = [
  { id: 'researcher', name: 'Researcher', role: 'Research and analysis', systemPrompt: 'You are a research agent. Investigate topics thoroughly.' },
  { id: 'builder', name: 'Builder', role: 'Code and implementation', systemPrompt: 'You are a builder agent. Write clean, working code.' },
  { id: 'reviewer', name: 'Reviewer', role: 'Quality assurance', systemPrompt: 'You are a QA agent. Review code for bugs and best practices.' },
]

class Orchestrator {
  private tasks: Task[] = []

  createTask(description: string, agentId: string): Task {
    const task: Task = {
      id: \`task-\${Date.now()}\`,
      description,
      assignedAgent: agentId,
      status: 'pending',
    }
    this.tasks.push(task)
    return task
  }

  getTasks(): Task[] {
    return this.tasks
  }

  getAgent(id: string): Agent | undefined {
    return agents.find(a => a.id === id)
  }
}

export const orchestrator = new Orchestrator()
console.log('Agent Orchestrator initialized')`),
    ],
  },
]

export function getTemplate(slug: string): Template | undefined {
  return TEMPLATES.find(t => t.slug === slug)
}

export function getTemplatesByCategory(category: string): Template[] {
  return TEMPLATES.filter(t => t.category === category)
}
