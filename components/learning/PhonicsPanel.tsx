"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getPhonics, getNumberPhonics } from "@/lib/phonics";

type PhonicsPanelProps = {
  char: string;
  mode: "letter" | "number";
  phase: "letter" | "word" | "object";
};

export function PhonicsPanel({ char, mode, phase }: PhonicsPanelProps) {
  const entry = mode === "number" ? null : getPhonics(char);
  const numEntry = mode === "number" ? getNumberPhonics(char) : null;

  return (
    <div className="pointer-events-none absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-2xl border-[3px] border-[#BA68C8] bg-white/95 px-4 py-2 shadow-lg">
      <span className="text-2xl font-extrabold text-[#33D6F5]">{char}</span>
      <AnimatePresence mode="wait">
        {phase !== "letter" && (
          <motion.div
            key={phase}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -12, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <span className="text-xs font-bold text-gray-400">→</span>
            {mode === "letter" && entry && (
              <>
                <span className="text-sm font-extrabold text-[#FF9933]">{entry.word}</span>
                {phase === "object" && (
                  <motion.span
                    className="text-3xl"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {entry.emoji}
                  </motion.span>
                )}
              </>
            )}
            {mode === "number" && numEntry && (
              <>
                <span className="text-sm font-extrabold text-[#FF9933]">{numEntry.word}</span>
                {phase === "object" && (
                  <motion.span className="text-xl" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    {numEntry.count}
                  </motion.span>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
