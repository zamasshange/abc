"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type SplashScreenProps = {
  onComplete: () => void;
};

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"loading" | "panda">("loading");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("panda"), 800);
    const t2 = setTimeout(() => onComplete(), 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="relative h-full w-full cursor-pointer overflow-hidden bg-[#b8b8b8]"
      onClick={onComplete}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onComplete()}
      aria-label="Tap to continue"
      exit={{ opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={
              phase === "loading"
                ? "/assets/screens/splash-loading.jpg"
                : "/assets/screens/splash-panda.jpg"
            }
            alt=""
            fill
            className="object-fill"
            priority
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
