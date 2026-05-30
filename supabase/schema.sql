-- ═══════════════════════════════════════════════════
-- FORGE — Supabase Schema
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════════════

-- Waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  source text DEFAULT 'landing-page',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on waitlist
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (waitlist signups)
CREATE POLICY "Allow anonymous waitlist signups"
  ON public.waitlist FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow service role to read all
CREATE POLICY "Allow service role to read waitlist"
  ON public.waitlist FOR SELECT
  TO service_role
  USING (true);

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  name text,
  avatar_url text,
  goal text,         -- what they want to build
  level text DEFAULT 'beginner', -- beginner, intermediate, advanced
  onboarding_completed boolean DEFAULT false,
  discord_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  idea text,
  template text,
  tech_stack text[] DEFAULT '{}',
  status text DEFAULT 'planning', -- planning, building, testing, deployed
  files jsonb DEFAULT '[]'::jsonb,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own projects"
  ON public.projects FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  title_ro text,
  description text,
  description_ro text,
  icon text,
  color text,
  level text DEFAULT 'beginner',
  tags text[] DEFAULT '{}',
  total_lessons int DEFAULT 0,
  estimated_hours int DEFAULT 0,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published courses"
  ON public.courses FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Course modules
CREATE TABLE IF NOT EXISTS public.course_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  title_ro text,
  "order" int DEFAULT 0
);

ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read modules"
  ON public.course_modules FOR SELECT
  TO anon, authenticated
  USING (true);

-- Lessons
CREATE TABLE IF NOT EXISTS public.lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid REFERENCES public.course_modules(id) ON DELETE CASCADE NOT NULL,
  slug text NOT NULL,
  title text NOT NULL,
  title_ro text,
  content text,
  content_ro text,
  type text DEFAULT 'explanation', -- explanation, example, exercise, builder, summary
  estimated_minutes int DEFAULT 15,
  "order" int DEFAULT 0,
  UNIQUE(module_id, slug)
);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read lessons"
  ON public.lessons FOR SELECT
  TO anon, authenticated
  USING (true);

-- Lesson progress
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id uuid REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own progress"
  ON public.lesson_progress FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Skills table
CREATE TABLE IF NOT EXISTS public.skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  category text,
  description text
);

-- User skills (proficiency tracking)
CREATE TABLE IF NOT EXISTS public.user_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  skill_id uuid REFERENCES public.skills(id) ON DELETE CASCADE NOT NULL,
  level int DEFAULT 0, -- 0-100
  UNIQUE(user_id, skill_id)
);

-- ─── Functions ───

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ─── Seed Data ───

-- Insert default skills
INSERT INTO public.skills (name, category, description) VALUES
  ('HTML', 'Frontend', 'Basic web structure'),
  ('CSS', 'Frontend', 'Styling and layout'),
  ('JavaScript', 'Frontend', 'Programming language for the web'),
  ('React', 'Frontend', 'Component-based UI framework'),
  ('Next.js', 'Frontend', 'Full-stack React framework'),
  ('TypeScript', 'Frontend', 'Typed JavaScript'),
  ('Tailwind CSS', 'Frontend', 'Utility-first CSS framework'),
  ('Node.js', 'Backend', 'JavaScript runtime'),
  ('Python', 'Backend', 'General-purpose programming language'),
  ('PostgreSQL', 'Database', 'Relational database'),
  ('API Design', 'Backend', 'Building RESTful and GraphQL APIs'),
  ('Git', 'DevOps', 'Version control'),
  ('Testing', 'Quality', 'Writing and running tests'),
  ('UI Design', 'Design', 'User interface design principles'),
  ('UX Design', 'Design', 'User experience design'),
  ('Prompt Engineering', 'AI', 'Writing effective AI prompts')
ON CONFLICT (name) DO NOTHING;
