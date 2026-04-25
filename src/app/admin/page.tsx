"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type PostSummary = {
  slug: string;
  metadata: { title: string; date: string; excerpt: string; tags: string[] };
};

export default function AdminDashboard() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("确定要删除这篇文章吗？")) return;
    await fetch(`/api/posts/${slug}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.slug !== slug));
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">文章</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/posts/new"
            className="rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            写新文章
          </Link>
          <Link
            href="/admin/profile"
            className="rounded border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            个人信息
          </Link>
          <button
            onClick={handleLogout}
            className="rounded border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            退出
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="flex items-center justify-between rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3"
          >
            <div>
              <Link
                href={`/admin/posts/${post.slug}/edit`}
                className="font-medium hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                {post.metadata.title}
              </Link>
              <p className="mt-0.5 text-xs text-zinc-500">{post.metadata.date}</p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/posts/${post.slug}`}
                className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                target="_blank"
              >
                预览
              </Link>
              <button
                onClick={() => handleDelete(post.slug)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
