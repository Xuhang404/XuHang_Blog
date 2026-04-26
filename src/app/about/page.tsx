import Link from "next/link";
import TagBadge from "@/components/TagBadge";
import { getAbout } from "@/lib/about";

export default function AboutPage() {
  const about = getAbout();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">关于</h1>

      <div className="mt-8 space-y-8">
        {/* 个人简介 */}
        <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1a1a1a] p-6">
          <h2 className="text-lg font-semibold mb-3">👋 你好</h2>
          {about.intro && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {about.intro}
            </p>
          )}
          {about.introMore && (
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {about.introMore}
            </p>
          )}
        </section>

        {/* 技能 */}
        {about.skills && about.skills.length > 0 && (
          <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1a1a1a] p-6">
            <h2 className="text-lg font-semibold mb-3">🛠 技能</h2>
            <div className="flex flex-wrap gap-2">
              {about.skills.map((skill) => (
                <TagBadge key={skill} tag={skill} />
              ))}
            </div>
          </section>
        )}

        {/* 联系方式 */}
        <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1a1a1a] p-6">
          <h2 className="text-lg font-semibold mb-3">📫 联系方式</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            可以通过{" "}
            <Link
              href={about.github}
              target="_blank"
              className="text-zinc-900 dark:text-zinc-100 underline underline-offset-2 hover:no-underline"
            >
              GitHub
            </Link>{" "}
            与我联系。
          </p>
        </section>
      </div>
    </div>
  );
}
