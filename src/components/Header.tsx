import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-3xl flex items-center justify-between px-4 py-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          XuHang&apos;s Blog
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              首页
            </Link>
            <Link
              href="/about"
              className="hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              关于
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
