"use client";

import type { ActivityId } from "@/lib/navigation";
import { DrawingShell } from "@/components/shared/DrawingShell";

export function ConnectDotsScreen({ activityId, onBack }: { activityId: ActivityId; onBack: () => void }) {
  const hard = activityId.includes("hard");
  return (
    <DrawingShell onBack={onBack}>
      <svg viewBox="0 0 400 300" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        {hard ? <HouseDots /> : <DinoDots />}
      </svg>
    </DrawingShell>
  );
}

function DinoDots() {
  const pts: [number, number][] = [[80,200],[120,160],[160,140],[200,130],[240,135],[280,150],[310,180],[330,210]];
  return <>{pts.map(([x,y],i) => <g key={i}><circle cx={x} cy={y} r="12" fill="#222" /><text x={x} y={y+4} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">{i+1}</text></g>)}</>;
}

function HouseDots() {
  const pts: [number, number][] = [[120,220],[160,160],[200,120],[240,160],[280,220],[280,240],[120,240]];
  return <>{pts.map(([x,y],i) => <g key={i}><circle cx={x} cy={y} r="12" fill="#222" /><text x={x} y={y+4} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">{i+1}</text></g>)}</>;
}
