import React from "react";
import Link from "next/link";
import { Player } from "@/lib/types";
import { PlayerAvatar } from "./PlayerAvatar";
import { MapPin, GraduationCap, Trophy, ChevronRight, CalendarDays, ShieldCheck } from "lucide-react";

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  const isWomen = player.team?.toLowerCase().includes("women");
  const accent = isWomen
    ? "from-rose-500 via-pink-300 to-orange-200"
    : "from-blue-700 via-sky-400 to-cyan-200";
  const teamBadge = isWomen
    ? "bg-rose-50 text-rose-700 ring-rose-100"
    : "bg-blue-50 text-blue-800 ring-blue-100";

  const card = (
    <>
      <div className={`relative h-[176px] overflow-hidden bg-gradient-to-br ${isWomen ? "from-rose-50 via-pink-50 to-orange-50" : "from-blue-50 via-sky-50 to-cyan-50"}`}>
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
        <div className={`absolute -right-8 -top-14 h-36 w-36 rounded-full ${isWomen ? "bg-rose-100/60" : "bg-blue-100/70"}`} />
        <div className={`absolute right-12 -top-16 h-28 w-28 rounded-full border ${isWomen ? "border-rose-200/70" : "border-blue-200/70"}`} />

        <div className="absolute left-5 top-4 z-10 rounded-[1.65rem] bg-white p-1.5 shadow-lg ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.04]">
          <PlayerAvatar
            name={player.name}
            team={player.team}
            imageUrl={player.imageUrl}
            imageAlt={player.imageAlt}
            size="2xl"
            isOlympian={player.isOlympian}
            className="rounded-[1.35rem] border-0 shadow-none"
          />
        </div>

        <div className="absolute right-4 top-4 z-10 flex max-w-[58%] flex-col items-end gap-2">
          {player.team && (
            <span className={`max-w-full truncate rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] ring-1 ${teamBadge}`}>
              {player.team}
            </span>
          )}
          {player.isOlympian && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-800 shadow-sm">
              <Trophy className="h-3 w-3" aria-hidden="true" /> Olympian
            </span>
          )}
        </div>
      </div>

      <div className="flex min-h-[224px] flex-1 flex-col px-5 pb-4 pt-4">
        <div className="min-h-[57px]">
          <h3 className="line-clamp-1 text-lg font-extrabold tracking-tight text-slate-950 transition-colors group-hover:text-blue-700">
            {player.name}
          </h3>
          {player.position ? (
            <p className={`mt-1 text-sm font-bold ${isWomen ? "text-rose-700" : "text-blue-700"}`}>
              {player.position}
            </p>
          ) : (
            <p className="mt-1 text-sm font-medium text-slate-400">USA Rugby athlete</p>
          )}
        </div>

        <div className="mt-3 flex flex-1 flex-col gap-2.5 text-[13px] text-slate-600">
          {player.hometown && (
            <div className="flex min-w-0 items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-blue-500" aria-hidden="true" />
              <span className="truncate">{player.hometown}</span>
            </div>
          )}
          {player.college && (
            <div className="flex min-w-0 items-center gap-2">
              <GraduationCap className="h-4 w-4 shrink-0 text-blue-500" aria-hidden="true" />
              <span className="truncate">{player.college}</span>
            </div>
          )}
          {player.age !== null && (
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 shrink-0 text-blue-500" aria-hidden="true" />
              <span>Age <strong className="font-bold text-slate-800">{player.age}</strong></span>
            </div>
          )}
          {!player.hometown && !player.college && player.age === null && (
            <p className="text-xs leading-relaxed text-slate-500">Roster information is being verified.</p>
          )}
        </div>

        {(player.caps !== null || player.tries !== null || player.points !== null) && (
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3">
            {[
              { label: "Caps", value: player.caps },
              { label: "Tries", value: player.tries },
              { label: "Points", value: player.points },
            ].filter((stat) => stat.value !== null).map((stat) => (
              <div key={stat.label} className="rounded-xl bg-slate-50 px-2 py-2 text-center">
                <span className="block text-sm font-extrabold tabular-nums text-slate-900">{stat.value}</span>
                <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          {player.indexable ? (
            <>
              <span className="text-[11px] font-medium text-slate-400">Player profile</span>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-blue-700 transition-all group-hover:gap-2">
                View profile <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" /> Roster entry · details being verified
            </span>
          )}
        </div>
      </div>
    </>
  );

  const className = "group relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_36px_rgba(30,64,175,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2";

  return player.indexable ? (
    <Link href={`/players/${player.slug}`} className={className} aria-label={`View ${player.name}'s player profile`}>
      {card}
    </Link>
  ) : (
    <article className={className}>{card}</article>
  );
}
