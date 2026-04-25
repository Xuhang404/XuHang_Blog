"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  initialSlug?: string;
  initialTitle?: string;
  initialDate?: string;
  initialExcerpt?: string;
  initialTags?: string;
  initialContent?: string;
  isEditing?: boolean;
};

export default function PostEditor({
  initialSlug = "",
  initialTitle = "",
  initialDate = new Date().toISOString().slice(0, 10),
  initialExcerpt = "",
  initialTags = "",
  initialContent = "",
  isEditing = false,
}: Props) {
  const router = useRouter();
  const [slug, setSlug] = useState(initialSlug);
  const [title, setTitle] = useState(initialTitle);
  const [date, setDate] = useState(initialDate);
  const [excerpt, setExcerpt] = useState(initialExcerpt);
  const [tags, setTags] = useState(initialTags);
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const autoSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9一-龥]+/g, "-")
      .replace(/^-|-$/g, "");

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugManuallyEdited && !isEditing) {
      setSlug(autoSlug(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const body = {
      slug,
      title,
      date,
      excerpt,
      tags: tags
        .split(/[,，、]/)
        .map((t) => t.trim())
        .filter(Boolean),
      content,
    };

    const url = isEditing
      ? `/api/posts/${initialSlug}`
      : "/api/posts";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, { method, body: JSON.stringify(body) });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "保存失败");
      setSaving(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {isEditing ? "编辑文章" : "写新文章"}
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="rounded border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "保存中..." : "保存"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            placeholder="URL 标识 (slug)"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugManuallyEdited(true);
            }}
            className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
            disabled={isEditing}
          />
          <p className="mt-1 text-xs text-zinc-400">
            文章访问地址 /posts/{slug || "..."}，由标题自动生成
          </p>
        </div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
          required
        />
      </div>

      <input
        placeholder="文章标题"
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
        className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
        required
      />

      <input
        placeholder="标签（用逗号分隔）"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
      />

      <textarea
        placeholder="文章摘要"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        rows={2}
        className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Markdown</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
            required
          />
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-1">预览</label>
          <div className="prose prose-zinc dark:prose-invert max-w-none rounded border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm overflow-y-auto h-[482px]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content || "*暂无内容*"}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </form>
  );
}
