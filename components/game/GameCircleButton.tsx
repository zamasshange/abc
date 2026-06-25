"use client";

import type { GameColorName } from "@/lib/game-colors";
import { GameButtonCore, type GameButtonSize } from "./GameButtonCore";

type GameCircleButtonProps = {
  color: GameColorName;
  size?: GameButtonSize;
  selected?: boolean;
  disabled?: boolean;
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  playSound?: boolean;
};

export function GameCircleButton({
  color,
  size = "md",
  selected,
  disabled,
  label,
  onClick,
  children,
  className,
  playSound,
}: GameCircleButtonProps) {
  return (
    <GameButtonCore
      color={color}
      size={size}
      shape="circle"
      selected={selected}
      disabled={disabled}
      label={label}
      onClick={onClick}
      className={className}
      playSound={playSound}
    >
      {children}
    </GameButtonCore>
  );
}
