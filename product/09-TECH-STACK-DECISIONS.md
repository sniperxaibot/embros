# 09 — Tech Stack Decisions

Decisions are **made** here (with reasons), not left open. Revisit only with cause.

## D1 — Front-end strategy: Web first, NOT a VS Code fork (initially)

The owner asked "even if we do a VS Code fork or anything." Here's the honest analysis:

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **Web app (Next.js + Monaco)** | No install (beginner-critical), runs anywhere, fastest to ship, full control of the teaching UI, in-browser execution = $0 | Heavy local dev needs a sandbox | ✅ **MVP** |
| **VS Code extension** | Pros keep their editor + files; cheap (~weeks); 90% of fork value | Lives inside VS Code's UX limits | ✅ **Phase 2 (pros)** |
| **CLI** | Claude-Code-style power; trivial over local files; we have a stub | Not for beginners | ✅ **Phase 2 (pros)** |
| **Full VS Code / Code-OSS fork** | Total control of editor UX (like Cursor) | **Massive** maintenance (track upstream forever), slow, overkill, terrible beginner on-ramp | ❌ **Avoid** until there's a hard reason |
| **Desktop (Tauri wrap of web)** | Native feel, offline, bundles local Ignis | Extra packaging work | ✅ **Phase 3** |

**Why not fork VS Code now:** our differentiator is the **teaching + memory loop**, not the editor. A fork buys us editor control we don't need yet and costs us a permanent maintenance tax (Cursor/Windsurf can afford it; we can't, pre-revenue). The web app gives beginners a *better* on-ramp than VS Code ever could, and a **VS Code extension** gives pros ~90% of fork value for ~10% of the cost. Keep the fork as a "later, if a wall appears" option.

## D2 — Editor: Monaco (web)

Same engine as VS Code, React-friendly, we already have `@monaco-editor/react` in deps. CodeMirror is lighter but Monaco's familiarity + features win for a coding product.

## D3 — Code execution

| Need | Choice |
|------|--------|
| Web/JS projects (most beginner builds) | **WebContainers (StackBlitz SDK)** — runs Node in-browser, instant preview, ~$0 infra |
| Python / full backends / DBs | **Remote sandbox: E2B or Daytona or Modal** (Hermes already supports Modal/Daytona) — on-demand, idle→$0 |
| Pro (CLI/desktop/extension) | **User's machine** — free compute, full power |
| Hosting / deploy | Vercel / Netlify / Cloudflare Pages (static+web), Railway (full apps) |

WebContainers is the unlock for "beginner runs real code with zero setup and we pay ~nothing."

## D4 — The brain: Ignis = forked Hermes Agent (Python)

See 05. Python service (FastAPI) exposing REST + WebSocket. Don't rewrite in TS.

## D5 — Models: OpenRouter, free tier + fallback chain

Already implemented in `src/lib/ai-client.ts`. Ignis mirrors server-side. Cost guard on Free tier. One-command swap to premium when revenue allows.

## D6 — Backend / data (already in repo)

- **Next.js 14** (App Router) — web app + API routes.
- **Postgres** on **Railway** + **Prisma** — projects, users, skill graph.
- **Vector store** — start with `pgvector` on the same Postgres (one DB), move to dedicated if needed.
- **Supabase Auth** — email, magic link, GitHub OAuth (already wired).
- **Deploy:** GitHub → Railway (Dockerfile, already set up).

## D7 — Desktop (Phase 3): Tauri

Wrap the web workspace; bundle a local Ignis. Tauri (Rust) over Electron — smaller, faster; we already have `tauri.conf.json` + `@tauri-apps/cli` in the repo. Targets macOS / Windows / Linux.

## D8 — Monorepo layout (target)

```
embros/
  apps/
    web/            ← current Next.js app (this repo) — beginner workspace + landing
    cli/            ← `embros` CLI (Python) — current ForgeCLI/forge.py grows here
    vscode/         ← VS Code extension (TS) — Phase 2
    desktop/        ← Tauri shell — Phase 3
  services/
    ignis/          ← forked Hermes + our layers (Python/FastAPI)
  packages/
    agents/         ← shared agent registry (port src/lib/agents.ts)
    skill-graph/    ← concept graph JSON + proficiency logic
    content/        ← courses/books/prompts/templates (EN/RO)
  product/          ← this plan
```

(We don't need the monorepo on day 1 — the current repo IS `apps/web`. Introduce the structure when `services/ignis` lands.)

## Summary

**MVP = the existing Next.js web app + WebContainers execution + Ignis service (forked Hermes) + the learning loop.** No VS Code fork. Pros get CLI + extension in Phase 2. Cheap, fast, covers beginners now and pros soon.
