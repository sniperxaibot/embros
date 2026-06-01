# 10 — Roadmap & MVP

## The MVP cut (smallest thing that proves the core loop)

**Goal of MVP:** prove that *"agents build your real thing while teaching you, and it
remembers you"* works and delights — for a beginner, on the web, at ~$0 cost to us.

**MVP = ONE flow done well:**

> A beginner types an idea → agents build a small **web (HTML/CSS/JS or React)** app →
> it runs in the browser (WebContainers) → live preview → 2–4 just-in-time lessons fire
> on real concepts → user deploys to a live URL → skill graph saved.

### MVP scope (in)

- Landing + waitlist (DONE) + Discord funnel.
- Auth (DONE) + dashboard + project create.
- **Workspace:** chat/⌘K + Monaco + file tree + **live preview via WebContainers**.
- **Agents (real, via Ignis):** Orchestrator + Builder + Frontend + Debugger + Mentor (5 is enough). Streaming output + narration.
- **Learning v1:** skill graph (~40 web nodes) + gap detection + Mentor micro-lessons inline + assistance level (auto + slider). EN/RO.
- **Ignis v1:** forked Hermes running our 5 agents + per-user memory (project + skill graph) + OpenRouter free routing.
- **Deploy:** one-click to a static/preview host.
- Bilingual EN/RO throughout (landing already done).

### MVP scope (out — later)

- VS Code extension, CLI productionized, desktop app.
- Python/backend sandboxes (start with web/JS only).
- Custom agents + marketplace.
- Pro billing (waitlist-only / free during beta).
- Full 18-agent roster.

## Phases

### Phase 0 — NOW: Audience + foundation (weeks 0–2)
- ✅ Landing (gold/command-center, EN/RO, waitlist).
- **Discord server** live; waitlist → Discord funnel; "build in public."
- `git push` → Railway; connect `embros.xyz`.
- Spike: WebContainers hello-world in the web app. Spike: Hermes running locally with OpenRouter free.
- **Goal: first 100 waitlist/Discord users.**

### Phase 1 — MVP (weeks 2–8)
- Ignis service (forked Hermes, de-branded) with 5 agents + memory + free models, behind a FastAPI the web app calls.
- Workspace: editor + file tree + WebContainers preview + agent chat (streaming).
- Learning v1: skill graph + gap detection + inline lessons + assistance slider.
- One-click deploy.
- **Goal: end-to-end "idea → built → learned → shipped" for web apps. Onboard the 100 as beta testers.**

### Phase 2 — Pros + depth (months 2–4)
- CLI productionized (`embros`), VS Code extension.
- Remote sandboxes for Python/backends.
- Custom agents.
- Pro tier + billing; premium model option.
- Expand agent roster + content library; richer skill graph.

### Phase 3 — Scale (months 4–9)
- Desktop (Tauri).
- Agent marketplace.
- Deeper memory/personalization; analytics on learning outcomes.
- EU/RO grant applications; university pilots; more languages.

## What to build first, in order (engineering checklist)

1. [ ] Discord + waitlist→Discord funnel; push current site live; domain.
2. [ ] WebContainers preview spike in `apps/web`.
3. [ ] Fork Hermes → run locally with OpenRouter free → minimal FastAPI (`run_agent`, `stream`).
4. [ ] Web app talks to Ignis: 1 agent (Builder) writes a file, preview updates. **First magic moment.**
5. [ ] Add Orchestrator + Frontend + Debugger + Mentor; streaming narration in the right rail.
6. [ ] Skill graph JSON (40 nodes) + proficiency in Postgres.
7. [ ] Gap detection + Mentor micro-lesson card inline (EN/RO) + assistance slider.
8. [ ] One-click deploy.
9. [ ] Memory persistence + "continue where you left off" + skill map UI.
10. [ ] Onboard 100 beta users; iterate on the lesson quality + magic-moment time.

## North-star + guardrail metrics

- **North star:** weekly *builders who shipped + learned* (shipped a project AND closed ≥1 skill gap).
- **Activation:** % of new users who reach a running preview in <10 min.
- **Magic-moment time:** idea → first working preview (target < 5 min).
- **Learning:** lesson engagement, gap-close rate, assistance-level drift-up.
- **Cost guardrail:** $/free-user/month ≈ 0 (free models + in-browser exec).
- **Retention:** D7 / W4; projects per user.
