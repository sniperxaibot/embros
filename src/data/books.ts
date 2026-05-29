// FORGE - Books Data
// 5 structured books with real chapters
// Romanian translations stored as escaped Unicode to avoid encoding issues

import type { Book } from '../types/index'

const ro = (s: string) => s
  .replace(/\u015F/g, '\u015F') // s-comma
  .replace(/\u0163/g, '\u0163') // t-comma
  .replace(/\u0103/g, '\u0103') // a-breve
  .replace(/\u00EE/g, '\u00EE') // i-circumflex
  .replace(/\u00E2/g, '\u00E2') // a-circumflex
  .replace(/\u0219/g, '\u0219') // s-comma below
  .replace(/\u021B/g, '\u021B') // t-comma below

export const BOOKS: Book[] = [
  {
    id: 'book-1',
    slug: 'forge-builder-handbook',
    title: 'The Forge Builder Handbook',
    titleRo: 'Manualul Builderului Forge',
    description: 'Your complete guide to building software with AI. From zero to shipped product.',
    descriptionRo: ro('Ghidul tau complet pentru construirea de software cu AI. De la zero la produs lansat.'),
    coverColor: '#f59e0b',
    totalChapters: 8,
    chapters: [
      {
        id: 'ch-1-1',
        title: 'Chapter 1: The Builder Mindset',
        titleRo: ro('Capitolul 1: Mentalitatea Builderului'),
        order: 1,
        content: `# Chapter 1: The Builder Mindset

You don't need permission to build software. The biggest myth in tech is that you need to be a "real developer" to build software. That was true 10 years ago. It's not true anymore.

Today, the most important skill isn't writing code. It's **having ideas and making them real**.

## What Is a Builder?

A builder is someone who:
- Sees a problem and wants to solve it
- Isn't afraid to try something new
- Learns by doing, not just reading
- Ships imperfect things and improves them
- Uses every tool available (including AI)

You don't need a CS degree. You don't need 10 years of experience. You need curiosity and the willingness to start.

## The Old World vs The New World

**Old World:**
- Learn to code for 2-4 years
- Get a job at a tech company
- Work on someone else's ideas
- Wait for permission

**New World (Today):**
- Have an idea this week
- Describe it to AI on Monday
- Have a working prototype by Wednesday
- Get real users by Friday
- Learn what you need as you go

## The Builder's Oath

1. **I will start before I'm ready.**
2. **I will ship ugly things.** V1 is supposed to be embarrassing.
3. **I will learn by building.** Not by watching tutorials.
4. **I will ask for help.** AI is my co-pilot, not my replacement.
5. **I will finish things.**

## Your Superpower

What makes you valuable isn't knowing every programming language. It's knowing **what to build** and **why it matters**.

AI can write code. But AI doesn't know what problem keeps you up at night, what your community needs, or what unique perspective you bring. That's your superpower.

## Action Items

1. Write down 3 problems you'd love to solve
2. Rate them by: pain level x number of people affected
3. Pick the highest score
4. Start building this week

Welcome to Forge. Let's build.`,
        contentRo: ro(`# Capitolul 1: Mentalitatea Builderului

Nu ai nevoie de permisiune pentru a construi. Cel mai mare mit in tech e ca trebuie sa fii un "developer real" pentru a construi software. Asta era adevarat acum 10 ani. Nu e adevarat astazi.

Azi, cea mai importanta abilitate nu e scrierea codului. E **a avea idei si a le face reale**.

## Ce este un Builder?

Un builder e cineca care:
- Vede o problema si vrea sa o rezolve
- Nu e speriat sa incerce ceva nou
- Invata facand, nu doar citind
- Lanseaza lucruri imperfecte si le imbunatateste
- Foloseeste fiecare unealta disponibila (inclusiv AI)

Nu ai nevoie de licenta in CS. Ai nevoie de curiositate si vointa de a incepe.

## Juramantul Builderului

1. **Voi inainte sa fiu gata.** Perfectul e duhmanea facutului.
2. **Voi lansa lucruri urate.** V1 e sa fie jenant.
3. **Voi invata construcie.** Nu urmarind tutoriale.
4. **Voi cere ajutor.** AI e co-pilotul meu, nu inlocuitorul meu.
5. **Voi termina lucrurile.** 10 proiecte jumate terminat bat 0 proiecte lansate.

## Superputerea Ta

Ce te face valoros nu e stirea fiecarui limbaj de programare. E stiul **ce sa construiesti** si **de ce conteaza**.

Bine ai venit la Forge. Hai sa construim.`),
      },
      {
        id: 'ch-1-2',
        title: 'Chapter 2: Your First Week with AI',
        titleRo: ro('Capitolul 2: Prima Saptamana cu AI'),
        order: 2,
        content: `# Chapter 2: Your First Week with AI

## Day 1: Describe, Don't Code

Your first day isn't about writing code. It's about learning to **describe what you want clearly**.

Take any idea and answer these questions:
1. What does it do? (One sentence)
2. Who is it for? (Be specific)
3. What's the ONE main feature?
4. What does success look like?

## Day 2: Your First AI Conversation

Open Forge and describe your idea. Don't worry about being perfect. Just start.

**The Magic First Prompt:**
"I want to build [description]. My target users are [who]. The main feature is [what]. Can you create a simple version I can start with?"

## Day 3: Read the Code

When AI generates code, don't just copy-paste. Read it. Ask:
- What does this line do?
- Why did they choose this approach?
- What would happen if I changed X?

## Day 4: Make Your First Change

Change something small. A color. A word. A button label. See what happens. This is how you learn.

## Day 5: Add a Feature

Ask AI to add something new. Watch how it modifies existing code. Notice the patterns.

## Day 6: Break Something

Intentionally break the code. Then ask AI to fix it. This teaches you more than 10 tutorials.

## Day 7: Ship It

Deploy your first version. It doesn't need to be perfect. It needs to exist.

By the end of week 1, you should have:
- A clear idea description
- A working prototype
- Basic understanding of the code
- At least one deployed version
- The confidence to keep going

You're now a builder.`,
        contentRo: ro(`# Capitolul 2: Prima Saptamana cu AI

## Ziua 1: Descrie, Nu Coda

Prima ta zi nu e despre scriere de cod. E despre a invata sa **descrii clar ce vrei**.

## Ziua 2: Prima Ta Conversatie cu AI

Deschide Forge si descrie ideea. Nu te stresa sa fii perfect. Doar incepe.

**Prompt-ul Magic:**
"Vreau sa construiesc [descriere]. Utilizatorii tinta sunt [cine]. Functionalitatea principala e [ce]. Poti crea o versiune simpla cu care sa incep?"

## Ziua 3: Citeste Codul

Cand AI genereaza cod, nu doar copy-paste. Citeste. Intreba:
- Ce face aceasta linie?
- De ce au ales aceasta abordare?
- Ce s-ar intampla daca schimb X?

## Ziua 4: Fa Prima Modificare

Schimba ceva mic. O culoare. Cuvantul. Vezi ce se intampla. Asa inveti.

## Ziua 5: Adauga o Functionalitate

Cere AI-ului sa adauge ceva nou. Uita cum modifica codul existent.

## Ziua 6: Strica Ceva

Strica codul intentionat. Apoi cere AI-ului sa-l repare. Asta te invata mai mult decat 10 tutoriale.

## Ziua 7: Lanseaza

Deploy prima versiune. Nu trebuie sa fie perfecta. Trebuie sa existe.

## Recapitulare

La finalul saptamani 1, ar trebui sa ai:
- O descriere clar a ideii
- Un prototip functional
- Intelegere de baza a codului
- Cel putin o versiune deployata
- Increderea sa continui

Acum esti builder.`),
      },
    ],
  },
  {
    id: 'book-2',
    slug: 'from-idea-to-product',
    title: 'From Idea to Product',
    titleRo: ro('De la Idee la Produs'),
    description: 'The complete journey from a spark of an idea to a real product with real users.',
    descriptionRo: ro('Drumul complet de la o scanteie de idee la un produs real cu utilizatori reali.'),
    coverColor: '#3b82f6',
    totalChapters: 10,
    chapters: [
      {
        id: 'ch-2-1',
        title: 'Chapter 1: Finding Ideas That Matter',
        titleRo: ro('Capitolul 1: Gasirea Ideilor Care Conteaza'),
        order: 1,
        content: `# Chapter 1: Finding Ideas That Matter

The worst way to find a product idea is to sit in a room and brainstorm. The best way is to **notice what frustrates you**.

## The Frustration Audit

For one week, write down every moment of frustration:
- "I wish there was a way to..."
- "Why can't I just..."
- "It's so annoying that..."
- "If only someone would build..."

These are your product ideas.

## The Three Filters

Before committing to an idea, run it through three filters:

**Filter 1: Do People Care?**
- Are at least 100 people frustrated by this problem?
- Would they pay to solve it?
- Are they already paying for bad solutions?

**Filter 2: Can You Build It?**
- Can an MVP be built in 2-4 weeks with AI?
- Do you have (or can you learn) the skills?
- Is the technology available?

**Filter 3: Do You Care?**
- Will you still care about this in 6 months?
- Does it align with your skills and interests?

## The Idea Scorecard

Score each idea 1-10 on:
- Pain level (x3)
- Number of people (x2)
- Your passion (x2)
- Buildability (x2)
- Monetization potential (x1)

Total possible: 100. Anything above 60 is worth pursuing.

## Common Beginner Mistakes

1. **Building for everyone** -> Build for someone specific first
2. **Solving a fake problem** -> Talk to real people first
3. **Waiting for the perfect idea** -> Start with a good-enough idea
4. **Copying exactly** -> Get inspired, then add your twist
5. **Overthinking** -> Ship fast, learn faster

## Your Action Plan

1. Do the Frustration Audit for 3 days
2. List 10 potential ideas
3. Score each one
4. Pick the top 3
5. Talk to 5 people about each one
6. Pick the winner
7. Start building

The best time to start was yesterday. The second best time is right now.`,
        contentRo: ro(`# Capitolul 1: Gasirea Ideilor Care Conteaza

Cea mai proasta metoda de a gasi o idee e sa stai in camera si sa brainstorm-ezi. Cea mai buna e sa **observa ce te frustreaza**.

## Auditul Frusterii

Timp de o saptamana, noteaza fiecare moment de frustrare:
- "As vrea sa existe o cale sa..."
- "De ce nu pot pur si simplu..."
- "E atat de enervant ca..."
- "Daca ar construi cineva..."

Astea sunt ideile tale de produs.

## Cele Trei Filtre

**Filtrul 1: Le Pasa Oamenilor?**
- Sunt cel putin 100 de oameni frustrati de aceasta problema?
- Ar plati sa o rezolve?
- Platesc deja pentru solutii proaste?

**Filtrul 2: Poti sa O Construiesti?**
- Poate fi construit un MVP in 2-4 saptamani cu AI?
- Tehnologia e disponibila?

**Filtrul 3: Tie Iti Pasa?**
- Iti va pasa peste 6 luni?
- Se alinieza cu skill-urile si interesele tale?

## Planul Tau de Actiune

1. Fsa Auditul Frusterii 3 zile
2. Listeaza 10 idei potentiale
3. Alege top 3
4. Vorbeste cu 5 oameni despre fiecare
5. Alege castigatorul
6. Incepe sa construiesti

Cel mai bun moment sa incepi era ieri. Al doilea mai bun e chiar acum.`),
      },
    ],
  },
  {
    id: 'book-3',
    slug: 'building-with-ai-agents',
    title: 'Building with AI Agents',
    titleRo: ro('Construirea cu Agenti AI'),
    description: 'Master the art of working with AI agents. Orchestration, delegation, and building with a team of AI specialists.',
    descriptionRo: ro('Stapaneste arta lucrului cu agenti AI. Orchestrare, delegare si construire cu o echipa de specialisti AI.'),
    coverColor: '#10b981',
    totalChapters: 8,
    chapters: [
      {
        id: 'ch-3-1',
        title: 'Chapter 1: What Are AI Agents?',
        titleRo: ro('Capitolul 1: Ce sunt Agentii AI?'),
        order: 1,
        content: `# Chapter 1: What Are AI Agents?

A chatbot answers questions. An **agent** takes action.

When you ask a chatbot "How do I center a div?", it gives you CSS.
When you ask an agent "Center the header div", it **edits the file for you**.

That's the difference. Agents don't just talk -- they **do**.

## The Agent Team in FORGE

**Orchestrator** -- The project manager. Coordinates all other agents.

**Builder** -- The full-stack developer. Writes code, creates files, builds features.

**Frontend Agent** -- The designer-developer. Creates beautiful, responsive UIs.

**Backend Agent** -- The server expert. Builds APIs, handles data.

**Database Agent** -- The data architect. Designs schemas, optimizes queries.

**Debugger** -- The detective. Finds and fixes bugs.

**Learning Mentor** -- The teacher. Explains concepts, guides your learning.

**Deployment Agent** -- The DevOps engineer. Handles deployment and infrastructure.

## How Agents Work Together

When you say "Build me a todo app":

1. Orchestrator breaks it down: frontend, backend, database, deployment
2. Architect designs the structure
3. Database Agent creates the schema
4. Backend Agent builds the API
5. Frontend Agent creates the UI
6. Builder connects everything
7. Tester checks for bugs
8. Deployment Agent ships it

All of this happens in minutes, not weeks.

## Your Role: The Director

You're not the coder. You're the **director**:
- You set the vision
- You approve the plan
- You review the results
- You make the final calls
- You learn from watching

This is how modern software gets built. Welcome to the future.`,
        contentRo: ro(`# Capitolul 1: Ce sunt Agentii AI?

Un chatbot raspunde la intrebari. Un **agent** ia masuri.

Cand intrebi un chatbot "Cum centrez un div?", iti da CSS.
Cand intrebi un agent "Centreaza div-ul header", **editeaza fisierul pentru tine**.

Asta e diferenta. Agentii nu doar vorbesc -- ei **fac**.

## Echipa de Agenti in FORGE

**Orchestrator** -- Managerul de proiect. Coordoneaza toti ceilalti agenti.

**Builder** -- Developerul full-stack. Scrie cod, creeaza fisiere.

**Frontend Agent** -- Designer-developer. Creeaza UI-uri frumoase si responsive.

**Backend Agent** -- Expertul server. Construieste API-uri.

**Database Agent** -- Arhitectul de date. Proiecteaza scheme, optimizeaza queries.

**Debugger** -- Detectivul. Gaseste si repara bugs.

**Learning Mentor** -- Profesorul. Explica concepte si ghideaza invatarea.

**Deployment Agent** -- Inginerul DevOps. Gestioneaza deployment si infrastructura.

## Rolul Tau: Directorul

Nu esti coderul. Esti **directorul**:
- Tu setezi viziunea
- Tu aprobi planul
- Tu rezultatele
- Tu deciziile finale
- Tu inveti uitandu-te

Asa se construieste software-ul modern. Bine ai venit in viitor.`),
      },
    ],
  },
  {
    id: 'book-4',
    slug: 'human-in-the-loop-engineering',
    title: 'Human-in-the-Loop Engineering',
    titleRo: ro('Ingineria Human-in-the-Loop'),
    description: 'Design systems where humans and AI collaborate effectively.',
    descriptionRo: ro('Proiecteaza sisteme unde oamenii si AI colaboreaza eficient.'),
    coverColor: '#f97316',
    totalChapters: 6,
    chapters: [
      {
        id: 'ch-4-1',
        title: 'Chapter 1: The Collaboration Spectrum',
        titleRo: ro('Capitolul 1: Spectrul Colaborarii'),
        order: 1,
        content: `# Chapter 1: The Collaboration Spectrum

Human-AI collaboration isn't binary. It's a spectrum:

**Level 1: Manual** -- Human does everything. Slow but full control.

**Level 2: Assisted** -- AI suggests completions. You review and accept/reject.

**Level 3: Supervised** -- AI writes complete features. You review before commit.

**Level 4: Delegated** -- AI builds entire modules. You check when done.

**Level 5: Autonomous** -- AI builds, tests, deploys. You only set direction.

## Where to Start

**Beginners: Level 2-3**
- Let AI write code, but always review
- Ask "why" for every change
- Build understanding before speed

**Intermediate: Level 3-4**
- Delegate complete features
- Review at checkpoints
- Focus on architecture, not lines

**Advanced: Level 4-5**
- Set direction, let AI execute
- Review at milestones
- Focus on product, not code

## The Golden Rule

**Never merge code you don't understand.**

Speed means nothing if you can't maintain what you build. Understanding > Speed. Always.`,
        contentRo: ro(`# Capitolul 1: Spectrul Colaborarii

Colaborarea uman-AI nu e binara. E un spectru:

**Nivelul 1: Manual** -- Omul face tot. Lent dar control total.

**Nivelul 2: Asistat** -- AI sugestii completari. Tu revizuiezi si accepzi/respingi.

**Nivelul 3: Supraveghet** -- AI scrie functionalitati complete. Tu revizi inainte de commit.

**Nivelul 4: Delegat** -- AI construieste module intregi. Tu verifi cand e gata.

**Nivelul 5: Autonom** -- AI construieste, testeaza, deployeaza. Tu doar setezi directia.

## Unde sa Incepi

**Incepatori: Nivel 2-3**
- Lasa AI sa scrie cod, dar revizuieste intotdeauna
- Intreaba "de ce" pentru fiecare schimbare

**Intermediar: Nivel 3-4**
- Delegheaza functionalitati complete
- Revizi la checkpoint-uri

**Avansat: Nivel 4-5**
- Seteaza directia, lasa AI sa execute
- Focalizeaza pe produs, nu cod

## Regula de Aur

**Nu merge cod pe care nu il intelegi.**

Viteza nu inseama nimic daca nu poti intretine ce construiesti. Intelegere > Viteza. Intotdeauna.`),
      },
    ],
  },
  {
    id: 'book-5',
    slug: 'ai-founder-playbook',
    title: 'The AI Founder Playbook',
    titleRo: ro('Playbook-ul Fondatorului AI'),
    description: 'How to start, build, and grow a product in the AI era.',
    descriptionRo: ro('Cum sa incepi, construiesti si cresti un produs in era AI.'),
    coverColor: '#8b5cf6',
    totalChapters: 10,
    chapters: [
      {
        id: 'ch-5-1',
        title: 'Chapter 1: The AI Founder Advantage',
        titleRo: ro('Capitolul 1: Avantajul Fondatorului AI'),
        order: 1,
        content: `# Chapter 1: The AI Founder Advantage

You've never had it easier. A solo founder with AI can now do what used to require a team of 10.

## The New Math

**Before AI:**
- 1 founder + $50K + 6 months = MVP
- Needed: developers, designers, marketers

**With AI:**
- 1 founder + $0 + 2 weeks = MVP
- Needed: ideas, persistence, taste

## What Makes an AI Founder Different

**Old Founder:**
- Raises money first
- Hires a team
- Builds for 12-18 months
- Launches and hopes

**AI Founder:**
- Starts building today
- AI is the team
- Builds for 2-6 weeks
- Launches, learns, iterates

## The Founder Skills That Matter Now

1. **Taste** -- Knowing what's good
2. **Vision** -- Seeing what should exist
3. **Communication** -- Describing what you want clearly
4. **Persistence** -- Not giving up when things break
5. **Learning** -- Getting better every day

Notice what's NOT on the list: "writing code." That's AI's job now.

## Your First 90 Days

**Days 1-30: Build**
- Pick your idea, build the MVP with AI
- Get it in front of 10 people, iterate

**Days 31-60: Launch**
- Polish the product, write launch content
- Post on social media, get first 50 users

**Days 61-90: Grow**
- Talk to every user, fix top 3 pain points
- Add the #1 requested feature, get to 100 users

## The Compound Effect

Every day you build, you get better at describing what you want, reviewing AI output, and making product decisions. This compounds. In 6 months, you'll be unstoppable.

## Start Now

The best AI founder in the world is the one who started. Not the one with the best idea. Not the one with the most money. The one who **started**.

Open Forge. Describe your idea. Start building. Your future self will thank you.`,
        contentRo: ro(`# Capitolul 1: Avantajul Fondatorului AI

Niciodata Nu a Mai Usor. Un fondator solo cu AI poate face acum ce cerea o echipa de 10.

## Noua Matematica

**Inainte de AI:**
- 1 fondator + $50K + 6 luni = MVP

**Cu AI:**
- 1 fondator + $0 + 2 saptamani = MVP

## Ce Il Face Diferit pe Fondatorul AI

**Fondatorul Vechi:**
- Strangi bani mai intai
- Angajezi o echipa
- Construieste 12-18 luni

**Fondatorul AI:**
- Incepe sa construiasca azi
- AI e echipa
- Construieste 2-6 saptamani

## Skill-urile Care Conteaza Acum

1. **Gustul** -- Stiul ce e bine
2. **Viziunea** -- Vazul ce ar trebui sa existe
3. **Comunicarea** -- Descrierea clar ce vrei
4. **Persistenta** -- Nu renunci cand se strica
5. **Invatarea** -- Te imbunatatesti zilnic

Observa ce NU e pe lista: "scrierea codului." Asta e jobul AI-ului acum.

## Primele Tale 90 de Zile

**Zile 1-30: Construieste**
- Alege ideea, construieste MVP cu AI
- Pune-o in fata a 10 oameni, itereaza

**Zile 31-60: Lanseaza**
- Poloneaza produsul, scrie continut de lansare
- Posteaza pe social media, obtain primi 50 utilizatori

**Zile 61-90: Creste**
- Vorbeste cu fiecare utilizator
- Repara top 3 probleme
- Ajungi la 100 utilizatori

## Incepe Acum

Cel mai bun fondator AI din lume e cel care a inceput. Nu cel cu cea mai buna idee. Nu cel cu cei mai multi bani. Cel care **a inceput**.

Deschide Forge. Descrie ideea. Incepe sa construiesti.

Eu-ul tau viitor iti va multumi.`),
      },
    ],
  },
]

export function getBook(slug: string): Book | undefined {
  return BOOKS.find(b => b.slug === slug)
}
