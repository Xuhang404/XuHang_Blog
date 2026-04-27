import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getProfile } from "@/lib/profile";
import PostViews from "@/components/PostViews";
import AdminBar from "@/components/AdminBar";
import AdminButton from "@/components/AdminButton";
import TagCloud from "@/components/TagCloud";
import BackToTop from "@/components/BackToTop";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const profile = getProfile();
  const allPosts = getAllPosts();
  const posts = tag
    ? allPosts.filter((p) => p.metadata.tags?.includes(tag))
    : allPosts;

  function relativeTime(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const min = Math.floor(diff / 60000);
    if (min < 1) return "刚刚";
    if (min < 60) return `${min} 分钟前`;
    const hour = Math.floor(diff / 3600000);
    if (hour < 24) return `${hour} 小时前`;
    const day = Math.floor(diff / 86400000);
    if (day < 30) return `${day} 天前`;
    const month = Math.floor(day / 30);
    if (month < 12) return `${month} 个月前`;
    return `${Math.floor(month / 12)} 年前`;
  }

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-20 pb-12 lg:flex lg:gap-16">
        {/* 左侧信息区 — 名字 + 简介 + 标签 */}
        <aside className="lg:w-72 lg:shrink-0">
          <div className="lg:sticky lg:top-28">
            <div className="animate-fadeInUp">
              <h1 className="font-serif-heading text-[clamp(3rem,6vw,5rem)] leading-[0.9] text-ink">
                {profile.name}
              </h1>
              {profile.bio && (
                <p className="mt-5 text-base text-smoke leading-relaxed">
                  {profile.bio}
                </p>
              )}
              <div className="mt-6 flex gap-3">
                <AdminButton href="/admin" label="管理" />
                <AdminButton href="/admin/profile" label="编辑资料" />
              </div>
            </div>

            <div className="mt-14 animate-fadeInUp" style={{ animationDelay: "0.15s" }}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-smoke/50 mb-4">
                标签浏览
              </p>
              <TagCloud activeTag={tag} />
            </div>
          </div>
        </aside>

        {/* 竖向分隔线 */}
        <div className="hidden lg:block w-px bg-divider shrink-0 animate-revealHorizontal" />

        {/* 右侧文章列表 */}
        <div className="flex-1 min-w-0 mt-14 lg:mt-0 lg:pl-4">
          {/* 筛选状态 */}
          {tag && (
            <div className="mb-12 flex items-center gap-2 animate-slideDown">
              <span className="text-vermillion text-lg font-serif-heading">#</span>
              <span className="text-lg font-serif-heading text-ink">
                {tag}
              </span>
              <span className="text-sm text-smoke ml-2">
                {posts.length} 篇文章
              </span>
              <Link
                href="/"
                className="ml-auto text-xs text-smoke/50 hover:text-vermillion transition-colors duration-200"
              >
                清除筛选
              </Link>
            </div>
          )}

          {posts.length === 0 ? (
            <div className="py-32 text-center animate-fadeInUp">
              {tag ? (
                <p className="text-base text-smoke">
                  没有标签为 &ldquo;{tag}&rdquo; 的文章
                </p>
              ) : (
                <div>
                  <p className="text-base text-smoke mb-6">还没有文章</p>
                  <Link
                    href="/admin/posts/new"
                    className="inline-block text-sm text-vermillion hover:text-vermillion-dark transition-colors duration-200"
                  >
                    写第一篇文章 &rarr;
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div>
              {posts.map((post, i) => (
                <article
                  key={post.slug}
                  className="group border-b border-divider last:border-0 animate-fadeInUp"
                  style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                >
                  <Link
                    href={`/posts/${post.slug}`}
                    className="block py-7 -mx-3 px-3 transition-all duration-300 hover:bg-frost hover:translate-x-2"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="min-w-0">
                        <h2 className="font-serif-heading text-xl text-ink group-hover:text-vermillion dark:group-hover:text-vermillion-light transition-colors duration-200 leading-snug">
                          {post.metadata.title}
                        </h2>
                        <p className="mt-2 text-base text-smoke leading-relaxed line-clamp-1">
                          {post.metadata.excerpt}
                        </p>
                        <div className="mt-4 flex items-center gap-4 text-xs text-smoke/50">
                          <time>{relativeTime(post.metadata.date)}</time>
                          <PostViews slug={post.slug} />
                          {post.metadata.tags?.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="rounded-full bg-frost px-2.5 py-0.5 text-xs"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <AdminBar editSlug={post.slug} deleteSlug={post.slug} />
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
      <BackToTop />
    </>
  );
}
