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
      className="text-sm text-warm-400 hover:text-rose-400 transition-colors duration-300"
    >
      退出
    </button>
  );
}
