"use client";

import { useEffect, useState } from "react";

type Props = {
  slug: string;
  count?: boolean; // true = increment view on mount (for detail page)
};

export default function PostViews({ slug, count }: Props) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const method = count ? "POST" : "GET";
    fetch(`/api/views/${slug}`, { method })
      .then((res) => res.json())
      .then((data) => setViews(data.views))
      .catch(() => {});
  }, [slug, count]);

  if (views === null) return null;

  return <span className="text-xs text-zinc-400">{views} 次阅读</span>;
}
