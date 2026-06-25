"use client";

import { useRef, useEffect, useCallback } from "react";

type Point = { x: number; y: number };

type DrawingCanvasProps = {
  strokeColor: string;
  strokeWidth: number;
  isEraser: boolean;
  clearToken: number;
  disabled?: boolean;
  onStroke?: (x: number, y: number, width: number, height: number) => void;
};

export function DrawingCanvas({
  strokeColor,
  strokeWidth,
  isEraser,
  clearToken,
  disabled = false,
  onStroke,
}: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<Point | null>(null);
  const dprRef = useRef(1);

  /** CSS-pixel coords — ctx transform already applies devicePixelRatio */
  const getPoint = useCallback((clientX: number, clientY: number): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    if (w === 0 || h === 0) return;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    const observer = new ResizeObserver(() => resizeCanvas());
    const parent = canvasRef.current?.parentElement;
    if (parent) observer.observe(parent);
    window.addEventListener("orientationchange", resizeCanvas);
    return () => {
      observer.disconnect();
      window.removeEventListener("orientationchange", resizeCanvas);
    };
  }, [resizeCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || clearToken < 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0);
    ctx.clearRect(0, 0, w, h);
  }, [clearToken]);

  const paint = useCallback(
    (x: number, y: number, isStart: boolean) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (isEraser) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.strokeStyle = "rgba(0,0,0,1)";
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.lineWidth = strokeWidth * 2.2;
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = strokeColor;
        ctx.fillStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
      }

      if (isStart) {
        ctx.beginPath();
        ctx.arc(x, y, strokeWidth / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const last = lastPointRef.current;
        if (last) {
          ctx.beginPath();
          ctx.moveTo(last.x, last.y);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }
      if (!isEraser && onStroke) {
        const canvas = canvasRef.current!;
        onStroke(x, y, canvas.clientWidth, canvas.clientHeight);
      }
      ctx.globalCompositeOperation = "source-over";
    },
    [isEraser, strokeColor, strokeWidth, onStroke]
  );

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const pt = getPoint(e.clientX, e.clientY);
    lastPointRef.current = pt;
    paint(pt.x, pt.y, true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || disabled) return;
    e.preventDefault();
    const pt = getPoint(e.clientX, e.clientY);
    paint(pt.x, pt.y, false);
    lastPointRef.current = pt;
  };

  const endStroke = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    lastPointRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* released */
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-20 touch-none ${disabled ? "pointer-events-none" : ""}`}
      style={{ touchAction: "none", cursor: "crosshair" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endStroke}
      onPointerLeave={endStroke}
      onPointerCancel={endStroke}
      aria-label="Drawing canvas"
    />
  );
}
