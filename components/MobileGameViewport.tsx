"use client";

import { useCallback, useEffect, useState } from "react";
import { GAME_HEIGHT, GAME_WIDTH } from "@/lib/device";

type MobileGameViewportProps = {
  children: React.ReactNode;
  /** Letterbox fill — matches active screen background */
  fillColor?: string;
};

export function MobileGameViewport({ children, fillColor = "#c6e06d" }: MobileGameViewportProps) {
  const [layout, setLayout] = useState({ scale: 1, offsetX: 0, offsetY: 0 });

  const fit = useCallback(() => {
    const vv = window.visualViewport;
    const vw = vv?.width ?? window.innerWidth;
    const vh = vv?.height ?? window.innerHeight;
    const sx = vw / GAME_WIDTH;
    const sy = vh / GAME_HEIGHT;
    // Contain: show the full UI (both nav rows + cards) — never crop the top bar
    const scale = Math.min(sx, sy);
    const scaledW = GAME_WIDTH * scale;
    const scaledH = GAME_HEIGHT * scale;
    setLayout({
      scale,
      offsetX: (vw - scaledW) / 2,
      offsetY: (vh - scaledH) / 2,
    });
  }, []);

  useEffect(() => {
    fit();
    window.addEventListener("resize", fit);
    window.addEventListener("orientationchange", fit);
    const vv = window.visualViewport;
    vv?.addEventListener("resize", fit);
    vv?.addEventListener("scroll", fit);
    return () => {
      window.removeEventListener("resize", fit);
      window.removeEventListener("orientationchange", fit);
      vv?.removeEventListener("resize", fit);
      vv?.removeEventListener("scroll", fit);
    };
  }, [fit]);

  const { scale, offsetX, offsetY } = layout;

  return (
    <div className="game-viewport-host" style={{ backgroundColor: fillColor }}>
      <div
        className="game-canvas"
        style={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          left: offsetX,
          top: offsetY,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
