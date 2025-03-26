"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { updatePassword } from "./actions";

export default function UpdatePasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("code"); // Use "code", not "token"
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    const { error } = await updatePassword(token, password);
    if (error) {
      setMessage("Error: " + error);
    } else {
      setMessage("Password updated! You can now login.");
    }
  }

  return (
    <div>
      <h2>Set New Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Update Password</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
