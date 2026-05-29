# Deployment Guide

## Vercel Deployment (Recommended)

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Forge v0.2.0 - Core platform"
git remote add origin https://github.com/YOUR_USERNAME/forge.git
git push -u origin main
```

2. Connect to Vercel:
- Go to vercel.com
- Import your GitHub repo
- Framework: Next.js (auto-detected)
- Build command: `npm run build`
- Output directory: `.next`

3. Environment Variables (add in Vercel dashboard):
```
NEXT_PUBLIC_OPENROUTER_API_KEY=sk-or-v1-...
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

4. Deploy! Vercel will auto-deploy on every push.

## Railway Deployment (Alternative)

1. Create a new project on railway.app
2. Connect your GitHub repo
3. Set environment variables
4. Deploy

## Environment Variables

Required:
- `NEXT_PUBLIC_OPENROUTER_API_KEY` - Your OpenRouter API key

Optional:
- `NEXT_PUBLIC_APP_URL` - Your app's URL (for OpenRouter referrer)
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL (for future backend)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key (for future backend)
