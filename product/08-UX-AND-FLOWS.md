# 08 — UX & Flows

Design principle: **progressive disclosure**. A beginner sees a chat + a preview. A pro
sees a full IDE. Same app, complexity revealed as the user grows / opts in.

## Onboarding

**Beginner path (web):**
1. "What do you want to build?" — one big input + a few example chips (site, app, bot, automation).
2. Optional 20-sec calibration: "Have you coded before? (Never / A little / Yes)" → sets default assistance level.
3. Pick language EN/RO.
4. → straight into the workspace with the Orchestrator already planning. **No install, no config, no empty IDE.**

**Pro path:**
1. Install CLI (`curl … | sh`) or VS Code extension, or "open my folder" in web.
2. Authenticate (links to same account/memory).
3. Assistance defaults to Level 4; lessons off (toggle to enable).

## The workspace (web)

```
┌───────────────────────────────────────────────────────────────────┐
│  embrOS   project ▸ My SaaS         [▷ Run]  [⤴ Deploy]   EN ⇄ RO  │
├───────────┬───────────────────────────────┬───────────────────────┤
│ FILES     │  EDITOR / PREVIEW (toggle)    │  AGENTS + LESSONS      │
│ app/      │                               │  ┌─────────────────┐   │
│  page.tsx │  (Monaco)  or  (live preview) │  │ Orchestrator ●   │   │
│  api/     │                               │  │ "Adding auth…"   │   │
│ lib/      │                               │  └─────────────────┘   │
│           │                               │  ┌─ lesson ─────────┐  │
│           │                               │  │ Webhooks · 90s    │  │
│  + New    │                               │  │ [got it] [more →] │  │
│           │                               │  └──────────────────┘  │
├───────────┴───────────────────────────────┴───────────────────────┤
│  ⌘K  "Build me a login page with Google sign-in"        assist: ▓▓░░ │
└───────────────────────────────────────────────────────────────────┘
```

- **⌘K command bar** (the Raycast-style launcher from the landing) = how you talk to agents / run commands. Beginners can also just type in plain language.
- **Preview-first for beginners** (editor hidden until they want it). "Show me the code" reveals Monaco.
- **Lessons** appear in the right rail, inline with the agent that triggered them. Never modal, never blocking.
- **Assistance slider** visible (Level 0–4), auto-set but user-movable.

## The core build+learn session (beginner)

1. Type idea → Orchestrator plans (shows the plan in plain language).
2. Agents build; the right rail narrates each step.
3. A lesson card appears when a new concept shows up → user reads 90s → "got it."
4. Preview updates live → user sees the real thing working (dopamine).
5. User: "make the button blue" → Frontend agent does it, explains where.
6. "Deploy" → live URL. First shipped product. 🎉
7. Skill graph updated; next session starts from where they are.

## Pro session (P4)

- CLI: `embros "add rate limiting to the api"` → agent edits local files, shows diff, applies on approve.
- VS Code: agent panel + inline; "explain" toggle for unfamiliar areas; define a custom agent in a `.embros/agents/*.yaml`.
- Memory makes it context-aware across the real repo.

## Memory UX

- "Continue where you left off" on the dashboard (last project, last step).
- A visible **skill map** (the gold readout from the landing) — proof of growth.
- "Ignis remembers: you prefer Tailwind, you've used Stripe once, you're learning auth."

## Mobile

- Web app must be usable on mobile for **browsing/learning/planning + waitlist/community**, even if heavy editing is desktop-first. Landing is already mobile-clean. Workspace on mobile = chat + preview + lessons (no full editor).

## Tone

Direct, encouraging, no fluff. Like a skilled senior who respects your time and never makes you feel dumb. Bilingual, culturally natural.
