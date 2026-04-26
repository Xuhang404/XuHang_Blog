import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost } from "@/lib/posts";
import PostViews from "@/components/PostViews";
import AdminBar from "@/components/AdminBar";
import ReadingProgress from "@/components/ReadingProgress";
import TagBadge from "@/components/TagBadge";
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
      <div className="mx-auto max-w-6xl px-4 py-12 lg:flex lg:gap-12">
        <article className="min-w-0 flex-1">
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/"
              className="text-sm text-warm-400 dark:text-warm-500 hover:text-accent transition-colors duration-300"
            >
              &larr; 返回首页
            </Link>
            <AdminBar editSlug={slug} deleteSlug={slug} />
          </div>

          <header className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-warm-800 dark:text-warm-100">
              {post.metadata.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-warm-400 dark:text-warm-500">
              <time>{post.metadata.date}</time>
              <span className="text-warm-200 dark:text-warm-700">·</span>
              <span>{readingTime > 1 ? `${readingTime} 分钟阅读` : "不到 1 分钟"}</span>
              <span className="text-warm-200 dark:text-warm-700">·</span>
              <PostViews slug={slug} count />
              {post.metadata.tags?.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children, ...props }) => {
                  const text = String(children);
                  const id = slugify(text);
                  return (
                    <h2 id={id} className="group" {...props}>
                      <a href={`#${id}`} className="no-underline hover:no-underline">
                        {children}
                      </a>
                    </h2>
                  );
                },
                h3: ({ children, ...props }) => {
                  const text = String(children);
                  const id = slugify(text);
                  return (
                    <h3 id={id} className="group" {...props}>
                      <a href={`#${id}`} className="no-underline hover:no-underline">
                        {children}
                      </a>
                    </h3>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* 桌面端目录侧栏 */}
        <aside className="hidden lg:block lg:w-56 lg:shrink-0">
          <div className="sticky top-24">
            <TableOfContents content={post.content} />
          </div>
        </aside>
      </div>
      <BackToTop />
    </>
  );
}
