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
    <nav className="w-48 shrink-0 space-y-0.5">
      {links.map((link) => {
        const active =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-3 py-2 text-sm transition-all duration-200 ${
              active
                ? "bg-ink dark:bg-[#f0eee8] text-paper dark:text-[#0f0f0e] font-medium"
                : "text-smoke dark:text-[#6b6560] hover:text-ink dark:hover:text-[#f0eee8] hover:bg-frost dark:hover:bg-[#1a1916]"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
