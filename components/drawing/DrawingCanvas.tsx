"use client";

import { useRef, useEffect, useCallback } from "react";

type Point = { x: number; y: number };

type DrawingCanvasProps = {
  strokeColor: string;
  strokeWidth: number;
  isEraser: boolean;
  clearToken: number;
  disabled?: boolean;
};

export function DrawingCanvas({
  strokeColor,
  strokeWidth,
  isEraser,
  clearToken,
  disabled = false,
}: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<Point | null>(null);

  const getPoint = useCallback((clientX: number, clientY: number): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    if (w === 0 || h === 0) return;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
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
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = canvas.width / (canvas.clientWidth || 1);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
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
      ctx.globalCompositeOperation = "source-over";
    },
    [isEraser, strokeColor, strokeWidth]
  );

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
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
      className="absolute inset-0 z-20 cursor-crosshair touch-none"
      style={{ touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endStroke}
      onPointerLeave={endStroke}
      onPointerCancel={endStroke}
      aria-label="Drawing canvas"
    />
  );
}
