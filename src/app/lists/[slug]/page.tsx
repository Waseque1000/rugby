import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllLists, getListBySlug } from "@/lib/players";
import { PlayerCard } from "@/components/players/PlayerCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AdSlot } from "@/components/monetization/AdSlot";
import { AffiliateBox } from "@/components/monetization/AffiliateBox";
import { Trophy, Users, GraduationCap } from "lucide-react";

interface ListPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const lists = getAllLists();
  return lists.map((list) => ({
    slug: list.slug,
  }));
}

export async function generateMetadata({
  params,
}: ListPageProps): Promise<Metadata> {
  const { slug } = await params;
  const list = getListBySlug(slug);

  if (!list) {
    return {
      title: "List Not Found",
    };
  }

  return {
    title: `${list.title} | USA Rugby Sevens Stats`,
    description: list.description,
    openGraph: {
      title: `${list.title} | USA Rugby Sevens Roster`,
      description: list.description,
      url: `/lists/${list.slug}`,
    },
  };
}

export default async function ListDetailsPage({ params }: ListPageProps) {
  const { slug } = await params;
  const list = getListBySlug(slug);

  if (!list) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Curated Lists", href: "/lists" },
          { label: list.title },
        ]}
      />

      {/* Header Banner */}
      <div className="rounded-3xl border border-border bg-gradient-to-br from-emerald-950/25 via-card to-card p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
              <Trophy className="w-3.5 h-3.5" />
              <span>{list.badge}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground px-3 py-1 rounded-full bg-secondary">
              <Users className="w-3.5 h-3.5" />
              <span>{list.players.length} Athletes Listed</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
            {list.title}
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {list.description}
          </p>
        </div>
      </div>

      <AdSlot id="list-details-top" format="horizontal" label="List Sponsor" />

      {/* Roster display */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {list.players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>

      {/* Recommended gear */}
      <AffiliateBox />
    </div>
  );
}
