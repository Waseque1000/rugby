import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllPlayers,
  getPlayerBySlug,
  getRelatedPlayers,
} from "@/lib/players";
import { PlayerAvatar } from "@/components/players/PlayerAvatar";
import { PlayerCard } from "@/components/players/PlayerCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AdSlot } from "@/components/monetization/AdSlot";
import { AffiliateBox } from "@/components/monetization/AffiliateBox";
import {
  Trophy,
  MapPin,
  GraduationCap,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Award,
  Sparkles,
  ChevronRight,
  User,
} from "lucide-react";

interface PlayerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const players = getAllPlayers();
  return players.map((player) => ({
    slug: player.slug,
  }));
}

export async function generateMetadata({
  params,
}: PlayerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);

  if (!player) {
    return {
      title: "Player Not Found",
    };
  }

  const title = `${player.name} - USA Rugby Sevens Profile & Stats`;
  const description = `${player.name} USA Rugby Sevens player profile. ${
    player.position ? `Position: ${player.position}. ` : ""
  }${player.team ? `Team: ${player.team}. ` : ""}${
    player.isOlympian ? "USA Sevens Olympian. " : ""
  }Collegiate background, caps, achievements, and career history.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      url: `/players/${player.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PlayerProfilePage({ params }: PlayerPageProps) {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);

  if (!player) {
    notFound();
  }

  const related = getRelatedPlayers(player, 4);

  // Schema.org Person JSON-LD
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: player.name,
    jobTitle: player.position || "Rugby Sevens Player",
    affiliation: {
      "@type": "SportsTeam",
      name: player.team || "USA Rugby Sevens",
    },
    birthDate: player.dob || undefined,
    homeLocation: player.hometown
      ? {
          "@type": "Place",
          name: player.hometown,
        }
      : undefined,
    alumniOf: player.college
      ? {
          "@type": "EducationalOrganization",
          name: player.college,
        }
      : undefined,
    nationality: player.nationality || "United States",
    description: player.biography || undefined,
    url: player.sourceUrl || undefined,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Players", href: "/players" },
          { label: player.name },
        ]}
      />

      {/* Hero Header Card */}
      <div className="rounded-3xl border border-border bg-gradient-to-br from-emerald-950/20 via-card to-card p-6 sm:p-10 shadow-sm relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7">
            {/* Monogram Photo Placeholder */}
            <PlayerAvatar
              name={player.name}
              team={player.team}
              size="xl"
              isOlympian={player.isOlympian}
              className="flex-shrink-0"
            />

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                {player.team && (
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-900/15 text-emerald-800 dark:text-emerald-300 dark:bg-emerald-600/20">
                    {player.team}
                  </span>
                )}
                {player.isOlympian && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>USA Olympian</span>
                  </span>
                )}
                {player.dataStatus && (
                  <span className="text-[11px] text-muted-foreground px-2.5 py-0.5 rounded-md bg-secondary">
                    {player.dataStatus}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
                {player.name}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground font-medium">
                {player.position && (
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    {player.position}
                  </span>
                )}
                {player.hometown && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-emerald-600/70" />
                    {player.hometown}
                  </span>
                )}
                {player.college && (
                  <span className="inline-flex items-center gap-1">
                    <GraduationCap className="w-4 h-4 text-emerald-600/70" />
                    {player.college}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats Pills (only rendered if at least one metric is non-null) */}
          {(player.caps !== null || player.tries !== null || player.points !== null) && (
            <div className="flex sm:flex-row md:flex-col gap-3 p-4 rounded-2xl bg-secondary/70 border border-border flex-shrink-0 w-full sm:w-auto">
              {player.caps !== null && (
                <div className="text-center sm:text-left">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Sevens Caps
                  </span>
                  <span className="text-2xl font-black text-foreground">
                    {player.caps}
                  </span>
                </div>
              )}
              {player.tries !== null && (
                <div className="text-center sm:text-left">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Sevens Tries
                  </span>
                  <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                    {player.tries}
                  </span>
                </div>
              )}
              {player.points !== null && (
                <div className="text-center sm:text-left">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Total Points
                  </span>
                  <span className="text-2xl font-black text-foreground">
                    {player.points}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Layout with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
        {/* Left 2 Cols: Detailed Bio & Tournament Records */}
        <div className="lg:col-span-2 space-y-8">
          {/* Biography / Career Overview */}
          {player.biography && (
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-600" />
                <span>Career Overview</span>
              </h2>
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {player.biography}
              </div>
            </section>
          )}

          {/* Olympic & International Milestones */}
          {(player.olympicGames || player.debut || player.worldCupSevens) && (
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-5">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>International & Olympic Record</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {player.debut && (
                  <div className="p-4 rounded-xl bg-secondary/60 border border-border">
                    <span className="text-xs uppercase font-bold text-muted-foreground block mb-1">
                      National Sevens Debut
                    </span>
                    <span className="font-semibold text-foreground">
                      {player.debut}
                    </span>
                  </div>
                )}

                {player.olympicGames && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25">
                    <span className="text-xs uppercase font-bold text-amber-800 dark:text-amber-300 block mb-1">
                      Olympic Games History
                    </span>
                    <span className="font-semibold text-foreground">
                      {player.olympicGames}
                    </span>
                  </div>
                )}

                {player.worldCupSevens && (
                  <div className="p-4 rounded-xl bg-secondary/60 border border-border">
                    <span className="text-xs uppercase font-bold text-muted-foreground block mb-1">
                      Rugby World Cup Sevens
                    </span>
                    <span className="font-semibold text-foreground">
                      {player.worldCupSevens}
                    </span>
                  </div>
                )}

                {player.nationalYears && (
                  <div className="p-4 rounded-xl bg-secondary/60 border border-border">
                    <span className="text-xs uppercase font-bold text-muted-foreground block mb-1">
                      National Team Years
                    </span>
                    <span className="font-semibold text-foreground">
                      {player.nationalYears}
                    </span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Major Achievements (only shown if present) */}
          {player.achievements && (
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <span>Major Achievements & Honors</span>
              </h2>
              {player.achievements.startsWith("http") ? (
                <div className="p-4 rounded-xl bg-secondary/60 border border-border flex items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground">
                    Documented in official USA Rugby achievements archive
                  </span>
                  <a
                    href={player.achievements}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:underline flex-shrink-0"
                  >
                    <span>View Citation</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {player.achievements}
                </p>
              )}
            </section>
          )}

          {/* In-content Ad Slot */}
          <AdSlot id="player-profile-middle" format="in-feed" label="Sponsored Partner" />

          {/* Related Players section (same team or same college) */}
          {related.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>Related USA Sevens Players</span>
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Athletes with shared collegiate backgrounds or national squads
                  </p>
                </div>
                <Link
                  href="/players"
                  className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Directory</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((rel) => (
                  <PlayerCard key={rel.id} player={rel} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar: Vital Bio Data & Source Verification */}
        <div className="space-y-6">
          {/* Vitals Box: strictly hide null fields! */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-base text-foreground pb-3 border-b border-border">
              Player Information
            </h3>

            <dl className="space-y-3 text-xs sm:text-sm">
              {/* DOB */}
              {player.dob && (
                <div className="flex items-center justify-between py-1 border-b border-border/50">
                  <dt className="text-muted-foreground">Date of Birth</dt>
                  <dd className="font-semibold text-foreground">{player.dob}</dd>
                </div>
              )}

              {/* Age */}
              {player.age !== null && player.age !== undefined && (
                <div className="flex items-center justify-between py-1 border-b border-border/50">
                  <dt className="text-muted-foreground">Age</dt>
                  <dd className="font-semibold text-foreground">{player.age} yrs</dd>
                </div>
              )}

              {/* Hometown */}
              {player.hometown && (
                <div className="flex items-center justify-between py-1 border-b border-border/50">
                  <dt className="text-muted-foreground">Hometown</dt>
                  <dd className="font-semibold text-foreground text-right">{player.hometown}</dd>
                </div>
              )}

              {/* Nationality */}
              {player.nationality && (
                <div className="flex items-center justify-between py-1 border-b border-border/50">
                  <dt className="text-muted-foreground">Nationality</dt>
                  <dd className="font-semibold text-foreground">{player.nationality}</dd>
                </div>
              )}

              {/* Position */}
              {player.position && (
                <div className="flex items-center justify-between py-1 border-b border-border/50">
                  <dt className="text-muted-foreground">Position</dt>
                  <dd className="font-semibold text-emerald-700 dark:text-emerald-400 text-right">{player.position}</dd>
                </div>
              )}

              {/* College */}
              {player.college && (
                <div className="flex items-center justify-between py-1 border-b border-border/50">
                  <dt className="text-muted-foreground">College / School</dt>
                  <dd className="font-semibold text-foreground text-right">{player.college}</dd>
                </div>
              )}

              {/* Club */}
              {player.club && (
                <div className="flex items-center justify-between py-1 border-b border-border/50">
                  <dt className="text-muted-foreground">Club / Association</dt>
                  <dd className="font-semibold text-foreground text-right">{player.club}</dd>
                </div>
              )}

              {/* Height */}
              {player.height && (
                <div className="flex items-center justify-between py-1 border-b border-border/50">
                  <dt className="text-muted-foreground">Height</dt>
                  <dd className="font-semibold text-foreground">{player.height}</dd>
                </div>
              )}

              {/* Weight */}
              {player.weight && (
                <div className="flex items-center justify-between py-1 border-b border-border/50">
                  <dt className="text-muted-foreground">Weight</dt>
                  <dd className="font-semibold text-foreground">{player.weight}</dd>
                </div>
              )}

              {/* Fifteens Caps */}
              {player.fifteensCaps !== null && player.fifteensCaps !== undefined && (
                <div className="flex items-center justify-between py-1 border-b border-border/50">
                  <dt className="text-muted-foreground">Fifteens (15s) Caps</dt>
                  <dd className="font-semibold text-foreground">{player.fifteensCaps}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Source Verification & Integrity Box */}
          <div className="bg-secondary/70 border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-foreground font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Data Integrity & Source</span>
            </div>

            {player.sourceNotes && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {player.sourceNotes}
              </p>
            )}

            {player.sourceUrl && (
              <a
                href={player.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:underline break-all"
              >
                <span>Official Citation Source</span>
                <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
              </a>
            )}

            {/* Last verified date */}
            {player.lastChecked && (
              <div className="pt-3 border-t border-border/70 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Last verified
                </span>
                <span className="font-semibold text-foreground">{player.lastChecked}</span>
              </div>
            )}
          </div>

          {/* Sidebar Ad Slot */}
          <AdSlot id="player-profile-sidebar" format="sidebar" label="Partner Sidebar" />
        </div>
      </div>

      {/* Recommended Gear */}
      <AffiliateBox />
    </div>
  );
}
