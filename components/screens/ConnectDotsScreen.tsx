"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import type { ActivityId } from "@/lib/navigation";
import { getDrawingTemplate } from "@/lib/drawing/templates";
import type { TemplateDot } from "@/lib/drawing/templates";
import { playTapSound, playSuccessSound, speak } from "@/lib/audio";
import { markComplete } from "@/lib/progress";
import { RewardOverlay } from "@/components/learning/RewardOverlay";
import { ExitDialog } from "@/components/modals/ExitDialog";

const REVEAL_EMOJI: Record<string, string> = {
  "connect-easy": "🍎",
  "connect-hard": "🏐",
  "connect-practice": "🚚",
  "connect-learn": "🍎",
};

function parseViewBox(vb: string) {
  const [, , w, h] = vb.split(" ").map(Number);
  return { w, h };
}

export function ConnectDotsScreen({ activityId, onBack }: { activityId: ActivityId; onBack: () => void }) {
  const template = getDrawingTemplate(
    activityId === "connect-easy" || activityId === "connect-hard" || activityId === "connect-practice" || activityId === "connect-learn"
      ? activityId
      : "connect-easy",
  );
  const { w, h } = parseViewBox(template.viewBox);
  const dots = useMemo(
    () =>
      (template.dots ?? []).map((d, i) => ({
        ...d,
        number: d.number ?? i + 1,
      })),
    [template.dots],
  );

  const [connected, setConnected] = useState<number[]>([]);
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
  const [showReward, setShowReward] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showExit, setShowExit] = useState(false);

  const nextNum = connected.length + 1;
  const total = dots.length;

  const onDotTap = useCallback(
    (dot: TemplateDot & { number: number }) => {
      if (dot.number !== nextNum) return;
      playTapSound();
      const prev = connected.length > 0 ? dots.find((d) => d.number === connected[connected.length - 1]) : null;
      if (prev) {
        setLines((l) => [...l, { x1: prev.cx, y1: prev.cy, x2: dot.cx, y2: dot.cy }]);
      }
      const next = [...connected, dot.number];
      setConnected(next);
      speak(String(dot.number));

      if (next.length === total) {
        playSuccessSound();
        markComplete("connect", activityId);
        setRevealed(true);
        setTimeout(() => setShowReward(true), 400);
      }
    },
    [activityId, connected, dots, nextNum, total],
  );

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-white">
      <div className="flex shrink-0 items-center justify-between bg-[#D32F2F] px-3 py-2">
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowExit(true)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF5252]"
          aria-label="Back"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </motion.button>
        <span className="text-sm font-extrabold text-white">Connect the Dots</span>
        <span className="text-xs font-bold text-white/90">{connected.length}/{total}</span>
      </div>

      <div className="relative min-h-0 flex-1">
        <svg viewBox={template.viewBox} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
          {template.paths.map((path, i) => (
            <path
              key={i}
              d={path.d}
              fill="none"
              stroke={path.color ?? "#ddd"}
              strokeWidth={path.width ?? 2}
              strokeDasharray={path.dashed ? "8 6" : undefined}
              opacity={revealed ? 0.3 : 1}
            />
          ))}
          {lines.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#F44336" strokeWidth="4" strokeLinecap="round" />
          ))}
          {revealed && (
            <motion.text
              x={w / 2}
              y={h / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="80"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {REVEAL_EMOJI[template.id] ?? "🎉"}
            </motion.text>
          )}
          {dots.map((dot) => {
            const done = connected.includes(dot.number);
            const isNext = dot.number === nextNum;
            return (
              <g key={dot.number}>
                <circle
                  cx={dot.cx}
                  cy={dot.cy}
                  r={(dot.r ?? 7) + (isNext ? 4 : 0)}
                  fill={done ? "#4CAF50" : isNext ? "#FFEB3B" : "#FF3333"}
                  stroke="#fff"
                  strokeWidth="2"
                  className={isNext ? "cursor-pointer" : done ? "" : "cursor-pointer opacity-70"}
                  onClick={() => onDotTap(dot)}
                  style={{ pointerEvents: done ? "none" : "all" }}
                />
                <text
                  x={dot.cx}
                  y={dot.cy + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={dot.r && dot.r > 6 ? 11 : 9}
                  fontWeight="bold"
                  fill="#fff"
                  style={{ pointerEvents: "none" }}
                >
                  {dot.number}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <RewardOverlay open={showReward} emoji={REVEAL_EMOJI[template.id] ?? "🎉"} onDone={() => { setShowReward(false); onBack(); }} />
      <ExitDialog open={showExit} onCancel={() => setShowExit(false)} onConfirm={onBack} />
    </div>
  );
}
