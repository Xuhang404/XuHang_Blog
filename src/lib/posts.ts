import matter from "gray-matter";
import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type PostMetadata = {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
};

export type Post = {
  slug: string;
  metadata: PostMetadata;
  content: string;
};

export function getAllPosts(): (Omit<Post, "content"> & { readingTime: number })[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fn) => fn.endsWith(".md"))
    .map((fn) => {
      const slug = fn.replace(/\.md$/, "");
      const source = fs.readFileSync(path.join(postsDirectory, fn), "utf-8");
      const { data, content } = matter(source);
      const charCount = content.replace(/\s/g, "").length;
      return {
        slug,
        metadata: data as PostMetadata,
        readingTime: Math.max(1, Math.ceil(charCount / 350)),
      };
    })
    .sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );
}

export function getPost(slug: string): Post | null {
  try {
    const source = fs.readFileSync(
      path.join(postsDirectory, `${slug}.md`),
      "utf-8"
    );
    const { data, content } = matter(source);
    return { slug, metadata: data as PostMetadata, content };
  } catch {
    return null;
  }
}

export type PostInput = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
};

export function createPost(input: PostInput): Post | null {
  const filePath = path.join(postsDirectory, `${input.slug}.md`);
  if (fs.existsSync(filePath)) return null;

  const frontmatter = matter.stringify(input.content, {
    title: input.title,
    date: input.date,
    excerpt: input.excerpt,
    tags: input.tags,
  });
  fs.writeFileSync(filePath, frontmatter, "utf-8");
  return { slug: input.slug, metadata: input, content: input.content };
}

export function updatePost(slug: string, input: Partial<PostInput>): Post | null {
  const existing = getPost(slug);
  if (!existing) return null;

  const merged = {
    slug: input.slug ?? slug,
    title: input.title ?? existing.metadata.title,
    date: input.date ?? existing.metadata.date,
    excerpt: input.excerpt ?? existing.metadata.excerpt,
    tags: input.tags ?? existing.metadata.tags,
    content: input.content ?? existing.content,
  };

  const oldPath = path.join(postsDirectory, `${slug}.md`);
  const newPath = path.join(postsDirectory, `${merged.slug}.md`);

  const frontmatter = matter.stringify(merged.content, {
    title: merged.title,
    date: merged.date,
    excerpt: merged.excerpt,
    tags: merged.tags,
  });
  fs.writeFileSync(newPath, frontmatter, "utf-8");
  if (oldPath !== newPath) fs.unlinkSync(oldPath);
  return { slug: merged.slug, metadata: merged, content: merged.content };
}

export function deletePost(slug: string): boolean {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return false;
  fs.unlinkSync(filePath);
  return true;
}
