const schemes = [
  { bg: "bg-amber-50 dark:bg-amber-900/25", text: "text-amber-700 dark:text-amber-300" },
  { bg: "bg-emerald-50 dark:bg-emerald-900/25", text: "text-emerald-700 dark:text-emerald-300" },
  { bg: "bg-rose-50 dark:bg-rose-900/25", text: "text-rose-700 dark:text-rose-300" },
  { bg: "bg-teal-50 dark:bg-teal-900/25", text: "text-teal-700 dark:text-teal-300" },
  { bg: "bg-orange-50 dark:bg-orange-900/25", text: "text-orange-700 dark:text-orange-300" },
  { bg: "bg-stone-100 dark:bg-stone-800/30", text: "text-stone-600 dark:text-stone-300" },
];

function hashTag(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export default function TagBadge({ tag }: { tag: string }) {
  const { bg, text } = schemes[hashTag(tag) % schemes.length];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${bg} ${text}`}
    >
      {tag}
    </span>
  );
}
