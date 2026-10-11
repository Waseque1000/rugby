"use client";

import React from "react";

interface AdSlotProps {
  id?: string;
  format?: "banner" | "sidebar" | "in-feed" | "horizontal";
  className?: string;
  label?: string;
}

export function AdSlot({
  id = "ad-slot",
  format = "horizontal",
  className = "",
  label = "Advertisement",
}: AdSlotProps) {
  // Disabled by default via environment variable
  const adsEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === "true";

  if (!adsEnabled) {
    // Hidden in production when disabled, with optional dev placeholder
    if (process.env.NODE_ENV === "development") {
      return (
        <div
          className={`border border-dashed border-blue-800/30 dark:border-blue-500/20 rounded-xl p-4 text-center my-6 bg-blue-950/5 dark:bg-blue-900/10 ${className}`}
        >
          <div className="text-xs uppercase tracking-wider font-semibold text-blue-800/60 dark:text-blue-400/60">
            {label} ({format}) [Disabled by NEXT_PUBLIC_ENABLE_ADS=false]
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Set NEXT_PUBLIC_ENABLE_ADS=true in .env to activate Google AdSense or sponsor slots.
          </div>
        </div>
      );
    }
    return null;
  }

  // When enabled, render the real ad slot container
  const formatClasses = {
    horizontal: "min-h-[90px] w-full max-w-4xl mx-auto",
    banner: "min-h-[250px] w-full",
    sidebar: "min-h-[600px] w-full max-w-[300px]",
    "in-feed": "min-h-[120px] w-full",
  }[format];

  return (
    <aside
      aria-label={label}
      className={`my-6 flex flex-col items-center justify-center bg-card/60 border border-border rounded-xl p-3 text-center overflow-hidden transition-all ${formatClasses} ${className}`}
    >
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </span>
      <div id={id} className="w-full h-full flex items-center justify-center">
        {/* Dynamic ad network script or iframe mounts here */}
        <span className="text-xs text-muted-foreground">Sponsor Partner Space</span>
      </div>
    </aside>
  );
}
