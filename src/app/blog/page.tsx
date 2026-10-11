import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AdSlot } from "@/components/monetization/AdSlot";
import { AffiliateBox } from "@/components/monetization/AffiliateBox";
import { BookOpen, Calendar, Clock, ArrowRight, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "USA Rugby Sevens Blog & Journal | Stories, Strategy & Analysis",
  description:
    "The premier independent publication covering USA Men's and Women's Rugby Sevens: tournament debriefs, Olympic qualification, athlete interviews, and collegiate pathways.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "USA Rugby Sevens Blog & Journal",
    description:
      "Deep tactical debriefs, player features, and Olympic coverage of USA Rugby Sevens.",
  },
};

interface BlogIndexPageProps {
  searchParams: Promise<{ category?: string | string[] }>;
}

export default async function BlogIndexPage({
  searchParams,
}: BlogIndexPageProps) {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const { category: categoryParam } = await searchParams;
  const requestedCategory = Array.isArray(categoryParam)
    ? categoryParam[0]
    : categoryParam;
  const selectedCategory = categories.includes(requestedCategory || "")
    ? requestedCategory
    : undefined;
  const visiblePosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;
  const featured = selectedCategory ? undefined : visiblePosts[0];
  const remaining = selectedCategory ? visiblePosts : visiblePosts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs items={[{ label: "Blog & Editorial" }]} />

      {/* Hero Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-900/10 text-blue-800 dark:bg-blue-600/20 dark:text-blue-300 border border-blue-900/20 dark:border-blue-500/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>The American Sevens Dispatch</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
          Rugby Sevens Editorial & Analysis
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          From technical restart breakdowns and physiological analysis to Olympic squad journeys and collegiate scouting reports.
        </p>
      </div>

      {/* Category Pills Bar */}
      <nav
        aria-label="Filter articles by category"
        className="flex flex-wrap items-center gap-2 pb-2 border-b border-border"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-2">
          Categories:
        </span>
        <Link
          href="/blog"
          aria-current={!selectedCategory ? "page" : undefined}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
            !selectedCategory
              ? "bg-blue-700 text-white dark:bg-blue-600"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          }`}
        >
          All Stories ({posts.length})
        </Link>
        {categories.map((cat) => {
          const count = posts.filter((p) => p.category === cat).length;
          return (
            <Link
              key={cat}
              href={`/blog?category=${encodeURIComponent(cat)}`}
              aria-current={selectedCategory === cat ? "page" : undefined}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                selectedCategory === cat
                  ? "bg-blue-700 text-white dark:bg-blue-600"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {cat} ({count})
            </Link>
          );
        })}
      </nav>

      {/* Lead Feature Story */}
      {featured && (
        <article className="rounded-3xl border border-border bg-gradient-to-br from-blue-950/10 via-card to-card p-6 sm:p-10 shadow-md hover:border-blue-600/50 transition-all group overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Featured Image */}
            {featured.image && (
              <div className="lg:col-span-6 relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-border shadow-xs bg-muted">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt || featured.title}
                  fill
                  preload
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 550px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
                  {featured.category}
                </div>
              </div>
            )}

            {/* Content Details */}
            <div className={featured.image ? "lg:col-span-6 space-y-4" : "lg:col-span-12 space-y-4"}>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="font-extrabold text-xs uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-700 text-white dark:bg-blue-600">
                  {featured.category}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                  <Flame className="w-3.5 h-3.5" /> Cover Story
                </span>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <time dateTime={featured.date}>{featured.date}</time>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>{featured.readingTime}</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors leading-tight">
                <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                {featured.description}
              </p>

              <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-muted-foreground">
                  Written by <strong className="text-foreground">{featured.author.name}</strong> • {featured.author.role}
                </div>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm text-blue-700 dark:text-blue-400 group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </article>
      )}

      <AdSlot id="blog-index-mid" format="horizontal" label="Editorial Sponsor" />

      {/* Grid of Remaining Articles */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">
          {selectedCategory
            ? `${selectedCategory} Articles (${visiblePosts.length})`
            : "All Articles"}
        </h2>
        {remaining.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remaining.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card overflow-hidden hover:border-blue-600/60 hover:shadow-lg transition-all group"
              >
                <div>
                  {post.image && (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="relative block w-full aspect-[16/10] overflow-hidden bg-muted border-b border-border/60"
                    >
                      <Image
                        src={post.image}
                        alt={post.imageAlt || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </Link>
                  )}

                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span className="font-bold text-blue-700 dark:text-blue-400 uppercase text-[11px]">
                        {post.category}
                      </span>
                      <span>{post.readingTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-border flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Calendar className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-bold text-blue-700 dark:text-blue-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
            No articles are available in this category yet.
          </p>
        )}
      </div>

      <AffiliateBox />
    </div>
  );
}
