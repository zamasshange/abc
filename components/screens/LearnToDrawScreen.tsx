"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ActivityId } from "@/lib/navigation";
import { DrawingCanvas } from "@/components/drawing/DrawingCanvas";
import { ExitDialog } from "@/components/modals/ExitDialog";

const steps = [
  { label: "Step 1", shape: "triangle" },
  { label: "Step 2", shape: "ears" },
  { label: "Step 3", shape: "face" },
];

type LearnToDrawScreenProps = {
  activityId: ActivityId;
  onBack: () => void;
};

export function LearnToDrawScreen({ activityId, onBack }: LearnToDrawScreenProps) {
  const [step, setStep] = useState(0);
  const [strokeColor, setStrokeColor] = useState("#F44336");
  const [isEraser, setIsEraser] = useState(false);
  const [clearToken, setClearToken] = useState(0);
  const [showExit, setShowExit] = useState(false);

  const current = steps[step];

  return (
    <div className="relative flex h-full w-full overflow-hidden" style={{ background: "repeating-linear-gradient(0deg,#7CB342,#7CB342 12px,#8BC34A 12px,#8BC34A 24px)" }}>
      <div className="flex w-[12%] min-w-[48px] flex-col items-center justify-evenly py-2" style={{ backgroundColor: "#D32F2F" }}>
        <RoundBtn bg="#E91E8C" label="Back" onClick={() => setShowExit(true)}>
          <path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" />
        </RoundBtn>
        <RoundBtn bg="#FF9800" label="Camera">
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="#fff" />
        </RoundBtn>
        <RoundBtn bg="#9C27B0" label="Eraser" onClick={() => setIsEraser((p) => !p)} active={isEraser}>
          <path d="M16 3l5 5-11 11H5v-5L16 3z" fill="#fff" />
        </RoundBtn>
      </div>

      <div className="relative flex min-w-0 flex-1 flex-col items-center justify-center p-4">
        <div className="relative aspect-square w-[55%] max-w-[320px] rounded-sm bg-white p-3 shadow-lg" style={{ border: "8px solid transparent", borderImage: "repeating-linear-gradient(45deg,#ccc 0 4px,transparent 4px 8px) 8" }}>
          <StepGuide step={step} activityId={activityId} />
          <DrawingCanvas strokeColor={strokeColor} strokeWidth={12} isEraser={isEraser} clearToken={clearToken} />
        </div>
        <p className="mt-3 text-lg font-extrabold text-white drop-shadow">{current.label}</p>
        <div className="mt-2 flex gap-3">
          <motion.button type="button" disabled={step === 0} whileTap={{ scale: 0.9 }} onClick={() => setStep((s) => s - 1)} className="rounded-full bg-white/30 px-4 py-1 text-sm font-bold text-white disabled:opacity-30">Prev</motion.button>
          <motion.button type="button" disabled={step === steps.length - 1} whileTap={{ scale: 0.9 }} onClick={() => { setStep((s) => s + 1); setClearToken((t) => t + 1); }} className="rounded-full bg-white/30 px-4 py-1 text-sm font-bold text-white disabled:opacity-30">Next</motion.button>
        </div>
      </div>

      <div className="flex w-[10%] min-w-[44px] flex-col items-center justify-evenly py-2" style={{ backgroundColor: "#66BB6A" }}>
        {["#42A5F5", "#795548", "#AED581", "#FF9800"].map((c) => (
          <motion.button key={c} type="button" whileTap={{ scale: 0.85 }} onClick={() => { setStrokeColor(c); setIsEraser(false); }} className="h-10 w-10 rounded-full border-[3px] border-white/80" style={{ backgroundColor: c }} aria-label="Color" />
        ))}
        <RoundBtn bg="#555" label="Done" onClick={onBack}>
          <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" />
        </RoundBtn>
      </div>

      <ExitDialog open={showExit} onCancel={() => setShowExit(false)} onConfirm={onBack} />
    </div>
  );
}

function RoundBtn({ bg, children, label, onClick, active }: { bg: string; children: React.ReactNode; label: string; onClick?: () => void; active?: boolean }) {
  return (
    <motion.button type="button" onClick={onClick} whileTap={{ scale: 0.85 }} className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white/80" style={{ backgroundColor: bg, boxShadow: active ? "0 0 0 3px #fff" : undefined }} aria-label={label}>
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>{children}</svg>
    </motion.button>
  );
}

function StepGuide({ step, activityId }: { step: number; activityId: string }) {
  const isMouse = activityId.includes("colors") || activityId.includes("shapes");
  return (
    <svg viewBox="0 0 200 200" className="pointer-events-none absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)]" aria-hidden>
      {step >= 0 && (
        <polygon points="100,40 150,130 50,130" fill="none" stroke="#333" strokeWidth="2.5" strokeDasharray={step > 0 ? undefined : "8 5"} />
      )}
      {step >= 1 && isMouse && (
        <>
          <circle cx="60" cy="55" r="22" fill="none" stroke="#333" strokeWidth="2" strokeDasharray={step > 1 ? undefined : "8 5"} />
          <circle cx="140" cy="55" r="22" fill="none" stroke="#333" strokeWidth="2" strokeDasharray={step > 1 ? undefined : "8 5"} />
        </>
      )}
      {step >= 2 && (
        <>
          <circle cx="80" cy="100" r="5" fill="#333" />
          <circle cx="120" cy="100" r="5" fill="#333" />
          <polygon points="100,115 92,125 108,125" fill="#333" />
        </>
      )}
    </svg>
  );
}
