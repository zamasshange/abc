"use client";

import type { ActivityId } from "@/lib/navigation";
import { DrawingShell } from "@/components/shared/DrawingShell";

type FreeDrawScreenProps = {
  activityId: ActivityId;
  onBack: () => void;
};

export function FreeDrawScreen({ activityId, onBack }: FreeDrawScreenProps) {
  const showHint = !activityId.includes("practice");

  return (
    <DrawingShell onBack={onBack}>
      {showHint && (
        <svg viewBox="0 0 400 300" className="pointer-events-none absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="xMidYMid meet" aria-hidden>
          <ellipse cx="200" cy="160" rx="80" ry="60" fill="none" stroke="#999" strokeWidth="2" strokeDasharray="10 6" />
          <path d="M160 200 Q200 120 240 200" fill="none" stroke="#999" strokeWidth="2" strokeDasharray="10 6" />
        </svg>
      )}
    </DrawingShell>
  );
}
