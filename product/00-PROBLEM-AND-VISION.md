# 00 — Problem & Vision

## The problem (in the owner's words, sharpened)

People come out of school — high school, university, bootcamps — and **cannot build**.
Not because they're not smart. Because the world changed faster than education:

1. **They don't know how to use AI well.** They use ChatGPT like a search engine. They've never run an agent, never chained tools, never seen AI write and execute real code.
2. **They don't understand AI-augmented programming.** "Vibe coding" with Cursor looks magic until it breaks — and then they're lost, because they never learned *what's actually happening*.
3. **The pro tools punish beginners.** Cursor, Copilot, Claude Code, Codex, Antigravity are built **for developers who already know how to code**. A beginner opens Cursor, burns through paid requests, gets a wall of code they don't understand, and quits — poorer and no wiser.
4. **Learning and building are split.** Courses (Codecademy, Udemy) teach theory with toy exercises and no real product. Builder tools generate code with no teaching. Nobody connects the two.

**Net result:** a huge population that has ideas, ambition, and access to AI — but no bridge from "I want to build X" to "I built X *and I understand it*."

## Our thesis

> The winning product is **not** "a cheaper Cursor" and **not** "another course platform."
> It is the **first tool that lets you build the real thing you want, with agents, while
> teaching you exactly what you need at the exact moment you need it — and remembering
> you so it gets better every session.**

You don't learn to swim from a textbook. You don't learn to build from a course. You learn by building — *with a great mentor sitting next to you*. We are that mentor, at scale, for everyone, in EN and RO.

## What we are building

A **Cursor-class agentic coding environment** (web first, desktop + CLI later) with three things nobody has combined into one product:

1. **Agentic building** — predefined specialist agents that plan, write, debug, test and ship real code. Experienced users can add their own agents; others can share them.
2. **Just-in-time e-learning** — while you build, you get short, excellent lessons explaining *what you're doing, what's happening, and what to do next*, so you never lose the thread.
3. **Per-user memory (Ignis)** — a proprietary engine that remembers your projects, decisions and skill level, and keeps improving how it helps and teaches *you specifically*.

It must be **trivially easy for someone with zero clue**, and **powerful enough for a senior who just wants to ship faster**. Same product, adaptive depth.

## Why now

- Agents are production-ready (Claude, GPT, open models can plan/write/debug/explain at near-expert level).
- Free/cheap model access exists (OpenRouter free tier, owl-alpha) — we can run beta at ~$0.
- In-browser execution (WebContainers) and cheap sandboxes (E2B/Daytona/Modal) let beginners *run* code with no setup and near-zero infra cost.
- Open agent frameworks (Hermes Agent, MIT) give us a memory + agent runtime to fork instead of build from scratch.
- The "AI-native graduate" cohort is exploding and underserved.

## The one-liner

**EmbrOS — Build anything. Learn everything.** The AI builder OS that ships your idea *and* teaches you how it works.

## Non-negotiable principles

1. **Build-first, learn-as-you-go.** No prerequisite courses. The user's real project is the curriculum.
2. **Understand, don't just generate.** Every agent action is explainable; lessons are mandatory-available, not buried.
3. **Adaptive, not one-size.** Assistance levels 0→4. Fades as the user grows.
4. **Remembers you.** Memory is the moat. The more you build, the smarter it is about *you*.
5. **Beginner-trivial, pro-powerful.** Cover the whole spectrum in one product.
6. **Bilingual EN/RO** from day one — cultural adaptation, not just translation.
7. **Cheap to run.** Free models + local/in-browser execution. Our cost per free user ≈ $0.
8. **Ours, end to end.** Ignis is proprietary (white-labeled Hermes). The data + skill graph compound into a moat competitors can't copy.
