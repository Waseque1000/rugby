import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Shield, Target, Users, BookOpen, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About USA Sevens Stats | Project Mission & Ethics",
  description:
    "Learn about USA Sevens Stats, our commitment to zero-invention rugby data integrity, and our mission to chronicle USA rugby sevens history.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <Breadcrumbs items={[{ label: "About" }]} />

      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
          <Shield className="w-3.5 h-3.5" />
          <span>About the Platform</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
          About USA Sevens Stats
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          USA Sevens Stats is an independent statistical and biographical archive committed to preserving and celebrating the achievements of United States Men&apos;s and Women&apos;s Rugby Sevens players.
        </p>
      </div>

      <div className="space-y-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-600" />
            <span>Our Mission</span>
          </h2>
          <p>
            Rugby Sevens is one of the most electric sports in the world, having captured the imagination of American fans through the Rio 2016, Tokyo 2020, and Paris 2024 Olympic Games. Yet historical rosters, player debuts, collegiate origins, and World Series caps have often remained scattered across tournament PDFs and archived match reports.
          </p>
          <p>
            Our mission is to assemble a structured, transparent, mobile-first encyclopedia that makes this heritage readily accessible to fans, coaches, scouts, and journalists.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <span>Our Zero-Invention Data Pledge</span>
          </h2>
          <p>
            In sports analytics, speculative numbers and AI hallucinations can quickly erode trust. We enforce a strict verification protocol:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/90 pl-2">
            <li>We never guess or extrapolate missing dates of birth, caps totals, or hometowns.</li>
            <li>If a data point cannot be confirmed from an official cited source, the field is left blank.</li>
            <li>We do not estimate net worths or publish ungrounded financial claims.</li>
            <li>Every record links back to verified primary sources on our <Link href="/sources" className="text-emerald-800 dark:text-emerald-400 font-semibold underline">Data Sources</Link> directory.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-secondary/60 p-6 sm:p-8 space-y-3">
          <h3 className="font-bold text-base text-foreground">
            Independent Disclaimer
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            USA Sevens Stats is an independent editorial and research platform. It is not affiliated with, endorsed by, or operated by USA Rugby, World Rugby, or the United States Olympic & Paralympic Committee (USOPC).
          </p>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <Link
            href="/players"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-sm transition-all"
          >
            <span>Explore Players Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold text-emerald-800 dark:text-emerald-400 hover:underline"
          >
            Contact the Editor &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
