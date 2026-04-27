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
        className={`rounded-full px-2.5 py-1 text-[11px] transition-all duration-200 ${
          !activeTag
            ? "bg-ink dark:bg-[#f0eee8] text-paper dark:text-[#0f0f0e]"
            : "text-smoke dark:text-[#6b6560] hover:text-vermillion dark:hover:text-vermillion-light hover:bg-frost dark:hover:bg-[#1a1916]"
        }`}
      >
        全部
      </Link>
      {tags.map(([tag, count]) => {
        const ratio = count / maxCount;
        const size =
          ratio >= 0.8
            ? "text-xs"
            : ratio >= 0.4
              ? "text-[11px]"
              : "text-[10px]";
        const active = activeTag === tag;
        return (
          <Link
            key={tag}
            href={`/?tag=${encodeURIComponent(tag)}`}
            className={`${size} rounded-full px-2.5 py-1 transition-all duration-200 ${
              active
                ? "bg-vermillion text-white"
                : "text-smoke dark:text-[#6b6560] hover:text-vermillion dark:hover:text-vermillion-light hover:bg-frost dark:hover:bg-[#1a1916]"
            }`}
          >
            {tag}
          </Link>
        );
      })}
    </div>
  );
}
