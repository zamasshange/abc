"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type WorksheetsScreenProps = {
  onBack: () => void;
  onStartTracing: () => void;
};

function ToolbarButton({
  bg,
  children,
  label,
  wide,
  selected,
  onClick,
}: {
  bg: string;
  children: React.ReactNode;
  label: string;
  wide?: boolean;
  selected?: boolean;
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
        borderColor: selected ? "#fff" : "rgba(255,255,255,0.9)",
        boxShadow: "0 4px 0 rgba(0,0,0,0.2)",
      }}
      aria-label={label}
    >
      {children}
    </motion.button>
  );
}

function WorksheetPreview({ type }: { type: "horizontal" | "vertical" | "diagonal" }) {
  const dot = (cx: number, cy: number) => (
    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="7" fill="#1a1a1a" />
  );
  const dash = "6 5";

  return (
    <div className="flex aspect-square w-[26vw] max-w-[170px] min-w-[90px] items-center justify-center border-[4px] border-[#2D8B4E] bg-white p-3">
      <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden>
        {type === "horizontal" && (
          <>
            {dot(12, 28)}
            {dot(68, 28)}
            <line x1="19" y1="28" x2="61" y2="28" stroke="#999" strokeWidth="2.5" strokeDasharray={dash} />
            {dot(12, 52)}
            {dot(68, 52)}
            <line x1="19" y1="52" x2="61" y2="52" stroke="#999" strokeWidth="2.5" strokeDasharray={dash} />
          </>
        )}
        {type === "vertical" && (
          <>
            {dot(28, 12)}
            {dot(28, 68)}
            <line x1="28" y1="19" x2="28" y2="61" stroke="#999" strokeWidth="2.5" strokeDasharray={dash} />
            {dot(52, 12)}
            {dot(52, 68)}
            <line x1="52" y1="19" x2="52" y2="61" stroke="#999" strokeWidth="2.5" strokeDasharray={dash} />
          </>
        )}
        {type === "diagonal" && (
          <>
            {dot(12, 62)}
            {dot(62, 12)}
            <line x1="18" y1="56" x2="56" y2="18" stroke="#999" strokeWidth="2.5" strokeDasharray={dash} />
            {dot(18, 68)}
            {dot(68, 18)}
            <line x1="24" y1="62" x2="62" y2="24" stroke="#999" strokeWidth="2.5" strokeDasharray={dash} />
          </>
        )}
      </svg>
    </div>
  );
}

export function WorksheetsScreen({ onBack, onStartTracing }: WorksheetsScreenProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="worksheets-bg relative flex h-full w-full flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between px-2 py-1.5">
        <div className="flex gap-1.5">
          <ToolbarButton bg="#E91E8C" label="Back" onClick={onBack}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
              <path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </ToolbarButton>
          <ToolbarButton bg="#E91E8C" label="Music">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
              <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" />
            </svg>
          </ToolbarButton>
        </div>
        <div className="flex gap-1.5">
          <ToolbarButton bg="#E91E8C" label="Draw" wide selected>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
              <rect x="4" y="4" width="12" height="12" rx="1" stroke="#fff" strokeWidth="2" />
              <path d="M14 10l6-6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </ToolbarButton>
          <ToolbarButton bg="#42A5F5" label="Notebook" wide>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
              <rect x="5" y="3" width="14" height="18" rx="2" stroke="#fff" strokeWidth="2" />
              <line x1="9" y1="3" x2="9" y2="21" stroke="#fff" strokeWidth="1.5" strokeDasharray="2 2" />
            </svg>
          </ToolbarButton>
        </div>
        <div className="flex gap-1.5">
          <ToolbarButton bg="#FF9800" label="Apps">
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#fff" aria-hidden>
                <path d="M6 12h4v4H6zm4-6h4v4h-4zm4 6h4v4h-4z" />
              </svg>
              <span className="text-[7px] font-bold text-white">Apps</span>
            </div>
          </ToolbarButton>
          <ToolbarButton bg="#F44336" label="Play" onClick={onStartTracing}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </ToolbarButton>
          <ToolbarButton bg="#8BC34A" label="Star">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
            </svg>
          </ToolbarButton>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center gap-2 px-2">
        <WorksheetPreview type="horizontal" />
        <div className="relative">
          <WorksheetPreview type="vertical" />
          <AnimatePresence>
            {loading && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 shadow-lg">
                  <span className="text-lg">🖍️</span>
                  <p className="text-[10px] font-semibold text-gray-600">
                    Please wait! Downloading more worksheets...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <WorksheetPreview type="diagonal" />
      </div>

      <div className="flex shrink-0 justify-center px-3 pb-3">
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={onStartTracing}
          className="rounded-2xl border-[3px] border-[#689F38] bg-[#AED581] px-10 py-2.5 text-sm font-extrabold text-white"
          style={{ textShadow: "1px 1px 0 #689F38", boxShadow: "0 4px 0 #689F38" }}
        >
          Download And Print
        </motion.button>
      </div>
    </div>
  );
}
