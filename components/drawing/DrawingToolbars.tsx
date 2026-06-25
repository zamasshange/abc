"use client";

import { GameIconButton, GameSideToolbar } from "@/components/game";
import type { SideToolId } from "@/components/game";
import { CheckIcon, MenuIcon } from "@/components/game/GameIcons";

export const PEN_COLORS = [
  { id: "red", color: "#F44336", label: "Red", gameColor: "red" as const },
  { id: "orange", color: "#FF9800", label: "Orange", gameColor: "orange" as const },
  { id: "yellow", color: "#FFEB3B", label: "Yellow", gameColor: "yellow" as const },
  { id: "green", color: "#8BC34A", label: "Green", gameColor: "green" as const },
  { id: "blue", color: "#42A5F5", label: "Blue", gameColor: "blue" as const },
] as const;

export type ToolbarProps = {
  selectedColor: string;
  isEraser: boolean;
  onColorSelect: (color: string) => void;
  onEraserToggle: () => void;
  onPenSelect: () => void;
  onClear: () => void;
  onBack: () => void;
  onDone?: () => void;
};

export function LeftToolbar({
  isEraser,
  onEraserToggle,
  onPenSelect,
  onClear,
  onBack,
}: Pick<ToolbarProps, "isEraser" | "onEraserToggle" | "onPenSelect" | "onClear" | "onBack">) {
  const activeTool: SideToolId | undefined = isEraser ? "eraser" : undefined;

  const handleTool = (tool: SideToolId) => {
    switch (tool) {
      case "pencil":
        onPenSelect();
        break;
      case "eraser":
        onEraserToggle();
        break;
      case "delete":
        onClear();
        break;
      case "back":
        onBack();
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative z-10 flex w-[18%] min-w-[88px] max-w-[108px] shrink-0 items-center justify-center py-3 pl-2">
      <GameSideToolbar activeTool={activeTool} onToolPress={handleTool} />
    </div>
  );
}

export function RightToolbar({
  selectedColor,
  isEraser,
  onColorSelect,
  onDone,
}: Pick<ToolbarProps, "selectedColor" | "isEraser" | "onColorSelect" | "onDone">) {
  return (
    <div className="relative z-10 flex w-[18%] min-w-[88px] max-w-[108px] shrink-0 flex-col items-center justify-evenly gap-3 py-3 pr-2">
      <GameIconButton color="orange" size="sm" label="Menu" icon={<MenuIcon />} />
      <GameIconButton color="pink" size="sm" label="Done" onClick={onDone} icon={<CheckIcon />} />
      {PEN_COLORS.map((pen) => {
        const selected = !isEraser && selectedColor === pen.color;
        return (
          <GameIconButton
            key={pen.id}
            color={pen.gameColor}
            size="md"
            label={pen.label}
            selected={selected}
            onClick={() => onColorSelect(pen.color)}
            icon={
              selected ? (
                <CheckIcon className="h-8 w-8" />
              ) : (
                <span
                  className="block h-8 w-8 rounded-full border-[3px] border-white/90"
                  style={{ backgroundColor: pen.color }}
                  aria-hidden
                />
              )
            }
          />
        );
      })}
    </div>
  );
}
