import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import LogoutButton from "@/components/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-warm-50 dark:bg-warm-950">
      <header className="border-b border-warm-200 dark:border-warm-800 bg-white dark:bg-warm-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="text-sm text-warm-400 hover:text-accent transition-colors duration-300"
          >
            &larr; 返回博客
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-warm-400">后台</span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-5xl gap-8 px-4 py-8">
        <AdminSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
