import React, { useState } from "react";

const DEMO_EMAIL = "demo@eventpal.com";
const DEMO_PASSWORD = "password123";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Call Flask backend for authentication
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.success) {
      onLogin({ email });
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to EventPal</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <input
          className="w-full mb-4 p-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full mb-6 p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-violet-600 text-white py-2 rounded font-bold hover:bg-violet-700" type="submit">
          Login
        </button>
        <div className="text-xs text-gray-500 mt-4">
          Demo: <b>{DEMO_EMAIL}</b> / <b>{DEMO_PASSWORD}</b>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Don't have an account? <a href="/signup" className="text-violet-600 underline">Sign up</a>
        </div>
      </form>
    </div>
  );
}

