import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "./types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllPosts(): BlogPost[] {
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

    const defaultImageMap: Record<string, string> = {
      "womens-svns-dominance-tapper-kelter": "/images/blog/womens-svns-dominance.jpg",
      "perry-baker-carlin-isles-speed-dynasty": "/images/blog/perry-baker-carlin-isles.jpg",
      "rise-of-womens-eagles-sevens": "/images/blog/rise-of-womens-eagles.jpg",
      "sevens-vs-fifteens-tactical-breakdown": "/images/blog/sevens-vs-fifteens.jpg",
      "world-rugby-svns-2026-calendar-guide": "/images/blog/world-rugby-svns-guide.jpg",
      "top-college-rugby-programs-usa": "/images/blog/college-rugby-pathway.jpg",
      "road-to-la-2028-olympic-rugby": "/images/blog/road-to-la-2028.jpg",
    };

    const image = data.image || defaultImageMap[slug] || "/images/blog/womens-svns-dominance.jpg";

    return {
      slug,
      title: data.title || "Untitled Post",
      date: data.date || "2026-10-10",
      category: data.category || "Tactics & History",
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
