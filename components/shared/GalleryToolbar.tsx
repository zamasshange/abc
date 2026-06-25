"use client";

import { motion } from "framer-motion";

function Btn({ bg, children, label, wide, selected, onClick }: {
  bg: string; children: React.ReactNode; label: string; wide?: boolean; selected?: boolean; onClick?: () => void;
}) {
  return (
    <motion.button type="button" onClick={onClick} whileTap={{ scale: 0.9 }}
      className={`flex items-center justify-center border-[3px] ${wide ? "h-11 w-[4.5rem] rounded-xl" : "h-10 w-10 rounded-full"}`}
      style={{ backgroundColor: bg, borderColor: selected ? "#fff" : "rgba(255,255,255,0.9)", boxShadow: "0 4px 0 rgba(0,0,0,0.2)" }}
      aria-label={label}>{children}</motion.button>
  );
}

export function GalleryToolbar({ onBack, onPlay, showCenterTabs, activeTab = "draw", onTabChange }: {
  onBack: () => void; onPlay?: () => void; showCenterTabs?: boolean;
  activeTab?: "draw" | "notebook"; onTabChange?: (t: "draw" | "notebook") => void;
}) {
  return (
    <div className="flex shrink-0 items-center justify-between px-2 py-1.5">
      <div className="flex gap-1.5">
        <Btn bg="#E91E8C" label="Back" onClick={onBack}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none"><path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="3" strokeLinecap="round" /></svg>
        </Btn>
        <Btn bg="#E91E8C" label="Music">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff"><path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" /></svg>
        </Btn>
      </div>
      {showCenterTabs ? (
        <div className="flex gap-1.5">
          <Btn bg="#E91E8C" label="Draw" wide selected={activeTab === "draw"} onClick={() => onTabChange?.("draw")}>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none"><rect x="4" y="4" width="12" height="12" rx="1" stroke="#fff" strokeWidth="2" /><path d="M14 10l6-6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" /></svg>
          </Btn>
          <Btn bg="#42A5F5" label="Notebook" wide selected={activeTab === "notebook"} onClick={() => onTabChange?.("notebook")}>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none"><rect x="5" y="3" width="14" height="18" rx="2" stroke="#fff" strokeWidth="2" /><line x1="9" y1="3" x2="9" y2="21" stroke="#fff" strokeWidth="1.5" strokeDasharray="2 2" /></svg>
          </Btn>
        </div>
      ) : <div />}
      <div className="flex gap-1.5">
        <Btn bg="#FF9800" label="Apps">
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#fff"><path d="M6 12h4v4H6zm4-6h4v4h-4zm4 6h4v4h-4z" /></svg>
            <span className="text-[7px] font-bold text-white">Apps</span>
          </div>
        </Btn>
        <Btn bg="#F44336" label="Play" onClick={onPlay}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
        </Btn>
        <Btn bg="#8BC34A" label="Star">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z" /></svg>
        </Btn>
      </div>
    </div>
  );
}
