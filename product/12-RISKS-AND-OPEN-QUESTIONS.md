# 12 — Risks & Open Questions

## Top risks & mitigations

| # | Risk | Why it's real | Mitigation |
|---|------|---------------|------------|
| R1 | **Free models too weak / rate-limited** for real agentic coding | Free OpenRouter models are slower, dumber, and capped; agentic coding is demanding | Fallback chain (done); cost guard (3 runs/day) keeps usage low; scope MVP to *small* web apps where free models suffice; upgrade to premium for Pro the moment there's revenue. Test the loop on free models EARLY (Phase 0 spike). |
| R2 | **Lesson quality is mediocre** → the whole differentiator dies | Generic AI "lessons" are slop; users tune out | Hard quality bar (see 06): grounded in their real code, 90s, analogy-rich, actionable. Pre-author the spine (we have courses/books). Human-review the first lessons. Measure engagement; iterate. |
| R3 | **Scope explosion** (IDE + agents + learning + memory + 4 surfaces) | It's genuinely a lot | Ruthless MVP: ONE flow (beginner, web, JS) end-to-end. No fork, no CLI/desktop, no custom agents in MVP. Ship the loop, then widen. |
| R4 | **In-browser execution limits** (WebContainers = JS/Node only; some libs/features missing) | Beginners may want non-JS or things WebContainers can't run | MVP targets web/JS where WebContainers shines; remote sandbox (E2B/Daytona) for the rest in Phase 2. |
| R5 | **Incumbent copies the teaching layer** (Replit/Cursor add "explain mode") | They could | Moat = memory + skill graph + EN/RO content + community, not one feature. Move fast; compound the per-user data; own the beginner+RO niche they won't prioritize. |
| R6 | **Hermes fork is heavier to tame than expected** | Forking a real framework has surprises | Phase 0 spike: get Hermes running with free models + a minimal API before committing. If it fights us, we still have the simpler `ai-client.ts` agent path as a fallback to ship MVP, and add memory ourselves. |
| R7 | **Retention** — novelty wears off; people don't come back | Classic for builder/edu tools | The loop is the retention: memory ("continue where you left off"), visible skill growth, shipped portfolio, Discord community, streaks. Measure D7/W4 hard. |
| R8 | **Hermes/Nous lineage leaks publicly** | Reputational/brand confusion | Strict secrecy rule (05). No mention anywhere public. Audit repo/commits/marketing before each public push. |
| R9 | **Solo/small team velocity** | Big vision, limited hands | The whole plan is built around leverage: fork (not build) the brain, use the existing web app, free infra, AI agents (us) to build it. Sequence strictly per the roadmap. |
| R10 | **Legal/safety of agent actions** (deleting files, deploying, spending) | Agents acting on user systems | Bake in safety rules (07): explain-before-act, no irreversible action without approval, checkpoints/rollback, audit trail. |

## Open questions (decide as we go)

1. **Memory privacy mode for pros** — do local/CLI users sync memory to our cloud, or keep it fully local (privacy) with optional sync? (Lean: opt-in sync; local default for pros.)
2. **Skill graph authoring** — hand-author the first ~60 nodes, or generate from the content library + curate? (Lean: generate draft from courses, curate by hand.)
3. **Where the workspace state lives** — full files in our DB vs. WebContainers FS vs. user's GitHub? (Lean: WebContainers FS + snapshot to our DB + optional GitHub push.)
4. **Pro pricing** — $15 right, or test $9 / $19? (Decide post-beta with real conversion data.)
5. **How "agentic" is the MVP** — fully autonomous build vs. step-by-step approval for beginners? (Lean: step-by-step with narration for beginners = better learning; autonomous toggle for pros.)
6. **Mobile workspace depth** — how much building works on phone? (Lean: browse/learn/plan + light edits on mobile; serious build = desktop.)

## What I (the assistant) recommend we do next — concretely

1. **Push the current site live** + connect `embros.xyz` + add a Discord CTA. Start the 100.
2. **Two Phase-0 spikes in parallel:** (a) WebContainers preview inside `apps/web`; (b) Hermes running locally with OpenRouter free + a 1-endpoint FastAPI. These de-risk R1 + R4 + R6 before we commit.
3. Then build the **first magic moment** (idea → Builder agent writes a file → live preview), and grow from there per the roadmap.

> When in doubt, return to the thesis: *build the real thing, learn exactly what you need,
> remember the user.* If a feature doesn't serve that loop, it waits.
