/** Dots worksheet gallery — 18 picker thumbnails (6 pages × 3), batch 2 reference */

import type { ReactNode } from "react";
const STROKE = "#1a1a1a";
const DASH = "3 2.5";
const DOT_R = 2.8;

function Dot({ cx, cy }: { cx: number; cy: number }) {
  return <circle cx={cx} cy={cy} r={DOT_R} fill={STROKE} />;
}

function DottedLine({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#888" strokeWidth="1.2" strokeDasharray={DASH} />;
}

function RowGuide({ y, x1 = 38, x2 = 92 }: { y: number; x1?: number; x2?: number }) {
  return (
    <g>
      <Dot cx={x1} cy={y} />
      <DottedLine x1={x1} y1={y} x2={x2} y2={y} />
      <Dot cx={x2} cy={y} />
    </g>
  );
}

function MiniPenguin({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.55)`}>
      <ellipse cx="12" cy="14" rx="9" ry="11" fill="#fff" stroke={STROKE} strokeWidth="1.2" />
      <circle cx="8" cy="10" r="1.5" fill={STROKE} />
      <circle cx="16" cy="10" r="1.5" fill={STROKE} />
      <polygon points="10,2 12,-2 14,2" fill={STROKE} />
    </g>
  );
}

function MiniOwl({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.5)`}>
      <ellipse cx="12" cy="14" rx="10" ry="12" fill="#fff" stroke={STROKE} strokeWidth="1.2" />
      <circle cx="8" cy="12" r="4" fill="none" stroke={STROKE} strokeWidth="1" />
      <circle cx="16" cy="12" r="4" fill="none" stroke={STROKE} strokeWidth="1" />
      <polygon points="8,4 12,0 16,4" fill={STROKE} />
    </g>
  );
}

function MiniSquirrel({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.48)`}>
      <ellipse cx="12" cy="16" rx="8" ry="9" fill="#fff" stroke={STROKE} strokeWidth="1.2" />
      <path d="M4 10 Q0 4 6 6" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <circle cx="10" cy="13" r="1.2" fill={STROKE} />
      <ellipse cx="18" cy="20" rx="3" ry="4" fill="#C68642" stroke={STROKE} strokeWidth="0.8" />
    </g>
  );
}

function MiniTeddy({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.5)`}>
      <circle cx="8" cy="8" r="4" fill="none" stroke={STROKE} strokeWidth="1" />
      <circle cx="16" cy="8" r="4" fill="none" stroke={STROKE} strokeWidth="1" />
      <circle cx="12" cy="14" r="7" fill="none" stroke={STROKE} strokeWidth="1.2" />
    </g>
  );
}

function MiniFish({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.5)`}>
      <ellipse cx="12" cy="12" rx="10" ry="6" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <polygon points="22,12 28,8 28,16" fill="none" stroke={STROKE} strokeWidth="1" />
    </g>
  );
}

function MiniLion({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.45)`}>
      <circle cx="12" cy="12" r="10" fill="none" stroke={STROKE} strokeWidth="1" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <line key={i} x1={12 + Math.cos(a) * 10} y1={12 + Math.sin(a) * 10} x2={12 + Math.cos(a) * 14} y2={12 + Math.sin(a) * 14} stroke={STROKE} strokeWidth="1" />;
      })}
    </g>
  );
}

function MiniCamel({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.42)`}>
      <path d="M4 22 L8 14 L12 18 L16 10 L20 14 L24 22" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <circle cx="20" cy="9" r="2" fill="none" stroke={STROKE} strokeWidth="1" />
    </g>
  );
}

function MiniBear({ x, y }: { x: number; y: number }) {
  return <MiniTeddy x={x} y={y} />;
}

function MiniPig({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.48)`}>
      <ellipse cx="12" cy="14" rx="9" ry="8" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <circle cx="8" cy="8" r="3" fill="none" stroke={STROKE} strokeWidth="1" />
      <circle cx="16" cy="8" r="3" fill="none" stroke={STROKE} strokeWidth="1" />
      <ellipse cx="12" cy="15" rx="4" ry="3" fill="none" stroke={STROKE} strokeWidth="1" />
    </g>
  );
}

