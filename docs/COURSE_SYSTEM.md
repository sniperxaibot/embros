# COURSE_SYSTEM.md

## Overview
The Course System is NOT a traditional course library. Instead, it's a dynamic, goal-driven system that generates personalized learning pathways on-the-fly based on the user's specific project idea. Think of it as "courses as a service" — each user gets a custom curriculum built just for what they want to build.

## Core Philosophy
- **No one-size-fits-all**: Every user's learning path is unique to their goals, background, and learning style
- **Just-in-time sequencing**: Concepts are introduced only when needed for the current building task
- **Project-first**: Learning exists to serve building, not the other way around
- **Adaptive difficulty**: The system constantly calibrates challenge to the user's Zone of Proximal Development
- **Mastery-based progression**: Users advance when they demonstrate capability, not after fixed time intervals

## How It Differs from Traditional Courses

| Traditional Course Platform | Builder's Companion Course System |
|----------------------------|-----------------------------------|
| Fixed curriculum for all | Personalized pathway per goal |
| Learn now, build later | Build while learning, learn while building |
| Passive consumption (video, reading) | Active application (build, modify, explain) |
| One-way instruction | Dialogue with AI teaching partners |
| Completion = finished videos | Completion = shipped product |
| Standardized assessments | Contextual skill demonstrations |
| Broad, shallow coverage | Deep, relevant skill development |
| Certificate of completion | Portfolio of real projects |

## Core Components

### 1. Goal-to-Course Mapper
**Function**: Transforms a user's idea into a structured learning-building pathway.
- **Input**: User's project description (e.g., "I want to build a habit tracking app with streaks and reminders")
- **Process**:
  - Parse goal into core features and components
  - Consult Knowledge Graph to map features to required skills/concepts
  - Sequence skills in optimal learning order (foundations → integrations → refinements)
  - Estimate effort and identify potential stumbling points
  - Generate a visual roadmap with milestones and learning objectives
- **Output**: Adaptive course outline with:
  - Modules (grouped by theme or project phase)
  - Lessons (micro-learning units tied to specific building tasks)
  - Projects (hands-on building challenges)
  - Milestones (tangible progress markers)
  - Estimated time and difficulty progression

### 2. Dynamic Lesson Sequencer
**Function**: Determines the exact next lesson based on current context.
- **Inputs**:
  - User's current building task and stumbling points
  - Skill proficiency levels from User Model
  - Recent learning effectiveness and engagement
  - Time available and energy levels (context awareness)
- **Process**:
  - Identify the knowledge or skill gap blocking progress
  - Select the most effective lesson format for this user and concept
  - Determine optimal difficulty (review, new learning, extension)
  - Check for prerequisite readiness
  - Choose timing (immediate barrier resolution vs. scheduled learning slot)
- **Output**: Specific lesson recommendation with:
  - Learning objective
  - Format (explanation, example, interactive, video)
  - Estimated time
  - Prerequisites check
  - Application opportunity

### 3. Mastery-Based Advancement System
**Function**: Determines when a user is ready to move to the next concept or skill level.
- **Evidence Considered**:
  - Successful application in building tasks (with decreasing assistance)
  - Performance on micro-challenges and practice opportunities
  - Ability to explain concepts in their own words
  - Transfer to slightly varied contexts
  - Self-assessment and reflection quality
  - Time and effort expended (to detect potential fluency)
- **Process**:
  - Bayesian updating of skill proficiency estimate
  - Confidence interval tracking
  - Readiness threshold (e.g., 80% probability of competence at level)
  - Optional "challenge mode" for users who want to test themselves
- **Output**: Proficiency level update + suggestions for next learnable skills

### 4. Contextual Content Adapter
**Function**: Tailors lesson content to the user's specific project, background, and preferences.
- **Adaptations**:
  - **Project Context**: Examples and exercises use the user's actual project idea
  - **Background**: Adjusts assumed knowledge (e.g., skips basics for those with experience)
  - **Learning Style**: Visual vs. textual vs. interactive vs. example-based
  - **Interest Domains**: Framing concepts in areas the user cares about (games, social good, business, etc.)
  - **Language & Culture**: Localization and culturally relevant examples
  - **Cognitive Load**: Adjusts complexity and pacing based on user signals
- **Process**:
  - Retrieve base lesson content from Knowledge Graph or generator
  - Apply contextual inserts (project-specific examples, analogies)
  - Adjust difficulty and depth based on user model
  - Format conversion (text to visual, add interactive elements)
  - Add project-specific application prompt
