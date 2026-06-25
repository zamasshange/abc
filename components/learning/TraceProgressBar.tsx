"use client";

import { motion } from "framer-motion";

export function TraceProgressBar({ progress }: { progress: number }) {
  return (
    <div className="absolute left-1/2 top-2 z-30 w-[min(60%,200px)] -translate-x-1/2">
      <div className="h-3 overflow-hidden rounded-full border-2 border-white bg-white/60 shadow">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#66BB6A] to-[#FFD54F]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.15 }}
        />
      </div>
    </div>
  );
}
