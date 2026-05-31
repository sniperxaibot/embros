// FORGE — Project IDE Page
// Full IDE with file tree, Monaco editor, AI chat panel, and tab management.
// Protected by middleware.

'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Editor from '@monaco-editor/react'
import {
  Flame, Send, Loader2, X, ChevronRight, ChevronDown, Plus, Trash2,
  FolderOpen, Folder, FileCode, MessageSquare,
  Bot, Menu, ArrowLeft, Code2
} from 'lucide-react'
import type { FileNode, ChatMessage } from '@/types/index'

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

interface ProjectData {
  id: string
  name: string
  description: string | null
  status: string
  files: FileNode[]
}

export default function ProjectIDEPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const [project, setProject] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)
  const [files, setFiles] = useState<FileNode[]>([])
  const [openTabs, setOpenTabs] = useState<string[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(true)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'system', content: 'AI Mentor ready. Ask me to build features, explain code, or fix bugs.', timestamp: new Date().toISOString() }
  ])
  const [chatIn, setChatIn] = useState('')
  const [busy, setBusy] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  // Fetch project data
  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch(`/api/projects/${projectId}`)
        if (res.status === 401) {
          router.push('/login')
          return
        }
        if (!res.ok) {
          router.push('/dashboard')
          return
        }
        const data = await res.json()
        setProject(data)

        // Parse files from project data
        const projectFiles: FileNode[] = Array.isArray(data.files) ? data.files : []
        if (projectFiles.length === 0) {
          // Default starter file
          const starter: FileNode = {
            id: 'f-1',
            name: 'README.md',
            type: 'file',
            language: 'markdown',
            content: `# ${data.name}\n\n${data.description || 'Built with Forge.'}\n`
          }
          projectFiles.push(starter)
        }
        setFiles(projectFiles)
        if (projectFiles.length > 0) {
          setOpenTabs([projectFiles[0].id])
          setActiveId(projectFiles[0].id)
        }
      } catch {
        router.push('/dashboard')
      } finally {
        setLoading(false)
      }
    }
    loadProject()
  }, [projectId, router])

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

    try {
      const res = await fetch(`/api/projects/${projectId}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msg,
          context: {
            currentFile: curFile?.name || null,
            fileContent: curFile?.content || null,
            fileList: files.map(f => f.name),
          },
        }),
      })

      if (!res.ok) {
        throw new Error(`Chat failed: ${res.status}`)
      }

      // Read streaming response
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let fullContent = ''
      const assistantId = (Date.now() + 1).toString()

      if (reader) {
        // Add placeholder message
        setMessages(m => [...m, { id: assistantId, role: 'assistant', content: '', timestamp: new Date().toISOString() }])

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          fullContent += chunk
          setMessages(m => m.map(msg => msg.id === assistantId ? { ...msg, content: fullContent } : msg))
        }
      }

      // Check for file creation JSON in the response
      const jsonMatch = fullContent.match(/\{[\s\S]*"files"[\s\S]*\}/)
      if (jsonMatch) {
        try {
          const action = JSON.parse(jsonMatch[0])
          if (action.files?.length) {
            const newFiles: FileNode[] = action.files.map((f: { name: string; content?: string }) => ({
              id: 'f-' + Date.now() + Math.random().toString(36).slice(2),
              name: f.name.split('/').pop() || f.name,
              type: 'file' as const,
              language: detectLang(f.name),
              content: f.content || '',
            }))
            setFiles(fs => [...fs, ...newFiles])
            newFiles.forEach((f) => openFile(f.id))
          }
        } catch {
          // JSON parse failed, ignore
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Chat error'
      const errMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'system', content: `Error: ${message}`, timestamp: new Date().toISOString() }
      setMessages(m => [...m, errMsg])
    }
    setBusy(false)
  }, [chatIn, busy, curFile, files, projectId, openFile])

  // Auto-scroll chat
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0a0a0b]">
        <Loader2 className="w-6 h-6 text-[#f59e0b] animate-spin" />
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0b] text-[#e2e2e7] overflow-hidden">
      {/* ─── Top Bar ─── */}
      <header className="h-10 border-b border-[#252529] flex items-center px-2 sm:px-3 gap-2 bg-[#111113] shrink-0">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded hover:bg-[#1a1a1e] lg:hidden">
          <Menu className="w-4 h-4" />
        </button>
        <button onClick={() => router.push('/dashboard')} className="p-1.5 rounded hover:bg-[#1a1a1e]">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded bg-[#f59e0b] flex items-center justify-center">
            <Flame className="w-3 h-3 text-[#0a0a0b]" />
          </div>
          <span className="text-sm font-semibold hidden sm:inline">forge</span>
        </div>
        <div className="h-4 w-px bg-[#252529] hidden sm:block" />
        <span className="text-sm text-[#94949c] truncate hidden sm:block max-w-[200px]">
          {project?.name || 'Project'}
        </span>
        <div className="flex-1" />
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${chatOpen ? 'bg-[#f59e0b]/15 text-[#f59e0b]' : 'text-[#6b6b73] hover:text-[#e2e2e7]'}`}
        >
          <MessageSquare className="w-3 h-3" /> AI Chat
        </button>
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

        {/* ─── Desktop File Tree Sidebar ─── */}
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
          {/* Tab Bar */}
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
                  <button onClick={e => { e.stopPropagation(); closeTab(id) }} className="p-0.5 rounded hover:bg-[#252529] opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              )
            })}
            <button onClick={createFile} className="px-2 h-full hover:bg-[#1a1a1e] text-[#45454c] shrink-0"><Plus className="w-3 h-3" /></button>
          </div>

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
        </div>

        {/* ─── AI Chat Panel ─── */}
        {chatOpen && (
          <aside className="w-80 border-l border-[#252529] bg-[#111113] flex flex-col shrink-0 hidden lg:flex">
            <div className="h-8 border-b border-[#252529] flex items-center px-3 justify-between shrink-0">
              <span className="text-xs font-semibold text-[#6b6b73] flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-[#f59e0b]" /> AI Mentor
              </span>
              <button onClick={() => setChatOpen(false)} className="p-1 hover:bg-[#1a1a1e] rounded">
                <X className="w-3 h-3 text-[#6b6b73]" />
              </button>
            </div>

            <div ref={chatRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
              {messages.map(m => (
                <div key={m.id} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : ''}`}>
                  {m.role !== 'user' && (
                    <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5 ${m.role === 'system' ? 'bg-[#1a1a1e]' : 'bg-[#f59e0b]/20'}`}>
                      <Bot className="w-3 h-3 text-[#f59e0b]" />
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                    m.role === 'user' ? 'bg-[#f59e0b] text-[#0a0a0b]' :
                    m.role === 'system' ? 'bg-[#1a1a1e] text-[#6b6b73]' :
                    'bg-[#0a0a0b] border border-[#252529]'
                  }`}>
                    {m.content.split('**').map((p, i) => i % 2 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>)}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded bg-[#f59e0b]/20 flex items-center justify-center shrink-0">
                    <Bot className="w-3 h-3 text-[#f59e0b]" />
                  </div>
                  <div className="bg-[#0a0a0b] border border-[#252529] rounded-lg px-3 py-2">
                    <Loader2 className="w-3 h-3 text-[#f59e0b] animate-spin" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-2 border-t border-[#252529] shrink-0">
              <div className="flex items-center gap-2 border border-[#252529] rounded-lg bg-[#0a0a0b] px-3">
                <input
                  type="text"
                  placeholder="Ask AI to build, fix, or explain..."
                  value={chatIn}
                  onChange={e => setChatIn(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendChat()}
                  className="flex-1 bg-transparent border-none outline-none text-xs py-2.5 placeholder:text-[#45454c]"
                  disabled={busy}
                />
                <button
                  onClick={sendChat}
                  disabled={!chatIn.trim() || busy}
                  className="p-1.5 rounded bg-[#f59e0b] text-[#0a0a0b] disabled:opacity-30 hover:bg-[#fbbf24] transition-colors"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// FILE TREE COMPONENTS
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
