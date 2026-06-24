"use client";

import { useState, useCallback } from "react";
import type { DrawingTemplateId } from "@/lib/navigation";
import { getExerciseForTemplate } from "@/lib/drawing/exercises";
import { DrawingCanvas } from "@/components/drawing/DrawingCanvas";
import { ExerciseGuide } from "@/components/drawing/ExerciseGuide";
import { LeftToolbar, RightToolbar, getSidebarColor } from "@/components/drawing/DrawingToolbars";
import { ExitDialog } from "@/components/modals/ExitDialog";

type TracingScreenProps = {
  templateId: DrawingTemplateId;
  onBack: () => void;
};

function NavArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 60 40" className="h-7 w-10 opacity-40 sm:h-8 sm:w-12" aria-hidden>
      <path
        d={direction === "left" ? "M50 8 L12 20 L50 32" : "M10 8 L48 20 L10 32"}
        fill="none"
        stroke="#999"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TracingScreen({ templateId, onBack }: TracingScreenProps) {
  const exercise = getExerciseForTemplate(templateId);
  const sidebarColor = getSidebarColor(templateId);
  const [strokeColor, setStrokeColor] = useState("#F44336");
  const [isEraser, setIsEraser] = useState(false);
  const [clearToken, setClearToken] = useState(0);
  const [showExit, setShowExit] = useState(false);

  const handleColorSelect = useCallback((color: string) => {
    setStrokeColor(color);
    setIsEraser(false);
  }, []);

  const handlePenSelect = useCallback(() => setIsEraser(false), []);
  const handleEraserToggle = useCallback(() => setIsEraser((p) => !p), []);
  const handleClear = useCallback(() => setClearToken((t) => t + 1), []);
  const handleBackRequest = useCallback(() => setShowExit(true), []);

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-white">
      <LeftToolbar
        sidebarColor={sidebarColor}
        isEraser={isEraser}
        onEraserToggle={handleEraserToggle}
        onPenSelect={handlePenSelect}
        onClear={handleClear}
        onBack={handleBackRequest}
      />

      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col bg-white">
        <div className="flex shrink-0 items-center justify-between px-2 pt-1">
          <NavArrow direction="left" />
          <NavArrow direction="right" />
        </div>

        <div className="relative min-h-0 flex-1">
          <ExerciseGuide exercise={exercise} />
          <DrawingCanvas
            strokeColor={strokeColor}
            strokeWidth={18}
            isEraser={isEraser}
            clearToken={clearToken}
          />
        </div>
      </div>

      <RightToolbar
        sidebarColor={sidebarColor}
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
