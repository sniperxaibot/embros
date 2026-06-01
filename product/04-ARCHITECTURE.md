# 04 — System Architecture

## Bird's-eye view

```
┌──────────────────────── FRONT-ENDS (doors) ─────────────────────────┐
│  Web app (Next.js)   CLI `embros`   VS Code extension   Desktop(Tauri)│
└───────────────┬───────────────┬───────────────┬────────────────┬─────┘
                │ HTTPS / WS     │ local/HTTPS    │ local/HTTPS    │
                ▼                ▼                ▼                ▼
        ┌────────────────────────────────────────────────────────────┐
        │                  IGNIS ENGINE (per user)                    │
        │  ── proprietary fork of Hermes Agent (Python) ──            │
        │  • Agent runtime + orchestrator + subagents                 │
        │  • Memory: profile + skill graph + vector store + history   │
        │  • Lesson Engine (gap detection → micro-lessons)            │
        │  • Model router → OpenRouter (free models + fallback)       │
        │  • Tool layer (MCP, fs, run, deploy)                         │
        └───────┬───────────────┬───────────────┬────────────────────┘
                │               │               │
                ▼               ▼               ▼
        ┌────────────┐   ┌─────────────┐   ┌──────────────────────────┐
        │ Postgres   │   │ Vector DB   │   │ Execution sandbox         │
        │ (projects, │   │ (memory     │   │ • Web: WebContainers      │
        │ users,     │   │ embeddings) │   │   (in-browser, $0)        │
        │ skill data)│   │             │   │ • Heavier: E2B/Daytona/   │
        └────────────┘   └─────────────┘   │   Modal · OR user's machine│
                                           └──────────────────────────┘
```

## Components

### 1. Front-ends
- **Web app** — Next.js 14 (already started in this repo). Monaco editor, file tree, preview, agent chat / ⌘K. Talks to Ignis over HTTPS + WebSocket (streaming agent output + lessons).
- **CLI** — Python (we already have `ForgeCLI/forge.py` as a stub). Wraps Ignis locally for pros.
- **VS Code extension** — TypeScript; surfaces agents, memory and optional "explain" in-editor. Talks to a local Ignis process.
- **Desktop** — Tauri wrapping the web workspace; bundles a local Ignis for offline/native.

### 2. Ignis engine (the brain) — see 05
Runs **per user**. For web users it runs on our infra (one logical engine instance/session, sandboxed). For pro/desktop/CLI it can run **locally** (privacy + free compute). Same code, two deployment modes (Hermes already supports local CLI, Docker, SSH, Modal, Daytona).

### 3. Memory layer — see 05/06
- **Structured store (Postgres):** users, projects, decisions, agent runs, skill-graph nodes/edges + proficiency.
- **Vector store:** embeddings of past conversations, code, lessons for retrieval (Hermes ships conversation retrieval + Honcho-style user modeling — we adapt).

### 4. Execution sandbox (running the code) — the make-or-break for beginners
- **In-browser via WebContainers (StackBlitz SDK):** run Node/JS/web projects entirely in the browser. **Near-zero infra cost**, no setup, instant preview. This is the default for beginner web projects.
- **Remote sandboxes (E2B / Daytona / Modal):** for non-JS stacks (Python, full backends, DBs). Spin up on demand, cheap, idle→$0.
- **User's machine:** for CLI/desktop/VS Code (free compute, full power).
- **Static/preview hosting + one-click deploy:** Vercel/Netlify/Railway/Cloudflare Pages.

### 5. Model layer
- **OpenRouter** only, **free models** with a fallback chain (already implemented in `src/lib/ai-client.ts`; Ignis mirrors this server-side).
- Pro tier (later) can opt into premium models (their key or our metered).

### 6. Platform services
- Auth (Supabase), projects API (Prisma/Postgres on Railway — already in repo), billing (Stripe, Pro), Discord integration, analytics.

## Key architectural decisions

1. **One engine, many front-ends.** Never duplicate agent/memory logic per surface. Ignis is the only place that thinks.
2. **Ignis is a service with a stable API** (REST + WebSocket). Front-ends are thin.
3. **Web = in-browser execution first** to keep beginner cost ≈ $0 and setup = none.
4. **Pro = local execution** (their machine) — free compute, privacy, full power.
5. **Memory is first-class**, not a log. The skill graph + profile are queried on every agent run and every lesson decision.
6. **TS front-ends + Python brain** is fine — they communicate over the API. Don't try to rewrite Hermes in TS.

## Data flow: one build step (example)

1. User (web): "add Stripe checkout."
2. Front-end → Ignis (WS): goal + project context.
3. Ignis: orchestrator decomposes → assigns Backend agent; pulls user's skill graph (Stripe = unknown).
4. Backend agent writes files via tool layer; runs in WebContainer; streams diffs to UI.
5. Lesson Engine: detects "Stripe/webhooks" gap → asks Mentor agent for a 90s lesson grounded in the just-written code → streams a lesson card to UI (EN/RO per user).
6. User runs preview; result streamed back. Skill graph updates (Stripe: novice→beginner). Assistance level for next payment task nudges up.
7. All of it persisted to memory.
