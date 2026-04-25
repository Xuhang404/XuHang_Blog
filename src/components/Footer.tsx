export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-3xl px-4 py-8 text-center text-sm text-zinc-500">
        <p>&copy; {new Date().getFullYear()} XuHang&apos;s Blog. All rights reserved.</p>
      </div>
    </footer>
  );
}
