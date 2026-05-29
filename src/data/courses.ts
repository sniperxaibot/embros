// ═══════════════════════════════════════════════════
// FORGE — Courses Data
// 10 courses with real content, bilingual support
// ═══════════════════════════════════════════════════

import type { Course } from '../types/index'

export const COURSES: Course[] = [
  {
    id: 'course-1',
    slug: 'ai-builder-foundations',
    title: 'AI Builder Foundations',
    titleRo: 'Fundamentele Builderului AI',
    description: 'Learn the fundamentals of building software with AI. No coding experience required. Start from zero and build your first real project.',
    descriptionRo: 'Învață fundamentele construcției de software cu AI. Nu e necesară experiență de codare. Pornește de la zero și construiește primul tău proiect real.',
    icon: '🏗️',
    color: '#f59e0b',
    level: 'beginner',
    estimatedHours: 8,
    tags: ['beginner', 'ai', 'foundations', 'no-code'],
    totalLessons: 12,
    modules: [
      {
        id: 'mod-1-1',
        title: 'Welcome to the AI Builder Era',
        titleRo: 'Bine ai venit în Era Builderului AI',
        order: 1,
        lessons: [
          {
            id: 'l-1-1-1',
            slug: 'what-is-ai-building',
            title: 'What Is AI Building?',
            titleRo: 'Ce este Construcția cu AI?',
            type: 'explanation',
            estimatedMinutes: 15,
            content: `# What Is AI Building?

AI building means creating software, websites, apps, and digital products by working together with AI agents. Instead of typing every line of code yourself, you **describe what you want** and the AI helps you build it.

## The Old Way vs The New Way

**Old way:** Learn to code for months → Write every line yourself → Debug for hours → Ship after weeks

**New way:** Describe your idea → AI generates code → You review and customize → Ship in days

## Key Concepts

### 1. You Are the Architect
You decide WHAT to build and WHY. The AI handles the HOW. You're the creative director, not the typist.

### 2. AI Is Your Builder
AI agents can create files, write code, fix bugs, and explain anything. Think of them as a team of developers available 24/7.

### 3. You Learn by Doing
Instead of watching 100 hours of tutorials, you learn by building real projects. Each lesson connects to something you're actually making.

## Your First Mental Model

Think of building with AI like cooking with a sous chef:
- **You** decide the menu, taste, and presentation
- **The sous chef** chops, preps, and follows recipes
- **Together** you create something amazing
- **You** learn cooking along the way

## What You'll Build in This Course

By the end of this course, you'll have:
- A working landing page
- A functional web app
- An AI chatbot
- The confidence to build anything

Let's forge something! 🔥`,
            contentRo: `# Ce este Construcția cu AI?

Construcția cu AI înseamnă crearea de software, site-uri web, aplicații și produse digitale prin colaborare cu agenții AI. În loc să scriecare linie de cod singur, tu **descrieți ce vrei** și AI te ajută să construiești.

## Vechea Metodă vs Noua Metodă

**Vechea metodă:** Învață să codezi luni → Scrie fiecare linie singur → Debug ore → Lansează după săptămâni

**Noua metodă:** Descrie ideea → AI generează cod → Tu revizuiești → Lancezi în zile

## Concepte Cheie

### 1. Tu Ești Arhitectul
Tu decizi CE să construiești și DE CE. AI gestionează CUM. Ești directorul creativ, nu dactilografistul.

### 2. AI Este Builderul Tău
Agenții AI pot crea fișiere, scriecod, repara bug-uri și explica orice. Gândește-te la ei ca o echipă de developeri disponibili 24/7.

### 3. Înveți Făcând
În loc să urmărești 100 de ore tutoriale, înveți construind proiecte realecare. Fiecare lecție se conectează la ceva ce facide fapt.

## Primul Tău Model Mental

Gândește-te la construirea cu AI ca la gătitul cu un sous chef:
- **Tu** meniul, gustul, prezentarea
- **Sous chef-ul** taie, pregătește, urmește rețete
- **Împreună** creați ceva uimitor
- **Tu** înveți să gătești pe drum

## Ce Vei Construi în Acest Curs

La finalul cursului vei avea:
- O landing page funcțională
- O aplicație web funcțională
- Un chatbot AI
- Încrederea să construiești orice

Hai să forjăm ceva! 🔥`,
          },
          {
            id: 'l-1-1-2',
            slug: 'your-first-project',
            title: 'Your First Project',
            titleRo: 'Primul Tău Proiect',
            type: 'builder',
            estimatedMinutes: 30,
            content: `# Your First Project: Build a Personal Landing Page

Let's build your first real project right now. This isn't a toy example — it's something you can actually use and customize.

## What We're Building
A beautiful personal landing page with:
- Your name and tagline
- About section
- Skills/Interests
- Contact section
- Dark, modern design

## Step 1: Describe Your Vision

Open the Forge editor and tell the AI:

"Create a personal landing page for me. My name is [Your Name]. I'm interested in [your interests]. Make it dark and modern with amber accents."

## Step 2: Review the Generated Files

The AI will create:
- \`index.html\` — The page structure
- \`style.css\` — The styling
- \`script.js\` — Interactive elements

## Step 3: Customize It

Change the colors, text, and layout to match YOUR style. Ask the AI:
- "Make the hero section bigger"
- "Add a projects section"
- "Change the font to something more modern"

## Step 4: Preview and Ship

Use the Preview tab to see your page. When you're happy:
- Download the files
- Deploy to Vercel (free)
- Share your link!

## What You Just Learned
- How to describe a project to AI
- How to review generated code
- How to iterate and customize
- How to preview and deploy

This is the core loop of AI building. You'll use it for everything!`,
            contentRo: `# Primul Tău Proiect: Construiește-ți o Landing Page Personală

Hai să construim primul tău proiect chiar acum. Nu e un exemplu de jucărie — e ceva ce poți folosi și personaliza.

## Ce Construim
O landing page frumoasă cu:
- Numele și tagline-ul tău
- Secțiunea Despre
- Abilități/Interese
- Secțiune de contact
- Design modern, întunecat

## Pasul 1: Descrie Viziunea

Deschide editorul Forge și spune AI-ului:

"Creează o landing page pentru mine. Numele meu e [Numele Tău]. Mă interesează [interesele tale]. Să fie întunecată și modernă cu accente galben-portocalii."

## Pasul 2: Revizuiește Fișierele Generate

AI-ul va crea:
- \`index.html\` — Structura paginii
- \`style.css\` — Stilizarea
- \`script.js\` — Elemente interactive

## Pasul 3: Personalizează

Schimbă culorile, textul, layout-ul. Întreabă AI-ul:
- "Fă secțiunea hero mai mare"
- "Adaugă o secțiune de proiecte"
- "Schimbă fontul ceva mai modern"

## Pasul 4: Previzualizează și Lansează

Folosește tab-ul Preview. Când ești mulțumit:
- Descarcă fișierele
- Deploy pe Vercel (gratis)
- Împărtășește link-ul!

## Ce Ai Învățat
- Cum să descrii un proiect AI-ului
- Cum să revizuiești cod generat
- Cum să iterezi și personalizezi
- Cum să previzualizezi și lansezi

Acesta este loop-ul principal al construcției cu AI!`,
          },
        ],
      },
    ],
  },
  {
    id: 'course-2',
    slug: 'ai-assisted-programming',
    title: 'AI-Assisted Programming',
    titleRo: 'Programare Asistată de AI',
    description: 'Learn to write code with AI as your pair programmer. Covers HTML, CSS, JavaScript, and how to use AI to learn any language.',
    descriptionRo: 'Învață să scrii cod cu AI ca pair programmer. Acoperă HTML, CSS, JavaScript și cum să folosești AI pentru a învăța orice limbaj.',
    icon: '💻',
    color: '#3b82f6',
    level: 'beginner',
    estimatedHours: 10,
    tags: ['programming', 'html', 'css', 'javascript', 'beginner'],
    totalLessons: 15,
    modules: [
      {
        id: 'mod-2-1',
        title: 'Thinking Like a Developer',
        titleRo: 'Gândind ca un Developer',
        order: 1,
        lessons: [
          {
            id: 'l-2-1-1',
            slug: 'how-code-works',
            title: 'How Code Works (Without the Jargon)',
            titleRo: 'Cum Funcționează Codul (Fără Jargon)',
            type: 'explanation',
            estimatedMinutes: 20,
            content: `# How Code Works (Without the Jargon)

Code is just instructions for a computer. That's it. Let's break down the three languages that build every website.

## HTML — The Structure
HTML is like the skeleton of a page. It defines what's on the page.

\`\`\`html
<h1>Welcome to My Site</h1>
<p>This is a paragraph of text.</p>
<button>Click Me</button>
\`\`\`

Think of HTML as the **nouns** — the things that exist.

## CSS — The Style
CSS is like the paint and decoration. It makes things look good.

\`\`\`css
h1 {
  color: #f59e0b;
  font-size: 3rem;
  font-weight: bold;
}

button {
  background: #f59e0b;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
}
\`\`\`

Think of CSS as the **adjectives** — how things look.

## JavaScript — The Behavior
JavaScript makes things interactive. It's the brain.

\`\`\`javascript
button.addEventListener('click', () => {
  alert('You clicked me!')
})
\`\`\`

Think of JavaScript as the **verbs** — what things do.

## How AI Helps

Instead of memorizing all this, you can:
1. **Describe** what you want in plain English
2. **AI writes** the HTML, CSS, and JS
3. **You read** the code to understand it
4. **You modify** it to learn

This is how professional developers work with AI today. You're learning the real workflow!`,
            contentRo: `# Cum Funcționează Codul (Fără Jargon)

Codul e doar instrucțiuni pentru un calculator. Asta e tot. Să cele trei limbaje care construiesc fiecare site.

## HTML — Structura
HTML e scheletul paginii. Definește ce e pe pagină.

\`\`\`html
<h1>Bine ai venit pe Site-ul Meu</h1>
<p>Acesta este un paragraf de text.</p>
<button>Click Aici</button>
\`\`\`

Gândește-te la HTML ca la **substantive** — lucrurile care există.

## CSS — Stilul
CSS e vopseaua și decorațiunea. Face lucrurile să arate bine.

\`\`\`css
h1 {
  color: #f59e0b;
  font-size: 3rem;
  font-weight: bold;
}

button {
  background: #f59e0b;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
}
\`\`\`

Gândește-te la CSS ca la **adjective** — cum arată lucrurile.

## JavaScript — Comportamentul
JavaScript face lucrurile interactive. E creierul.

\`\`\`javascript
button.addEventListener('click', () => {
  alert('Ai dat click!')
})
\`\`\`

Gândește-te la JavaScript ca la **verbe** — ce fac lucrurile.

## Cum Ajută AI

În loc să memorezi toată asta, poți:
1. **Descrie** ce vrei în engleză simplă
2. **AI scrie** HTML, CSS și JS
3. **Tu citești** codul să înțelegi
4. **Tu modifici** pentru a învăța

Așa lucrează developerii profesioniști cu AI astaZi. Înveți workflow-ul real!`,
          },
        ],
      },
    ],
  },
  {
    id: 'course-3',
    slug: 'prompt-engineering',
    title: 'Prompt Engineering for Real Software',
    titleRo: 'Prompt Engineering pentru Software Real',
    description: 'Master the art of writing prompts that get AI to build exactly what you want. Practical techniques for real projects.',
    descriptionRo: 'Stăpânește arta scrierii de prompturi care fac AI să construiască exact ce vrei. Tehnici practice pentru proiecte reale.',
    icon: '✍️',
    color: '#a855f7',
    level: 'beginner',
    estimatedHours: 6,
    tags: ['prompts', 'ai', 'communication', 'productivity'],
    totalLessons: 10,
    modules: [
      {
        id: 'mod-3-1',
        title: 'The Art of Prompting',
        titleRo: 'Arta Prompturilor',
        order: 1,
        lessons: [
          {
            id: 'l-3-1-1',
            slug: 'anatomy-of-a-great-prompt',
            title: 'Anatomy of a Great Prompt',
            titleRo: 'Anatomia unui Prompt Excelent',
            type: 'explanation',
            estimatedMinutes: 20,
            content: `# Anatomy of a Great Prompt

A great prompt has 4 parts. Remember: **C.R.A.F.T.**

## C — Context
Tell AI what project you're working on and what you've done so far.

❌ "Make a button"
✅ "I'm building a dark-themed landing page. I have index.html and style.css. I need a hero section CTA button."

## R — Role
Tell AI what expert to be.

❌ "Write code"
✅ "You are a senior frontend developer. Write clean, accessible React code."

## A — Action
Be specific about what you want.

❌ "Fix it"
✅ "The button's hover state isn't working. The color should transition from #f59e0b to #fbbf24 over 200ms."

## F — Format
Tell AI how to respond.

❌ "Help me"
✅ "Respond with the complete file content. Include comments explaining each section."

## T — Tone
Set the communication style.

❌ "Explain this"
✅ "Explain this like I'm a curious beginner who knows basic HTML but is new to JavaScript."

## The Magic Formula

\`\`\`
[Context] I'm building [project]. Currently [state].

[Role] Act as a [expert type].

[Action] I need you to [specific task].

[Format] Respond with [format].

[Tone] Explain like [audience].
\`\`\`

## Practice Exercise

Write a prompt that asks AI to create a responsive navigation bar with:
- Logo on the left
- Links on the right
- Mobile hamburger menu
- Dark theme with amber accents

Use the C.R.A.F.T. formula!`,
            contentRo: `# Anatomia unui Prompt Excelent

Un prompt excelent are 4 părți. Ține minte: **C.R.A.F.T.**

## C — Context
Spune-i AI-ului la ce proiect lucrezi și ce ai făcut până acum.

❌ "Fă un buton"
✅ "Construiesc o landing page dark. Am index.html și style.css. Am nevoie de un buton CTA în secțiunea hero."

## R — Rol
Spune-i AI-ului ce expert să fie.

❌ "Scrie cod"
✅ "Ești un frontend developer senior. Scrie cod React curat și accesibil."

## A — Acțiune
Fii specific despre ce vrei.

❌ "Repară-l"
✅ "Starea hover a butonului nu funcționează. Culoarea trebuie să tranziționeze de la #f59e0b la #fbbf24 în 200ms."

## F — Format
Spune-i AI-ului cum să răspundă.

❌ "Ajută-mă"
✅ "Răspunde cu conținutul complet al fișierului. Include comentarii care explică fiecare secțiune."

## T — Ton
Setează stilul de comunicare.

❌ "Explică asta"
✅ "Explică ca și cum aș fi un începător curios care știe HTML de bază dar e nou în JavaScript."

## Formula Magică

\`\`\`
[Context] Construiesc [proiect]. Momentan [stare].

[Role] Acționează ca [tip expert].

[Action] Am nevoie să [sarcină specifică].

[Format] Răspunde cu [format].

[Tone] Explică ca pentru [public].
\`\`\`

## Exercițiu

Scrie un prompt care cere AI-ului să creeze un nav bar responsive cu:
- Logo stânga
- Link-uri dreapta
- Meniu hamburger mobil
- Temă întunecată cu accente galben-portocalii

Folosește formula C.R.A.F.T.!`,
          },
        ],
      },
    ],
  },
  {
    id: 'course-4',
    slug: 'agentic-development',
    title: 'Agentic Development',
    titleRo: 'Dezvoltare Agentică',
    description: 'Learn to build with multiple AI agents working together. Orchestration, delegation, and multi-agent workflows.',
    descriptionRo: 'Învață să construiești cu mai mulți agenți AI care lucrează împreună. Orchestrare, delegare și workflow-uri multi-agent.',
    icon: '🤖',
    color: '#10b981',
    level: 'intermediate',
    estimatedHours: 12,
    tags: ['agents', 'orchestration', 'workflow', 'advanced'],
    totalLessons: 14,
    modules: [],
  },
  {
    id: 'course-5',
    slug: 'human-in-the-loop',
    title: 'Human-in-the-Loop Systems',
    titleRo: 'Sisteme Human-in-the-Loop',
    description: 'Design systems where AI and humans collaborate effectively. When to automate, when to review, and how to stay in control.',
    descriptionRo: 'Proiectează sisteme unde AI și oamenii colaborează eficient. Când să automatizezi, când să revizuiești și cum să rămâi în control.',
    icon: '🔄',
    color: '#f97316',
    level: 'intermediate',
    estimatedHours: 8,
    tags: ['human-in-the-loop', 'workflow', 'ai', 'control'],
    totalLessons: 10,
    modules: [],
  },
  {
    id: 'course-6',
    slug: 'autonomous-coding',
    title: 'Autonomous Coding Workflows',
    titleRo: 'Workflow-uri de Codare Autonomă',
    description: 'Set up AI agents that can code, test, and deploy with minimal supervision. Build your own autonomous development pipeline.',
    descriptionRo: 'Configurează agenți AI care pot codea, testa și deploya cu supervizare minimă. Construiește-ți propriul pipeline de dezvoltare autonomă.',
    icon: '⚡',
    color: '#ef4444',
    level: 'advanced',
    estimatedHours: 10,
    tags: ['autonomous', 'pipeline', 'ci-cd', 'advanced'],
    totalLessons: 12,
    modules: [],
  },
  {
    id: 'course-7',
    slug: 'mcp-agents',
    title: 'MCP and Tool-Connected Agents',
    titleRo: 'MCP și Agenți Conectate la Unelte',
    description: 'Master Model Context Protocol. Connect AI agents to databases, APIs, file systems, and external tools.',
    descriptionRo: 'Stăpânește Model Context Protocol. Conectează agenții AI la baze de date, API-uri, sisteme de fișiere și unelte externe.',
    icon: '🔌',
    color: '#06b6d4',
    level: 'advanced',
    estimatedHours: 14,
    tags: ['mcp', 'tools', 'apis', 'integration'],
    totalLessons: 16,
    modules: [],
  },
  {
    id: 'course-8',
    slug: 'building-saas',
    title: 'Building SaaS with AI',
    titleRo: 'Construirea SaaS cu AI',
    description: 'Complete guide to building a SaaS product from idea to launch using AI agents. Covers architecture, auth, payments, and deployment.',
    descriptionRo: 'Ghid complet pentru construirea unui produs SaaS de la idee la lansare folosind agenți AI. Acoperă arhitectură, auth, plăți și deployment.',
    icon: '🏢',
    color: '#8b5cf6',
    level: 'intermediate',
    estimatedHours: 20,
    tags: ['saas', 'nextjs', 'auth', 'payments', 'deployment'],
    totalLessons: 20,
    modules: [],
  },
  {
    id: 'course-9',
    slug: 'building-bots',
    title: 'Building Bots and Automations',
    titleRo: 'Construirea de Boți și Automatizări',
    description: 'Create Telegram bots, Discord bots, Slack automations, and workflow automations with AI assistance.',
    descriptionRo: 'Creează boți Telegram, Discord, automatizări Slack și workflow-uri automatizate cu asistență AI.',
    icon: '🤖',
    color: '#ec4899',
    level: 'beginner',
    estimatedHours: 8,
    tags: ['bots', 'telegram', 'discord', 'automation'],
    totalLessons: 10,
    modules: [],
  },
  {
    id: 'course-10',
    slug: 'launching-products',
    title: 'Launching Products with AI',
    titleRo: 'Lansarea de Produse cu AI',
    description: 'The complete launch playbook. From MVP to first 100 users. Marketing, positioning, and growth with AI.',
    descriptionRo: 'Playbook-ul complet de lansare. De la MVP la primii 100 de utilizatori. Marketing, poziționare și creștere cu AI.',
    icon: '🚀',
    color: '#22c55e',
    level: 'intermediate',
    estimatedHours: 10,
    tags: ['launch', 'marketing', 'growth', 'mvp'],
    totalLessons: 12,
    modules: [],
  },
]

export function getCourse(slug: string): Course | undefined {
  return COURSES.find(c => c.slug === slug)
}

export function getCoursesByTag(tag: string): Course[] {
  return COURSES.filter(c => c.tags.includes(tag))
}

export function getCoursesByLevel(level: string): Course[] {
  return COURSES.filter(c => c.level === level)
}
