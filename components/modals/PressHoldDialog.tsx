"use client";

import { motion, AnimatePresence } from "framer-motion";

type PressHoldDialogProps = {
  open: boolean;
};

export function PressHoldDialog({ open }: PressHoldDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="flex items-center gap-2.5 rounded-2xl bg-white px-4 py-2 shadow-lg"
            initial={{ scale: 0.92, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0 }}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#E8F5E9]">
              <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
                <circle cx="10" cy="14" r="4" fill="#FF9800" />
                <circle cx="22" cy="14" r="4" fill="#42A5F5" />
                <circle cx="16" cy="22" r="4" fill="#E91E63" />
              </svg>
            </div>
            <span className="text-[13px] font-bold text-gray-500">Press and Hold to Open</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
