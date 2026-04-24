"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function register(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    headers().get("origin") ??
    "http://localhost:3000";

  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    redirect(`/register?error=${encodeURIComponent(error.message)}`);
  }

  if (data.session) {
    revalidatePath("/", "layout");
    redirect("/dashboard");
  }

  redirect(
    `/register?message=${encodeURIComponent(
      "Check your email to confirm your account before signing in.",
    )}`,
  );
}
