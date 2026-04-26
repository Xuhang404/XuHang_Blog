"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 flex size-10 items-center justify-center rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 shadow-sm transition-all hover:shadow-md"
      aria-label="回到顶部"
    >
      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
