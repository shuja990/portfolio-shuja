# Copilot Instructions — Shuja Ali Portfolio

## Architecture Overview

Single-page portfolio site built with **Next.js 16 (App Router)** + **React 19** + **TypeScript**. Uses **Turbopack** as the default bundler (Next.js 16 default). Scaffolded via v0 (Vercel's AI tool). All routes live under `app/`; only one page (`app/page.tsx`) composes section components sequentially: Hero → About → Skills → Experience → Projects → GitHubActivity → Contact → Footer + ContactWidget.

There is **no backend or API routes** — the GitHub activity component fetches directly from `https://api.github.com` client-side, and the contact form uses **EmailJS** (`@emailjs/browser`) for sending emails without a server.

## Key Conventions

- **All section components are client components** (`"use client"`) because they rely on browser APIs (scroll, IntersectionObserver, WebGL) and animation libraries.
- **UI primitives** come from **shadcn/ui** (Radix + Tailwind). Config lives in `components.json`. Add new primitives via `npx shadcn@latest add <component>` — they land in `components/ui/`.
- **Animations**: Framer Motion (`motion` from `framer-motion`) for enter/scroll animations; `react-intersection-observer` (`useInView`) triggers them when sections scroll into viewport with `triggerOnce: true, threshold: 0.1`.
- **Three.js** is dynamically imported (`next/dynamic`, `ssr: false`) in `components/hero.tsx` for a WebGL particle background. It has a graceful fallback (`components/tech-fallback.tsx`) when WebGL is unavailable.
- **Icons**: Lucide React (`lucide-react`) exclusively — do not add other icon libraries.

## Styling System

- **Tailwind CSS 3** with `tailwindcss-animate` plugin. Colors use HSL CSS variables defined in `app/globals.css` (light/dark themes via `:root` / `.dark` class).
- **Three custom fonts** loaded via `next/font/google` in `app/layout.tsx`: Orbitron (headings — `font-orbitron`), Poppins (body — `font-sans`), Fira Code (code blocks — `font-code`).
- Use the `cn()` helper from `lib/utils.ts` (clsx + tailwind-merge) for conditional/merged class names.
- Custom CSS utility classes in `app/globals.css`: `gradient-text`, `animate-float`, `animate-text-shimmer`, `glass`, `card-hover-effect`, `tech-circuit`, `tech-glow`, `funky-dots`, `funky-grid`, `btn-funky`, `animated-underline`. Prefer these over writing new CSS.
- Dark mode is the default (`defaultTheme="dark"` in ThemeProvider). Theme toggling via `next-themes`.

## Project-Specific Patterns

- **Section scroll navigation**: Navbar and Hero use `handleScrollToSection()` with an 80px offset for the sticky header. When adding new sections, register them in the `navLinks` array in `components/navbar.tsx` and give the section an `id` attribute.
- **Project data** is hardcoded in `components/projects.tsx` as a JSON array (not fetched). Each project has `title`, `description`, `features`, `techStack`, `github`, `image`, `link`, `category`.
- **Images** go in `public/portfolio/`. Next.js Image optimization is disabled (`images: { unoptimized: true }` in `next.config.mjs`).
- Path alias `@/*` maps to the project root (e.g., `@/components/ui/button`).

## Developer Workflow

```bash
npm run dev       # Start dev server (Turbopack)
npm run build     # Production build (TS errors are ignored via next.config.mjs)
npm run lint      # ESLint
```

- **Deployed on Netlify**. `images: { unoptimized: true }` in `next.config.mjs` is required since Netlify doesn't support Next.js Image Optimization out of the box.
- `next.config.mjs` sets `typescript.ignoreBuildErrors: true`. Builds will succeed even with type errors — run `npm run lint` and `tsc --noEmit` manually to catch issues. ESLint no longer runs during `next build` in v16.

## File Organization

| Path | Purpose |
|---|---|
| `app/layout.tsx` | Root layout: fonts, metadata/SEO, ThemeProvider, Navbar, Toaster, JSON-LD |
| `app/page.tsx` | Home page composing all section components + JSON-LD schema |
| `components/*.tsx` | Portfolio section components (client-side) |
| `components/ui/` | shadcn/ui primitives — do not manually edit, use CLI |
| `hooks/` | Custom hooks (`use-toast`, `use-mobile`) |
| `lib/utils.ts` | `cn()` utility |
| `app/globals.css` | Tailwind directives, CSS variables, custom animations/utilities |
| `public/portfolio/` | Project screenshot images |
