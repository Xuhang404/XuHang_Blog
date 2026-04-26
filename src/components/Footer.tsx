import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h4 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-3">
              XuHang&apos;s Blog
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              个人博客，记录技术与生活。
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-3">
              链接
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li>
                <Link href="/" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                  关于
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-3">
              联系
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li>
                <a
                  href="https://github.com/Xuhang404"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-100 dark:border-zinc-800 pt-6 text-center text-xs text-zinc-400">
          &copy; {new Date().getFullYear()} XuHang&apos;s Blog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
