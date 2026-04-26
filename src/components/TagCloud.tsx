import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function TagCloud({ activeTag }: { activeTag?: string }) {
  const posts = getAllPosts();
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.metadata.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  if (counts.size === 0) return null;

  const maxCount = Math.max(...counts.values());
  const tags = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/"
        className={`rounded-full px-2.5 py-1 text-[11px] transition-all ${
          !activeTag
            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-medium"
            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
        }`}
      >
        全部
      </Link>
      {tags.map(([tag, count]) => {
        const ratio = count / maxCount;
        const size =
          ratio >= 0.8 ? "text-sm" : ratio >= 0.4 ? "text-xs" : "text-[11px]";
        const active = activeTag === tag;
        return (
          <Link
            key={tag}
            href={`/?tag=${encodeURIComponent(tag)}`}
            className={`${size} rounded-full px-2.5 py-1 transition-all ${
              active
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-medium"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            {tag}
          </Link>
        );
      })}
    </div>
  );
}
