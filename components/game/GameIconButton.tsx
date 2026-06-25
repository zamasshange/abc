"use client";

import type { GameColorName } from "@/lib/game-colors";
import { GameCircleButton } from "./GameCircleButton";
import { gameButtonSizes, type GameButtonSize } from "./GameButtonCore";

type GameIconButtonProps = {
  color: GameColorName;
  size?: GameButtonSize;
  selected?: boolean;
  disabled?: boolean;
  label: string;
  onClick?: () => void;
  icon: React.ReactNode;
  className?: string;
  playSound?: boolean;
};

/** Circular raised game button with a single icon — preferred for toolbars */
export function GameIconButton({
  color,
  size = "md",
  selected,
  disabled,
  label,
  onClick,
  icon,
  className,
  playSound,
}: GameIconButtonProps) {
  const iconSize = gameButtonSizes[size].icon;
  return (
    <GameCircleButton
      color={color}
      size={size}
      selected={selected}
      disabled={disabled}
      label={label}
      onClick={onClick}
      className={className}
      playSound={playSound}
    >
      <span className={`flex items-center justify-center ${iconSize}`}>{icon}</span>
    </GameCircleButton>
  );
}
