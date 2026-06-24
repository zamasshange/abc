"use client";

import { motion } from "framer-motion";
import { theme } from "@/lib/theme";

const PEN_COLORS = [
  { id: "red", color: "#F44336", label: "Red" },
  { id: "orange", color: "#FF9800", label: "Orange" },
  { id: "yellow", color: "#FFEB3B", label: "Yellow" },
  { id: "green", color: "#8BC34A", label: "Green" },
  { id: "blue", color: "#42A5F5", label: "Blue" },
] as const;

export type ToolbarProps = {
  selectedColor: string;
  isEraser: boolean;
  onColorSelect: (color: string) => void;
  onEraserToggle: () => void;
  onClear: () => void;
  onBack: () => void;
  onDone?: () => void;
};

function SideButton({
  bg,
  children,
  label,
  onClick,
  active,
  ring,
}: {
  bg: string;
  children?: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  ring?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.88 }}
      className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] sm:h-11 sm:w-11"
      style={{
        backgroundColor: bg,
        borderColor: active ? (ring ?? "#fff") : "rgba(255,255,255,0.85)",
        boxShadow: active
          ? `0 0 0 3px ${ring ?? "#333"}, 0 3px 0 rgba(0,0,0,0.25)`
          : "0 3px 0 rgba(0,0,0,0.2)",
      }}
      aria-label={label}
      aria-pressed={active}
    >
      {children}
    </motion.button>
  );
}

const barClass =
  "flex h-full w-[13%] min-w-[52px] max-w-[72px] shrink-0 flex-col items-center justify-evenly py-2 sm:min-w-[60px]";

export function LeftToolbar({
  isEraser,
  onEraserToggle,
  onClear,
  onBack,
}: Pick<ToolbarProps, "isEraser" | "onEraserToggle" | "onClear" | "onBack">) {
  return (
    <div className={barClass} style={{ backgroundColor: theme.toolbarYellow }}>
      <SideButton
        bg="#FF9800"
        label="Draw pen"
        onClick={() => isEraser && onEraserToggle()}
        active={!isEraser}
        ring="#E65100"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
          <path d="M3 21l3.75-.75L18 9l-3-3L3.75 17.25 3 21z" />
        </svg>
      </SideButton>
      <SideButton bg="#F44336" label="Sound">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
        </svg>
      </SideButton>
      <SideButton
        bg="#9C27B0"
        label="Eraser"
        onClick={onEraserToggle}
        active={isEraser}
        ring="#E040FB"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
          <path d="M16 3l5 5-11 11H5v-5L16 3z" />
        </svg>
      </SideButton>
      <SideButton bg="#FF9800" label="Camera">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6zm6-6h-1.5l-1-2h-5l-1 2H9a2 2 0 00-2 2v7a2 2 0 002 2h9a2 2 0 002-2v-7a2 2 0 00-2-2z" />
        </svg>
      </SideButton>
      <SideButton bg="#42A5F5" label="Clear" onClick={onClear}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
      </SideButton>
      <SideButton bg="#E91E8C" label="Back" onClick={onBack}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </SideButton>
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
    <div className={barClass} style={{ backgroundColor: theme.toolbarYellow }}>
      <SideButton bg="#FF9800" label="Menu">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
          <circle cx="6" cy="6" r="2" />
          <circle cx="6" cy="12" r="2" />
          <circle cx="6" cy="18" r="2" />
          <line x1="11" y1="6" x2="20" y2="6" stroke="#fff" strokeWidth="2" />
          <line x1="11" y1="12" x2="20" y2="12" stroke="#fff" strokeWidth="2" />
          <line x1="11" y1="18" x2="20" y2="18" stroke="#fff" strokeWidth="2" />
        </svg>
      </SideButton>
      {PEN_COLORS.map((pen) => (
        <SideButton
          key={pen.id}
          bg={pen.color}
          label={pen.label}
          onClick={() => onColorSelect(pen.color)}
          active={!isEraser && selectedColor === pen.color}
          ring="#333"
        />
      ))}
      <SideButton bg="#FFEB3B" label="Done" onClick={onDone}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </SideButton>
    </div>
  );
}
