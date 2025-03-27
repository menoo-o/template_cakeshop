"use server";
import { createClient } from "@/utils/supabase/server";

export async function sendResetEmail(email: string) {
  const supabase = await createClient();

  // Step 1: Check if the user exists
  const { data: user, error: userError } = await supabase
    .from("auth.users") // Supabase stores users here
    .select("email")
    .eq("email", email)
    .single();

  if (!user) {
    return { error: "No account found with this email." };
  }

  // Step 2: Send reset password email
  const { error } = await supabase.auth.resetPasswordForEmail( email, {
    redirectTo: "http://localhost:3000/account/update-password",
  });

  return { error: error?.message || null };
}
