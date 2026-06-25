/** Curve worksheet gallery thumbnails — curved tracing paths */

import type { ReactNode } from "react";

const S = "#1a1a1a";
const DASH = "2.5 2";
const DR = 2.2;

function Dot({ cx, cy }: { cx: number; cy: number }) {
  return <circle cx={cx} cy={cy} r={DR} fill={S} />;
}

function DPath({ d, sparse }: { d: string; sparse?: boolean }) {
  return <path d={d} fill="none" stroke="#888" strokeWidth="1" strokeDasharray={sparse ? "1.5 2.5" : DASH} />;
}

function RowGuides({ y1, y2 }: { y1: number; y2: number }) {
  return (
    <>
      <line x1="4" y1={y1} x2="96" y2={y1} stroke="#B8D4F0" strokeWidth="0.6" />
      <line x1="4" y1={y2} x2="96" y2={y2} stroke="#B8D4F0" strokeWidth="0.6" />
    </>
  );
}

function RuledPaper() {
  return (
    <>
      <line x1="4" y1="22" x2="96" y2="22" stroke="#6BB6FF" strokeWidth="0.8" />
      <line x1="4" y1="50" x2="96" y2="50" stroke="#E53935" strokeWidth="0.8" />
      <line x1="4" y1="78" x2="96" y2="78" stroke="#6BB6FF" strokeWidth="0.8" />
    </>
  );
}

function ConnectRow({ y, d, sparse }: { y: number; d: string; sparse?: boolean }) {
  return (
    <g>
      <RowGuides y1={y - 8} y2={y + 8} />
      <Dot cx={38} cy={y} />
      <DPath d={d} sparse={sparse} />
      <Dot cx={78} cy={y} />
    </g>
  );
}

function MiniCar({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.38)`}>
      <rect x="2" y="8" width="18" height="10" rx="2" fill="none" stroke={S} strokeWidth="1" />
      <circle cx="6" cy="20" r="3" fill="none" stroke={S} strokeWidth="1" />
      <circle cx="16" cy="20" r="3" fill="none" stroke={S} strokeWidth="1" />
    </g>
  );
}

function MiniHouse({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.38)`}>
      <polygon points="12,2 22,12 2,12" fill="none" stroke={S} strokeWidth="1" />
      <rect x="4" y="12" width="16" height="12" fill="none" stroke={S} strokeWidth="1" />
      <rect x="6" y="16" width="6" height="8" fill="none" stroke={S} strokeWidth="0.8" />
    </g>
  );
}

function MiniTruck({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.38)`}>
      <rect x="2" y="10" width="12" height="10" fill="none" stroke={S} strokeWidth="1" />
      <rect x="14" y="6" width="8" height="14" fill="none" stroke={S} strokeWidth="1" />
      <circle cx="8" cy="22" r="3" fill="none" stroke={S} strokeWidth="1" />
      <circle cx="18" cy="22" r="3" fill="none" stroke={S} strokeWidth="1" />
    </g>
  );
}

function MiniMouse({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.42)`}>
      <ellipse cx="12" cy="16" rx="8" ry="7" fill="none" stroke={S} strokeWidth="1.2" />
      <circle cx="8" cy="8" r="4" fill="none" stroke={S} strokeWidth="1" />
      <circle cx="16" cy="8" r="4" fill="none" stroke={S} strokeWidth="1" />
      <circle cx="10" cy="14" r="1" fill={S} />
    </g>
  );
}

function MiniCheese({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.4)`}>
      <polygon points="4,20 20,4 20,20" fill="none" stroke={S} strokeWidth="1.2" />
      <circle cx="12" cy="12" r="1.5" fill={S} />
      <circle cx="16" cy="16" r="1" fill={S} />
    </g>
  );
}

function MiniRabbit({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.4)`}>
      <ellipse cx="12" cy="16" rx="7" ry="6" fill="none" stroke={S} strokeWidth="1.2" />
      <ellipse cx="8" cy="6" rx="2" ry="6" fill="none" stroke={S} strokeWidth="1" />
      <ellipse cx="16" cy="6" rx="2" ry="6" fill="none" stroke={S} strokeWidth="1" />
    </g>
  );
}

