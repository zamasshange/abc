"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { CategoryId } from "@/lib/theme";
import { categoryThemes } from "@/lib/categoryTheme";
import { playTapSound } from "@/lib/audio";
import { CategoryIconBadge } from "./CategoryIconBadge";

type CategoryCardProps = {
  id: CategoryId;
  label: string;
  isActive: boolean;
  onSelect: (id: CategoryId) => void;
  index?: number;
  compact?: boolean;
};

export function CategoryCard({
  id,
  label,
  isActive,
  onSelect,
  index = 0,
  compact = false,
}: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { cardGradient, glowColor } = categoryThemes[id];

  return (
    <motion.button
      type="button"
      onClick={() => {
        playTapSound();
        onSelect(id);
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      aria-pressed={isActive}
      aria-label={label}
      className={`relative flex w-full min-h-[52px] touch-manipulation items-center justify-between overflow-hidden rounded-3xl bg-gradient-to-br px-3 py-2.5 sm:min-h-[58px] sm:px-4 sm:py-3 ${cardGradient} ${compact ? "sm:px-3" : ""} ${isActive ? "ring-[3px] ring-white/70 ring-offset-1 ring-offset-white/20" : "ring-1 ring-white/30"}`}
      style={{
        boxShadow: isActive
          ? `0 10px 28px ${glowColor}, 0 4px 0 rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.45)`
          : `0 6px 20px ${glowColor}, 0 3px 0 rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.4)`,
      }}
      initial={{ opacity: 0, y: 18, scale: 0.92 }}
      animate={{
        opacity: 1,
        y: isActive ? -2 : 0,
        scale: isActive ? 1.03 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 26,
        delay: index * 0.05,
      }}
      whileHover={{
        scale: isActive ? 1.05 : 1.06,
        y: -5,
        boxShadow: `0 14px 32px ${glowColor}, 0 5px 0 rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.5)`,
      }}
      whileTap={{ scale: 0.96, y: 1 }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/40 via-white/15 to-transparent backdrop-blur-[1px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-[8%] bottom-0 h-[18%] rounded-t-full bg-black/10 blur-md"
        aria-hidden
      />

      <span
        className={`relative z-10 font-extrabold leading-tight tracking-wide text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)] ${compact ? "text-sm sm:text-base" : "text-base sm:text-lg"}`}
      >
        {label}
      </span>

      <CategoryIconBadge categoryId={id} size={compact ? "sm" : "md"} isHovered={isHovered} />
    </motion.button>
  );
}
