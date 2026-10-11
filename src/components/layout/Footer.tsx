import React from "react";
import Link from "next/link";
import { Shield, ExternalLink, Heart, Trophy } from "lucide-react";
import { NewsletterForm } from "../ui/NewsletterForm";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/60 transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-700 dark:bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <Shield className="w-4 h-4 text-amber-400" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-foreground">
                USA Sevens <span className="text-blue-700 dark:text-blue-400">Stats</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              The premier independent statistics and biographical hub for the United States men&apos;s and women&apos;s national rugby sevens players, Olympic squads, and collegiate pipelines.
            </p>
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                Join Rugby Sevens Dispatch
              </span>
              <NewsletterForm compact />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">Explore Stats</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/players" className="text-muted-foreground hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  All Players Directory
                </Link>
              </li>
              <li>
                <Link href="/lists/usa-olympians-in-sevens" className="text-muted-foreground hover:text-blue-700 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
                  <span>Olympic Sevens Squads</span>
                  <Trophy className="w-3 h-3 text-amber-500" />
                </Link>
              </li>
              <li>
                <Link href="/lists/womens-eagles-sevens-roster" className="text-muted-foreground hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  Women&apos;s Eagles Sevens
                </Link>
              </li>
              <li>
                <Link href="/lists/mens-eagles-sevens-roster" className="text-muted-foreground hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  Men&apos;s Eagles Sevens
                </Link>
              </li>
              <li>
                <Link href="/lists/players-by-college" className="text-muted-foreground hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  Collegiate Pathways
                </Link>
              </li>
            </ul>
          </div>

          {/* Content & Resources */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  Articles & Analysis
                </Link>
              </li>
              <li>
                <Link href="/sources" className="text-muted-foreground hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  Data Sources & Citations
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  About the Project
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  Contact & Submissions
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">Legal & Privacy</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="https://eagles.rugby"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                >
                  <span>Official USA Rugby</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.svns.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                >
                  <span>World Rugby SVNS</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="text-center md:text-left space-y-1">
            <p className="font-semibold text-foreground/80">
              Not affiliated with USA Rugby or World Rugby.
            </p>
            <p>
              An independent informational, journalistic, and statistical database built for rugby enthusiasts.
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>© {currentYear} USA Sevens Stats. Crafted with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>for American Rugby.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
