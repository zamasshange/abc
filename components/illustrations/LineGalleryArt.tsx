/** Line worksheet gallery thumbnails — lined paper + tracing paths */

import type { ReactNode } from "react";

const S = "#1a1a1a";
const DASH = "2.5 2";
const DR = 2.2;

function LinedPaper() {
  return (
    <>
      {[22, 38, 54, 70, 86].map((y) => (
        <line key={y} x1="4" y1={y} x2="96" y2={y} stroke="#B8D4F0" strokeWidth="0.8" />
      ))}
    </>
  );
}

function Dot({ cx, cy }: { cx: number; cy: number }) {
  return <circle cx={cx} cy={cy} r={DR} fill={S} />;
}

function DLine({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#888" strokeWidth="1" strokeDasharray={DASH} />;
}

function DiagUp({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <Dot cx={x1} cy={y1} />
      <DLine x1={x1} y1={y1} x2={x2} y2={y2} />
      <Dot cx={x2} cy={y2} />
    </g>
  );
}

function Plane({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.45)`}>
      <polygon points="4,16 28,8 24,16 28,24 4,16" fill="none" stroke={S} strokeWidth="1.2" />
    </g>
  );
}

function Umbrella({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.42)`}>
      <path d="M4 18 Q16 4 28 18" fill="none" stroke={S} strokeWidth="1.2" />
      <line x1="16" y1="18" x2="16" y2="28" stroke={S} strokeWidth="1.2" />
    </g>
  );
}

function Cloud({ x, y, bolt }: { x: number; y: number; bolt?: boolean }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.4)`}>
      <ellipse cx="14" cy="14" rx="12" ry="8" fill="none" stroke={S} strokeWidth="1.2" />
      <ellipse cx="8" cy="16" rx="6" ry="5" fill="none" stroke={S} strokeWidth="1" />
      {bolt && <path d="M14 22 L12 28 L16 26 L13 32" fill="none" stroke={S} strokeWidth="1" />}
    </g>
  );
}

function Balloon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.35)`}>
      <ellipse cx="8" cy="8" rx="6" ry="8" fill="none" stroke={S} strokeWidth="1.2" />
      <line x1="8" y1="16" x2="8" y2="22" stroke={S} strokeWidth="1" />
    </g>
  );
}

function Mountain({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.4)`}>
      <path d="M2 20 L12 4 L22 20 Z" fill="none" stroke={S} strokeWidth="1.2" />
      <line x1="12" y1="4" x2="12" y2="0" stroke={S} strokeWidth="1" />
      <polygon points="12,-2 10,2 14,2" fill="#E53935" />
    </g>
  );
}

function ZigRow({ y }: { y: number }) {
  return (
    <polyline
      points={`38,${y} 48,${y - 6} 58,${y} 68,${y - 6} 78,${y} 88,${y - 6} 94,${y}`}
      fill="none"
      stroke="#888"
      strokeWidth="1"
      strokeDasharray={DASH}
    />
  );
}

function Ladder({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.38)`}>
      <line x1="4" y1="4" x2="4" y2="28" stroke={S} strokeWidth="1.2" />
      <line x1="20" y1="4" x2="20" y2="28" stroke={S} strokeWidth="1.2" />
      {[10, 18, 26].map((yy) => <line key={yy} x1="4" y1={yy} x2="20" y2={yy} stroke={S} strokeWidth="1" />)}
    </g>
  );
}

function Crane({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.35)`}>
      <line x1="4" y1="28" x2="4" y2="8" stroke={S} strokeWidth="1.5" />
      <line x1="4" y1="8" x2="24" y2="8" stroke={S} strokeWidth="1.5" />
      <line x1="24" y1="8" x2="24" y2="16" stroke={S} strokeWidth="1" />
    </g>
  );
}

function Table({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.38)`}>
      <rect x="2" y="12" width="22" height="3" fill="none" stroke={S} strokeWidth="1.2" />
      <line x1="6" y1="15" x2="6" y2="26" stroke={S} strokeWidth="1.2" />
      <line x1="20" y1="15" x2="20" y2="26" stroke={S} strokeWidth="1.2" />
    </g>
  );
}

function Star({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.38)`}>
      <polygon points="12,2 15,9 22,9 16,14 18,22 12,17 6,22 8,14 2,9 9,9" fill="none" stroke={S} strokeWidth="1" />
    </g>
  );
}

function Ruler({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.4)`}>
      <rect x="2" y="8" width="22" height="6" fill="none" stroke={S} strokeWidth="1.2" />
      {[6, 10, 14, 18, 22].map((xx) => <line key={xx} x1={xx} y1="8" x2={xx} y2="11" stroke={S} strokeWidth="0.8" />)}
    </g>
  );
}

