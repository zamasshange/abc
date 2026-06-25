/** Uppercase gallery thumbnails — solid letter, picture, dashed practice row */

import type { ReactNode } from "react";

const S = "#1a1a1a";
const DASH = "2 2";

function PracticeRow({
  letter,
  fontSize = 14,
  y = 92,
}: {
  letter: string;
  fontSize?: number;
  y?: number;
}) {
  const slots = [18, 38, 58, 78];
  return (
    <g>
      <line x1="8" y1="76" x2="92" y2="76" stroke="#B0BEC5" strokeWidth="0.8" />
      {slots.map((x, i) => (
        <text
          key={x}
          x={x}
          y={y}
          textAnchor="middle"
          fontSize={fontSize}
          fontFamily="var(--font-fredoka), Fredoka, sans-serif"
          fontWeight="700"
          fill="none"
          stroke={i === 0 ? S : "#aaa"}
          strokeWidth={i === 0 ? "1.4" : "1"}
          strokeDasharray={i === 0 ? undefined : DASH}
        >
          {letter}
        </text>
      ))}
    </g>
  );
}

function Icon({ id }: { id: string }) {
  const icons: Record<string, ReactNode> = {
    apple: (
      <g transform="translate(58,8) scale(0.55)">
        <circle cx="14" cy="16" r="10" fill="none" stroke={S} strokeWidth="1.2" />
        <path d="M14 6 Q16 2 18 6" fill="none" stroke={S} strokeWidth="1" />
        <line x1="16" y1="4" x2="18" y2="0" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    ball: (
      <g transform="translate(58,10) scale(0.5)">
        <circle cx="14" cy="14" r="11" fill="none" stroke={S} strokeWidth="1.2" />
        <path d="M6 10 Q14 6 22 10 M6 18 Q14 22 22 18" fill="none" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    car: (
      <g transform="translate(56,14) scale(0.48)">
        <rect x="4" y="10" width="22" height="10" rx="2" fill="none" stroke={S} strokeWidth="1.2" />
        <circle cx="9" cy="22" r="3" fill="none" stroke={S} strokeWidth="1" />
        <circle cx="21" cy="22" r="3" fill="none" stroke={S} strokeWidth="1" />
      </g>
    ),
    dog: (
      <g transform="translate(58,10) scale(0.48)">
        <ellipse cx="14" cy="16" rx="10" ry="8" fill="none" stroke={S} strokeWidth="1.2" />
        <ellipse cx="8" cy="8" rx="4" ry="5" fill="none" stroke={S} strokeWidth="1" />
        <ellipse cx="20" cy="8" rx="4" ry="5" fill="none" stroke={S} strokeWidth="1" />
      </g>
    ),
    elephant: (
      <g transform="translate(56,10) scale(0.45)">
        <ellipse cx="16" cy="14" rx="12" ry="9" fill="none" stroke={S} strokeWidth="1.2" />
        <path d="M4 14 Q2 18 6 20" fill="none" stroke={S} strokeWidth="1.2" />
      </g>
    ),
    fox: (
      <g transform="translate(58,10) scale(0.48)">
        <ellipse cx="14" cy="16" rx="9" ry="7" fill="none" stroke={S} strokeWidth="1.2" />
        <polygon points="8,8 10,2 12,8" fill="none" stroke={S} strokeWidth="1" />
        <polygon points="16,8 18,2 20,8" fill="none" stroke={S} strokeWidth="1" />
      </g>
    ),
    goat: (
      <g transform="translate(58,12) scale(0.45)">
        <ellipse cx="14" cy="16" rx="8" ry="7" fill="none" stroke={S} strokeWidth="1.2" />
        <path d="M8 8 L10 2 M18 8 L16 2" stroke={S} strokeWidth="1" />
        <path d="M6 20 L4 24 M20 20 L22 24" stroke={S} strokeWidth="1" />
      </g>
    ),
    hat: (
      <g transform="translate(58,12) scale(0.5)">
        <rect x="6" y="12" width="16" height="8" fill="none" stroke={S} strokeWidth="1.2" />
        <ellipse cx="14" cy="12" rx="10" ry="4" fill="none" stroke={S} strokeWidth="1.2" />
      </g>
    ),
    igloo: (
      <g transform="translate(58,14) scale(0.48)">
        <path d="M4 20 Q14 6 24 20 Z" fill="none" stroke={S} strokeWidth="1.2" />
        <rect x="10" y="16" width="8" height="6" fill="none" stroke={S} strokeWidth="1" />
      </g>
    ),
    jester: (
      <g transform="translate(58,8) scale(0.48)">
        <circle cx="14" cy="14" r="8" fill="none" stroke={S} strokeWidth="1.2" />
        <polygon points="8,6 10,0 12,6" fill={S} />
        <polygon points="14,4 16,0 18,4" fill={S} />
        <polygon points="18,8 22,6 18,10" fill={S} />
      </g>
    ),
    kangaroo: (
      <g transform="translate(56,10) scale(0.42)">
        <ellipse cx="14" cy="16" rx="8" ry="10" fill="none" stroke={S} strokeWidth="1.2" />
        <path d="M6 18 L2 26" stroke={S} strokeWidth="1.2" />
        <ellipse cx="18" cy="10" rx="4" ry="5" fill="none" stroke={S} strokeWidth="1" />
      </g>
    ),
    lion: (
      <g transform="translate(58,10) scale(0.45)">
        <circle cx="14" cy="14" r="10" fill="none" stroke={S} strokeWidth="1" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line
            key={a}
            x1={14 + Math.cos((a * Math.PI) / 180) * 10}
            y1={14 + Math.sin((a * Math.PI) / 180) * 10}
            x2={14 + Math.cos((a * Math.PI) / 180) * 13}
            y2={14 + Math.sin((a * Math.PI) / 180) * 13}
            stroke={S}
            strokeWidth="0.8"
          />
        ))}
      </g>
    ),
    mouse: (
      <g transform="translate(58,12) scale(0.48)">
        <ellipse cx="14" cy="16" rx="8" ry="7" fill="none" stroke={S} strokeWidth="1.2" />
        <circle cx="8" cy="8" r="4" fill="none" stroke={S} strokeWidth="1" />
        <circle cx="20" cy="8" r="4" fill="none" stroke={S} strokeWidth="1" />
      </g>
    ),
    nest: (
      <g transform="translate(58,14) scale(0.5)">
        <path d="M4 16 Q14 8 24 16" fill="none" stroke={S} strokeWidth="1.2" />
        <ellipse cx="10" cy="14" rx="2" ry="2" fill="none" stroke={S} strokeWidth="0.8" />
        <ellipse cx="14" cy="13" rx="2" ry="2" fill="none" stroke={S} strokeWidth="0.8" />
        <ellipse cx="18" cy="14" rx="2" ry="2" fill="none" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    owl: (
      <g transform="translate(58,10) scale(0.48)">
        <ellipse cx="14" cy="16" rx="10" ry="12" fill="none" stroke={S} strokeWidth="1.2" />
        <circle cx="10" cy="14" r="4" fill="none" stroke={S} strokeWidth="1" />
        <circle cx="18" cy="14" r="4" fill="none" stroke={S} strokeWidth="1" />
        <polygon points="10,4 14,0 18,4" fill="none" stroke={S} strokeWidth="1" />
      </g>
    ),
    pig: (
      <g transform="translate(58,12) scale(0.48)">
        <ellipse cx="14" cy="15" rx="10" ry="8" fill="none" stroke={S} strokeWidth="1.2" />
        <ellipse cx="14" cy="16" rx="4" ry="3" fill="none" stroke={S} strokeWidth="1" />
        <circle cx="8" cy="8" r="3" fill="none" stroke={S} strokeWidth="1" />
        <circle cx="20" cy="8" r="3" fill="none" stroke={S} strokeWidth="1" />
      </g>
    ),
    queen: (
      <g transform="translate(58,8) scale(0.48)">
        <circle cx="14" cy="14" r="8" fill="none" stroke={S} strokeWidth="1.2" />
        <polygon points="6,8 8,2 10,8 14,4 18,8 20,2 22,8" fill="none" stroke={S} strokeWidth="1" />
      </g>
    ),
    rabbit: (
      <g transform="translate(58,10) scale(0.45)">
        <ellipse cx="14" cy="18" rx="7" ry="6" fill="none" stroke={S} strokeWidth="1.2" />
        <ellipse cx="10" cy="8" rx="2" ry="6" fill="none" stroke={S} strokeWidth="1" />
        <ellipse cx="18" cy="8" rx="2" ry="6" fill="none" stroke={S} strokeWidth="1" />
      </g>
    ),
    sun: (
      <g transform="translate(58,10) scale(0.5)">
        <circle cx="14" cy="14" r="7" fill="none" stroke={S} strokeWidth="1.2" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line
            key={a}
            x1={14 + Math.cos((a * Math.PI) / 180) * 9}
            y1={14 + Math.sin((a * Math.PI) / 180) * 9}
            x2={14 + Math.cos((a * Math.PI) / 180) * 12}
            y2={14 + Math.sin((a * Math.PI) / 180) * 12}
            stroke={S}
            strokeWidth="1"
          />
        ))}
        <circle cx="11" cy="13" r="1" fill={S} />
        <circle cx="17" cy="13" r="1" fill={S} />
        <path d="M11 17 Q14 19 17 17" fill="none" stroke={S} strokeWidth="0.8" />
      </g>
    ),
    train: (
      <g transform="translate(56,14) scale(0.45)">
        <rect x="4" y="10" width="20" height="10" fill="none" stroke={S} strokeWidth="1.2" />
        <rect x="18" y="6" width="8" height="8" fill="none" stroke={S} strokeWidth="1" />
        <circle cx="8" cy="22" r="3" fill="none" stroke={S} strokeWidth="1" />
        <circle cx="18" cy="22" r="3" fill="none" stroke={S} strokeWidth="1" />
      </g>
    ),
    umbrella: (
      <g transform="translate(58,12) scale(0.5)">
        <path d="M4 14 Q14 4 24 14" fill="none" stroke={S} strokeWidth="1.2" />
        <line x1="14" y1="14" x2="14" y2="24" stroke={S} strokeWidth="1.2" />
      </g>
    ),
    violin: (
      <g transform="translate(60,10) scale(0.45)">
        <ellipse cx="12" cy="18" rx="6" ry="8" fill="none" stroke={S} strokeWidth="1.2" />
        <rect x="10" y="4" width="4" height="12" fill="none" stroke={S} strokeWidth="1" />
      </g>
    ),
    whale: (
      <g transform="translate(56,14) scale(0.45)">
        <ellipse cx="16" cy="14" rx="12" ry="7" fill="none" stroke={S} strokeWidth="1.2" />
        <path d="M4 14 Q2 10 6 8" fill="none" stroke={S} strokeWidth="1" />
        <circle cx="22" cy="12" r="1.5" fill={S} />
      </g>
    ),
    xylophone: (
      <g transform="translate(56,14) scale(0.48)">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={6 + i * 5} y={10 + i * 2} width="4" height="12" fill="none" stroke={S} strokeWidth="1" />
        ))}
      </g>
    ),
    yak: (
      <g transform="translate(58,12) scale(0.42)">
        <ellipse cx="14" cy="16" rx="9" ry="7" fill="none" stroke={S} strokeWidth="1.2" />
        <path d="M6 10 Q4 4 8 6 M20 10 Q22 4 18 6" fill="none" stroke={S} strokeWidth="1" />
        <path d="M8 22 L6 26 M20 22 L22 26" stroke={S} strokeWidth="1" />
      </g>
    ),
    zebra: (
      <g transform="translate(56,12) scale(0.42)">
        <ellipse cx="16" cy="16" rx="11" ry="8" fill="none" stroke={S} strokeWidth="1.2" />
        <line x1="8" y1="12" x2="8" y2="20" stroke={S} strokeWidth="0.8" />
        <line x1="12" y1="11" x2="12" y2="21" stroke={S} strokeWidth="0.8" />
        <line x1="16" y1="11" x2="16" y2="21" stroke={S} strokeWidth="0.8" />
        <line x1="20" y1="12" x2="20" y2="20" stroke={S} strokeWidth="0.8" />
      </g>
    ),
  };
  return <>{icons[id] ?? icons.apple}</>;
}

