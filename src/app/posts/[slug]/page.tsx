import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost } from "@/lib/posts";
import PostViews from "@/components/PostViews";
import AdminBar from "@/components/AdminBar";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          &larr; 返回首页
        </Link>
        <AdminBar editSlug={slug} deleteSlug={slug} />
      </div>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {post.metadata.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-zinc-500">
          <time>{post.metadata.date}</time>
          {post.metadata.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs"
            >
              {tag}
            </span>
          ))}
          <PostViews slug={slug} count />
        </div>
      </header>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
