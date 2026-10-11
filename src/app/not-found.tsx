import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "This USA Sevens Stats page could not be found.",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">404 · Not found</span>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
        The address may have changed, or the page may no longer be available. Browse the player archive or return to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/players" className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800">
          <Search className="h-4 w-4" /> Find a player
        </Link>
        <Link href="/" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold text-foreground hover:bg-secondary">
          <ArrowLeft className="h-4 w-4" /> Homepage
        </Link>
      </div>
    </main>
  );
}
