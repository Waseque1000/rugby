import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { SITE_URL, serializeJsonLd } from "@/lib/site";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
    />
    <nav aria-label="Breadcrumb" className={`text-xs text-muted-foreground my-3 ${className}`}>
      <ol className="flex items-center flex-wrap gap-1.5">
        <li className="flex items-center gap-1">
          <Link
            href="/"
            className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-foreground line-clamp-1" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
    </>
  );
}
