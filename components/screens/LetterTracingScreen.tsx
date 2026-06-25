"use client";

import type { ActivityId } from "@/lib/navigation";
import { DrawingShell } from "@/components/shared/DrawingShell";

const chars: Record<string, string> = {
  "alpha-trace-upper": "A", "alpha-trace-lower": "a", "alpha-upper": "B", "alpha-lower": "b",
  "num-tracing": "3", "num-spelling": "5",
};

export function LetterTracingScreen({ activityId, onBack }: { activityId: ActivityId; onBack: () => void }) {
  const ch = chars[activityId] ?? "A";
  return (
    <DrawingShell onBack={onBack}>
      <svg viewBox="0 0 400 300" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
        {[0.28, 0.42, 0.56, 0.7].map((y, i) => (
          <line key={y} x1="40" y1={300 * y} x2="360" y2={300 * y} stroke="#ccc" strokeWidth={i === 1 || i === 2 ? 1.5 : 2} strokeDasharray={i === 1 || i === 2 ? "8 6" : undefined} />
        ))}
        <text x="200" y="175" textAnchor="middle" fontSize="120" fontWeight="bold" fill="none" stroke="#ddd" strokeWidth="3" fontFamily="Georgia, serif">{ch}</text>
        <text x="200" y="175" textAnchor="middle" fontSize="120" fontWeight="bold" fill="none" stroke="#bbb" strokeWidth="1.5" strokeDasharray="12 8" fontFamily="Georgia, serif">{ch}</text>
      </svg>
    </DrawingShell>
  );
}
