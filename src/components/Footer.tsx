export default function Footer() {
  return (
    <footer className="border-t border-divider mt-24">
      <div className="mx-auto max-w-6xl px-4 py-8 flex items-center justify-between text-xs text-smoke">
        <span>XuHang&apos;s Blog</span>
        <span>&copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
