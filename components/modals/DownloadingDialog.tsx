"use client";

import { motion, AnimatePresence } from "framer-motion";

type DownloadingDialogProps = {
  open: boolean;
};

export function DownloadingDialog({ open }: DownloadingDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center pb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="flex items-center gap-2.5 rounded-full bg-[#424242]/90 px-4 py-2.5 shadow-lg"
            initial={{ scale: 0.92, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0 }}
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/20">
              <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden>
                <circle cx="10" cy="14" r="4" fill="#FF9800" />
                <circle cx="22" cy="14" r="4" fill="#42A5F5" />
                <circle cx="16" cy="22" r="4" fill="#E91E63" />
              </svg>
            </div>
            <span className="text-[12px] font-bold text-white">
              Please wait! Downloading more worksheets...
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
