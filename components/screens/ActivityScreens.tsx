"use client";

import type { ActivityId } from "@/lib/navigation";
import { TracingScreen } from "./TracingScreen";
import { MazeScreen } from "./MazeScreen";
import { LetterTracingScreen as LetterTrace } from "./LetterTracingScreen";
import { ConnectDotsScreen as ConnectDots } from "./ConnectDotsScreen";
import { LearnToDrawScreen as LearnDraw } from "./LearnToDrawScreen";
import { MatchingScreen } from "./MatchingScreen";
import { FreeDrawScreen as FreeDraw } from "./FreeDrawScreen";
import { DrawingShell } from "@/components/shared/DrawingShell";

export function LineTracingScreen({ activityId, onBack }: { activityId: ActivityId; onBack: () => void }) {
  return <TracingScreen templateId={activityId} onBack={onBack} />;
}

export function MazeActivityScreen({ activityId, onBack }: { activityId: ActivityId; onBack: () => void }) {
  return <MazeScreen activityId={activityId} onBack={onBack} />;
}

export function LetterTracingScreen({ activityId, onBack }: { activityId: ActivityId; onBack: () => void }) {
  return <LetterTrace activityId={activityId} onBack={onBack} />;
}

export function ConnectDotsScreen({ activityId, onBack }: { activityId: ActivityId; onBack: () => void }) {
  return <ConnectDots activityId={activityId} onBack={onBack} />;
}

export function LearnToDrawScreen({ activityId, onBack }: { activityId: ActivityId; onBack: () => void }) {
  return <LearnDraw activityId={activityId} onBack={onBack} />;
}

export function MatchingActivityScreen({ activityId, onBack }: { activityId: ActivityId; onBack: () => void }) {
  return <MatchingScreen activityId={activityId} onBack={onBack} />;
}

export function FreeDrawScreen({ activityId, onBack }: { activityId: ActivityId; onBack: () => void }) {
  return <FreeDraw activityId={activityId} onBack={onBack} />;
}

export function LetterMatchScreen({ onBack }: { onBack: () => void }) {
  return (
    <DrawingShell onBack={onBack} showCanvas>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-[20%]">
        <div className="flex flex-col gap-8 text-5xl font-bold text-black">
          <span>V</span><span>B</span><span>E</span>
        </div>
        <div className="flex flex-col gap-8 text-5xl font-bold text-black">
          <span>v</span><span>b</span><span>e</span>
        </div>
      </div>
    </DrawingShell>
  );
}

export function JigsawScreen({ onBack }: { onBack: () => void }) {
  return (
    <DrawingShell onBack={onBack}>
      <svg viewBox="0 0 300 200" className="pointer-events-none absolute inset-0 m-auto h-[70%] w-[70%]" aria-hidden>
        <text x="150" y="120" textAnchor="middle" fontSize="100" fontWeight="bold" fill="#ccc">A</text>
        <line x1="150" y1="40" x2="150" y2="160" stroke="#999" strokeWidth="2" />
        <line x1="80" y1="100" x2="220" y2="100" stroke="#999" strokeWidth="2" />
      </svg>
    </DrawingShell>
  );
}
