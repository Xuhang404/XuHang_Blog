"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminProfile() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        setName(data.name);
        setBio(data.bio);
        setAvatar(data.avatar);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/profile", {
      method: "PUT",
      body: JSON.stringify({ name, bio, avatar }),
    });
    setSaving(false);
    router.push("/admin");
    router.refresh();
  };

  return (
    <div>
      <h1 className="font-serif-heading text-2xl text-ink dark:text-[#f0eee8] mb-10">
        编辑个人信息
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs text-smoke/60 dark:text-[#6b6560]/60 uppercase tracking-[0.15em] mb-2">
            头像 URL
          </label>
          <input
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full border border-divider dark:border-[#2a2822] bg-paper dark:bg-[#0f0f0e] px-3 py-2.5 text-sm text-ink dark:text-[#f0eee8] placeholder:text-smoke/40 focus:outline-none focus:border-vermillion transition-colors duration-200"
          />
          {avatar && (
            <img
              src={avatar}
              alt="preview"
              className="size-12 mt-3"
            />
          )}
        </div>
        <div>
          <label className="block text-xs text-smoke/60 dark:text-[#6b6560]/60 uppercase tracking-[0.15em] mb-2">
            名称
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-divider dark:border-[#2a2822] bg-paper dark:bg-[#0f0f0e] px-3 py-2.5 text-sm text-ink dark:text-[#f0eee8] placeholder:text-smoke/40 focus:outline-none focus:border-vermillion transition-colors duration-200"
          />
        </div>
        <div>
          <label className="block text-xs text-smoke/60 dark:text-[#6b6560]/60 uppercase tracking-[0.15em] mb-2">
            签名
          </label>
          <input
            value={bio}
            onChange={(e) => setBio(e.target.value)}
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
