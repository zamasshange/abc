"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCheerSound, randomEncouragement, speak } from "@/lib/audio";

type RewardOverlayProps = {
  open: boolean;
  message?: string;
  emoji?: string;
  onDone: () => void;
};

function ConfettiPiece({ i }: { i: number }) {
  const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6FD8", "#9B59B6"];
  const left = 10 + (i * 17) % 80;
  const delay = (i % 7) * 0.05;
  return (
    <motion.span
      className="pointer-events-none absolute top-0 h-2 w-2 rounded-sm"
      style={{ left: `${left}%`, backgroundColor: colors[i % colors.length] }}
      initial={{ y: -10, opacity: 1, rotate: 0 }}
      animate={{ y: 280, opacity: 0, rotate: 360 + i * 40 }}
      transition={{ duration: 1.4 + (i % 5) * 0.1, delay, ease: "easeIn" }}
      aria-hidden
    />
  );
}

export function RewardOverlay({ open, message, emoji = "⭐", onDone }: RewardOverlayProps) {
  useEffect(() => {
    if (!open) return;
    playCheerSound();
    const msg = message ?? randomEncouragement();
    speak(msg);
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [open, message, onDone]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-40 flex items-center justify-center bg-black/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onDone}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <ConfettiPiece key={i} i={i} />
          ))}
          <motion.div
            className="relative flex flex-col items-center rounded-3xl border-[5px] border-[#FFD54F] bg-white px-10 py-8 shadow-2xl"
            initial={{ scale: 0.5, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="mb-3 flex gap-1 text-3xl"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              {"⭐⭐⭐"}
            </motion.div>
            <motion.span
              className="text-6xl"
              animate={{ scale: [1, 1.15, 1], rotate: [0, -8, 8, 0] }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {emoji}
            </motion.span>
            <p className="mt-4 text-center text-xl font-extrabold text-[#E91E63]">
              {message ?? randomEncouragement()}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
