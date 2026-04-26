import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getProfile } from "@/lib/profile";
import PostViews from "@/components/PostViews";
import AdminBar from "@/components/AdminBar";
import AdminButton from "@/components/AdminButton";
import TagBadge from "@/components/TagBadge";

export default function Home() {
  const posts = getAllPosts();
  const profile = getProfile();

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
    <div className="mx-auto max-w-2xl px-4 py-16">
      {/* profile */}
      <section className="mb-16 flex items-center gap-5">
        <a
          href="https://github.com/Xuhang404"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            className="size-14 rounded-full"
          />
        </a>
        <div className="min-w-0">
          <h1 className="text-xl font-bold">{profile.name}</h1>
          {profile.bio && (
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-500">
              {profile.bio}
            </p>
          )}
          <div className="mt-2 flex gap-2">
            <AdminButton href="/admin/profile" label="编辑资料" />
            <AdminButton href="/admin" label="管理" />
          </div>
        </div>
      </section>

      {/* posts */}
      <div className="space-y-6">
        {posts.length === 0 && (
          <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 py-16 text-center">
            <p className="text-sm text-zinc-400 mb-4">还没有文章</p>
            <AdminButton href="/admin/posts/new" label="写第一篇文章" />
          </div>
        )}
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1a1a1a] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-zinc-900/50"
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
    </div>
  );
}
