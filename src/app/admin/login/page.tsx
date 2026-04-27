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
      <h1 className="font-serif-heading text-2xl text-ink dark:text-[#f0eee8] text-center mb-8">
        管理员登录
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="请输入密码"
          className="w-full border border-divider dark:border-[#2a2822] bg-paper dark:bg-[#0f0f0e] px-4 py-3 text-sm text-ink dark:text-[#f0eee8] placeholder:text-smoke/40 dark:placeholder:text-[#6b6560]/40 focus:outline-none focus:border-vermillion transition-colors duration-200"
          autoFocus
        />
        {error && <p className="text-sm text-vermillion">{error}</p>}
        <button
          type="submit"
          className="w-full bg-ink dark:bg-[#f0eee8] text-paper dark:text-[#0f0f0e] py-3 text-sm hover:bg-vermillion dark:hover:bg-vermillion hover:text-white transition-colors duration-200"
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
