/** Numbers Practice gallery thumbnails — count + trace worksheets */

import type { ReactNode } from "react";
import { NUMBERS_PRACTICE_CARDS } from "@/lib/numbers-practice-gallery";

const S = "#1a1a1a";
const DASH = "2 2";

function DashedRow({ y, h, children }: { y: number; h: number; children: ReactNode }) {
  return (
    <g>
      <rect x="6" y={y} width="88" height={h} fill="#fff" stroke={S} strokeWidth="0.9" strokeDasharray="3 2" />
      {children}
    </g>
  );
}

function TraceNum({ n, x, y, size }: { n: number; x: number; y: number; size: number }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize={size}
      fontFamily="var(--font-fredoka), Fredoka, sans-serif"
      fontWeight="700"
      fill="none"
      stroke="#888"
      strokeWidth="1.4"
      strokeDasharray={DASH}
    >
      {n}
    </text>
  );
}

function ObjectIcon({ id, x, y, scale = 1 }: { id: string; x: number; y: number; scale?: number }) {
  const icons: Record<string, ReactNode> = {
    cake: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.55})`}>
        <rect x="4" y="12" width="16" height="8" rx="1" fill="none" stroke={S} strokeWidth="1" />
        <line x1="7" y1="8" x2="7" y2="4" stroke={S} strokeWidth="0.8" />
        <line x1="12" y1="8" x2="12" y2="3" stroke={S} strokeWidth="0.8" />
        <line x1="17" y1="8" x2="17" y2="4" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    bear: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.5})`}>
        <circle cx="8" cy="8" r="4" fill="none" stroke={S} strokeWidth="0.9" />
        <circle cx="16" cy="8" r="4" fill="none" stroke={S} strokeWidth="0.9" />
        <ellipse cx="12" cy="14" rx="7" ry="6" fill="none" stroke={S} strokeWidth="0.9" />
      </g>
    ),
    ball: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.45})`}>
        <circle cx="8" cy="8" r="7" fill="none" stroke={S} strokeWidth="0.9" />
        <path d="M2 8 Q8 4 14 8" fill="none" stroke={S} strokeWidth="0.7" />
      </g>
    ),
    icecream: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.5})`}>
        <path d="M8 4 Q12 0 16 4 L14 14 L10 14 Z" fill="none" stroke={S} strokeWidth="0.9" />
      </g>
    ),
    candy: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.45})`}>
        <rect x="4" y="6" width="10" height="6" rx="2" fill="none" stroke={S} strokeWidth="0.9" />
        <path d="M4 9 L0 7 M14 9 L18 7" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    chick: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.42})`}>
        <circle cx="8" cy="9" r="6" fill="none" stroke={S} strokeWidth="0.9" />
        <circle cx="10" cy="8" r="0.8" fill={S} />
        <path d="M12 9 L15 8" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    strawberry: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.42})`}>
        <path d="M8 2 L12 6 L4 6 Z" fill="none" stroke={S} strokeWidth="0.8" />
        <ellipse cx="8" cy="11" rx="5" ry="6" fill="none" stroke={S} strokeWidth="0.9" />
      </g>
    ),
    cherry: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.4})`}>
        <circle cx="6" cy="12" r="4" fill="none" stroke={S} strokeWidth="0.9" />
        <circle cx="12" cy="10" r="4" fill="none" stroke={S} strokeWidth="0.9" />
        <path d="M9 6 Q9 2 12 2" fill="none" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    kite: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.45})`}>
        <path d="M8 2 L14 10 L8 14 L2 10 Z" fill="none" stroke={S} strokeWidth="0.9" />
        <line x1="8" y1="14" x2="8" y2="18" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    pencil: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.45})`}>
        <rect x="4" y="4" width="12" height="4" fill="none" stroke={S} strokeWidth="0.9" transform="rotate(-35 10 6)" />
        <path d="M14 2 L16 4 L14 6" fill="none" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    stroller: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.5})`}>
        <path d="M4 14 Q8 6 14 8 L16 14" fill="none" stroke={S} strokeWidth="0.9" />
        <circle cx="6" cy="16" r="2" fill="none" stroke={S} strokeWidth="0.8" />
        <circle cx="14" cy="16" r="2" fill="none" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    watermelon: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.38})`}>
        <path d="M2 10 Q8 2 14 10" fill="none" stroke={S} strokeWidth="0.9" />
        <circle cx="5" cy="8" r="0.6" fill={S} />
        <circle cx="8" cy="6" r="0.6" fill={S} />
      </g>
    ),
    car: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.42})`}>
        <rect x="2" y="8" width="14" height="6" rx="1" fill="none" stroke={S} strokeWidth="0.9" />
        <circle cx="5" cy="15" r="2" fill="none" stroke={S} strokeWidth="0.8" />
        <circle cx="13" cy="15" r="2" fill="none" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    rocket: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.42})`}>
        <path d="M8 2 L12 12 L8 10 L4 12 Z" fill="none" stroke={S} strokeWidth="0.9" />
        <path d="M4 12 L2 16 M12 12 L14 16" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    butterfly: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.4})`}>
        <ellipse cx="5" cy="8" rx="4" ry="5" fill="none" stroke={S} strokeWidth="0.8" />
        <ellipse cx="11" cy="8" rx="4" ry="5" fill="none" stroke={S} strokeWidth="0.8" />
        <line x1="8" y1="4" x2="8" y2="14" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    lollipop: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.42})`}>
        <circle cx="8" cy="6" r="5" fill="none" stroke={S} strokeWidth="0.9" />
        <line x1="8" y1="11" x2="8" y2="18" stroke={S} strokeWidth="0.9" />
      </g>
    ),
    cupcake: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.45})`}>
        <path d="M4 12 L6 6 L10 6 L12 12 Z" fill="none" stroke={S} strokeWidth="0.9" />
        <path d="M6 6 Q8 2 10 6" fill="none" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    paintbrush: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.4})`}>
        <line x1="4" y1="16" x2="12" y2="4" stroke={S} strokeWidth="1.2" />
        <path d="M2 16 L6 16 L5 18 L3 18 Z" fill="none" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    balloon: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.42})`}>
        <ellipse cx="8" cy="7" rx="5" ry="6" fill="none" stroke={S} strokeWidth="0.9" />
        <line x1="8" y1="13" x2="8" y2="18" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    apple: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.42})`}>
        <circle cx="8" cy="10" r="6" fill="none" stroke={S} strokeWidth="0.9" />
        <path d="M8 4 Q10 2 11 4" fill="none" stroke={S} strokeWidth="0.8" />
        <line x1="10" y1="3" x2="12" y2="1" stroke={S} strokeWidth="0.7" />
      </g>
    ),
  };
  return <>{icons[id] ?? icons.apple}</>;
}

