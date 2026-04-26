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
      className="rounded-lg border border-warm-200 dark:border-warm-700 px-3 py-1 text-xs font-medium text-warm-500 dark:text-warm-400 hover:bg-accent hover:text-white hover:border-accent dark:hover:border-accent transition-all duration-300"
    >
      {label}
    </button>
  );
}
