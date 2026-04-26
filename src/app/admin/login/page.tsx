"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      setError("密码错误");
      return;
    }

    router.push(redirect);
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-32">
      <h1 className="text-2xl font-bold mb-6 text-center text-warm-800 dark:text-warm-100">
        管理员登录
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="请输入密码"
          className="w-full rounded-xl border border-warm-200 dark:border-warm-700 bg-white dark:bg-warm-900 px-4 py-2.5 text-sm text-warm-800 dark:text-warm-100 placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
          autoFocus
        />
        {error && <p className="text-sm text-rose-500">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-xl bg-accent text-white py-2.5 text-sm font-medium hover:bg-accent-dark transition-colors duration-300"
        >
          登录
        </button>
      </form>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
