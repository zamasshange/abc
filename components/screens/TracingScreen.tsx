"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { ActivityId } from "@/lib/navigation";
import { getDrawingTemplate } from "@/lib/drawing/templates";
import { getExercisePagesForTemplate } from "@/lib/drawing/exercises";
import { createTraceScorer } from "@/lib/tracing/trace-score";
import { playTapSound } from "@/lib/audio";
import { markComplete } from "@/lib/progress";
import { DrawingCanvas } from "@/components/drawing/DrawingCanvas";
import { TemplateLayer } from "@/components/drawing/TemplateLayer";
import { ExerciseGuide } from "@/components/drawing/ExerciseGuide";
import { LeftToolbar, RightToolbar } from "@/components/drawing/DrawingToolbars";
import { ExitDialog } from "@/components/modals/ExitDialog";
import { TraceProgressBar } from "@/components/learning/TraceProgressBar";
import { RewardOverlay } from "@/components/learning/RewardOverlay";

type TracingScreenProps = {
  templateId: ActivityId;
  onBack: () => void;
};

function NavArrow({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  return (
    <motion.button type="button" onClick={onClick} whileTap={{ scale: 0.9 }} className="px-2 py-1" aria-label={direction === "left" ? "Previous" : "Next"}>
      <svg viewBox="0 0 60 40" className="h-8 w-12 opacity-50" aria-hidden>
        <path d={direction === "left" ? "M50 8 L12 20 L50 32" : "M10 8 L48 20 L10 32"} fill="none" stroke="#999" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </motion.button>
  );
}

export function TracingScreen({ templateId, onBack }: TracingScreenProps) {
  const template = getDrawingTemplate(templateId);
  const exercisePages = getExercisePagesForTemplate(templateId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scorerRef = useRef(createTraceScorer({ cx: 0.55, cy: 0.5, w: 0.55, h: 0.55 }));
  const [pageIndex, setPageIndex] = useState(0);
  const [strokeColor, setStrokeColor] = useState("#F44336");
  const [isEraser, setIsEraser] = useState(false);
  const [clearToken, setClearToken] = useState(0);
  const [showExit, setShowExit] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const completedRef = useRef(false);

  const resetTrace = useCallback(() => {
    scorerRef.current.reset();
    completedRef.current = false;
    setProgress(0);
  }, []);

  useEffect(() => {
    resetTrace();
  }, [pageIndex, resetTrace]);

  const onStroke = useCallback(
    (x: number, y: number, w: number, h: number) => {
      if (completedRef.current || isEraser) return;
      const p = scorerRef.current.addPoint(x, y, w, h);
      setProgress(p);
      if (scorerRef.current.isComplete()) {
        completedRef.current = true;
        markComplete("lines", templateId);
        setShowReward(true);
      }
    },
    [isEraser, templateId],
  );

  const scrollToPage = useCallback((index: number) => {
    const next = Math.max(0, Math.min(exercisePages.length - 1, index));
    setPageIndex(next);
    setClearToken((t) => t + 1);
    resetTrace();
    const el = scrollRef.current;
    if (el) el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  }, [exercisePages.length]);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || el.clientWidth === 0) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== pageIndex) {
      setPageIndex(idx);
      setClearToken((t) => t + 1);
    }
  }, [pageIndex]);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-white">
      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        <LeftToolbar
          isEraser={isEraser}
          onEraserToggle={() => { playTapSound(); setIsEraser((p) => !p); }}
          onPenSelect={() => { playTapSound(); setIsEraser(false); }}
          onClear={() => { playTapSound(); setClearToken((t) => t + 1); resetTrace(); }}
          onBack={() => setShowExit(true)}
        />

        <div className="relative flex min-h-0 min-w-0 flex-1 flex-col bg-white">
          <TraceProgressBar progress={progress} />
          <div className="flex shrink-0 items-center justify-between px-1 pt-1">
            <NavArrow direction="left" onClick={() => scrollToPage(pageIndex - 1)} />
            <span className="text-xs font-semibold text-gray-400">{pageIndex + 1} / {exercisePages.length}</span>
            <NavArrow direction="right" onClick={() => scrollToPage(pageIndex + 1)} />
          </div>

          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {exercisePages.map((page, idx) => (
              <div key={page.id} className="relative h-full w-full shrink-0 snap-center">
                {idx === 0 ? <TemplateLayer template={template} /> : <ExerciseGuide exercise={page.exercise} />}
                <DrawingCanvas
                  strokeColor={strokeColor}
                  strokeWidth={16}
                  isEraser={isEraser}
                  clearToken={pageIndex === idx ? clearToken : -1}
                  disabled={pageIndex !== idx || completedRef.current}
                  onStroke={pageIndex === idx ? onStroke : undefined}
                />
              </div>
            ))}
          </div>
        </div>

        <RightToolbar
          selectedColor={strokeColor}
          isEraser={isEraser}
          onColorSelect={(c) => { setStrokeColor(c); setIsEraser(false); }}
          onDone={onBack}
        />
      </div>

      <RewardOverlay
        open={showReward}
        onDone={() => {
          setShowReward(false);
          if (pageIndex < exercisePages.length - 1) scrollToPage(pageIndex + 1);
        }}
      />
      <ExitDialog open={showExit} onCancel={() => setShowExit(false)} onConfirm={onBack} />
    </div>
  );
}
