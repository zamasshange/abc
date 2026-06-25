"use client";

import { motion } from "framer-motion";
import { playTapSound } from "@/lib/audio";
import { GAME_TAP_TRANSITION, pressedShadow, raisedShadow } from "./GameButtonCore";

type GameMenuButtonProps = {
  label: string;
  isActive?: boolean;
  row?: "top" | "bottom";
  bgColor: string;
  ringColor: string;
  lightColor: string;
  shadowColor: string;
  textOutline: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
};

function OutlinedLabel({ children, outlineColor, size = "sm" }: { children: string; outlineColor: string; size?: "sm" | "md" }) {
  const textSize = size === "md" ? "text-[13px] sm:text-[15px]" : "text-[11px] sm:text-[13px]";
  return (
    <span
      className={`font-extrabold leading-none tracking-wide text-white ${textSize}`}
      style={{
        textShadow: `2px 2px 0 ${outlineColor}, -1px -1px 0 ${outlineColor}, 1px -1px 0 ${outlineColor}, -1px 1px 0 ${outlineColor}, 0 2px 0 ${outlineColor}`,
      }}
    >
      {children}
    </span>
  );
}

/** Horizontal tab-style menu button for top navigation — toy-like raised tabs */
export function GameMenuButton({
  label,
  isActive,
  row = "top",
  bgColor,
  ringColor,
  lightColor,
  shadowColor,
  textOutline,
  onClick,
  children,
  className = "",
}: GameMenuButtonProps) {
  const isBottomActive = row === "bottom" && isActive;
  const borderRadius = row === "top" ? "14px 14px 0 0" : isBottomActive ? "0 0 14px 14px" : "0";

  return (
    <motion.button
      type="button"
      onClick={() => { playTapSound(); onClick?.(); }}
      aria-pressed={isActive}
      className={`relative flex flex-1 items-center justify-center gap-1 px-0.5 sm:gap-1.5 sm:px-1 ${className}`}
      style={{
        borderRadius,
        border: `3px solid ${ringColor}`,
        borderBottom: row === "top" && !isActive ? `5px solid ${ringColor}` : undefined,
        background: `linear-gradient(180deg, ${lightColor} 0%, ${bgColor} 45%, ${bgColor} 100%)`,
        boxShadow: isActive ? pressedShadow(shadowColor) : raisedShadow(shadowColor),
        paddingTop: row === "top" ? (isActive ? "9px" : "6px") : isBottomActive ? "11px" : "7px",
        paddingBottom: isBottomActive ? "14px" : row === "bottom" ? "8px" : "6px",
        marginBottom: isBottomActive ? "-10px" : 0,
        zIndex: isActive ? 20 : 1,
      }}
      whileTap={{
        scale: 0.95,
        y: 3,
        boxShadow: pressedShadow(shadowColor),
      }}
      transition={GAME_TAP_TRANSITION}
    >
      <span
        className="pointer-events-none absolute inset-x-[8%] top-[5%] h-[32%] rounded-t-xl bg-gradient-to-b from-white/40 to-transparent"
        aria-hidden
      />
      <OutlinedLabel outlineColor={textOutline} size={row === "bottom" ? "md" : "sm"}>
        {label}
      </OutlinedLabel>
      {children}
    </motion.button>
  );
}
