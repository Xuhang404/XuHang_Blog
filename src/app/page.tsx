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
      <div className="mx-auto max-w-6xl px-4 py-16 lg:flex lg:gap-16">
        {/* 左侧 — 墨韵排版名片 */}
        <aside className="lg:w-80 lg:shrink-0">
          <div className="lg:sticky lg:top-28">
            {/* 大号衬线名字 */}
            <h1 className="font-serif-heading text-[clamp(2.5rem,5vw,4rem)] leading-none text-ink">
              {profile.name}
            </h1>
            {profile.bio && (
              <p className="mt-4 text-sm text-smoke leading-relaxed max-w-xs">
                {profile.bio}
              </p>
            )}
            <div className="mt-8 flex gap-3">
              <AdminButton href="/admin" label="管理" />
              <AdminButton href="/admin/profile" label="编辑资料" />
            </div>

            {/* 标签云 */}
            <div className="mt-12">
              <p className="text-[10px] uppercase tracking-[0.15em] text-smoke/60 mb-4">
                标签
              </p>
              <TagCloud activeTag={tag} />
            </div>
          </div>
        </aside>

        {/* 竖向分隔 */}
        <div className="hidden lg:block w-px bg-divider shrink-0" />

        {/* 右侧 — 文章列表 */}
        <div className="flex-1 min-w-0 mt-12 lg:mt-0">
          {/* 筛选提示 */}
          {tag && (
            <div className="mb-10 flex items-center gap-2 text-sm text-smoke animate-fadeIn">
              <span className="text-vermillion text-base">#</span>
              <span className="font-medium text-ink">
                {tag}
              </span>
              <span className="text-divider">/</span>
              <span>{posts.length} 篇</span>
              <Link
                href="/"
                className="ml-auto text-xs text-smoke/60 hover:text-vermillion transition-colors duration-200"
              >
                清除筛选
              </Link>
            </div>
          )}

          {posts.length === 0 ? (
            <div className="py-24 text-center animate-fadeInUp">
              {tag ? (
                <p className="text-sm text-smoke">
                  没有标签为 &ldquo;{tag}&rdquo; 的文章
                </p>
              ) : (
                <div>
                  <p className="text-sm text-smoke mb-6">
                    还没有文章
                  </p>
                  <AdminButton href="/admin/posts/new" label="写第一篇文章" />
                </div>
              )}
            </div>
          ) : (
            <div>
              {posts.map((post, i) => (
                <article
                  key={post.slug}
                  className="group border-b border-divider last:border-0 animate-fadeInUp"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <Link
                    href={`/posts/${post.slug}`}
                    className="block py-6 -mx-2 px-2 rounded-sm transition-all duration-300 hover:bg-frost hover:translate-x-1"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="font-serif-heading text-lg text-ink group-hover:text-vermillion dark:group-hover:text-vermillion-light transition-colors duration-200">
                          {post.metadata.title}
                        </h2>
                        <p className="mt-1.5 text-sm text-smoke leading-relaxed line-clamp-1">
                          {post.metadata.excerpt}
                        </p>
                      </div>
                      <div className="shrink-0 flex items-center gap-4 text-xs text-smoke/60 pt-1">
                        <time>{relativeTime(post.metadata.date)}</time>
                        <PostViews slug={post.slug} />
                        <AdminBar editSlug={post.slug} deleteSlug={post.slug} />
                      </div>
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
