// ═══════════════════════════════════════════════════
// FORGE — Core Types
// ═══════════════════════════════════════════════════

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
  skillProfile: SkillProfile
  settings: UserSettings
}

export interface UserSettings {
  language: 'en' | 'ro'
  theme: 'dark' | 'light'
  aiModel: string
}

export interface SkillProfile {
  level: 'beginner' | 'intermediate' | 'advanced'
  skills: Skill[]
  completedLessons: string[]
  strengths: string[]
  weaknesses: string[]
}

export interface Skill {
  id: string
  name: string
  level: number // 0-100
  category: string
}

export interface Project {
  id: string
  name: string
  description: string
  idea: string
  status: 'planning' | 'building' | 'testing' | 'deployed'
  createdAt: string
  updatedAt: string
  template: string
  techStack: string[]
  features: string[]
  mvpScope: string[]
  roadmap: RoadmapItem[]
  assignedAgents: string[]
  files: FileNode[]
  lessons: Lesson[]
  notes: string
}

export interface RoadmapItem {
  id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  assignedAgent: string
  order: number
}

export interface FileNode {
  id: string
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
  content?: string
  language?: string
  isOpen?: boolean
}

export interface Agent {
  id: string
  name: string
  role: string
  description: string
  icon: string
  systemInstructions: string
  capabilities: string[]
  inputSchema: string
  outputFormat: string
  exampleTasks: string[]
  escalationRules: string
  teachingBehavior: string
  color: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  agentId?: string
  timestamp: string
}

export interface Course {
  id: string
  slug: string
  title: string
  titleRo: string
  description: string
  descriptionRo: string
  icon: string
  color: string
  modules: CourseModule[]
  totalLessons: number
  estimatedHours: number
  level: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
}

export interface CourseModule {
  id: string
  title: string
  titleRo: string
  order: number
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  slug: string
  title: string
  titleRo: string
  content: string
  contentRo: string
  type: 'explanation' | 'example' | 'exercise' | 'builder' | 'summary'
  estimatedMinutes: number
  completed?: boolean
}

export interface Book {
  id: string
  slug: string
  title: string
  titleRo: string
  description: string
  descriptionRo: string
  coverColor: string
  chapters: BookChapter[]
  totalChapters: number
}

export interface BookChapter {
  id: string
  title: string
  titleRo: string
  content: string
  contentRo: string
  order: number
}

export interface Prompt {
  id: string
  title: string
  titleRo: string
  content: string
  contentRo: string
  category: string
  tags: string[]
  platform: 'cursor' | 'codex' | 'claude' | 'openrouter' | 'debug' | 'refactor' | 'deploy' | 'agent' | 'product' | 'romanian'
}

export interface Template {
  id: string
  slug: string
  name: string
  nameRo: string
  description: string
  descriptionRo: string
  icon: string
  color: string
  techStack: string[]
  files: FileNode[]
  category: string
}

export interface LearningPath {
  id: string
  title: string
  description: string
  currentStep: number
  totalSteps: number
  steps: LearningStep[]
}

export interface LearningStep {
  id: string
  title: string
  description: string
  type: 'lesson' | 'exercise' | 'project' | 'reading'
  resourceId: string
  completed: boolean
  order: number
}

export type BottomTab = 'chat' | 'preview' | 'learning' | 'terminal'
export type ViewMode = 'landing' | 'dashboard' | 'ide' | 'courses' | 'books' | 'prompts' | 'templates' | 'onboarding'
