import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "XuHang's Blog",
  description: "个人博客，记录技术与生活",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'light' || (!theme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                  document.documentElement.classList.remove('dark');
                }
                window.addEventListener('pageshow', function(e) {
                  if (e.persisted) {
                    var t = localStorage.getItem('theme');
                    if (t === 'light' || (!t && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                      document.documentElement.classList.remove('dark');
                    } else {
                      document.documentElement.classList.add('dark');
                    }
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-paper text-ink-light">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
