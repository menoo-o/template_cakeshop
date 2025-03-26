"use client";
import { useState } from "react";
import { sendResetEmail } from "./actions";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { error } = await sendResetEmail(email);
    if (error) {
      setMessage("Error: " + error);
    } else {
      setMessage("Check your email for the reset link.");
    }
  }

  return (
    <div>
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
