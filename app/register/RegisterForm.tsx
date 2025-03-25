"use client";

import { useState, useTransition } from "react";
import { register } from "./actions"; // Server Action
import Link from "next/link";

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={(formData) =>
        startTransition(async () => {
          const res = await register(formData);
          if (res?.error) setError(res.error);
        })
      }
    >
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <br /> <br />

      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <br /> <br />

      <button type="submit" disabled={isPending}>
        {isPending ? "Signing up..." : "Sign up"}
      </button>
      <br /><br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <Link href="/login">Already have an account? Log in here!</Link>
    </form>
  );
}
