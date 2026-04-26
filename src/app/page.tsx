import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getProfile } from "@/lib/profile";
import PostViews from "@/components/PostViews";
import AdminBar from "@/components/AdminBar";
import AdminButton from "@/components/AdminButton";
import TagBadge from "@/components/TagBadge";
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
      <div className="mx-auto max-w-6xl px-4 py-12 lg:flex lg:gap-12">
        {/* 左侧面板 */}
        <aside className="lg:w-72 lg:shrink-0">
          <div className="lg:sticky lg:top-24 lg:space-y-8">
            {/* 个人资料卡 */}
            <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1a1a1a] p-6">
              <div className="flex items-center gap-4 lg:flex-col lg:text-center">
                <a
                  href="https://github.com/Xuhang404"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="size-16 rounded-full lg:size-20"
                  />
                </a>
                <div className="min-w-0 lg:mt-2">
                  <h1 className="text-lg font-bold">{profile.name}</h1>
                  {profile.bio && (
                    <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-500">
                      {profile.bio}
                    </p>
                  )}
                  <div className="mt-3 flex gap-2 lg:justify-center">
                    <AdminButton href="/admin/profile" label="编辑资料" />
                    <AdminButton href="/admin" label="管理" />
                  </div>
                </div>
              </div>
            </section>

            {/* 标签云 */}
            <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1a1a1a] p-6">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                标签
              </h2>
              <TagCloud activeTag={tag} />
            </section>
          </div>
        </aside>

        {/* 右侧文章列表 */}
        <div className="flex-1 min-w-0 mt-8 lg:mt-0">
          {/* 筛选提示 */}
          {tag && (
            <div className="mb-5 flex items-center gap-2 text-sm text-zinc-500">
              <span>
                筛选：<span className="font-medium text-zinc-900 dark:text-zinc-100">{tag}</span>
              </span>
              <span className="text-zinc-300 dark:text-zinc-600">·</span>
              <span>{posts.length} 篇</span>
              <Link
                href="/"
                className="ml-auto text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                清除筛选 &rarr;
              </Link>
            </div>
          )}

          {posts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 py-16 text-center animate-fadeInUp">
              {tag ? (
                <p className="text-sm text-zinc-400">
                  没有标签为 &ldquo;{tag}&rdquo; 的文章
                </p>
              ) : (
                <>
                  <p className="text-sm text-zinc-400 mb-4">还没有文章</p>
                  <AdminButton href="/admin/posts/new" label="写第一篇文章" />
                </>
              )}
            </div>
          ) : (
            <div className="space-y-5">
              {posts.map((post, i) => (
                <article
                  key={post.slug}
                  className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1a1a1a] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-zinc-900/50 animate-fadeInUp"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <Link href={`/posts/${post.slug}`} className="block">
                    <h2 className="text-base font-semibold leading-relaxed group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                      {post.metadata.title}
                    </h2>
                    <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                      {post.metadata.excerpt}
                    </p>
                  </Link>
                  <div className="mt-3 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                      <span>{relativeTime(post.metadata.date)}</span>
                      {post.metadata.tags?.slice(0, 2).map((tag) => (
                        <TagBadge key={tag} tag={tag} />
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <PostViews slug={post.slug} />
                      <AdminBar editSlug={post.slug} deleteSlug={post.slug} />
                    </div>
                  </div>
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