- **Output**: Personalized lesson ready for delivery

### 5. Practice & Application Generator
**Function**: Creates opportunities to apply learning immediately.
- **Types of Practice**:
  - **Direct Application**: "Try this in your project now"
  - **Varied Context**: "Apply this concept to a different feature in your app"
  - **Error Correction**: "Fix this broken implementation"
  - **Extension**: "How would you make this more robust/scalable?"
  - **Explanation**: "Teach this concept back to me in your own words"
  - **Prediction**: "What do you think will happen if we change X?"
- **Process**:
  - Analyze the concept being learned and current project state
  - Generate context-appropriate practice prompt
  - Provide scaffolding hints (optional)
  - Set up environment for immediate trying (if code/design)
  - Include feedback mechanism (instant validation, AI review, or self-check)
- **Output**: Practice opportunity embedded in or immediately following the lesson

### 6. Review & Retention Spacer
**Function**: Implements spaced repetition and varied review for long-term retention.
- **Mechanisms**:
  - **Spaced Repetition**: Schedule review of concepts at optimal intervals
  - **Varied Practice**: Revisit concepts in different project contexts
  - **Retrieval Practice**: Prompt recall without cues
  - **Reflection Prompts**: "How has your understanding of X changed since last week?"
  - **Integration Checks**: "Where could you use what you learned about Y in your current project?"
- **Process**:
  - Track when concepts were last learned and applied
  - Use forgetting curve models to schedule review
  - Vary review context to build flexible understanding
  - Combine with meta-learning prompts
- **Output**: Scheduled review opportunities that feel relevant, not repetitive

## Course Structure Examples

### Example 1: Mobile App with Firebase Backend
**Goal**: "Build a plant care app with watering reminders and photo journal"
**Generated Course Structure**:
```
Module 1: Getting Started with Mobile Development
  Lesson 1.1: Setting up your development environment (Expo/RN)
  Lesson 1.2: Your first screen: Hello, Plant World! (Text, styling)
  Practice: Modify the text and add an image
  Milestone 1: Basic screen with custom text and image

Module 2: Building Interactive Interfaces
  Lesson 2.1: Handling user input (text fields, buttons)
  Lesson 2.2: State basics: tracking watering counts
  Practice: Create a button that increments a counter
  Milestone 2: Interactive counter that updates the display

Module 3: Persistent Data with Firebase
  Lesson 3.1: What is a database? (Firebase/Firestore intro)
  Lesson 3.2: Saving plant data to the cloud
  Practice: Add a plant to your Firebase database
  Lesson 3.3: Reading and displaying your plant list
  Practice: Fetch plants from DB and render them
  Milestone 3: Screen showing plants from Firebase

Module 4: Real-Time Features & Notifications
  Lesson 4.1: Real-time updates with Firebase listeners
  Lesson 4.2: Scheduling local notifications (watering reminders)
  Practice: Set up a reminder that fires in 1 minute
  Milestone 4: Plants update in real-time when changed elsewhere

Module 5: User Accounts & Personalization
  Lesson 5.1: Introduction to authentication
  Lesson 5.2: Setting up email/password sign up
  Practice: Create account and sign in
  Lesson 5.3: Associating plants with users
  Practice: Ensure users only see their own plants
  Milestone 5: Persistent user accounts with private plant data

Module 6: Polish & Publishing
  Lesson 6.1: Basic UI/UX principles for mobile
  Lesson 6.2: Preparing for app store submission
  Practice: Create icon and splash screen
  Milestone 6: Deployed test build shareable with friends
```

### Example 2: Marketing Automation Tool
**Goal**: "Build a tool that personalizes email follow-ups based on website visits"
**Generated Course Structure**:
```
Module 1: Web Tracking Fundamentals
  Lesson 1.1: How websites track visitors (cookies, localStorage)
  Lesson 1.2: Capturing page views and clicks
  Practice: Log every visit to a test page
  Milestone 1: Basic visitor logging system

Module 2: Data Modeling for Behavior
  Lesson 2.1: Structuring visitor data (events, properties)
  Lesson 2.2: Segmenting visitors by behavior
  Practice: Create "visited pricing page" segment
  Milestone 2: Ability to tag visitors based on actions

Module 3: Email Personalization Basics
  Lesson 3.1: Merge variables and templates
  Lesson 3.2: Dynamic content based on segments
  Practice: Create email that changes based on visitor segment
  Milestone 3: Email that says "Hey [Name], saw you checked [Page]!"

Module 4: Automation Workflows
  Lesson 4.1: Triggers and delays (send email 2 hours after visit)
  Lesson 4.2: Multi-step nurture sequences
  Practice: Set up 3-email sequence for abandoned cart
  Milestone 4: Working automation with timing and branching

Module 5: Analytics & Optimization
  Lesson 5.1: Measuring email performance (open, click, conversion)
  Lesson 5.2: A/B testing subject lines and content
  Practice: Test two versions of your follow-up email
  Milestone 5: Dashboard showing automation performance

Module 6: Ethics & Compliance
  Lesson 6.1: GDPR, CCPA, and consent basics
  Lesson 6.2: Building trust through transparency
  Practice: Add consent checkbox and preference center
  Milestone 6: Compliant automation tool ready for use
```

