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
          className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-lg"
            initial={{ scale: 0.9, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <span className="text-xl">👆</span>
            <span className="text-sm font-bold text-gray-600">Press and Hold to Open</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
