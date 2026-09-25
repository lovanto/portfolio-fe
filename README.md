# Rifky Lovanto - Portfolio

Personal portfolio website for Rifky Lovanto, a Backend Engineer & Software Architect. Built with React, TypeScript, and Tailwind CSS. All portfolio content is stored in the frontend; no backend or API is required.

## Tech Stack

- **Frontend**: React 18, TypeScript 5.5, Vite 5
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 7
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm

### Installation

```bash
pnpm install
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
  data/          Local portfolio content, including all 27 project records
public/          Static assets, including local project media
```

## Features

- Dark/light mode with system preference detection
- Responsive sidebar with collapse toggle
- Animated typing effect on the hero section
- 27 projects with search and tag filtering
- Scroll-reveal animations via IntersectionObserver
- Contact form opens the visitor's email client; no messages are sent through a backend
- Mobile-friendly layout
