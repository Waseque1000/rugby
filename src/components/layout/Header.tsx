"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Menu, X, Users, ListFilter, BookOpen, Database, Info, Trophy } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/players", label: "Players Directory", icon: Users },
  { href: "/lists", label: "Curated Lists", icon: ListFilter },
  { href: "/blog", label: "Articles & Analysis", icon: BookOpen },
  { href: "/sources", label: "Data Sources", icon: Database },
  { href: "/about", label: "About", icon: Info },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 dark:from-emerald-600 dark:to-emerald-900 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-amber-400 group-hover:rotate-6 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight leading-none text-foreground flex items-center gap-1.5">
                USA Sevens <span className="text-emerald-700 dark:text-emerald-400">Stats</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-0.5">
                Eagles Sevens Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-emerald-900/10 text-emerald-800 dark:bg-emerald-600/20 dark:text-emerald-300 font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-75" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions: Fast Olympian shortcut, ThemeToggle, Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <Link
              href="/lists/usa-olympians-in-sevens"
              className="hidden lg:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 transition-all"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Olympians</span>
            </Link>

            <ThemeToggle />

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-border bg-background text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-emerald-900/10 text-emerald-800 dark:bg-emerald-600/20 dark:text-emerald-300 font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-border/60">
            <Link
              href="/lists/usa-olympians-in-sevens"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold text-xs border border-amber-500/30"
            >
              <Trophy className="w-4 h-4" />
              <span>Explore USA Sevens Olympians</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
