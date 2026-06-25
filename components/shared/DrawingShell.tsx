"use client";

import { useState, useCallback } from "react";
import { LeftToolbar, RightToolbar } from "@/components/drawing/DrawingToolbars";
import { DrawingCanvas } from "@/components/drawing/DrawingCanvas";
import { ExitDialog } from "@/components/modals/ExitDialog";

export function DrawingShell({ children, onBack, showCanvas = true, header }: {
  children?: React.ReactNode; onBack: () => void; showCanvas?: boolean; header?: React.ReactNode;
}) {
  const [strokeColor, setStrokeColor] = useState("#F44336");
  const [isEraser, setIsEraser] = useState(false);
  const [clearToken, setClearToken] = useState(0);
  const [showExit, setShowExit] = useState(false);

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
        <div className="relative flex min-h-0 min-w-0 flex-1 flex-col bg-white">
          {header}
          <div className="relative min-h-0 flex-1">
            {children}
            {showCanvas && (
              <DrawingCanvas strokeColor={strokeColor} strokeWidth={14} isEraser={isEraser} clearToken={clearToken} />
            )}
          </div>
        </div>
        <RightToolbar
          selectedColor={strokeColor}
          isEraser={isEraser}
          onColorSelect={(c) => { setStrokeColor(c); setIsEraser(false); }}
          onDone={onBack}
        />
      </div>
      <ExitDialog open={showExit} onCancel={() => setShowExit(false)} onConfirm={onBack} />
    </div>
  );
}
