# 🔥 Forge Community — Discord Server Setup Guide

> **AI Builder Operating System**
> Dark · Amber · Professional · Welcoming

---

## Table of Contents

1. [Server Structure](#1-server-structure)
2. [Welcome Message Template](#2-welcome-message-template)
3. [Onboarding Flow](#3-onboarding-flow)
4. [Bot Configuration](#4-bot-configuration)
5. [Community Guidelines](#5-community-guidelines)
6. [30-Day Content Calendar](#6-30-day-content-calendar)
7. [Implementation Checklist](#7-implementation-checklist)

---

## 1. Server Structure

### 1.1 Server Identity

| Setting | Value |
|---|---|
| **Server Name** | Forge — AI Builder OS 🔥 |
| **Server Icon** | Dark background, amber/orange Forge logo (512×512 PNG) |
| **Server Banner** | "Build Something Extraordinary" — dark gradient with amber accents |
| **Invite Splash** | "Welcome to Forge — the AI Builder Operating System. Your forge. Your rules. Your future." |
| **Vanity URL** | `discord.gg/forge-os` (requires Level 1 boosting — aim for Day 7) |

### 1.2 Category & Channel Layout

```
🔥 FORGE — AI Builder OS
│
├── 📋 START HERE
│   ├── 📌 welcome          [Read-only for members, staff can send]
│   ├── 📌 rules            [Read-only]
│   ├── 📌 roles            [Reaction roles]
│   └── 📌 announcements    [Ping @everyone for major updates]
│
├── 🛠️ BUILDER LOUNGE
│   ├── 💬 general          [Casual chat, anything goes]
│   ├── 💬 forge-intros     [New member introductions]
│   ├── 💬 daily-builds     [Daily progress updates, build logs]
│   ├── 🔊 voice-lounge     [General voice chat — max 10]
│   └── 🔊 co-working        [Silent co-working sessions]
│
├── 🧠 THE FOUNDRY (Knowledge)
│   ├── 💬 help-and-support [Ask questions, get answers]
│   ├── 💬 tutorials        [Community tutorials & guides]
│   ├── 💬 resources        [Links, tools, prompts, libraries]
│   ├── 💬 show-and-tell    [Showcase your builds]
│   └── 🔊 help-voice       [Live help sessions]
│
├── ⚡ BUILD & SHIP
│   ├── 💬 project-posts    [Share active projects]
│   ├── 💬 collab-requests  [Looking for collaborators? Post here]
│   ├── 💬 feedback-corner  [Get feedback on your work]
│   ├── 💬 job-board       [Freelance, gigs, hiring]
│   └── 🔊 workshop-voice   [Workshop & demo voice channel]
│
├── 🎮 COMMUNITY & CULTURE
│   ├── 💬 off-topic        [Fun, memes, life stuff]
│   ├── 💬 meme-forge       [AI memes & humor only]
│   ├── 💬 daily-prompts    [Daily AI challenge prompts]
│   ├── 🎵 music-lounge     [Music bots, vibes]
│   └── 🔊 community-voice  [Social hangouts]
│
├── 🗓️ EVENTS (Private until events launch)
│   ├── 📌 event-info       [Event details & schedules]
│   ├── 📌 event-signups    [React to sign up]
│   └── 🔊 event-stage      [Stage channel for events]
│
└── 🔧 STAFF ONLY
    ├── 💬 staff-chat       [Staff discussions]
    ├── 💬 moderation-log   [Auto-logged mod actions]
    ├── 💬 bot-commands      [Bot test channel]
    ├── 💬 reports          [User reports queue]
    └── 🔊 staff-voice       [Private staff voice]
```

### 1.3 Roles & Permissions Matrix

#### Hierarchy (top → bottom)

| Role | Color | Permissions | Description |
|---|---|---|---|
| **🔥 Forge Master** | `#FF6B00` (Amber) | Administrator | Server owner(s) |
| **⚡ Stewards** | `#FF8C00` (Dark Orange) | Manage server, messages, members | Core moderation team |
| **🧱 Builder Leads** | `#FFB347` (Light Amber) | Mute, manage messages, priority speaker | Recognized contributors, event organizers |
| **🛠️ Forgers** | `#4A90D9` (Blue) | Access to `#builder-lounge`, `#build-and-ship` | Verified builders — completed onboarding |
| **🌱 Apprentices` | `#7ED321` (Green) | Access to `#start-here`, `#foundry`, limited channels | New members — default on join |
| **🎤 Speakers** | `#BD10E0` (Purple) | Can speak in stage channels | Event speakers |
| **🤖 Bots` | `#99AAB5` (Gray) | Channel-specific write via bot roles | Bot role for all bots |

#### Verification & Progression

```
Apprentice (default) →  7 days + introduced themselves  → Forger
Forger               →  30 days + active + contributed    → Builder Lead (nominated)
Apprentice           →  join via sponsor link + verified   → Forger (fast-track)
```

#### Channel Permission Overwrites

| Channel(s) | Apprentice | Forger | Builder Lead | Steward |
|---|---|---|---|---|
| `#welcome`, `#rules` | Read | Read | Read | Send |
| `#general` | Read | Read + Send | Read + Send | Manage |
| `#help-and-support` | Read + Send | Read + Send | Manage | Manage |
| `#project-posts`, `#collab-requests` | Read | Read + Send | Manage | Manage |
| `#show-and-tell` | Read on first 7d | Read + Send | Manage | Manage |
| `#staff-chat`, `#moderation-log` | ❌ | ❌ | Read only | Full |
| `#bot-commands` | ❌ | ❌ | ❌ | Full |

### 1.4 Permission Configuration Notes

- **Apprentice Role**: Cannot send images/files in `#general` (reduces spam). Can send in `#help-and-support` and `#forge-intros`.
- **Slowmode**: `#general` — 15s slowmode. `#daily-builds` — 30s slowmode.
- **NSFW**: No NSFW channels. Server is SFW only.
- **Default Notification Settings**: Server default = Only @mentions.

---

## 2. Welcome Message Template

### 2.1 Static Welcome Embed (Pinned in `#welcome`)

```markdown
# Welcome to Forge 🔥
### **The AI Builder Operating System**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You've just entered the most ambitious builder community on the internet.
This is where ideas get forged into reality.

### 🗺️ Get Started in 3 Steps:

**Step 1 — Read the Rules**
→ Check out #📌-rules
Our community runs on respect, curiosity, and shipping.

**Step 2 — Claim Your Roles**
→ Head to #📌-roles
Pick your builder type. Unlock channels. Join your tribe.

**Step 3 — Say Hello**
→ Introduce yourself in #💬-forge-intros
Tell us: What are you building? What brings you here?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**🔥 Quick Links:**
• Getting Started Guide: [Link]
• Forge Documentation: [Link]
• Weekly Office Hours: Fridays @ 5PM ET / #🔊-help-voice
• Submit a project: #💬-show-and-tell

**Need help?** Tag a 🧭Guide or message #💬-help-and-support

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*Your forge. Your rules. Your future.*
```

### 2.2 Automated DM Welcome (Sent via Bot on Join)

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔨 Welcome to Forge, {user.mention}!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hey {user.name}! You just joined the **Forge — AI Builder Operating System** community. We're stoked to have you.

**Here's what to do first:**
1️⃣ Read #📌-rules
2️⃣ Pick roles in #📌-roles
3️⃣ Introduce yourself in #💬-forge-intros

**The vibe here is simple:**
• Build in public — share your progress, wins, and fails
• Help others — knowledge compounds
• Ship fast — done beats perfect

**Stuck?** Reply to this message or ask in #💬-help-and-support.

See you in the forge. 🔥
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 2.3 Welcome Channel Auto-Reply (on `#forge-intros` activity)

When a user posts their introduction, bot reacts with 🔥 and posts:

```markdown
🔥 Welcome to the forge, {user.mention}! 

Sounds like you've got an awesome project ahead. 
The community's here to help — don't hesitate to ask in #💬-help-and-support or share progress in #💬-daily-builds.

*Apprentice → Forger promotion unlocks after 7 days of activity!*
```

---

## 3. Onboarding Flow

### 3.1 New Member Journey (Visual Flowchart)

```
JOIN SERVER
    │
    ▼
┌─────────────────────────┐
│  Bot sends DM welcome   │
│  (from §2.2)            │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  User sees #welcome &   │
│  #rules (read-only)     │
│  Role: 🌱 Apprentice    │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  User goes to #roles    │
│  Reacts to claim roles: │
│  • Builder role         │
│  • Language interests   │
│  • Notification prefs   │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  User posts intro in    │
│  #forge-intros          │
│  → Bot reacts + replies │
│  → Community welcomes   │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  DAY 1-7: Apprentice    │
│  • Access: Lounge,      │
│    Foundry, Community   │
│  • Cannot post in       │
│    #show-and-tell       │
│  • Cannot share files   │
│    in #general          │
└──────────┬──────────────┘
           │
     7 days + 1+ messages in intros
           │
           ▼
┌─────────────────────────┐
│  AUTO-PROMOTE: Forger   │
│  • Full access          │
│  • Can post projects    │
│  • File sharing enabled │
│  • Bot sends congrats   │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  30 days active +       │
│  community nominated    │
│  → Builder Lead         │
│  (manual by Stewards)   │
└─────────────────────────┘
```

### 3.2 Introduction Message Template (Prompt in `#forge-intros`)

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔥 NEW FORGER INTRODUCTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Copy, paste, fill in, and send!

**Name:**
*(your name or alias)*

**What I'm building right now:**
*(current project — be specific)*

**My stack:**
*(tools, languages, AI models you use)*

**My goal for the next 30 days:**
*(what do you want to ship?)*

**I can help others with:**
*(your superpower — what's your expertise?)*

**Fun fact about me:**
*(optional — make it weird)*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 3.3 Automated Promotion Messages

**Apprentice → Forger (Day 7):**

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔥 LEVEL UP: You're now a **Forger**!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hey {user.name}, you've been active for 7 days. That's not nothing.

**Your new perimeters:**
✅ Full access to all builder channels
✅ Share projects in #💬-show-and-tell
✅ File sharing enabled in all channels
✅ Access to #💬-collab-requests

Keep building. Keep sharing. The forge rewards action.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Forger → Builder Lead (Nomination):**

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ PROMOTION: You've earned **Builder Lead**!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{user.name}, this one means something.

The community nominated you. The Stewards approved.
You've consistently helped others, shared knowledge, and shipped quality work.

**New privileges:**
• Priority voice access
• Help moderate discussions
• Shape community direction

Lead by example. 🔥

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 4. Bot Configuration

### 4.1 Recommended Bot Stack

| Bot | Purpose | Config Priority |
|---|---|---|
| **Carl-bot** | Reaction roles, auto-mod, logging | Essential |
| **MEE6** | Leveling, welcome messages, announcements | Essential |
| **Dyno** | Moderation, auto-mod backup, custom commands | Recommended |
| **Statbot** | Server analytics, engagement tracking | Recommended |
| **Ticket Tool** | Support ticket system in `#help-and-support` | Recommended |
| **Groovy / Hydra** | Music in `#music-lounge` | Optional |

### 4.2 Carl-bot Setup (Reaction Roles & Auto-Mod)

#### Reaction Role Message (Posted in `#roles`)

*Configure Carl-bot to listen for reactions on this message:*

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 🛠️ Select Your Roles
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**🏗️ BUILDER TYPE:**
🤖 **AI Engineer** — Building AI agents, LLM apps, pipelines
💻 **Full-Stack Dev** — Web apps, SaaS, products
📊 **Data Builder** — Data pipelines, analytics, visualization
🎨 **Creative Builder** — Design, content, UI/UX
📱 **Mobile Dev** — iOS, Android, cross-platform

**💬 LANGUAGE / TOOLS:**
🐍 Python
⚛️ JavaScript / TypeScript
☕ Java / Kotlin
🦀 Rust
⚡ Go

**🔔 NOTIFICATIONS:**
📣 **Announcements** — @mention for major updates only
🎪 **Events** — Workshop & event reminders
📝 **Daily Prompts** — Get the daily challenge prompt via DM

**✅ VERIFICATION:**
☑️ **I agree to the rules** — Required to unlock the server
→ React to gain full access!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### Auto-Mod Rules (Carl-bot)

| Rule | Action | Config |
|---|---|---|
| **Mass mentions** | Block + warn | > 5 mentions per message |
| **Spam** | Mute 10min | > 5 identical messages in 10s |
| **External links** | Delete + warn | Only allowed in `#resources`, `#project-posts`, `#show-and-tell` |
| **Bad words** | Delete + DM warning | Use blacklists + AI filter |
| **Caps lock** | Delete | > 70% caps in message > 15 chars |
| **Max message length** | Delete | > 2000 chars |

### 4.3 MEE6 Setup (Welcome & Leveling)

#### Welcome Configuration

```
MEE6 Dashboard → Settings:
  → Send welcome message: ON
  → Send in: Direct Message (server)
  → Message: [Use DM template from §2.2]
  → Send role given notification: ON
    → "You received the role @{role-name}!"
```

#### Leveling System

| Level | Role Reward | XP Needed |
|---|---|---|
| 5 | — | 500 XP |
| 10 | 🌟 "Active Forger" role (cosmetic, gold dot) | 2,000 XP |
| 20 | — | 8,000 XP |
| 30 | 🏆 "Veteran Builder" role | 20,000 XP |

**MEE6 XP Settings:**
- Gain rate: 15-25 XP per message
- Message cooldown: 60 seconds
- XP disabled in: `#off-topic`, `#meme-forge`, `#bot-commands`
- `/leaderboard` channel: `#bot-commands`

### 4.4 Dyno Configuration (Moderation Backup)

```
Dyno Custom Commands:

  ?rules    → Posts channel rules in current channel
  ?links    → Posts quick links directory
  ?help     → Posts how to get support
  ?status   → Shows current server stats (members, online, etc.)

Dyno Auto-Mod:
  → Duplicate text: 5x → mute 5min
  → Fast message spam: 7 messages / 7s → timeout 10min
  → Spoiler mass mention: block
```

### 4.5 Role Assignment Automation Flow

```
ON MEMBER JOIN
    │
    ├── MEE6/Bot: Grant "Apprentice" role
    ├── MEE6/Bot: Send DM welcome message
    ├── Log to #bot-commands: "{user} joined — Apprentice"
    │
ON REACTION (Carl-bot):
    ├── React ☑️ on rules message → unlock all channels
    ├── React 🤖/💻/📊/🎨/📱 → assign builder type role
    ├── React 🐍/⚛️/☕/🦀/⚡ → assign language role
    └── React 📣/🎪/📝 → assign notification preference role
    │
ON 7TH DAY (cron/scheduled):
    ├── Check: Apprentice + posted in #forge-intros + active
    ├── Promote to "Forger"
    ├── Send DM promotion message
    └── Log to #moderation-log
    │
ON NOMINATION:
    ├── Builder Lead nomination form
    ├── Steward review
    ├── Approve → promote + send DM
```

---

## 5. Community Guidelines

### 5.1 Server Rules (Posted in `#rules` — Read Only)

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📜 FORGE COMMUNITY RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*Last updated: [Date] | These rules are enforced by bots and Stewards.*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 1. RESPECT EACH OTHER

This is the #1 rule. Period.

• Treat every member with respect — regardless of experience level
• No harassment, hate speech, or discrimination
• No personal attacks. Critique the work, not the person
• Debate ideas, don't demolish people

> "Be the senior dev you needed as a junior."

## 2. NO SPAM OR SELF-PROMOTION

We love sharing work. We hate spam.

• Self-promotion only in #show-and-tell, #project-posts, or #collab-requests
• No unsolicited DMs for services/products
• No referral links, crypto shilling, or NFT promotion
• Post work, not ads. Show value first.
• Maximum 2 self-promotion posts per week per member

## 3. STAY ON TOPIC

Use the right channel for the right conversation.

• Off-topic goes in #off-topic — not #help-and-support
• Technical questions in #help-and-support — not #general
• Prompts/challenges in #daily-prompts — not #show-and-tell
• Read channel descriptions — they exist for a reason

## 4. NO NSFW CONTENT

This is a builder community. Keep it professional.

• No NSFW images, text, or links — anywhere
• No gore, violence, or disturbing content
• Violations = instant ban, no warnings

## 5. PROTECT PRIVACY — YOURS AND OTHERS

• Do not share personal information (yours or anyone else's)
• No doxxing. Ever. Instant permanent ban.
• No screenshots of private messages without consent
• Be cautious sharing API keys, tokens, or credentials (bots will delete these)

## 6. SOURCE YOUR WORK

Give credit where credit is due.

• If you use someone's code, prompt, or idea — credit them
• Plagiarism of builds or content will be addressed
• AI-generated content is fine — just be transparent about it
• When in doubt, ask before reposting someone's work

## 7. BUILD IN PUBLIC — SHARE THE STRUGGLE

This community thrives on transparency.

• Share your failures, not just your wins
• "Almost working" is a valid status update
• Ask for help early — sunk cost fallacy is real
• Celebrate others' progress like it's your own

## 8. NO POLITICAL DEBATES

We're here to build, not argue about politics.

• Political discussions belong in DMs, not server channels
• This isn't censorship — it's curation. We choose focus.
• Hot-button topics derail builders. We protect the builder mentality.

## 9. FOLLOW DISCORD TOS

We follow Discord's rules so this server stays alive.

• No copyright infringement
• No illegal activities
• Age requirement: 13+ (Discord minimum)
• No raiding other servers from here

## 10. TRUST THE PROCESS

• Follow directions from Stewards and Builder Leads
• If you have feedback on rules/mods → DM a Steward
• Don't publicly argue moderation decisions — take it to DMs
• Appeals process: DM a Forge Master within 7 days

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**💡 Philosophy:** These rules exist to protect the culture of building. 
We're not here to police — we're here to empower. 
When in doubt, ask yourself: *"Does this help someone build something?"*

**🔨 Three-Strike System:**
1️⃣ Warning (bot + DM)
2️⃣ 24-hour timeout
3️⃣ Ban (appealable by DM to Forge Master)

*Violations that skip straight to ban: doxxing, illegal content, threats, NSFW.*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*Your forge. Your rules. Your future.* 🔥
```

### 5.2 Enforcement Guidelines for Staff

| Offense | First | Second | Third |
|---|---|---|---|
| Mild rule break | Delete + DM warning | Delete + formal warning in mod-log | 24h timeout |
| Spam/self-promo | Delete + DM warning | 12h timeout | 24h timeout → repeat = ban |
| Toxic behavior | Warning + DM | 24h timeout | 7-day timeout |
| Doxxing, illegal content, NSFW, threats | **Instant permanent ban** — no appeal | — | — |

---

## 6. 30-Day Content Calendar

### 6.1 Weekly Themes

| Week | Theme | Focus |
|---|---|---|
| **Week 1** | 🚀 Launch & Onboarding | Introduce the community, set the tone, welcome everyone |
| **Week 2** | 🧪 Build & Experiment | Technical content, tutorials, collaborative building |
| **Week 3** | ⏱️ Ship & Iterate | Focus on shipping, demo day prep, feedback sessions |
| **Week 4** | 🏆 Showcase & Grow | Demos, community voting, next-month planning |

### 6.2 Daily Content Schedule

#### WEEK 1 — 🚀 Launch Week

| Day | Channel | Content | Owner |
|---|---|---|---|
| **D1 (Sat)** | `📌-announcements` | 🔥 **Official Launch!** "Welcome to Forge — the AI Builder Operating System" + server tour video/GIF | Founder |
| **D1 (Sat)** | `💬-general` | **Launch Party** — Welcome thread, fun introductions, what are you most excited about? | Community |
| **D2 (Sun)** | `💬-daily-prompts` | **First Daily Prompt:** "Build something that makes you smile in under 1 hour" | Stewards |
| **D2 (Sun)** | `💬-forge-intros` | **Weekend Intro Thread** — Pinned intro message encouraging all new members to introduce | Stewards |
| **D3 (Mon)** | `📌-announcements` | **Welcome Thread #1** — Highlight 3 interesting new members from introductions | Builder Leads |
| **D3 (Mon)** | `💬-daily-prompts` | **Daily Prompt:** "Automate your morning routine — what would you automate?" | Stewards |
| **D3 (Mon)** | `💬-general` | **Monday Momentum** — "What are you building this week?" check-in thread | Community |
| **D4 (Tue)** | `💬-tutorials` | **Tutorial Tuesday** — Staff posts beginner-friendly LLM API integration guide | Builder Leads |
| **D4 (Tue)** | `💬-daily-prompts` | **Daily Prompt:** "Build a better README generator" | Stewards |
| **D5 (Wed)** | `💬-show-and-tell` | "What I Built This Week" — Early showcase for Week 1 builders | Community |
| **D5 (Wed)** | `💬-daily-prompts` | **Daily Prompt:** "Debug a worst-case scenario" (build an error parser/handler) | Stewards |
| **D6 (Thu)** | `💬-general` | **Throwback Thursday** — Share a build you're proud of from the past (screenshot!) | Community |
| **D6 (Thu)** | `💬-daily-prompts` | **Daily Prompt:** "Build something with a language/tool you've never used" | Stewards |
| **D7 (Fri)** | `🔊-help-voice` | **🔥 Office Hours #1** — Open Q&A, live help, casual format (10am-12pm ET) | Stewards + Builder Leads |
| **D7 (Fri)** | `📌-announcements` | **Week 1 Recap** — Stats, highlights, top builders, what's next | Founder |

#### WEEK 2 — 🧪 Build & Experiment

| Day | Channel | Content | Owner |
|---|---|---|---|
| **D8 (Sat)** | `💬-daily-prompts` | **Daily Prompt:** "Build an AI agent that summarizes your Discord messages" | Stewards |
| **D8 (Sat)** | `💬-resources` | **Resource Drop:** Curated list of AI builder tools & libraries | Builder Leads |
| **D9 (Sun)** | `💬-general` | **Weekend Build Jam** — Collaborative brainstorm: what should we build together? | Community |
| **D9 (Sun)** | `💬-daily-prompts` | **Daily Prompt:** "Build something inspired by nature" | Stewards |
| **D10 (Mon)** | `💬-tutorials` | **Tutorial Tuesday (Monday edition)** — "How to structure an AI builder project" | Builder Leads |
| **D10 (Mon)** | `💬-daily-prompts` | **Daily Prompt:** "Build a tool that saves you 10 minutes/day" | Stewards |
| **D11 (Tue)** | `💬-help-and-support` | **Tech Talk Tuesday** — "Struggling with API rate limits? Here's how we solved it" | Community Q&A |
| **D11 (Tue)** | `💬-daily-prompts` | **Daily Prompt:** "Build a better notification system" | Stewards |
| **D12 (Wed)** | `💬-show-and-tell` | **Foundry Spotlight** — Staff picks coolest builds from the week, deep dive on 1 | Stewards |
| **D12 (Wed)** | `💬-daily-prompts` | **Daily Prompt:** "Build something that teaches you something" | Stewards |
| **D13 (Thu)** | `💬-collab-requests` | **Collab Match Thursday** — Staff-run matching: who needs collaborators? | Stewards |
| **D13 (Thu)** | `💬-daily-prompts` | **Daily Prompt:** "Build something that combines two unrelated APIs" | Stewards |
| **D14 (Fri)** | `🔊-help-voice` | **🔥 Office Hours #2** — Focus: Getting unstuck on current projects | All |
| **D14 (Fri)** | `📌-announcements` | **Week 2 Recap + Demo Day Announcement** (Day 21) — Start signing up! | Founder |

#### WEEK 3 — ⏱️ Ship & Iterate

| Day | Channel | Content | Owner |
|---|---|---|---|
| **D15 (Sat)** | `📌-announcements` | **Demo Day Reveal** — Format, signup link, judges, prizes (roles/badges) | Founder |
| **D15 (Sat)** | `💬-daily-prompts` | **Daily Prompt:** "Polish one thing in your project — demo-ready version" | Stewards |
| **D16 (Sun)** | `💬-general` | **Sunday Shipping** — Casual "what did you ship/improve today?" thread | Community |
| **D16 (Sun)** | `💬-daily-prompts` | **Daily Prompt:** "Build a landing page for your project" | Stewards |
| **D17 (Mon)** | `💬-feedback-corner` | **Feedback Sprint #1** — Schedule 1-on-1 feedback sessions, 10 min each | Stewards |
| **D17 (Mon)** | `💬-daily-prompts` | **Daily Prompt:** "Build a changelog generator for your project" | Stewards |
| **D18 (Tue)** | `💬-tutorials` | **Tutorial Tuesday** — "How to demo your project: Storytelling for Builders" | Builder Leads |
| **D18 (Tue)** | `💬-daily-prompts` | **Daily Prompt:** "Build the worst UI possible (and make it fun)" | Stewards |
| **D19 (Wed)** | `📌-event-info` | **Demo Day Rehearsal** — Volunteers do 2-min dry runs, get feedback | Founder |
| **D19 (Wed)** | `💬-daily-prompts` | **Daily Prompt:** "Build a feature you're afraid to ship" | Stewards |
| **D20 (Thu)** | `💬-general` | **Almost There!** — Pep talk thread, share final progress screenshots | Community |
| **D20 (Thu)** | `💬-daily-prompts` | **Daily Prompt:** "Build a 'thank you' page for your demo audience" | Stewards |
| **D21 (Fri)** | `📌-announcements` | **Demo Day is TOMORROW!** — Schedule, links, final reminders | Founder |
| **D21 (Fri)** | `💬-general` | **Pre-Demo Hype** — Excitement thread, predictions, good luck wishes | Community |

#### WEEK 4 — 🏆 Showcase & Grow

| Day | Channel | Content | Owner |
|---|---|---|---|
| **D22 (Sat)** | `🔊-event-stage` | 🎉 **DEMO DAY!** — Live presentations, judge feedback, celebration | All |
| **D22 (Sat)** | `📌-announcements` | **Demo Day Highlights** — Best demos, community favorite, MVP award | Founder |
| **D23 (Sun)** | `💬-show-and-tell` | **Post-Demo Showcase** — Everyone posts their final project with demo link | Community |
| **D23 (Sun)** | `💬-daily-prompts` | **Daily Prompt:** "Build a community extension/module for Forge" (open-source idea) | Stewards |
| **D24 (Mon)** | `💬-general` | **What I Learned This Month** — Reflections thread, biggest lessons | Community |
| **D24 (Mon)** | `💬-daily-prompts` | **Daily Prompt:** "Build a retrospective tool for your build month" | Stewards |
| **D25 (Tue)** | `💬-tutorials` | **Tutorial Tuesday** — Best tutorial from the month, community-voted | Community vote |
| **D25 (Tue)** | `💬-daily-prompts` | **Daily Prompt:** "Build something for someone else in this community" | Stewards |
| **D26 (Wed)** | `💬-general` | **Community Pulse** — "What should Forge look like next month?" feedback thread | Founder + Staff |
| **D26 (Wed)** | `💬-daily-prompts` | **Daily Prompt:** "Build a tool to measure your productivity" | Stewards |
| **D27 (Thu)** | `💬-off-topic` | **Fun Build Challenge** — "Build the most useless thing. Make it brilliant." | Community |
| **D27 (Thu)** | `📌-announcements` | **Month 1 Wrap-Up** — Stats, growth, top contributors, shoutouts | Founder |
| **D28 (Fri)** | `🔊-help-voice` | **🔥 Office Hours #4** — Month retrospective, help with November projects | All |
| **D28 (Fri)** | `💬-general` | **Weekend Plans** — November build plans, goals, commitments | Community |
| **D29 (Sat)** | `💬-general` | **30-Day Challenge** — Announce a 30-day build challenge for next month | Founder |
| **D29 (Sat)** | `💬-daily-prompts` | **Daily Prompt:** "Plan your next 30-day build — what's the goal?" | Stewards |
| **D30 (Sun)** | `📌-announcements` | **🎊 30 Days of Forge!** — Grand recap, community awards, looking ahead to Month 2 | Founder |

### 6.3 Recurring Weekly Events

| Day | Time (ET) | Event | Channel |
|---|---|---|---|
| **Monday** | 12 PM | "Monday Momentum" check-in thread | `#general` |
| **Tuesday** | 3 PM | Tech Talk Tuesday (tutorial/AMA) | `#tutorials` or `#help-and-support` |
| **Wednesday** | 5 PM | Foundry Spotlight (build showcase) | `#show-and-tell` |
| **Thursday** | 12 PM | Collab Thursday (matching) | `#collab-requests` |
| **Friday** | 10 AM - 12 PM | 🔥 Office Hours (live Q&A) | `#help-voice` |
| **Weekend** | Various | Build Jams / Social Events | `#general` + voice |

---

## 7. Implementation Checklist

### Phase 1: Foundation (Day -1 to Day 0)

- [ ] Create Discord server with name "Forge — AI Builder OS 🔥"
- [ ] Upload server icon (512×512) and banner (960×540)
- [ ] Set up server description and invite splash screen settings
- [ ] Create all categories and channels per §1.2
- [ ] Create all roles per §1.3 with correct colors and hierarchy
- [ ] Configure role permissions matrix (§1.3)
- [ ] Set server default notification to "Only @mentions"
- [ ] Set slowmode on `#general` (15s) and `#daily-builds` (30s)
- [ ] Disable NSFW channels in Server Settings

### Phase 2: Content (Day -1 to Day 0)

- [ ] Write and pin `#welcome` static embed (use §2.1 template)
- [ ] Write and pin `#rules` message (use §5.1 template)
- [ ] Write and pin `#roles` reaction role embed (use §4.2 template)
- [ ] Write `#forge-intros` intro prompt (use §3.2 template)
- [ ] Create `#announcements` with initial launch message drafted

### Phase 3: Bots (Day 0)

- [ ] Invite Carl-bot, MEE6, Dyno, Statbot to server
- [ ] Configure Carl-bot reaction roles (§4.2)
- [ ] Configure Carl-bot auto-mod rules (§4.2)
- [ ] Configure MEE6 DM welcome message (§2.2)
- [ ] Configure MEE6 welcome channel
- [ ] Configure MEE6 leveling system (§4.3)
- [ ] Configure Dyno custom commands (§4.4)
- [ ] Set up Ticket Tool in `#help-and-support`
- [ ] Test all bots in `#bot-commands` channel
- [ ] Configure bot logging channels

### Phase 4: Go-Live (Day 1)

- [ ] Post launch announcement in `#announcements`
- [ ] Post welcome thread in `#general`
- [ ] Post first Daily Prompt in `#daily-prompts`
- [ ] Invite initial seed members (founders, team, beta testers)
- [ ] Monitor bots for correct behavior
- [ ] Be active in `#general` — energy sets the tone

### Phase 5: First Week (Day 1-7)

- [ ] Welcome every new member personally in `#forge-intros`
- [ ] Engage in every Daily Prompt thread
- [ ] Monitor `#help-and-support` — answer every question
- [ ] Hold first Office Hours (Day 7)
- [ ] Collect feedback on server layout, channels, rules
- [ ] Promote first Apprentices → Forgers (Day 7)
- [ ] Post Week 1 recap

---

## Appendix A: Brand Voice Guidelines for Discord

When posting as Forge staff, follow these voice principles:

| ✅ Do | ❌ Don't |
|---|---|
| "Build something extraordinary." | "Hope you like our server!" |
| "Your forge. Your rules. Your future." | "Welcome to the community." |
| "Ship it. Break it. Ship it again." | "Check out our cool channels." |
| "Done beats perfect." | "We hope you find what you're looking for." |
| Use 🔥 🔨 ⚡ 🧱 🛠️ emoji | Overdo emojis |
| Direct, energetic, builder-first | Corporate, passive, generic |

## Appendix B: Emergency Procedures

**Server raid / spam attack:**
1. Enable raid mode in Server Settings (auto-mod escalation)
2. Temporarily disable new member posting via channel overwrites
3. Alert Stewards via DM
4. Review audit log, ban offending accounts
5. Issue incident report in `#announcements` if needed

**Bot malfunction:**
1. Disable bot commands in impacted channels via overwrites
2. Check bot status page / bot support server
3. Have backup bot ready (if Carl-bot fails, Dyno has reaction roles)
4. Manual role assignment until resolved

---

*Built by builders, for builders. This document is a living reference — update as the community grows.*

*Last updated: May 30, 2026*
*Version: 1.0*
*Forge — AI Builder Operating System 🔥*
