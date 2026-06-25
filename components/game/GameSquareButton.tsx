"use client";

import type { GameColorName } from "@/lib/game-colors";
import { GameButtonCore, type GameButtonSize } from "./GameButtonCore";

type GameSquareButtonProps = {
  color: GameColorName;
  size?: GameButtonSize;
  wide?: boolean;
  selected?: boolean;
  disabled?: boolean;
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  playSound?: boolean;
};

export function GameSquareButton({
  color,
  size = "md",
  wide,
  selected,
  disabled,
  label,
  onClick,
  children,
  className,
  playSound,
}: GameSquareButtonProps) {
  return (
    <GameButtonCore
      color={color}
      size={size}
      shape="square"
      wide={wide}
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
