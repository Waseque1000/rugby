import React from "react";
import Link from "next/link";
import { Player } from "@/lib/types";
import { PlayerAvatar } from "./PlayerAvatar";
import { MapPin, GraduationCap, Trophy, ChevronRight } from "lucide-react";

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  const isWomen = player.team?.toLowerCase().includes("women");
  const card = (
    <>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-800 via-blue-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <PlayerAvatar name={player.name} team={player.team} size="md" isOlympian={player.isOlympian} />
          <div className="flex flex-col items-end gap-1">
            {player.team && (
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${isWomen ? "bg-rose-950/15 text-rose-700 dark:text-rose-300 dark:bg-rose-900/40" : "bg-blue-950/15 text-blue-800 dark:text-blue-300 dark:bg-blue-900/40"}`}>
                {player.team}
              </span>
            )}
            {player.isOlympian && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                <Trophy className="w-3 h-3" /> Olympian
              </span>
            )}
          </div>
        </div>
        <h3 className="font-extrabold text-base sm:text-lg text-foreground group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
          {player.name}
        </h3>
        {player.position && <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mt-0.5">{player.position}</p>}
        <div className="mt-3.5 space-y-1.5 text-xs text-muted-foreground">
          {player.hometown && <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-blue-600/70 flex-shrink-0" /><span className="line-clamp-1">{player.hometown}</span></div>}
          {player.college && <div className="flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-blue-600/70 flex-shrink-0" /><span className="line-clamp-1">{player.college}</span></div>}
          {player.age !== null && <div className="text-[11px] text-muted-foreground/90 pt-0.5">Age: <span className="font-medium text-foreground">{player.age}</span></div>}
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          {player.caps !== null && <div><span className="text-[10px] text-muted-foreground block uppercase">Caps</span><span className="font-bold text-foreground">{player.caps}</span></div>}
          {player.tries !== null && <div><span className="text-[10px] text-muted-foreground block uppercase">Tries</span><span className="font-bold text-blue-700 dark:text-blue-400">{player.tries}</span></div>}
        </div>
        {player.indexable && <span className="inline-flex items-center gap-1 font-semibold text-blue-700 dark:text-blue-400 ml-auto text-xs">View Profile <ChevronRight className="w-3.5 h-3.5" /></span>}
      </div>
      {!player.indexable && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Roster listing; more verified profile details are needed.</p>}
    </>
  );

  const className = "group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-5 overflow-hidden";

  return player.indexable ? (
    <Link href={`/players/${player.slug}`} className={`${className} hover:border-blue-600/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}>
      {card}
    </Link>
  ) : (
    <article className={className}>{card}</article>
  );
}
