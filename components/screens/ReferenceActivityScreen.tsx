"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { DrawingCanvas } from "@/components/drawing/DrawingCanvas";
import { ExitDialog } from "@/components/modals/ExitDialog";

/** Activity screens that use reference photo chrome + interactive canvas overlay */
const ACTIVITY_IMAGES: Record<string, string> = {
  "line-tracing": "/assets/activities/line-tracing.jpg",
  maze: "/assets/activities/maze.jpg",
  "learn-to-draw": "/assets/activities/learn-to-draw.jpg",
  "letter-tracing": "/assets/activities/letter-tracing.jpg",
  "connect-dots": "/assets/activities/connect-dots.jpg",
  "letter-match": "/assets/activities/letter-match.jpg",
  matching: "/assets/activities/matching.jpg",
};

/** Canvas draw area as fraction of screen — inside the white/paper region */
const DRAW_ZONES: Record<string, { x: number; y: number; w: number; h: number }> = {
  "line-tracing": { x: 0.13, y: 0.08, w: 0.74, h: 0.82 },
  maze: { x: 0.13, y: 0.14, w: 0.74, h: 0.72 },
  "letter-tracing": { x: 0.13, y: 0.08, w: 0.74, h: 0.82 },
  "connect-dots": { x: 0.13, y: 0.12, w: 0.74, h: 0.75 },
  "learn-to-draw": { x: 0.22, y: 0.12, w: 0.56, h: 0.7 },
  "letter-match": { x: 0.08, y: 0.12, w: 0.84, h: 0.8 },
  matching: { x: 0.08, y: 0.12, w: 0.84, h: 0.75 },
  "free-draw": { x: 0.13, y: 0.08, w: 0.74, h: 0.82 },
  "pixel-art": { x: 0.28, y: 0.12, w: 0.44, h: 0.76 },
};

const BACK_ZONES: Record<string, { x: number; y: number; w: number; h: number }> = {
  default: { x: 0.01, y: 0.55, w: 0.11, h: 0.12 },
  "learn-to-draw": { x: 0.01, y: 0.08, w: 0.1, h: 0.14 },
  "letter-match": { x: 0.02, y: 0.04, w: 0.08, h: 0.16 },
};

type ReferenceActivityScreenProps = {
  variant: keyof typeof DRAW_ZONES;
  onBack: () => void;
  children?: React.ReactNode;
};

export function ReferenceActivityScreen({ variant, onBack, children }: ReferenceActivityScreenProps) {
  const [showExit, setShowExit] = useState(false);
  const [strokeColor, setStrokeColor] = useState("#F44336");
  const [isEraser, setIsEraser] = useState(false);
  const [clearToken, setClearToken] = useState(0);

  const image = ACTIVITY_IMAGES[variant] ?? ACTIVITY_IMAGES["line-tracing"];
  const drawZone = DRAW_ZONES[variant] ?? DRAW_ZONES["line-tracing"];
  const backZone = BACK_ZONES[variant] ?? BACK_ZONES.default;

  const handleBack = useCallback(() => setShowExit(true), []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <Image src={image} alt="" fill className="object-cover object-center" priority sizes="100vw" />

      <button
        type="button"
        className="absolute z-20 touch-manipulation"
        style={{
          left: `${backZone.x * 100}%`,
          top: `${backZone.y * 100}%`,
          width: `${backZone.w * 100}%`,
          height: `${backZone.h * 100}%`,
        }}
        onClick={handleBack}
        aria-label="Back"
      />

      <div
        className="absolute z-10"
        style={{
          left: `${drawZone.x * 100}%`,
          top: `${drawZone.y * 100}%`,
          width: `${drawZone.w * 100}%`,
          height: `${drawZone.h * 100}%`,
        }}
      >
        {children}
        <DrawingCanvas
          strokeColor={strokeColor}
          strokeWidth={14}
          isEraser={isEraser}
          clearToken={clearToken}
        />
      </div>

      {/* Toolbar hit zones — left pencil/eraser/clear */}
      <button type="button" className="absolute z-20" style={{ left: "1%", top: "8%", width: "11%", height: "12%" }} onClick={() => setIsEraser(false)} aria-label="Pen" />
      <button type="button" className="absolute z-20" style={{ left: "1%", top: "24%", width: "11%", height: "12%" }} onClick={() => setIsEraser((p) => !p)} aria-label="Eraser" />
      <button type="button" className="absolute z-20" style={{ left: "1%", top: "40%", width: "11%", height: "12%" }} onClick={() => setClearToken((t) => t + 1)} aria-label="Clear" />

      {/* Color pens — right bar */}
      {["#FF9800", "#FFEB3B", "#8BC34A", "#42A5F5"].map((color, i) => (
        <button
          key={color}
          type="button"
          className="absolute z-20"
          style={{ left: "88%", top: `${22 + i * 14}%`, width: "11%", height: "12%" }}
          onClick={() => { setStrokeColor(color); setIsEraser(false); }}
          aria-label="Color"
        />
      ))}

      <button type="button" className="absolute z-20" style={{ left: "88%", top: "8%", width: "11%", height: "12%" }} onClick={onBack} aria-label="Done" />

      <ExitDialog open={showExit} onCancel={() => setShowExit(false)} onConfirm={onBack} />
    </div>
  );
}
