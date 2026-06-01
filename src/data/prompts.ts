// EmbrOS - Prompt Library
// Reusable prompts by category

import type { Prompt } from '../types/index'

export const PROMPTS: Prompt[] = [
  // Cursor Prompts
  {
    id: 'prompt-1',
    title: 'Create Component',
    titleRo: 'Creare Componenta',
    content: `Create a React component that [describe functionality]. Use:
- TypeScript with proper types
- Tailwind CSS for styling
- Accessible markup (ARIA labels, semantic HTML)
- Dark theme support (#0a0a0b background, #f59e0b accent)
- Mobile-responsive design
- Add comments explaining each section`,
    contentRo: `Creeaza o componenta React care [descrie functionalitatea]. Foloseste:
- TypeScript cu tipuri corecte
- Tailwind CSS pentru stilizare
- Marcaj accesibil (ARIA labels, HTML semantic)
- Suport tema intunecata (#0a0a0b fundal, #f59e0b accente)
- Design responsive mobil
- Adauga comentarii care explica fiecare sectiune`,
    category: 'cursor',
    tags: ['react', 'component', 'typescript', 'tailwind'],
    platform: 'cursor',
  },
  {
    id: 'prompt-2',
    title: 'Debug Error',
    titleRo: 'Debug Eroare',
    content: `I'm getting this error: [paste error message]

Here's the relevant code:
\`\`\`
[paste code]
\`\`\`

Please:
1. Explain what's causing the error
2. Provide the fix
3. Explain how to prevent it in the future`,
    contentRo: `Obtain aceasta eroare: [lipeste mesajul erorii]

Iata codul relevant:
\`\`\`
[lipeste codul]
\`\`\`

Te rog sa:
1. Explici ce cauzeaza eroarea
2. Oferi solutia
3. Explici cum sa o previi in viitor`,
    category: 'debug',
    tags: ['debugging', 'error', 'fix'],
    platform: 'cursor',
  },
  {
    id: 'prompt-3',
    title: 'Add Feature',
    titleRo: 'Adaugare Functionalitate',
    content: `Add [feature name] to my project. Here's the context:
- Current files: [list relevant files]
- Tech stack: [list technologies]
- Requirements: [describe what you want]

Create the necessary files or modify existing ones. Include:
- Clean, commented code
- Proper error handling
- Responsive design
- Tests if applicable`,
    contentRo: `Adauga [numele functionalitati] in proiectul meu. Iata contextul:
- Fisiere curente: [lista fisiere relevante]
- Tech stack: [lista tehnologii]
- Cerinte: [descrie ce vrei]

Creaza fisierele necesare sau modifica pe cele existente. Include:
- Cod curat, comentat
- Tratare erori adecvata
- Design responsive
- Teste daca e cazul`,
    category: 'cursor',
    tags: ['feature', 'development', 'files'],
    platform: 'cursor',
  },
  {
    id: 'prompt-4',
    title: 'Refactor Code',
    titleRo: 'Refactorizare Cod',
    content: `Refactor this code to be cleaner and more maintainable:
\`\`\`
[paste code]
\`\`\`

Focus on:
- Readability
- Performance
- Modern best practices
- Remove duplication
- Improve naming

Explain each change you make.`,
    contentRo: `Refactorizeaza acest cod sa fie mai curat si mai usor de intretinut:
\`\`\`
[lipeste codul]
\`\`\`

Concentreaza-te pe:
- Lizibilitate
- Performanta
- Cele mai bune practici moderne
- Eliminarea duplicarii
- Imbunatatirea numelor

Explica fiecare schimbare.`,
    category: 'refactor',
    tags: ['refactor', 'cleanup', 'best-practices'],
    platform: 'cursor',
  },
  {
    id: 'prompt-5',
    title: 'Deploy to Vercel',
    titleRo: 'Deploy pe Vercel',
    content: `Help me deploy this Next.js project to Vercel. Please:
1. Review my code for deployment issues
2. Suggest any needed environment variables
3. Create a vercel.json config if needed
4. Provide the deployment commands
5. Explain common deployment mistakes to avoid`,
    contentRo: `Ajuta-ma sa deploy acest proiect Next.js pe Vercel. Te rog sa:
1. Revizui codul pentru probleme de deployment
2. Sugeste variabile de mediu necesare
3. Creez un vercel.json daca e necesar
4. Ofer comenzile de deployment
5. Explici greseli comune de evitat`,
    category: 'deploy',
    tags: ['deployment', 'vercel', 'production', 'setup'],
    platform: 'cursor',
  },
  {
    id: 'prompt-6',
    title: 'Agent Orchestration',
    titleRo: 'Orchestrare Agenti',
    content: `I want to set up an AI agent system for my project. Help me:
1. Define agent roles and responsibilities
2. Create agent communication patterns
3. Set up a task delegation system
4. Implement error handling between agents
5. Create a monitoring system

Project context: [describe your project]`,
    contentRo: `Vreau sa configurez un sisteme de agenti AI pentru proiectul meu. Ajuta-ma sa:
1. Defin rolurile si responsabilitatile agentilor
2. Creez modele de comunicare intre agenti
3. Configurez un sistem de delegare a sarcinilor
4. Implementez tratarea erorilor intre agenti
5. Creez un sistem de monitorizare`,
    category: 'agent',
    tags: ['agents', 'orchestration', 'multi-agent', 'architecture'],
    platform: 'openrouter',
  },
  {
    id: 'prompt-7',
    title: 'Product Planning',
    titleRo: 'Planificare Produs',
    content: `Help me plan my product. My idea is: [describe idea]

Please create:
1. A one-page product brief
2. Target audience definition
3. Feature list (prioritized by impact vs effort)
4. MVP scope (what to build first)
5. Tech stack recommendation
6. 30-60-90 day roadmap
7. Success metrics

Format as markdown with clear sections.`,
    contentRo: `Ajuta-ma sa-mi planific produsul. Ideia mea e: [descrie ideea]

Te rog sa creezi:
1. Un rezumat de o pagina al produsului
2. Definirea publicului tinta
3. Lista de functionalitati (prioritatizata dupa impact vs efort)
4. Scop MVP (ce sa construie mai intai)
5. Recomandare tech stack
6. Roadmap 30-60-90 zile
7. Metrici de succes`,
    category: 'product',
    tags: ['planning', 'strategy', 'mvp', 'roadmap'],
    platform: 'openrouter',
  },
  {
    id: 'prompt-8',
    title: 'Create API Endpoint',
    titleRo: 'Creare Endpoint API',
    content: `Create a REST API endpoint for [resource]. Requirements:
- Method: [GET/POST/PUT/DELETE]
- Validation with Zod
- Error handling with proper status codes
- TypeScript types
- Prisma database integration
- Authentication middleware if needed

Provide the complete route file with all types and validation.`,
    contentRo: `Creaza un endpoint API REST pentru [resursa]. Cerinte:
- Metoda: [GET/POST/PUT/DELETE]
- Validare cu Zod
- Tratare erori cu coduri de status corecte
- Tipuri TypeScript
- Integrare baza de date Prisma
- Middleware autentificare daca e necesar`,
    category: 'cursor',
    tags: ['api', 'backend', 'rest', 'typescript', 'prisma'],
    platform: 'cursor',
  },
  {
    id: 'prompt-9',
    title: 'Build Telegram Bot',
    titleRo: 'Construire Bot Telegram',
    content: `Help me build a Telegram bot that [describe bot purpose]. Include:
1. Bot setup with grammY or Telegraf
2. Command handlers
3. Inline keyboard menus
4. User state management
5. Error handling
6. Deployment instructions

Use TypeScript. Make it production-ready.`,
    contentRo: `Ajuta-ma sa construiesc un bot Telegram care [descrie scopul botului]. Include:
1. Setup bot cu grammY sau Telegraf
2. Handlere comenzi
3. Menuri tastatura inline
4. Gestionare stare utilizator
5. Tratare erori
6. Instructiuni deployment`,
    category: 'cursor',
    tags: ['telegram', 'bot', 'typescript', 'automation'],
    platform: 'codex',
  },
  {
    id: 'prompt-10',
    title: 'Romanian: Code Review',
    titleRo: 'Romana: Review Cod',
    content: `Esti un senior developer roman. Fa un review acestui cod:
\`\`\`
[lipește codul]
\`\`\`

Verifica:
1. Corectitudinea codului
2. Performanta
3. Securitatea
4. Gradul de intelegere
5. Convențiile de stil

Oferă feedback constructiv în limba română. Explica ce si de ce ar trebui schimbat.`,
    contentRo: `Esti un senior developer roman. Fa un review acestui cod:
\`\`\`
[lipește codul]
\`\`\`
Verifica corectitudinea, performanta, securitatea si stilul. Oferă feedback constructiv.`,
    category: 'romanian',
    tags: ['code-review', 'romanian', 'feedback', 'quality'],
    platform: 'romanian',
  },
]

export function getPromptsByCategory(category: string): Prompt[] {
  return PROMPTS.filter(p => p.category === category)
}

export function getPromptsByPlatform(platform: string): Prompt[] {
  return PROMPTS.filter(p => p.platform === platform)
}
