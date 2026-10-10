import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AdSlot } from "@/components/monetization/AdSlot";
import { AffiliateBox } from "@/components/monetization/AffiliateBox";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
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

  return {
    title: `${post.title} | USA Sevens Stats`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["USA Sevens Stats Editorial"],
      url: `/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Schema.org Article JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "USA Sevens Stats Editorial",
      url: "https://usa-sevens-stats.vercel.app",
    },
    publisher: {
      "@type": "Organization",
      name: "USA Sevens Stats",
      logo: {
        "@type": "ImageObject",
        url: "https://usa-sevens-stats.vercel.app/icon.png",
      },
    },
    keywords: post.tags.join(", "),
  };

  // Convert simple markdown headings and lines to clean styled elements
  const renderMarkdownContent = (raw: string) => {
    const lines = raw.split("\n");
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("# ")) {
        if (inList) {
          elements.push(<ul key={`ul-${idx}`} className="list-disc list-inside space-y-1.5 my-4 text-muted-foreground">{listItems}</ul>);
          inList = false;
          listItems = [];
        }
        elements.push(
          <h1 key={idx} className="text-2xl sm:text-3xl font-black text-foreground mt-8 mb-4 tracking-tight">
            {trimmed.replace("# ", "")}
          </h1>
        );
      } else if (trimmed.startsWith("## ")) {
        if (inList) {
          elements.push(<ul key={`ul-${idx}`} className="list-disc list-inside space-y-1.5 my-4 text-muted-foreground">{listItems}</ul>);
          inList = false;
          listItems = [];
        }
        elements.push(
          <h2 key={idx} className="text-xl sm:text-2xl font-bold text-foreground mt-7 mb-3 tracking-tight">
            {trimmed.replace("## ", "")}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        if (inList) {
          elements.push(<ul key={`ul-${idx}`} className="list-disc list-inside space-y-1.5 my-4 text-muted-foreground">{listItems}</ul>);
          inList = false;
          listItems = [];
        }
        elements.push(
          <h3 key={idx} className="text-lg font-bold text-foreground mt-5 mb-2">
            {trimmed.replace("### ", "")}
          </h3>
        );
      } else if (trimmed.startsWith("> ")) {
        if (inList) {
          elements.push(<ul key={`ul-${idx}`} className="list-disc list-inside space-y-1.5 my-4 text-muted-foreground">{listItems}</ul>);
          inList = false;
          listItems = [];
        }
        elements.push(
          <blockquote key={idx} className="border-l-4 border-emerald-600 pl-4 py-2 italic my-6 text-foreground/90 bg-emerald-950/10 dark:bg-emerald-900/20 rounded-r-xl">
            {trimmed.replace("> ", "")}
          </blockquote>
        );
      } else if (trimmed.startsWith("- ")) {
        inList = true;
        const itemText = trimmed.replace("- ", "");
        listItems.push(
          <li key={idx} className="leading-relaxed">
            {itemText}
          </li>
        );
      } else if (trimmed.length > 0) {
        if (inList) {
          elements.push(<ul key={`ul-${idx}`} className="list-disc list-inside space-y-1.5 my-4 text-muted-foreground">{listItems}</ul>);
          inList = false;
          listItems = [];
        }
        elements.push(
          <p key={idx} className="text-sm sm:text-base text-muted-foreground leading-relaxed my-3">
            {trimmed}
          </p>
        );
      }
    });

    if (inList && listItems.length > 0) {
      elements.push(<ul key="ul-last" className="list-disc list-inside space-y-1.5 my-4 text-muted-foreground">{listItems}</ul>);
    }

    return elements;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Articles", href: "/blog" },
          { label: post.title },
        ]}
      />

      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground"
            >
              <Tag className="w-2.5 h-2.5" />
              <span>{t}</span>
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {post.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-border text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <time dateTime={post.date}>{post.date}</time>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>{post.readingTime}</span>
            </span>
          </div>
          <span className="font-semibold text-foreground">
            By USA Sevens Editorial
          </span>
        </div>
      </header>

      {/* Top Ad Slot */}
      <AdSlot id="article-top-ad" format="horizontal" label="Article Partner" />

      {/* Post Content */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-xs prose dark:prose-invert max-w-none">
        {renderMarkdownContent(post.content)}
      </div>

      {/* Middle Ad slot */}
      <AdSlot id="article-mid-ad" format="in-feed" label="Sponsored Resource" />

      {/* Affiliate Box */}
      <AffiliateBox title="Recommended Rugby Training Equipment" />

      {/* Newsletter callout */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-950/20 via-card to-card border border-border text-center space-y-3">
        <h3 className="font-bold text-lg text-foreground">
          Enjoyed this rugby sevens analysis?
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
          Subscribe for tactical features, Olympic team retrospectives, and tournament rosters.
        </p>
        <div className="max-w-md mx-auto pt-2">
          <NewsletterForm />
        </div>
      </div>

      {/* Back button */}
      <div className="pt-4 border-t border-border">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all articles</span>
        </Link>
      </div>
    </div>
  );
}