function MiniCat({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.48)`}>
      <ellipse cx="12" cy="15" rx="8" ry="7" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <polygon points="6,8 8,2 10,8" fill="none" stroke={STROKE} strokeWidth="1" />
      <polygon points="14,8 16,2 18,8" fill="none" stroke={STROKE} strokeWidth="1" />
    </g>
  );
}

function MiniButterfly({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.45)`}>
      <ellipse cx="8" cy="12" rx="6" ry="8" fill="none" stroke={STROKE} strokeWidth="1" />
      <ellipse cx="16" cy="12" rx="6" ry="8" fill="none" stroke={STROKE} strokeWidth="1" />
      <line x1="12" y1="6" x2="12" y2="18" stroke={STROKE} strokeWidth="1.2" />
    </g>
  );
}

function MiniBee({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.45)`}>
      <ellipse cx="12" cy="13" rx="7" ry="5" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <line x1="6" y1="13" x2="18" y2="13" stroke={STROKE} strokeWidth="0.8" />
      <line x1="8" y1="11" x2="16" y2="11" stroke={STROKE} strokeWidth="0.8" />
    </g>
  );
}

function MiniAnt({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.5)`}>
      <ellipse cx="12" cy="14" rx="3" ry="4" fill="none" stroke={STROKE} strokeWidth="1" />
      <ellipse cx="8" cy="10" rx="2.5" ry="3" fill="none" stroke={STROKE} strokeWidth="1" />
      <ellipse cx="16" cy="10" rx="2.5" ry="3" fill="none" stroke={STROKE} strokeWidth="1" />
      <line x1="6" y1="8" x2="2" y2="4" stroke={STROKE} strokeWidth="0.8" />
      <line x1="18" y1="8" x2="22" y2="4" stroke={STROKE} strokeWidth="0.8" />
    </g>
  );
}

