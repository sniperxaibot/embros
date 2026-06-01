# 03 — Product Overview

## What EmbrOS *is*, in one paragraph

EmbrOS is an **agentic builder workspace with a teaching layer and a memory engine**.
You describe what you want; a team of AI agents plans and builds it as real, runnable,
deployable code. As they work — and as you take the wheel — EmbrOS injects short,
excellent, context-grounded lessons so you understand what's happening. A per-user
engine (**Ignis**) remembers your projects, decisions and skill level, and uses that to
decide how much to do for you, what to teach, and which agents to run. Free models keep
it cheap; in-browser/local execution lets you actually run things with no setup.

## The four pillars

1. **Build** — agentic workspace: editor + file tree + live preview + terminal (progressive disclosure). Agents write/modify files, run code, fix errors, deploy.
2. **Learn** — the twist: just-in-time micro-lessons tied to your real code, weakness detection, a growing skill graph, assistance levels, plus a structured content library (courses/books/prompts) as the spine. EN/RO.
3. **Remember (Ignis)** — per-user memory: project history, decisions, preferences, skill graph. Makes the help and teaching personal and compounding.
4. **Extend** — predefined specialist agents; experienced users define custom agents; a marketplace to share them. MCP tools, model routing.

## The core loop (this is the product)

```
   ┌─────────────────────────────────────────────────────────────┐
   │  1. You say what you want to build                           │
   │            │                                                 │
   │            ▼                                                 │
   │  2. Orchestrator plans → assigns specialist agents          │
   │            │                                                 │
   │            ▼                                                 │
   │  3. Agents build real code · narrate decisions               │
   │            │                                                 │
   │            ▼                                                 │
   │  4. Ignis watches you + the build → detects skill gaps       │
   │            │                                                 │
   │            ▼                                                 │
   │  5. Lesson Engine injects a 60–90s lesson on the exact gap   │
   │            │                                                 │
   │            ▼                                                 │
   │  6. You run / tweak / ship → skill graph updates             │
   │            │                                                 │
   │            └──────────────► assistance level adapts ─────────┤
   │                              (less help next time)           │
   └─────────────────────────────────────────────────────────────┘
```

## Surfaces (front-ends)

- **Web app (MVP, beginner-first):** the guided workspace. Nothing to install. Runs code in-browser/managed sandbox. Preview-first. Lessons on.
- **CLI `embros` (pro):** Claude-Code-style terminal agent over local files. Talks to the same Ignis engine running locally.
- **VS Code extension (pro):** agents + memory + optional "explain" inside the editor devs already use. (Chosen over a full fork — see 09.)
- **Desktop app (later):** Tauri wrapper of the web workspace for an offline-capable native feel on macOS/Windows/Linux.

All four are doors into **one Ignis engine per user**.

## Feature inventory (not all MVP — see 10 for the cut)

**Build**
- Project from idea / template / blank
- Monaco-based editor, file tree CRUD, multi-file
- Live preview (web projects) + console
- Agent chat / command palette (⌘K) to launch agents
- Run & debug; one-click deploy (Vercel/Netlify/Railway/static)
- Git integration, export, GitHub push

**Learn**
- Just-in-time micro-lessons (inline, dismissible, bilingual)
- Weakness/gap detection from build + user actions
- Skill graph + visible profile/progress
- Assistance level control (auto + manual override)
- Content library: courses, books, prompts, templates (real content, EN/RO)
- "Explain this" on any file/line/agent action
- Daily streak / XP (light, not gimmicky)

**Remember (Ignis)**
- Per-user memory: projects, decisions, preferences, skill graph
- Cross-session continuity; "pick up where you left off"
- Retrieval: agents pull relevant past context automatically

**Extend**
- 12–18 predefined agents (orchestrator, architect, builder, frontend, backend, db, debugger, tester, mentor, RO tutor, deployer, auditor…)
- Custom agent definitions (pro)
- Agent marketplace (later)
- MCP tool integration; model routing (OpenRouter free + fallback)

**Platform**
- Web + CLI + VS Code extension + desktop
- Auth, projects API, billing (Pro), Discord-connected community

## What EmbrOS is NOT (guardrails)

- Not a passive course platform.
- Not a chatbot.
- Not "another VS Code fork" we have to maintain (we use an *extension* + web).
- Not a code generator that leaves you stranded.