function MiniCarrot({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.38)`}>
      <path d="M8 20 L12 4 L16 20 Z" fill="none" stroke={S} strokeWidth="1.2" />
      <path d="M10 4 Q12 0 14 4" fill="none" stroke="#4CAF50" strokeWidth="1" />
    </g>
  );
}

function MiniBird({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.4)`}>
      <ellipse cx="14" cy="14" rx="10" ry="6" fill="none" stroke={S} strokeWidth="1.2" />
      <circle cx="20" cy="12" r="2" fill={S} />
      <path d="M4 14 L0 12 L4 16" fill="none" stroke={S} strokeWidth="1" />
    </g>
  );
}

function MiniNest({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.38)`}>
      <path d="M4 16 Q12 8 20 16" fill="none" stroke={S} strokeWidth="1.2" />
      <ellipse cx="10" cy="14" rx="2" ry="2" fill="none" stroke={S} strokeWidth="0.8" />
      <ellipse cx="14" cy="14" rx="2" ry="2" fill="none" stroke={S} strokeWidth="0.8" />
    </g>
  );
}

function MiniMonkey({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.4)`}>
      <circle cx="12" cy="12" r="8" fill="none" stroke={S} strokeWidth="1.2" />
      <circle cx="6" cy="8" r="3" fill="none" stroke={S} strokeWidth="1" />
      <circle cx="18" cy="8" r="3" fill="none" stroke={S} strokeWidth="1" />
      <path d="M8 22 Q12 26 16 22" fill="none" stroke={S} strokeWidth="1" />
    </g>
  );
}

function MiniTree({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.38)`}>
      <rect x="10" y="14" width="4" height="10" fill="none" stroke={S} strokeWidth="1" />
      <circle cx="12" cy="10" r="8" fill="none" stroke={S} strokeWidth="1.2" />
    </g>
  );
}

function MiniDolphin({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.42)`}>
      <path d="M4 14 Q12 6 22 12 Q18 16 12 14 Q8 18 4 14" fill="none" stroke={S} strokeWidth="1.2" />
      <polygon points="4,14 0,10 2,16" fill={S} />
    </g>
  );
}

function MiniFish({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.4)`}>
      <ellipse cx="12" cy="12" rx="10" ry="5" fill="none" stroke={S} strokeWidth="1.2" />
      <polygon points="22,12 28,8 28,16" fill="none" stroke={S} strokeWidth="1" />
    </g>
  );
}

function MiniCat({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.4)`}>
      <ellipse cx="12" cy="15" rx="8" ry="7" fill="none" stroke={S} strokeWidth="1.2" />
      <polygon points="6,8 8,2 10,8" fill="none" stroke={S} strokeWidth="1" />
      <polygon points="14,8 16,2 18,8" fill="none" stroke={S} strokeWidth="1" />
    </g>
  );
}

function MiniBee({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.4)`}>
      <ellipse cx="12" cy="13" rx="7" ry="5" fill="none" stroke={S} strokeWidth="1.2" />
      <line x1="6" y1="13" x2="18" y2="13" stroke={S} strokeWidth="0.8" />
      <line x1="8" y1="11" x2="16" y2="11" stroke={S} strokeWidth="0.8" />
    </g>
  );
}

function MiniFlower({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.38)`}>
      <circle cx="12" cy="12" r="4" fill="none" stroke={S} strokeWidth="1" />
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx={12 + Math.cos((a * Math.PI) / 180) * 8} cy={12 + Math.sin((a * Math.PI) / 180) * 8} rx="3" ry="5" fill="none" stroke={S} strokeWidth="0.8" />
      ))}
    </g>
  );
}

function MiniButterfly({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.4)`}>
      <ellipse cx="8" cy="12" rx="6" ry="8" fill="none" stroke={S} strokeWidth="1" />
      <ellipse cx="16" cy="12" rx="6" ry="8" fill="none" stroke={S} strokeWidth="1" />
      <line x1="12" y1="6" x2="12" y2="18" stroke={S} strokeWidth="1.2" />
    </g>
  );
}

function MiniDog({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.4)`}>
      <ellipse cx="12" cy="14" rx="9" ry="7" fill="none" stroke={S} strokeWidth="1.2" />
      <ellipse cx="6" cy="8" rx="4" ry="5" fill="none" stroke={S} strokeWidth="1" />
      <ellipse cx="18" cy="8" rx="4" ry="5" fill="none" stroke={S} strokeWidth="1" />
    </g>
  );
}

