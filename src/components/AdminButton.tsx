"use client";

import { useRouter } from "next/navigation";

type Props = {
  href: string;
  label: string;
};

export default function AdminButton({ href, label }: Props) {
  const router = useRouter();

  const handleClick = async () => {
    const res = await fetch("/api/auth/check");
    if (!res.ok) {
      router.push(`/admin/login?redirect=${encodeURIComponent(href)}`);
    } else {
      router.push(href);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-md border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
    >
      {label}
    </button>
  );
}
