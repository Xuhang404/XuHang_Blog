import TagBadge from "@/components/TagBadge";
import { getAbout } from "@/lib/about";
import { getProfile } from "@/lib/profile";

export default function AboutPage() {
  const about = getAbout();
  const profile = getProfile();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* 头像 + 名称 - 暖木风格头部 */}
      <div className="flex flex-col items-center text-center mb-14">
        <div className="relative mb-5">
          <div className="absolute inset-0 rounded-full bg-accent/10 blur-xl" />
          <img
            src={profile.avatar}
            alt={profile.name}
            className="size-24 rounded-full ring-2 ring-warm-200 dark:ring-warm-700 relative"
          />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-warm-800 dark:text-warm-100">
          {profile.name}
        </h1>
        {profile.bio && (
          <p className="mt-2 text-warm-500 dark:text-warm-400">{profile.bio}</p>
        )}
      </div>

      <div className="space-y-6">
        {/* 简介 */}
        {about.intro && (
          <section className="rounded-2xl ring-1 ring-warm-200 dark:ring-warm-800 bg-white dark:bg-warm-900 p-6 transition-shadow duration-300 hover:shadow-md">
            <p className="text-sm text-warm-600 dark:text-warm-400 leading-relaxed">
              {about.intro}
            </p>
            {about.introMore && (
              <p className="mt-3 text-sm text-warm-600 dark:text-warm-400 leading-relaxed">
                {about.introMore}
              </p>
            )}
          </section>
        )}

        {/* 技能 */}
        {about.skills && about.skills.length > 0 && (
          <section className="rounded-2xl ring-1 ring-warm-200 dark:ring-warm-800 bg-white dark:bg-warm-900 p-6">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-warm-400 dark:text-warm-500">
              技能
            </h2>
            <div className="flex flex-wrap gap-2">
              {about.skills.map((skill) => (
                <TagBadge key={skill} tag={skill} />
              ))}
            </div>
          </section>
        )}

        {/* 联系方式 */}
        <section className="rounded-2xl ring-1 ring-warm-200 dark:ring-warm-800 bg-white dark:bg-warm-900 p-6">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-warm-400 dark:text-warm-500">
            联系
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center justify-center size-8 rounded-lg bg-warm-100 dark:bg-warm-800 text-warm-500 dark:text-warm-400">
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </span>
            <a
              href={about.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-600 dark:text-warm-400 hover:text-accent transition-colors duration-300"
            >
              {about.github.replace("https://", "")}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
