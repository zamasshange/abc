/** Numbers Counting gallery thumbnails — solid digit, object grid, dashed trace row */

import type { ReactNode } from "react";
import { getCountingCard } from "@/lib/numbers-counting-gallery";

const S = "#1a1a1a";
const DASH = "2 2";

function PracticeRow({ n }: { n: number }) {
  const digit = String(n);
  const fontSize = n >= 10 ? 12 : 14;
  const slots = [18, 38, 58, 78];
  return (
    <g>
      <line x1="8" y1="76" x2="92" y2="76" stroke="#B0BEC5" strokeWidth="0.8" />
      {slots.map((x, i) => (
        <text
          key={x}
          x={x}
          y={92}
          textAnchor="middle"
          fontSize={fontSize}
          fontFamily="var(--font-fredoka), Fredoka, sans-serif"
          fontWeight="700"
          fill="none"
          stroke={i === 0 ? S : "#aaa"}
          strokeWidth={i === 0 ? "1.4" : "1"}
          strokeDasharray={i === 0 ? undefined : DASH}
        >
          {digit}
        </text>
      ))}
    </g>
  );
}

function ObjectIcon({ id, x, y, scale = 1 }: { id: string; x: number; y: number; scale?: number }) {
  const icons: Record<string, ReactNode> = {
    apple: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.42})`}>
        <circle cx="8" cy="10" r="6" fill="none" stroke={S} strokeWidth="0.9" />
        <path d="M8 4 Q10 2 11 4" fill="none" stroke={S} strokeWidth="0.8" />
        <line x1="10" y1="3" x2="12" y2="1" stroke={S} strokeWidth="0.7" />
      </g>
    ),
    cherry: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.4})`}>
        <circle cx="6" cy="12" r="4" fill="none" stroke={S} strokeWidth="0.9" />
        <circle cx="12" cy="10" r="4" fill="none" stroke={S} strokeWidth="0.9" />
        <path d="M9 6 Q9 2 12 2" fill="none" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    gingerbread: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.42})`}>
        <circle cx="8" cy="9" r="6" fill="none" stroke={S} strokeWidth="0.9" />
        <circle cx="6" cy="7" r="0.7" fill={S} />
        <circle cx="10" cy="7" r="0.7" fill={S} />
        <path d="M6 11 Q8 12 10 11" fill="none" stroke={S} strokeWidth="0.7" />
      </g>
    ),
    donut: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.42})`}>
        <circle cx="8" cy="9" r="6" fill="none" stroke={S} strokeWidth="0.9" />
        <circle cx="8" cy="9" r="2.5" fill="none" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    candy: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.45})`}>
        <rect x="4" y="6" width="10" height="6" rx="2" fill="none" stroke={S} strokeWidth="0.9" />
        <path d="M4 9 L0 7 M14 9 L18 7" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    icecream: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.5})`}>
        <path d="M8 4 Q12 0 16 4 L14 14 L10 14 Z" fill="none" stroke={S} strokeWidth="0.9" />
      </g>
    ),
    girl: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.4})`}>
        <circle cx="8" cy="5" r="3" fill="none" stroke={S} strokeWidth="0.9" />
        <path d="M5 9 L11 9 L10 16 L6 16 Z" fill="none" stroke={S} strokeWidth="0.9" />
        <line x1="6" y1="16" x2="5" y2="18" stroke={S} strokeWidth="0.8" />
        <line x1="10" y1="16" x2="11" y2="18" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    duck: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.42})`}>
        <ellipse cx="9" cy="11" rx="6" ry="4" fill="none" stroke={S} strokeWidth="0.9" />
        <circle cx="5" cy="7" r="3" fill="none" stroke={S} strokeWidth="0.9" />
        <path d="M3 7 L1 6" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    egg: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.42})`}>
        <ellipse cx="8" cy="10" rx="4" ry="6" fill="none" stroke={S} strokeWidth="0.9" />
      </g>
    ),
    leaf: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.42})`}>
        <path d="M8 2 Q14 8 8 16 Q2 8 8 2" fill="none" stroke={S} strokeWidth="0.9" />
        <line x1="8" y1="4" x2="8" y2="14" stroke={S} strokeWidth="0.7" />
      </g>
    ),
    chocolate: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.42})`}>
        <rect x="3" y="5" width="10" height="8" rx="1" fill="none" stroke={S} strokeWidth="0.9" />
        <line x1="6" y1="5" x2="6" y2="13" stroke={S} strokeWidth="0.6" />
        <line x1="10" y1="5" x2="10" y2="13" stroke={S} strokeWidth="0.6" />
      </g>
    ),
    cupcake: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.45})`}>
        <path d="M4 12 L6 6 L10 6 L12 12 Z" fill="none" stroke={S} strokeWidth="0.9" />
        <path d="M6 6 Q8 2 10 6" fill="none" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    bear: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.5})`}>
        <circle cx="8" cy="8" r="4" fill="none" stroke={S} strokeWidth="0.9" />
        <circle cx="16" cy="8" r="4" fill="none" stroke={S} strokeWidth="0.9" />
        <ellipse cx="12" cy="14" rx="7" ry="6" fill="none" stroke={S} strokeWidth="0.9" />
      </g>
    ),
    rocket: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.42})`}>
        <path d="M8 2 L12 12 L8 10 L4 12 Z" fill="none" stroke={S} strokeWidth="0.9" />
        <path d="M4 12 L2 16 M12 12 L14 16" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    dinosaur: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.4})`}>
        <ellipse cx="10" cy="12" rx="8" ry="5" fill="none" stroke={S} strokeWidth="0.9" />
        <path d="M18 10 L22 6 L22 14 Z" fill="none" stroke={S} strokeWidth="0.8" />
        <circle cx="6" cy="10" r="0.8" fill={S} />
      </g>
    ),
    popsicle: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.42})`}>
        <rect x="5" y="2" width="6" height="10" rx="2" fill="none" stroke={S} strokeWidth="0.9" />
        <line x1="8" y1="12" x2="8" y2="17" stroke={S} strokeWidth="0.9" />
      </g>
    ),
    pie: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.42})`}>
        <path d="M3 12 L8 4 L13 12 Z" fill="none" stroke={S} strokeWidth="0.9" />
        <path d="M3 12 Q8 14 13 12" fill="none" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    candycane: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.4})`}>
        <path d="M10 4 Q14 4 14 8 L14 16" fill="none" stroke={S} strokeWidth="1.1" />
        <path d="M6 8 Q10 8 10 12 L10 16" fill="none" stroke={S} strokeWidth="1.1" />
      </g>
    ),
    pretzel: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.38})`}>
        <path d="M4 8 Q8 2 12 8 Q16 14 12 16 Q8 14 4 8" fill="none" stroke={S} strokeWidth="0.9" />
      </g>
    ),
    lollipop: (
      <g transform={`translate(${x},${y}) scale(${scale * 0.42})`}>
        <circle cx="8" cy="6" r="5" fill="none" stroke={S} strokeWidth="0.9" />
        <line x1="8" y1="11" x2="8" y2="18" stroke={S} strokeWidth="0.9" />
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

function digitSize(n: number): number {
  if (n >= 10) return 22;
  if (n === 1) return 30;
  return 28;
}

export function NumbersCountingGalleryArt({ cardId }: { cardId: string }) {
  const card = getCountingCard(cardId);
  const n = card?.count ?? Number(cardId);
  const object = card?.object ?? "apple";

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <rect x="1" y="1" width="98" height="98" fill="#fff" />
      <text
        x="14"
        y="38"
        fontSize={digitSize(n)}
        fontFamily="var(--font-fredoka), Fredoka, sans-serif"
        fontWeight="700"
        fill={S}
      >
        {n}
      </text>
      <CountGrid count={n} object={object} x={30} y={6} w={66} h={58} />
      <PracticeRow n={n} />
    </svg>
  );
}
