# UGC Personal Assistant

A web app for user-generated content creators — built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase Auth**. Designed for deployment on **Vercel**.

## Features

- Landing page with marketing hero
- Email/password authentication via Supabase (`@supabase/ssr`)
  - `/login` — sign in
  - `/register` — sign up (with email confirmation flow)
  - `/dashboard` — protected page
  - `/auth/callback` — OAuth / magic-link callback
- Middleware-based session refresh and route protection

## Stack

| Layer        | Choice                                    |
| ------------ | ----------------------------------------- |
| Framework    | Next.js 14 (App Router, Server Actions)   |
| Language     | TypeScript 5                              |
| Styling      | Tailwind CSS                              |
| Auth / DB    | Supabase (`@supabase/ssr`, `supabase-js`) |
| Deploy       | Vercel                                    |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example env file and fill it with your Supabase project values:

```bash
cp .env.local.example .env.local
```

| Variable                         | Description                                                   |
| -------------------------------- | ------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`       | Your Supabase project URL                                     |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`  | Public anon key                                               |
| `NEXT_PUBLIC_SITE_URL`           | Public site URL, used for email redirects (prod: your domain) |

Create the Supabase project at [supabase.com](https://supabase.com) → Settings → API to copy the URL and anon key.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Other scripts

```bash
npm run lint       # ESLint (next/core-web-vitals)
npm run typecheck  # tsc --noEmit
npm run build      # production build
npm run start      # serve production build
```

## Project structure

```
.
├── middleware.ts                # refreshes Supabase session, guards /dashboard
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── .env.local.example
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx             # landing
    │   ├── globals.css
    │   ├── login/               # sign in (server action)
    │   ├── register/            # sign up (server action)
    │   ├── dashboard/           # protected
    │   └── auth/callback/       # OAuth / email callback
    └── lib/
        └── supabase/            # browser + server + middleware clients
```

## Deploying to Vercel

1. Push this repo to GitHub (already done).
2. In Vercel, click **New Project** → import `paidologia347/ugc-personal-assistant`.
3. Set environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`).
4. Add the Vercel preview and production URLs to Supabase **Authentication → URL Configuration → Redirect URLs** (including `https://YOUR-DOMAIN/auth/callback`).
5. Deploy.

## CI

`.github/workflows/ci.yml` runs `npm run lint`, `npm run typecheck`, and `npm run build` on every push and PR.

## History

This repo was previously an Expo / React Native scaffold with Android APK build workflows. It has been migrated to a Next.js web app — see the migration PR for details.
