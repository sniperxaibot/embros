# 11 — Business Model & Go-To-Market

## Business model — freemium

| Tier | Price | Includes |
|------|-------|----------|
| **Free** | $0 | 1 active project, 3 agent runs/day, web workspace, in-browser run, starter courses, community, EN/RO. (Runs on free models + in-browser exec → ~$0 cost to us.) |
| **Pro** | ~$15/mo ($12 annual) | Unlimited projects, all agents, custom agents, CLI + VS Code + desktop, priority runs, premium-model option, deploy tools, full content library. |

Later: agent marketplace (rev share), team/edu licenses, certification, template marketplace.

## Why our economics work where incumbents struggle

- **Free models (OpenRouter) + in-browser/local execution** → marginal cost of a free user ≈ $0. Cursor/Replit burn paid inference + compute on every free user, so they must cap hard. We can be genuinely generous on Free, which is the whole acquisition engine for beginners.
- Pro converts the users who outgrow Free (more projects, premium models, local pro tools).

## Costs (lean)

- Inference: ~$0 in beta (free models). Premium only for paying Pro (their usage funds it).
- Compute: in-browser (WebContainers) = $0; remote sandboxes idle→$0, pennies when active.
- Infra: Railway (Postgres + app), small. Vector via pgvector on same DB.
- The expensive resource is **our build time**, not servers. Good — that's the lean path.

## Go-to-market: Discord-first, build-in-public

The owner is gathering users on Discord. Make that the engine:

### Phase 0 (now)
- **Discord server** as the home base: channels for `#build-in-public`, `#waitlist`, `#feedback`, `#show-your-build`, `#ro` + `#en`, `#lessons`, `#help`.
- Landing **waitlist → "join the Discord for early access + to shape it."** (Add a Discord CTA to the site.)
- **Build in public:** post progress (this very plan, screenshots, the agent loop) on X/LinkedIn/TikTok + Discord. The story ("teaching people to build with AI, in EN+RO") is the magnet.
- Goal: **first 100** engaged builders who become beta testers + evangelists.

### Phase 1–2
- Onboard the 100 into the MVP; turn their builds into case studies ("built X with EmbrOS, knew nothing").
- Romanian tech community + universities (bilingual edge): workshops "build your first product in 4 hours."
- Product Hunt launch when the loop delights.
- Content engine: short "watch an agent build + teach" clips (TikTok/Reels/Shorts) — visual, viral-friendly.

### Phase 3
- Paid acquisition once activation/retention are proven.
- B2B: company onboarding/training; "EmbrOS Certified Builder."
- More languages.

## Funding / grants (regional edge)

EmbrOS sits at the intersection of **EdTech + AI/DeepTech + digital inclusion + Romanian-language support** — strong fit for:
- EU: EIC Accelerator / SME Instrument, Digital Europe Programme.
- Romania: Start-Up Nation, regional innovation funds.
- Bilingual EN/RO + "democratizing building" is exactly the narrative these programs fund.

Keep the plan + traction (Discord, waitlist, shipped builds) as the grant evidence.

## Funnel

```
Build-in-public content (TikTok/X/LinkedIn) ─► Landing (waitlist)
        │                                            │
        ▼                                            ▼
   Discord community  ◄───────────────────────  "join for early access"
        │
        ▼
   Beta MVP (the 100) ─► shipped builds + case studies ─► more users ─► Pro conversions
```

## First 100 users — concrete plan

1. Ship the Discord + add a Discord/“early access” CTA to the live site.
2. Post the journey (3–5×/week): the problem, the agent loop, the EN/RO angle, demos.
3. DM/engage Romanian student + indie-hacker + "learn to code" communities.
4. Offer the 100 founding builders: free Pro for life / founder badge / shape the roadmap.
5. Turn their first shipped products into the marketing.
