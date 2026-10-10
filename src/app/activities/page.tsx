import React from "react";
import type { Metadata } from "next";
import { getAllActivities } from "@/lib/activities";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AdSlot } from "@/components/monetization/AdSlot";
import { AffiliateBox } from "@/components/monetization/AffiliateBox";
import {
  Calendar,
  MapPin,
  Tv,
  CheckCircle2,
  Clock,
  Trophy,
  ArrowRight,
  Flame,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "USA Rugby Sevens Activities, Schedule & SVNS Calendar | 2026",
  description:
    "Follow USA Men's and Women's National Rugby Sevens activities, tournament schedules, HSBC SVNS tour stops, Olympic camps, and live broadcast destinations.",
  openGraph: {
    title: "USA Rugby Sevens Activities & Tournament Schedule",
    description:
      "HSBC SVNS tour stops, Olympic preparation milestones, and Team USA match schedules.",
  },
};

export default function ActivitiesPage() {
  const activities = getAllActivities();
  const upcomingCount = activities.filter((a) => a.status === "Upcoming").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <Breadcrumbs items={[{ label: "Activities & Schedule" }]} />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          <span>2026 World Tour & National Team Calendar</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
          USA Rugby Sevens Activities & Tournaments
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Stay informed on international World Rugby SVNS tour destinations, Olympic residency camps in Chula Vista, and domestic milestones leading to Los Angeles 2028.
        </p>
      </div>

      {/* Top Banner Ad */}
      <AdSlot id="activities-top-ad" format="horizontal" label="Tour Partner" />

      {/* Upcoming Spotlight Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span>Tour Schedule & Milestones</span>
          </h2>
          <span className="text-xs font-semibold text-muted-foreground">
            {upcomingCount} Upcoming Fixtures
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((event) => {
            const isUpcoming = event.status === "Upcoming";

            return (
              <div
                key={event.id}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 hover:border-emerald-600/60 hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 bg-emerald-900/10 dark:bg-emerald-600/20 px-2.5 py-1 rounded-lg">
                      {event.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        isUpcoming
                          ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {isUpcoming ? (
                        <>
                          <Clock className="w-3 h-3 text-amber-500" />
                          <span>Upcoming</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Finalized</span>
                        </>
                      )}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg sm:text-xl text-foreground mb-2 leading-snug">
                    {event.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-2 font-medium text-foreground/90">
                      <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{event.dates}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>
                        {event.venue}, {event.location}
                      </span>
                    </div>
                    {event.broadcast && (
                      <div className="flex items-center gap-2">
                        <Tv className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Watch: {event.broadcast}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {event.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">
                    Involves: <strong>{event.teamInvolved}</strong>
                  </span>
                  <Link
                    href="/blog"
                    className="font-semibold text-emerald-800 dark:text-emerald-400 inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Read Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cross link to rosters and gear */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white space-y-4 shadow-xl">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300">
          <Trophy className="w-3.5 h-3.5" /> National Squad Preparation
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Track Active USA Sevens Players Across Tournaments
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
          Every activity feeds directly into our verified player caps database. Explore the 40+ national pool athletes contesting selection for each tour stop.
        </p>
        <div className="pt-2 flex flex-wrap gap-3">
          <Link
            href="/players"
            className="px-5 py-2.5 rounded-xl bg-amber-400 text-amber-950 font-bold text-xs sm:text-sm hover:bg-amber-300 transition-colors shadow-sm"
          >
            Explore Active Player Profiles
          </Link>
          <Link
            href="/lists/usa-olympians-in-sevens"
            className="px-5 py-2.5 rounded-xl bg-white/10 text-white font-semibold text-xs sm:text-sm hover:bg-white/20 transition-colors border border-white/20"
          >
            View Olympic Rosters
          </Link>
        </div>
      </div>

      <AffiliateBox title="Match Day & Tournament Gear" />
    </div>
  );
}