function MiniBone({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.38)`}>
      <rect x="8" y="10" width="8" height="4" fill="none" stroke={S} strokeWidth="1.2" />
      <ellipse cx="6" cy="12" rx="3" ry="4" fill="none" stroke={S} strokeWidth="1" />
      <ellipse cx="18" cy="12" rx="3" ry="4" fill="none" stroke={S} strokeWidth="1" />
    </g>
  );
}

function MiniFrog({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.4)`}>
      <ellipse cx="12" cy="16" rx="10" ry="8" fill="none" stroke={S} strokeWidth="1.2" />
      <circle cx="8" cy="10" r="3" fill="none" stroke={S} strokeWidth="1" />
      <circle cx="16" cy="10" r="3" fill="none" stroke={S} strokeWidth="1" />
    </g>
  );
}

function MiniLeaf({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.42)`}>
      <path d="M12 2 Q20 12 12 22 Q4 12 12 2" fill="none" stroke={S} strokeWidth="1.2" />
      <line x1="12" y1="4" x2="12" y2="20" stroke={S} strokeWidth="0.8" />
    </g>
  );
}

function MiniSnake({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.4)`}>
      <path d="M4 16 Q8 8 14 14 Q18 18 22 10" fill="none" stroke={S} strokeWidth="1.2" />
      <circle cx="22" cy="10" r="1.5" fill={S} />
    </g>
  );
}

function MiniSquirrel({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.4)`}>
      <ellipse cx="12" cy="16" rx="7" ry="8" fill="none" stroke={S} strokeWidth="1.2" />
      <path d="M4 10 Q0 4 6 6" fill="none" stroke={S} strokeWidth="1.2" />
      <circle cx="10" cy="14" r="1" fill={S} />
    </g>
  );
}

function MiniWhale({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.38)`}>
      <ellipse cx="14" cy="14" rx="12" ry="7" fill="none" stroke={S} strokeWidth="1.2" />
      <path d="M2 14 Q0 8 4 10" fill="none" stroke={S} strokeWidth="1" />
      <circle cx="20" cy="12" r="1.5" fill={S} />
    </g>
  );
}

function MiniCup({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.4)`}>
      <path d="M6 8 L8 20 L16 20 L18 8 Z" fill="none" stroke={S} strokeWidth="1.2" />
      <path d="M8 4 Q12 0 16 4" fill="none" stroke={S} strokeWidth="0.8" />
    </g>
  );
}

function MiniChair({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.38)`}>
      <rect x="6" y="8" width="12" height="4" fill="none" stroke={S} strokeWidth="1" />
      <line x1="8" y1="12" x2="8" y2="22" stroke={S} strokeWidth="1" />
      <line x1="16" y1="12" x2="16" y2="22" stroke={S} strokeWidth="1" />
      <line x1="4" y1="8" x2="4" y2="18" stroke={S} strokeWidth="1" />
    </g>
  );
}

function ScallopRow({ y, n = 4 }: { y: number; n?: number }) {
  const parts: string[] = [];
  let x = 38;
  for (let i = 0; i < n; i++) {
    parts.push(`M${x} ${y} Q${x + 5} ${y - 10} ${x + 10} ${y}`);
    x += 10;
  }
  return (
    <g>
      <RowGuides y1={y - 8} y2={y + 8} />
      <Dot cx={38} cy={y} />
      <DPath d={parts.join(" ")} />
      <Dot cx={38 + n * 10} cy={y} />
    </g>
  );
}

function HumpRow({ y, n = 3, sparse }: { y: number; n?: number; sparse?: boolean }) {
  const parts: string[] = [];
  let x = 38;
  const w = 12;
  for (let i = 0; i < n; i++) {
    parts.push(`M${x} ${y} Q${x + w / 2} ${y - 12} ${x + w} ${y}`);
    x += w;
  }
  return (
    <g>
      <RowGuides y1={y - 8} y2={y + 8} />
      <Dot cx={38} cy={y} />
      <DPath d={parts.join(" ")} sparse={sparse} />
      <Dot cx={38 + n * w} cy={y} />
    </g>
  );
}

