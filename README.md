# 🔥 Forge

**Where ideas become real.**

Forge is an adaptive AI mentor platform that helps anyone with an idea build real products. Not through courses. Not through tutorials. Through **building** — with personalized, just-in-time AI guidance that teaches as it helps.

## The Problem

Millions of people leave schools, universities, and bootcamps without the ability to build. They have ideas, ambition, and access to AI — but they don't know how to start, what to learn, or how to ship.

Existing education is too slow. Traditional coding education is outdated. AI tools overwhelm beginners. The missing piece isn't intelligence — it's **guidance**.

## The Solution

Forge starts with one question: **"What do you want to build?"**

From there:
1. **Goal → Roadmap** — AI analyzes your idea and creates a personalized learning path
2. **Build + Learn** — AI agents guide you step by step, explaining as they help
3. **Adaptive Difficulty** — Complexity revealed only when you're ready
4. **Ship Real Products** — From idea to launched in weeks, not months

## Why "Forge"?

Like a blacksmith's forge, we transform raw ideas into refined, functional products through heat, pressure, and skill. Simple name. Strong purpose.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + custom design system (dark-first, ember accent)
- **UI**: Framer Motion for animations, Lucide icons
- **State**: Zustand
- **AI**: OpenRouter API (multi-model access)

## Quick Start

```bash
cd BuilderCompanion
cp .env.example .env
# Edit .env and add your OpenRouter API key
npm run dev
# Open http://localhost:3000
```

### Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_OPENROUTER_API_KEY` | Yes | Get yours at https://openrouter.ai → API Keys |

## Brand Guidelines

- **Colors**: `var(--forge-bg)` (#0a0a0b) dark bg, `var(--forge-ember)` (#f59e0b) accent
- **Fonts**: Inter (UI), JetBrains Mono (code)
- **Tone**: Direct, encouraging, no fluff. Like a skilled mentor who respects your time.
- **Design principles**: Dark-first, progressive disclosure, visible progress, zero overwhelm

## Project Structure

```
src/app/
├── globals.css       # Design system, Tailwind, animations, scrollbar
├── layout.tsx        # Root layout (dark mode, Inter font)
└── page.tsx          # Landing page + App shell (main file)
docs/                 # Research, strategy, architecture documents
```

## Roadmap

- [x] Landing page with brand identity
- [x] App shell with chat interface
- [x] OpenRouter AI integration
- [ ] Learning path sidebar (dynamic module generator)
- [ ] Multi-agent system (Developer, Designer, Tester, Research)
- [ ] User model / skill tracking
- [ ] Project workspace with code editor
- [ ] Deployment integration
- [ ] Pro tier features

## License

MIT
