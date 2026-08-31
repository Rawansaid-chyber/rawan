# Rawan Al Siyabi — Portfolio Website

A VS Code-themed portfolio built with Next.js 16, React 19, and Tailwind CSS v4.

## Tech Stack

- **Framework**: Next.js 16.3 (App Router, Static Export)
- **UI**: React 19, Tailwind CSS v4, Framer Motion
- **3D**: Three.js + React Three Fiber, cobe (globe)
- **Icons**: Lucide React, React Icons (Simple Icons)
- **Fonts**: Cairo, JetBrains Mono, Inter (Google Fonts)

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Production build
npm run build
```

## Deploying to Vercel

### Option A — Vercel CLI (fastest)

```bash
# 1. Install Vercel CLI globally (once)
npm i -g vercel

# 2. From the /site directory, deploy
cd site
vercel

# 3. Follow prompts, then for production:
vercel --prod
```

### Option B — GitHub Integration (recommended for continuous deployment)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import the GitHub repository
4. Set **Root Directory** to `site`
5. Vercel auto-detects Next.js — click **Deploy**

> **Note**: No environment variables are required. The site is fully static.

## Project Structure

```
site/
├── app/
│   ├── layout.tsx        # Root layout with metadata & fonts
│   ├── page.tsx          # Main IDE-shell page
│   └── globals.css       # Design tokens & global styles
├── components/
│   ├── ide/              # TitleBar, TabBar, Sidebar, StatusBar
│   └── sections/         # Hero, About, Stack, Portfolio, World, Resume, Contact
├── content.config.ts     # Single source of truth for all portfolio content
├── i18n/translations.ts  # English / Arabic translations
├── public/
│   ├── avatar.jpg
│   ├── resume.pdf
│   └── images/           # Project & work-experience photos
├── next.config.ts        # Image optimization + security headers
└── vercel.json           # Vercel deployment config
```

## Customising Content

All content lives in [`content.config.ts`](./content.config.ts) — edit the exported objects to update your profile, experience, skills, projects, and interests without touching any component files.
