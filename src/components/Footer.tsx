export default function Footer() {
  return (
    <footer className="border-t border-divider dark:border-[#2a2822] mt-24">
      <div className="mx-auto max-w-6xl px-4 py-8 flex items-center justify-between text-xs text-smoke dark:text-[#6b6560]">
        <span>XuHang&apos;s Blog</span>
        <span>&copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
