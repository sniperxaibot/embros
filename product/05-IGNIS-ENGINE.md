# 05 — Ignis Engine (the brain)

> **SECRECY:** Ignis is built on a fork of **Hermes Agent (Nous Research, MIT)**. The
> name "Hermes" / "Nous" must NEVER appear in public UI, marketing, repo description,
> commit messages, package names, or pitch. Internally we know; publicly it is **Ignis,
> our proprietary engine**. The fork is legal under MIT as long as we keep the license
> file; we just don't market the lineage.

## What Ignis is

The per-user agentic engine that powers everything: runs agents, holds memory, decides
how much to help and what to teach, routes models, and exposes a stable API to all
front-ends. It is **the moat** — the part competitors can't copy because it's tied to
each user's accumulated data.

## Why fork Hermes Agent instead of building from scratch

Hermes Agent already ships the hard parts we need (verified from its README):

- **Built-in learning loop** — creates skills from experience, improves them in use, retrieves past-conversation context. → maps directly to our skill graph + memory.
- **Per-user profiles via Honcho dialectic modeling** → our "remembers you."
- **Subagent spawning / parallel workstreams** → our agent orchestration.
- **200+ models incl. OpenRouter** → our free-model routing, one-command swap.
- **40+ tools, MCP server integration, extensible toolsets** → our tool layer.
- **Runs local (Linux/macOS/WSL2/Windows beta), Docker, SSH, Modal, Daytona** → our web (managed) + pro (local) deployment modes, cheap when idle.
- **agentskills.io standard + RPC to call tools** → our custom-agent + marketplace story.
- **Scheduled automations (cron), batch trajectory generation** → future power features.

Building this from zero is 6–12 months. Forking gets us to a working brain in weeks.

## Ignis = Hermes + our layers

```
        ┌──────────────────── IGNIS ─────────────────────┐
        │  OUR LAYERS (proprietary value)                 │
        │  • Skill Graph + proficiency model              │
        │  • Lesson Engine (gap detection → micro-lessons)│
        │  • Assistance-level controller (ZPD)            │
        │  • EmbrOS agent registry (12–18 + custom)       │
        │  • EmbrOS API (REST/WS) for our front-ends      │
        │  • EN/RO bilingual layer                        │
        │  • Free-model routing policy + cost guard       │
        ├─────────────────────────────────────────────────┤
        │  HERMES CORE (forked, de-branded)               │
        │  • agent runtime + orchestrator + subagents     │
        │  • memory: profiles, skill-from-experience,     │
        │    conversation retrieval                       │
        │  • tools + MCP + model providers                │
        │  • deployment backends (local/docker/modal/…)   │
        └─────────────────────────────────────────────────┘
```

## Memory architecture (the compounding moat)

Three tiers:

1. **Working memory** — current project context (open files, recent diffs, current goal). Ephemeral, per session.
2. **Project memory** — per project: decisions, architecture, agent runs, what was built and why. Postgres + vector.
3. **User memory** — cross-project, the durable model of the person:
   - **Skill graph** (see 06): concept nodes + proficiency + evidence.
   - **Preferences**: stack, style, language (EN/RO), assistance level defaults.
   - **History**: every project, every lesson seen, every gap closed.
   - **Dialectic profile** (Honcho-style): inferred traits, how they learn best.

On every agent run and every lesson decision, Ignis queries user + project memory. This is what makes help feel personal and makes the product impossible to switch away from.

## Model routing & cost

- Default: **OpenRouter free models** with fallback chain (mirror of `ai-client.ts`):
  `llama-3.3-70b:free → deepseek-v3:free → gemini-2.0-flash-exp:free → owl-alpha`.
- A **cost guard** caps tokens/runs per free user/day (e.g., 3 agent runs/day on Free tier).
- Pro (later): premium models (our metered key or user-supplied).
- One-command model swap (Hermes already supports this) so we upgrade when we can afford it.

## Deployment modes

- **Managed (web users):** Ignis runs on our infra, one sandboxed engine per active session; execution offloaded to WebContainers (browser) or remote sandbox. Idle → cheap.
- **Local (pro/desktop/CLI):** Ignis runs on the user's machine (Hermes runs on a $5 VPS or locally). Free compute, privacy, full power. Memory syncs to our cloud (or stays local for privacy mode).

## The fork plan (engineering)

1. Clone Hermes Agent; get it running locally with OpenRouter free models.
2. **De-brand:** strip Nous/Hermes naming from anything user-visible; rename to Ignis internally; keep LICENSE.
3. Wrap it in an **EmbrOS API service** (FastAPI): endpoints for `run_agent`, `stream`, `memory`, `skills`, `lesson`, `agents` (list/define).
4. Add **Skill Graph** + **Lesson Engine** + **assistance controller** as our modules that sit on top of Hermes' memory/retrieval.
5. Load our **agent registry** (port the 18 prompts from `src/lib/agents.ts`).
6. Wire the web app to the API (replace the current direct OpenRouter calls for agent runs with Ignis calls; keep the free-model client for simple chat).

## Public language for Ignis

- "Powered by **Ignis**, our per-user agent engine." ✅
- "An engine that learns you and gets better every build." ✅
- Never: Hermes, Nous, Honcho (publicly). Internally fine in this folder.
