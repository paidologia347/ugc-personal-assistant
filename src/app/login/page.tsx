import Link from "next/link";
import { login } from "./actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; redirectTo?: string };
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Sign in to your UGC Assistant account.
        </p>
      </div>

      <form action={login} className="mt-8 space-y-4">
        <input
          type="hidden"
          name="redirectTo"
          value={searchParams.redirectTo ?? "/dashboard"}
        />
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40 dark:border-neutral-700"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40 dark:border-neutral-700"
          />
        </div>

        {searchParams.error ? (
          <p className="text-sm text-red-600" role="alert">
            {searchParams.error}
          </p>
        ) : null}

        <button
          type="submit"
          className="w-full rounded-md bg-brand px-4 py-2.5 font-medium text-white transition hover:bg-brand-dark"
        >
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-300">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-brand hover:underline">
          Create one
        </Link>
      </p>
    </main>
  );
}
