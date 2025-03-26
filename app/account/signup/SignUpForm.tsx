"use client";


import { RegisterState } from "@/lib/types/types";
import { useActionState } from "react";
import { register } from "./actions";
import Link from "next/link";

export default function SignUpForm() {
  const initialState: RegisterState = { error: null };

  const [state, formAction, isPending] = useActionState(register, initialState);

  return (
    <>
      <h2>Signup page</h2> <br /> <br />

      <form action={formAction}>

         <label htmlFor="firstname">FirstName:</label>
         <input id="firstname" name="firstname" type="text" required />
         <br /> <br />

        <label htmlFor="lastname">LastName:</label>
        <input id="lastname" name="lastname" type="text" required />
        <br /> <br />


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

        {state.error && <p style={{ color: "red" }}>{state.error}</p>}

        <Link href="/account/login">Already have an account? Log in here!</Link>
      </form>
    </>
  );
}