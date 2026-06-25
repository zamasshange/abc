"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { ActivityId } from "@/lib/navigation";
import { getTracingPages, initialPageIndex, isLowerActivity, isNumberActivity } from "@/lib/alphabet";
import { speakLetter, speakPhonicsLesson, speakNumberLesson, playTapSound } from "@/lib/audio";
import { getPhonics, getNumberPhonics } from "@/lib/phonics";
import { markComplete } from "@/lib/progress";
import { createTraceScorer } from "@/lib/tracing/trace-score";
import { DrawingCanvas } from "@/components/drawing/DrawingCanvas";
import { LeftToolbar, RightToolbar } from "@/components/drawing/DrawingToolbars";
import { ExitDialog } from "@/components/modals/ExitDialog";
import { RewardOverlay } from "@/components/learning/RewardOverlay";
import { TraceProgressBar } from "@/components/learning/TraceProgressBar";
import { PhonicsPanel } from "@/components/learning/PhonicsPanel";

type LetterTracingScreenProps = {
  activityId: ActivityId;
  pageId?: string;
  onBack: () => void;
};

function LinedPaperGuide({ char, animate }: { char: string; animate: boolean }) {
  return (
    <svg viewBox="0 0 400 280" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
      {[0.32, 0.48, 0.64, 0.78].map((y, i) => (
        <line
          key={y}
          x1="30"
          y1={280 * y}
          x2="370"
          y2={280 * y}
          stroke={i === 1 ? "#FFAAAA" : "#AADDFF"}
          strokeWidth={i === 1 ? 1.5 : 2}
          strokeDasharray={i === 1 ? "8 6" : undefined}
        />
      ))}
      <text
        x="200"
        y="175"
        textAnchor="middle"
        fontSize="130"
        fontWeight="bold"
        fill="none"
        stroke="#E0E0E0"
        strokeWidth="4"
        fontFamily="Georgia, serif"
      >
        {char}
      </text>
      <motion.text
        x="200"
        y="175"
        textAnchor="middle"
        fontSize="130"
        fontWeight="bold"
        fill="none"
        stroke="#FF6666"
        strokeWidth="3"
        strokeDasharray="14 10"
        fontFamily="Georgia, serif"
        animate={animate ? { strokeDashoffset: [0, -48] } : undefined}
        transition={animate ? { duration: 2.5, repeat: Infinity, ease: "linear" } : undefined}
      >
        {char}
      </motion.text>
      <motion.circle
        cx="200"
        cy="95"
        r="9"
        fill="#FF3333"
        stroke="#CC2222"
        strokeWidth="1.5"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </svg>
  );
}

