import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import LogoutButton from "@/components/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper dark:bg-[#0f0f0e]">
      <header className="border-b border-divider dark:border-[#2a2822]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-sm text-smoke/60 dark:text-[#6b6560]/60 hover:text-vermillion dark:hover:text-vermillion-light transition-colors duration-200"
          >
            &larr; 返回博客
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-xs text-smoke/50 dark:text-[#6b6560]/50 uppercase tracking-[0.15em]">
              后台
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-5xl gap-10 px-4 py-10">
        <AdminSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
