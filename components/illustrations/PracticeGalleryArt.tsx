/** Practice worksheet gallery thumbnails — matching & path exercises */

import type { ReactNode } from "react";

const S = "#1a1a1a";
const DASH = "2 2";
const T = 5.5;

function Title({ children }: { children: string }) {
  return (
    <text x="50" y="9" textAnchor="middle" fontSize={T} fontWeight="bold" fill={S}>
      {children}
    </text>
  );
}

function Anchor({ cx, cy }: { cx: number; cy: number }) {
  return <circle cx={cx} cy={cy} r="2.2" fill="#fff" stroke={S} strokeWidth="0.8" />;
}

function DPath({ d }: { d: string }) {
  return <path d={d} fill="none" stroke="#888" strokeWidth="0.9" strokeDasharray={DASH} />;
}

function MatchRow({ y, left, right }: { y: number; left: string; right: string }) {
  return (
    <g fontSize="7" fill={S} textAnchor="middle">
      <text x="18" y={y}>{left}</text>
      <Anchor cx={32} cy={y - 2} />
      <Anchor cx={68} cy={y - 2} />
      <text x="82" y={y}>{right}</text>
    </g>
  );
}

function MiniElephant({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.35)`}>
      <ellipse cx="14" cy="14" rx="12" ry="8" fill="none" stroke={S} strokeWidth="1.2" />
      <path d="M2 14 Q0 8 4 6" fill="none" stroke={S} strokeWidth="1" />
    </g>
  );
}

function MiniHeli({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.38)`}>
      <ellipse cx="12" cy="14" rx="8" ry="5" fill="none" stroke={S} strokeWidth="1" />
      <line x1="4" y1="10" x2="20" y2="10" stroke={S} strokeWidth="1" />
      <line x1="12" y1="10" x2="12" y2="4" stroke={S} strokeWidth="1" />
    </g>
  );
}

