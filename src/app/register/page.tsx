import Link from "next/link";
import { register } from "./actions";

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { error?: string; message?: string };
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create your account</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Get started with UGC Personal Assistant.
        </p>
      </div>

      <form action={register} className="mt-8 space-y-4">
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
            minLength={8}
            autoComplete="new-password"
            className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40 dark:border-neutral-700"
          />
          <p className="text-xs text-neutral-500">Minimum 8 characters.</p>
        </div>

        {searchParams.error ? (
          <p className="text-sm text-red-600" role="alert">
            {searchParams.error}
          </p>
        ) : null}
        {searchParams.message ? (
          <p className="text-sm text-emerald-600" role="status">
            {searchParams.message}
          </p>
        ) : null}

        <button
          type="submit"
          className="w-full rounded-md bg-brand px-4 py-2.5 font-medium text-white transition hover:bg-brand-dark"
        >
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-300">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-brand hover:underline">
          Sign in
        </Link>
      </p>
    </main>
  );
}
