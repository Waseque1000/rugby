"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Shield,
  Menu,
  X,
  Users,
  BookOpen,
  Calendar,
  Layers,
  Database,
  Trophy,
  Search,
  ChevronDown,
  ArrowRight,
  Flame,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface DropdownItem {
  title: string;
  description: string;
  href: string;
  badge?: string;
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Sync menus on route change during render (React 19 compliant)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setSearchOpen(false);
  }

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Search Submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/players?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Keyboard shortcut (⌘K or / to open search)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  // Dropdown data
  const storiesMenu: DropdownItem[] = [
    {
      title: "Latest Editorial & Analysis",
      description: "Tactical breakdowns, restart analysis, and tour retrospectives",
      href: "/blog",
      badge: "Featured",
    },
    {
      title: "Women's SVNS Dominance",
      description: "How Naya Tapper & Alev Kelter transformed American rugby",
      href: "/blog/womens-svns-dominance-tapper-kelter",
    },
    {
      title: "Perry Baker & Carlin Isles",
      description: "The decade of 10-second speed that rewrote World Rugby",
      href: "/blog/perry-baker-carlin-isles-speed-dynasty",
    },
    {
      title: "Collegiate Rugby Pathways",
      description: "D1A, NCR, and university feeder programs developing talent",
      href: "/blog/top-college-rugby-programs-usa",
    },
  ];

  const rostersMenu: DropdownItem[] = [
    {
      title: "USA Sevens Olympians",
      description: "Rio 2016, Tokyo 2020, and Paris 2024 Olympic representatives",
      href: "/lists/usa-olympians-in-sevens",
      badge: "19 Athletes",
    },
    {
      title: "Women's Eagles Sevens Pool",
      description: "Olympic bronze medalists, collegiate stars, and SVNS captains",
      href: "/lists/womens-eagles-sevens-roster",
    },
    {
      title: "Men's Eagles Sevens Pool",
      description: "World Rugby Sevens Series title contenders and speed dynamos",
      href: "/lists/mens-eagles-sevens-roster",
    },
    {
      title: "Collegiate Feeder Pathways",
      description: "Athletes developed through Lindenwood, Cal, Dartmouth & more",
      href: "/lists/college-pathways",
    },
  ];

  return (
    <div className="w-full z-50 sticky top-0">
      {/* 1. Top Editorial Micro Ticker Strip */}
      <div className="w-full bg-emerald-950 text-emerald-100 dark:bg-black dark:text-emerald-200/90 text-[11px] font-medium border-b border-emerald-900/60 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-4">
          {/* Left: Live Tour Status */}
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-extrabold text-amber-400 tracking-wider uppercase text-[10px] shrink-0">
              SVNS Tour
            </span>
            <span className="text-emerald-500/80 shrink-0">•</span>
            <span className="truncate">
              Next Stop: <strong className="text-white font-semibold">Hong Kong SVNS</strong> (Mar 28–30, 2026)
            </span>
            <Link
              href="/activities"
              className="hidden md:inline-flex items-center gap-0.5 text-amber-300 hover:text-white font-semibold hover:underline ml-1"
            >
              <span>Schedule</span> &rarr;
            </Link>
          </div>

          {/* Right: Quick Archive Indicators & Transparency */}
          <div className="hidden sm:flex items-center gap-4 text-[10px] font-semibold text-emerald-300/80 shrink-0">
            <span className="flex items-center gap-1">
              <Trophy className="w-3 h-3 text-amber-400" />
              <span>19 Olympians</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 text-emerald-400" />
              <span>44 National Pool Players</span>
            </span>
            <span>•</span>
            <Link
              href="/sources"
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Data Sources
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main High-Impact Header Bar */}
      <header
        ref={dropdownRef}
        className="w-full bg-background/90 dark:bg-background/95 backdrop-blur-xl border-b border-border/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)] transition-all"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20 gap-3">
            {/* Brand Logo & Editorial Crest */}
            <Link
              href="/"
              className="flex items-center gap-3 group shrink-0 select-none py-1"
            >
              <div className="relative">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 dark:from-emerald-600 dark:via-emerald-700 dark:to-emerald-900 p-0.5 flex items-center justify-center text-white shadow-md group-hover:shadow-emerald-900/30 group-hover:scale-105 transition-all">
                  <div className="w-full h-full rounded-[14px] bg-emerald-950/40 flex items-center justify-center border border-white/15">
                    <Shield className="w-6 h-6 text-amber-400 group-hover:rotate-6 transition-transform drop-shadow" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-500 border-2 border-background flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-black" />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg sm:text-xl tracking-tight text-foreground leading-none">
                    USA SEVENS
                  </span>
                  <span className="px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md bg-emerald-700/15 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-700/20 dark:border-emerald-500/30">
                    DISPATCH
                  </span>
                </div>
                <span className="text-[11px] font-medium text-muted-foreground tracking-normal mt-1 hidden sm:block">
                  Rugby Journal & Player Archive
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* Blog & Editorial Dropdown Trigger */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "stories" ? null : "stories")
                  }
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    pathname.startsWith("/blog") || activeDropdown === "stories"
                      ? "bg-emerald-900/10 text-emerald-800 dark:bg-emerald-600/20 dark:text-emerald-300 font-bold"
                      : "text-foreground/80 hover:text-foreground hover:bg-accent/60"
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Stories & Analysis</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 opacity-60 ${
                      activeDropdown === "stories" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu for Stories */}
                {activeDropdown === "stories" && (
                  <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-card border border-border shadow-xl p-3 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-muted-foreground border-b border-border/60 flex items-center justify-between">
                      <span>Editorial Series</span>
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                    </div>
                    {storiesMenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="block p-2.5 rounded-xl hover:bg-accent/80 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                          {item.description}
                        </p>
                      </Link>
                    ))}
                    <div className="pt-1.5 border-t border-border/60">
                      <Link
                        href="/blog"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between p-2 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                      >
                        <span>View All Articles & Journals</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Tour & Activities Link */}
              <Link
                href="/activities"
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  pathname.startsWith("/activities")
                    ? "bg-emerald-900/10 text-emerald-800 dark:bg-emerald-600/20 dark:text-emerald-300 font-bold"
                    : "text-foreground/80 hover:text-foreground hover:bg-accent/60"
                }`}
              >
                <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Tour Calendar</span>
                <span className="flex h-1.5 w-1.5 relative ml-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
              </Link>

              {/* Player Database Link */}
              <Link
                href="/players"
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  pathname === "/players" || (pathname.startsWith("/players/") && !pathname.startsWith("/players/compare"))
                    ? "bg-emerald-900/10 text-emerald-800 dark:bg-emerald-600/20 dark:text-emerald-300 font-bold"
                    : "text-foreground/80 hover:text-foreground hover:bg-accent/60"
                }`}
              >
                <Users className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Player Hub</span>
              </Link>

              {/* Curated Rosters Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "rosters" ? null : "rosters")
                  }
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    pathname.startsWith("/lists") || activeDropdown === "rosters"
                      ? "bg-emerald-900/10 text-emerald-800 dark:bg-emerald-600/20 dark:text-emerald-300 font-bold"
                      : "text-foreground/80 hover:text-foreground hover:bg-accent/60"
                  }`}
                >
                  <Layers className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Rosters</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 opacity-60 ${
                      activeDropdown === "rosters" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu for Rosters */}
                {activeDropdown === "rosters" && (
                  <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-card border border-border shadow-xl p-3 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-muted-foreground border-b border-border/60 flex items-center justify-between">
                      <span>Curated Lists</span>
                      <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    {rostersMenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="block p-2.5 rounded-xl hover:bg-accent/80 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                          {item.description}
                        </p>
                      </Link>
                    ))}
                    <div className="pt-1.5 border-t border-border/60">
                      <Link
                        href="/lists"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between p-2 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                      >
                        <span>Browse All Custom Lists</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Sources */}
              <Link
                href="/sources"
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  pathname === "/sources"
                    ? "bg-emerald-900/10 text-emerald-800 dark:bg-emerald-600/20 dark:text-emerald-300 font-bold"
                    : "text-foreground/80 hover:text-foreground hover:bg-accent/60"
                }`}
              >
                <Database className="w-4 h-4 opacity-75" />
                <span>Sources</span>
              </Link>
            </nav>

            {/* Right Action Utilities (Search, Olympians CTA, Theme, Mobile toggle) */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Quick Search Trigger Pill */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground text-xs font-medium transition-all cursor-pointer"
                aria-label="Open search"
              >
                <Search className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span className="hidden sm:inline">Search...</span>
                <kbd className="hidden md:inline-flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-background border border-border/80 text-muted-foreground">
                  ⌘K
                </kbd>
              </button>

              {/* Olympians Showcase Button */}
              <Link
                href="/lists/usa-olympians-in-sevens"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 hover:from-amber-500/30 hover:to-amber-500/30 text-amber-900 dark:text-amber-300 border border-amber-500/40 shadow-xs hover:shadow-md transition-all group"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span>Olympians</span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500/25 text-[10px]">19</span>
              </Link>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Hamburger Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl border border-border bg-card text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-600" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Search Modal Dialog (Command Palette Style) */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl rounded-3xl bg-card border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-border p-4">
              <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search athletes by name, college, position, or team..."
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm sm:text-base focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors ml-2 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            {/* Quick Links & Shortcuts */}
            <div className="p-4 space-y-3 bg-muted/20">
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Quick Suggested Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Perry Baker", href: "/players/usa-perry-baker" },
                  { label: "Naya Tapper", href: "/players/usa-naya-tapper" },
                  { label: "Carlin Isles", href: "/players/usa-carlin-isles" },
                  { label: "Alev Kelter", href: "/players/usa-alev-kelter" },
                  { label: "All Olympians", href: "/lists/usa-olympians-in-sevens" },
                  { label: "Tour Stops", href: "/activities" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setSearchOpen(false)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-card border border-border hover:border-emerald-600/50 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors shadow-xs"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer Tip */}
            <div className="px-4 py-2.5 bg-card border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Press <kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">Enter</kbd> to search directory</span>
              <span>Press <kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">Esc</kbd> to close</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Full-Featured Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[calc(theme(spacing.18)+32px)] sm:top-[calc(theme(spacing.20)+32px)] bottom-0 bg-background/98 backdrop-blur-2xl border-t border-border z-40 overflow-y-auto animate-in slide-in-from-top-4 duration-200">
          <div className="p-4 sm:p-6 space-y-6 max-w-md mx-auto">
            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-emerald-600" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search athletes, colleges..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-secondary/70 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </form>

            {/* Main Sections Navigation */}
            <div className="space-y-2">
              <div className="text-[11px] font-black uppercase tracking-wider text-muted-foreground px-1">
                Explore The Dispatch
              </div>

              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-card border border-border hover:border-emerald-600/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-700/10 text-emerald-700 dark:text-emerald-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">Stories & Editorial</div>
                    <div className="text-xs text-muted-foreground">Tactics, history, and deep-dive journals</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>

              <Link
                href="/activities"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-card border border-border hover:border-emerald-600/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground flex items-center gap-2">
                      <span>Tour Calendar</span>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-emerald-500 text-white">Live</span>
                    </div>
                    <div className="text-xs text-muted-foreground">World Rugby SVNS tournament stops</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>

              <Link
                href="/players"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-card border border-border hover:border-emerald-600/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-700/10 text-emerald-700 dark:text-emerald-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">Player Database</div>
                    <div className="text-xs text-muted-foreground">Complete 44 athlete pool with verified stats</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>

              <Link
                href="/lists"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-card border border-border hover:border-emerald-600/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-700/10 text-emerald-700 dark:text-emerald-400">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">Curated Rosters</div>
                    <div className="text-xs text-muted-foreground">Olympians, Eagles Men, Eagles Women</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>

              <Link
                href="/sources"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-card border border-border hover:border-emerald-600/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-secondary text-muted-foreground">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">Data Transparency</div>
                    <div className="text-xs text-muted-foreground">Sources, methodology, and citations</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            </div>

            {/* Quick Hero Banner in Mobile Menu */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 via-card to-emerald-950/10 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                <Trophy className="w-4 h-4" />
                <span>Featured Collection</span>
              </div>
              <h4 className="font-black text-sm text-foreground">
                USA Rugby Sevens Olympians
              </h4>
              <p className="text-xs text-muted-foreground">
                Explore the 19 athletes who represented Team USA in Rio, Tokyo, and Paris.
              </p>
              <Link
                href="/lists/usa-olympians-in-sevens"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline pt-1"
              >
                <span>View Olympian Roster</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Micro Footer inside drawer */}
            <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span>USA Sevens Stats & Journal</span>
              <div className="flex items-center gap-3">
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:underline">About</Link>
                <span>•</span>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:underline">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
