"use client";

import { LoginState } from "@/lib/types/types";
import { useActionState } from "react";
import { login } from "./actions"; // Import Server Action
import Link from "next/link";

export default function LoginForm() {
  const initialState: LoginState = {error: null};
  const [state, formAction, isPending] = useActionState(login, initialState);
  
  return (
    <>
      <h2>
        Login Page
      </h2> <br /> <br />

      <form action={formAction}>

          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
          <br /> <br />

          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
          <br /> <br />

          <button type="submit" disabled={isPending}>
            {isPending ? "Logging in..." : "Log in"}
          </button>
          <br /><br />

          {state.error && <p style={{ color: "red" }}> {state.error} </p>}

          <Link href="/register">Dont have an account? Sign Up Here!</Link>
      </form>
    </>
  );
}
