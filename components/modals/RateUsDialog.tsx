"use client";

import { motion } from "framer-motion";

type RateUsDialogProps = {
  open: boolean;
  onNever: () => void;
  onYes: () => void;
  onLater: () => void;
};

export function RateUsDialog({ open, onNever, onYes, onLater }: RateUsDialogProps) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/35 p-4">
      <motion.div
        className="w-full max-w-md overflow-hidden rounded-2xl border-[5px] border-[#E53935] bg-white shadow-xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        role="dialog"
        aria-labelledby="rate-title"
      >
        <div className="px-5 pb-4 pt-5 text-center">
          <div className="mb-3 flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-2xl text-[#FFC107]" aria-hidden>★</span>
            ))}
          </div>
          <h2 id="rate-title" className="text-lg font-extrabold text-[#1a1a1a]">Like the Game?</h2>
          <p className="mt-2 text-sm font-semibold leading-snug text-[#333]">
            Please help us and RATE on Google Play
            <br />
            Thanks for your support!
          </p>
        </div>
        <div className="flex">
          <button type="button" onClick={onNever} className="flex-1 bg-[#FFB74D] py-3 text-sm font-extrabold text-white">
            Never
          </button>
          <button type="button" onClick={onYes} className="flex-[1.4] bg-[#4CAF50] py-3 text-sm font-extrabold text-white">
            Yes!!!
          </button>
          <button type="button" onClick={onLater} className="flex-1 bg-[#FFB74D] py-3 text-sm font-extrabold text-white">
            Later
          </button>
        </div>
      </motion.div>
    </div>
  );
}