function MiniSnail({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.48)`}>
      <circle cx="10" cy="12" r="6" fill="none" stroke={STROKE} strokeWidth="1" />
      <path d="M16 12 Q22 10 24 14" fill="none" stroke={STROKE} strokeWidth="1.2" />
    </g>
  );
}

function ZigzagRow({ y, x1 = 38, x2 = 92 }: { y: number; x1?: number; x2?: number }) {
  const mid = (x1 + x2) / 2;
  const dip = y + 8;
  return (
    <g>
      <Dot cx={x1} cy={y} />
      <Dot cx={mid} cy={dip} />
      <Dot cx={x2} cy={y} />
      <polyline points={`${x1},${y} ${mid},${dip} ${x2},${y}`} fill="none" stroke="#888" strokeWidth="1.2" strokeDasharray={DASH} />
    </g>
  );
}

function VerticalRow({ y, x = 65 }: { y: number; x?: number }) {
  return (
    <g>
      <Dot cx={x} cy={y} />
      <DottedLine x1={x} y1={y} x2={x} y2={y + 14} />
      <Dot cx={x} cy={y + 7} />
      <Dot cx={x} cy={y + 14} />
    </g>
  );
}

function WaveRow({ y, x1 = 38, x2 = 92 }: { y: number; x1?: number; x2?: number }) {
  const q1 = x1 + (x2 - x1) * 0.33;
  const q2 = x1 + (x2 - x1) * 0.66;
  const path = `M ${x1} ${y} Q ${q1} ${y - 6} ${(x1 + x2) / 2} ${y} Q ${q2} ${y + 6} ${x2} ${y}`;
  return (
    <g>
      <Dot cx={x1} cy={y} />
      <Dot cx={(x1 + x2) / 2} cy={y} />
      <Dot cx={x2} cy={y} />
      <path d={path} fill="none" stroke="#888" strokeWidth="1.2" strokeDasharray={DASH} />
    </g>
  );
}

function ArcPair({ y, outward }: { y: number; outward: boolean }) {
  const x1 = 42;
  const x2 = 92;
  const path = outward
    ? `M ${x1} ${y + 10} Q ${(x1 + x2) / 2} ${y - 8} ${x2} ${y + 10}`
    : `M ${x1} ${y - 2} Q ${(x1 + x2) / 2} ${y + 14} ${x2} ${y - 2}`;
  return (
    <g>
      <Dot cx={x1} cy={y} />
      <Dot cx={x2} cy={y} />
      <path d={path} fill="none" stroke="#888" strokeWidth="1.2" strokeDasharray={DASH} />
    </g>
  );
}

const ART: Record<string, ReactNode> = {
  /* Page 1 */
  "dots-p1-h": (
    <>
      <RowGuide y={32} />
      <RowGuide y={58} />
    </>
  ),
  "dots-p1-v": (
    <>
      <g><Dot cx={50} cy={28} /><DottedLine x1={50} y1={28} x2={50} y2={72} /><Dot cx={50} cy={72} /></g>
      <g><Dot cx={72} cy={28} /><DottedLine x1={72} y1={28} x2={72} y2={72} /><Dot cx={72} cy={72} /></g>
    </>
  ),
  "dots-p1-diag-up": (
    <>
      <g><Dot cx={38} cy={68} /><DottedLine x1={38} y1={68} x2={92} y2={28} /><Dot cx={92} cy={28} /></g>
      <g><Dot cx={38} cy={48} /><DottedLine x1={38} y1={48} x2={92} y2={18} /><Dot cx={92} cy={18} /></g>
    </>
  ),
  /* Page 2 */
  "dots-p2-diag-down": (
    <>
      <g><Dot cx={38} cy={28} /><DottedLine x1={38} y1={28} x2={92} y2={68} /><Dot cx={92} cy={68} /></g>
      <g><Dot cx={38} cy={48} /><DottedLine x1={38} y1={48} x2={92} y2={78} /><Dot cx={92} cy={78} /></g>
    </>
  ),
  "dots-p2-animals": (
    <>
      <MiniPenguin x={2} y={18} /><RowGuide y={28} x1={38} x2={92} />
      <MiniOwl x={2} y={40} /><RowGuide y={50} x1={38} x2={92} />
      <MiniSquirrel x={0} y={62} /><RowGuide y={72} x1={38} x2={92} />
    </>
  ),
  "dots-p2-triple-h": (
    <>
      <RowGuide y={30} x1={38} x2={72} /><Dot cx={82} cy={30} />
      <RowGuide y={50} x1={38} x2={72} /><Dot cx={82} cy={50} />
      <RowGuide y={70} x1={38} x2={72} /><Dot cx={82} cy={70} />
    </>
  ),
  /* Page 3 */
  "dots-p3-zig-toys": (
    <>
      <MiniTeddy x={0} y={14} /><ZigzagRow y={24} />
      <g transform="translate(2,36)"><circle cx="8" cy="8" r="5" fill="none" stroke={STROKE} strokeWidth="1" /><line x1="14" y1="4" x2="18" y2="12" stroke={STROKE} strokeWidth="1" /></g>
      <ZigzagRow y={46} />
      <g transform="translate(0,58)"><ellipse cx="10" cy="10" rx="6" ry="5" fill="none" stroke={STROKE} strokeWidth="1" /><polygon points="4,6 6,2 8,6" fill={STROKE} /></g>
      <ZigzagRow y={68} />
    </>
  ),
  "dots-p3-vertical-animals": (
    <>
      <MiniFish x={0} y={14} /><VerticalRow y={22} />
      <MiniLion x={0} y={38} /><VerticalRow y={46} />
      <MiniCamel x={0} y={60} /><VerticalRow y={68} />
    </>
  ),
  "dots-p3-mixed": (
    <>
      <MiniButterfly x={0} y={14} /><RowGuide y={24} x1={38} x2={82} /><Dot cx={88} cy={24} />
      <MiniTeddy x={0} y={38} /><ZigzagRow y={48} />
      <g transform="translate(0,58)"><ellipse cx="12" cy="14" rx="10" ry="6" fill="none" stroke={STROKE} strokeWidth="1" /></g>
      <g><Dot cx={50} cy={68} /><DottedLine x1={50} y1={68} x2={50} y2={82} /><Dot cx={50} cy={82} /></g>
      <g><Dot cx={68} cy={68} /><DottedLine x1={68} y1={68} x2={68} y2={82} /><Dot cx={68} cy={82} /></g>
      <g><Dot cx={86} cy={68} /><DottedLine x1={86} y1={68} x2={86} y2={82} /><Dot cx={86} cy={82} /></g>
    </>
  ),
  /* Page 4 */
  "dots-p4-arches": (
    <>
      <g transform="translate(0,10)"><ellipse cx="10" cy="12" rx="8" ry="6" fill="none" stroke={STROKE} strokeWidth="1" /></g>
      {[24, 44, 64].map((y, i) => (
        <g key={i}><path d={`M 42 ${y + 8} Q 55 ${y - 4} 68 ${y + 8}`} fill="none" stroke="#888" strokeWidth="1.2" strokeDasharray={DASH} /></g>
      ))}
      <g transform="translate(0,52)"><path d="M4 14 Q12 4 20 14" fill="none" stroke={STROKE} strokeWidth="1" /></g>
      <MiniCamel x={0} y={62} />
      {[74].map((y) => <g key={y}><path d={`M 42 ${y} Q 55 ${y - 10} 68 ${y}`} fill="none" stroke="#888" strokeWidth="1.2" strokeDasharray={DASH} /></g>)}
    </>
  ),
  "dots-p4-waves": (
    <>
      <g transform="translate(0,12)"><path d="M2 12 L8 4 L14 12" fill="none" stroke={STROKE} strokeWidth="1" /></g>
      <WaveRow y={24} />
      <g transform="translate(0,38)"><ellipse cx="10" cy="10" rx="8" ry="6" fill="none" stroke={STROKE} strokeWidth="1" /></g>
      <WaveRow y={50} />
      <g transform="translate(0,62)"><path d="M4 8 L12 4 L20 8 L18 14 L6 14 Z" fill="none" stroke={STROKE} strokeWidth="1" /></g>
      <WaveRow y={74} />
    </>
  ),
  "dots-p4-double-hump": (
    <>
      <g transform="translate(0,14)"><ellipse cx="10" cy="10" rx="7" ry="6" fill="none" stroke={STROKE} strokeWidth="1" /></g>
      <g><Dot cx={40} cy={24} /><path d="M40 24 Q52 36 64 24 Q76 12 88 24" fill="none" stroke="#888" strokeWidth="1.2" strokeDasharray={DASH} /><Dot cx={64} cy={24} /><Dot cx={88} cy={24} /></g>
      <g transform="translate(0,42)"><ellipse cx="10" cy="10" rx="5" ry="7" fill="none" stroke={STROKE} strokeWidth="1" /></g>
      <g><Dot cx={40} cy={52} /><path d="M40 52 Q52 64 64 52 Q76 40 88 52" fill="none" stroke="#888" strokeWidth="1.2" strokeDasharray={DASH} /><Dot cx={88} cy={52} /></g>
      <MiniSnail x={0} y={66} />
      <g><Dot cx={40} cy={76} /><path d="M40 76 Q52 88 64 76 Q76 64 88 76" fill="none" stroke="#888" strokeWidth="1.2" strokeDasharray={DASH} /><Dot cx={88} cy={76} /></g>
    </>
  ),
  /* Page 5 */
  "dots-p5-zig-animals": (
    <>
      <MiniBear x={0} y={12} /><ZigzagRow y={22} />
      <MiniPig x={0} y={36} /><ZigzagRow y={46} />
      <MiniCat x={0} y={60} /><ZigzagRow y={70} />
    </>
  ),
  "dots-p5-curves-down": (
    <>
      {[28, 58].map((y) => (
        <g key={y}>
          <Dot cx={38} cy={y} />
          <path d={`M38 ${y} Q65 ${y + 22} 92 ${y}`} fill="none" stroke="#888" strokeWidth="1.2" strokeDasharray={DASH} />
          <Dot cx={92} cy={y} />
        </g>
      ))}
    </>
  ),
  "dots-p5-diagonal-bugs": (
    <>
      <g><Dot cx={38} cy={30} /><DottedLine x1={38} y1={30} x2={88} y2={18} /><MiniAnt x={78} y={8} /></g>
      <g><MiniSnail x={0} y={52} /><DottedLine x1={38} y1={68} x2={88} y2={80} /><Dot cx={88} cy={80} /></g>
    </>
  ),
  /* Page 6 */
  "dots-p6-arc-out": (
    <>
      <ArcPair y={32} outward />
      <ArcPair y={58} outward />
    </>
  ),
  "dots-p6-arc-in": (
    <>
      <ArcPair y={32} outward={false} />
      <ArcPair y={58} outward={false} />
    </>
  ),
  "dots-p6-stagger-bugs": (
    <>
      <MiniButterfly x={0} y={18} /><g><Dot cx={42} cy={28} /><DottedLine x1={42} y1={28} x2={88} y2={22} /><Dot cx={88} cy={22} /></g>
      <MiniBee x={0} y={48} /><g><Dot cx={42} cy={58} /><DottedLine x1={42} y1={58} x2={88} y2={68} /><Dot cx={88} cy={68} /></g>
    </>
  ),
};

export function DotsGalleryArt({ cardId }: { cardId: string }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full p-[8%]" aria-hidden>
      {ART[cardId] ?? ART["dots-p1-h"]}
    </svg>
  );
}
