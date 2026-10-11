"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Trophy, ChevronRight } from "lucide-react";
import { Player } from "@/lib/types";
import { PlayerAvatar } from "./PlayerAvatar";

interface QuickSearchProps {
  players: Player[];
}

export function QuickSearch({ players }: QuickSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const results = query.trim()
    ? players
        .filter((p) => p.indexable)
        .filter((p) => {
          const q = query.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.college?.toLowerCase().includes(q) ||
            p.position?.toLowerCase().includes(q) ||
            p.hometown?.toLowerCase().includes(q)
          );
        })
        .slice(0, 5)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (slug: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/players/${slug}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/players?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search USA Sevens players (e.g., Perry Baker, Alev Kelter, Cal, Wing)..."
            className="w-full pl-12 pr-28 py-3.5 sm:py-4 rounded-2xl border-2 border-blue-900/20 dark:border-blue-600/30 bg-background/95 backdrop-blur-md text-foreground text-sm sm:text-base focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 shadow-xl transition-all placeholder:text-muted-foreground"
            aria-label="Search players by name, college, or position"
          />
          <button
            type="submit"
            className="absolute right-2 px-4 py-2 sm:py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>

      {/* Instant Dropdown Suggestions */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-2 divide-y divide-border/60">
            {results.map((player) => (
              <button
                key={player.id}
                onClick={() => handleSelect(player.slug)}
                className="w-full flex items-center justify-between p-3 text-left hover:bg-accent/80 rounded-xl transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <PlayerAvatar
                    name={player.name}
                    team={player.team}
                    imageUrl={player.imageUrl}
                    imageAlt={player.imageAlt}
                    size="sm"
                    isOlympian={false}
                  />
                  <div>
                    <div className="font-bold text-sm text-foreground group-hover:text-blue-700 dark:group-hover:text-blue-400 flex items-center gap-2">
                      <span>{player.name}</span>
                      {player.isOlympian && (
                        <Trophy className="w-3.5 h-3.5 text-amber-500 inline" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {[player.team, player.position, player.college].filter(Boolean).join(" • ")}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>

          <div className="bg-secondary/60 px-4 py-2.5 border-t border-border flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Press enter to view all matches</span>
            <button
              onClick={() => {
                setIsOpen(false);
                router.push(`/players`);
              }}
              className="font-semibold text-blue-700 dark:text-blue-400 hover:underline"
            >
              Browse Full Directory &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
