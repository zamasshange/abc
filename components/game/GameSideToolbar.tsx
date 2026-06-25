"use client";

import type { GameColorName } from "@/lib/game-colors";
import { GameIconButton } from "./GameIconButton";
import {
  BackIcon,
  CameraIcon,
  DeleteIcon,
  EraserIcon,
  PencilIcon,
  SoundIcon,
} from "./GameIcons";

export type SideToolId = "pencil" | "sound" | "eraser" | "camera" | "delete" | "back";

const TOOL_CONFIG: Record<
  SideToolId,
  { label: string; color: GameColorName; icon: React.ReactNode }
> = {
  pencil: { label: "Pencil", color: "yellow", icon: <PencilIcon /> },
  sound: { label: "Sound", color: "pink", icon: <SoundIcon /> },
  eraser: { label: "Eraser", color: "purple", icon: <EraserIcon /> },
  camera: { label: "Camera", color: "orange", icon: <CameraIcon /> },
  delete: { label: "Delete", color: "blue", icon: <DeleteIcon /> },
  back: { label: "Back", color: "pink", icon: <BackIcon /> },
};

type GameSideToolbarProps = {
  tools?: SideToolId[];
  activeTool?: SideToolId;
  onToolPress?: (tool: SideToolId) => void;
  className?: string;
};

const DEFAULT_TOOLS: SideToolId[] = ["pencil", "sound", "eraser", "camera", "delete", "back"];

/** Vertical floating cartoon toolbar — circular raised toy buttons */
export function GameSideToolbar({
  tools = DEFAULT_TOOLS,
  activeTool,
  onToolPress,
  className = "",
}: GameSideToolbarProps) {
  return (
    <div
      className={`pointer-events-auto flex flex-col items-center gap-3 rounded-3xl p-2.5 ${className}`}
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 100%)",
        backdropFilter: "blur(4px)",
      }}
    >
      {tools.map((tool) => {
        const cfg = TOOL_CONFIG[tool];
        return (
          <GameIconButton
            key={tool}
            color={cfg.color}
            label={cfg.label}
            selected={activeTool === tool}
            onClick={() => onToolPress?.(tool)}
            icon={cfg.icon}
          />
        );
      })}
    </div>
  );
}
