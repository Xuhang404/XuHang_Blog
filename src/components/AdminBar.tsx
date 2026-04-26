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
          className="rounded-lg border border-warm-200 dark:border-warm-700 px-2 py-0.5 text-xs text-warm-400 hover:text-accent hover:border-accent dark:hover:border-accent transition-all duration-300"
        >
          编辑
        </button>
      )}
      {deleteSlug && (
        <button
          onClick={() => doAction("delete", deleteSlug)}
          className="rounded-lg border border-warm-200 dark:border-warm-700 px-2 py-0.5 text-xs text-warm-400 hover:text-rose-500 hover:border-rose-300 dark:hover:border-rose-700 transition-all duration-300"
        >
          删除
        </button>
      )}
    </div>
  );
}
