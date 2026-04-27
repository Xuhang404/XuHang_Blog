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
      className="text-xs text-smoke/40 hover:text-vermillion dark:hover:text-vermillion-light transition-colors duration-200"
    >
      退出
    </button>
  );
}
