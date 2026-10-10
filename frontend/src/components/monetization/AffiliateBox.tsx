import React from "react";
import Link from "next/link";
import { ShoppingBag, ArrowUpRight, Award } from "lucide-react";

interface GearItem {
  title: string;
  category: string;
  description: string;
  affiliateUrl: string;
  badge?: string;
  priceEstimate?: string;
}

const DEFAULT_GEAR: GearItem[] = [
  {
    title: "Gilbert Match-Grade Rugby Sevens Ball",
    category: "Official Equipment",
    description: "Multi-matrix grip surface engineered specifically for explosive handling and high-speed sevens play.",
    affiliateUrl: "https://example.com/gear/gilbert-sevens-ball",
    badge: "Official Spec",
    priceEstimate: "$59.99",
  },
  {
    title: "Elite Pro Compression Speed Shorts",
    category: "Apparel & Recovery",
    description: "Targeted quad stabilization and moisture dispersion built for high-intensity sprint repeats.",
    affiliateUrl: "https://example.com/gear/compression-speed-shorts",
    badge: "Athlete Favorite",
    priceEstimate: "$44.95",
  },
  {
    title: "Lightweight High-Traction Rugby Cleats",
    category: "Footwear",
    description: "Designed for acceleration, quick cuts on turf and firm ground surfaces, with reinforced heel cup.",
    affiliateUrl: "https://example.com/gear/speed-cleats",
    badge: "Top Rated",
    priceEstimate: "$119.00",
  },
];

interface AffiliateBoxProps {
  title?: string;
  items?: GearItem[];
  className?: string;
}

export function AffiliateBox({
  title = "Recommended Rugby Sevens Gear",
  items = DEFAULT_GEAR,
  className = "",
}: AffiliateBoxProps) {
  return (
    <div
      className={`bg-gradient-to-br from-blue-950/10 via-card to-slate-950/10 border border-blue-900/30 dark:border-blue-700/30 rounded-2xl p-6 shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-700 text-white dark:bg-blue-600">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground tracking-tight">{title}</h3>
            <p className="text-xs text-muted-foreground">Handpicked gear for training, fitness, and game day</p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/60 px-2.5 py-1 rounded-full">
          <Award className="w-3.5 h-3.5" /> Curated
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-4 rounded-xl bg-card border border-border hover:border-blue-500/50 hover:shadow-md transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                  {item.category}
                </span>
                {item.priceEstimate && (
                  <span className="text-xs font-bold text-foreground">{item.priceEstimate}</span>
                )}
              </div>
              <h4 className="font-semibold text-sm text-foreground mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
              {item.badge && (
                <span className="text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded font-medium">
                  {item.badge}
                </span>
              )}
              <Link
                href={item.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline ml-auto"
              >
                View Gear <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-[11px] text-muted-foreground text-center pt-2">
        We may earn a small referral commission at no additional cost to you when purchasing through our curated links.
      </div>
    </div>
  );
}
