# FORGE — Project Status
# Updated: 2026-05-31

## Current State: v0.3.0 — Auth + Backend Integration

### ✅ What Works
- Landing page (premium dark design, mobile-first, animated)
- Auth system (login, register, OAuth callback) — email/password + magic link + GitHub
- API routes (projects CRUD with Prisma)
- Database: PostgreSQL on Railway, Prisma ORM
- Deployment: Railway with Dockerfile builder
- 18 AI agents with full system prompts
- 10 courses with real content (EN + RO)
- 5 books with structured chapters (EN + RO)
- 10 reusable prompts, 10 project templates
- Zustand state management with localStorage persistence
- OpenRouter AI client with provider abstraction
- Discord server (23 channels, 6 roles, all pinned)

### 🚧 In Progress
- Dashboard page (post-login)
- Monaco editor IDE integration
- Real AI chat streaming
- File tree operations

### 📋 Next (Priority)
1. Dashboard page with project list
2. IDE page (Monaco + AI chat panel)
3. File tree CRUD
4. Real AI chat streaming
5. Forge CLI tool

### Architecture
```
Web App:     Next.js 14 + TypeScript + Tailwind
Database:    PostgreSQL (Railway) + Prisma ORM
Auth:         Supabase Auth (email, magic link, GitHub OAuth)
AI:           OpenRouter (multi-model rotation)
Deploy:       Railway (Dockerfile builder)
CLI:          Python (TBD)
```

### Environment
- Local: SQLite via Prisma
- Production: PostgreSQL on Railway
- AI: OpenRouter API

### Key Files
- `prisma/schema.prisma` — Database schema
- `src/app/auth/` — Auth pages
- `src/app/api/` — API routes
- `src/lib/db.ts` — Prisma client singleton
- `src/lib/ai-client.ts` — OpenRouter AI client
- `railway.json` — Railway deployment config
