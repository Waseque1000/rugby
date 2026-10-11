import React from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and cookie practices for USA Sevens Stats.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-muted-foreground">
          Last updated: October 11, 2026
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">1. Introduction</h2>
          <p>
            USA Sevens Stats (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates as an independent sports reference hub. We respect your privacy and are committed to protecting the limited personal data you share when navigating our website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">2. Information We Collect</h2>
          <p>
            We do not require user accounts. We store information you voluntarily provide, including newsletter email addresses and contact messages, in JSON files on the application server. These files are kept outside the public site data and should be access-restricted and backed up by the site operator. Do not include sensitive information in a message.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">3. Cookies and Local Storage</h2>
          <p>
            We use browser local storage to remember whether you dismissed this notice. The site currently does not run analytics tracking. You can clear local storage through your browser settings at any time.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">4. Advertising and Affiliate Links</h2>
          <p>
            When monetization is active, third-party advertising partners or affiliate programs (e.g., sporting goods merchants) may use tracking cookies to attribute referral clicks. We do not sell your personal information.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-foreground">5. Contact</h2>
          <p>
            Questions regarding this Privacy Policy can be directed to our editorial team via our Contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
