"use client";

import { useCallback, useEffect, useState } from "react";
import { GAME_HEIGHT, GAME_WIDTH } from "@/lib/device";

type MobileGameViewportProps = {
  children: React.ReactNode;
  fillColor?: string;
};

export function MobileGameViewport({ children, fillColor = "#c6e06d" }: MobileGameViewportProps) {
  const [layout, setLayout] = useState({ scale: 1 });

  const fit = useCallback(() => {
    const vv = window.visualViewport;
    const vw = vv?.width ?? window.innerWidth;
    const vh = vv?.height ?? window.innerHeight;
    const sx = vw / GAME_WIDTH;
    const scale = sx;
    setLayout({ scale });
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

  const { scale } = layout;

  return (
    <div className="game-viewport-host" style={{ backgroundColor: fillColor }}>
      <div
        className="game-canvas"
        style={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          left: 0,
          top: 0,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
