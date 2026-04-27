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
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif-heading text-2xl text-ink">
          文章
        </h1>
        <Link
          href="/admin/posts/new"
          className="bg-ink text-paper px-4 py-2 text-sm hover:bg-vermillion dark:hover:bg-vermillion hover:text-white transition-colors duration-200"
        >
          写新文章
        </Link>
      </div>

      <div className="space-y-0">
        {posts.length === 0 && (
          <p className="text-sm text-smoke text-center py-16">
            暂无文章
          </p>
        )}
        {posts.map((post) => (
          <div
            key={post.slug}
            className="flex items-center justify-between border-b border-divider last:border-0 px-1 py-4 hover:bg-frost transition-colors duration-200"
          >
            <div className="min-w-0">
              <Link
                href={`/admin/posts/${post.slug}/edit`}
                className="text-ink hover:text-vermillion dark:hover:text-vermillion-light transition-colors duration-200"
              >
                {post.metadata.title}
              </Link>
              <p className="mt-0.5 text-xs text-smoke/60">
                {post.metadata.date}
              </p>
            </div>
            <div className="flex gap-4 shrink-0 ml-4">
              <Link
                href={`/posts/${post.slug}`}
                className="text-xs text-smoke/40 hover:text-vermillion dark:hover:text-vermillion-light transition-colors duration-200"
                target="_blank"
              >
                预览
              </Link>
              <button
                onClick={() => handleDelete(post.slug)}
                className="text-xs text-smoke/40 hover:text-vermillion dark:hover:text-vermillion-light transition-colors duration-200"
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