## Implementation Approach

### MVP Version
- **Pre-built Course Templates**: For common project types (web app, mobile app, automation, game, data tool)
- **Simple Goal Matching**: User selects project type, system applies relevant template
- **Basic Personalization**: Insert user's project name/examples into lessons
- **Static Sequencing**: Fixed order within template, but user can skip ahead
- **Manual Mastery**: User marks lessons as complete when they feel ready
- **Progress Tracking**: Percentage of course completed + project milestones

### Enhanced Version
- **True Goal Parsing**: NLP extracts features from free-form goal description
- **Dynamic Skill Mapping**: Reverse-maps features to skills using Knowledge Graph
- **Adaptive Sequencing**: Reorder lessons based on user's background and gaps
- **Real-time Personalization**: Lessons generated/adapted on-demand
- **Mastery Detection**: System infers readiness from building attempts and practice
- **Contextual Practice**: Practice opportunities tied to current project state
- **Integrated Review**: Spaced repetition scheduled based on learning history

### Future Version
- **Generative Course Creation**: AI creates entirely custom lessons for novel combinations
- **Predictive Pathing**: Anticipates future skill needs based on trajectory
- **Community-Sourced Paths**: Opt-in to see how others with similar goals learned
- **Cross-Domain Projects**: Projects that blend multiple areas (e.g., art + code + business)
- **Lifelong Learning Mode**: Suggests next projects based on evolved skill profile

## Integration with Other Systems

### With Learning Engine
- Course System provides the macro structure and sequencing
- Learning Engine delivers the micro-lessons and handles just-in-time barrier resolution
- Course System tells Learning Engine: "User should learn concept X next"
- Learning Engine tells Course System: "User struggled with Y, suggesting need for more Z"

### With Agent Engine
- Course System defines what building tasks should be attempted at each stage
- Agent Engine provides the assistance levels and explanations for those tasks
- Course System uses Agent Engine's observations to assess skill mastery
- Agent Engine relies on Course System to know what concepts the user is currently learning

### With Adaptive Learning System (ALS)
- Course System is a major component of the ALS, focusing on:
  - The structured pathway and milestone progression
  - The goal-to-skill mapping and sequencing logic
  - The mastery-based advancement criteria
- The ALS provides:
  - The continuous feedback loops and context awareness
  - The challenge calibration and assistance leveling
  - The long-term profile evolution and ecosystem awareness

## Success Metrics for the Course System

### Leading Indicators
- **Goal-Relevance Rating**: User scores on how relevant they find each lesson to their immediate goal (target: >4/5)
- **Lesson-to-Application Speed**: Median time from lesson completion to application in project (target: <15 minutes)
- **Prerequisite Success Rate**: Percentage of users who successfully apply a lesson having completed its prerequisites (target: >80%)
- **Engagement Density**: Ratio of building time to passive learning time (target: >3:1 building:learning)
- **Concept Confusion Rate**: Drop in user-reported confusion after lesson delivery (target: >50% reduction)

### Lagging Indicators
- **Project Completion Rate**: Percentage of users who complete and launch a project they started using the course system
- **Skill Transfer Evidence**: Ability to apply course-taught concepts in new, unfamiliar project contexts
- **Time to Competency**: Reduction in time needed to achieve proficiency in core skills vs. traditional learning
- **Retention at 1 Month**: Proficiency in key concepts after a period of non-use
- **Next Project Initiation**: Rate at which users start a new self-directed project after completing one

## Conclusion
The Course System replaces static, one-size-fits-all education with dynamic, goal-driven learning that exists solely to empower users to build what they care about. By continuously mapping goals to skills, sequencing learning just-in-time, adapting to individual needs, and verifying mastery through application, it ensures that every minute spent learning directly increases the user's capability to bring their ideas to life.

This is learning as it should be: purposeful, applicable, and inseparable from the act of creation.