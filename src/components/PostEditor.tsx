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
  const [showPreview, setShowPreview] = useState(false);

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

    const url = isEditing ? `/api/posts/${initialSlug}` : "/api/posts";
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
    "w-full border border-divider bg-paper px-4 py-3 text-base text-ink placeholder:text-smoke/40 focus:outline-none focus:border-vermillion transition-colors duration-200";

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      {/* 工具栏 */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif-heading text-2xl text-ink">
          {isEditing ? "编辑文章" : "写新文章"}
        </h1>
        <div className="flex gap-4 items-center">
          {error && <p className="text-sm text-vermillion">{error}</p>}
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
            className="bg-ink text-paper px-6 py-2.5 text-sm hover:bg-vermillion dark:hover:bg-vermillion hover:text-white transition-colors duration-200 disabled:opacity-50"
          >
            {saving ? "保存中..." : "保存"}
          </button>
        </div>
      </div>

      {/* 标题 — 大号字号，写作焦点 */}
      <textarea
        placeholder="文章标题..."
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
        rows={1}
        className="w-full bg-transparent border-0 border-b-2 border-divider focus:border-vermillion px-0 py-3 font-serif-heading text-3xl text-ink placeholder:text-smoke/30 focus:outline-none transition-colors duration-200 resize-none"
        required
      />

      {/* 元数据行 — 紧凑 */}
      <div className="flex flex-wrap gap-4 mt-6 mb-10">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] uppercase tracking-[0.15em] text-smoke/50 mb-1.5">
            标识
          </label>
          <input
            placeholder="slug"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugManuallyEdited(true);
            }}
            className="w-full border border-divider bg-paper px-3 py-2 text-sm text-ink placeholder:text-smoke/30 focus:outline-none focus:border-vermillion transition-colors duration-200"
            disabled={isEditing}
          />
        </div>
        <div className="w-40">
          <label className="block text-[10px] uppercase tracking-[0.15em] text-smoke/50 mb-1.5">
            日期
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-divider bg-paper px-3 py-2 text-sm text-ink focus:outline-none focus:border-vermillion transition-colors duration-200"
            required
          />
        </div>
        <div className="flex-[2] min-w-[200px]">
          <label className="block text-[10px] uppercase tracking-[0.15em] text-smoke/50 mb-1.5">
            标签
          </label>
          <input
            placeholder="用逗号分隔"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border border-divider bg-paper px-3 py-2 text-sm text-ink placeholder:text-smoke/30 focus:outline-none focus:border-vermillion transition-colors duration-200"
          />
        </div>
      </div>

      {/* 摘要 */}
      <textarea
        placeholder="文章摘要..."
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        rows={2}
        className="w-full border border-divider bg-paper px-4 py-3 text-base text-ink placeholder:text-smoke/30 focus:outline-none focus:border-vermillion transition-colors duration-200 resize-y mb-8"
        required
      />

      {/* 编辑区 + 预览 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-[10px] uppercase tracking-[0.15em] text-smoke/50">
            Markdown 正文
          </label>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="text-xs text-smoke/50 hover:text-vermillion transition-colors duration-200"
          >
            {showPreview ? "仅编辑" : "预览"}
          </button>
        </div>

        <div className={`gap-6 ${showPreview ? "grid grid-cols-2" : "block"}`}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={22}
            className="w-full border border-divider bg-paper px-5 py-4 text-base text-ink placeholder:text-smoke/30 focus:outline-none focus:border-vermillion transition-colors duration-200 font-mono resize-y"
            placeholder="开始写作..."
            required
          />
          {showPreview && (
            <div className="prose max-w-none border border-divider bg-paper px-6 py-4 overflow-y-auto h-[520px]">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || "*等待内容...*"}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
