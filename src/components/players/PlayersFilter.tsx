"use client";

import React, { useState, useMemo } from "react";
import { Player } from "@/lib/types";
import { PlayerCard } from "./PlayerCard";
import { Search, X, RotateCcw, Filter, SlidersHorizontal, Users } from "lucide-react";

interface FilterOptions {
  teams: string[];
  positions: string[];
  colleges: string[];
  states: string[];
  olympicGames: string[];
}

interface PlayersFilterProps {
  initialPlayers: Player[];
  filterOptions: FilterOptions;
}

export function PlayersFilter({ initialPlayers, filterOptions }: PlayersFilterProps) {
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const [selectedPosition, setSelectedPosition] = useState<string>("all");
  const [selectedCollege, setSelectedCollege] = useState<string>("all");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedOlympics, setSelectedOlympics] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "age" | "caps">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showFilters, setShowFilters] = useState(false);

  // Client-side filtering logic
  const filteredPlayers = useMemo(() => {
    return initialPlayers.filter((player) => {
      // 1. Text Search across name, college, hometown, position, club
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesName = player.name.toLowerCase().includes(query);
        const matchesCollege = player.college?.toLowerCase().includes(query) ?? false;
        const matchesHometown = player.hometown?.toLowerCase().includes(query) ?? false;
        const matchesPosition = player.position?.toLowerCase().includes(query) ?? false;
        const matchesClub = player.club?.toLowerCase().includes(query) ?? false;
        if (!matchesName && !matchesCollege && !matchesHometown && !matchesPosition && !matchesClub) {
          return false;
        }
      }

      // 2. Team Filter
      if (selectedTeam !== "all") {
        if (!player.team || !player.team.toLowerCase().includes(selectedTeam.toLowerCase())) {
          return false;
        }
      }

      // 3. Position Filter
      if (selectedPosition !== "all") {
        if (!player.position || !player.position.toLowerCase().includes(selectedPosition.toLowerCase())) {
          return false;
        }
      }

      // 4. College Filter
      if (selectedCollege !== "all") {
        if (!player.college || player.college !== selectedCollege) {
          return false;
        }
      }

      // 5. Hometown State Filter
      if (selectedState !== "all") {
        if (!player.hometownState || player.hometownState !== selectedState) {
          return false;
        }
      }

      // 6. Olympic Games Filter
      if (selectedOlympics !== "all") {
        if (selectedOlympics === "any") {
          if (!player.isOlympian) return false;
        } else {
          const matchEdition = player.olympicEditions.includes(selectedOlympics);
          const rawMatch = player.olympicGames?.toLowerCase().includes(selectedOlympics.toLowerCase()) ?? false;
          const debutMatch = player.debut?.toLowerCase().includes(selectedOlympics.toLowerCase()) ?? false;
          if (!matchEdition && !rawMatch && !debutMatch) return false;
        }
      }

      return true;
    });
  }, [
    initialPlayers,
    search,
    selectedTeam,
    selectedPosition,
    selectedCollege,
    selectedState,
    selectedOlympics,
  ]);

  // Client-side sorting logic
  const sortedPlayers = useMemo(() => {
    const list = [...filteredPlayers];
    list.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "age") {
        const ageA = a.age ?? (sortOrder === "asc" ? 999 : -1);
        const ageB = b.age ?? (sortOrder === "asc" ? 999 : -1);
        comparison = ageA - ageB;
      } else if (sortBy === "caps") {
        const capsA = a.caps ?? -1;
        const capsB = b.caps ?? -1;
        comparison = capsA - capsB;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
    return list;
  }, [filteredPlayers, sortBy, sortOrder]);

  const activeFilterCount = [
    selectedTeam !== "all",
    selectedPosition !== "all",
    selectedCollege !== "all",
    selectedState !== "all",
    selectedOlympics !== "all",
    Boolean(search.trim()),
  ].filter(Boolean).length;

  const resetAllFilters = () => {
    setSearch("");
    setSelectedTeam("all");
    setSelectedPosition("all");
    setSelectedCollege("all");
    setSelectedState("all");
    setSelectedOlympics("all");
    setSortBy("name");
    setSortOrder("asc");
  };

  return (
    <div className="space-y-6">
      {/* Search Bar & Quick Controls */}
      <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Main search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by player name, college, hometown, position..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all placeholder:text-muted-foreground"
              aria-label="Search players"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Team Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-secondary rounded-xl self-start md:self-auto">
            <button
              onClick={() => setSelectedTeam("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedTeam === "all"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Teams
            </button>
            <button
              onClick={() => setSelectedTeam("men")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedTeam === "men"
                  ? "bg-card text-emerald-800 dark:text-emerald-300 shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Men&apos;s 7s
            </button>
            <button
              onClick={() => setSelectedTeam("women")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedTeam === "women"
                  ? "bg-card text-teal-800 dark:text-teal-300 shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Women&apos;s 7s
            </button>
          </div>

          {/* Mobile Filter Toggle & Sort selector */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex md:hidden items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-background text-xs font-semibold text-foreground cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters ({activeFilterCount})</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground ml-auto">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <label htmlFor="sort-select" className="sr-only">Sort by</label>
              <select
                id="sort-select"
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split("-") as [
                    "name" | "age" | "caps",
                    "asc" | "desc"
                  ];
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="bg-background border border-border text-foreground rounded-xl px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-emerald-600 focus:outline-none cursor-pointer"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="age-asc">Age (Youngest)</option>
                <option value="age-desc">Age (Oldest)</option>
                <option value="caps-desc">Caps (Highest)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Detailed Filter Grid (always visible on desktop, toggleable on mobile) */}
        <div className={`pt-3 border-t border-border/70 ${showFilters ? "block" : "hidden md:block"}`}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {/* Position Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase mb-1">
                Position
              </label>
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="w-full bg-background border border-border text-foreground rounded-xl px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="all">All Positions</option>
                {filterOptions.positions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>

            {/* Olympic Games Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase mb-1">
                Olympic Games
              </label>
              <select
                value={selectedOlympics}
                onChange={(e) => setSelectedOlympics(e.target.value)}
                className="w-full bg-background border border-border text-foreground rounded-xl px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="all">All Athletes</option>
                <option value="any">Any Olympic Selection</option>
                {filterOptions.olympicGames.map((game) => (
                  <option key={game} value={game}>
                    {game}
                  </option>
                ))}
              </select>
            </div>

            {/* College Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase mb-1">
                College / University
              </label>
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="w-full bg-background border border-border text-foreground rounded-xl px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="all">All Colleges</option>
                {filterOptions.colleges.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>

            {/* Hometown State Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase mb-1">
                Hometown State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-background border border-border text-foreground rounded-xl px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="all">All States</option>
                {filterOptions.states.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filters summary & Reset button */}
          {activeFilterCount > 0 && (
            <div className="flex items-center justify-between gap-2 mt-3 pt-2 text-xs">
              <span className="text-muted-foreground">
                Showing <strong>{sortedPlayers.length}</strong> of {initialPlayers.length} athletes
              </span>
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1 text-emerald-800 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset all filters</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-emerald-600" />
          <span>Showing <strong>{sortedPlayers.length}</strong> player profiles</span>
        </span>
      </div>

      {/* Player Grid */}
      {sortedPlayers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {sortedPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card border border-dashed border-border rounded-2xl p-8">
          <Users className="w-10 h-10 text-muted-foreground/60 mx-auto mb-3" />
          <h3 className="font-bold text-base text-foreground mb-1">No player profiles found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-4">
            No athletes matched your selected search criteria. Try removing or adjusting one of the active filters.
          </p>
          <button
            onClick={resetAllFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 dark:bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-900 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
