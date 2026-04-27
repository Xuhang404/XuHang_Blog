export default function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs bg-frost text-smoke">
      {tag}
    </span>
  );
}