function Pen({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(-35) scale(0.4)`}>
      <rect x="0" y="0" width="4" height="22" fill="none" stroke={S} strokeWidth="1" />
      <polygon points="0,0 4,0 2,-4" fill={S} />
    </g>
  );
}

const ART: Record<string, ReactNode> = {
  "line-p1-plane-v": (
    <>
      <Plane x={2} y={18} />
      <DiagUp x1={38} y1={68} x2={58} y2={48} />
      <DiagUp x1={62} y1={68} x2={82} y2={48} />
      <DiagUp x1={38} y1={88} x2={58} y2={68} />
      <DiagUp x1={62} y1={88} x2={82} y2={68} />
    </>
  ),
  "line-p1-umbrella-check": (
    <>
      <Umbrella x={0} y={16} />
      <g><Dot cx={42} cy={58} /><DLine x1={42} y1={58} x2={42} y2={38} /><Dot cx={42} cy={38} /><DLine x1={42} y1={38} x2={62} y2={58} /></g>
      <Umbrella x={0} y={52} />
      <g><Dot cx={42} cy={88} /><DLine x1={42} y1={88} x2={42} y2={68} /><Dot cx={42} cy={68} /><DLine x1={42} y1={68} x2={62} y2={88} /></g>
    </>
  ),
  "line-p1-cloud-rain": (
    <>
      <Cloud x={0} y={14} />
      <DiagUp x1={38} y1={32} x2={58} y2={48} />
      <Cloud x={0} y={48} bolt />
      <DiagUp x1={38} y1={72} x2={58} y2={88} />
    </>
  ),
  "line-p2-balloons": (
    <>
      {[14, 38, 62, 86].map((y, i) => (
        <g key={y}>
          <Balloon x={4 + (i % 2) * 4} y={y - 12} />
          <Dot cx={58} cy={y} />
          <DLine x1={58} y1={y} x2={58} y2={y + 16} />
          <Dot cx={58} cy={y + 16} />
        </g>
      ))}
    </>
  ),
  "line-p2-mountain-zig": (
    <>
      <Mountain x={0} y={20} />
      <ZigRow y={32} />
      <Mountain x={0} y={58} />
      <ZigRow y={70} />
    </>
  ),
  "line-p2-ladder-v": (
    <>
      <Ladder x={0} y={16} />
      <g><Dot cx={50} cy={30} /><DLine x1={50} y1={30} x2={62} y2={42} /><Dot cx={62} cy={42} /><DLine x1={62} y1={42} x2={74} y2={54} /></g>
      <Crane x={0} y={54} />
      <g><Dot cx={50} cy={72} /><DLine x1={50} y1={72} x2={62} y2={60} /><Dot cx={62} cy={60} /><DLine x1={62} y1={60} x2={74} y2={48} /></g>
    </>
  ),
  "line-p3-table-slant": (
    <>
      <Table x={0} y={14} />
      {[28, 36, 44, 52].map((x, i) => <DiagUp key={i} x1={38 + i * 14} y1={68} x2={48 + i * 14} y2={48} />)}
      <Table x={0} y={54} />
      {[28, 36, 44, 52].map((x, i) => <DiagUp key={i} x1={38 + i * 14} y1={92} x2={48 + i * 14} y2={72} />)}
    </>
  ),
  "line-p3-box-pattern": (
    <>
      <rect x="6" y="22" width="14" height="10" fill="none" stroke={S} strokeWidth="1" />
      <g><Dot cx={38} cy={28} /><DLine x1={38} y1={28} x2={52} y2={28} /><Dot cx={52} cy={28} /><Dot cx={58} cy={28} /><Dot cx={64} cy={28} /></g>
      <rect x="6" y="58" width="14" height="10" fill="none" stroke={S} strokeWidth="1" />
      <g><Dot cx={38} cy={64} /><DLine x1={38} y1={64} x2={52} y2={64} /><Dot cx={52} cy={64} /><Dot cx={58} cy={64} /><Dot cx={64} cy={64} /></g>
    </>
  ),
  "line-p3-cloud-drops": (
    <>
      {[18, 38, 58, 78].map((x, i) => (
        <g key={x}>
          <Cloud x={x - 8} y={8 + (i % 2) * 4} />
          <DiagUp x1={x + 8} y1={42 + i * 12} x2={x - 4} y2={58 + i * 12} />
        </g>
      ))}
    </>
  ),
  "line-p4-cane-bed": (
    <>
      <g transform="translate(2,14) scale(0.4)"><line x1="4" y1="4" x2="4" y2="24" stroke={S} strokeWidth="1.5" /><path d="M4 4 Q12 0 20 4" fill="none" stroke={S} strokeWidth="1.2" /></g>
      <g>{[42, 52, 62, 72].map((x) => <Dot key={x} cx={x} cy={28} />)}</g>
      <g transform="translate(0,48)"><rect x="4" y="8" width="18" height="12" fill="none" stroke={S} strokeWidth="1" /><line x1="4" y1="14" x2="22" y2="14" stroke={S} strokeWidth="1" /></g>
      <g><Dot cx={42} cy={64} /><DLine x1={42} y1={64} x2={54} y2={64} /><Dot cx={54} cy={64} /><DLine x1={58} y1={64} x2={70} y2={64} /><Dot cx={70} cy={64} /></g>
    </>
  ),
  "line-p4-ladder-seg": (
    <>
      <Ladder x={0} y={12} />
      <g>{[42, 50, 58, 66, 74].map((x, i) => <g key={x}><Dot cx={x} cy={28} />{i < 4 && <DLine x1={x} y1={28} x2={x + 8} y2={28} />}</g>)}</g>
      <Ladder x={0} y={52} />
      <g>{[42, 50, 58, 66, 74].map((x, i) => <g key={x}><Dot cx={x} cy={68} />{i < 4 && <DLine x1={x} y1={68} x2={x + 8} y2={68} />}</g>)}</g>
    </>
  ),
  "line-p4-wall-wave": (
    <>
      <g transform="translate(2,12) scale(0.38)">{[0, 1, 2].map((c) => <rect key={c} x={4 + c * 8} y="8" width="7" height="5" fill="none" stroke={S} strokeWidth="0.8" />)}</g>
      <path d="M38 28 L46 28 L46 36 L54 36 L54 44 L62 44" fill="none" stroke="#888" strokeWidth="1" strokeDasharray={DASH} />
      <g transform="translate(2,52) scale(0.38)">{[0, 1, 2].map((c) => <rect key={c} x={4 + c * 8} y="8" width="7" height="5" fill="none" stroke={S} strokeWidth="0.8" />)}</g>
      <path d="M38 68 L46 68 L46 76 L54 76 L54 84 L62 84" fill="none" stroke="#888" strokeWidth="1" strokeDasharray={DASH} />
    </>
  ),
  "line-p5-star-slant": (
    <>
      <Star x={0} y={14} />
      {[38, 48, 58].map((x) => <DiagUp key={x} x1={x} y1={32} x2={x + 8} y2={24} />)}
      <Star x={0} y={54} />
      {[38, 48, 58].map((x) => <DiagUp key={x} x1={x} y1={72} x2={x + 8} y2={64} />)}
    </>
  ),
  "line-p5-plane-slant": (
    <>
      <Plane x={0} y={14} />
      <DiagUp x1={38} y1={32} x2={72} y2={22} />
      <DiagUp x1={38} y1={40} x2={72} y2={30} />
      <Plane x={0} y={54} />
      <DiagUp x1={38} y1={72} x2={72} y2={62} />
      <DiagUp x1={38} y1={80} x2={72} y2={70} />
    </>
  ),
  "line-p5-umbrella-left": (
    <>
      <Umbrella x={0} y={12} />
      {[68, 58, 48].map((x, i) => <DiagUp key={x} x1={38 + i * 4} y1={32} x2={x} y2={24} />)}
      <Umbrella x={0} y={52} />
      {[68, 58, 48].map((x, i) => <DiagUp key={x} x1={38 + i * 4} y1={72} x2={x} y2={64} />)}
    </>
  ),
  "line-p6-ruler-vertical": (
    <>
      <Ruler x={0} y={12} />
      {[38, 48, 58, 68].map((x) => <g key={x}><Dot cx={x} cy={28} /><DLine x1={x} y1={28} x2={x} y2={40} /><Dot cx={x} cy={40} /></g>)}
      <Ruler x={0} y={52} />
      {[38, 48, 58, 68].map((x) => <g key={x}><Dot cx={x} cy={68} /><DLine x1={x} y1={68} x2={x} y2={80} /><Dot cx={x} cy={80} /></g>)}
    </>
  ),
  "line-p6-pen-slant-r": (
    <>
      <Pen x={4} y={14} />
      {[38, 48, 58, 68].map((x) => <DiagUp key={x} x1={x} y1={32} x2={x + 10} y2={22} />)}
      <Pen x={4} y={54} />
      {[38, 48, 58, 68].map((x) => <DiagUp key={x} x1={x} y1={72} x2={x + 10} y2={62} />)}
    </>
  ),
  "line-p6-arrow-slant-l": (
    <>
      <path d="M8 28 L18 18 L8 22 Z" fill={S} />
      {[38, 48, 58, 68].map((x) => <DiagUp key={x} x1={x + 10} y1={32} x2={x} y2={22} />)}
      <path d="M8 72 L18 62 L8 66 Z" fill={S} />
      {[38, 48, 58, 68].map((x) => <DiagUp key={x} x1={x + 10} y1={72} x2={x} y2={62} />)}
    </>
  ),
  "line-p7-fruit-basket": (
    <>
      <g transform="translate(2,18) scale(0.35)"><circle cx="8" cy="8" r="6" fill="none" stroke={S} strokeWidth="1" /><path d="M6 4 Q8 0 10 4" fill="none" stroke={S} strokeWidth="0.8" /></g>
      <RowGuide y={28} />
      <g transform="translate(72,18) scale(0.32)"><path d="M4 12 L8 4 L12 12 Z" fill="none" stroke={S} strokeWidth="1" /><line x1="2" y1="12" x2="14" y2="12" stroke={S} strokeWidth="1" /></g>
      <g transform="translate(2,48) scale(0.35)"><ellipse cx="8" cy="8" rx="6" ry="8" fill="none" stroke={S} strokeWidth="1" /></g>
      <RowGuide y={58} />
      <g transform="translate(72,48) scale(0.32)"><path d="M4 12 L8 4 L12 12 Z" fill="none" stroke={S} strokeWidth="1" /></g>
      <g transform="translate(2,78) scale(0.35)"><path d="M4 12 Q8 2 12 12" fill="none" stroke={S} strokeWidth="1" /></g>
      <RowGuide y={88} />
    </>
  ),
  "line-p7-humpty": (
    <>
      <ellipse cx="50" cy="42" rx="14" ry="18" fill="none" stroke={S} strokeWidth="1.2" />
      <circle cx="46" cy="38" r="2" fill={S} />
      <circle cx="54" cy="38" r="2" fill={S} />
      <path d="M46 46 Q50 50 54 46" fill="none" stroke={S} strokeWidth="1" />
      <rect x="28" y="58" width="44" height="8" fill="none" stroke={S} strokeWidth="1.2" />
      {[32, 40, 48, 56, 64].map((x) => <DLine key={x} x1={x} y1={58} x2={x} y2={66} />)}
      <ellipse cx="22" cy="36" rx="6" ry="4" fill="none" stroke={S} strokeWidth="0.8" />
      <ellipse cx="78" cy="36" rx="6" ry="4" fill="none" stroke={S} strokeWidth="0.8" />
    </>
  ),
  "line-p7-car-paths": (
    <>
      <g transform="translate(2,20) scale(0.38)"><rect x="2" y="8" width="18" height="10" rx="2" fill="none" stroke={S} strokeWidth="1" /><circle cx="6" cy="20" r="3" fill="none" stroke={S} strokeWidth="1" /><circle cx="16" cy="20" r="3" fill="none" stroke={S} strokeWidth="1" /></g>
      <g><Dot cx={38} cy={28} /><path d="M38 28 H58 V38 H78" fill="none" stroke="#888" strokeWidth="1" strokeDasharray={DASH} /><Dot cx={78} cy={38} /></g>
      <g transform="translate(2,58) scale(0.38)"><rect x="2" y="8" width="18" height="10" rx="2" fill="none" stroke={S} strokeWidth="1" /></g>
      <g><Dot cx={38} cy={68} /><path d="M38 68 H52 V74 H66 V68 H80" fill="none" stroke="#888" strokeWidth="1" strokeDasharray="1.5 1.5" /><Dot cx={80} cy={68} /></g>
    </>
  ),
};

function RowGuide({ y }: { y: number }) {
  return (
    <g>
      <Dot cx={38} cy={y} />
      <DLine x1={38} y1={y} x2={72} y2={y} />
      <Dot cx={72} cy={y} />
    </g>
  );
}

export function LineGalleryArt({ cardId }: { cardId: string }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <LinedPaper />
      {ART[cardId] ?? ART["line-p1-plane-v"]}
    </svg>
  );
}
