# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server
npm run build     # tsc -b (typecheck, no emit) && vite build
npm run lint      # eslint .
npm run preview   # serve the production build locally
```

There is no test suite/runner configured in this project.

## Architecture

React 19 + TypeScript + Vite SPA (`react-router-dom` v7), no custom Node
backend — **Supabase** (Postgres + Auth + Storage) is the entire backend.
No state management library; data fetching is done with small hand-rolled
hooks around the `@supabase/supabase-js` client.

### Content model

Three Postgres tables — `courses`, `events`, `news` — are structurally
identical (`id`, `title`, `description`, `event_date`, `image_url`,
`created_at`) and share one frontend shape, `ContentItem`
([src/types/content.ts](src/types/content.ts)). Row → `ContentItem` mapping
(snake_case → camelCase, `event_date` → formatted `dd/mm/yyyy` display
string) lives in [src/lib/contentMapping.ts](src/lib/contentMapping.ts) and
is shared by both data hooks:

- [useSupabaseTable(table)](src/hooks/useSupabaseTable.ts) — list + CRUD for
  a whole table. Used by `Home.tsx` (read-only) and by the admin CRUD UI
  (full read/write).
- [useSupabaseItem(table, id)](src/hooks/useSupabaseItem.ts) — single row by
  id, used by the public detail pages.

RLS pattern (defined in [supabase-setup.sql](supabase-setup.sql), which is
the source of truth for schema/policies/storage — run manually in the
Supabase SQL editor, it is not migrated automatically): public `SELECT` on
`courses`/`events`/`news`, writes restricted to `auth.role() = 'authenticated'`.
Images go through the public `content-images` Storage bucket
([src/lib/contentImages.ts](src/lib/contentImages.ts) handles
upload/validate/delete).

`inscriptions` is a separate table (course/event sign-ups submitted from the
public detail pages via
[InscriptionForm](src/components/InscriptionForm/InscriptionForm.tsx)) with
inverted RLS: public can `INSERT`, only the authenticated admin can read/
manage — nobody but the admin should see who signed up.

### Auth & admin panel

Single-admin auth: no public signup (disabled in Supabase dashboard), the
one admin account is created manually via Supabase Auth. `AuthContext`
([src/context/AuthContext.tsx](src/context/AuthContext.tsx)) wraps
`supabase.auth` and is provided at the root in `App.tsx`. `ProtectedRoute`
([src/components/ProtectedRoute/ProtectedRoute.tsx](src/components/ProtectedRoute/ProtectedRoute.tsx))
redirects to `/admin/login` when there's no session. There is intentionally
**no visible admin link anywhere in the public UI** — `/admin/login` is
reached only by direct URL.

The admin CRUD UI is one generic component,
[AdminCrudSection](src/components/AdminCrudSection/AdminCrudSection.tsx),
parameterized by table name and reused for Cursos/Eventos/Noticias inside
`AdminDashboard` — don't fork it per table, extend the generic component
instead unless one content type's fields genuinely diverge.

### Routing (src/App.tsx)

Public: `/`, `/lornaevans`, `/cursos/:id`, `/eventos/:id`, `/noticias/:id`
(the last three render `ContentDetail` parameterized by table; courses/
events show `InscriptionForm`, news is read-only). Admin: `/admin/login`,
`/admin` (wrapped in `ProtectedRoute`).

Deployed on Vercel as a static build. [vercel.json](vercel.json) rewrites
every path to `index.html` — required because client-side routes 404 on
Vercel's static file server without it; if that file is ever removed,
direct navigation/refresh on any non-`/` route breaks in production even
though it works fine locally against the Vite dev server.

### Styling convention

One plain CSS file per component/page (no CSS modules, no Tailwind).
Global tokens (`--color-bg`, `--color-accent`, `--font-heading`, etc.) are
defined once in [src/index.css](src/index.css), imported globally via
`main.tsx`. **Gotcha:** everything else is scoped per component/page and
only loads when that component mounts — e.g. `.cta-button` lives in
`Hero.css` and only exists on pages that render `<Hero>`. Pages reachable by
a direct URL that bypasses `Home.tsx` (admin pages, `ContentDetail`,
`InscriptionForm`) must not assume another page's CSS is loaded; they define
their own self-contained classes instead (see `admin-shared.css` and
`InscriptionForm.css` for the pattern).

### Home page carousel

`Home.tsx` implements a custom infinite-loop carousel (`useInfiniteCarousel`,
defined inline in the file) shared by the Cursos/Eventos/Noticias sections —
clone-padded rendering with modulo-based index wrapping. It assumes a
non-empty items array; while Supabase data is loading, `Home.tsx` renders a
loading/empty skeleton instead of mounting the carousel markup rather than
special-casing zero-length input inside the hook.

### Environment variables

`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (see `.env.example`),
loaded from `.env.local` (gitignored). Same two vars need to be set in
Vercel's project settings for production builds — Vite inlines them at
build time, so changing them requires a redeploy, not just a refresh.

### ESLint

Uses `eslint-plugin-react-hooks` v7 (React Compiler rules), which is
stricter than most React projects — notably `react-hooks/set-state-in-effect`
flags the common "fetch in `useEffect`, `setState` on resolve" pattern used
throughout the data hooks. Existing instances have a scoped
`eslint-disable-next-line` with a comment explaining why it's safe; follow
that pattern rather than disabling the rule globally.

### Known dead code

[src/components/Navbar/Navbar.tsx](src/components/Navbar/Navbar.tsx) is not
imported anywhere — `GlobalHeader.tsx` is the actual header used on every
page. Don't assume `Navbar` is live when working on site navigation.
