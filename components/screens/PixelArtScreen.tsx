"use client";

import { useState, useCallback } from "react";
import type { ActivityId } from "@/lib/navigation";
import { LeftToolbar, RightToolbar } from "@/components/drawing/DrawingToolbars";
import { ExitDialog } from "@/components/modals/ExitDialog";

const GRID = 12;
function makeGrid(activityId: string): string[][] {
  if (activityId.includes("tree")) return Array.from({ length: GRID }, (_, r) => Array.from({ length: GRID }, (_, c) => {
    if (r > 9 && c > 4 && c < 8) return "#795548";
    if (r > 2 && r < 10 && Math.abs(c - 6) + r < 10) return "#4CAF50";
    return "#FFFFFF";
  }));
  if (activityId.includes("whale")) return Array.from({ length: GRID }, (_, r) => Array.from({ length: GRID }, (_, c) =>
    r > 4 && r < 8 && c > 2 && c < 10 ? "#42A5F5" : "#FFFFFF"));
  return Array.from({ length: GRID }, (_, r) => Array.from({ length: GRID }, (_, c) =>
    r < 2 && c > 4 && c < 8 ? "#4CAF50" : r > 3 && r < 9 && c > 3 && c < 9 ? "#FF9800" : "#FFFFFF"));
}

export function PixelArtScreen({ activityId, onBack }: { activityId: ActivityId; onBack: () => void }) {
  const template = makeGrid(activityId);
  const [cells, setCells] = useState(template.map((r) => [...r]));
  const [color, setColor] = useState("#FF9800");
  const [showExit, setShowExit] = useState(false);
  const paint = useCallback((r: number, c: number) => {
    setCells((prev) => { const next = prev.map((row) => [...row]); next[r][c] = color; return next; });
  }, [color]);

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-white">
      <LeftToolbar isEraser={false} onEraserToggle={() => {}} onPenSelect={() => {}} onClear={() => setCells(template.map((r) => [...r]))} onBack={() => setShowExit(true)} />
      <div className="flex min-w-0 flex-1 items-center justify-center bg-[#E0F7FA] p-4">
        <div className="grid gap-px border-2 border-[#8D6E63] bg-[#8D6E63] p-1" style={{ gridTemplateColumns: `repeat(${GRID}, minmax(0, 1fr))` }}>
          {cells.map((row, r) => row.map((cell, c) => (
            <button key={`${r}-${c}`} type="button" className="aspect-square w-[22px]" style={{ backgroundColor: cell }} onClick={() => paint(r, c)} aria-label={`Cell ${r},${c}`} />
          )))}
        </div>
      </div>
      <RightToolbar selectedColor={color} isEraser={false} onColorSelect={setColor} onDone={onBack} />
      <ExitDialog open={showExit} onCancel={() => setShowExit(false)} onConfirm={onBack} />
    </div>
  );
}
