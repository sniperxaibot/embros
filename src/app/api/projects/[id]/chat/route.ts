import { createServerClient } from '@/lib/supabase'
import { prisma } from '@/lib/db'
import { chatWithAI } from '@/lib/ai-client'
import { NextRequest, NextResponse } from 'next/server'
import type { AIMessage } from '@/lib/ai-client'

async function getUser() {
  const supabase = await createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user ?? null
}

interface ChatRequestBody {
  message: string
  context?: {
    currentFile?: string | null
    fileContent?: string | null
    fileList?: string[]
  }
}

// ─── POST: Chat with AI (streaming response) ───
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body: ChatRequestBody = await req.json()
  const { message, context } = body

  if (!message?.trim()) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 })
  }

  // Verify project ownership
  const project = await prisma.project.findFirst({
    where: { id: params.id, userId: user.id },
  })

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }

  // Find or create conversation for this project
  let conversation = await prisma.conversation.findFirst({
    where: { userId: user.id, title: `project:${params.id}` },
    include: { messages: { orderBy: { createdAt: 'desc' }, take: 20 } },
  })

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: {
        userId: user.id,
        title: `project:${params.id}`,
      },
      include: { messages: { orderBy: { createdAt: 'desc' }, take: 20 } },
    })
  }

  // Store the user message
  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      role: 'user',
      content: message,
    },
  })

  // Build AI messages with context
  const fileList = context?.fileList?.join(', ') || 'none'
  const currentFileContext = context?.currentFile && context?.fileContent
    ? `\n\nCurrently editing: **${context.currentFile}**\n\`\`\`\n${context.fileContent.slice(0, 3000)}\n\`\`\``
    : ''

  const systemPrompt = `You are Forge AI, a coding mentor and builder assistant. You are helping with the project "${project.name}".
Project description: ${project.description || 'No description'}
Project files: ${fileList}${currentFileContext}

Help the user build their project. Be concise and use markdown.
To create or modify files, include JSON in your response: {"files":[{"name":"path/file.ext","content":"..."}]}`

  // Build conversation history for AI
  const historyMessages = conversation.messages
    .reverse()
    .slice(-10)
    .map((m): AIMessage => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content,
    }))

  const aiMessages: AIMessage[] = [
    { role: 'system', content: systemPrompt },
    ...historyMessages,
    { role: 'user', content: message },
  ]

  // Stream the response
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await chatWithAI(aiMessages, { temperature: 0.7, maxTokens: 4096 })

        // Store assistant message
        await prisma.message.create({
          data: {
            conversationId: conversation.id,
            role: 'assistant',
            content: response,
          },
        })

        // Update conversation timestamp
        await prisma.conversation.update({
          where: { id: conversation.id },
          data: { updatedAt: new Date() },
        })

        // Send the response in chunks for streaming effect
        const chunkSize = 20
        for (let i = 0; i < response.length; i += chunkSize) {
          const chunk = response.slice(i, i + chunkSize)
          controller.enqueue(encoder.encode(chunk))
        }

        controller.close()
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'AI generation failed'
        controller.enqueue(encoder.encode(`Error: ${errorMessage}`))
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'no-cache',
    },
  })
}
