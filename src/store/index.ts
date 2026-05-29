// ═══════════════════════════════════════════════════
// FORGE — Global State (Zustand)
// ═══════════════════════════════════════════════════

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Project, FileNode, ChatMessage, ViewMode, BottomTab } from '../types/index'

interface ForgeState {
  // User
  user: User | null
  isAuthenticated: boolean
  language: 'en' | 'ro'

  // Navigation
  view: ViewMode
  previousView: ViewMode | null

  // Projects
  projects: Project[]
  activeProject: Project | null

  // IDE
  openTabs: string[]
  activeFileId: string | null
  bottomTab: BottomTab
  chatMessages: ChatMessage[]
  isAIThinking: boolean

  // UI
  sidebarOpen: boolean
  mobileMenuOpen: boolean

  // Actions
  setUser: (user: User | null) => void
  login: (email: string, name: string) => void
  logout: () => void
  setView: (view: ViewMode) => void
  goBack: () => void
  setLanguage: (lang: 'en' | 'ro') => void

  // Project actions
  createProject: (project: Project) => void
  setActiveProject: (id: string | null) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void

  // IDE actions
  openFile: (id: string) => void
  closeFile: (id: string) => void
  setActiveFile: (id: string | null) => void
  updateFileContent: (id: string, content: string) => void
  addFiles: (files: FileNode[]) => void
  removeFile: (id: string) => void
  setBottomTab: (tab: BottomTab) => void
  addChatMessage: (msg: ChatMessage) => void
  setAIThinking: (thinking: boolean) => void

  // UI actions
  setSidebarOpen: (open: boolean) => void
  setMobileMenuOpen: (open: boolean) => void
}

const defaultSkillProfile = {
  level: 'beginner' as const,
  skills: [
    { id: 'html', name: 'HTML', level: 0, category: 'Web' },
    { id: 'css', name: 'CSS', level: 0, category: 'Web' },
    { id: 'js', name: 'JavaScript', level: 0, category: 'Programming' },
    { id: 'ts', name: 'TypeScript', level: 0, category: 'Programming' },
    { id: 'react', name: 'React', level: 0, category: 'Framework' },
    { id: 'nextjs', name: 'Next.js', level: 0, category: 'Framework' },
    { id: 'ai', name: 'AI/ML', level: 0, category: 'AI' },
    { id: 'git', name: 'Git', level: 0, category: 'Tool' },
  ],
  completedLessons: [],
  strengths: [],
  weaknesses: [],
}

export const useForgeStore = create<ForgeState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      language: 'en',
      view: 'landing',
      previousView: null,
      projects: [],
      activeProject: null,
      openTabs: [],
      activeFileId: null,
      bottomTab: 'chat',
      chatMessages: [],
      isAIThinking: false,
      sidebarOpen: false,
      mobileMenuOpen: false,

      // User actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),

      login: (email, name) => {
        const user: User = {
          id: 'user-' + Date.now(),
          name,
          email,
          createdAt: new Date().toISOString(),
          skillProfile: { ...defaultSkillProfile },
          settings: { language: 'en', theme: 'dark', aiModel: 'openrouter/auto' },
        }
        set({ user, isAuthenticated: true, view: 'dashboard' })
      },

      logout: () => set({
        user: null,
        isAuthenticated: false,
        view: 'landing',
        activeProject: null,
        openTabs: [],
        activeFileId: null,
        chatMessages: [],
      }),

      // Navigation
      setView: (view) => set((s) => ({ view, previousView: s.view })),
      goBack: () => set((s) => ({ view: s.previousView || 'dashboard', previousView: null })),
      setLanguage: (language) => set({ language }),

      // Projects
      createProject: (project) => set((s) => ({
        projects: [...s.projects, project],
        activeProject: project,
        view: 'ide',
      })),

      setActiveProject: (id) => set((s) => ({
        activeProject: id ? s.projects.find(p => p.id === id) || null : null,
        openTabs: [],
        activeFileId: null,
        chatMessages: [{
          id: '0',
          role: 'system' as const,
          content: '🔥 AI Mentor ready. Ask me to build features, explain code, or fix bugs.',
          timestamp: new Date().toISOString(),
        }],
      })),

      updateProject: (id, updates) => set((s) => ({
        projects: s.projects.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p),
        activeProject: s.activeProject?.id === id ? { ...s.activeProject, ...updates } : s.activeProject,
      })),

      deleteProject: (id) => set((s) => ({
        projects: s.projects.filter(p => p.id !== id),
        activeProject: s.activeProject?.id === id ? null : s.activeProject,
      })),

      // IDE
      openFile: (id) => set((s) => ({
        openTabs: s.openTabs.includes(id) ? s.openTabs : [...s.openTabs, id],
        activeFileId: id,
      })),

      closeFile: (id) => set((s) => {
        const next = s.openTabs.filter(t => t !== id)
        return {
          openTabs: next,
          activeFileId: s.activeFileId === id ? (next[next.length - 1] || null) : s.activeFileId,
        }
      }),

      setActiveFile: (id) => set({ activeFileId: id }),

      updateFileContent: (id, content) => set((s) => {
        if (!s.activeProject) return s
        const updateFiles = (files: FileNode[]): FileNode[] =>
          files.map(f => f.id === id ? { ...f, content } : f.children ? { ...f, children: updateFiles(f.children) } : f)
        const updatedFiles = updateFiles(s.activeProject.files)
        return {
          activeProject: { ...s.activeProject, files: updatedFiles, updatedAt: new Date().toISOString() },
        }
      }),

      addFiles: (newFiles) => set((s) => {
        if (!s.activeProject) return s
        return {
          activeProject: {
            ...s.activeProject,
            files: [...s.activeProject.files, ...newFiles],
            updatedAt: new Date().toISOString(),
          },
        }
      }),

      removeFile: (id) => set((s) => {
        if (!s.activeProject) return s
        const rm = (files: FileNode[]): FileNode[] =>
          files.filter(f => f.id !== id).map(f => f.children ? { ...f, children: rm(f.children) } : f)
        return {
          activeProject: { ...s.activeProject, files: rm(s.activeProject.files) },
          openTabs: s.openTabs.filter(t => t !== id),
        }
      }),

      setBottomTab: (bottomTab) => set({ bottomTab }),

      addChatMessage: (msg) => set((s) => ({
        chatMessages: [...s.chatMessages, msg],
      })),

      setAIThinking: (isAIThinking) => set({ isAIThinking }),

      // UI
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
    }),
    {
      name: 'forge-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        language: state.language,
        projects: state.projects,
      }),
    }
  )
)
