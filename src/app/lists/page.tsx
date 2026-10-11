import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllLists, getAllPlayers } from "@/lib/players";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AdSlot } from "@/components/monetization/AdSlot";
import { PlayerAvatar } from "@/components/players/PlayerAvatar";
import { Trophy, ArrowUpRight, Layers, Users, Sparkles, ShieldCheck } from "lucide-react";
import { serializeJsonLd, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "USA Rugby Sevens Rosters & Player Lists",
  description:
    "Explore USA Rugby Sevens player collections, including Olympic squads, Men's and Women's Eagles rosters, and collegiate pathways.",
  alternates: { canonical: "/lists" },
  openGraph: {
    title: "USA Rugby Sevens Rosters & Player Lists",
    description:
      "Browse Olympic squads, Eagles rosters, and collegiate pathways in the USA Sevens archive.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "USA Rugby Sevens Rosters & Player Lists",
    description: "Browse Olympic squads, Eagles rosters, and collegiate pathways.",
    images: ["/opengraph-image"],
  },
};

export default function ListsIndexPage() {
  const lists = getAllLists();
  const players = getAllPlayers();
  const featuredList = lists.find((list) => list.slug === "usa-olympians-in-sevens") ?? lists[0];
  const otherLists = lists.filter((list) => list.slug !== featuredList?.slug);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "USA Rugby Sevens team and Olympic rosters",
    itemListElement: lists.map((list, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: list.title,
      url: `${SITE_URL}/lists/${list.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl space-y-9 px-4 py-7 sm:space-y-12 sm:px-6 sm:py-10 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListJsonLd) }} />
      <Breadcrumbs items={[{ label: "Curated Lists" }]} />

      <header className="relative isolate overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.055)]">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-800 via-blue-500 to-orange-400" />
        <div className="pointer-events-none absolute -right-20 -top-32 -z-10 h-96 w-96 rounded-full border border-blue-100" />
        <div className="pointer-events-none absolute -right-4 -top-20 -z-10 h-64 w-64 rounded-full border border-orange-100" />
        <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_300px] lg:items-center lg:gap-12 lg:p-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-blue-800 ring-1 ring-blue-100">
              <Layers className="h-3.5 w-3.5" aria-hidden="true" /> USA Sevens archive
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
              The players and teams behind <span className="text-blue-700">USA Sevens.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Explore curated rosters, Olympic squads, and college pathways. Choose a collection to meet the athletes and follow their place in American rugby sevens.
            </p>
            <a href="#collections" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-900/15 transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2">
              Explore the collections <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <Layers className="h-4 w-4 text-blue-600" aria-hidden="true" /> Curated collections
              </div>
              <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">{lists.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <Users className="h-4 w-4 text-orange-500" aria-hidden="true" /> Athlete records
              </div>
              <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">{players.length}</p>
            </div>
            <p className="col-span-2 flex items-start gap-2 px-1 text-xs leading-5 text-slate-500 lg:col-span-1">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
              Player details are included where available and verified; roster entries can have different levels of profile information.
            </p>
          </div>
        </div>
      </header>

      <section id="collections" aria-labelledby="collections-heading" className="scroll-mt-24 space-y-5">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-700">Browse the archive</p>
            <h2 id="collections-heading" className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Choose a collection</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-500">From Olympic history to the pathways that shape the next generation.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredList && (
            <CollectionCard list={featuredList} featured />
          )}
          {otherLists.map((list) => <CollectionCard key={list.slug} list={list} />)}
        </div>
      </section>

      <AdSlot id="lists-index-bottom" format="horizontal" label="Lists Directory Partner" />
    </div>
  );
}

function CollectionCard({ list, featured = false }: { list: ReturnType<typeof getAllLists>[number]; featured?: boolean }) {
  const previewPlayers = list.players.slice(0, 4);

  return (
    <Link
      href={`/lists/${list.slug}`}
      className={`group relative flex min-h-[250px] flex-col overflow-hidden rounded-[1.65rem] border border-slate-200 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_36px_rgba(30,64,175,0.11)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:p-6 ${featured ? "md:col-span-2 xl:col-span-1" : ""}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${featured ? "from-amber-400 via-orange-400 to-rose-400" : "from-blue-700 via-sky-400 to-cyan-300"}`} />
      <div className="flex items-start justify-between gap-3">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] ring-1 ${featured ? "bg-amber-50 text-amber-800 ring-amber-100" : "bg-blue-50 text-blue-800 ring-blue-100"}`}>
          {featured ? <Trophy className="h-3.5 w-3.5" aria-hidden="true" /> : <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />}
          {list.badge}
        </span>
        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold tabular-nums text-slate-600">
          {list.players.length} <span className="font-medium">players</span>
        </span>
      </div>

      <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-950 transition-colors group-hover:text-blue-700 sm:text-[1.35rem]">
        {list.title}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">{list.description}</p>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center pl-1" aria-label={`${previewPlayers.length} athlete previews`}>
          {previewPlayers.map((player, index) => (
            <span key={player.id} className={`relative -ml-1.5 rounded-full border-2 border-white bg-white shadow-sm ${index === 0 ? "ml-0" : ""}`}>
              <PlayerAvatar name={player.name} team={player.team} imageUrl={player.imageUrl} imageAlt={player.imageAlt} size="sm" isOlympian={player.isOlympian} />
            </span>
          ))}
          {list.players.length > previewPlayers.length && (
            <span className="relative -ml-1.5 flex h-10 min-w-10 items-center justify-center rounded-full border-2 border-white bg-slate-100 px-2 text-[10px] font-bold text-slate-600">
              +{list.players.length - previewPlayers.length}
            </span>
          )}
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 transition-all group-hover:gap-2.5">
          Explore list <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
