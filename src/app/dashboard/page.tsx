import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { signOut } from "./actions";

export default async function DashboardPage() {
  if (!isSupabaseConfigured) {
    redirect("/login");
  }

  const supabase = createClient();
  let user = null;
  try {
    const result = await supabase.auth.getUser();
    user = result.data.user;
  } catch {
    user = null;
  }

  if (!user) {
    redirect("/login?redirectTo=/dashboard");
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
            Signed in as{" "}
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {user.email}
            </span>
          </p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium transition hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
          >
            Sign out
          </button>
        </form>
      </div>

      <section className="mt-10 rounded-xl border border-neutral-200 bg-white/50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
        <h2 className="text-lg font-semibold">Welcome</h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
          This is your empty dashboard. Start building your UGC workflow here —
          content ideas, scripts, schedules, and analytics will live in this
          space.
        </p>
      </section>
    </main>
  );
}
