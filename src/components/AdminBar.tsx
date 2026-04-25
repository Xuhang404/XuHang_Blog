"use client";

import { useRouter } from "next/navigation";

type Props = {
  editSlug?: string;
  deleteSlug?: string;
};

export default function AdminBar({ editSlug, deleteSlug }: Props) {
  const router = useRouter();

  const doAction = async (action: string, slug: string) => {
    if (action === "delete" && !confirm("确定删除？")) return;

    const res = await fetch("/api/auth/check");
    if (!res.ok) {
      router.push(`/admin/login?redirect=/${action === "edit" ? `admin/posts/${slug}/edit` : ""}`);
      return;
    }

    if (action === "edit") {
      router.push(`/admin/posts/${slug}/edit`);
    } else if (action === "delete") {
      const r = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
      if (r.ok) window.location.reload();
    }
  };

  return (
    <div className="flex gap-1.5">
      {editSlug && (
        <button
          onClick={() => doAction("edit", editSlug)}
          className="rounded border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
        >
          编辑
        </button>
      )}
      {deleteSlug && (
        <button
          onClick={() => doAction("delete", deleteSlug)}
          className="rounded border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 text-xs text-zinc-400 hover:text-red-500 hover:border-red-300 dark:hover:border-red-700 transition-colors"
        >
          删除
        </button>
      )}
    </div>
  );
}
