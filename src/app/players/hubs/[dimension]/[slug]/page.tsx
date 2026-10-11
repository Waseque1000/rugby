import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PlayerCard } from "@/components/players/PlayerCard";
import { getAllPlayerHubs, getPlayerHub } from "@/lib/players";
import { SITE_URL, serializeJsonLd } from "@/lib/site";

interface PlayerHubPageProps {
  params: Promise<{ dimension: string; slug: string }>;
}

export function generateStaticParams() {
  return getAllPlayerHubs().map(({ dimension, slug }) => ({ dimension, slug }));
}

export async function generateMetadata({ params }: PlayerHubPageProps): Promise<Metadata> {
  const { dimension, slug } = await params;
  const hub = getPlayerHub(dimension, slug);
  if (!hub) return { title: "Player Hub Not Found" };

  const title = `USA Rugby Sevens Players ${hub.dimensionLabel}: ${hub.value}`;
  const playerNames = hub.players.slice(0, 3).map((player) => player.name).join(", ");
  const description = `USA Rugby Sevens player records connected with ${hub.value}. Browse ${hub.players.length} profiles, including ${playerNames}.`;
  return {
    title,
    description,
    alternates: { canonical: `/players/hubs/${hub.dimension}/${hub.slug}` },
    openGraph: { title, description, url: `/players/hubs/${hub.dimension}/${hub.slug}` },
  };
}

export default async function PlayerHubPage({ params }: PlayerHubPageProps) {
  const { dimension, slug } = await params;
  const hub = getPlayerHub(dimension, slug);
  if (!hub) notFound();
  const indexablePlayers = hub.players.filter((player) => player.indexable);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `USA Rugby Sevens players: ${hub.value}`,
    numberOfItems: indexablePlayers.length,
    itemListElement: indexablePlayers.map((player, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: player.name,
      url: `${SITE_URL}/players/${player.slug}`,
    })),
  };

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListJsonLd) }} />
      <Breadcrumbs items={[{ label: "Players", href: "/players" }, { label: "Player Hubs", href: "/players/hubs" }, { label: hub.value }]} />
      <header className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-700">{hub.dimensionLabel}</p>
        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">USA Rugby Sevens Players: {hub.value}</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          This roster groups {hub.players.length} USA rugby sevens records by {hub.dimensionLabel.toLowerCase()}. Individual profile links appear when the record has enough verified details; other athletes remain listed here.
        </p>
      </header>
      <section aria-label={`${hub.value} player records`} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hub.players.map((player) => <PlayerCard key={player.id} player={player} />)}
      </section>
    </main>
  );
}
