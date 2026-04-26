# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (flat config via eslint.config.mjs)
```

No test framework is configured.

## Project Architecture

Personal blog built with **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS v4**, **React 19**. Content is stored as Markdown files on the filesystem — no database.

### Data Layer (src/lib/)

- **`posts.ts`** — CRUD for Markdown blog posts in `content/posts/`. Uses `gray-matter` for YAML frontmatter parsing. Each post has: slug, title, date, excerpt, tags, content body.
- **`auth.ts`** — Password auth via SHA-256. Password from `ADMIN_PASSWORD` env var (in `.env.local`). Token stored as httpOnly cookie named `admin_token`.
- **`profile.ts`** — Read/write author profile from `data/profile.json`.
- **`views.ts`** — Read/write per-post view counters from `data/views.json`.

### Route Structure

| Route | Description |
|---|---|
| `/` | Homepage — profile card + post list with view counts |
| `/about` | Static about page |
| `/posts/[slug]` | Single post rendered from Markdown via `react-markdown` + `remark-gfm` |
| `/admin/login` | Password login form |
| `/admin` | Dashboard listing all posts |
| `/admin/posts/new` | Create post (PostEditor with live Markdown preview) |
| `/admin/posts/[slug]/edit` | Edit post |
| `/admin/profile` | Edit profile (name, bio, avatar) |

### API Routes

| Route | Auth Required | Methods |
|---|---|---|
| `/api/auth/login` | No | POST — validate password, set cookie |
| `/api/auth/logout` | No | POST — clear cookie |
| `/api/auth/check` | No | GET — verify token |
| `/api/posts` | POST only | GET (list all), POST (create) |
| `/api/posts/[slug]` | PUT/DELETE only | GET, PUT, DELETE |
| `/api/profile` | PUT only | GET, PUT |
| `/api/views/[slug]` | No | GET (get count), POST (increment) |

### Auth Flow

- `ADMIN_PASSWORD` in `.env.local` — SHA-256 hashed and stored as `admin_token` cookie.
- `middleware.ts` guards all `/admin/*` routes (except `/admin/login`), redirects to login if no token.
- Client components (`AdminButton`, `AdminBar`) check auth via `/api/auth/check`.

### Key Client Components (all "use client")

- `PostEditor.tsx` — Markdown editor with live preview (for admin post create/edit)
- `ThemeToggle.tsx` — Dark/light mode toggle, persisted in localStorage via `.dark` class on `<html>`
- `AdminBar.tsx` — Edit/delete buttons visible when authenticated on post pages
- `AdminButton.tsx` — Auth-gated nav button to admin panel
- `PostViews.tsx` — View counter display

### Styling

- Tailwind CSS v4 with `@tailwindcss/typography` plugin (prose classes for rendered Markdown).
- Dark mode via `.dark` class on `<html>`, toggled by `ThemeToggle`, persisted in localStorage.
- Inline script in root layout prevents flash-of-light-theme on dark-mode load.

### Path Alias

`@/*` maps to `./src/*` (e. g., `@/lib/posts`, `@/components/Header`).

## 语言要求

- 所有对话使用中文。
- 所有文档使用中文。
- 所有代码注释使用中文。

## 执行要求

- 在生成说明、总结、计划、提交说明时，统一使用中文。
- 在新增或修改 Markdown 文档时，统一使用中文。
- 在新增或修改代码注释时，统一使用中文
