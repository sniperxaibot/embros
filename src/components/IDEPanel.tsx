// EmbrOS - Full IDE Panel Component
// Monaco editor, file tree, AI chat, live preview, tab management
// Mobile-first responsive design

'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import Editor from '@monaco-editor/react'
import {
  Flame, Send, Loader2, X, ChevronRight, ChevronDown, Plus, Trash2,
  FolderOpen, Folder, FileCode, FileText, Globe, MessageSquare, BookOpen,
  Terminal, Zap, Bot, Menu, ArrowLeft, Settings, Play, Copy, Check, Code2
} from 'lucide-react'
import type { FileNode, BottomTab, ChatMessage } from '../types/index'

// Language detection from filename
const LANG_MAP: Record<string, string> = {
  js: 'javascript', jsx: 'javascript', ts: 'typescript', tsx: 'typescript',
  py: 'python', html: 'html', css: 'css', json: 'json', md: 'markdown',
  sql: 'sql', yaml: 'yaml', yml: 'yaml', sh: 'shell', bash: 'shell',
  rs: 'rust', go: 'go', rb: 'ruby', php: 'php', java: 'java', cpp: 'cpp',
  c: 'c', swift: 'swift', kt: 'kotlin', vue: 'html', svelte: 'html',
}

function detectLang(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  return LANG_MAP[ext] || 'plaintext'
}

// File icon based on type
function FileIcon({ name, className }: { name: string; className?: string }) {
  const ext = name.split('.').pop()?.toLowerCase()
  const color = ext === 'ts' || ext === 'tsx' ? '#3b82f6' :
    ext === 'js' || ext === 'jsx' ? '#eab308' :
    ext === 'css' ? '#ec4899' :
    ext === 'html' ? '#f97316' :
    ext === 'json' ? '#22c55e' :
    ext === 'md' ? '#94949c' :
    ext === 'py' ? '#3b82f6' :
    '#6b6b73'
  return <FileCode className={className || "w-3.5 h-3.5"} style={{ color }} />
}

