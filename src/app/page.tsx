import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getAllPosts,
  getFeaturedPost,
  getAllCategories,
} from "@/lib/blog";
import { getAllPlayers, getFeaturedPlayers, getPlayerStatsSummary } from "@/lib/players";
import { getUpcomingActivities } from "@/lib/activities";
import { QuickSearch } from "@/components/players/QuickSearch";
import { PlayerCard } from "@/components/players/PlayerCard";
import { StatCounter } from "@/components/ui/StatCounter";
import { AdSlot } from "@/components/monetization/AdSlot";
import { AffiliateBox } from "@/components/monetization/AffiliateBox";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Trophy,
  Flame,
  MapPin,
  TrendingUp,
} from "lucide-react";

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPost = getFeaturedPost() || allPosts[0];
  const sideArticles = allPosts.filter((p) => p.slug !== featuredPost.slug).slice(0, 3);
  const secondaryArticles = allPosts.filter((p) => p.slug !== featuredPost.slug).slice(3, 7);
  const categories = getAllCategories();
  const allPlayers = getAllPlayers();
  const featuredPlayers = getFeaturedPlayers(4);
  const stats = getPlayerStatsSummary();
  const upcomingActivities = getUpcomingActivities().slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      {/* Magazine Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-emerald-950/20 via-background to-background pt-8 pb-12 sm:pt-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Eyebrow & Live Search */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-900/10 text-emerald-800 dark:bg-emerald-600/20 dark:text-emerald-300 border border-emerald-900/20 dark:border-emerald-500/30">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>The Independent Voice of American Rugby Sevens</span>
            </div>
            <div className="w-full md:w-auto">
              <QuickSearch players={allPlayers} />
            </div>
          </div>

          {/* Magazine Lead Story Grid (Main Cover Story + 3 Trending Stories) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Main Lead Cover Story (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-md hover:border-emerald-600/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-800 text-white dark:bg-emerald-600">
                    {featuredPost.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" /> Featured Story
                  </span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground ml-auto">
                    <Calendar className="w-3.5 h-3.5" />
                    <time dateTime={featuredPost.date}>{featuredPost.date}</time>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredPost.readingTime}</span>
                  </div>
                </div>

                {/* Cover Image from Bing */}
                {featuredPost.image && (
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="relative block w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-border/80 group-hover:border-emerald-600/40 transition-all shadow-xs my-2"
                  >
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.imageAlt || featuredPost.title}
                      fill
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 750px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-white/90 drop-shadow">
                      <span className="font-semibold">{featuredPost.category}</span>
                      <span className="text-[10px] bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs font-mono">
                        Bing Image Sourced
                      </span>
                    </div>
                  </Link>
                )}

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-[1.15] group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                  {featuredPost.description}
                </p>
              </div>

              <div className="relative mt-8 pt-6 border-t border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 font-black text-sm flex items-center justify-center">
                    {featuredPost.author.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-foreground">
                      {featuredPost.author.name}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {featuredPost.author.role}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-sm"
                >
                  <span>Read Full Cover Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Trending Sidebar Stories (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <h2 className="font-black text-sm uppercase tracking-wider text-foreground">
                  Trending Analysis
                </h2>
              </div>

              <div className="space-y-4 flex-1 flex flex-col justify-between">
                {sideArticles.map((article) => (
                  <article
                    key={article.slug}
                    className="p-4 sm:p-5 rounded-2xl bg-card border border-border hover:border-emerald-500/50 hover:shadow-md transition-all group flex flex-col justify-between gap-3 flex-1"
                  >
                    <div className="flex gap-3 items-start">
                      {article.image && (
                        <Link
                          href={`/blog/${article.slug}`}
                          className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-border group-hover:border-emerald-500/50 transition-all bg-muted"
                        >
                          <Image
                            src={article.image}
                            alt={article.imageAlt || article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="80px"
                          />
                        </Link>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
                          <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase text-[10px]">
                            {article.category}
                          </span>
                          <span className="text-[10px]">{article.readingTime}</span>
                        </div>
                        <h3 className="font-bold text-xs sm:text-sm text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                          <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                        </h3>
                        <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1 leading-relaxed">
                          {article.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="truncate max-w-[140px]">By {article.author.name}</span>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="font-bold text-emerald-800 dark:text-emerald-400 group-hover:underline inline-flex items-center gap-0.5 shrink-0"
                      >
                        Read &rarr;
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Activities & Tour Calendar Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-card to-emerald-950/10 p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/80">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-black text-lg text-foreground tracking-tight">
                  Upcoming Tour Stops & Activities
                </h2>
                <p className="text-xs text-muted-foreground">
                  Official HSBC SVNS World Tour destinations & USA national camps
                </p>
              </div>
            </div>
            <Link
              href="/activities"
              className="text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View Full 2026 Calendar ({upcomingActivities.length} upcoming)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingActivities.map((act) => (
              <div
                key={act.id}
                className="p-4 rounded-2xl bg-card border border-border hover:border-emerald-600/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                    <span className="text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                      {act.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-foreground text-[10px]">
                      {act.teamInvolved}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm text-foreground mb-1 leading-snug">
                    {act.title}
                  </h3>
                  <div className="space-y-1 text-xs text-muted-foreground mt-2">
                    <div className="flex items-center gap-1.5 font-medium text-foreground">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{act.dates}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="line-clamp-1">{act.venue}, {act.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-border/60 flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">{act.broadcast || "Peacock"}</span>
                  <Link
                    href="/activities"
                    className="font-bold text-emerald-800 dark:text-emerald-400 hover:underline"
                  >
                    Event Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad slot between calendar and articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot id="home-editorial-banner" format="horizontal" label="Editorial Sponsor" />
      </section>

      {/* Latest Editorial & Deep Dives */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>In-Depth Features</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Latest Articles & Technical Analysis
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Tactical debriefs, Olympic retrospectives, and athlete profiles
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-400 hover:underline self-start sm:self-auto"
          >
            <span>Browse All {allPosts.length} Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 pb-2">
          <span className="text-xs font-semibold text-muted-foreground mr-1">Topics:</span>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${encodeURIComponent(cat)}`}
              className="px-3 py-1 rounded-lg text-xs font-semibold bg-secondary hover:bg-emerald-900/10 hover:text-emerald-800 dark:hover:bg-emerald-600/20 dark:hover:text-emerald-300 text-secondary-foreground transition-all"
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* 4-column secondary articles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(secondaryArticles.length > 0 ? secondaryArticles : sideArticles).map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card overflow-hidden hover:border-emerald-600/50 hover:shadow-md transition-all group"
            >
              <div>
                {post.image && (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative block w-full aspect-[16/10] overflow-hidden bg-muted border-b border-border/60"
                  >
                    <Image
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </Link>
                )}
                <div className="p-5">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-2">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase text-[10px]">
                      {post.category}
                    </span>
                    <span className="text-[10px]">{post.readingTime}</span>
                  </div>
                  <h3 className="font-extrabold text-base text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-border flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 1).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-secondary text-[10px] font-medium text-secondary-foreground"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-emerald-800 dark:text-emerald-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  Read &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Integrated Players Database & Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Player Data Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Spotlight: USA Sevens National Pool
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Direct biographical dossiers, collegiate origins, and verified Olympic caps
            </p>
          </div>
          <Link
            href="/players"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-sm"
          >
            <span>Search All 44 Athletes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <StatCounter stats={stats} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
          {featuredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </section>

      {/* Curated Rosters Feature Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Trophy className="w-3.5 h-3.5" /> Historical Rosters & Lists
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Historical Olympic Squads & College Directories
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed">
              Explore dynamic cohorts: USA Olympians across Rio, Tokyo, and Paris, plus collegiate feeders from Dartmouth, Army West Point, Cal Berkeley, and Wisconsin.
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
                <span>Collegiate Feeder Directory</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gear Affiliate Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AffiliateBox title="Recommended Match & Training Equipment" />
      </section>

      {/* Editorial Dispatch Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-emerald-900/30 dark:border-emerald-600/30 bg-gradient-to-br from-emerald-950/15 via-card to-emerald-950/20 p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white dark:bg-emerald-600 mx-auto flex items-center justify-center shadow-md">
            <BookOpen className="w-6 h-6 text-amber-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Subscribe to The Sevens Dispatch
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Get our latest tactical debriefs, Olympic qualifying updates, and tournament roster breakdowns delivered directly to your inbox every tournament week.
          </p>
          <div className="pt-2 max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
