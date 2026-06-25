"use client";

import type { ActivityId } from "@/lib/navigation";
import { DrawingShell } from "@/components/shared/DrawingShell";

const titles: Record<string, string> = {
  "mazes-practice": "The Chicken is Finding Way to Eggs",
  "mazes-easy": "Help the Bunny Find the Carrot",
  "mazes-hard": "Find the Way to the Star",
  "mazes-numbers": "Count Your Way Through the Maze",
  "mazes-match": "Match and Find the Path",
  "mazes-shapes": "Shape Maze Adventure",
};

export function MazeScreen({ activityId, onBack }: { activityId: ActivityId; onBack: () => void }) {
  return (
    <DrawingShell onBack={onBack} header={
      <div className="flex shrink-0 items-center border-b border-gray-200 px-2 py-1">
        <span className="flex-1 text-center text-xs font-bold text-gray-800">{titles[activityId] ?? "Find Your Way!"}</span>
      </div>
    }>
      <svg viewBox="0 0 400 280" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <ellipse cx="260" cy="100" rx="100" ry="75" fill="none" stroke="#111" strokeWidth="3" />
        <path d="M200 100 H320 M200 130 H280 M230 130 V170 M230 170 H300" fill="none" stroke="#111" strokeWidth="2.5" />
        <g transform="translate(30,190)">
          <ellipse cx="28" cy="22" rx="20" ry="16" fill="none" stroke="#111" strokeWidth="2" />
          <circle cx="18" cy="16" r="3" fill="#111" />
        </g>
        <ellipse cx="300" cy="70" rx="9" ry="13" fill="none" stroke="#111" strokeWidth="2" />
        <ellipse cx="315" cy="73" rx="7" ry="11" fill="none" stroke="#111" strokeWidth="2" />
      </svg>
    </DrawingShell>
  );
}
