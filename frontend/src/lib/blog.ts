import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "./types";

function getBlogDir(): string {
  const directPath = path.join(process.cwd(), "content", "blog");
  if (fs.existsSync(directPath)) return directPath;
  const frontendPath = path.join(process.cwd(), "frontend", "content", "blog");
  if (fs.existsSync(frontendPath)) return frontendPath;
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

    const defaultBingMap: Record<string, string> = {
      "womens-svns-dominance-tapper-kelter": "https://tse1.mm.bing.net/th?q=USA%20Womens%20Rugby%20Sevens%20Alev%20Kelter&w=800&h=500&c=7&rs=1&p=0",
      "perry-baker-carlin-isles-speed-dynasty": "https://tse1.mm.bing.net/th?q=Perry%20Baker%20Carlin%20Isles%20USA%20Rugby&w=800&h=500&c=7&rs=1&p=0",
      "rise-of-womens-eagles-sevens": "https://tse1.mm.bing.net/th?q=USA%20Womens%20Eagles%20Sevens%20Rugby&w=800&h=500&c=7&rs=1&p=0",
      "sevens-vs-fifteens-tactical-breakdown": "https://tse1.mm.bing.net/th?q=Rugby%20Sevens%20vs%20Fifteens%20Match&w=800&h=500&c=7&rs=1&p=0",
      "world-rugby-svns-2026-calendar-guide": "https://tse1.mm.bing.net/th?q=World%20Rugby%20SVNS%20Series%20Tournament&w=800&h=500&c=7&rs=1&p=0",
      "top-college-rugby-programs-usa": "https://tse1.mm.bing.net/th?q=College%20Rugby%20Championship%20USA&w=800&h=500&c=7&rs=1&p=0",
      "road-to-la-2028-olympic-rugby": "https://tse1.mm.bing.net/th?q=USA%20Rugby%20Sevens%20Olympic%20Team&w=800&h=500&c=7&rs=1&p=0",
    };

    const cleanTitle = (data.title || slug).replace(/[^\w\s]/gi, "").trim();
    const dynamicBingUrl = `https://tse1.mm.bing.net/th?q=${encodeURIComponent(cleanTitle + " USA Rugby")}&w=800&h=500&c=7&rs=1&p=0`;

    const image =
      data.image && (data.image.startsWith("http://") || data.image.startsWith("https://"))
        ? data.image
        : defaultBingMap[slug] || dynamicBingUrl;

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
