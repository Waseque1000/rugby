import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BlogImage } from "@/components/blog/BlogImage";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getPlayerBySlug } from "@/lib/players";
import { PlayerCard } from "@/components/players/PlayerCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AdSlot } from "@/components/monetization/AdSlot";
import { AffiliateBox } from "@/components/monetization/AffiliateBox";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { SITE_URL, serializeJsonLd } from "@/lib/site";
import {
  Calendar,
  Clock,
  Tag,
  ArrowLeft,
  User,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function renderInlineMarkdown(text: string, keyPrefix: string): React.ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);

  return tokens.map((token, index) => {
    const key = `${keyPrefix}-${index}`;

    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={key}>{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith("`") && token.endsWith("`")) {
      return (
        <code key={key} className="rounded bg-secondary px-1.5 py-0.5 text-[0.9em]">
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.startsWith("*") && token.endsWith("*")) {
      return <em key={key}>{token.slice(1, -1)}</em>;
    }
    return token;
  });
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const images = post.image ? [{ url: post.image, alt: post.imageAlt }] : ["/opengraph-image"];

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    keywords: [...post.tags, "USA Rugby Sevens", "World Rugby", "Eagles"],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      url: `/blog/${post.slug}`,
      siteName: "USA Sevens Stats & Journal",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Cross-linked players mentioned in this article
  const mentionedPlayers = (post.relatedPlayerSlugs || [])
    .map((s) => getPlayerBySlug(s))
    .filter(Boolean);

  // Other related posts
  const allPosts = getAllPosts();
  const relatedBySlug = (post.relatedPostSlugs || [])
    .map((relatedSlug) => allPosts.find((candidate) => candidate.slug === relatedSlug))
    .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate));
  const otherPosts = (relatedBySlug.length
    ? relatedBySlug
    : allPosts.filter((candidate) => candidate.slug !== post.slug && candidate.category === post.category).slice(0, 2)
  ).slice(0, 3);

  // Schema.org BlogPosting JSON-LD
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "USA Sevens Stats",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon`,
      },
    },
    image: post.image?.startsWith("http")
      ? post.image
      : post.image
      ? `${SITE_URL}${post.image}`
      : undefined,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    citation: post.sources.map((source) => source.url),
  };

  // Convert markdown content to styled semantic HTML elements
  const renderMarkdownContent = (raw: string) => {
    const lines = raw.split("\n");
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("# ")) {
        if (inList) {
          elements.push(
            <ul key={`ul-${idx}`} className="list-disc list-inside space-y-2 my-4 text-muted-foreground">
              {listItems}
            </ul>
          );
          inList = false;
          listItems = [];
        }
        elements.push(
          <h2 key={idx} className="text-2xl sm:text-3xl font-black text-foreground mt-8 mb-4 tracking-tight">
            {renderInlineMarkdown(trimmed.replace("# ", ""), `h2-${idx}`)}
          </h2>
        );
      } else if (trimmed.startsWith("## ")) {
        if (inList) {
          elements.push(
            <ul key={`ul-${idx}`} className="list-disc list-inside space-y-2 my-4 text-muted-foreground">
              {listItems}
            </ul>
          );
          inList = false;
          listItems = [];
        }
        elements.push(
          <h2 key={idx} className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-3 tracking-tight border-b border-border/50 pb-2">
            {renderInlineMarkdown(trimmed.replace("## ", ""), `h2-${idx}`)}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        if (inList) {
          elements.push(
            <ul key={`ul-${idx}`} className="list-disc list-inside space-y-2 my-4 text-muted-foreground">
              {listItems}
            </ul>
          );
          inList = false;
          listItems = [];
        }
        elements.push(
          <h3 key={idx} className="text-lg font-bold text-foreground mt-6 mb-2">
            {renderInlineMarkdown(trimmed.replace("### ", ""), `h3-${idx}`)}
          </h3>
        );
      } else if (trimmed.startsWith("> ")) {
        if (inList) {
          elements.push(
            <ul key={`ul-${idx}`} className="list-disc list-inside space-y-2 my-4 text-muted-foreground">
              {listItems}
            </ul>
          );
          inList = false;
          listItems = [];
        }
        elements.push(
          <blockquote key={idx} className="border-l-4 border-blue-600 pl-4 py-2 italic my-6 text-foreground/95 bg-blue-950/10 dark:bg-blue-900/20 rounded-r-xl leading-relaxed">
            {renderInlineMarkdown(trimmed.replace("> ", ""), `quote-${idx}`)}
          </blockquote>
        );
      } else if (trimmed.startsWith("- ")) {
        inList = true;
        const itemText = trimmed.replace("- ", "");
        listItems.push(
          <li key={idx} className="leading-relaxed">
            {renderInlineMarkdown(itemText, `li-${idx}`)}
          </li>
        );
      } else if (trimmed.length > 0) {
        if (inList) {
          elements.push(
            <ul key={`ul-${idx}`} className="list-disc list-inside space-y-2 my-4 text-muted-foreground">
              {listItems}
            </ul>
          );
          inList = false;
          listItems = [];
        }
        elements.push(
          <p key={idx} className="text-base sm:text-lg text-muted-foreground leading-relaxed my-4">
            {renderInlineMarkdown(trimmed, `p-${idx}`)}
          </p>
        );
      }
    });

    if (inList && listItems.length > 0) {
      elements.push(
        <ul key="ul-last" className="list-disc list-inside space-y-2 my-4 text-muted-foreground">
          {listItems}
        </ul>
      );
    }

    return elements;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogPostingJsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-700 text-white dark:bg-blue-600">
            {post.category}
          </span>
          {post.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground"
            >
              <Tag className="w-2.5 h-2.5" />
              <span>{t}</span>
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-[1.15]">
          {post.title}
        </h1>

        <p className="text-base sm:text-xl text-muted-foreground leading-relaxed">
          {post.description}
        </p>

        {/* Byline & Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-900/15 text-blue-800 dark:text-blue-300 font-black text-sm flex items-center justify-center">
              {post.author.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="font-bold text-sm text-foreground">
                {post.author.name}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {post.author.role}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <time dateTime={post.date}>{post.date}</time>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{post.readingTime}</span>
            </span>
          </div>
        </div>
      </header>

      {/* Featured Article Image */}
      {post.image && (
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden border border-border shadow-md my-6">
          <BlogImage
            src={post.image}
            alt={post.imageAlt || post.title}
            fill
            preload
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      )}

      {/* Top Ad Slot */}
      <AdSlot id="article-top-ad" format="horizontal" label="Article Partner" />

      {/* Main Post Content */}
      <article className="bg-card border border-border rounded-3xl p-6 sm:p-12 shadow-xs prose dark:prose-invert max-w-none">
        {renderMarkdownContent(post.content)}
      </article>

      {post.sources.length > 0 && (
        <section aria-labelledby="article-sources-heading" className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 id="article-sources-heading" className="text-lg font-bold text-foreground">Sources & Further Reading</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {post.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900">
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* In-content Mid Ad slot */}
      <AdSlot id="article-mid-ad" format="in-feed" label="Sponsored Resource" />

      {/* Cross-Linked Player Dossiers (if article references specific players) */}
      {mentionedPlayers.length > 0 && (
        <section className="space-y-4 rounded-3xl border border-blue-900/30 bg-blue-950/5 dark:bg-blue-900/10 p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-lg text-foreground">
              Players Spotlighted in this Article
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Explore their verified caps, collegiate records, and Olympic milestones from our database:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {mentionedPlayers.map((p) => (
              p && <PlayerCard key={p.id} player={p} />
            ))}
          </div>
        </section>
      )}

      {/* Author Bio Card */}
      <div className="p-6 rounded-2xl bg-secondary/70 border border-border flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white dark:bg-blue-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
          <User className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-sm text-foreground">
            About {post.author.name}
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {post.author.bio ||
              `${post.author.name} is a specialist contributor for USA Sevens Stats, covering World Rugby SVNS tournaments, athlete development pathways, and Olympic preparation.`}
          </p>
        </div>
      </div>

      {/* Gear Recommendations */}
      <AffiliateBox title="Recommended Training & Match Gear" />

      {/* Newsletter Signup */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-950/10 via-card to-card border border-border text-center space-y-3">
        <h3 className="font-bold text-lg text-foreground">
          Enjoyed this analysis? Join The Sevens Dispatch
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
          Weekly tactical debriefs, tournament schedules, and athlete interviews delivered to your inbox.
        </p>
        <div className="max-w-md mx-auto pt-2">
          <NewsletterForm />
        </div>
      </div>

      {/* More Articles */}
      {otherPosts.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-border">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Continue Reading</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherPosts.map((other) => (
              <Link
                key={other.slug}
                href={`/blog/${other.slug}`}
                className="p-5 rounded-2xl border border-border bg-card hover:border-blue-600/50 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-blue-700 dark:text-blue-400">
                    {other.category}
                  </span>
                  <h4 className="font-bold text-sm text-foreground group-hover:text-blue-700 dark:group-hover:text-blue-400 mt-1 line-clamp-2">
                    {other.title}
                  </h4>
                </div>
                <div className="text-[11px] text-muted-foreground mt-3 flex items-center justify-between">
                  <span>{other.readingTime}</span>
                  <span className="font-semibold text-blue-700 dark:text-blue-400">
                    Read &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>
      </div>
    </div>
  );
}
