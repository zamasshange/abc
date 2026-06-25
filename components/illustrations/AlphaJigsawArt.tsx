/** Alphabets Jigsaw — piece SVG + pointing hand */

import type { JigsawPieceDef } from "@/lib/alpha-jigsaw";

const S = "#1a1a1a";

export function PointingHand({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 56" className={className} aria-hidden>
      <path
        d="M8 28 C8 18 14 12 22 12 C26 12 28 14 28 18 L28 8 C28 4 31 2 35 4 C39 6 40 10 40 14 L40 22 C44 20 48 22 48 26 L48 34 C48 40 44 44 38 44 L18 44 C12 44 8 40 8 34 Z"
        fill="#5EB8FF"
        stroke="#2E8AD8"
        strokeWidth="1.5"
      />
      <path d="M30 8 L38 2 L36 12 Z" fill="#5EB8FF" stroke="#2E8AD8" strokeWidth="1.2" />
    </svg>
  );
}

export function JigsawPieceSvg({
  piece,
  letter,
  mode,
  size = 300,
}: {
  piece: JigsawPieceDef;
  letter: string;
  mode: "ghost" | "filled";
  size?: number;
}) {
  const clipId = `jig-clip-${piece.id}-${letter}`;
  return (
    <svg viewBox="0 0 300 300" width={size} height={size} className="overflow-visible" aria-hidden>
      <defs>
        <clipPath id={clipId}>
          <path d={piece.region} />
        </clipPath>
      </defs>
      <path
        d={piece.region}
        fill={mode === "ghost" ? "none" : "#fff"}
        stroke={S}
        strokeWidth={mode === "ghost" ? 3 : 2.5}
        strokeLinejoin="round"
      />
      {mode === "filled" && (
        <text
          x="150"
          y="205"
          textAnchor="middle"
          fontSize="220"
          fontFamily="var(--font-fredoka), Fredoka, sans-serif"
          fontWeight="700"
          fill={S}
          clipPath={`url(#${clipId})`}
        >
          {letter}
        </text>
      )}
    </svg>
  );
}

/** Home-card mini preview */
export function AlphaJigsawCardPreview() {
  return (
    <svg viewBox="0 0 120 100" className="h-full w-full" aria-hidden>
      <path d="M28 18 L58 18 L58 38 L28 48 Z" fill="none" stroke={S} strokeWidth="2" />
      <path d="M62 22 L92 18 L92 48 L62 42 Z" fill="none" stroke={S} strokeWidth="2" />
      <path d="M30 52 L58 48 L58 82 L32 78 Z" fill="none" stroke={S} strokeWidth="2" />
      <path d="M62 52 L90 56 L88 80 L62 78 Z" fill="none" stroke={S} strokeWidth="2" />
      <g transform="translate(34, 30) scale(0.45)">
        <path
          d="M8 28 C8 18 14 12 22 12 C26 12 28 14 28 18 L28 8 C28 4 31 2 35 4 C39 6 40 10 40 14 L40 22 C44 20 48 22 48 26 L48 34 C48 40 44 44 38 44 L18 44 C12 44 8 40 8 34 Z"
          fill="#5EB8FF"
          stroke="#2E8AD8"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}
