import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getAllPlayerHubs } from "@/lib/players";
import { serializeJsonLd, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "USA Rugby Sevens Player Hubs",
  description:
    "Browse USA rugby sevens player records grouped by Olympic editions, college, hometown state, and playing position.",
  alternates: { canonical: "/players/hubs" },
};

export default function PlayerHubsPage() {
  const hubs = getAllPlayerHubs();
  const groups = [...new Set(hubs.map((hub) => hub.dimension))].map((dimension) => ({
    dimension,
    label: hubs.find((hub) => hub.dimension === dimension)?.dimensionLabel || dimension,
    hubs: hubs.filter((hub) => hub.dimension === dimension),
  }));
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "USA Rugby Sevens player hubs",
    itemListElement: hubs.map((hub, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${hub.value} (${hub.players.length})`,
      url: `${SITE_URL}/players/hubs/${hub.dimension}/${hub.slug}`,
    })),
  };

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListJsonLd) }} />
      <Breadcrumbs items={[{ label: "Players", href: "/players" }, { label: "Player Hubs" }]} />
      <header className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Player pathways and records</p>
        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">USA Rugby Sevens Player Hubs</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Explore the roster through Olympic editions, colleges, hometown states, and positions. Each hub groups the player records that share a documented connection.
        </p>
      </header>

      {groups.map((group) => (
        <section key={group.dimension} className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">{group.label}</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.hubs.map((hub) => (
              <li key={`${hub.dimension}-${hub.slug}`}>
                <Link
                  href={`/players/hubs/${hub.dimension}/${hub.slug}`}
                  className="flex h-full items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition hover:border-blue-500 hover:shadow-sm"
                >
                  <span className="font-semibold text-foreground">{hub.value}</span>
                  <span className="shrink-0 text-sm text-muted-foreground">{hub.players.length} records</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
