"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type PostSummary = {
  slug: string;
  metadata: { title: string; date: string; excerpt: string; tags: string[] };
};

export default function AdminDashboard() {
  const [posts, setPosts] = useState<PostSummary[]>([]);

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

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-warm-800 dark:text-warm-100">文章</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-lg bg-accent text-white px-4 py-2 text-sm font-medium hover:bg-accent-dark transition-colors duration-300"
        >
          写新文章
        </Link>
      </div>

      <div className="space-y-3">
        {posts.length === 0 && (
          <p className="text-sm text-warm-400 text-center py-12">暂无文章</p>
        )}
        {posts.map((post) => (
          <div
            key={post.slug}
            className="flex items-center justify-between rounded-xl ring-1 ring-warm-200 dark:ring-warm-800 bg-white dark:bg-warm-900 px-4 py-3 transition-shadow duration-300 hover:shadow-sm"
          >
            <div>
              <Link
                href={`/admin/posts/${post.slug}/edit`}
                className="font-medium text-warm-800 dark:text-warm-100 hover:text-accent transition-colors duration-300"
              >
                {post.metadata.title}
              </Link>
              <p className="mt-0.5 text-xs text-warm-400">{post.metadata.date}</p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/posts/${post.slug}`}
                className="text-xs text-warm-400 hover:text-accent transition-colors duration-300"
                target="_blank"
              >
                预览
              </Link>
              <button
                onClick={() => handleDelete(post.slug)}
                className="text-xs text-rose-400 hover:text-rose-600 transition-colors duration-300"
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