function MiniBoat({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.38)`}>
      <path d="M4 16 L20 16 L16 10 L8 10 Z" fill="none" stroke={S} strokeWidth="1.2" />
      <line x1="12" y1="10" x2="12" y2="4" stroke={S} strokeWidth="1" />
    </g>
  );
}

const ART: Record<string, ReactNode> = {
  "practice-p1-animal-babies": (
    <>
      <Title>Match animals with babies.</Title>
      <MatchRow y={28} left="🐒" right="🐵" />
      <MatchRow y={48} left="🐘" right="🐘" />
      <MatchRow y={68} left="🦁" right="🦁" />
    </>
  ),
  "practice-p1-homes-natural-a": (
    <>
      <Title>Match animals with homes.</Title>
      <MatchRow y={28} left="🐰" right="🕳" />
      <MatchRow y={48} left="🐼" right="🎋" />
      <MatchRow y={68} left="🐻" right="🪨" />
    </>
  ),
  "practice-p1-homes-natural-b": (
    <>
      <Title>Match animals with homes.</Title>
      <MatchRow y={28} left="🦁" right="🪵" />
      <MatchRow y={48} left="🐒" right="🪨" />
      <MatchRow y={68} left="🐍" right="🌳" />
    </>
  ),
  "practice-p2-vehicle-paths": (
    <>
      <MiniHeli x={4} y={14} />
      <DPath d="M22 24 L34 20 L46 28 L58 24 L72 28" />
      <Anchor cx={72} cy={28} />
      <MiniBoat x={4} y={54} />
      <DPath d="M22 68 Q34 58 46 68 Q58 78 72 68" />
      <Anchor cx={72} cy={68} />
    </>
  ),
  "practice-p2-elephant-fox": (
    <>
      <MiniElephant x={4} y={14} />
      <DPath d="M22 28 H72" />
      <Anchor cx={22} cy={28} />
      <Anchor cx={72} cy={28} />
      <g transform="translate(4,54) scale(0.35)"><ellipse cx="12" cy="14" rx="8" ry="7" fill="none" stroke={S} strokeWidth="1.2" /><polygon points="6,8 8,2 10,8" fill="none" stroke={S} strokeWidth="0.8" /></g>
      <DPath d="M22 72 Q30 62 38 72 Q46 82 54 72 Q62 62 70 72" />
      <Anchor cx={22} cy={72} />
      <Anchor cx={72} cy={72} />
    </>
  ),
  "practice-p2-footprints": (
    <>
      <Title>Match animals with footprints.</Title>
      <MatchRow y={30} left="🐴" right="👣" />
      <MatchRow y={50} left="🐸" right="🐾" />
      <MatchRow y={70} left="🐧" right="👣" />
    </>
  ),
  "practice-p3-missing-parts-a": (
    <>
      <Title>Match missing animal parts.</Title>
      <MatchRow y={28} left="🐄" right="🐄" />
      <MatchRow y={48} left="🐹" right="👂" />
      <MatchRow y={68} left="🦆" right="🦆" />
    </>
  ),
  "practice-p3-pet-homes": (
    <>
      <Title>Match animals with homes.</Title>
      <MatchRow y={28} left="🐕" right="🏠" />
      <MatchRow y={48} left="🐟" right="🫧" />
      <MatchRow y={68} left="🐴" right="🏚" />
    </>
  ),
  "practice-p3-missing-parts-b": (
    <>
      <Title>Match missing animal parts.</Title>
      <MatchRow y={28} left="🐟" right="🐟" />
      <MatchRow y={48} left="🐫" right="🐫" />
      <MatchRow y={68} left="🐝" right="🪽" />
    </>
  ),
  "practice-p4-food-wild": (
    <>
      <Title>Match animals with food.</Title>
      <MatchRow y={28} left="🦁" right="🥩" />
      <MatchRow y={48} left="🐰" right="🥕" />
      <MatchRow y={68} left="🐒" right="🍌" />
    </>
  ),
  "practice-p4-footprints": (
    <>
      <Title>Match animals with footprints.</Title>
      <MatchRow y={28} left="🦔" right="👣" />
      <MatchRow y={48} left="🐕" right="🐾" />
      <MatchRow y={68} left="🐷" right="👣" />
    </>
  ),
  "practice-p4-homes-farm": (
    <>
      <Title>Match animals with homes.</Title>
      <MatchRow y={28} left="🦁" right="🪨" />
      <MatchRow y={48} left="🐄" right="🏚" />
      <MatchRow y={68} left="🐕" right="🏠" />
    </>
  ),
  "practice-p5-ufo-paths": (
    <>
      <text x="8" y="18" fontSize="8">🛸</text>
      <text x="72" y="18" fontSize="8">👽</text>
      <DPath d="M18 16 Q40 40 62 16" />
      <text x="8" y="58" fontSize="8">🚑</text>
      <text x="72" y="58" fontSize="8">👨‍⚕️</text>
      <DPath d="M18 56 Q40 32 62 56" />
      <text x="8" y="88" fontSize="8">🚑</text>
      <text x="72" y="88" fontSize="8">👨‍⚕️</text>
    </>
  ),
  "practice-p5-footprints": (
    <>
      <Title>Match animals with footprints.</Title>
      <MatchRow y={28} left="🦌" right="👣" />
      <MatchRow y={48} left="🦏" right="🐾" />
      <MatchRow y={68} left="🐿" right="👣" />
    </>
  ),
  "practice-p5-food-pets": (
    <>
      <Title>Match animals with food.</Title>
      <MatchRow y={28} left="🦆" right="🌿" />
      <MatchRow y={48} left="🐐" right="🐟" />
      <MatchRow y={68} left="🐱" right="🌾" />
    </>
  ),
  "practice-p6-animal-babies": (
    <>
      <Title>Match animals with babies.</Title>
      <MatchRow y={28} left="🐻" right="🐻" />
      <MatchRow y={48} left="🦌" right="🦌" />
      <MatchRow y={68} left="🐼" right="🐼" />
    </>
  ),
  "practice-p6-bird-homes": (
    <>
      <Title>Match birds to homes.</Title>
      <MatchRow y={28} left="🦉" right="🪹" />
      <MatchRow y={48} left="🐧" right="🏔" />
      <MatchRow y={68} left="🐔" right="🌳" />
    </>
  ),
  "practice-p6-footprints": (
    <>
      <Title>Match animals with footprints.</Title>
      <MatchRow y={28} left="🐱" right="🐾" />
      <MatchRow y={48} left="🦆" right="👣" />
      <MatchRow y={68} left="🐄" right="👣" />
    </>
  ),
  "practice-p7-baby-mother": (
    <>
      <Title>Trace baby to mother.</Title>
      <MatchRow y={28} left="🐕" right="🐶" />
      <DPath d="M32 26 Q50 20 68 26" />
      <MatchRow y={48} left="🐐" right="🐐" />
      <DPath d="M32 46 Q50 52 68 46" />
      <MatchRow y={68} left="🐔" right="🐤" />
      <DPath d="M32 66 Q50 60 68 66" />
    </>
  ),
  "practice-p7-pet-food": (
    <>
      <Title>Match pets with food.</Title>
      <MatchRow y={28} left="🐴" right="🌾" />
      <MatchRow y={48} left="🐰" right="🥕" />
      <MatchRow y={68} left="🐱" right="🥛" />
    </>
  ),
  "practice-p7-farm-homes": (
    <>
      <Title>Match animals with homes.</Title>
      <MatchRow y={28} left="🐄" right="🏚" />
      <MatchRow y={48} left="🐓" right="🏠" />
      <MatchRow y={68} left="🐤" right="🪺" />
    </>
  ),
  "practice-p8-bird-homes": (
    <>
      <Title>Match birds to homes.</Title>
      <MatchRow y={28} left="🐦" right="🪹" />
      <MatchRow y={48} left="🦆" right="🏠" />
      <MatchRow y={68} left="🐔" right="🌊" />
    </>
  ),
  "practice-p8-food-carnivore": (
    <>
      <Title>Match animals with food.</Title>
      <MatchRow y={28} left="🐻" right="🥩" />
      <MatchRow y={48} left="🦁" right="🥩" />
      <MatchRow y={68} left="🦌" right="🌿" />
    </>
  ),
  "practice-p8-food-herbivore": (
    <>
      <Title>Match animals with food.</Title>
      <MatchRow y={28} left="🐒" right="🍌" />
      <MatchRow y={48} left="🐍" right="🐭" />
      <MatchRow y={68} left="🐼" right="🎋" />
    </>
  ),
  "practice-p9-homes-make-a": (
    <>
      <Title>Match animals with homes.</Title>
      <MatchRow y={28} left="🐝" right="🏠" />
      <MatchRow y={48} left="🐭" right="🕳" />
      <MatchRow y={68} left="🐜" right="⛰" />
    </>
  ),
  "practice-p9-homes-make-b": (
    <>
      <Title>Match animals with homes.</Title>
      <MatchRow y={28} left="🐰" right="🕳" />
      <MatchRow y={48} left="🕷" right="🕸" />
      <MatchRow y={68} left="🐤" right="🪺" />
    </>
  ),
  "practice-p9-pet-food": (
    <>
      <Title>Match pets with food.</Title>
      <MatchRow y={28} left="🐄" right="🌾" />
      <MatchRow y={48} left="🐔" right="🌾" />
      <MatchRow y={68} left="🐕" right="🦴" />
    </>
  ),
  "practice-p10-homes-natural-a": (
    <>
      <Title>Match animals with homes.</Title>
      <MatchRow y={28} left="🐰" right="🕳" />
      <MatchRow y={48} left="🐼" right="🎋" />
      <MatchRow y={68} left="🐻" right="🪨" />
    </>
  ),
  "practice-p10-homes-natural-b": (
    <>
      <Title>Match animals with homes.</Title>
      <MatchRow y={28} left="🦁" right="🪵" />
      <MatchRow y={48} left="🐒" right="🪨" />
      <MatchRow y={68} left="🐍" right="🌳" />
    </>
  ),
  "practice-p10-baby-mother": (
    <>
      <Title>Trace baby to mother.</Title>
      <MatchRow y={28} left="🐴" right="🐴" />
      <DPath d="M32 26 Q50 18 68 26" />
      <MatchRow y={48} left="🦆" right="🐤" />
      <DPath d="M32 46 Q50 54 68 46" />
      <MatchRow y={68} left="🐑" right="🐑" />
      <DPath d="M32 66 Q50 58 68 66" />
    </>
  ),
};

export function PracticeGalleryArt({ cardId }: { cardId: string }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full p-1" aria-hidden>
      {ART[cardId] ?? ART["practice-p6-animal-babies"]}
    </svg>
  );
}
