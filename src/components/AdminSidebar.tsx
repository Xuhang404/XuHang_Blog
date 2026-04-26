"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "文章" },
  { href: "/admin/posts/new", label: "写新文章" },
  { href: "/admin/profile", label: "个人信息" },
  { href: "/admin/about", label: "关于页" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-48 shrink-0 space-y-1">
      {links.map((link) => {
        const active =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`block rounded-md px-3 py-2 text-sm transition-colors ${
              active
                ? "bg-zinc-200 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-100"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
