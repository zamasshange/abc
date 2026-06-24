"use client";

import type { ActivityId } from "@/lib/navigation";
import { DrawingShell } from "@/components/shared/DrawingShell";

const letters: Record<string, { char: string; lower?: boolean }> = {
  "alpha-trace-upper": { char: "A" },
  "alpha-trace-lower": { char: "a", lower: true },
  "alpha-upper": { char: "B" },
  "alpha-lower": { char: "b", lower: true },
  "num-tracing": { char: "3" },
  "num-spelling": { char: "5" },
};

type LetterTracingScreenProps = {
  activityId: ActivityId;
  onBack: () => void;
};

export function LetterTracingScreen({ activityId, onBack }: LetterTracingScreenProps) {
  const info = letters[activityId] ?? { char: "A" };

  return (
    <DrawingShell onBack={onBack}>
      <svg viewBox="0 0 400 300" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
        {[0.28, 0.42, 0.56, 0.7].map((y, i) => (
          <line
            key={y}
            x1="40"
            y1={300 * y}
            x2="360"
            y2={300 * y}
            stroke="#ccc"
            strokeWidth={i === 1 || i === 2 ? 1.5 : 2}
            strokeDasharray={i === 1 || i === 2 ? "8 6" : undefined}
          />
        ))}
        <text
          x="200"
          y="175"
          textAnchor="middle"
          fontSize="120"
          fontWeight="bold"
          fill="none"
          stroke="#ddd"
          strokeWidth="3"
          fontFamily="Georgia, serif"
        >
          {info.char}
        </text>
        <text
          x="200"
          y="175"
          textAnchor="middle"
          fontSize="120"
          fontWeight="bold"
          fill="none"
          stroke="#bbb"
          strokeWidth="1.5"
          strokeDasharray="12 8"
          fontFamily="Georgia, serif"
        >
          {info.char}
        </text>
      </svg>
    </DrawingShell>
  );
}
