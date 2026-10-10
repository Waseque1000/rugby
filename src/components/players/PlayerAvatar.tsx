import React from "react";
import { Shield } from "lucide-react";

interface PlayerAvatarProps {
  name: string;
  team?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  isOlympian?: boolean;
}

export function PlayerAvatar({
  name,
  team,
  size = "md",
  className = "",
  isOlympian = false,
}: PlayerAvatarProps) {
  // Extract initials
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const isWomen = team?.toLowerCase().includes("women");

  const sizeClasses = {
    sm: "w-10 h-10 text-xs",
    md: "w-14 h-14 text-base",
    lg: "w-20 h-20 text-xl",
    xl: "w-28 h-28 text-3xl",
  }[size];

  // Distinct elegant dark green / athletic gradient
  const gradient = isWomen
    ? "from-emerald-700 via-teal-800 to-emerald-950"
    : "from-emerald-900 via-emerald-800 to-green-950";

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white font-extrabold shadow-md border-2 ${
        isOlympian ? "border-amber-400/90 shadow-amber-500/10" : "border-emerald-600/30"
      } ${sizeClasses} ${className}`}
      aria-label={`Player photo placeholder for ${name}`}
    >
      {/* Background stylized rugby seam pattern */}
      <div className="absolute inset-0 rounded-2xl opacity-15 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="w-full h-0.5 bg-white -rotate-45" />
        <div className="w-0.5 h-full bg-white -rotate-45" />
      </div>

      <span className="relative tracking-wider drop-shadow-sm">{initials || "USA"}</span>

      {isOlympian && (
        <span
          title="Olympian"
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center text-[10px] font-black shadow-sm border border-amber-200"
        >
          <Shield className="w-3 h-3 fill-amber-950 text-amber-950" />
        </span>
      )}
    </div>
  );
}
