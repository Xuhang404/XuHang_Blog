import { notFound } from "next/navigation";
import PostEditor from "@/components/PostEditor";
import { getPost } from "@/lib/posts";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <PostEditor
        initialSlug={post.slug}
        initialTitle={post.metadata.title}
        initialDate={post.metadata.date}
        initialExcerpt={post.metadata.excerpt}
        initialTags={post.metadata.tags.join(", ")}
        initialContent={post.content}
        isEditing
      />
    </div>
  );
}
