import React from "react";
import type { Metadata } from "next";
import { getAllPlayers, getUniqueFilterOptions } from "@/lib/players";
import { PlayersFilter } from "@/components/players/PlayersFilter";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AdSlot } from "@/components/monetization/AdSlot";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "USA Rugby Sevens Players Directory | Roster & Stats",
  description:
    "Search and filter the complete database of USA Men's and Women's National Rugby Sevens players by position, college, hometown state, and Olympic appearances.",
  openGraph: {
    title: "USA Rugby Sevens Players Directory",
    description:
      "Explore verified profiles of USA Men's and Women's Rugby Sevens players, Olympians, and collegiate standouts.",
  },
};

export default function PlayersDirectoryPage() {
  const players = getAllPlayers();
  const filterOptions = getUniqueFilterOptions();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Players Directory" }]} />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
          <Shield className="w-3.5 h-3.5" />
          <span>National Player Pool</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
          USA Rugby Sevens Players Directory
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
          Filter and sort through official USA Men&apos;s and Women&apos;s Sevens athletes. Every record reflects verified documentation from Olympic rosters, official team profiles, and World Rugby tournament summaries.
        </p>
      </div>

      {/* Ad slot */}
      <AdSlot id="players-dir-top" format="horizontal" label="Directory Partner" />

      {/* Client-side filterable & searchable grid */}
      <PlayersFilter initialPlayers={players} filterOptions={filterOptions} />
    </div>
  );
}
