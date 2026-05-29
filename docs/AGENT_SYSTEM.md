# Forge Agent System Architecture

## Based on wshobson/agents (83 plugins, 191 agents, 155 skills)

### Multi-Model Tier Strategy
| Tier | Model | Use Case |
|------|-------|----------|
| 1 | claude-sonnet-4 | Architecture, code review, complex reasoning |
| 2 | gemini-2.0-flash | Implementation, file generation, chat |
| 3 | openrouter/free | Fast tasks, fallbacks, simple operations |

### Core Agents for Forge

#### 1. Frontend Developer Agent
- Builds responsive UI components
- Mobile-first design (from wshobson frontend-mobile-development)
- Tailwind CSS v4 design system
- Accessibility compliance (WCAG 2.1 AA)

#### 2. Backend Architect Agent  
- API design and implementation
- Database schema design
- Authentication & authorization
- File storage and management

#### 3. AI Mentor Agent
- Teaches coding concepts just-in-time
- Creates and edits project files
- Explains code with analogies
- Progressive complexity disclosure

#### 4. Deployment Engineer Agent
- Vercel deployment automation
- CI/CD pipeline setup
- Environment configuration
- Domain and SSL management

#### 5. Content Marketing Agent
- SEO-optimized content creation
- Social media strategy
- Email marketing sequences
- Landing page copy

#### 6. Business Analyst Agent
- KPI framework development
- User analytics and tracking
- Conversion optimization
- Market analysis

#### 7. Security Auditor Agent
- Code security scanning
- Dependency vulnerability checks
- Authentication best practices
- Data privacy compliance

#### 8. Testing & QA Agent
- Unit test generation
- Integration testing
- E2E testing with Playwright
- Performance testing

### Plugin Architecture
Each Forge feature is a composable plugin:
- plugins/auth/ — Authentication (email, OAuth, magic links)
- plugins/projects/ — Project CRUD, file management
- plugins/ai-chat/ — AI mentor chat system
- plugins/preview/ — Live preview engine
- plugins/deploy/ — One-click deployment
- plugins/learning/ — Adaptive learning engine
- plugins/analytics/ — User analytics and tracking
- plugins/billing/ — Subscription management (Stripe)

### Skills (Progressive Disclosure)
Skills are loaded on demand, not all at once:
- brand-strategy — When user needs landing page
- seo-optimization — When user needs SEO help
- social-media — When user needs marketing
- code-review — When user submits code
- deployment — When user wants to ship
