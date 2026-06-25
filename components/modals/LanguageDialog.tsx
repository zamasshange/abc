"use client";

import { motion, AnimatePresence } from "framer-motion";

type LanguageDialogProps = {
  open: boolean;
  onClose: () => void;
  onParentDashboard?: () => void;
};

export function LanguageDialog({ open, onClose, onParentDashboard }: LanguageDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-[min(85%,280px)] rounded-lg border-[3px] border-[#E53935] bg-white px-6 py-5"
            initial={{ scale: 0.85, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-4 text-center text-lg font-bold text-gray-800">English</p>
            <label className="mb-2 flex items-center gap-3 text-gray-700">
              <input type="checkbox" className="h-5 w-5 accent-green-500" />
              <span className="font-semibold">US</span>
            </label>
            <label className="mb-5 flex items-center gap-3 text-gray-700">
              <input type="checkbox" defaultChecked className="h-5 w-5 accent-green-500" />
              <span className="font-semibold">UK</span>
            </label>
            <div className="flex flex-col items-center gap-3">
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="flex h-12 w-16 items-center justify-center rounded-lg"
                style={{ backgroundColor: "#4CAF50", boxShadow: "0 3px 0 #2E7D32" }}
                aria-label="Confirm language"
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
                  <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </motion.button>
              {onParentDashboard && (
                <button
                  type="button"
                  onClick={() => { onClose(); onParentDashboard(); }}
                  className="text-xs font-bold text-[#9C6ADE] underline"
                >
                  Parent Progress
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