function CountGrid({ count, object, x, y, w, h }: { count: number; object: string; x: number; y: number; w: number; h: number }) {
  const cols = count <= 4 ? 2 : count <= 9 ? 3 : count <= 12 ? 4 : 5;
  const rows = Math.ceil(count / cols);
  const cellW = w / cols;
  const cellH = h / rows;
  const scale = count <= 6 ? 1 : count <= 10 ? 0.85 : count <= 14 ? 0.7 : 0.55;

  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const ox = x + col * cellW + cellW * 0.15;
        const oy = y + row * cellH + cellH * 0.1;
        return <ObjectIcon key={i} id={object} x={ox} y={oy} scale={scale} />;
      })}
    </g>
  );
}

function ExerciseRow({ count, object, y, h }: { count: number; object: string; y: number; h: number }) {
  const numSize = count >= 10 ? 18 : 22;
  return (
    <DashedRow y={y} h={h}>
      <CountGrid count={count} object={object} x={8} y={y + 3} w={48} h={h - 6} />
      <TraceNum n={count} x={72} y={y + h * 0.68} size={numSize} />
    </DashedRow>
  );
}

const ART: Record<string, ReactNode> = {};

for (const card of NUMBERS_PRACTICE_CARDS) {
  const single = card.exercises.length === 1;
  ART[card.id] = (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <rect x="1" y="1" width="98" height="98" fill="#fff" />
      {card.exercises.map((ex, i) => (
        <ExerciseRow
          key={ex.count}
          count={ex.count}
          object={ex.object}
          y={single ? 18 : i === 0 ? 6 : 52}
          h={single ? 64 : 42}
        />
      ))}
    </svg>
  );
}

export function NumbersPracticeGalleryArt({ cardId }: { cardId: string }) {
  return <>{ART[cardId] ?? ART["num-pr-p1-a"]}</>;
}
