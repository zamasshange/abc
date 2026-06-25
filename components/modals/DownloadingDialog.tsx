"use client";

import { motion, AnimatePresence } from "framer-motion";

export function DownloadingDialog({ open }: { open: boolean }) {
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
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <span className="text-lg">🖍️</span>
            <p className="text-[11px] font-semibold text-gray-600">Please wait! Downloading more worksheets...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
