"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Search,
  ArrowRight,
  Flame,
  Trophy,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface NavLink {
  href: string;
  label: string;
  hasDot?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { href: "/blog", label: "Stories" },
  { href: "/activities", label: "Tour", hasDot: true },
  { href: "/players", label: "Players" },
  { href: "/lists", label: "Rosters" },
  { href: "/sources", label: "Sources" },
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

  // Global keyboard shortcut: Cmd+K / Ctrl+K or / to open search, Escape to close
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
      {/* Floating Island Navigation Container */}
      <header className="sticky top-3 sm:top-4 z-40 w-full px-3 sm:px-6 pointer-events-none">
        <div className="max-w-5xl mx-auto pointer-events-auto">
          <div className="relative flex items-center justify-between h-14 sm:h-15 px-3.5 sm:px-5 rounded-2xl sm:rounded-full bg-background/80 dark:bg-zinc-950/75 backdrop-blur-xl border border-border/70 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all">
            
            {/* Left: Minimalist Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group select-none py-1 shrink-0"
            >
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-950 dark:from-emerald-600 dark:to-emerald-900 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <span className="font-black text-xs tracking-tighter">7s</span>
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-background"></span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  USA Sevens
                </span>
                <span className="hidden md:inline-block text-[10px] font-mono uppercase text-muted-foreground tracking-wider">
                  Journal
                </span>
              </div>
            </Link>

            {/* Center: Clean Floating Nav Pill Links */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? "bg-emerald-800 text-white dark:bg-emerald-500/20 dark:text-emerald-300 font-bold shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{link.label}</span>
                      {link.hasDot && (
                        <span className="flex h-1.5 w-1.5 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                      )}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Right: Quick Search Pill, ThemeToggle & Mobile Trigger */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Raycast-style Search Pill Trigger */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 h-8 px-2.5 sm:px-3 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground text-xs font-medium border border-border/50 transition-all cursor-pointer"
                aria-label="Search athletes and articles"
              >
                <Search className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline text-[11px]">Search</span>
                <kbd className="hidden lg:inline-flex items-center text-[10px] font-mono px-1.5 py-0.2 rounded bg-background border border-border/80 text-muted-foreground">
                  ⌘K
                </kbd>
              </button>

              {/* Minimal Olympians Badge */}
              <Link
                href="/lists/usa-olympians-in-sevens"
                className="hidden sm:inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 transition-all"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>Olympians</span>
              </Link>

              {/* Minimal Theme Switcher */}
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden flex items-center justify-center w-8 h-8 rounded-full border border-border/70 bg-card text-foreground hover:bg-muted transition-colors cursor-pointer"
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Floating Mobile Dropdown Menu Card */}
          {mobileOpen && (
            <div className="md:hidden mt-2 p-3 rounded-2xl bg-background/95 dark:bg-zinc-950/95 backdrop-blur-2xl border border-border/80 dark:border-white/10 shadow-2xl space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? "bg-emerald-800 text-white dark:bg-emerald-500/20 dark:text-emerald-300"
                        : "text-foreground/80 hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{link.label}</span>
                      {link.hasDot && (
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-emerald-500 text-white">
                          Live
                        </span>
                      )}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </Link>
                );
              })}

              <div className="pt-2 border-t border-border/60">
                <Link
                  href="/lists/usa-olympians-in-sevens"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30"
                >
                  <span className="flex items-center gap-2">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    <span>USA Olympians (19)</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Raycast-style Minimal Command Palette Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32 px-4 bg-black/60 dark:bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl bg-card border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Input Bar */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-border p-3.5 sm:p-4">
              <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-3 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search athletes, colleges, Olympic rosters..."
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm focus:outline-none font-medium"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ml-2 cursor-pointer"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Suggestions */}
            <div className="p-3.5 space-y-2 bg-muted/20">
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-1 flex items-center gap-1.5">
                <Flame className="w-3 h-3 text-amber-500" />
                <span>Popular Searches</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "Perry Baker", href: "/players/usa-perry-baker" },
                  { label: "Naya Tapper", href: "/players/usa-naya-tapper" },
                  { label: "Carlin Isles", href: "/players/usa-carlin-isles" },
                  { label: "Alev Kelter", href: "/players/usa-alev-kelter" },
                  { label: "Olympians", href: "/lists/usa-olympians-in-sevens" },
                  { label: "Tour Stops", href: "/activities" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setSearchOpen(false)}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-card border border-border hover:border-emerald-600/50 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors shadow-xs"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Command Palette Keyboard Hints */}
            <div className="px-4 py-2 bg-muted/40 border-t border-border flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <span>Press <kbd className="px-1 py-0.5 rounded bg-card border border-border">Enter</kbd> to search</span>
              <span>Press <kbd className="px-1 py-0.5 rounded bg-card border border-border">Esc</kbd> to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
