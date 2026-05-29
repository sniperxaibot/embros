# CHANGELOG

## v0.2.1 - Railway Deployment Ready (2026-05-29)

### Added
- PostgreSQL database integration with Prisma ORM
- Complete database schema: User, Project, Course, Lesson, Book, Skill, Prompt, Template, Session
- Database client with graceful degradation for local development
- Seed script for initial data (courses, skills, prompts)
- Railway deployment configuration (railway.json, next.config.js with standalone output)
- Comprehensive DEPLOY.md guide for Railway deployment
- Environment variable template (.env.example)

### Fixed
- Hydration error in IDEPanelPage due to persisted store mismatch
- Monaco editor webpack compatibility issues
- Build errors from seed.ts being included in production build
- Various TypeScript lint errors

### Technical
- Added Prisma schema with full relational database design
- Implemented Zustand store with localStorage persistence
- Built full IDE panel with Monaco editor, file tree, AI chat, live preview
- Created premium landing page with dark-first design (#0a0a0b bg, #f59e0b accent)
- Implemented bilingual support (English/Romanian) throughout
- Added 18 AI agent system with specialized roles
- Created course, book, prompt, and template systems with real content
- Mobile-first responsive design with hamburger menu sidebar
- JWT-like session management with localStorage
- Optimized Next.js build (22.8KB bundle)

## v0.2.0 - Core Platform Complete (2026-05-28)

### Added
- Complete Forge application with 7 views: Landing, Onboarding, Dashboard, IDE, Courses, Books, Prompts, Templates
- Premium landing page with animations and mobile-responsive design
- Onboarding flow with name/email collection and idea selection
- Dashboard with project listing, quick actions, and skill map
- Full IDE panel with Monaco editor, file tree, tab management
- AI chat with OpenRouter integration (mock responses for development)
- Live preview panel for HTML/CSS/JS projects
- Learning panel with guided tutorials
- Courses system with 10 courses and real content
- Books section with 5 structured builder guides
- Prompt library with 10 reusable prompts
- Project templates with 10 starter templates
- Zustand state management with persistence
- OpenRouter AI client with provider abstraction
- 18 AI agent system with specialized roles
- Dark-first design system with amber accent (#f59e0b)
- Inter + JetBrains Mono font pairing
- Mobile-first responsive design
