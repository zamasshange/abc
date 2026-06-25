"use client";

import { motion } from "framer-motion";

function Btn({
  bg,
  ring,
  children,
  label,
  wide,
  onClick,
}: {
  bg: string;
  ring: string;
  children: React.ReactNode;
  label: string;
  wide?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className={`flex items-center justify-center border-[3px] ${wide ? "h-11 w-[4.5rem] rounded-xl" : "h-10 w-10 rounded-full"}`}
      style={{
        backgroundColor: bg,
        borderColor: ring,
        boxShadow: "0 4px 0 rgba(0,0,0,0.22)",
      }}
      aria-label={label}
    >
      {children}
    </motion.button>
  );
}

type GalleryToolbarProps = {
  onBack: () => void;
  onPlay?: () => void;
  showCenterTabs?: boolean;
};

export function GalleryToolbar({ onBack, onPlay, showCenterTabs }: GalleryToolbarProps) {
  return (
    <div className="flex shrink-0 items-center justify-between px-2 py-1.5">
      <div className="flex gap-1.5">
        <Btn bg="#E91E8C" ring="#fff" label="Back" onClick={onBack}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
            <path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </Btn>
        <Btn bg="#E91E8C" ring="#fff" label="Music">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
            <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" />
          </svg>
        </Btn>
      </div>

      {showCenterTabs ? (
        <div className="flex gap-1.5">
          <Btn bg="#AB47BC" ring="#fff" label="Draw" wide>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
              <rect x="4" y="4" width="12" height="12" rx="1" stroke="#fff" strokeWidth="2" />
              <path d="M14 10l6-6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </Btn>
          <Btn bg="#42A5F5" ring="#fff" label="Notebook" wide>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
              <rect x="5" y="3" width="14" height="18" rx="2" stroke="#fff" strokeWidth="2" />
              <line x1="9" y1="3" x2="9" y2="21" stroke="#fff" strokeWidth="1.5" strokeDasharray="2 2" />
            </svg>
          </Btn>
        </div>
      ) : (
        <div />
      )}

      <div className="flex gap-1.5">
        <Btn bg="#FF9800" ring="#fff" label="Apps">
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#fff" aria-hidden>
              <path d="M6 12h4v4H6zm4-6h4v4h-4zm4 6h4v4h-4z" />
            </svg>
            <span className="text-[7px] font-bold text-white">Apps</span>
          </div>
        </Btn>
        <Btn bg="#F44336" ring="#fff" label="Play" onClick={onPlay}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </Btn>
        <Btn bg="#8BC34A" ring="#fff" label="Star">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
          </svg>
        </Btn>
      </div>
    </div>
  );
}
