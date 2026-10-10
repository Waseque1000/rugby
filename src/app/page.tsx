import React from "react";
import Link from "next/link";
import {
  getAllPlayers,
  getFeaturedPlayers,
  getPlayerStatsSummary,
} from "@/lib/players";
import { getAllPosts } from "@/lib/blog";
import { QuickSearch } from "@/components/players/QuickSearch";
import { PlayerCard } from "@/components/players/PlayerCard";
import { StatCounter } from "@/components/ui/StatCounter";
import { AdSlot } from "@/components/monetization/AdSlot";
import { AffiliateBox } from "@/components/monetization/AffiliateBox";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import {
  Shield,
  Trophy,
  ArrowRight,
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
} from "lucide-react";

export default function HomePage() {
  const allPlayers = getAllPlayers();
  const featured = getFeaturedPlayers(8);
  const stats = getPlayerStatsSummary();
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-border bg-gradient-to-b from-emerald-950/20 via-background to-background">
        {/* Subtle Pitch / Field lines texture */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-emerald-600/40" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-emerald-600/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-900/10 text-emerald-800 dark:bg-emerald-600/20 dark:text-emerald-300 border border-emerald-900/20 dark:border-emerald-500/30 shadow-xs">
            <Shield className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Independent USA Rugby Sevens Database & Bios</span>
          </div>

          {/* Hero headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground max-w-4xl mx-auto leading-[1.08]">
            USA Sevens <span className="text-emerald-700 dark:text-emerald-400">Stats Hub</span>
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The definitive record for United States Men&apos;s and Women&apos;s Rugby Sevens athletes—from Olympic debuts and World Series legends to rising collegiate stars.
          </p>

          {/* Hero Quick Search Box */}
          <div className="pt-2 sm:pt-4">
            <QuickSearch players={allPlayers} />
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
              <span className="font-medium">Popular searches:</span>
              <Link href="/players/usa-perry-baker" className="hover:text-emerald-700 dark:hover:text-emerald-400 underline">Perry Baker</Link>
              <span>•</span>
              <Link href="/players/usa-alev-kelter" className="hover:text-emerald-700 dark:hover:text-emerald-400 underline">Alev Kelter</Link>
              <span>•</span>
              <Link href="/players/usa-carlin-isles" className="hover:text-emerald-700 dark:hover:text-emerald-400 underline">Carlin Isles</Link>
              <span>•</span>
              <Link href="/lists/usa-olympians-in-sevens" className="hover:text-emerald-700 dark:hover:text-emerald-400 underline font-semibold text-amber-600 dark:text-amber-400">All Olympians</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Database Statistics Counter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              Database Overview
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Verified national team selections, Olympic squads, and tournament pools
            </p>
          </div>
          <Link
            href="/sources"
            className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View Data Sources & Methodology</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <StatCounter stats={stats} />
      </section>

      {/* Ad slot between hero stats and featured players */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot id="home-top-banner" format="horizontal" label="Featured Partner" />
      </section>

      {/* Featured Players Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Marquee Profiles</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Featured USA Sevens Players
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              World Rugby players of the year, Olympic captains, and standout record holders
            </p>
          </div>
          <Link
            href="/players"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
          >
            <span>Explore All 40+ Players</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </section>

      {/* Curated Lists Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Trophy className="w-3.5 h-3.5" /> Curated Collections
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Auto-Generated Rosters & Historical Cohorts
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed">
              Explore dynamic lists filtered by Olympic tournament, collegiate institution, and national squad tenure—all compiled without data inflation.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/lists/usa-olympians-in-sevens"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-amber-950 font-bold text-xs sm:text-sm hover:bg-amber-300 transition-colors shadow-md"
              >
                <span>USA Sevens Olympians</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/lists/players-by-college"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white font-semibold text-xs sm:text-sm hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors"
              >
                <Layers className="w-4 h-4" />
                <span>Collegiate Directory</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate Gear Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AffiliateBox />
      </section>

      {/* Latest Blog Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Editorial & Analysis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Latest Articles & Insights
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Historical retrospectives, tactics, and the road to LA 2028
            </p>
          </div>
          <Link
            href="/blog"
            className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 hover:border-emerald-600/60 hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={post.date}>{post.date}</time>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="font-extrabold text-lg text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
                  {post.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-border/70 flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-secondary text-[10px] font-medium text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="font-semibold text-emerald-800 dark:text-emerald-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Signup Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-emerald-900/30 dark:border-emerald-600/30 bg-gradient-to-br from-emerald-950/15 via-card to-emerald-950/20 p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white dark:bg-emerald-600 mx-auto flex items-center justify-center shadow-md">
            <Shield className="w-6 h-6 text-amber-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Never Miss a USA Sevens Update
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Get tournament roster drops, Olympic pathway analyses, and new player profile verifications delivered straight to your inbox.
          </p>
          <div className="pt-2 max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