const OBJECT_BY_LETTER: Record<string, string> = {
  a: "apple", b: "ball", c: "car", d: "dog", e: "elephant", f: "fox",
  g: "goat", h: "hat", i: "igloo", j: "jester", k: "kangaroo", l: "lion",
  m: "mouse", n: "nest", o: "owl", p: "pig", q: "queen", r: "rabbit",
  s: "sun", t: "train", u: "umbrella", v: "violin", w: "whale", x: "xylophone",
  y: "yak", z: "zebra",
};

export function AlphabetPictureGalleryArt({
  cardId,
  letterCase = "upper",
}: {
  cardId: string;
  letterCase?: "upper" | "lower";
}) {
  const key = cardId.toLowerCase();
  const letter = letterCase === "lower" ? key : key.toUpperCase();
  const iconId = OBJECT_BY_LETTER[key] ?? "apple";
  const isLower = letterCase === "lower";

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <text
        x="14"
        y={isLower ? 36 : 34}
        fontSize={isLower ? 26 : 28}
        fontFamily="var(--font-fredoka), Fredoka, sans-serif"
        fontWeight="700"
        fill={S}
      >
        {letter}
      </text>
      <Icon id={iconId} />
      <PracticeRow letter={letter} fontSize={isLower ? 13 : 14} y={isLower ? 93 : 92} />
    </svg>
  );
}

export function AlphabetUpperGalleryArt({ cardId }: { cardId: string }) {
  return <AlphabetPictureGalleryArt cardId={cardId} letterCase="upper" />;
}

export function AlphabetLowerGalleryArt({ cardId }: { cardId: string }) {
  return <AlphabetPictureGalleryArt cardId={cardId} letterCase="lower" />;
}
