import React from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service and usage guidelines for USA Sevens Stats.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <Breadcrumbs items={[{ label: "Terms of Service" }]} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-muted-foreground">
          Last updated: October 10, 2026
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">1. Acceptance of Terms</h2>
          <p>
            By accessing USA Sevens Stats, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">2. Educational & Informational Use</h2>
          <p>
            All content, player records, caps counts, and tournament summaries provided on USA Sevens Stats are compiled for educational, journalistic, and informational purposes. While we endeavor to ensure the highest degree of accuracy, sports records may change or be revised by governing bodies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">3. Intellectual Property & Disclaimer</h2>
          <p>
            USA Sevens Stats is an independent statistical repository. We are not affiliated with, endorsed by, or partnered with USA Rugby, World Rugby, the Olympic Games, or SVNS. All athlete names, trademarks, and organizational designations remain the property of their respective owners.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">4. Limitation of Liability</h2>
          <p>
            USA Sevens Stats and its authors shall not be held liable for any inaccuracies, interruptions, or damages arising from the use of the platform.
          </p>
        </section>
      </div>
    </div>
  );
}
