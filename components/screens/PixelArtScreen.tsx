"use client";

import { useCallback, useState } from "react";
import type { ActivityId } from "@/lib/navigation";
import { LeftToolbar, RightToolbar } from "@/components/drawing/DrawingToolbars";
import { ExitDialog } from "@/components/modals/ExitDialog";

const GRID = 12;

const palettes: Record<string, string[][]> = {
  "pixel-orange": Array.from({ length: GRID }, (_, r) =>
    Array.from({ length: GRID }, (_, c) =>
      r < 2 && c > 4 && c < 8 ? "#4CAF50" : r > 3 && r < 9 && c > 3 && c < 9 ? "#FF9800" : "#FFFFFF",
    ),
  ),
  "pixel-tree": Array.from({ length: GRID }, (_, r) =>
    Array.from({ length: GRID }, (_, c) => {
      if (r > 9 && c > 4 && c < 8) return "#795548";
      if (r > 2 && r < 10 && Math.abs(c - 6) + r < 10) return "#4CAF50";
      return "#FFFFFF";
    }),
  ),
  "pixel-whale": Array.from({ length: GRID }, (_, r) =>
    Array.from({ length: GRID }, (_, c) =>
      r > 4 && r < 8 && c > 2 && c < 10 ? "#42A5F5" : r === 6 && c === 4 ? "#111" : "#FFFFFF",
    ),
  ),
  "colors-fill": Array.from({ length: GRID }, (_, r) =>
    Array.from({ length: GRID }, (_, c) =>
      r > 3 && r < 9 && c > 3 && c < 9 ? "#FF9800" : "#FFFFFF",
    ),
  ),
};

type PixelArtScreenProps = {
  activityId?: ActivityId;
  onBack: () => void;
};

export function PixelArtGridScreen({ activityId = "pixel-orange", onBack }: PixelArtScreenProps) {
  const template = palettes[activityId] ?? palettes["pixel-orange"];
  const [cells, setCells] = useState(template.map((row) => [...row]));
  const [color, setColor] = useState("#FF9800");
  const [showExit, setShowExit] = useState(false);

  const paint = useCallback((r: number, c: number) => {
    setCells((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = color;
      return next;
    });
  }, [color]);

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[#7ADCE8]">
      <div
        className="worksheets-bg absolute inset-0 opacity-40"
        aria-hidden
      />
      <LeftToolbar
        isEraser={false}
        onEraserToggle={() => {}}
        onPenSelect={() => {}}
        onClear={() => setCells(template.map((r) => [...r]))}
        onBack={() => setShowExit(true)}
      />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="flex shrink-0 justify-end gap-2 px-3 py-2">
          <button type="button" className="h-10 w-10 rounded-full bg-[#FF9800] text-[8px] font-bold text-white" aria-label="Apps">Apps</button>
          <button type="button" className="h-10 w-10 rounded-full bg-[#F44336]" aria-label="Play" />
          <button type="button" className="h-10 w-10 rounded-full bg-[#8BC34A]" aria-label="Star" />
        </div>
        <div className="flex flex-1 items-center justify-center p-4">
          <div
            className="grid gap-px border-2 border-[#8D6E63] bg-[#8D6E63] p-1"
            style={{ gridTemplateColumns: `repeat(${GRID}, minmax(0, 1fr))` }}
          >
            {cells.map((row, r) =>
              row.map((cell, c) => (
                <button
                  key={`${r}-${c}`}
                  type="button"
                  className="aspect-square w-[22px] sm:w-[26px]"
                  style={{ backgroundColor: cell }}
                  onClick={() => paint(r, c)}
                  aria-label={`Cell ${r + 1},${c + 1}`}
                />
              )),
            )}
          </div>
        </div>
      </div>

      <RightToolbar selectedColor={color} isEraser={false} onColorSelect={setColor} onDone={onBack} />
      <ExitDialog open={showExit} onCancel={() => setShowExit(false)} onConfirm={onBack} />
    </div>
  );
}
