# Test Plan — PR #3: Migrate to Next.js 14

## Scope & constraints
- Real Supabase project is **not available**, so full signup / email confirmation / login flows cannot be exercised end-to-end.
- Tests focus on: (a) UI rendering of each page, (b) middleware route protection, (c) that server actions wire back to the UI correctly when Supabase returns an error.
- All tests run locally against `next dev` on `http://localhost:3000` with placeholder Supabase env vars.

## Tests

### T1 — Landing page renders with unauthenticated CTAs
**Action:** Open `http://localhost:3000/`.
**Pass criteria:**
- Page responds 200.
- DOM contains heading text exactly: `Plan, script, and ship content — faster.`
- DOM contains a link with text `Get started` whose `href="/register"`.
- DOM contains a link with text `Sign in` whose `href="/login"`.
- DOM does NOT contain a link with text `Go to dashboard` (because there is no user).

**Why this would fail if broken:** If `src/app/page.tsx` were removed, unauthenticated branch broken, or `supabase.auth.getUser()` mistakenly returned a user object, the visible CTAs would be different.

### T2 — Login page renders with form fields
**Action:** Click the `Sign in` link on `/`.
**Pass criteria:**
- URL becomes `http://localhost:3000/login`.
- DOM contains `<input id="email" name="email" type="email">` and `<input id="password" name="password" type="password">`.
- DOM contains a hidden input `<input type="hidden" name="redirectTo" value="/dashboard">`.
- DOM contains a button with text `Sign in` (type submit).

**Why this would fail if broken:** Missing inputs or wrong names would break the server action contract.

### T3 — Middleware protects `/dashboard` for unauthenticated users
**Action:** Navigate directly to `http://localhost:3000/dashboard`.
**Pass criteria:**
- Final URL is `http://localhost:3000/login?redirectTo=%2Fdashboard`.
- DOM shows the `/login` page (heading `Welcome back`).

**Why this would fail if broken:** If `middleware.ts` wasn't matched, or `updateSession` didn't redirect on unauthenticated + protected, the dashboard page would render (and would then 500 because the inner `redirect("/login?...")` would fire or the user read would fail).

### T4 — Login form with invalid credentials surfaces the Supabase error
**Action:** On `/login`, type `test@example.com` / `wrongpass123` and submit.
**Pass criteria:**
- URL becomes `http://localhost:3000/login?error=<encoded message>&redirectTo=%2Fdashboard` (order of params may vary).
- DOM contains an element with `role="alert"` whose text matches the decoded `error` query param (some Supabase error message such as `Invalid login credentials`, or a fetch error if the placeholder Supabase host is unreachable — either proves the server action round-tripped through Supabase and re-rendered with the error prop).

**Why this would fail if broken:** If server action didn't call Supabase, didn't redirect with the error, or the login page didn't render the error from searchParams, we would not see a visible alert.

### T5 — Register page linked from Login
**Action:** On `/login`, click the `Create one` link.
**Pass criteria:**
- URL becomes `http://localhost:3000/register`.
- DOM contains heading `Create your account`.
- DOM contains `<input name="email">`, `<input name="password" minlength="8">`.
- DOM contains button text `Create account`.

**Why this would fail if broken:** Missing page, wrong route, or missing form fields would break the signup entry point.

## Evidence collected
- Screenshots per step.
- `curl -I` output for each route to show HTTP status & redirect chain (e.g., `curl -sI http://localhost:3000/dashboard -L` should show 307 to `/login?redirectTo=...`).
- Dev-server log snippet for each nav.
