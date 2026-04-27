"use client";

import { useRouter } from "next/navigation";

type Props = {
  editSlug?: string;
  deleteSlug?: string;
};

export default function AdminBar({ editSlug, deleteSlug }: Props) {
  const router = useRouter();

  const doAction = async (action: string, slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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
    <span className="inline-flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      {editSlug && (
        <button
          onClick={(e) => doAction("edit", editSlug, e)}
          className="text-xs text-smoke/40 hover:text-vermillion transition-colors duration-200"
        >
          编辑
        </button>
      )}
      {deleteSlug && (
        <button
          onClick={(e) => doAction("delete", deleteSlug, e)}
          className="text-xs text-smoke/40 hover:text-vermillion transition-colors duration-200"
        >
          删除
        </button>
      )}
    </span>
  );
}
