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
      <p className="mb-4 text-[10px] uppercase tracking-[0.15em] text-smoke/60 dark:text-[#6b6560]/60">
        目录
      </p>
      <ul className="space-y-1.5 border-l border-divider dark:border-[#2a2822]">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block transition-all duration-200 ${
                h.level === 3 ? "pl-6" : "pl-4"
              } py-0.5 text-xs leading-relaxed ${
                activeId === h.id
                  ? "text-vermillion border-l-2 border-vermillion -ml-[1px] font-medium"
                  : "text-smoke dark:text-[#6b6560] hover:text-ink dark:hover:text-[#f0eee8]"
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
