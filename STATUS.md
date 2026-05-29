# FORGE - Project Status

## Current State: v0.2.0 - Core Platform Built

### What Works
- Landing page (premium dark design, mobile-first, animated)
- Onboarding flow (name + idea selection)
- Dashboard (project creation, skill map, quick actions)
- 7 distinct views: landing, onboarding, dashboard, IDE, courses, books, prompts, templates
- Zustand state management with localStorage persistence
- 18 AI agents with full system prompts
- 10 courses with real content (EN + RO)
- 5 books with structured chapters (EN + RO)
- 10 reusable prompts
- 10 project templates
- OpenRouter AI client with provider abstraction
- Clean production build (12.6KB bundle)

### How to Run
```bash
cd C:\Users\kodesweb3\Desktop\BuilderCompanion
npm run dev
# Open http://localhost:3000
```

### Project Structure
```
src/
  app/
    page.tsx          # Main app with all views
    layout.tsx        # Root layout + PWA manifest
    globals.css       # Tailwind + custom design system
  types/
    index.ts          # All TypeScript interfaces
  store/
    index.ts          # Zustand global state
  lib/
    ai-client.ts      # OpenRouter AI client
    agents.ts         # 18 agent definitions
  data/
    courses.ts        # 10 courses with content
    books.ts          # 5 books with chapters
    prompts.ts        # 10 reusable prompts
    templates.ts      # 10 project templates
```

### Key Design Decisions
- **State**: Zustand with persist middleware (localStorage)
- **AI**: OpenRouter with multi-model rotation, provider abstraction layer
- **Styling**: Tailwind CSS, dark-first (#0a0a0b), amber accent (#f59e0b)
- **Architecture**: Single-page app with view switching (no router needed yet)
- **Bilingual**: English + Romanian (EN default, RO translations stored)

### Next Priority
1. Full Monaco editor IDE with file tree and AI chat
2. Supabase backend integration
3. Deploy to Vercel
4. Get first users

### Known Issues
- Romanian diacritics in TypeScript files can cause encoding issues on Windows
- Monaco editor not yet integrated into the IDE panel
- No real backend (all client-side mock data)
- AI chat uses mock responses when API key is not configured
