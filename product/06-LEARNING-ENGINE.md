# 06 — Learning Engine (the twist)

This is the part that makes EmbrOS not-a-Cursor-clone. It has four mechanisms.

## 1. The Skill Graph

A graph of programming/building concepts with prerequisites and per-user proficiency.

- **Nodes** = concepts: `html`, `css`, `flexbox`, `js-variables`, `functions`, `async`,
  `react-components`, `react-hooks`, `state`, `props`, `rest-apis`, `auth`, `jwt`,
  `databases`, `sql`, `prisma`, `stripe`, `webhooks`, `env-vars`, `deployment`, `git`, …
- **Edges** = prerequisites (`flexbox` needs `css`; `react-hooks` needs `react-components` + `functions`).
- **Per-user state on each node:** proficiency `0–100`, evidence (which builds/lessons touched it), last-seen, status (`unknown / learning / practiced / independent`).

The graph is **seeded** from our course/book taxonomy and **updated from build evidence**:
when an agent or the user uses a concept successfully (or fails), the node moves.

> Implementation: a static concept graph (JSON) shipped with Ignis; per-user proficiency
> in Postgres; updated by the gap detector. Start with ~60–80 nodes (web/full-stack JS).

## 2. Weakness / gap detection

Triggers a learning moment when:
- An agent uses a concept the user's graph marks `unknown` / low proficiency.
- The user makes a known beginner mistake (lint/error patterns, or LLM-judged).
- The user asks "explain this" or shows confusion (re-reads, undo loops, long pauses).
- A new concept is a **prerequisite** for what they're about to do.

The detector cross-references **live build events** against the **skill graph** + recent
history (don't re-teach what they just learned).

## 3. Just-in-time micro-lessons

When a gap fires, the **Mentor agent** generates a **60–90s lesson**, grounded in the
user's *actual code/context*, delivered inline (a dismissible card next to the build —
never a separate course tab). Structure:

```
[ Concept ]  Stripe webhooks                              ⏱ 90s · EN ⇄ RO
─────────────────────────────────────────────────────────
What it is   A webhook is Stripe calling YOUR app when a
             payment happens — like a doorbell for events.
In your code We just added /api/webhook (line 12). That's
             the doorbell Stripe will ring.
Why          So your app knows a payment succeeded without
             constantly asking Stripe.
Try          Change the event type on line 14 and predict
             what happens.  [ I get it ✓ ]  [ Explain more → ]
```

Rules (quality bar):
- Concrete over abstract; **use their project** as the example.
- Analogy-rich; Feynman-style ("explain to a curious 12-year-old").
- Progressive disclosure: short by default, "explain more" for depth.
- Action-oriented: end with a tiny prediction/try, not a wall of text.
- Bilingual: one toggle, culturally adapted (the RO copy work we just did is the standard).
- Pre-authored content (courses/books) is the **spine**; generated micro-lessons are the
  **just-in-time layer** grounded in real code. Cache/reuse generated lessons per concept.

## 4. Adaptive assistance levels (ZPD)

Same idea as the original Agent Engine concept — how much the agent **does vs guides vs teaches**:

| Level | Name | Agent behavior |
|------|------|----------------|
| 0 | Do it for me | Agent completes the task; user observes + lesson. (beginner default) |
| 1 | Guide me | Agent suggests steps; user executes; agent corrects in real time. |
| 2 | Show me how | Agent demonstrates once; user retries; agent reviews. |
| 3 | Teach me | Agent explains concept; user attempts solo; agent reviews after. |
| 4 | Do it yourself | User leads; agent only on request. (pro default) |

- **Auto-set** from the skill graph + past success on similar tasks + frustration signals.
- **Manual override** always available (a slider).
- **Fades**: as proficiency rises on a concept, assistance level for related tasks increases — the support disappears as the user grows. This is the "skill transfer" that makes them actually learn.

## How it all ties to a build (sequence)

```
build event ─► gap detector ─► skill graph lookup
                   │ gap?            │
                   ▼ yes             ▼ proficiency + ZPD
            Mentor agent ──► micro-lesson (grounded, EN/RO)
                   │                 │
                   ▼                 ▼
            inline lesson card   assistance level for next task
                   │
                   ▼
            user marks "got it" / tries ─► skill graph updates
```

## Content library (the spine)

- We already have **10 courses + 5 books + prompts + templates** (EN/RO) in `src/data/`.
- Repurpose them as the **structured spine**: each course/book chapter maps to skill-graph nodes. The just-in-time engine links a live gap to the relevant chapter for "go deeper."
- Course Writer + Book Writer agents extend the library over time.

## Success metrics (learning works if…)

- **Lesson engagement rate** (opened / acted on).
- **Gap-close rate** (concept moves `unknown → practiced` after a lesson + a build using it).
- **Independent application** (user later uses a concept at higher assistance level successfully).
- **Assistance-level drift up** over time per user (proof of real learning).
- Retention + projects shipped (the lagging proof).
