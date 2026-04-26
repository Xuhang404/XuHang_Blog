"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
    >
      退出
    </button>
  );
}
