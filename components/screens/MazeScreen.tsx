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

type MazeScreenProps = {
  activityId: ActivityId;
  onBack: () => void;
};

export function MazeScreen({ activityId, onBack }: MazeScreenProps) {
  const title = titles[activityId] ?? "Find Your Way!";

  return (
    <DrawingShell
      onBack={onBack}
      header={
        <div className="flex shrink-0 items-center border-b border-gray-200 px-2 py-1">
          <span className="flex-1 text-center text-xs font-bold text-gray-800">{title}</span>
        </div>
      }
    >
      <svg viewBox="0 0 400 280" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <MazeArt variant={activityId} />
      </svg>
    </DrawingShell>
  );
}

function MazeArt({ variant }: { variant: string }) {
  if (variant.includes("numbers") || variant.includes("easy")) {
    return (
      <>
        <ellipse cx="280" cy="80" rx="90" ry="70" fill="none" stroke="#111" strokeWidth="3" />
        <path d="M220 80 H340 M220 110 H300 M250 110 V150 M250 150 H320 M200 150 H250" fill="none" stroke="#111" strokeWidth="2.5" />
        <g transform="translate(40,200)">
          <ellipse cx="30" cy="20" rx="22" ry="18" fill="none" stroke="#111" strokeWidth="2" />
          <circle cx="20" cy="14" r="3" fill="#111" />
          <path d="M8 18 L-8 10 M8 22 L-10 24" stroke="#111" strokeWidth="2" />
          <polygon points="48,8 54,18 42,18" fill="none" stroke="#111" strokeWidth="1.5" />
        </g>
        <ellipse cx="310" cy="55" rx="10" ry="14" fill="none" stroke="#111" strokeWidth="2" />
        <ellipse cx="325" cy="58" rx="8" ry="12" fill="none" stroke="#111" strokeWidth="2" />
      </>
    );
  }

  return (
    <>
      <ellipse cx="260" cy="100" rx="100" ry="75" fill="none" stroke="#111" strokeWidth="3" />
      <path d="M200 100 H320 M200 130 H280 M230 130 V170 M230 170 H300 M180 170 H230 M180 200 H260" fill="none" stroke="#111" strokeWidth="2.5" />
      <g transform="translate(30,190)">
        <ellipse cx="28" cy="22" rx="20" ry="16" fill="none" stroke="#111" strokeWidth="2" />
        <circle cx="18" cy="16" r="3" fill="#111" />
        <polygon points="8,10 2,4 10,6" fill="none" stroke="#111" strokeWidth="1.5" />
        <path d="M6 24 L-6 30 M6 28 L-8 32" stroke="#111" strokeWidth="2" />
      </g>
      <ellipse cx="300" cy="70" rx="9" ry="13" fill="none" stroke="#111" strokeWidth="2" />
      <ellipse cx="315" cy="73" rx="7" ry="11" fill="none" stroke="#111" strokeWidth="2" />
    </>
  );
}
