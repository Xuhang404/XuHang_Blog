import TagBadge from "@/components/TagBadge";
import { getAbout } from "@/lib/about";
import { getProfile } from "@/lib/profile";

export default function AboutPage() {
  const about = getAbout();
  const profile = getProfile();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* 头像 + 名称 */}
      <div className="flex flex-col items-center text-center mb-12">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="size-24 rounded-full mb-4"
        />
        <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
        {profile.bio && (
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">{profile.bio}</p>
        )}
      </div>

      <div className="space-y-6">
        {/* 简介 */}
        {about.intro && (
          <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1a1a1a] p-6">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {about.intro}
            </p>
            {about.introMore && (
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {about.introMore}
              </p>
            )}
          </section>
        )}

        {/* 技能 */}
        {about.skills && about.skills.length > 0 && (
          <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1a1a1a] p-6">
            <div className="flex flex-wrap gap-2">
              {about.skills.map((skill) => (
                <TagBadge key={skill} tag={skill} />
              ))}
            </div>
          </section>
        )}

        {/* 联系方式 */}
        <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1a1a1a] p-6">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="text-zinc-400">GitHub</span>
            <a
              href={about.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-2"
            >
              {about.github.replace("https://", "")}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
