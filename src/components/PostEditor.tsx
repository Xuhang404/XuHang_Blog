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

  const inputClass =
    "w-full border border-divider bg-paper px-3 py-2.5 text-sm text-ink placeholder:text-smoke/40 focus:outline-none focus:border-vermillion transition-colors duration-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-serif-heading text-2xl text-ink">
          {isEditing ? "编辑文章" : "写新文章"}
        </h1>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="text-sm text-smoke hover:text-vermillion dark:hover:text-vermillion-light transition-colors duration-200"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-ink text-paper px-5 py-2.5 text-sm hover:bg-vermillion dark:hover:bg-vermillion hover:text-white transition-colors duration-200 disabled:opacity-50"
          >
            {saving ? "保存中..." : "保存"}
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-vermillion">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            placeholder="URL 标识 (slug)"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugManuallyEdited(true);
            }}
            className={inputClass}
            disabled={isEditing}
          />
          <p className="mt-1 text-xs text-smoke/50">
            访问地址 /posts/{slug || "..."}
          </p>
        </div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      <input
        placeholder="文章标题"
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
        className={inputClass}
        required
      />

      <input
        placeholder="标签（用逗号分隔）"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className={inputClass}
      />

      <textarea
        placeholder="文章摘要"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        rows={2}
        className={inputClass + " resize-y"}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-smoke/60 uppercase tracking-[0.15em] mb-2">
            Markdown
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            className={inputClass + " font-mono text-xs resize-none"}
            required
          />
        </div>
        <div>
          <label className="block text-xs text-smoke/60 uppercase tracking-[0.15em] mb-2">
            预览
          </label>
          <div className="prose max-w-none border border-divider bg-paper px-4 py-3 text-sm overflow-y-auto h-[482px]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content || "*暂无内容*"}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </form>
  );
}
