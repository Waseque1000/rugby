"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Shield,
  Menu,
  X,
  Search,
  BookOpen,
  Calendar,
  Users,
  Layers,
  Database,
  Trophy,
  Flame,
  ArrowRight,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface NavLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  hasDot?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { href: "/blog", label: "Stories & Editorial", icon: BookOpen },
  { href: "/activities", label: "Tour Calendar", icon: Calendar, hasDot: true },
  { href: "/players", label: "Player Hub", icon: Users },
  { href: "/lists", label: "Curated Rosters", icon: Layers },
  { href: "/sources", label: "Sources", icon: Database },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Sync menu state on route changes
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setSearchOpen(false);
  }

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut: Cmd+K / Ctrl+K to open search, Escape to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 60);
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/players?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Full-Width Sticky Top Header */}
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
                    {link.hasDot && (
                      <span className="flex h-2 w-2 relative ml-0.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Search, Olympians Badge, Theme Switcher & Mobile Button */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Quick Search Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 h-9 px-3 rounded-xl border border-border bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground text-xs font-medium transition-all cursor-pointer"
                aria-label="Open search dialog"
              >
                <Search className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                <span className="hidden sm:inline">Search...</span>
                <kbd className="hidden md:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded bg-card border border-border text-muted-foreground">
                  ⌘K
                </kbd>
              </button>

              {/* Olympians Highlight Pill */}
              <Link
                href="/lists/usa-olympians-in-sevens"
                className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 dark:text-amber-300 border border-amber-500/35 transition-all shadow-2xs"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Olympians</span>
                <span className="text-[10px] bg-amber-500/25 px-1.5 py-0.2 rounded-full font-mono">
                  19
                </span>
              </Link>

              {/* Theme Toggle Button */}
              <ThemeToggle />

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
                  {link.hasDot ? (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-red-600 text-white">
                      Live Tour
                    </span>
                  ) : (
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  )}
                </Link>
              );
            })}

            <div className="pt-2 border-t border-border">
              <Link
                href="/lists/usa-olympians-in-sevens"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between w-full px-3.5 py-3 rounded-xl bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold text-sm border border-amber-500/30"
              >
                <div className="flex items-center gap-2.5">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>USA Sevens Olympians</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 font-mono">
                  19 Athletes
                </span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Command Palette Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/60 dark:bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl rounded-2xl bg-card border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-border p-4">
              <Search className="w-5 h-5 text-blue-700 dark:text-blue-400 mr-3 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search athletes by name, college, position, or roster..."
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm sm:text-base focus:outline-none font-medium"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ml-2 cursor-pointer"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            {/* Quick Suggestions */}
            <div className="p-4 space-y-2.5 bg-muted/20">
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-1 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Featured Athletes & Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Perry Baker", href: "/players/usa-perry-baker" },
                  { label: "Naya Tapper", href: "/players/usa-naya-tapper" },
                  { label: "Carlin Isles", href: "/players/usa-carlin-isles" },
                  { label: "Alev Kelter", href: "/players/usa-alev-kelter" },
                  { label: "Olympians", href: "/lists/usa-olympians-in-sevens" },
                  { label: "SVNS Tour Stops", href: "/activities" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setSearchOpen(false)}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium bg-card border border-border hover:border-blue-600/60 hover:text-blue-700 dark:hover:text-blue-400 transition-colors shadow-2xs"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Modal Keyboard Shortcuts Footer */}
            <div className="px-4 py-2.5 bg-muted/40 border-t border-border flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-card border border-border font-bold">Enter</kbd> to search</span>
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-card border border-border font-bold">Esc</kbd> to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
