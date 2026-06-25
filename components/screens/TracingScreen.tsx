"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import type { ActivityId } from "@/lib/navigation";
import { getExercisePagesForTemplate } from "@/lib/drawing/exercises";
import { DrawingCanvas } from "@/components/drawing/DrawingCanvas";
import { ExerciseGuide } from "@/components/drawing/ExerciseGuide";
import { LeftToolbar, RightToolbar } from "@/components/drawing/DrawingToolbars";
import { ExitDialog } from "@/components/modals/ExitDialog";

type TracingScreenProps = {
  templateId: ActivityId;
  onBack: () => void;
};

function NavArrow({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className="px-2 py-1"
      aria-label={direction === "left" ? "Previous exercise" : "Next exercise"}
    >
      <svg viewBox="0 0 60 40" className="h-8 w-12 opacity-50" aria-hidden>
        <path
          d={direction === "left" ? "M50 8 L12 20 L50 32" : "M10 8 L48 20 L10 32"}
          fill="none"
          stroke="#999"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}

export function TracingScreen({ templateId, onBack }: TracingScreenProps) {
  const pages = getExercisePagesForTemplate(templateId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [strokeColor, setStrokeColor] = useState("#F44336");
  const [isEraser, setIsEraser] = useState(false);
  const [clearToken, setClearToken] = useState(0);
  const [showExit, setShowExit] = useState(false);

  const scrollToPage = useCallback((index: number) => {
    const next = Math.max(0, Math.min(pages.length - 1, index));
    setPageIndex(next);
    setClearToken((t) => t + 1);
    const el = scrollRef.current;
    if (el) {
      const pageWidth = el.clientWidth;
      el.scrollTo({ left: next * pageWidth, behavior: "smooth" });
    }
  }, [pages.length]);

  const handleColorSelect = useCallback((color: string) => {
    setStrokeColor(color);
    setIsEraser(false);
  }, []);

  const handlePenSelect = useCallback(() => setIsEraser(false), []);
  const handleEraserToggle = useCallback(() => setIsEraser((p) => !p), []);
  const handleClear = useCallback(() => setClearToken((t) => t + 1), []);
  const handleBackRequest = useCallback(() => setShowExit(true), []);

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
    <div className="relative flex h-full w-full overflow-hidden bg-white">
      <LeftToolbar
        isEraser={isEraser}
        onEraserToggle={handleEraserToggle}
        onPenSelect={handlePenSelect}
        onClear={handleClear}
        onBack={handleBackRequest}
      />

      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col bg-white">
        <div className="flex shrink-0 items-center justify-between px-1 pt-1">
          <NavArrow direction="left" onClick={() => scrollToPage(pageIndex - 1)} />
          <span className="text-xs font-semibold text-gray-400">
            {pageIndex + 1} / {pages.length}
          </span>
          <NavArrow direction="right" onClick={() => scrollToPage(pageIndex + 1)} />
        </div>

        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {pages.map((page, idx) => (
            <div
              key={page.id}
              className="relative h-full w-full shrink-0 snap-center"
            >
              <ExerciseGuide exercise={page.exercise} />
              <DrawingCanvas
                strokeColor={strokeColor}
                strokeWidth={16}
                isEraser={isEraser}
                clearToken={pageIndex === idx ? clearToken : -1}
                disabled={pageIndex !== idx}
              />
            </div>
          ))}
        </div>
      </div>

      <RightToolbar
        selectedColor={strokeColor}
        isEraser={isEraser}
        onColorSelect={handleColorSelect}
        onDone={onBack}
      />

      <ExitDialog
        open={showExit}
        onCancel={() => setShowExit(false)}
        onConfirm={onBack}
      />
    </div>
  );
}
