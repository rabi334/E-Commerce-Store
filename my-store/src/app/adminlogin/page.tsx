"use client";

import { useState } from "react";
import { useAdmin } from "@/app/hooks/useAdmin";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading } = useAdmin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-400 p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl text-black font-bold mb-4 text-center">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full text-black mb-3 px-4 py-2 border rounded-2xl"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full text-black mb-3 px-4 py-2 border rounded-2xl"
        />

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-2xl text-white ${
            loading ? "bg-gray-700" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
