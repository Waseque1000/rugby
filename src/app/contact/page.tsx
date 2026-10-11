import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContactForm } from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Data Corrections",
  description:
    "Send a source-backed correction, missing player record, or media inquiry to the USA Sevens Stats editorial team.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
          Contact & Data Corrections
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Have an official tournament roster verification, historical correction,
          or media inquiry? Send it with links to primary sources.
        </p>
      </div>

      <ContactForm />
    </div>
  );
}
