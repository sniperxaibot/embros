# EmbrOS — Product Plan & Research

> The agentic builder + e-learning OS. Build real products with AI agents while it
> teaches you exactly what you need, remembers everything, and adapts from absolute
> beginner to senior. Powered by **Ignis** (our proprietary per-user agent engine).

This folder is the single source of truth for **what we are building and why**.
Read in order, or jump to what you need.

| # | Doc | What's inside |
|---|-----|---------------|
| — | [README.md](./README.md) | This index |
| 00 | [00-PROBLEM-AND-VISION.md](./00-PROBLEM-AND-VISION.md) | The real problem, our thesis, the one-line vision |
| 01 | [01-MARKET-AND-COMPETITION.md](./01-MARKET-AND-COMPETITION.md) | Cursor, Claude Code, Codex, Antigravity, Replit, Windsurf, Bolt, Lovable, Scrimba, Boot.dev — and the gap we own |
| 02 | [02-PERSONAS.md](./02-PERSONAS.md) | Who we serve, from "zero clue" to senior |
| 03 | [03-PRODUCT-OVERVIEW.md](./03-PRODUCT-OVERVIEW.md) | What the product *is* — surfaces, pillars, the core loop |
| 04 | [04-ARCHITECTURE.md](./04-ARCHITECTURE.md) | System architecture: front-ends, Ignis brain, execution sandboxes |
| 05 | [05-IGNIS-ENGINE.md](./05-IGNIS-ENGINE.md) | The brain: Hermes→Ignis, memory, model routing, agent runtime |
| 06 | [06-LEARNING-ENGINE.md](./06-LEARNING-ENGINE.md) | The twist: just-in-time lessons, weakness detection, skill graph, assistance levels |
| 07 | [07-AGENTS.md](./07-AGENTS.md) | Predefined agents, custom agents, orchestration, marketplace |
| 08 | [08-UX-AND-FLOWS.md](./08-UX-AND-FLOWS.md) | Onboarding, the build+learn UI, beginner vs pro modes |
| 09 | [09-TECH-STACK-DECISIONS.md](./09-TECH-STACK-DECISIONS.md) | Web vs VS Code fork vs desktop vs CLI — decided, with reasons |
| 10 | [10-ROADMAP-AND-MVP.md](./10-ROADMAP-AND-MVP.md) | Phased build plan + the exact MVP cut |
| 11 | [11-BUSINESS-AND-GTM.md](./11-BUSINESS-AND-GTM.md) | Pricing, costs, Discord-first go-to-market, grants |
| 12 | [12-RISKS-AND-OPEN-QUESTIONS.md](./12-RISKS-AND-OPEN-QUESTIONS.md) | What can kill us, and what we still need to decide |

## TL;DR in five sentences

1. **Problem:** people leaving school (and most non-devs) don't know how to build with AI — they don't understand agents, AI-augmented programming, or what's happening under the hood, and tools like Cursor make them spend money/time before they understand anything.
2. **Solution:** a Cursor-class agentic builder where, *while you build the thing you actually want*, short high-quality lessons explain what you're doing and why — so you ship AND understand.
3. **Twist:** per-user memory + a skill graph that makes it teach *you* specifically, predefined agents you can extend, and a proprietary engine (**Ignis**) underneath.
4. **Coverage:** dead-simple for total beginners, powerful enough for seniors — one product, adaptive assistance levels.
5. **Plan:** ship a free web MVP fast (keep our costs ~$0 via free models + in-browser execution), gather the first 100 builders on Discord, then add desktop/CLI for pros.

## Naming & secrecy (must-follow)

- Product = **EmbrOS** (embros.xyz). Engine (public-facing name) = **Ignis**.
- **Ignis is built on a fork of Hermes Agent (Nous Research).** Never mention Hermes / Nous publicly — UI, marketing, repo, commits, packages. White-labeled as ours. (See 05.)
- AI = **OpenRouter, free models only** for now, with fallback chain. Stay free for us.
