import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-warm-200 dark:border-warm-800 bg-warm-50/80 dark:bg-warm-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-5">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-warm-800 dark:text-warm-100"
        >
          XuHang&apos;s Blog
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex gap-6 text-sm">
            <Link
              href="/"
              className="relative text-warm-500 dark:text-warm-400 hover:text-accent dark:hover:text-accent transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              首页
            </Link>
            <Link
              href="/about"
              className="relative text-warm-500 dark:text-warm-400 hover:text-accent dark:hover:text-accent transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
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
