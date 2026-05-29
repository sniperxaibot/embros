# FORGE - Railway Deployment Guide

## Quick Deploy

### 1. Login to Railway CLI
```bash
railway login
```

### 2. Initialize Project
```bash
cd C:\Users\kodesweb3\Desktop\BuilderCompanion
railway init
# Choose "Create new project"
# Name it: forge
```

### 3. Add PostgreSQL Database
```bash
railway add --database postgres
# Railway auto-injects DATABASE_URL
```

### 4. Set Environment Variables
```bash
railway variables set NEXT_PUBLIC_OPENROUTER_API_KEY=sk-or-your-key-here
railway variables set NEXT_PUBLIC_APP_URL=https://forge-production.up.railway.app
```

### 5. Deploy
```bash
railway up
```

### 6. Push Database Schema
```bash
railway run npx prisma db push
```

### 7. Seed Initial Data
```bash
railway run npx tsx scripts/seed.ts
```

### 8. Get Your URL
```bash
railway domain
# or check Railway dashboard
```

---

## Architecture

```
┌─────────────────────────────────────────────┐
│              Railway Project                 │
│                                             │
│  ┌──────────────┐    ┌──────────────────┐   │
│  │  Next.js App │    │   PostgreSQL     │   │
│  │  (Nixpacks)  │───▶│   Database       │   │
│  │  Port 3000   │    │   (Railway)      │   │
│  └──────────────┘    └──────────────────┘   │
│         │                                   │
│         ▼                                   │
│  ┌──────────────┐                           │
│  │  OpenRouter  │                           │
│  │  AI API      │                           │
│  └──────────────┘                           │
└─────────────────────────────────────────────┘
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Auto | Injected by Railway when you add PostgreSQL |
| `NEXT_PUBLIC_OPENROUTER_API_KEY` | Yes | Get from openrouter.ai/keys |
| `NEXT_PUBLIC_APP_URL` | Yes | Your Railway app URL |
| `PORT` | Auto | Injected by Railway |

## Key Files

- `railway.json` — Railway build/deploy config
- `next.config.js` — Next.js config (standalone output for Railway)
- `prisma/schema.prisma` — PostgreSQL database schema
- `scripts/seed.ts` — Initial data seeder
- `.env.example` — Environment variable template

## Database Schema (Prisma)

- **User** — Accounts, profiles, skill tracking
- **Project** — User projects with files, roadmap, agents
- **Course / CourseModule / Lesson** — Course content with bilingual support
- **LessonProgress** — Track user progress
- **Skill / UserSkill** — Skill graph and user skill levels
- **Book / BookChapter** — Long-form guides
- **Prompt** — Reusable AI prompts
- **Template** — Project templates
- **Session** — User sessions

## Troubleshooting

- **Build fails**: Check `railway logs` for errors
- **DB connection fails**: Verify `DATABASE_URL` is set (`railway variables`)
- **Prisma errors**: Run `railway run npx prisma db push`
- **App crashes**: Check `railway logs` and verify env vars
- **Monaco editor issues**: May need to adjust webpack config for standalone output

## Useful Commands

```bash
railway logs              # View logs
railway variables         # List env vars
railway run <command>     # Run command in Railway environment
railway open              # Open app in browser
railway link              # Link to existing project
```