function WaveRow({ y, amp, sparse }: { y: number; amp: number; sparse?: boolean }) {
  return (
    <ConnectRow
      y={y}
      sparse={sparse}
      d={`M38 ${y} Q46 ${y - amp} 54 ${y} Q62 ${y + amp} 70 ${y} Q74 ${y - amp / 2} 78 ${y}`}
    />
  );
}

function LoopRow({ y, n = 3, sparse }: { y: number; n?: number; sparse?: boolean }) {
  const parts: string[] = [];
  let x = 38;
  const w = 10;
  for (let i = 0; i < n; i++) {
    parts.push(`M${x} ${y} Q${x + w / 2} ${y - 14} ${x + w} ${y}`);
    x += w;
  }
  return (
    <g>
      <RowGuides y1={y - 8} y2={y + 8} />
      <Dot cx={38} cy={y} />
      <DPath d={parts.join(" ")} sparse={sparse} />
      <Dot cx={38 + n * w} cy={y} />
    </g>
  );
}

const ART: Record<string, ReactNode> = {
  "curve-p1-car-road": (
    <>
      <MiniCar x={4} y={8} />
      <path d="M22 22 Q40 8 50 30 Q60 52 72 68" fill="none" stroke="#888" strokeWidth="1.2" strokeDasharray={DASH} />
      <MiniHouse x={62} y={58} />
    </>
  ),
  "curve-p1-truck-zig": (
    <>
      <MiniTruck x={34} y={6} />
      <path d="M48 28 L58 28 L58 38 L68 38 L68 48 L78 48" fill="none" stroke="#888" strokeWidth="1" strokeDasharray={DASH} />
      <rect x="62" y="58" width="16" height="12" fill="none" stroke={S} strokeWidth="1" />
    </>
  ),
  "curve-p1-necklace-u": (
    <>
      <path d="M6 20 Q10 14 14 20 Q18 26 22 20" fill="none" stroke={S} strokeWidth="1" />
      <ScallopRow y={32} />
      <path d="M6 58 Q10 52 14 58 Q18 64 22 58" fill="none" stroke={S} strokeWidth="1" />
      <ScallopRow y={70} />
    </>
  ),
  "curve-p2-frog-rain": (
    <>
      {[44, 52, 60, 68].map((x) => <line key={x} x1={x} y1={8} x2={x} y2={28 + (x % 12)} stroke="#888" strokeWidth="1" strokeDasharray={DASH} />)}
      <g transform="translate(28,58) scale(0.5)"><ellipse cx="12" cy="16" rx="10" ry="8" fill="none" stroke={S} strokeWidth="1.2" /><path d="M4 10 Q12 2 20 10" fill="none" stroke={S} strokeWidth="1" /></g>
    </>
  ),
  "curve-p2-number-3": (
    <>
      <text x="6" y="38" fontSize="22" fontWeight="bold" fill="none" stroke={S} strokeWidth="1.2">3</text>
      <path d="M38 28 Q52 20 62 28 Q52 36 38 36 Q52 44 62 52" fill="none" stroke="#888" strokeWidth="1" strokeDasharray={DASH} />
      <text x="6" y="72" fontSize="22" fontWeight="bold" fill="none" stroke={S} strokeWidth="1.2">3</text>
      <path d="M38 62 Q52 54 62 62 Q52 70 38 70 Q52 78 62 86" fill="none" stroke="#888" strokeWidth="1" strokeDasharray={DASH} />
    </>
  ),
  "curve-p2-orange-c": (
    <>
      <path d="M6 28 Q12 18 18 28" fill="none" stroke={S} strokeWidth="1.2" />
      {[38, 48, 58, 68].map((x) => <path key={x} d={`M${x} 32 Q${x + 5} 22 ${x + 10} 32`} fill="none" stroke="#888" strokeWidth="1" strokeDasharray={DASH} />)}
      <path d="M6 68 Q12 58 18 68" fill="none" stroke={S} strokeWidth="1.2" />
      {[38, 48, 58, 68].map((x) => <path key={x} d={`M${x} 72 Q${x + 5} 62 ${x + 10} 72`} fill="none" stroke="#888" strokeWidth="1" strokeDasharray={DASH} />)}
    </>
  ),
  "curve-p3-cup-c": (
    <>
      <MiniCup x={2} y={14} />
      {[38, 48, 58].map((x) => <path key={x} d={`M${x} 32 Q${x + 8} 22 ${x + 16} 32`} fill="none" stroke="#888" strokeWidth="1" strokeDasharray={DASH} />)}
      <MiniCup x={2} y={54} />
      {[38, 48, 58].map((x) => <path key={x} d={`M${x} 72 Q${x + 8} 62 ${x + 16} 72`} fill="none" stroke="#888" strokeWidth="1" strokeDasharray={DASH} />)}
    </>
  ),
  "curve-p3-wheel-circle": (
    <>
      <circle cx="14" cy="28" r="8" fill="none" stroke={S} strokeWidth="1.2" />
      {[42, 54, 66].map((x) => <circle key={x} cx={x + 6} cy={28} r="6" fill="none" stroke="#888" strokeWidth="1" strokeDasharray={DASH} />)}
      <circle cx="14" cy="68" r="8" fill="none" stroke={S} strokeWidth="1.2" />
      {[42, 54, 66].map((x) => <circle key={x} cx={x + 6} cy={68} r="6" fill="none" stroke="#888" strokeWidth="1" strokeDasharray={DASH} />)}
    </>
  ),
  "curve-p3-chair-arch": (
    <>
      <MiniChair x={2} y={12} />
      <HumpRow y={32} n={4} />
      <MiniChair x={2} y={52} />
      <HumpRow y={72} n={4} />
    </>
  ),
  "curve-p4-mouse-cheese": (
    <>
      <MiniMouse x={2} y={14} />
      <MiniCheese x={68} y={14} />
      <path d="M38 28 L46 28 L54 36 L62 36 L70 28 L78 28" fill="none" stroke="#888" strokeWidth="1" strokeDasharray={DASH} />
      <MiniMouse x={2} y={54} />
      <MiniCheese x={68} y={54} />
      <path d="M38 68 L46 68 L54 76 L62 76 L70 68 L78 68" fill="none" stroke="#888" strokeWidth="1" strokeDasharray={DASH} />
    </>
  ),
  "curve-p4-whale-scallop": (
    <>
      <MiniWhale x={2} y={14} />
      <ScallopRow y={32} />
      <MiniWhale x={2} y={54} />
      <ScallopRow y={72} />
    </>
  ),
  "curve-p4-cat-wave": (
    <>
      <MiniCat x={2} y={14} />
      <WaveRow y={32} amp={8} />
      <MiniCat x={2} y={54} />
      <WaveRow y={72} amp={8} />
    </>
  ),
  "curve-p5-rabbit-hump": (
    <>
      <MiniRabbit x={2} y={12} />
      <MiniCarrot x={68} y={12} />
      <HumpRow y={32} />
      <MiniRabbit x={2} y={52} />
      <MiniCarrot x={68} y={52} />
      <HumpRow y={72} sparse />
    </>
  ),
  "curve-p5-bird-wave": (
    <>
      <MiniBird x={2} y={12} />
      <MiniNest x={68} y={12} />
      <WaveRow y={32} amp={10} />
      <MiniBird x={2} y={52} />
      <MiniNest x={68} y={52} />
      <WaveRow y={72} amp={10} sparse />
    </>
  ),
  "curve-p5-monkey-loop": (
    <>
      <MiniMonkey x={2} y={12} />
      <MiniTree x={68} y={12} />
      <LoopRow y={32} n={4} />
      <MiniMonkey x={2} y={52} />
      <MiniTree x={68} y={52} />
      <LoopRow y={72} n={4} sparse />
    </>
  ),
  "curve-p6-dolphin-wave": (
    <>
      <MiniDolphin x={2} y={12} />
      <MiniFish x={68} y={12} />
      <path d="M38 28 Q44 18 50 28 Q56 38 62 28 Q68 18 74 28 Q78 34 82 28" fill="none" stroke="#888" strokeWidth="1" strokeDasharray={DASH} />
      <MiniDolphin x={2} y={52} />
      <MiniFish x={68} y={52} />
      <path d="M38 68 L78 68" fill="none" stroke="#888" strokeWidth="1" strokeDasharray="1.5 2.5" />
    </>
  ),
  "curve-p6-cat-step": (
    <>
      <MiniCat x={2} y={12} />
      <MiniFish x={68} y={12} />
      <path d="M38 28 H50 V36 H62 V28 H78" fill="none" stroke="#888" strokeWidth="1" strokeDasharray={DASH} />
      <MiniCat x={2} y={52} />
      <MiniFish x={68} y={52} />
      <path d="M38 68 H50 V74 H62 V68 H78" fill="none" stroke="#888" strokeWidth="1" strokeDasharray="1.5 2.5" />
    </>
  ),
  "curve-p6-bee-loop": (
    <>
      <MiniBee x={2} y={12} />
      <MiniFlower x={68} y={12} />
      <LoopRow y={32} n={3} />
      <MiniBee x={2} y={52} />
      <MiniFlower x={68} y={52} />
      <LoopRow y={72} n={3} sparse />
    </>
  ),
  "curve-p7-bird-loop": (
    <>
      <RuledPaper />
      <MiniBird x={2} y={18} />
      <ConnectRow y={36} d="M38 36 Q46 22 54 36 Q62 50 70 36" />
      <MiniBird x={2} y={58} />
      <ConnectRow y={76} d="M38 76 Q46 90 54 76 Q62 62 70 76" sparse />
    </>
  ),
  "curve-p7-squirrel-s": (
    <>
      <RuledPaper />
      <MiniSquirrel x={2} y={18} />
      <WaveRow y={36} amp={12} />
      <MiniSquirrel x={2} y={58} />
      <WaveRow y={76} amp={6} sparse />
    </>
  ),
  "curve-p7-fish-arch": (
    <>
      <RuledPaper />
      <MiniFish x={2} y={18} />
      <HumpRow y={36} n={2} />
      <MiniFish x={2} y={58} />
      <HumpRow y={76} n={2} sparse />
    </>
  ),
  "curve-p8-butterfly-wave": (
    <>
      <MiniButterfly x={2} y={12} />
      <MiniFlower x={68} y={12} />
      <WaveRow y={32} amp={8} />
      <MiniButterfly x={2} y={52} />
      <MiniFlower x={68} y={52} />
      <WaveRow y={72} amp={8} sparse />
    </>
  ),
  "curve-p8-dog-zig": (
    <>
      <MiniDog x={2} y={12} />
      <MiniBone x={68} y={12} />
      <path d="M38 32 L46 24 L54 32 L62 24 L70 32 L78 32" fill="none" stroke="#888" strokeWidth="1" strokeDasharray={DASH} />
      <MiniDog x={2} y={52} />
      <MiniBone x={68} y={52} />
      <path d="M38 72 L46 64 L54 72 L62 64 L70 72 L78 72" fill="none" stroke="#888" strokeWidth="1" strokeDasharray="1.5 2.5" />
    </>
  ),
  "curve-p8-frog-arch": (
    <>
      <MiniFrog x={2} y={12} />
      <MiniBee x={68} y={12} />
      <HumpRow y={32} n={4} />
      <MiniFrog x={2} y={52} />
      <MiniBee x={68} y={52} />
      <HumpRow y={72} n={4} sparse />
    </>
  ),
  "curve-p9-leaf-hump": (
    <>
      <MiniLeaf x={2} y={14} />
      <path d="M38 28 Q44 40 50 28 Q56 40 62 28 Q68 40 74 28" fill="none" stroke="#888" strokeWidth="1" strokeDasharray={DASH} />
      <MiniLeaf x={2} y={54} />
      <path d="M38 68 Q44 80 50 68 Q56 80 62 68 Q68 80 74 68" fill="none" stroke="#888" strokeWidth="1" strokeDasharray={DASH} />
    </>
  ),
  "curve-p9-snake-s": (
    <>
      <MiniSnake x={2} y={14} />
      <WaveRow y={32} amp={10} />
      <MiniSnake x={2} y={54} />
      <WaveRow y={72} amp={10} />
    </>
  ),
  "curve-p9-mouse-loop": (
    <>
      <MiniMouse x={2} y={12} />
      <MiniCheese x={68} y={12} />
      <LoopRow y={32} n={3} />
      <MiniMouse x={2} y={52} />
      <MiniCheese x={68} y={52} />
      <LoopRow y={72} n={3} />
    </>
  ),
};

export function CurveGalleryArt({ cardId }: { cardId: string }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      {ART[cardId] ?? ART["curve-p4-mouse-cheese"]}
    </svg>
  );
}
