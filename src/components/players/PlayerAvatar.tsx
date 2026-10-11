"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";

interface PlayerAvatarProps {
  name: string;
  imageUrl?: string | null;
  imageAlt?: string | null;
  team?: string | null;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  isOlympian?: boolean;
}

export function PlayerAvatar({
  name,
  imageUrl,
  imageAlt,
  team,
  size = "md",
  className = "",
  isOlympian = false,
}: PlayerAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  // Extract initials
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const isWomen = team?.toLowerCase().includes("women");

  const sizeDimensions = {
    sm: { px: 40, classes: "w-10 h-10 text-xs" },
    md: { px: 56, classes: "w-14 h-14 text-base" },
    lg: { px: 80, classes: "w-20 h-20 text-xl" },
    xl: { px: 112, classes: "w-28 h-28 text-3xl" },
    "2xl": { px: 144, classes: "w-36 h-36 text-4xl" },
  }[size];

  // Distinct athletic USA gradient
  const gradient = isWomen
    ? "from-rose-700 via-red-800 to-slate-950"
    : "from-blue-700 via-blue-900 to-slate-950";

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white font-extrabold shadow-md border-2 overflow-hidden flex-shrink-0 ${
        isOlympian ? "border-amber-400/90 shadow-amber-500/10" : "border-blue-600/30"
      } ${sizeDimensions.classes} ${className}`}
      aria-label={`Player initials for ${name}`}
    >
      <>
          {/* Background stylized rugby seam pattern */}
          <div className="absolute inset-0 rounded-2xl opacity-15 overflow-hidden pointer-events-none flex items-center justify-center">
            <div className="w-full h-0.5 bg-white -rotate-45" />
            <div className="w-0.5 h-full bg-white -rotate-45" />
          </div>

          {imageUrl && !imageFailed && (
            <Image
              src={imageUrl}
              alt={imageAlt || `${name} - USA Rugby Sevens Player`}
              width={sizeDimensions.px}
              height={sizeDimensions.px}
              unoptimized
              preload={size === "xl"}
              onError={() => setImageFailed(true)}
              className="absolute inset-0 z-[1] h-full w-full object-cover"
            />
          )}
          <span className="relative z-[2] tracking-wider drop-shadow-sm">
            {imageFailed || !imageUrl ? initials || "USA" : null}
          </span>
      </>

      {isOlympian && (
        <span
          title="USA Olympian"
          className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center text-[9px] font-black shadow-sm border border-amber-200 z-10"
        >
          ★
        </span>
      )}
    </div>
  );
}
