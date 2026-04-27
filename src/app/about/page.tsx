import { getAbout } from "@/lib/about";
import { getProfile } from "@/lib/profile";

export default function AboutPage() {
  const about = getAbout();
  const profile = getProfile();

  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      {/* 名字 — 大号衬线 */}
      <h1 className="font-serif-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-ink dark:text-[#f0eee8]">
        {profile.name}
      </h1>
      {profile.bio && (
        <p className="mt-4 text-lg text-smoke dark:text-[#6b6560]">
          {profile.bio}
        </p>
      )}

      <div className="mt-16 space-y-12">
        {/* 简介 */}
        {about.intro && (
          <section>
            <p className="text-base text-ink-light dark:text-[#a8a59a] leading-relaxed">
              {about.intro}
            </p>
            {about.introMore && (
              <p className="mt-4 text-base text-ink-light dark:text-[#a8a59a] leading-relaxed">
                {about.introMore}
              </p>
            )}
          </section>
        )}

        {/* 技能 */}
        {about.skills && about.skills.length > 0 && (
          <section>
            <p className="text-[10px] uppercase tracking-[0.15em] text-smoke/60 dark:text-[#6b6560]/60 mb-4">
              技能
            </p>
            <div className="flex flex-wrap gap-2">
              {about.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-frost dark:bg-[#1a1916] text-smoke dark:text-[#6b6560]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* GitHub */}
        {about.github && (
          <section>
            <p className="text-[10px] uppercase tracking-[0.15em] text-smoke/60 dark:text-[#6b6560]/60 mb-4">
              联系
            </p>
            <a
              href={about.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-vermillion hover:text-vermillion-dark dark:hover:text-vermillion-light transition-colors duration-200"
            >
              {about.github}
            </a>
          </section>
        )}
      </div>
    </div>
  );
}
