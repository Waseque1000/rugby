import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AdSlot } from "@/components/monetization/AdSlot";
import { BookOpen, Calendar, ArrowRight, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "USA Rugby Sevens Articles, History & Analysis",
  description:
    "In-depth analysis, player retrospectives, and tournament coverage for USA Rugby Men's and Women's National Sevens teams.",
  openGraph: {
    title: "USA Rugby Sevens Blog & Analysis",
    description:
      "Deep-dive retrospectives, Olympic journeys, and tactician insights into USA Rugby Sevens.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <Breadcrumbs items={[{ label: "Articles & Analysis" }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Rugby Sevens Editorial</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
          USA Rugby Sevens Analysis & Articles
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
          Historical features, player spotlights, Olympic debriefs, and strategic breakdowns from the USA Sevens Stats editorial archive.
        </p>
      </div>

      <AdSlot id="blog-index-top" format="horizontal" label="Editorial Sponsor" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 sm:p-7 hover:border-emerald-600/60 hover:shadow-lg transition-all group"
          >
            <div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <time dateTime={post.date}>{post.date}</time>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>

              <h2 className="text-xl font-bold text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-muted-foreground mt-3 line-clamp-3 leading-relaxed">
                {post.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary text-[10px] font-medium text-secondary-foreground"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    <span>{t}</span>
                  </span>
                ))}
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="font-semibold text-emerald-800 dark:text-emerald-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