function NavArrow({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  return (
    <motion.button type="button" onClick={onClick} whileTap={{ scale: 0.9 }} className="px-1" aria-label={direction === "left" ? "Previous" : "Next"}>
      <svg viewBox="0 0 60 40" className="h-7 w-10 opacity-40" aria-hidden>
        <path d={direction === "left" ? "M50 8 L12 20 L50 32" : "M10 8 L48 20 L10 32"} fill="none" stroke="#666" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </motion.button>
  );
}

export function LetterTracingScreen({ activityId, pageId, onBack }: LetterTracingScreenProps) {
  const pages = getTracingPages(activityId, pageId);
  const isNumber = isNumberActivity(activityId);
  const isLower = isLowerActivity(activityId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scorerRef = useRef(createTraceScorer());
  const completedRef = useRef(false);

  const [pageIndex, setPageIndex] = useState(() => initialPageIndex(pages, pageId));
  const [strokeColor, setStrokeColor] = useState("#F44336");
  const [isEraser, setIsEraser] = useState(false);
  const [clearToken, setClearToken] = useState(0);
  const [showExit, setShowExit] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [phonicsPhase, setPhonicsPhase] = useState<"letter" | "word" | "object">("letter");
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const current = pages[pageIndex] ?? "A";
  const rewardEmoji = isNumber
    ? getNumberPhonics(current).emoji
    : getPhonics(current)?.emoji ?? "⭐";

  const resetPage = useCallback(() => {
    scorerRef.current.reset();
    completedRef.current = false;
    setProgress(0);
    setPhonicsPhase("letter");
    setSparkles([]);
  }, []);

  useEffect(() => {
    resetPage();
    if (isNumber) speakNumberLesson(current);
    else speakLetter(current);
  }, [current, isNumber, resetPage]);

  const handleComplete = useCallback(async () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setShowReward(true);

    if (isNumber) {
      markComplete("numbers", current);
      setPhonicsPhase("word");
      await speakNumberLesson(current);
      setPhonicsPhase("object");
    } else {
      markComplete(isLower ? "lettersLower" : "lettersUpper", current.toUpperCase());
      setPhonicsPhase("word");
      await speakPhonicsLesson(current);
      setPhonicsPhase("object");
    }
  }, [current, isLower, isNumber]);

  const onStroke = useCallback(
    (x: number, y: number, w: number, h: number) => {
      if (completedRef.current || isEraser) return;
      const p = scorerRef.current.addPoint(x, y, w, h);
      setProgress(p);
      setSparkles((s) => [...s.slice(-8), { id: Date.now(), x, y }]);
      if (scorerRef.current.isComplete()) handleComplete();
    },
    [handleComplete, isEraser],
  );

  const scrollToPage = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(pages.length - 1, index));
      setPageIndex(next);
      setClearToken((t) => t + 1);
      resetPage();
      scrollRef.current?.scrollTo({ left: next * (scrollRef.current?.clientWidth ?? 0), behavior: "smooth" });
    },
    [pages.length, resetPage],
  );

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || el.clientWidth === 0) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== pageIndex) {
      setPageIndex(idx);
      setClearToken((t) => t + 1);
      resetPage();
    }
  }, [pageIndex, resetPage]);

  const onRewardDone = () => {
    setShowReward(false);
    if (pageIndex < pages.length - 1) scrollToPage(pageIndex + 1);
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-white">
      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        <LeftToolbar
          isEraser={isEraser}
          onEraserToggle={() => { playTapSound(); setIsEraser((p) => !p); }}
          onPenSelect={() => { playTapSound(); setIsEraser(false); }}
          onClear={() => { playTapSound(); setClearToken((t) => t + 1); resetPage(); }}
          onBack={() => setShowExit(true)}
        />

        <div className="relative flex min-w-0 flex-1 flex-col">
          <TraceProgressBar progress={progress} />
          <div className="flex shrink-0 items-center justify-between px-1 pt-3">
            <NavArrow direction="left" onClick={() => { playTapSound(); scrollToPage(pageIndex - 1); }} />
            <span className="text-xs font-bold text-gray-500">{current}</span>
            <NavArrow direction="right" onClick={() => { playTapSound(); scrollToPage(pageIndex + 1); }} />
          </div>

          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="relative flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {pages.map((ch, idx) => (
              <div key={`${ch}-${idx}`} className="relative h-full w-full shrink-0 snap-center">
                <LinedPaperGuide char={ch} animate={pageIndex === idx && !completedRef.current} />
                {pageIndex === idx &&
                  sparkles.map((s) => (
                    <motion.span
                      key={s.id}
                      className="pointer-events-none absolute z-[25] text-sm"
                      style={{ left: s.x - 6, top: s.y - 6 }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 1.5, opacity: 0, y: -12 }}
                      transition={{ duration: 0.5 }}
                    >
                      ✨
                    </motion.span>
                  ))}
                <DrawingCanvas
                  strokeColor={strokeColor}
                  strokeWidth={14}
                  isEraser={isEraser}
                  clearToken={pageIndex === idx ? clearToken : -1}
                  disabled={pageIndex !== idx || completedRef.current}
                  onStroke={pageIndex === idx ? onStroke : undefined}
                />
              </div>
            ))}
          </div>

          <PhonicsPanel char={current} mode={isNumber ? "number" : "letter"} phase={phonicsPhase} />
        </div>

        <RightToolbar
          selectedColor={strokeColor}
          isEraser={isEraser}
          onColorSelect={(c) => { playTapSound(); setStrokeColor(c); setIsEraser(false); }}
          onDone={onBack}
        />
      </div>

      <RewardOverlay open={showReward} emoji={rewardEmoji} onDone={onRewardDone} />
      <ExitDialog open={showExit} onCancel={() => setShowExit(false)} onConfirm={onBack} />
    </div>
  );
}
