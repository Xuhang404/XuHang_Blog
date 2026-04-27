"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("密码错误");
        setLoading(false);
        return;
      }

      // 强制页面跳转确保 cookie 被正确携带
      window.location.href = redirect;
    } catch {
      setError("请求失败，请重试");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-32">
      <h1 className="font-serif-heading text-2xl text-ink text-center mb-8">
        管理员登录
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="请输入密码"
          className="w-full border border-divider bg-paper px-4 py-3 text-sm text-ink placeholder:text-smoke/40 focus:outline-none focus:border-vermillion transition-colors duration-200"
          autoFocus
          disabled={loading}
        />
        {error && <p className="text-sm text-vermillion">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ink text-paper py-3 text-sm hover:bg-vermillion dark:hover:bg-vermillion hover:text-white transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? "登录中..." : "登录"}
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
