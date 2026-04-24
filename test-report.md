# Test Report — PR #3: Migrate to Next.js 14

## Verdict
All 5 planned tests **passed**. Real auth flow (actual Supabase signup / email confirmation / login) was **not tested** — no Supabase project was available. The tests run locally against `next dev` with placeholder Supabase env vars to prove UI rendering, middleware route protection, and the server-action → error → UI loop.

## Environment
- `next dev` on `http://localhost:3000`
- `NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co` (placeholder, not a real project)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-anon-key`
- Next.js 14.2.35, Node 22.12

## Results

| # | Test | Result |
|---|------|--------|
| T1 | Landing `/` renders with unauthenticated CTAs | ✅ pass |
| T2 | `/login` renders form (email, password, hidden `redirectTo`, Sign in) | ✅ pass |
| T3 | Unauthenticated `/dashboard` → redirect to `/login?redirectTo=/dashboard` | ✅ pass |
| T4 | Invalid login surfaces Supabase error back to UI | ✅ pass |
| T5 | `/login` → `/register` via "Create one" link renders correct form | ✅ pass |

### T1 — Landing page
URL: `http://localhost:3000/`

Heading "Plan, script, and ship content — faster." is visible along with both "Get started" (→ `/register`) and "Sign in" (→ `/login`) CTAs. No "Go to dashboard" link (correct — unauthenticated).

![Landing page with unauthenticated CTAs](https://app.devin.ai/attachments/0f77588b-4d76-4542-a353-6f57c6ce9abe/screenshot_5964615defee48f2879439f2039deef6.png)

### T2 — /login page
Navigated from landing via "Sign in" click.

DOM confirmed: `<input name="email">`, `<input name="password">`, hidden `<input type="hidden" name="redirectTo" value="/dashboard">`, submit button "Sign in", and "Create one" link to `/register`.

![Login page](https://app.devin.ai/attachments/2b2c1e4b-4884-47d6-8684-b6f4ea6c616b/screenshot_58b03eb3ee0340f8b6d7af35e869cacc.png)

### T3 — Middleware protection
Typed `http://localhost:3000/dashboard` directly into the address bar. Browser URL resolved to:

```
http://localhost:3000/login?redirectTo=/dashboard
```

Login form rendered. This proves the middleware in `middleware.ts` + `src/lib/supabase/middleware.ts` is matching and redirecting unauthenticated users correctly.

![Redirected to /login?redirectTo=/dashboard](https://app.devin.ai/attachments/9bd73469-dedf-40e3-a10c-2970f8aa98ce/screenshot_edbe0385731847acb911f7d8d1dc00d8.png)

### T4 — Login error surfaces
Submitted `test@example.com` / `wrongpass123`. The server action attempted to contact the placeholder Supabase host, failed (expected), and redirected to:

```
http://localhost:3000/login?error=fetch+failed&redirectTo=%2Fdashboard
```

The login page re-rendered with the red error text **"fetch failed"** above the Sign in button (the Supabase-js error message surfaced because `example.supabase.co/auth/v1/token` doesn't exist). This confirms the complete loop: form submit → server action → Supabase client → error redirect with `error` query param → page reads `searchParams.error` → renders alert.

![Error "fetch failed" displayed after invalid login](https://app.devin.ai/attachments/2d1ad976-4af1-4eb9-8451-60384d386204/screenshot_9afcb543452f41818f1bf349d7cba0e6.png)

> If this repo is connected to a real Supabase project, the error text would be something like `Invalid login credentials` instead of `fetch failed`. The important thing is that the error round-trips from Supabase back to the UI correctly.

### T5 — /register page
Clicked "Create one" on `/login`.

DOM confirmed: heading "Create your account", `<input name="email">`, `<input name="password" minlength="8">`, submit button "Create account", and back-link to `/login`.

![Register page](https://app.devin.ai/attachments/2ef9ab27-b4b1-4d14-b355-9e1f67a06949/screenshot_1d9d47ae34bb4436a395d237947a7fe5.png)

## Not tested (callouts for reviewer)

- **Actual signup**: `supabase.auth.signUp({ email, password })` with a real project → email confirmation → click link → callback exchange → `/dashboard` render. Requires a real Supabase project.
- **Actual login**: `signInWithPassword` with valid creds → session cookie set → `/dashboard` renders with user's email.
- **Sign out**: Server action on `/dashboard` clearing the Supabase session.
- **OAuth/email callback** (`/auth/callback` route handler): exchange-code path not exercised.

To exercise these, create a Supabase project, copy URL + anon key, set them in Vercel (and locally for dev), then run through the plan in the PR description.

## Also verified
- `npm run lint` — no warnings or errors
- `npm run typecheck` — passes (`tsc --noEmit`)
- `npm run build` — production build succeeds
- GitHub Actions CI on PR #3 — **green**
