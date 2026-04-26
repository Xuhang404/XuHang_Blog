"use client";

import { useEffect, useState } from "react";

type Heading = { level: number; text: string; id: string };

export default function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState("");
  const headings: Heading[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^\w一-鿿]+/g, "-");
    headings.push({ level, text, id });
  }

  if (headings.length < 2) return null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className="text-sm">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-warm-400 dark:text-warm-500">
        目录
      </h3>
      <ul className="space-y-1 border-l-2 border-warm-200 dark:border-warm-800">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block transition-all duration-300 ${
                h.level === 3 ? "pl-6" : "pl-3"
              } py-1 text-xs leading-relaxed ${
                activeId === h.id
                  ? "text-accent border-l-2 border-accent -ml-[2px] font-medium"
                  : "text-warm-400 dark:text-warm-500 hover:text-warm-600 dark:hover:text-warm-300"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
