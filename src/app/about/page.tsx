import { getAbout } from "@/lib/about";
import { getProfile } from "@/lib/profile";

export default function AboutPage() {
  const about = getAbout();
  const profile = getProfile();

  return (
    <div className="mx-auto max-w-5xl px-4 py-20">
      {/* 头部区域 — 大号名字 + 简介，两层结构 */}
      <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
        {/* 左列：名字 */}
        <div className="lg:col-span-2 animate-fadeInUp">
          <h1 className="font-serif-heading text-[clamp(3rem,7vw,5rem)] leading-[0.9] text-ink">
            {profile.name}
          </h1>
          {profile.bio && (
            <p className="mt-5 text-base text-smoke leading-relaxed">
              {profile.bio}
            </p>
          )}
        </div>

        {/* 右列：详细介绍 */}
        <div className="lg:col-span-3 space-y-10 animate-fadeInUp" style={{ animationDelay: "0.12s" }}>
          {about.intro && (
            <div className="border-l-2 border-vermillion pl-6 py-2">
              <p className="text-base text-ink-light leading-relaxed">
                {about.intro}
              </p>
              {about.introMore && (
                <p className="mt-4 text-base text-ink-light leading-relaxed">
                  {about.introMore}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 底部区域 — 技能 + 联系，两栏 */}
      <div className="mt-20 grid sm:grid-cols-2 gap-12 pt-12 border-t border-divider">
        {about.skills && about.skills.length > 0 && (
          <section className="animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            <p className="text-[10px] uppercase tracking-[0.2em] text-smoke/50 mb-6">
              技能与工具
            </p>
            <div className="flex flex-wrap gap-2">
              {about.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-full px-3.5 py-1.5 text-sm bg-frost text-smoke hover:text-ink hover:bg-divider transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {about.github && (
          <section className="animate-fadeInUp" style={{ animationDelay: "0.28s" }}>
            <p className="text-[10px] uppercase tracking-[0.2em] text-smoke/50 mb-6">
              找到我
            </p>
            <a
              href={about.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-base text-smoke hover:text-vermillion transition-colors duration-200"
            >
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="link-underline">GitHub</span>
            </a>
          </section>
        )}
      </div>
    </div>
  );
}
