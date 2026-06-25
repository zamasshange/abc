"use client";

import type { CategoryId } from "@/lib/theme";
import { categoryThemes } from "@/lib/categoryTheme";

type CategoryIconBadgeProps = {
  categoryId: CategoryId;
  size?: "sm" | "md";
  isHovered?: boolean;
};

const sizes = {
  sm: { outer: "h-9 w-9 sm:h-10 sm:w-10", icon: "h-[18px] w-[18px] sm:h-5 sm:w-5" },
  md: { outer: "h-11 w-11 sm:h-12 sm:w-12", icon: "h-5 w-5 sm:h-6 sm:w-6" },
};

export function CategoryIconBadge({ categoryId, size = "md", isHovered = false }: CategoryIconBadgeProps) {
  const { icon: Icon, iconGradient, glowColor } = categoryThemes[categoryId];
  const dim = sizes[size];

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-full bg-white/30 backdrop-blur-md ring-2 ring-white/45 ${dim.outer}`}
      style={{
        boxShadow: `0 6px 16px ${glowColor}, 0 2px 6px rgba(0,0,0,0.12), inset 0 2px 4px rgba(255,255,255,0.55)`,
      }}
    >
      <div
        className={`pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br ${iconGradient} opacity-30`}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-[2px] rounded-full bg-gradient-to-b from-white/55 via-white/15 to-transparent"
        aria-hidden
      />
      <Icon
        className={`relative z-10 ${dim.icon} text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] transition-transform duration-300 ${isHovered ? "scale-110 rotate-6" : ""}`}
        strokeWidth={2.5}
        aria-hidden
      />
    </div>
  );
}
