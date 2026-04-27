export default function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs bg-frost dark:bg-[#1a1916] text-smoke dark:text-[#6b6560]">
      {tag}
    </span>
  );
}
