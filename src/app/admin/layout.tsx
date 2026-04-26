import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import LogoutButton from "@/components/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1a1a1a]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            &larr; 返回博客
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400">后台</span>
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
