"use client";

import type { ActivityId } from "@/lib/navigation";
import { DrawingShell } from "@/components/shared/DrawingShell";

export function FreeDrawScreen({ activityId, onBack }: { activityId: ActivityId; onBack: () => void }) {
  return (
    <DrawingShell onBack={onBack}>
      <svg viewBox="0 0 400 300" className="pointer-events-none absolute inset-0 h-full w-full opacity-25" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <ellipse cx="200" cy="160" rx="80" ry="60" fill="none" stroke="#999" strokeWidth="2" strokeDasharray="10 6" />
      </svg>
    </DrawingShell>
  );
}
