# personal-homepage

A production-ready personal website built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Supabase, and Vercel.

## Stack

- Next.js 16 + App Router
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Supabase Postgres + Auth
- Zod for input validation
- Vitest for service and validation tests

## Local development

```bash
pnpm install
pnpm dev
```

Useful commands:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm seed
```

## Environment variables

Copy `.env.example` to `.env.local` and fill these values:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_EMAILS=your-admin-email@example.com
```

Notes:

- `NEXT_PUBLIC_SITE_URL` should be your Vercel production URL after deployment.
- `ADMIN_EMAILS` is a comma-separated list of emails allowed into `/admin`.
- `SUPABASE_SERVICE_ROLE_KEY` is only used on the server for admin CRUD and seed scripts. Never expose it in client code.

## Supabase setup

1. Create a new Supabase project.
2. In Supabase, copy the project URL and anon key into `.env.local`.
3. Copy the service role key into `.env.local`.
4. Run the SQL migration in [supabase/migrations/202603220001_create_study_logs.sql](/E:/personal-homepage/supabase/migrations/202603220001_create_study_logs.sql).
5. Create an auth user whose email matches `ADMIN_EMAILS`.
6. Start the app with `pnpm dev`.
7. Optionally seed example entries with `pnpm seed`.

If you use the Supabase CLI, the equivalent flow is:

```bash
supabase db push
pnpm seed
```

## Vercel deployment

1. Log in to Vercel with `vercel login`.
2. Set the same environment variables in the Vercel project settings.
3. Deploy with:

```bash
vercel
vercel --prod
```

4. After the first production deployment, update `NEXT_PUBLIC_SITE_URL` to the final production URL and redeploy.

## GitHub repository

- Repository name: `personal-homepage`
- Default branch target: `main`
- Recommended workflow after local verification:

```bash
git add .
git commit -m "Build personal homepage with Supabase study log"
git push -u origin main
```

If `gh` is not logged in, run:

```bash
gh auth login
```

## Project structure

- [src/app](/E:/personal-homepage/src/app): routes, layouts, metadata, API handlers
- [src/components](/E:/personal-homepage/src/components): UI building blocks and forms
- [src/config/profile.ts](/E:/personal-homepage/src/config/profile.ts): centralized personal profile content
- [src/db](/E:/personal-homepage/src/db): database types and repository
- [src/lib](/E:/personal-homepage/src/lib): auth, env, formatting, services
- [src/schemas](/E:/personal-homepage/src/schemas): Zod schemas
- [supabase/migrations](/E:/personal-homepage/supabase/migrations): SQL migrations
- [scripts/seed.ts](/E:/personal-homepage/scripts/seed.ts): sample data seeding

## How to modify personal profile later

Edit [src/config/profile.ts](/E:/personal-homepage/src/config/profile.ts).

This file controls:

- name
- role
- focus tags
- hero text
- education timeline
- hobbies
- projects
- contact placeholders
- navigation labels
- featured study log tags

## How to add new study logs later

1. Make sure Supabase is configured and your admin email is listed in `ADMIN_EMAILS`.
2. Open `/login` and sign in.
3. Go to `/admin/study-logs/new`.
4. Fill out the form.
5. Save as draft or switch `Public visibility` on before saving.

You can also:

- edit entries at `/admin/study-logs`
- delete entries at `/admin/study-logs`
- publish or unpublish entries from the admin table

## What is implemented

- Public pages: Home, About, Education, Hobbies, Projects, Contact
- Public Study Log list and detail pages
- Search, date filter, tag filter
- Admin login with Supabase Auth
- Admin-only Study Log create, update, delete, publish, unpublish
- Supabase-backed persistence
- Zod validation on both client and server
- SEO metadata, sitemap, robots, Open Graph image, 404, loading, error state
- Tests for service logic, validation, visibility boundary, and admin access control
