import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-10 px-6 py-16 text-center">
      <div className="space-y-4">
        <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand">
          UGC Personal Assistant
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Plan, script, and ship content — faster.
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
          Your personal assistant for user-generated content. Organise ideas,
          draft scripts, and track your publishing calendar in one place.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row">
        {user ? (
          <Link
            href="/dashboard"
            className="rounded-lg bg-brand px-6 py-3 font-medium text-white transition hover:bg-brand-dark"
          >
            Go to dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/register"
              className="rounded-lg bg-brand px-6 py-3 font-medium text-white transition hover:bg-brand-dark"
            >
              Get started
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-neutral-300 px-6 py-3 font-medium transition hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
            >
              Sign in
            </Link>
          </>
        )}
      </div>

      <footer className="pt-12 text-sm text-neutral-500">
        Built with Next.js 14 + Supabase · Deployed on Vercel
      </footer>
    </main>
  );
}
