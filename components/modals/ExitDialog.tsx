"use client";

import { motion, AnimatePresence } from "framer-motion";

type ExitDialogProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ExitDialog({ open, onCancel, onConfirm }: ExitDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="mx-4 flex w-[min(90%,320px)] flex-col items-center rounded-2xl border-[3px] border-[#E53935] bg-white px-6 py-5"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <svg viewBox="0 0 120 100" className="mb-3 h-20 w-24" aria-hidden>
              <polygon points="60,10 100,40 100,80 60,90 20,80 20,40" fill="#FFEB3B" stroke="#F57C00" strokeWidth="2" />
              <polygon points="60,10 100,40 60,40" fill="#E53935" />
              <rect x="48" y="55" width="24" height="30" rx="2" fill="#5D4037" />
              <path d="M48 55 Q60 70 72 55" fill="#3E2723" />
              <polygon points="72,65 90,65 81,78" fill="#4CAF50" />
            </svg>
            <p className="mb-4 text-base font-semibold text-gray-500">Sure to Exit?</p>
            <div className="flex w-full gap-4">
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={onCancel}
                className="flex flex-1 items-center justify-center rounded-xl py-3"
                style={{ backgroundColor: "#E53935", boxShadow: "0 4px 0 #B71C1C" }}
                aria-label="Cancel"
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={onConfirm}
                className="flex flex-1 items-center justify-center rounded-xl py-3"
                style={{ backgroundColor: "#4CAF50", boxShadow: "0 4px 0 #2E7D32" }}
                aria-label="Confirm exit"
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
                  <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
