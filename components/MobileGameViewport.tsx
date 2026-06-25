"use client";

import { useCallback, useEffect, useState } from "react";
import { GAME_HEIGHT, GAME_WIDTH } from "@/lib/device";

type MobileGameViewportProps = {
  children: React.ReactNode;
};

export function MobileGameViewport({ children }: MobileGameViewportProps) {
  const [scale, setScale] = useState(1);

  const fit = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const sx = vw / GAME_WIDTH;
    const sy = vh / GAME_HEIGHT;
    setScale(Math.min(sx, sy));
  }, []);

  useEffect(() => {
    fit();
    window.addEventListener("resize", fit);
    window.addEventListener("orientationchange", fit);
    const vv = window.visualViewport;
    vv?.addEventListener("resize", fit);
    return () => {
      window.removeEventListener("resize", fit);
      window.removeEventListener("orientationchange", fit);
      vv?.removeEventListener("resize", fit);
    };
  }, [fit]);

  return (
    <div className="game-viewport-host">
      <div
        className="game-canvas"
        style={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
