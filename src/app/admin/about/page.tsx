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
      <h1 className="font-serif-heading text-2xl text-ink dark:text-[#f0eee8] mb-10">
        编辑关于页
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs text-smoke/60 dark:text-[#6b6560]/60 uppercase tracking-[0.15em] mb-2">
            个人简介
          </label>
          <textarea
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            rows={3}
            className="w-full border border-divider dark:border-[#2a2822] bg-paper dark:bg-[#0f0f0e] px-3 py-2.5 text-sm text-ink dark:text-[#f0eee8] placeholder:text-smoke/40 focus:outline-none focus:border-vermillion transition-colors duration-200 resize-y"
          />
        </div>
        <div>
          <label className="block text-xs text-smoke/60 dark:text-[#6b6560]/60 uppercase tracking-[0.15em] mb-2">
            补充介绍
          </label>
          <textarea
            value={introMore}
            onChange={(e) => setIntroMore(e.target.value)}
            rows={2}
            className="w-full border border-divider dark:border-[#2a2822] bg-paper dark:bg-[#0f0f0e] px-3 py-2.5 text-sm text-ink dark:text-[#f0eee8] placeholder:text-smoke/40 focus:outline-none focus:border-vermillion transition-colors duration-200 resize-y"
          />
        </div>
        <div>
          <label className="block text-xs text-smoke/60 dark:text-[#6b6560]/60 uppercase tracking-[0.15em] mb-2">
            技能（用逗号分隔）
          </label>
          <input
            value={skillsText}
            onChange={(e) => setSkillsText(e.target.value)}
            className="w-full border border-divider dark:border-[#2a2822] bg-paper dark:bg-[#0f0f0e] px-3 py-2.5 text-sm text-ink dark:text-[#f0eee8] placeholder:text-smoke/40 focus:outline-none focus:border-vermillion transition-colors duration-200"
          />
        </div>
        <div>
          <label className="block text-xs text-smoke/60 dark:text-[#6b6560]/60 uppercase tracking-[0.15em] mb-2">
            GitHub 链接
          </label>
          <input
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className="w-full border border-divider dark:border-[#2a2822] bg-paper dark:bg-[#0f0f0e] px-3 py-2.5 text-sm text-ink dark:text-[#f0eee8] placeholder:text-smoke/40 focus:outline-none focus:border-vermillion transition-colors duration-200"
          />
        </div>
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-ink dark:bg-[#f0eee8] text-paper dark:text-[#0f0f0e] px-5 py-2.5 text-sm hover:bg-vermillion dark:hover:bg-vermillion hover:text-white transition-colors duration-200 disabled:opacity-50"
          >
            {saving ? "保存中..." : "保存"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="text-sm text-smoke dark:text-[#6b6560] hover:text-vermillion dark:hover:text-vermillion-light transition-colors duration-200"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
}
