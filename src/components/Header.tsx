import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="absolute inset-0 bg-paper/80 backdrop-blur-sm" />
      <div className="relative mx-auto max-w-6xl flex items-center justify-between px-4 py-5">
        {/* 用小标签替代名字，消除与主标题的重复感 */}
        <Link
          href="/"
          className="text-[11px] uppercase tracking-[0.2em] text-smoke/60 hover:text-vermillion transition-colors duration-200"
        >
          墨韵
        </Link>
        <div className="flex items-center gap-8">
          <nav className="flex gap-6 text-sm">
            <Link
              href="/"
              className="text-smoke hover:text-vermillion dark:hover:text-vermillion-light transition-colors duration-200 link-underline"
            >
              首页
            </Link>
            <Link
              href="/about"
              className="text-smoke hover:text-vermillion dark:hover:text-vermillion-light transition-colors duration-200 link-underline"
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
