import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-6">
        <Link
          href="/"
          className="font-serif-heading text-xl text-ink tracking-tight"
        >
          XuHang
        </Link>
        <div className="flex items-center gap-8">
          <nav className="flex gap-8 text-sm">
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
