# 07 — Agents

## Predefined agent roster (ship these)

Ported/expanded from `src/lib/agents.ts` (already written with full system prompts).
Each agent **teaches as it works** (narrates the "why") and respects the user's assistance level.

| # | Agent | Role |
|---|-------|------|
| 1 | **Orchestrator** | Plans, decomposes goals, assigns specialists, tracks progress. Never codes directly. |
| 2 | **Architect** | System design, tech-stack choice, DB schema, API contracts. |
| 3 | **Builder** | Full-stack code across files. |
| 4 | **Frontend** | UI/UX, components, responsive, accessible. |
| 5 | **Backend** | APIs, server logic, integrations, validation. |
| 6 | **Database** | Schema, migrations, queries (Prisma). |
| 7 | **Debugger** | Reads errors, finds root cause, fixes, teaches the *why*. |
| 8 | **Tester** | Unit/integration/E2E tests, coverage. |
| 9 | **Mentor** | Generates the just-in-time lessons; the teaching voice. |
| 10 | **RO Tutor** | Everything in natural Romanian; bilingual content. |
| 11 | **Deployer** | CI/CD, hosting, env, one-click deploy. |
| 12 | **QA Auditor** | Launch-readiness: quality, a11y, security basics. |
| 13 | **Research** | Market/tech research, compare options. |
| 14 | **Product Strategy** | MVP scope, validation frameworks. |
| 15 | **Course/Book Writer** | Extends the content library. |
| 16 | **Marketing** | Copy, launch, growth (for founders). |

(12 is plenty for MVP; the rest are "available," shown as the team grows.)

## Orchestration protocol

1. **Goal in** → Orchestrator decomposes into a task DAG (respect dependencies).
2. **Assign** each task to the best specialist (by capability) + an assistance level (from skill graph/ZPD).
3. **Run** (sequential or parallel subagents — Hermes supports subagent spawning).
4. **Narrate** every action (the explanation feed the user sees).
5. **Hand off** to Lesson Engine when a teachable moment fires.
6. **Escalate to human** on irreversible/ambiguous decisions (budget, destructive ops, unclear requirements). Agents never do destructive/irreversible actions without approval.

## Custom agents (for pros — P4)

A defining feature vs. closed tools. Experienced users can **define their own agents**:

- **Definition** = a structured spec (name, role, system prompt, tools/MCP allowed, model, capabilities, escalation rules). Author via UI form or a YAML/JSON file (agentskills.io-compatible, which Hermes already speaks).
- Custom agents run in the same orchestration as predefined ones.
- Use cases: "my company's code-style agent," "Django specialist," "shadcn UI agent," "my data-pipeline agent."

## Agent marketplace (later)

- Users publish custom agents; others install them.
- Curation + rating; optional revenue share (creator economy → moat + growth).
- Built on the same definition format. This is a Year-2 growth lever, designed-for now.

## Tools & models

- **Tools:** filesystem, run/exec (sandbox), package install, git, deploy, web fetch, MCP servers. Hermes ships 40+ tools + MCP; we expose a curated safe set to beginners and the full set to pros.
- **Models:** OpenRouter free + fallback (cost guard for Free tier). Pro can pick premium.

## Safety rules (bake in)

- Explain before acting, especially destructive ops.
- No irreversible action (delete data, change permissions, spend money, deploy to prod) without explicit user approval.
- Full audit trail of agent actions + user decisions (also feeds memory).
- User can interrupt/rollback any agent mid-task (checkpoints).
