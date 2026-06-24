"use client";

import type { Exercise } from "@/lib/drawing/exercises";

type ExerciseGuideProps = {
  exercise: Exercise;
};

export function ExerciseGuide({ exercise }: ExerciseGuideProps) {
  const dotR = exercise.dotRadius ?? 14;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {exercise.guides.map((guide, i) => {
        const x1 = guide.x1 * 1000;
        const y1 = guide.y1 * 600;
        const x2 = guide.x2 * 1000;
        const y2 = guide.y2 * 600;
        return (
          <g key={i}>
            <circle cx={x1} cy={y1} r={dotR} fill="#1a1a1a" />
            <circle cx={x2} cy={y2} r={dotR} fill="#1a1a1a" />
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#bbbbbb"
              strokeWidth={3}
              strokeDasharray={guide.dashed !== false ? "12 10" : undefined}
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </svg>
  );
}
