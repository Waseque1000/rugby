import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "./types";

function getBlogDir(): string {
  const directPath = path.join(process.cwd(), "content", "blog");
  if (fs.existsSync(directPath)) return directPath;
  return path.join(__dirname, "..", "..", "content", "blog");
}

export function getAllPosts(): BlogPost[] {
  const BLOG_DIR = getBlogDir();
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const posts: BlogPost[] = files.map((filename) => {
    const slug = filename.replace(/\.mdx?$/, "");
    const fullPath = path.join(BLOG_DIR, filename);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(fileContents);

    // Calculate reading time
    const wordCount = content.split(/\s+/).length;
    const readingTime = `${Math.ceil(wordCount / 200)} min read`;

    const image = typeof data.image === "string" && (
      data.image.startsWith("/images/") || data.image.startsWith("https://tse1.mm.bing.net/th?")
    )
      ? data.image
      : undefined;

    return {
      slug,
      title: data.title || "Untitled Post",
      date: data.date || "2026-10-10",
      category: data.category || "Uncategorized",
      featured: Boolean(data.featured),
      author: {
        name: data.author?.name || "USA Sevens Editorial",
        role: data.author?.role || "Rugby Analyst & Historian",
        bio: data.author?.bio,
      },
      description: data.description || "",
      image,
      imageAlt: data.imageAlt || data.title || "USA Rugby Sevens action",
      tags: Array.isArray(data.tags) ? data.tags : [],
      readingTime,
      content,
      relatedPlayerSlugs: Array.isArray(data.relatedPlayerSlugs)
        ? data.relatedPlayerSlugs
        : [],
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export function getFeaturedPost(): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.featured) || posts[0];
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((p) => p.category)));
  return categories.sort();
}

export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}
