"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminAbout() {
  const router = useRouter();
  const [intro, setIntro] = useState("");
  const [introMore, setIntroMore] = useState("");
  const [skillsText, setSkillsText] = useState("");
  const [github, setGithub] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((data) => {
        setIntro(data.intro);
        setIntroMore(data.introMore);
        setSkillsText(data.skills?.join(", ") ?? "");
        setGithub(data.github);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/about", {
      method: "PUT",
      body: JSON.stringify({
        intro,
        introMore,
        skills: skillsText
          .split(/[,，、]/)
          .map((s) => s.trim())
          .filter(Boolean),
        github,
      }),
    });
    setSaving(false);
    router.push("/admin");
    router.refresh();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">编辑关于页</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-zinc-500 mb-1">个人简介</label>
          <textarea
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            rows={3}
            className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-500 mb-1">补充介绍</label>
          <textarea
            value={introMore}
            onChange={(e) => setIntroMore(e.target.value)}
            rows={2}
            className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-500 mb-1">
            技能（用逗号分隔）
          </label>
          <input
            value={skillsText}
            onChange={(e) => setSkillsText(e.target.value)}
            className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-500 mb-1">GitHub 链接</label>
          <input
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "保存中..." : "保存"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="rounded border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
}
