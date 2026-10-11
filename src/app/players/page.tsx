import React from "react";
import type { Metadata } from "next";
import { getAllPlayers, getUniqueFilterOptions } from "@/lib/players";
import { PlayersFilter } from "@/components/players/PlayersFilter";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AdSlot } from "@/components/monetization/AdSlot";
import { Shield } from "lucide-react";
import Link from "next/link";
import { SITE_URL, serializeJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "USA Rugby Sevens Players Directory | Roster & Stats",
  description:
    "Search and filter the complete database of USA Men's and Women's National Rugby Sevens players by position, college, hometown state, and Olympic appearances.",
  alternates: { canonical: "/players" },
  openGraph: {
    title: "USA Rugby Sevens Players Directory",
    description:
      "Explore verified profiles of USA Men's and Women's Rugby Sevens players, Olympians, and collegiate standouts.",
  },
};

export default function PlayersDirectoryPage() {
  const players = getAllPlayers();
  const filterOptions = getUniqueFilterOptions();
  const directoryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "USA Rugby Sevens player profiles",
    numberOfItems: players.filter((player) => player.indexable).length,
    itemListElement: players.filter((player) => player.indexable).map((player, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: player.name,
      url: `${SITE_URL}/players/${player.slug}`,
    })),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(directoryJsonLd) }} />
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Players Directory" }]} />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
          <Shield className="w-3.5 h-3.5" />
          <span>National Player Pool</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
          USA Rugby Sevens Players Directory
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
          Search the USA Men&apos;s and Women&apos;s Sevens roster by position, college, hometown state, and Olympic appearance. Player profile links are shown when the record has enough verified details; other roster entries remain listed.
        </p>
      </div>

      <Link href="/players/hubs" className="inline-flex rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-800 hover:bg-blue-100">
        Browse player hubs by Olympics, college, state, and position
      </Link>

      {/* Ad slot */}
      <AdSlot id="players-dir-top" format="horizontal" label="Directory Partner" />

      {/* Client-side filterable & searchable grid */}
      <PlayersFilter initialPlayers={players} filterOptions={filterOptions} />
    </div>
  );
}
