"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");

  function handleLogin() {
    if (!password.trim()) {
      return;
    }

    // Store password temporarily for the admin session
    sessionStorage.setItem("admin-password", password);

    router.push("/admin");
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__header">
          <div className="logo">EP</div>

          <h1>Admin Dashboard</h1>

          <p>Sign in to manage your portfolio</p>
        </div>

        <div className="admin-field">
          <label htmlFor="admin-password">Password</label>

          <input
            id="admin-password"
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
        </div>

        <button
          type="button"
          className="admin-btn admin-btn--full"
          onClick={handleLogin}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}