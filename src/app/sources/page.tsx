import React from "react";
import type { Metadata } from "next";
import { getAllSources } from "@/lib/players";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AdSlot } from "@/components/monetization/AdSlot";
import { Database, ExternalLink, ShieldCheck, FileSpreadsheet, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Data Sources & Methodology | USA Rugby Sevens Database",
  description:
    "Official citations, methodology, and primary sources powering the USA Sevens Stats player database and historical roster records.",
  alternates: { canonical: "/sources" },
  openGraph: {
    title: "Data Sources & Methodology | USA Sevens Stats",
    description:
      "All citations, official USA Rugby squad releases, and World Rugby tournament summaries utilized in our dataset.",
  },
};

export default function SourcesPage() {
  const sources = getAllSources();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <Breadcrumbs items={[{ label: "Data Sources" }]} />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
          <Database className="w-3.5 h-3.5" />
          <span>Transparency & Provenance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
          Data Sources & Methodology
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          The records in USA Sevens Stats are derived exclusively from verified public documents, official squad announcements, Olympic team rosters, and World Rugby event profiles. We adhere to a strict zero-invention policy: unknown or unverified stats remain blank or null rather than estimated.
        </p>
      </div>

      {/* Methodological Standards Card */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-foreground font-bold text-base">
          <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span>Dataset Verification Standards</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-muted-foreground">
          <div className="p-4 rounded-xl bg-secondary/60 border border-border space-y-1">
            <h4 className="font-bold text-foreground">Zero-Guessing Rule</h4>
            <p className="leading-relaxed">
              If a player&apos;s collegiate background, date of birth, or caps total is not established in cited records, it is left null.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/60 border border-border space-y-1">
            <h4 className="font-bold text-foreground">Event vs. Lifetime Caps</h4>
            <p className="leading-relaxed">
              Tournament roster sheets often display single-event cap counts rather than career totals. Caveats are cataloged per source.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/60 border border-border space-y-1">
            <h4 className="font-bold text-foreground">Living Document</h4>
            <p className="leading-relaxed">
              Records are expanded season-by-season via the build script as historical rosters and archives are systematically digitized.
            </p>
          </div>
        </div>
      </div>

      <AdSlot id="sources-top-ad" format="horizontal" label="Institutional Partner" />

      {/* Sources Table / List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Documented Sources Sheet</span>
          </h2>
          <span className="text-xs text-muted-foreground">
            {sources.length} sources registered
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sources.map((src, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border bg-card p-5 space-y-3 hover:border-blue-600/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-bold text-base text-foreground">
                    {src.source}
                  </h3>
                  <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                </div>
                {src.notes && (
                  <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                    {src.notes}
                  </p>
                )}
              </div>

              {src.url && (
                <div className="pt-3 border-t border-border/60">
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline break-all"
                  >
                    <span>{src.url}</span>
                    <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
