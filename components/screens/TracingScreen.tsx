"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type TracingScreenProps = {
  onBack: () => void;
};

function SideButton({
  bg,
  children,
  label,
  onClick,
}: {
  bg: string;
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/80 sm:h-10 sm:w-10"
      style={{ backgroundColor: bg, boxShadow: "0 2px 0 rgba(0,0,0,0.2)" }}
      aria-label={label}
    >
      {children}
    </motion.button>
  );
}

export function TracingScreen({ onBack }: TracingScreenProps) {
  const [strokeColor, setStrokeColor] = useState("#FF3333");

  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className="flex w-[14%] min-w-[48px] flex-col items-center justify-evenly bg-[#FFE566] py-2 sm:min-w-[56px]">
        <SideButton bg="#FF9800" label="Draw">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
            <path d="M3 21l3.75-.75L18 9l-3-3L3.75 17.25 3 21z" />
          </svg>
        </SideButton>
        <SideButton bg="#F44336" label="Sound">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
            <path d="M3 9v6h4l5 5V4L7 9H3z" />
          </svg>
        </SideButton>
        <SideButton bg="#9C27B0" label="Eraser">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
            <path d="M16 3l5 5-11 11H5v-5L16 3z" />
          </svg>
        </SideButton>
        <SideButton bg="#FF9800" label="Camera">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6zm6-6h-1.5l-1-2h-5l-1 2H9a2 2 0 00-2 2v7a2 2 0 002 2h9a2 2 0 002-2v-7a2 2 0 00-2-2z" />
          </svg>
        </SideButton>
        <SideButton bg="#42A5F5" label="Clear">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </SideButton>
        <SideButton bg="#E91E8C" label="Back" onClick={onBack}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
            <path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </SideButton>
      </div>

      <div className="relative flex flex-1 flex-col bg-white">
        <div className="flex justify-between px-3 pt-1">
          <svg viewBox="0 0 60 30" className="h-6 w-10 opacity-60" aria-hidden>
            <path d="M50 5 L10 15 L50 25" fill="none" stroke="#888" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg viewBox="0 0 60 30" className="h-6 w-10 opacity-60" aria-hidden>
            <path d="M10 5 L50 15 L10 25" fill="none" stroke="#888" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="flex flex-1 items-center justify-center gap-6 px-4 sm:gap-10">
          {[0, 1].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="h-5 w-8 rounded-full bg-[#1a1a1a]" />
              <svg viewBox="0 0 40 120" className="h-[45vh] max-h-[180px] w-10" aria-hidden>
                <motion.path
                  d={`M20 10 Q${18 + i * 4} 60 20 110`}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: i * 0.3, ease: "easeInOut" }}
                />
                <path
                  d={`M20 10 Q${18 + i * 4} 60 20 110`}
                  fill="none"
                  stroke="#ccc"
                  strokeWidth="2"
                  strokeDasharray="4 5"
                />
              </svg>
              <div className="h-5 w-8 rounded-full bg-[#1a1a1a]" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-[14%] min-w-[48px] flex-col items-center justify-evenly bg-[#FFE566] py-2 sm:min-w-[56px]">
        <SideButton bg="#FF9800" label="Menu">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
            <circle cx="6" cy="6" r="2" /><circle cx="6" cy="12" r="2" /><circle cx="6" cy="18" r="2" />
            <line x1="11" y1="6" x2="20" y2="6" stroke="#fff" strokeWidth="2" />
            <line x1="11" y1="12" x2="20" y2="12" stroke="#fff" strokeWidth="2" />
            <line x1="11" y1="18" x2="20" y2="18" stroke="#fff" strokeWidth="2" />
          </svg>
        </SideButton>
        <SideButton bg="#F44336" label="Red" onClick={() => setStrokeColor("#FF3333")}>
          <span className="sr-only">Red</span>
        </SideButton>
        <SideButton bg="#FF9800" label="Orange" onClick={() => setStrokeColor("#FF9800")}>
          <span className="sr-only">Orange</span>
        </SideButton>
        <SideButton bg="#FFEB3B" label="Done">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
            <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </SideButton>
        <SideButton bg="#8BC34A" label="Green" onClick={() => setStrokeColor("#8BC34A")}>
          <span className="sr-only">Green</span>
        </SideButton>
        <SideButton bg="#42A5F5" label="Blue" onClick={() => setStrokeColor("#42A5F5")}>
          <span className="sr-only">Blue</span>
        </SideButton>
      </div>
    </div>
  );
}
