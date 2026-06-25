"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { ActivityId } from "@/lib/navigation";
import { getTracingPages, initialPageIndex, speakLetter } from "@/lib/alphabet";
import { DrawingCanvas } from "@/components/drawing/DrawingCanvas";
import { LeftToolbar, RightToolbar } from "@/components/drawing/DrawingToolbars";
import { ExitDialog } from "@/components/modals/ExitDialog";
import { AdBar } from "@/components/shared/AdBar";

type LetterTracingScreenProps = {
  activityId: ActivityId;
  pageId?: string;
  onBack: () => void;
};

function LinedPaperGuide({ char }: { char: string }) {
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
      <text
        x="200"
        y="175"
        textAnchor="middle"
        fontSize="130"
        fontWeight="bold"
        fill="none"
        stroke="#CCCCCC"
        strokeWidth="2"
        strokeDasharray="14 10"
        fontFamily="Georgia, serif"
      >
        {char}
      </text>
      {/* Start dot at top of letter */}
      <circle cx="200" cy="95" r="9" fill="#FF3333" stroke="#CC2222" strokeWidth="1.5" />
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pageIndex, setPageIndex] = useState(() => initialPageIndex(pages, pageId));
  const [strokeColor, setStrokeColor] = useState("#F44336");
  const [isEraser, setIsEraser] = useState(false);
  const [clearToken, setClearToken] = useState(0);
  const [showExit, setShowExit] = useState(false);

  const current = pages[pageIndex] ?? "A";

  useEffect(() => {
    speakLetter(current);
  }, [current]);

  const scrollToPage = useCallback((index: number) => {
    const next = Math.max(0, Math.min(pages.length - 1, index));
    setPageIndex(next);
    setClearToken((t) => t + 1);
    scrollRef.current?.scrollTo({ left: next * (scrollRef.current?.clientWidth ?? 0), behavior: "smooth" });
  }, [pages.length]);

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
          onEraserToggle={() => setIsEraser((p) => !p)}
          onPenSelect={() => setIsEraser(false)}
          onClear={() => setClearToken((t) => t + 1)}
          onBack={() => setShowExit(true)}
        />

        <div className="relative flex min-w-0 flex-1 flex-col">
          <div className="flex shrink-0 items-center justify-between px-1 pt-0.5">
            <NavArrow direction="left" onClick={() => scrollToPage(pageIndex - 1)} />
            <span className="text-xs font-bold text-gray-500">{current}</span>
            <NavArrow direction="right" onClick={() => scrollToPage(pageIndex + 1)} />
          </div>

          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {pages.map((ch, idx) => (
              <div key={ch} className="relative h-full w-full shrink-0 snap-center">
                <LinedPaperGuide char={ch} />
                <DrawingCanvas
                  strokeColor={strokeColor}
                  strokeWidth={14}
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
          onColorSelect={(c) => { setStrokeColor(c); setIsEraser(false); }}
          onDone={onBack}
        />
      </div>

      <AdBar />
      <ExitDialog open={showExit} onCancel={() => setShowExit(false)} onConfirm={onBack} />
    </div>
  );
}
