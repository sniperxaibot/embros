# 02 — Personas

We must serve a wide spectrum **without a mode switch that feels like two products**.
The single mechanism that makes this possible is **adaptive assistance levels** (see 06):
the same UI, but how much the agent does vs. guides vs. teaches changes per user and per task.

## P1 — "Zero clue" (primary wedge)

- **Who:** just finished school / non-technical, never coded, maybe used ChatGPT a few times.
- **Goal:** "I have an idea (a site, a small app, a bot) and I want it real."
- **Pain:** Cursor/Replit are overwhelming; tutorials are boring and don't lead to *their* thing.
- **What they need from us:**
  - One input: "what do you want to build?" → agents start, nothing to install.
  - Agents do most of the work (assistance Level 0–1) but **narrate**: "I'm adding a login form because…"
  - Constant, tiny lessons: "This is HTML. It's the skeleton of a page. 40 sec →"
  - A visible result fast (running preview) — dopamine, proof it's real.
  - Never see a terminal/error wall unless they ask.
- **Success:** ships a first real, deployed thing in days; can explain roughly how it works; comes back.

## P2 — Career changer / serious learner

- **Who:** wants a tech job or to go independent; will put in hours.
- **Goal:** real skills + a portfolio of shipped products, not certificates.
- **What they need:** the loop with *rising* assistance levels (2–3) — the agent shows, they try, it reviews. A skill graph that proves growth. Bilingual content for depth.
- **Success:** measurable skill growth, 3–5 shipped projects, confidence to build solo.

## P3 — Hobbyist / founder (non-technical)

- **Who:** domain expert with an idea; wants an MVP without hiring devs.
- **Goal:** validate + launch fast; learn *enough* to maintain it.
- **What they need:** agents that ship a real MVP (Level 0–1) + just enough lessons to not be helpless. Deploy + iterate.
- **Success:** live MVP, can make small changes themselves, decides whether to invest more.

## P4 — Experienced developer (power user, retention + credibility)

- **Who:** already codes; wants speed and leverage.
- **Goal:** ship faster, automate their workflow, maybe build/sell custom agents.
- **What they need:**
  - Pro surfaces: **CLI** (Claude-Code-style) + **VS Code extension** on their own machine and files.
  - Full agent control, **define custom agents**, MCP tools, model choice.
  - Learning **off by default** (they can toggle "explain" when in unfamiliar territory).
  - Memory that actually helps across their real repos.
- **Success:** uses it daily, publishes a custom agent, brings teammates.

## Design implication

| | Beginner (P1/P2/P3) | Pro (P4) |
|---|---|---|
| Default surface | **Web app** (guided, preview-first) | **CLI + VS Code extension** (local) |
| Default assistance | Level 0–2 (do-for-me → show-me) | Level 4 (do-it-yourself, agent on demand) |
| Lessons | On, frequent, short | Off by default, on-demand |
| Agents | Predefined, curated | Predefined **+ custom + marketplace** |
| Execution | In-browser / managed sandbox | Local machine |
| Memory | Skill graph + project history | Project/repo context + preferences |

**One brain (Ignis), many doors.** The web app and the pro surfaces are different front-ends over the same per-user engine, so a beginner who grows into a pro keeps their memory and skill graph.
