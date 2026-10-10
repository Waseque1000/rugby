import React from "react";
import { Users, Trophy, Shield, GraduationCap } from "lucide-react";

interface StatItem {
  label: string;
  value: number | string;
  icon: "users" | "trophy" | "men" | "women" | "college";
  description?: string;
}

interface StatCounterProps {
  stats: {
    totalPlayers: number;
    olympians: number;
    mensCount: number;
    womensCount: number;
    collegesCount: number;
  };
}

export function StatCounter({ stats }: StatCounterProps) {
  const items: StatItem[] = [
    {
      label: "Indexed Players",
      value: stats.totalPlayers,
      icon: "users",
      description: "USA national sevens pool",
    },
    {
      label: "USA Olympians",
      value: stats.olympians,
      icon: "trophy",
      description: "Rio, Tokyo & Paris Games",
    },
    {
      label: "Men's Eagles 7s",
      value: stats.mensCount,
      icon: "men",
      description: "Captains & World Series stars",
    },
    {
      label: "Women's Eagles 7s",
      value: stats.womensCount,
      icon: "women",
      description: "SVNS medalists & pioneers",
    },
    {
      label: "College Programs",
      value: stats.collegesCount,
      icon: "college",
      description: "Collegiate feeder pathways",
    },
  ];

  const getIcon = (type: StatItem["icon"]) => {
    switch (type) {
      case "users":
        return <Users className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />;
      case "trophy":
        return <Trophy className="w-5 h-5 text-amber-500" />;
      case "men":
        return <Shield className="w-5 h-5 text-emerald-800 dark:text-emerald-300" />;
      case "women":
        return <Shield className="w-5 h-5 text-teal-700 dark:text-teal-300" />;
      case "college":
        return <GraduationCap className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 w-full">
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`flex flex-col justify-between p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-xs transition-all hover:border-emerald-500/40 ${
            idx === items.length - 1 ? "col-span-2 md:col-span-1" : ""
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {item.label}
            </span>
            <div className="p-1.5 rounded-lg bg-secondary/80">{getIcon(item.icon)}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              {item.value}
            </div>
            {item.description && (
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