// Starter project templates
function makeTemplateFiles(template: string): FileNode[] {
  if (template === 'Blank Project') {
    return [{ id: '1', name: 'README.md', type: 'file', language: 'markdown', content: '# My Project\n\nBuilt with EmbrOS.\n' }]
  }
  if (template === 'Landing Page') {
    return [
      { id: '1', name: 'index.html', type: 'file', language: 'html', content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Landing Page</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav>
    <div class="logo">⚡ MyBrand</div>
    <div class="links">
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
      <a href="#contact">Contact</a>
    </div>
  </nav>
  <section class="hero">
    <h1>Build Something<br><span class="accent">Amazing</span></h1>
    <p>Your journey to building great products starts here.</p>
    <button class="cta">Get Started Free</button>
  </section>
  <section id="features" class="features">
    <h2>Why Choose Us</h2>
    <div class="grid">
      <div class="card"><h3>🚀 Fast</h3><p>Ship in weeks, not months.</p></div>
      <div class="card"><h3>🎯 Focused</h3><p>Learn only what you need.</p></div>
      <div class="card"><h3>🤖 AI-Powered</h3><p>AI mentor guides you.</p></div>
    </div>
  </section>
  <footer><p>Built with ⚡ EmbrOS</p></footer>
  <script src="script.js"></script>
</body>
</html>` },
      { id: '2', name: 'style.css', type: 'file', language: 'css', content: `* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #0a0a0b; color: #e2e2e7; line-height: 1.6; }
nav { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 4rem; border-bottom: 1px solid #252529; }
.logo { font-size: 1.25rem; font-weight: 700; }
.links a { color: #94949c; text-decoration: none; margin-left: 2rem; font-size: 0.9rem; }
.links a:hover { color: #f59e0b; }
.hero { text-align: center; padding: 8rem 2rem; max-width: 700px; margin: 0 auto; }
.hero h1 { font-size: 4rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; }
.accent { color: #f59e0b; }
.hero p { font-size: 1.2rem; color: #6b6b73; margin-bottom: 2rem; }
.cta { background: #f59e0b; color: #0a0a0b; border: none; padding: 1rem 2.5rem; font-size: 1rem; font-weight: 600; border-radius: 0.5rem; cursor: pointer; }
.cta:hover { background: #fbbf24; }
.features { padding: 4rem; max-width: 1000px; margin: 0 auto; }
.features h2 { text-align: center; font-size: 2rem; margin-bottom: 3rem; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.card { background: #111113; border: 1px solid #252529; border-radius: 1rem; padding: 2rem; text-align: center; }
.card h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
.card p { color: #6b6b73; }
footer { text-align: center; padding: 2rem; border-top: 1px solid #252529; color: #45454c; font-size: 0.85rem; }
@media (max-width: 768px) { .grid { grid-template-columns: 1fr; } .hero h1 { font-size: 2.5rem; } nav { padding: 1rem 1.5rem; } }` },
      { id: '3', name: 'script.js', type: 'file', language: 'javascript', content: `console.log('Landing page loaded!');
document.querySelectorAll('.links a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) { e.preventDefault(); document.querySelector(href).scrollIntoView({ behavior: 'smooth' }); }
  });
});` },
    ]
  }
  if (template === 'SaaS Application') {
    return [
      { id: '1', name: 'README.md', type: 'file', language: 'markdown', content: '# SaaS Application\n\nFull-stack SaaS app built with EmbrOS.\n\n## Tech Stack\n- Next.js 14 (App Router)\n- TypeScript\n- Tailwind CSS\n- Prisma\n- Stripe\n\n## Getting Started\n1. Copy `.env.example` to `.env`\n2. Run `npm install`\n3. Run `npm run dev`\n' },
      { id: '2', name: 'package.json', type: 'file', language: 'json', content: `{
  "name": "saas-app",
  "version": "0.1.0",
  "scripts": { "dev": "next dev", "build": "next build" },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "@prisma/client": "^5.14.0",
    "stripe": "^15.0.0"
  }
}` },
      { id: '3', name: 'app/page.tsx', type: 'file', language: 'tsx', content: `export default function Home() {
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
}` },
      { id: '4', name: 'app/globals.css', type: 'file', language: 'css', content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root { --bg: #0a0a0b; --fg: #e2e2e7; --accent: #f59e0b; }
body { background: var(--bg); color: var(--fg); }` },
      { id: '5', name: '.env.example', type: 'file', language: 'plaintext', content: `DATABASE_URL="postgresql://user:pass@localhost:5432/mydb"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."` },
    ]
  }
  // Default template
  return [
    { id: '1', name: 'index.html', type: 'file', language: 'html', content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Project</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello from EmbrOS 🔥</h1>
  <p>Start building your project.</p>
  <script src="script.js"></script>
</body>
</html>` },
    { id: '2', name: 'style.css', type: 'file', language: 'css', content: `body { font-family: system-ui; background: #0a0a0b; color: #e2e2e7; padding: 2rem; }
h1 { color: #f59e0b; }` },
    { id: '3', name: 'script.js', type: 'file', language: 'javascript', content: `console.log('Project loaded!');` },
  ]
}

// OpenRouter AI call
const OPENROUTER_API = 'https://openrouter.ai/api/v1/chat/completions'
const MODELS = ['google/gemini-2.0-flash-001', 'openrouter/auto']
let _mi = 0
function pickModel() { return MODELS[_mi++ % MODELS.length] }

async function askAI(messages: { role: string; content: string }[], apiKey: string): Promise<string> {
  if (!apiKey) {
    // Mock response for development
    const lastMsg = messages[messages.length - 1]?.content?.toLowerCase() || ''
    if (lastMsg.includes('create') || lastMsg.includes('build') || lastMsg.includes('make')) {
      return `I'll help you build that! Here's a starting point:

\`\`\`json
{"files": [{"name": "component.tsx", "content": "export default function MyComponent() {\\n  return <div>Hello from EmbrOS!</div>\\n}"}]}
\`\`\`

What would you like me to create?`
    }
    return `I'm your AI mentor. I can help you:

- **Build features** - Describe what you want, I'll create the code
- **Fix bugs** - Share the error, I'll find the solution
- **Explain code** - Ask about any file, I'll break it down
- **Plan projects** - Tell me your idea, I'll create a roadmap

What do you want to work on?`
  }

  const r = await fetch(OPENROUTER_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}`, 'HTTP-Referer': typeof location !== 'undefined' ? location.origin : 'http://localhost:3000', 'X-Title': 'EmbrOS' },
    body: JSON.stringify({ model: pickModel(), messages, temperature: 0.7, max_tokens: 4096 }),
  })
  if (!r.ok) throw new Error(`API ${r.status}`)
  return (await r.json()).choices[0].message.content ?? ''
}

// ═══════════════════════════════════════════════════
// IDE COMPONENT
// ═══════════════════════════════════════════════════

interface IDEPanelProps {
  initialFiles?: FileNode[]
  projectName?: string
  onBack?: () => void
}

export default function IDEPanel({ initialFiles, projectName = 'My Project', onBack }: IDEPanelProps) {
  const [files, setFiles] = useState<FileNode[]>(initialFiles || makeTemplateFiles('Blank Project'))
  const [openTabs, setOpenTabs] = useState<string[]>([initialFiles?.[0]?.id || ''])
  const [activeId, setActiveId] = useState<string>(initialFiles?.[0]?.id || '')
  const [bottomTab, setBottomTab] = useState<BottomTab>('chat')
  const [bottomPanelH, setBottomPanelH] = useState(200)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'system', content: '🔥 AI Mentor ready. Ask me to build features, explain code, or fix bugs.', timestamp: new Date().toISOString() }
  ])
  const [chatIn, setChatIn] = useState('')
  const [busy, setBusy] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [projName, setProjName] = useState(projectName)
  const chatRef = useRef<HTMLDivElement>(null)
  const bottomPanelRef = useRef<HTMLDivElement>(null)
  const apiKey = typeof process !== 'undefined' ? (process as any).env?.NEXT_PUBLIC_OPENROUTER_API_KEY || '' : ''

  // Find file by id
  const findFile = useCallback((nodes: FileNode[], id: string): FileNode | null => {
    for (const n of nodes) {
      if (n.id === id) return n
      if (n.children) { const f = findFile(n.children, id); if (f) return f }
    }
    return null
  }, [])

  const curFile = activeId ? findFile(files, activeId) : null

  // Update file content
  const updateContent = useCallback((id: string, content: string) => {
    const update = (ns: FileNode[]): FileNode[] =>
      ns.map(n => n.id === id ? { ...n, content } : n.children ? { ...n, children: update(n.children) } : n)
    setFiles(f => update(f))
  }, [])

  // Open file in tab
  const openFile = useCallback((id: string) => {
    setOpenTabs(t => t.includes(id) ? t : [...t, id])
    setActiveId(id)
    setSidebarOpen(false)
  }, [])

  // Close tab
  const closeTab = useCallback((id: string) => {
    setOpenTabs(prev => {
      const next = prev.filter(x => x !== id)
      if (activeId === id) setActiveId(next[next.length - 1] || '')
      return next
    })
  }, [activeId])

  // Create new file
  const createFile = useCallback(() => {
    const name = prompt('File name:')
    if (!name) return
    const node: FileNode = { id: 'f-' + Date.now(), name, type: 'file', language: detectLang(name), content: '' }
    setFiles(fs => [...fs, node])
    openFile(node.id)
  }, [openFile])

  // Delete file
  const deleteFile = useCallback((id: string) => {
    if (!confirm('Delete this file?')) return
    const rm = (ns: FileNode[]): FileNode[] =>
      ns.filter(n => n.id !== id).map(n => n.children ? { ...n, children: rm(n.children) } : n)
    setFiles(fs => rm(fs))
    setOpenTabs(t => {
      const next = t.filter(x => x !== id)
      if (activeId === id) setActiveId(next[next.length - 1] || '')
      return next
    })
  }, [activeId])

  // Send chat message
  const sendChat = useCallback(async () => {
    if (!chatIn.trim() || busy) return
    const msg = chatIn.trim()
    setChatIn('')
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: msg, timestamp: new Date().toISOString() }
    setMessages(m => [...m, userMsg])
    setBusy(true)
    setError(null)
    try {
      const fileList = files.map(f => `${f.type === 'folder' ? '📁' : '📄'} ${f.name}`).join('\n')
      const cur = curFile ? `Currently editing: **${curFile.name}**\n\`\`\`${curFile.language}\n${curFile.content}\n\`\`\`` : ''
      const sysMsg = `You are EmbrOS AI, a coding mentor and builder. Project: "${projName}".\n\nProject files:\n${fileList}\n\n${cur}\n\nHelp the user build their project. Be concise. Use markdown. To create or modify files, respond with: {"files":[{"name":"path/file.ext","content":"..."}]}`

      const reply = await askAI([
        { role: 'system', content: sysMsg },
        ...messages.slice(-15).map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content })),
        { role: 'user', content: msg },
      ], apiKey)

      // Check for file creation JSON
      const jsonMatch = reply.match(/\{[\s\S]*"files"[\s\S]*\}/)
      if (jsonMatch) {
        try {
          const action = JSON.parse(jsonMatch[0])
          if (action.files?.length) {
            const newFiles = action.files.map((f: any) => ({
              id: 'f-' + Date.now() + Math.random().toString(36).slice(2),
              name: f.name.split('/').pop(),
              type: 'file' as const,
              language: detectLang(f.name),
              content: f.content || '',
            }))
            setFiles(fs => [...fs, ...newFiles])
            newFiles.forEach((f: FileNode) => openFile(f.id))
            const assistantMsg: ChatMessage = {
              id: (Date.now() + 1).toString(), role: 'assistant',
              content: `Created ${action.files.length} file(s):\n${action.files.map((f: any) => `- \`${f.name}\``).join('\n')}\n\n${reply.replace(jsonMatch[0], '').trim()}`,
              timestamp: new Date().toISOString()
            }
            setMessages(m => [...m, assistantMsg])
          } else {
            const assistantMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: reply, timestamp: new Date().toISOString() }
            setMessages(m => [...m, assistantMsg])
          }
        } catch {
          const assistantMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: reply, timestamp: new Date().toISOString() }
          setMessages(m => [...m, assistantMsg])
        }
      } else {
        const assistantMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: reply, timestamp: new Date().toISOString() }
        setMessages(m => [...m, assistantMsg])
      }
    } catch (e: any) {
      setError(e.message)
      const errMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'system', content: `Error: ${e.message}`, timestamp: new Date().toISOString() }
      setMessages(m => [...m, errMsg])
    }
    setBusy(false)
  }, [chatIn, busy, curFile, files, messages, projName, apiKey, openFile])

  // Auto-scroll chat
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  // Compute preview HTML
  const previewHTML = useMemo(() => {
    const read = (ns: FileNode[], name: string): string | null => {
      for (const n of ns) { if (n.name === name) return n.content || null; if (n.children) { const r = read(n.children, name); if (r !== null) return r } }
      return null
    }
    const html = read(files, 'index.html') || '<!DOCTYPE html><html><body style="background:#0a0a0b;color:#e2e2e7;display:flex;align-items:center;justify-content:center;height:100vh;font-family:system-ui"><div style="text-align:center"><h1>No index.html</h1><p>Create an index.html file to see a preview.</p></div></body></html>'
    const css = read(files, 'style.css') || read(files, 'styles.css') || ''
    const js = read(files, 'script.js') || read(files, 'main.js') || ''
    return html.replace('</head>', `<style>${css}</style></head>`).replace('</body>', `<script defer>${js}<\/script></body>`)
  }, [files])

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0b] text-[#e2e2e7] overflow-hidden">
      {/* ─── Top Bar ─── */}
      <header className="h-10 border-b border-[#252529] flex items-center px-2 sm:px-3 gap-2 bg-[#111113] shrink-0">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded hover:bg-[#1a1a1e] lg:hidden"><Menu className="w-4 h-4" /></button>
        {onBack && <button onClick={onBack} className="p-1.5 rounded hover:bg-[#1a1a1e] hidden lg:block"><ArrowLeft className="w-4 h-4" /></button>}
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded bg-[#f59e0b] flex items-center justify-center"><Flame className="w-3 h-3 text-[#0a0a0b]" /></div>
          <span className="text-sm font-semibold hidden sm:inline">embrOS</span>
        </div>
        <div className="h-4 w-px bg-[#252529] hidden sm:block" />
        <input value={projName} onChange={e => setProjName(e.target.value)} className="bg-transparent border-none outline-none text-sm text-[#94949c] w-24 sm:w-40 hidden sm:block" />
        <div className="flex-1" />
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f59e0b]/15 text-[#f59e0b]">{files.length} files</span>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* ─── Mobile Sidebar Overlay ─── */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
            <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#111113] border-r border-[#252529] overflow-y-auto z-10">
              <div className="flex items-center justify-between px-3 py-2 border-b border-[#252529]">
                <span className="text-xs font-semibold text-[#6b6b73]">Files</span>
                <div className="flex items-center gap-1">
                  <button onClick={createFile} className="p-1 hover:bg-[#1a1a1e] rounded"><Plus className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-[#1a1a1e] rounded"><X className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <FileTreeView files={files} selectedId={activeId} onSelect={openFile} onDelete={deleteFile} depth={0} />
            </aside>
          </div>
        )}

        {/* ─── Desktop Sidebar ─── */}
        <aside className="hidden lg:flex w-52 border-r border-[#252529] bg-[#111113] overflow-y-auto shrink-0 flex-col">
          <div className="flex items-center justify-between px-3 py-2 text-[10px] text-[#6b6b73] uppercase tracking-wider font-semibold shrink-0">
            <span>Files</span>
            <button onClick={createFile} className="p-1 hover:bg-[#1a1a1e] rounded"><Plus className="w-3.5 h-3.5" /></button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <FileTreeView files={files} selectedId={activeId} onSelect={openFile} onDelete={deleteFile} depth={0} />
          </div>
        </aside>

        {/* ─── Main Editor Area ─── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Tabs */}
          <div className="h-8 border-b border-[#252529] flex items-center bg-[#111113] overflow-x-auto shrink-0">
            {openTabs.map(id => {
              const f = findFile(files, id)
              if (!f) return null
              const isActive = id === activeId
              return (
                <div key={id}
                  className={`flex items-center gap-1 px-2 sm:px-3 h-full text-xs cursor-pointer border-r border-[#252529] shrink-0 group transition-colors ${isActive ? 'bg-[#0a0a0b] text-[#e2e2e7] border-t-2 border-t-[#f59e0b]' : 'text-[#6b6b73] hover:bg-[#1a1a1e]'}`}
                  onClick={() => setActiveId(id)}>
                  <FileIcon name={f.name} className="w-3 h-3 shrink-0" />
                  <span className="max-w-[60px] sm:max-w-[100px] truncate">{f.name}</span>
                  <button onClick={e => { e.stopPropagation(); closeTab(id) }} className="p-0.5 rounded hover:bg-[#252529] opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-2.5 h-2.5" /></button>
                </div>
              )
            })}
            <button onClick={createFile} className="px-2 h-full hover:bg-[#1a1a1e] text-[#45454c] shrink-0"><Plus className="w-3 h-3" /></button>
          </div>

          {/* Error bar */}
          {error && (
            <div className="bg-[#ef4444]/10 border-b border-[#ef4444]/30 px-3 py-1.5 text-xs text-[#ef4444] flex items-center gap-2 shrink-0">
              <Zap className="w-3 h-3 shrink-0" /><span className="truncate">{error}</span>
              <button onClick={() => setError(null)} className="ml-auto shrink-0"><X className="w-3 h-3" /></button>
            </div>
          )}

          {/* Editor + Bottom Panel */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Editor */}
            <div className="flex-1 min-h-0">
              {curFile ? (
                <Editor
                  height="100%"
                  language={curFile.language || 'plaintext'}
                  value={curFile.content || ''}
                  onChange={v => updateContent(curFile.id, v || '')}
                  theme="vs-dark"
                  options={{
                    fontSize: 13,
                    fontFamily: 'JetBrains Mono, Fira Code, monospace',
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: 'on',
                    lineNumbers: 'on',
                    renderLineHighlight: 'gutter',
                    smoothScrolling: true,
                    padding: { top: 12, bottom: 12 },
                    roundedSelection: true,
                    cursorBlinking: 'smooth',
                    cursorSmoothCaretAnimation: 'on',
                    renderWhitespace: 'selection',
                    bracketPairColorization: { enabled: true },
                  }}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-[#45454c]">
                  <div className="text-center">
                    <Code2 className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="text-sm">Select a file to edit</p>
                    <p className="text-xs mt-1">or ask the AI to create one</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Panel */}
            <div ref={bottomPanelRef} className="border-t border-[#252529] shrink-0" style={{ height: bottomPanelH }}>
              {/* Bottom tabs */}
              <div className="h-7 flex items-center px-2 bg-[#111113] gap-0.5 shrink-0 overflow-x-auto">
                {([
                  { id: 'chat' as BottomTab, icon: <MessageSquare className="w-3 h-3" />, label: 'AI Chat' },
                  { id: 'preview' as BottomTab, icon: <Globe className="w-3 h-3" />, label: 'Preview' },
                  { id: 'learning' as BottomTab, icon: <BookOpen className="w-3 h-3" />, label: 'Learn' },
                  { id: 'terminal' as BottomTab, icon: <Terminal className="w-3 h-3" />, label: 'Terminal' },
                ]).map(t => (
                  <button key={t.id} onClick={() => setBottomTab(t.id)}
                    className={`flex items-center gap-1 px-2 py-1 text-[11px] rounded transition-colors shrink-0 ${bottomTab === t.id ? 'bg-[#0a0a0b] text-[#e2e2e7] border-t border-t-[#f59e0b]' : 'text-[#6b6b73] hover:text-[#e2e2e7]'}`}>
                    {t.icon} <span className="hidden sm:inline">{t.label}</span>
                  </button>
                ))}
                <div className="flex-1" />
                <button onClick={() => setBottomPanelH(bottomPanelH === 60 ? 200 : 60)} className="p-1 hover:bg-[#1a1a1e] rounded text-[#45454c]">
                  {bottomPanelH === 60 ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Bottom content */}
              <div className="h-[calc(100%-28px)] overflow-hidden">
                {bottomTab === 'chat' && (
                  <div className="h-full flex flex-col">
                    <div ref={chatRef} className="flex-1 overflow-y-auto px-2 sm:px-3 py-2 space-y-2">
                      {messages.map(m => (
                        <div key={m.id} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : ''}`}>
                          {m.role !== 'user' && (
                            <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5 ${m.role === 'system' ? 'bg-[#1a1a1e]' : 'bg-[#f59e0b]/20'}`}>
                              {m.role === 'system' ? <Zap className="w-3 h-3 text-[#6b6b73]" /> : <Bot className="w-3 h-3 text-[#f59e0b]" />}
                            </div>
                          )}
                          <div className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                            m.role === 'user' ? 'bg-[#f59e0b] text-[#0a0a0b]' :
                            m.role === 'system' ? 'bg-[#1a1a1e] text-[#6b6b73]' :
                            'bg-[#111113] border border-[#252529]'
                          }`}>
                            {m.content.split('**').map((p, i) => i % 2 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>)}
                          </div>
                        </div>
                      ))}
                      {busy && (
                        <div className="flex gap-2">
                          <div className="w-6 h-6 rounded bg-[#f59e0b]/20 flex items-center justify-center shrink-0"><Bot className="w-3 h-3 text-[#f59e0b]" /></div>
                          <div className="bg-[#111113] border border-[#252529] rounded-lg px-3 py-2"><Loader2 className="w-3 h-3 text-[#f59e0b] animate-spin" /></div>
                        </div>
                      )}
                    </div>
                    <div className="p-2 border-t border-[#252529] shrink-0">
                      <div className="flex items-center gap-2 border border-[#252529] rounded-lg bg-[#111113] px-2 sm:px-3">
                        <input type="text" placeholder="Ask AI to build, fix, or explain..." value={chatIn}
                          onChange={e => setChatIn(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendChat()}
                          className="flex-1 bg-transparent border-none outline-none text-xs py-2.5 placeholder:text-[#45454c]" disabled={busy} />
                        <button onClick={sendChat} disabled={!chatIn.trim() || busy}
                          className="p-1.5 rounded bg-[#f59e0b] text-[#0a0a0b] disabled:opacity-30 hover:bg-[#fbbf24] transition-colors">
                          <Send className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {bottomTab === 'preview' && (
                  <iframe srcDoc={previewHTML} className="w-full h-full border-0 bg-white" title="Preview" sandbox="allow-scripts allow-modals" />
                )}
                {bottomTab === 'learning' && (
                  <div className="h-full overflow-y-auto p-3 sm:p-4">
                    <h3 className="text-xs font-semibold mb-3 flex items-center gap-2"><BookOpen className="w-3.5 h-3.5 text-[#f59e0b]" /> Learning: {projName}</h3>
                    <div className="space-y-2">
                      {['Explore the file structure', 'Read the HTML markup', 'Understand the CSS styles', 'Add JavaScript interactivity', 'Ask AI for new features', 'Preview your changes', 'Deploy your project'].map((s, i) => (
                        <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg border border-[#252529] hover:bg-[#111113] cursor-pointer text-xs transition-colors">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${i === 0 ? 'bg-[#f59e0b] text-[#0a0a0b]' : 'bg-[#1a1a1e] text-[#6b6b73]'}`}>{i + 1}</div>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {bottomTab === 'terminal' && (
                  <div className="h-full bg-[#0a0a0b] p-3 font-mono text-xs text-[#94949c] overflow-y-auto">
                    <p className="text-[#f59e0b] mb-1">🔥 EmbrOS Terminal v0.2.0</p>
                    <p className="text-[#45454c] mb-3">Use the AI chat to run commands. Try: &quot;Install npm packages&quot; or &quot;Run dev server&quot;</p>
                    <p className="text-[#45454c] mb-1">Project: {projName}</p>
                    <p className="text-[#45454c] mb-1">Files: {files.length}</p>
                    <p className="text-[#45454c] mb-3">Template: {files[0]?.name || 'Unknown'}</p>
                    <div className="flex items-center gap-1"><span className="text-[#f59e0b]">❯</span><span className="animate-pulse">_</span></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// FILE TREE COMPONENT
// ═══════════════════════════════════════════════════

function FileTreeView({ files, selectedId, onSelect, onDelete, depth }: {
  files: FileNode[]
  selectedId: string | null
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  depth: number
}) {
  return (
    <div>
      {files.map(node => (
        <FileTreeNode key={node.id} node={node} depth={depth} selectedId={selectedId} onSelect={onSelect} onDelete={onDelete} />
      ))}
    </div>
  )
}

function FileTreeNode({ node, depth, selectedId, onSelect, onDelete }: {
  node: FileNode
  depth: number
  selectedId: string | null
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}) {
  const isFolder = node.type === 'folder'
  const isSelected = node.id === selectedId
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div>
      <div
        className={`flex items-center gap-1.5 py-1 px-2 cursor-pointer group text-xs transition-colors ${isSelected ? 'bg-[#f59e0b]/15 text-[#f59e0b]' : 'hover:bg-[#1a1a1e] text-[#94949c]'}`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={() => isFolder ? setIsOpen(!isOpen) : onSelect(node.id)}
      >
        {isFolder ? (
          <>
            {isOpen ? <ChevronDown className="w-3 h-3 shrink-0" /> : <ChevronRight className="w-3 h-3 shrink-0" />}
            <Folder className="w-3.5 h-3.5 shrink-0 text-[#f59e0b]" />
          </>
        ) : (
          <>
            <span className="w-3 shrink-0" />
            <FileIcon name={node.name} />
          </>
        )}
        <span className="truncate flex-1">{node.name}</span>
        {!isFolder && (
          <button onClick={e => { e.stopPropagation(); onDelete(node.id) }}
            className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-[#252529] rounded transition-opacity">
            <Trash2 className="w-2.5 h-2.5" />
          </button>
        )}
      </div>
      {isFolder && isOpen && node.children?.map(c => (
        <FileTreeNode key={c.id} node={c} depth={depth + 1} selectedId={selectedId} onSelect={onSelect} onDelete={onDelete} />
      ))}
    </div>
  )
}
