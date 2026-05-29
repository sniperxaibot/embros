// FORGE - Database Seed Script
// Run after setting up Railway PostgreSQL:
//   railway run npx tsx scripts/seed.ts
//
// NOTE: This file is NOT part of the Next.js build.
// It requires @prisma/client to be generated first.

// @ts-nocheck - Prisma client not generated yet at build time
export {}

async function main() {
  try {
    const { PrismaClient } = await import('@prisma/client')
    const db = new PrismaClient()
    console.log('\u{1F331} Seeding database...')

    // Skills
    const skills = [
      { name: 'HTML', category: 'Web' },
      { name: 'CSS', category: 'Web' },
      { name: 'JavaScript', category: 'Programming' },
      { name: 'TypeScript', category: 'Programming' },
      { name: 'React', category: 'Framework' },
      { name: 'Next.js', category: 'Framework' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Git', category: 'Tool' },
      { name: 'AI/ML', category: 'AI' },
      { name: 'Prompt Engineering', category: 'AI' },
      { name: 'API Design', category: 'Backend' },
    ]
    for (const skill of skills) {
      await db.skill.upsert({ where: { name: skill.name }, create: skill, update: {} })
    }
    console.log(`\u2705 ${skills.length} skills seeded`)

    // Courses
    const course = await db.course.upsert({
      where: { slug: 'ai-builder-foundations' },
      create: {
        slug: 'ai-builder-foundations', title: 'AI Builder Foundations',
        titleRo: 'Fundamentele Builderului AI',
        description: 'Learn the fundamentals of building software with AI.',
        icon: '\uD83C\uDFD7\uFE0F', color: '#f59e0b', level: 'beginner',
        totalLessons: 2, estimatedHours: 8, isPublished: true,
        tags: ['beginner', 'ai', 'foundations'],
      },
      update: {},
    })

    const mod = await db.courseModule.create({
      data: {
        id: course.id + '-1', courseId: course.id,
        title: 'Welcome to the AI Builder Era', order: 1,
      }
    })

    await db.lesson.create({
      data: {
        slug: 'what-is-ai-building', moduleId: mod.id,
        title: 'What Is AI Building?', titleRo: 'Ce este Construirea cu AI?',
        type: 'explanation', estimatedMinutes: 15, order: 1,
        content: '# What Is AI Building?\n\nAI building means creating software with AI agents. You describe what you want, the AI writes the code, and you learn by doing.\n\n## Key Concepts\n\n1. You Are the Architect - You decide WHAT and WHY\n2. AI Is Your Builder - AI handles the HOW\n3. Learn by Doing - Build real projects, not just watch tutorials',
      }
    })

    await db.lesson.create({
      data: {
        slug: 'your-first-project', moduleId: mod.id,
        title: 'Your First Project', titleRo: 'Primul Tau Proiect',
        type: 'builder', estimatedMinutes: 30, order: 2,
        content: '# Your First Project\n\nLet\'s build your first real project.\n\n## What We\'re Building\nA personal landing page.\n\n## Steps\n1. Describe your vision\n2. Review generated files\n3. Customize it\n4. Ship it!',
      }
    })

    console.log('\u2705 Course seeded: AI Builder Foundations')

    // Cleanup old lessons for idempotency
    await db.lesson.deleteMany({ where: { moduleId: mod.id, slug: { notIn: ['what-is-ai-building', 'your-first-project'] } } })

    // Prompts
    const prompts = [
      { title: 'Create Component', content: 'Create a React component that [describe]. Use TypeScript, Tailwind CSS, accessible markup, dark theme.', category: 'cursor', tags: ['react', 'component'], platform: 'cursor' },
      { title: 'Debug Error', content: "I'm getting this error: [paste]\n\nCode:\n```\n[paste]\n```\n\nExplain cause, fix, and prevention.", category: 'debug', tags: ['debugging'], platform: 'cursor' },
      { title: 'Deploy Railway', content: 'Help me deploy this Next.js app to Railway. Check next.config.js, create railway.json, set env vars.', category: 'deploy', tags: ['railway'], platform: 'openrouter' },
    ]
    for (const p of prompts) {
      await db.prompt.upsert({ where: { id: p.title }, create: { ...p, isPublic: true }, update: p })
    }
    console.log(`\u2705 ${prompts.length} prompts seeded`)

    console.log('\n\uD83C\uDF89 Database seeding complete!')
    await db.$disconnect()
  } catch (e) {
    console.error('Seed failed:', e)
    process.exit(1)
  }
}

main()
