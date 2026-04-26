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
    <div className="flex flex-wrap gap-1.5">
      <Link
        href="/"
        className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-all duration-300 ${
          !activeTag
            ? "bg-accent text-white shadow-sm shadow-accent/30"
            : "bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-400 hover:bg-warm-200 dark:hover:bg-warm-700"
        }`}
      >
        全部
      </Link>
      {tags.map(([tag, count]) => {
        const ratio = count / maxCount;
        const size =
          ratio >= 0.8 ? "text-xs" : ratio >= 0.4 ? "text-[11px]" : "text-[10px]";
        const active = activeTag === tag;
        return (
          <Link
            key={tag}
            href={`/?tag=${encodeURIComponent(tag)}`}
            className={`${size} rounded-full px-2.5 py-1 font-medium transition-all duration-300 ${
              active
                ? "bg-accent text-white shadow-sm shadow-accent/30"
                : "bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-400 hover:bg-warm-200 dark:hover:bg-warm-700 hover:text-accent dark:hover:text-accent"
            }`}
          >
            {tag}
          </Link>
        );
      })}
    </div>
  );
}
