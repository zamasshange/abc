"use client";

import { motion } from "framer-motion";
import type { GameColorName } from "@/lib/game-colors";
import { getGameColor } from "@/lib/game-colors";
import { playTapSound } from "@/lib/audio";

export const GAME_TAP_TRANSITION = {
  duration: 0.15,
  type: "spring" as const,
  stiffness: 600,
  damping: 35,
};

export type GameButtonSize = "sm" | "md" | "lg";

const sizeMap: Record<GameButtonSize, { outer: string; icon: string }> = {
  sm: { outer: "h-16 w-16 min-h-[64px] min-w-[64px]", icon: "h-6 w-6" },
  md: { outer: "h-[72px] w-[72px] min-h-[72px] min-w-[72px]", icon: "h-7 w-7" },
  lg: { outer: "h-20 w-20 min-h-[80px] min-w-[80px]", icon: "h-8 w-8" },
};

export function raisedShadow(shadowColor: string) {
  return `0 6px 0 ${shadowColor}, 0 10px 20px rgba(0,0,0,0.22)`;
}

export function pressedShadow(shadowColor: string) {
  return `0 2px 0 ${shadowColor}, 0 4px 8px rgba(0,0,0,0.14)`;
}

type GameButtonCoreProps = {
  color: GameColorName;
  size?: GameButtonSize;
  shape: "circle" | "square";
  wide?: boolean;
  selected?: boolean;
  disabled?: boolean;
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  playSound?: boolean;
};

export function GameButtonCore({
  color,
  size = "md",
  shape,
  wide,
  selected,
  disabled,
  label,
  onClick,
  children,
  className = "",
  playSound = true,
}: GameButtonCoreProps) {
  const palette = getGameColor(color);
  const dims = sizeMap[size];
  const isCircle = shape === "circle";

  const shapeClass = isCircle
    ? `${dims.outer} rounded-full`
    : wide
      ? "h-[72px] min-h-[64px] min-w-[88px] rounded-2xl px-4"
      : `${dims.outer} rounded-2xl`;

  const handleClick = () => {
    if (disabled) return;
    if (playSound) playTapSound();
    onClick?.();
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={selected}
      className={`relative shrink-0 touch-manipulation select-none ${shapeClass} ${className}`}
      style={{
        boxShadow: raisedShadow(palette.shadow),
        border: `4px solid ${palette.ring}`,
        background: `linear-gradient(180deg, ${palette.light} 0%, ${palette.base} 50%, ${palette.base} 100%)`,
        outline: selected ? "3px solid #fff" : undefined,
        outlineOffset: selected ? "2px" : undefined,
        opacity: disabled ? 0.5 : 1,
      }}
      whileTap={{
        scale: 0.95,
        y: 3,
        boxShadow: pressedShadow(palette.shadow),
      }}
      transition={GAME_TAP_TRANSITION}
    >
      {/* Layer 3: top highlight gradient */}
      <span
        className={`pointer-events-none absolute inset-x-[12%] top-[6%] h-[38%] bg-gradient-to-b from-white/50 to-transparent ${isCircle ? "rounded-full" : "rounded-xl"}`}
        aria-hidden
      />
      {/* Layer 4: icon / content */}
      <span className="relative z-10 flex h-full w-full items-center justify-center">
        {children}
      </span>
    </motion.button>
  );
}

export { sizeMap as gameButtonSizes };
