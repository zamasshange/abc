"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export const PEN_COLORS = [
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
  onPenSelect: () => void;
  onClear: () => void;
  onBack: () => void;
  onDone?: () => void;
};

const LEFT_BTNS = [
  { y: 0.06, h: 0.13, action: "pen" as const },
  { y: 0.20, h: 0.13, action: "sound" as const },
  { y: 0.34, h: 0.13, action: "eraser" as const },
  { y: 0.48, h: 0.13, action: "camera" as const },
  { y: 0.62, h: 0.13, action: "clear" as const },
  { y: 0.76, h: 0.13, action: "back" as const },
];

const RIGHT_BTNS = [
  { y: 0.06, h: 0.13, action: "menu" as const },
  { y: 0.20, h: 0.13, action: "done" as const },
  { y: 0.34, h: 0.13, color: 0 },
  { y: 0.48, h: 0.13, color: 1 },
  { y: 0.62, h: 0.13, color: 2 },
  { y: 0.76, h: 0.13, color: 3 },
  { y: 0.88, h: 0.10, color: 4 },
];

function ToolbarSide({
  src,
  children,
}: {
  src: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full w-[14%] min-w-[58px] max-w-[80px] shrink-0">
      <Image src={src} alt="" fill className="object-fill" sizes="80px" />
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

export function LeftToolbar({
  isEraser,
  onEraserToggle,
  onPenSelect,
  onClear,
  onBack,
}: Pick<ToolbarProps, "isEraser" | "onEraserToggle" | "onPenSelect" | "onClear" | "onBack">) {
  const handlers: Record<string, () => void> = {
    pen: onPenSelect,
    eraser: onEraserToggle,
    clear: onClear,
    back: onBack,
  };

  return (
    <ToolbarSide src="/assets/ui/toolbar-left.jpg">
      {LEFT_BTNS.map((btn) => (
        <motion.button
          key={btn.action}
          type="button"
          className="absolute left-[15%] w-[70%] bg-transparent"
          style={{ top: `${btn.y * 100}%`, height: `${btn.h * 100}%` }}
          onClick={handlers[btn.action]}
          whileTap={{ scale: 0.9 }}
          aria-label={btn.action}
        />
      ))}
    </ToolbarSide>
  );
}

export function RightToolbar({
  selectedColor,
  isEraser,
  onColorSelect,
  onDone,
}: Pick<ToolbarProps, "selectedColor" | "isEraser" | "onColorSelect" | "onDone">) {
  return (
    <ToolbarSide src="/assets/ui/toolbar-right.jpg">
      {RIGHT_BTNS.map((btn, i) => {
        if (btn.action === "menu") {
          return (
            <button
              key="menu"
              type="button"
              className="absolute left-[15%] w-[70%] bg-transparent"
              style={{ top: `${btn.y * 100}%`, height: `${btn.h * 100}%` }}
              aria-label="menu"
            />
          );
        }
        if (btn.action === "done") {
          return (
            <button
              key="done"
              type="button"
              className="absolute left-[15%] w-[70%] bg-transparent"
              style={{ top: `${btn.y * 100}%`, height: `${btn.h * 100}%` }}
              onClick={onDone}
              aria-label="done"
            />
          );
        }
        const pen = PEN_COLORS[btn.color!];
        return (
          <button
            key={pen.id}
            type="button"
            className="absolute left-[15%] w-[70%] bg-transparent"
            style={{ top: `${btn.y * 100}%`, height: `${btn.h * 100}%` }}
            onClick={() => onColorSelect(pen.color)}
            aria-label={pen.label}
            aria-pressed={!isEraser && selectedColor === pen.color}
          />
        );
      })}
    </ToolbarSide>
  );
}
