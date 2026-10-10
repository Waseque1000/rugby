import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllLists } from "@/lib/players";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AdSlot } from "@/components/monetization/AdSlot";
import { Trophy, ArrowRight, Layers, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Curated Rosters & Lists | USA Rugby Sevens",
  description:
    "Explore auto-generated rosters and historical lists of USA Rugby Sevens athletes: Olympic squads, Women's and Men's Eagles rosters, and collegiate feeder directories.",
  openGraph: {
    title: "Curated Rosters & Lists | USA Rugby Sevens Stats",
    description:
      "Explore official lists: USA Sevens Olympians, collegiate pathways, and national tournament rosters.",
  },
};

export default function ListsIndexPage() {
  const lists = getAllLists();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Curated Lists" }]} />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
          <Layers className="w-3.5 h-3.5" />
          <span>Historical & Squad Records</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
          Curated USA Sevens Lists & Rosters
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
          Browse categorized rosters compiled directly from verified Olympic Games, World Rugby SVNS events, and university rugby pathways.
        </p>
      </div>

      <AdSlot id="lists-index-top" format="horizontal" label="Lists Directory Partner" />

      {/* Grid of lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lists.map((list) => (
          <Link
            key={list.slug}
            href={`/lists/${list.slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 hover:border-blue-600/50 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                  <Trophy className="w-3 h-3" />
                  <span>{list.badge}</span>
                </span>
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{list.players.length} players</span>
                </span>
              </div>

              <h2 className="text-xl font-bold text-foreground group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                {list.title}
              </h2>

              <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-3">
                {list.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-blue-700 dark:text-blue-400">
              <span>View Full Roster</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
