"use client";

import { motion } from "framer-motion";
import { theme } from "@/lib/theme";

export const PEN_COLORS = [
  { id: "red", color: "#F44336", label: "Red" },
  { id: "orange", color: "#FF9800", label: "Orange" },
  { id: "yellow", color: "#FFEB3B", label: "Yellow" },
  { id: "green", color: "#8BC34A", label: "Green" },
  { id: "blue", color: "#42A5F5", label: "Blue" },
] as const;

export type ToolbarProps = {
  sidebarColor: string;
  selectedColor: string;
  isEraser: boolean;
  onColorSelect: (color: string) => void;
  onEraserToggle: () => void;
  onPenSelect: () => void;
  onClear: () => void;
  onBack: () => void;
  onDone?: () => void;
};

function ToolBtn({
  bg,
  children,
  label,
  onClick,
  active,
  size = "md",
}: {
  bg: string;
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  size?: "md" | "color";
}) {
  const dim = size === "color" ? "h-11 w-11 sm:h-12 sm:w-12" : "h-10 w-10 sm:h-11 sm:w-11";
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.85 }}
      className={`flex ${dim} shrink-0 items-center justify-center rounded-full`}
      style={{
        backgroundColor: bg,
        boxShadow: active
          ? "0 0 0 3px #fff, 0 4px 0 rgba(0,0,0,0.3)"
          : "0 4px 0 rgba(0,0,0,0.25), inset 0 -2px 0 rgba(0,0,0,0.1)",
        border: "3px solid rgba(255,255,255,0.9)",
      }}
      aria-label={label}
      aria-pressed={active}
    >
      {children}
    </motion.button>
  );
}

const barClass =
  "flex h-full w-[14%] min-w-[58px] max-w-[80px] shrink-0 flex-col items-center justify-evenly py-1 sm:min-w-[68px]";

export function LeftToolbar({
  sidebarColor,
  isEraser,
  onEraserToggle,
  onPenSelect,
  onClear,
  onBack,
}: Pick<
  ToolbarProps,
  "sidebarColor" | "isEraser" | "onEraserToggle" | "onPenSelect" | "onClear" | "onBack"
>) {
  return (
    <div className={barClass} style={{ backgroundColor: sidebarColor }}>
      <ToolBtn bg="#FFC107" label="Pencil" onClick={onPenSelect} active={!isEraser}>
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
          <path
            d="M3 21l3.75-.75L18 9l-3-3L3.75 17.25 3 21z"
            fill="#fff"
            stroke="#E65100"
            strokeWidth="0.5"
          />
        </svg>
      </ToolBtn>
      <ToolBtn bg="#E91E63" label="Sound">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
          <path d="M3 9v6h4l5 5V4L7 9H3z" />
        </svg>
      </ToolBtn>
      <ToolBtn
        bg="#9C27B0"
        label="Eraser"
        onClick={onEraserToggle}
        active={isEraser}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
          <path d="M16 3l5 5-11 11H5v-5L16 3z" />
        </svg>
      </ToolBtn>
      <ToolBtn bg="#FF9800" label="Camera">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6zm6-6h-1.5l-1-2h-5l-1 2H9a2 2 0 00-2 2v7a2 2 0 002 2h9a2 2 0 002-2v-7a2 2 0 00-2-2z" />
        </svg>
      </ToolBtn>
      <ToolBtn bg="#42A5F5" label="Clear" onClick={onClear}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
      </ToolBtn>
      <ToolBtn bg="#E91E8C" label="Back" onClick={onBack}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </ToolBtn>
    </div>
  );
}

export function RightToolbar({
  sidebarColor,
  selectedColor,
  isEraser,
  onColorSelect,
  onDone,
}: Pick<ToolbarProps, "sidebarColor" | "selectedColor" | "isEraser" | "onColorSelect" | "onDone">) {
  return (
    <div className={barClass} style={{ backgroundColor: sidebarColor }}>
      <ToolBtn bg="#FF9800" label="Menu">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
          <circle cx="6" cy="6" r="2" />
          <circle cx="6" cy="12" r="2" />
          <circle cx="6" cy="18" r="2" />
          <line x1="11" y1="6" x2="20" y2="6" stroke="#fff" strokeWidth="2" />
          <line x1="11" y1="12" x2="20" y2="12" stroke="#fff" strokeWidth="2" />
          <line x1="11" y1="18" x2="20" y2="18" stroke="#fff" strokeWidth="2" />
        </svg>
      </ToolBtn>
      <ToolBtn bg="#E91E8C" label="Done" onClick={onDone}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </ToolBtn>
      {PEN_COLORS.map((pen) => {
        const selected = !isEraser && selectedColor === pen.color;
        return (
          <ToolBtn
            key={pen.id}
            bg={pen.color}
            label={pen.label}
            onClick={() => onColorSelect(pen.color)}
            active={selected}
            size="color"
          >
            {selected ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
                <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            ) : null}
          </ToolBtn>
        );
      })}
    </div>
  );
}

export function getSidebarColor(templateId: string): string {
  if (templateId.includes("curve") || templateId.includes("practice")) {
    return theme.toolbarOrange;
  }
  return theme.toolbarRed;
}
