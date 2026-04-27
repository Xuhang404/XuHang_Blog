import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost } from "@/lib/posts";
import PostViews from "@/components/PostViews";
import AdminBar from "@/components/AdminBar";
import ReadingProgress from "@/components/ReadingProgress";
import TableOfContents from "@/components/TableOfContents";
import BackToTop from "@/components/BackToTop";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

function estimateReadingTime(content: string): number {
  const chars = content.replace(/\s/g, "").length;
  return Math.max(1, Math.ceil(chars / 350));
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w一-鿿]+/g, "-");
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(decodeURIComponent(slug));

  if (!post) notFound();

  const readingTime = estimateReadingTime(post.content);

  return (
    <>
      <ReadingProgress />
      <div className="mx-auto max-w-6xl px-4 py-16 lg:flex lg:gap-16">
        <article className="min-w-0 flex-1 max-w-3xl">
          <Link
            href="/"
            className="inline-block text-sm text-smoke/60 dark:text-[#6b6560]/60 hover:text-vermillion dark:hover:text-vermillion-light transition-colors duration-200 mb-10"
          >
            &larr; 返回首页
          </Link>

          <header className="mb-12">
            <h1 className="font-serif-heading text-[clamp(2rem,4vw,3rem)] leading-tight text-ink dark:text-[#f0eee8]">
              {post.metadata.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-smoke dark:text-[#6b6560]">
              <time>{post.metadata.date}</time>
              <span className="text-divider dark:text-[#2a2822]">&middot;</span>
              <span>{readingTime > 1 ? `${readingTime} 分钟阅读` : "不到 1 分钟"}</span>
              <span className="text-divider dark:text-[#2a2822]">&middot;</span>
              <PostViews slug={slug} count />
              <AdminBar editSlug={slug} deleteSlug={slug} />
            </div>
            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {post.metadata.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/?tag=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs bg-frost dark:bg-[#1a1916] text-smoke dark:text-[#6b6560] hover:text-vermillion dark:hover:text-vermillion-light transition-colors duration-200"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children, ...props }) => {
                  const text = String(children);
                  const id = slugify(text);
                  return (
                    <h2 id={id} {...props}>
                      {children}
                    </h2>
                  );
                },
                h3: ({ children, ...props }) => {
                  const text = String(children);
                  const id = slugify(text);
                  return (
                    <h3 id={id} {...props}>
                      {children}
                    </h3>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* 桌面端目录 */}
        <aside className="hidden lg:block lg:w-56 lg:shrink-0">
          <div className="sticky top-28">
            <TableOfContents content={post.content} />
          </div>
        </aside>
      </div>
      <BackToTop />
    </>
  );
}
