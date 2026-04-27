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
      className="text-xs text-smoke/50 dark:text-[#6b6560]/50 hover:text-vermillion dark:hover:text-vermillion-light transition-colors duration-200"
    >
      {label}
    </button>
  );
}
