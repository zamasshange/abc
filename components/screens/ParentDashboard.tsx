"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { loadProgress, getProgressSummary, type BadgeLevel } from "@/lib/progress";

const BADGE_LABELS: Record<NonNullable<BadgeLevel>, string> = {
  bronze: "Bronze Learner",
  silver: "Silver Learner",
  gold: "Gold Learner",
  master: "Master Learner",
};

type ParentDashboardProps = {
  open: boolean;
  onClose: () => void;
};

function StatCard({ label, value, color }: { label: string; value: number | string; color: string }) {
  return (
    <div className="rounded-xl border-[3px] p-3 text-center" style={{ borderColor: color, backgroundColor: `${color}18` }}>
      <p className="text-2xl font-extrabold" style={{ color }}>{value}</p>
      <p className="text-[10px] font-bold text-gray-600">{label}</p>
    </div>
  );
}

export function ParentDashboard({ open, onClose }: ParentDashboardProps) {
  const [summary, setSummary] = useState(() => getProgressSummary(loadProgress()));

  useEffect(() => {
    if (open) setSummary(getProgressSummary(loadProgress()));
  }, [open]);

  if (!open) return null;

  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        className="max-h-[90%] w-full max-w-lg overflow-y-auto rounded-2xl border-[4px] border-[#9C6ADE] bg-white p-5 shadow-xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[#9C6ADE]">Learning Progress</h2>
          <button type="button" onClick={onClose} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
            Close
          </button>
        </div>

        {summary.badge && (
          <div className="mb-4 rounded-xl bg-gradient-to-r from-[#FFD54F] to-[#FF9933] px-4 py-3 text-center">
            <span className="text-2xl">🏅</span>
            <p className="text-sm font-extrabold text-white">{BADGE_LABELS[summary.badge]}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          <StatCard label="Uppercase" value={summary.lettersUpper} color="#33D6F5" />
          <StatCard label="Lowercase" value={summary.lettersLower} color="#33D6F5" />
          <StatCard label="Numbers" value={summary.numbers} color="#FFCC00" />
          <StatCard label="Lines" value={summary.lines} color="#B8E050" />
          <StatCard label="Shapes" value={summary.shapes} color="#FF8080" />
          <StatCard label="Activities" value={summary.activitiesCompleted} color="#BA68C8" />
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-[#E8F5E9] px-4 py-3">
          <span className="text-sm font-bold text-[#4CAF50]">Daily streak</span>
          <span className="text-xl font-extrabold text-[#2E7D32]">{summary.streak} 🔥</span>
        </div>

        <p className="mt-4 text-center text-[10px] text-gray-400">Progress saved on this device</p>
      </motion.div>
    </motion.div>
  );
}
