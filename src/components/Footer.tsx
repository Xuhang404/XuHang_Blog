import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-warm-200 dark:border-warm-800 bg-warm-100/50 dark:bg-warm-900/30">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h4 className="text-sm font-semibold text-warm-700 dark:text-warm-300 mb-3">
              XuHang&apos;s Blog
            </h4>
            <p className="text-xs text-warm-500 dark:text-warm-400 leading-relaxed">
              个人博客，记录技术与生活。
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-warm-700 dark:text-warm-300 mb-3">
              导航
            </h4>
            <ul className="space-y-1.5 text-xs text-warm-500 dark:text-warm-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-accent dark:hover:text-accent transition-colors duration-300"
                >
                  首页
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-accent dark:hover:text-accent transition-colors duration-300"
                >
                  关于
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-warm-700 dark:text-warm-300 mb-3">
              联系
            </h4>
            <ul className="space-y-1.5 text-xs text-warm-500 dark:text-warm-400">
              <li>
                <a
                  href="https://github.com/Xuhang404"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent dark:hover:text-accent transition-colors duration-300"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-warm-200 dark:border-warm-800 pt-6 text-center text-xs text-warm-400 dark:text-warm-500">
          &copy; {new Date().getFullYear()} XuHang&apos;s Blog
        </div>
      </div>
    </footer>
  );
}
