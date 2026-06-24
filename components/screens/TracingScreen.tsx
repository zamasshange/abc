"use client";

import { useState, useCallback } from "react";
import type { DrawingTemplateId } from "@/lib/navigation";
import { getDrawingTemplate } from "@/lib/drawing/templates";
import { DrawingCanvas } from "@/components/drawing/DrawingCanvas";
import { TemplateLayer } from "@/components/drawing/TemplateLayer";
import { LeftToolbar, RightToolbar } from "@/components/drawing/DrawingToolbars";

type TracingScreenProps = {
  templateId: DrawingTemplateId;
  onBack: () => void;
};

export function TracingScreen({ templateId, onBack }: TracingScreenProps) {
  const template = getDrawingTemplate(templateId);
  const [strokeColor, setStrokeColor] = useState("#F44336");
  const [isEraser, setIsEraser] = useState(false);
  const [clearToken, setClearToken] = useState(0);

  const handleColorSelect = useCallback((color: string) => {
    setStrokeColor(color);
    setIsEraser(false);
  }, []);

  const handleEraserToggle = useCallback(() => {
    setIsEraser((prev) => !prev);
  }, []);

  const handleClear = useCallback(() => {
    setClearToken((t) => t + 1);
  }, []);

  return (
    <div className="flex h-full w-full overflow-hidden bg-white">
      <LeftToolbar
        isEraser={isEraser}
        onEraserToggle={handleEraserToggle}
        onClear={handleClear}
        onBack={onBack}
      />

      <div className="relative flex min-w-0 flex-1 flex-col bg-white">
        <div className="flex shrink-0 justify-between px-3 pt-1.5">
          <svg viewBox="0 0 60 30" className="h-5 w-9 opacity-50 sm:h-6 sm:w-10" aria-hidden>
            <path
              d="M50 5 L10 15 L50 25"
              fill="none"
              stroke="#888"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg viewBox="0 0 60 30" className="h-5 w-9 opacity-50 sm:h-6 sm:w-10" aria-hidden>
            <path
              d="M10 5 L50 15 L10 25"
              fill="none"
              stroke="#888"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="relative mx-auto flex flex-1 w-full max-w-2xl items-center justify-center px-4 pb-4">
          <div className="relative h-full w-full max-h-[85%]">
            <TemplateLayer template={template} />
            <DrawingCanvas
              strokeColor={strokeColor}
              strokeWidth={8}
              isEraser={isEraser}
              clearToken={clearToken}
            />
          </div>
        </div>

        <div className="flex shrink-0 items-end justify-between px-4 pb-3">
          <div className="flex flex-col items-center gap-0.5">
            <svg viewBox="0 0 40 40" className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden>
              <rect x="6" y="14" width="28" height="22" rx="2" fill="none" stroke="#F5C623" strokeWidth="3" />
              <rect x="12" y="20" width="16" height="12" rx="1" fill="none" stroke="#F5C623" strokeWidth="2.5" />
              <circle cx="20" cy="8" r="4" fill="#F5C623" />
            </svg>
            <span className="text-[8px] font-bold tracking-widest text-[#F5C623] sm:text-[9px]">
              GA STUDIOS
            </span>
          </div>
          <span className="text-xs text-gray-400 sm:text-sm">v 8.8</span>
        </div>
      </div>

      <RightToolbar
        selectedColor={strokeColor}
        isEraser={isEraser}
        onColorSelect={handleColorSelect}
        onDone={onBack}
      />
    </div>
  );
}
