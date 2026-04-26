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
      <h1 className="text-2xl font-bold text-warm-800 dark:text-warm-100 mb-8">
        编辑个人信息
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-warm-500 mb-1">头像 URL</label>
          <input
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full rounded-xl border border-warm-200 dark:border-warm-700 bg-white dark:bg-warm-900 px-3 py-2 text-sm text-warm-800 dark:text-warm-100 placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
          />
          {avatar && (
            <img
              src={avatar}
              alt="preview"
              className="size-12 rounded-full mt-2 ring-2 ring-warm-200 dark:ring-warm-700"
            />
          )}
        </div>
        <div>
          <label className="block text-sm text-warm-500 mb-1">名称</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-warm-200 dark:border-warm-700 bg-white dark:bg-warm-900 px-3 py-2 text-sm text-warm-800 dark:text-warm-100 placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
          />
        </div>
        <div>
          <label className="block text-sm text-warm-500 mb-1">签名</label>
          <input
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full rounded-xl border border-warm-200 dark:border-warm-700 bg-white dark:bg-warm-900 px-3 py-2 text-sm text-warm-800 dark:text-warm-100 placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-accent text-white px-4 py-2 text-sm font-medium hover:bg-accent-dark transition-all duration-300 disabled:opacity-50"
          >
            {saving ? "保存中..." : "保存"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="rounded-xl border border-warm-200 dark:border-warm-700 px-4 py-2 text-sm text-warm-500 dark:text-warm-400 hover:bg-warm-100 dark:hover:bg-warm-800 transition-all duration-300"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
}
