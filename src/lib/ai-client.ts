// ═══════════════════════════════════════════════════
// EmbrOS — AI Client with Provider Abstraction
// Supports OpenRouter with model rotation
// Designed to swap providers later
// ═══════════════════════════════════════════════════

export interface AIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface AIProvider {
  id: string
  name: string
  chat(messages: AIMessage[], options?: AIOptions): Promise<string>
}

export interface AIOptions {
  temperature?: number
  maxTokens?: number
  model?: string
}

// ─── OpenRouter Provider ───
const OPENROUTER_API = 'https://openrouter.ai/api/v1/chat/completions'

// Model rotation: OpenRouter FREE models only (must stay free for us).
// Easy to swap — keep the `:free` suffix. owl-alpha is a reliable free fallback.
const MODEL_TIERS = [
  { id: 'meta-llama/llama-3.3-70b-instruct:free', role: 'fast' },
  { id: 'deepseek/deepseek-chat-v3-0324:free', role: 'smart' },
  { id: 'google/gemini-2.0-flash-exp:free', role: 'fallback' },
  { id: 'openrouter/owl-alpha', role: 'auto' },
]

let _modelIndex = 0

function pickModel(tier?: string): string {
  if (tier) {
    const m = MODEL_TIERS.find(m => m.role === tier)
    if (m) return m.id
  }
  const model = MODEL_TIERS[_modelIndex % MODEL_TIERS.length]
  _modelIndex++
  return model.id
}

function getApiKey(): string {
  try {
    return (globalThis as any).process?.env?.NEXT_PUBLIC_OPENROUTER_API_KEY
      || (globalThis as any).process?.env?.OPENROUTER_API_KEY
      || ''
  } catch {
    return ''
  }
}

function getSiteInfo() {
  if (typeof window !== 'undefined') {
    return {
      url: window.location.origin,
      title: document.title,
    }
  }
  return { url: 'http://localhost:3000', title: 'EmbrOS' }
}

// Single call against one specific model. Throws on any failure.
async function callModel(
  model: string,
  messages: AIMessage[],
  options: AIOptions
): Promise<string> {
  const apiKey = getApiKey()
  const { url, title } = getSiteInfo()

  const response = await fetch(OPENROUTER_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': url,
      'X-Title': title,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 4096,
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '')
    throw new Error(`OpenRouter ${response.status}: ${errorBody}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error('OpenRouter returned empty content')
  return content
}

export async function chatWithAI(
  messages: AIMessage[],
  options: AIOptions = {}
): Promise<string> {
  const apiKey = getApiKey()
  if (!apiKey) {
    // No key configured — return a safe mock so the app never hard-fails.
    return mockAIResponse(messages)
  }

  // If a specific model is forced, honor it (no auto-fallback).
  if (options.model) {
    return callModel(options.model, messages, options)
  }

  // Otherwise walk the free-model chain in order. On rate-limit (429),
  // not-found (404) or any transient error, fall through to the next model.
  // This keeps us running entirely on free models until we can afford premium.
  const chain = MODEL_TIERS.map(m => m.id)
  let lastError: unknown = null

  for (const model of chain) {
    try {
      return await callModel(model, messages, options)
    } catch (err) {
      lastError = err
      console.warn(`[AI] ${model} failed, trying next free model...`, (err as Error)?.message)
    }
  }

  // Every free model failed (all rate-limited / down). Degrade gracefully.
  console.error('[AI] All free models exhausted.', lastError)
  return mockAIResponse(messages)
}

export async function chatWithAgent(
  agentName: string,
  agentSystemPrompt: string,
  conversation: AIMessage[],
  options: AIOptions = {}
): Promise<string> {
  const messages: AIMessage[] = [
    { role: 'system', content: agentSystemPrompt },
    ...conversation,
  ]
  return chatWithAI(messages, options)
}

// ─── Structured JSON Response ───
export async function chatWithAIJSON<T = any>(
  messages: AIMessage[],
  options: AIOptions = {}
): Promise<T> {
  const jsonMessages: AIMessage[] = [
    ...messages,
    { role: 'system', content: 'Respond ONLY with valid JSON. No markdown, no code fences, no explanation.' },
  ]
  const raw = await chatWithAI(jsonMessages, { ...options, temperature: 0.3 })

  // Extract JSON from response
  const jsonMatch = raw.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]) as T
  }
  throw new Error('AI did not return valid JSON')
}

// ─── Mock AI for development ───
function mockAIResponse(messages: AIMessage[]): string {
  const lastMsg = messages[messages.length -1]?.content?.toLowerCase() || ''

  if (lastMsg.includes('create') || lastMsg.includes('make') || lastMsg.includes('build')) {
    return `I'll help you build that! Here's what I can create:

\`\`\`json
{"files": [{"name": "index.html", "<!DOCTYPE html>\\n<html lang='en'>\\n<head>\\n  <meta charset='UTF-8'>\\n  <meta name='viewport' content='width=device-width, initial-scale=1.0'>\\n  <title>My App</title>\\n  <link rel='stylesheet' href='style.css'>\\n</head>\\n<body>\\n  <h1>Hello from EmbrOS! 🔥</h1>\\n  <p>Your app is ready.</p>\\n  <script src='script.js'></script>\\n</body>\\n</html>"}, {"name": "style.css", "* { margin: 0; padding: 0; box-sizing: border-box; }\\nbody { font-family: system-ui; background: #0a0a0b; color: #e2e2e7; padding: 2rem; }\\nh1 { color: #f59e0b; }"}, {"name": "script.js", "console.log('App loaded!');"}]}
\`\`\`

This creates a basic project structure. Tell me more about what you want to build!`
  }

  if (lastMsg.includes('explain') || lastMsg.includes('what is') || lastMsg.includes('how')) {
    return `Great question! Let me explain:

**The concept** is simple. EmbrOS works by connecting you with AI agents that help you build real software. You describe what you want, and the AI creates the files, writes the code, and teaches you along the way.

**Key benefits:**
- No coding experience needed
- AI creates real, working code
- You learn by doing, not watching tutorials
- Ships real products

What would you like to build first? 🔥`
  }

  return `I'm your AI mentor on EmbrOS. I can help you:

- **Build features** — Describe what you want, I'll create the code
- **Fix bugs** — Share the error, I'll find the solution
- **Explain code** — Ask about any file, I'll break it down
- **Plan projects** — Tell me your idea, I'll create a roadmap

What do you want to work on? 🔥`
}

// ─── Stream helper (for future streaming support) ───
export async function streamChat(
  messages: AIMessage[],
  onChunk: (chunk: string) => void,
  options: AIOptions = {}
): Promise<string> {
  const full = await chatWithAI(messages, options)
  onChunk(full)
  return full
}
