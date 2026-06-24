"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Phase = "logo" | "drawing" | "complete";

function Sparkle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="absolute h-5 w-5"
      style={{ left: x, top: y }}
      initial={{ scale: 0, opacity: 0, rotate: 0 }}
      animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.8], rotate: [0, 20, 0] }}
      transition={{ delay, duration: 0.6, repeat: Infinity, repeatDelay: 1.2 }}
      aria-hidden
    >
      <path
        d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
        fill="#FFE566"
        stroke="#F5C623"
        strokeWidth="1"
      />
    </motion.svg>
  );
}

function AnimatedSquare({ phase }: { phase: Phase }) {
  const isComplete = phase === "complete";
  const showTopDashed = phase === "drawing";

  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
      <motion.line
        x1="20" y1="20" x2="20" y2="100"
        stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
      <motion.line
        x1="20" y1="100" x2="100" y2="100"
        stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      />
      <motion.line
        x1="100" y1="100" x2="100" y2="20"
        stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      />
      {showTopDashed && (
        <motion.line
          x1="20" y1="20" x2="100" y2="20"
          stroke="#5BC8F5" strokeWidth="5" strokeLinecap="round"
          strokeDasharray="10 7"
          animate={{ strokeDashoffset: [0, -34] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      {isComplete && (
        <motion.line
          x1="20" y1="20" x2="100" y2="20"
          stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
      {[
        [20, 20, 0.3],
        [100, 20, 0.5],
        [20, 100, 0.7],
        [100, 100, 1.0],
      ].map(([cx, cy, delay], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="5.5"
          fill="#FF3333"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{
            scale: { duration: 1.2, repeat: Infinity, delay: Number(delay) },
            default: { duration: 0.3, delay: Number(delay) },
          }}
          style={{ opacity: i === 3 && !isComplete ? 0 : 1 }}
        />
      ))}
    </svg>
  );
}

function PandaCharacter({ phase }: { phase: Phase }) {
  const visible = phase !== "logo";

  return (
    <motion.div
      className="h-36 w-36 shrink-0"
      initial={{ opacity: 0, x: 60, scale: 0.8 }}
      animate={visible ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 60, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden>
        <ellipse cx="100" cy="130" rx="55" ry="60" fill="#fff" stroke="#1a1a1a" strokeWidth="3" />
        <circle cx="55" cy="55" r="22" fill="#1a1a1a" />
        <circle cx="145" cy="55" r="22" fill="#1a1a1a" />
        <ellipse cx="78" cy="108" rx="18" ry="22" fill="#1a1a1a" />
        <ellipse cx="122" cy="108" rx="18" ry="22" fill="#1a1a1a" />
        <circle cx="78" cy="108" r="10" fill="#5BC8F5" />
        <circle cx="122" cy="108" r="10" fill="#5BC8F5" />
        <circle cx="82" cy="104" r="4" fill="#fff" />
        <circle cx="126" cy="104" r="4" fill="#fff" />
        <ellipse cx="100" cy="128" rx="8" ry="6" fill="#1a1a1a" />
        <path d="M92 138 Q100 148 108 138" fill="none" stroke="#1a1a1a" strokeWidth="2.5" />
        <ellipse cx="100" cy="142" rx="6" ry="4" fill="#FF99BB" />
        <ellipse cx="68" cy="175" rx="14" ry="18" fill="#1a1a1a" />
        <ellipse cx="132" cy="175" rx="14" ry="18" fill="#1a1a1a" />
        <motion.g
          animate={{ rotate: [0, 14, 0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "155px", originY: "95px" }}
        >
          <ellipse cx="155" cy="95" rx="12" ry="14" fill="#1a1a1a" />
          <ellipse cx="168" cy="82" rx="10" ry="12" fill="#fff" stroke="#1a1a1a" strokeWidth="2" />
        </motion.g>
        <g transform="translate(55, 30) rotate(-35)">
          <rect x="0" y="0" width="22" height="130" rx="4" fill="#E84393" stroke="#1a1a1a" strokeWidth="2" />
          <polygon points="0,0 22,0 11,-18" fill="#E8C49A" stroke="#1a1a1a" strokeWidth="2" />
          <polygon points="11,-18 8,-24 14,-24" fill="#1a1a1a" />
          <ellipse cx="11" cy="130" rx="12" ry="8" fill="#FF99BB" stroke="#1a1a1a" strokeWidth="2" />
        </g>
        <ellipse cx="45" cy="95" rx="12" ry="14" fill="#1a1a1a" />
      </svg>
    </motion.div>
  );
}

function GAStudiosLogo() {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg viewBox="0 0 40 40" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden>
        <rect x="6" y="14" width="28" height="22" rx="2" fill="none" stroke="#F5C623" strokeWidth="3" />
        <rect x="12" y="20" width="16" height="12" rx="1" fill="none" stroke="#F5C623" strokeWidth="2.5" />
        <circle cx="20" cy="8" r="4" fill="#F5C623" />
      </svg>
      <span className="text-[9px] font-bold tracking-widest text-[#F5C623] sm:text-[10px]">GA STUDIOS</span>
    </div>
  );
}

type SplashScreenProps = {
  onComplete: () => void;
};

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<Phase>("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("drawing"), 900);
    const t2 = setTimeout(() => setPhase("complete"), 2400);
    const t3 = setTimeout(() => onComplete(), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <motion.div
      className="relative flex h-full w-full flex-col items-center justify-center bg-white"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4 }}
      onClick={onComplete}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onComplete()}
      aria-label="Tap to continue"
    >
      <AnimatePresence>
        {phase !== "logo" && (
          <motion.div
            className="relative flex items-center justify-center gap-3 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="relative h-28 w-28 shrink-0">
              <AnimatedSquare phase={phase} />
              {phase === "complete" && (
                <>
                  <Sparkle x={-8} y={-8} delay={0} />
                  <Sparkle x={90} y={-12} delay={0.2} />
                  <Sparkle x={-12} y={80} delay={0.4} />
                  <Sparkle x={95} y={75} delay={0.3} />
                </>
              )}
            </div>
            <PandaCharacter phase={phase} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <GAStudiosLogo />
      </motion.div>

      <motion.span
        className="absolute bottom-5 right-4 text-xs text-gray-400 sm:bottom-6 sm:right-5 sm:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        v 8.8
      </motion.span>
    </motion.div>
  );
}
