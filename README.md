# Rifky Lovanto - Portfolio

Personal portfolio website for Rifky Lovanto, a Backend Engineer & Software Architect. Built with React, TypeScript, and Tailwind CSS, featuring a dark/light theme toggle, animated hero section, project showcase with search/filter, and a Supabase-backed contact form.

## Tech Stack

- **Frontend**: React 18, TypeScript 5.5, Vite 5
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 7
- **Backend**: Supabase (contact form)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
pnpm run dev
```

### Build

```bash
pnpm run build
```

### Preview Production Build

```bash
pnpm run preview
```

### Lint

```bash
pnpm run lint
```

### Type Check

```bash
pnpm run typecheck
```

## Project Structure

```
src/
  components/    UI components (Sidebar, Hero, About, Projects, Skills, Contact, etc.)
  hooks/         Custom hooks (theme, sidebar collapse, scroll reveal)
  lib/           Supabase client
public/          Static assets (resume PDF, profile photo, logo)
supabase/        Database migrations
```

## Features

- Dark/light mode with system preference detection
- Responsive sidebar with collapse toggle
- Animated typing effect on the hero section
- 27 projects with search and tag filtering
- Scroll-reveal animations via IntersectionObserver
- Contact form with Supabase backend (RLS-protected)
- Mobile-friendly layout
