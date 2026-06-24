"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type WorksheetsScreenProps = {
  onBack: () => void;
  onStartTracing: () => void;
};

function ToolbarButton({
  bg,
  children,
  label,
  wide,
  onClick,
}: {
  bg: string;
  children: React.ReactNode;
  label: string;
  wide?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      className={`flex items-center justify-center border-[3px] border-white ${wide ? "h-11 w-16 rounded-xl sm:h-12 sm:w-20" : "h-10 w-10 rounded-full sm:h-11 sm:w-11"}`}
      style={{ backgroundColor: bg, boxShadow: "0 3px 0 rgba(0,0,0,0.2)" }}
      aria-label={label}
    >
      {children}
    </motion.button>
  );
}

function WorksheetPreview({ type }: { type: "horizontal" | "vertical" | "diagonal" }) {
  const dot = (cx: number, cy: number) => (
    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" fill="#1a1a1a" />
  );
  const dash = "5 4";

  return (
    <div className="flex aspect-square w-[26vw] max-w-[140px] min-w-[90px] items-center justify-center rounded-sm border-[3px] border-[#2D8B4E] bg-white p-3 sm:max-w-[160px]">
      <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden>
        {type === "horizontal" && (
          <>
            {dot(15, 30)}{dot(65, 30)}
            <line x1="20" y1="30" x2="60" y2="30" stroke="#999" strokeWidth="2" strokeDasharray={dash} />
            {dot(15, 55)}{dot(65, 55)}
            <line x1="20" y1="55" x2="60" y2="55" stroke="#999" strokeWidth="2" strokeDasharray={dash} />
          </>
        )}
        {type === "vertical" && (
          <>
            {dot(30, 15)}{dot(30, 65)}
            <line x1="30" y1="20" x2="30" y2="60" stroke="#999" strokeWidth="2" strokeDasharray={dash} />
            {dot(55, 15)}{dot(55, 65)}
            <line x1="55" y1="20" x2="55" y2="60" stroke="#999" strokeWidth="2" strokeDasharray={dash} />
          </>
        )}
        {type === "diagonal" && (
          <>
            {dot(15, 60)}{dot(60, 15)}
            <line x1="20" y1="55" x2="55" y2="20" stroke="#999" strokeWidth="2" strokeDasharray={dash} />
            {dot(20, 65)}{dot(65, 20)}
            <line x1="25" y1="60" x2="60" y2="25" stroke="#999" strokeWidth="2" strokeDasharray={dash} />
          </>
        )}
      </svg>
    </div>
  );
}

export function WorksheetsScreen({ onBack, onStartTracing }: WorksheetsScreenProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="worksheets-bg relative flex h-full w-full flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between px-2 py-1.5 sm:px-3 sm:py-2">
        <div className="flex gap-1.5 sm:gap-2">
          <ToolbarButton bg="#E91E8C" label="Back" onClick={onBack}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
              <path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ToolbarButton>
          <ToolbarButton bg="#E91E8C" label="Music">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden>
              <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" />
            </svg>
          </ToolbarButton>
        </div>

        <div className="flex gap-1.5 sm:gap-2">
          <ToolbarButton bg="#D946A8" label="Draw" wide>
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

        <div className="flex gap-1.5 sm:gap-2">
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

      <div className="relative flex flex-1 items-center justify-center gap-2 px-2 sm:gap-4">
        <WorksheetPreview type="horizontal" />
        <div className="relative">
          <WorksheetPreview type="vertical" />
          {loading && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mx-2 flex max-w-[200px] items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-lg sm:max-w-[240px] sm:px-4 sm:py-3">
                <div className="text-lg">🖍️</div>
                <p className="text-[10px] font-semibold leading-tight text-gray-600 sm:text-xs">
                  Please wait! Downloading more worksheets...
                </p>
              </div>
            </motion.div>
          )}
        </div>
        <WorksheetPreview type="diagonal" />
      </div>

      <div className="flex shrink-0 justify-center px-3 pb-3 sm:pb-4">
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={onStartTracing}
          className="rounded-2xl border-[3px] border-[#689F38] bg-[#AED581] px-6 py-2.5 text-sm font-extrabold text-white sm:px-10 sm:py-3 sm:text-base"
          style={{ textShadow: "1px 1px 0 #689F38", boxShadow: "0 4px 0 #689F38" }}
        >
          Download And Print
        </motion.button>
      </div>
    </div>
  );
}
