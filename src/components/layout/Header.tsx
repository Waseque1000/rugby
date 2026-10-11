"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  Menu,
  X,
  BookOpen,
  Calendar,
  Users,
  Layers,
  Database,
  ArrowRight,
} from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/blog", label: "Stories & Editorial", icon: BookOpen },
  { href: "/activities", label: "Tour Calendar", icon: Calendar, badge: "2026–27" },
  { href: "/players", label: "Player Hub", icon: Users },
  { href: "/lists", label: "Curated Rosters", icon: Layers },
  { href: "/sources", label: "Sources", icon: Database },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Sync menu state on route changes
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur-md shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-4">
          
          {/* Left: Brand Identity & Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group shrink-0 select-none py-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 dark:from-blue-600 dark:via-blue-700 dark:to-indigo-900 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-amber-400 group-hover:rotate-6 transition-transform" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-foreground group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  USA Sevens
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-blue-600/10 text-blue-700 dark:bg-blue-400/15 dark:text-blue-300 border border-blue-600/20 dark:border-blue-400/30 uppercase tracking-wider">
                  Dispatch
                </span>
              </div>
              <span className="text-[11px] font-medium text-muted-foreground hidden sm:block">
                Rugby Journal & Player Archive
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-blue-700 text-white dark:bg-blue-600 dark:text-white font-bold shadow-xs"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-80" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-[9px] font-bold text-blue-800">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-border bg-card text-foreground hover:bg-muted transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-card/98 backdrop-blur-xl px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-blue-700 text-white dark:bg-blue-600 dark:text-white font-bold"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 opacity-80" />
                  <span>{link.label}</span>
                </div>
                {link.badge ? (
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {link.badge}
                  </span>
                ) : (
                  <ArrowRight className="w-4 h-4 opacity-50" />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
