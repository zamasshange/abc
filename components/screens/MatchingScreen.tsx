"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ActivityId } from "@/lib/navigation";
import { ExitDialog } from "@/components/modals/ExitDialog";

type MatchingScreenProps = {
  activityId: ActivityId;
  onBack: () => void;
};

type Card = { id: string; emoji: string; pair: string };

const sockCards: Card[] = [
  { id: "s1", emoji: "🧦", pair: "flower" },
  { id: "s2", emoji: "🧦", pair: "flower" },
  { id: "s3", emoji: "🧦", pair: "star" },
  { id: "s4", emoji: "🧦", pair: "star" },
];

const countCards: Card[] = [
  { id: "c1", emoji: "🍎", pair: "1" },
  { id: "c2", emoji: "🍎🍎", pair: "2" },
  { id: "n1", emoji: "1", pair: "1" },
  { id: "n2", emoji: "2", pair: "2" },
];

export function MatchingScreen({ activityId, onBack }: MatchingScreenProps) {
  const isCounting = activityId.includes("counting");
  const cards = isCounting ? countCards : sockCards;
  const [selected, setSelected] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [showExit, setShowExit] = useState(false);

  const onCardTap = (card: Card) => {
    if (matched.has(card.id) || selected.includes(card.id)) return;
    const next = [...selected, card.id];
    if (next.length === 2) {
      const [a, b] = next.map((id) => cards.find((c) => c.id === id)!);
      if (a.pair === b.pair) {
        setMatched((m) => new Set([...m, a.id, b.id]));
      }
      setTimeout(() => setSelected([]), 600);
    } else {
      setSelected(next);
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden" style={{ background: "linear-gradient(180deg,#F5C4A8 0%,#F8BBD0 100%)" }}>
      <div className="flex shrink-0 items-center justify-between px-3 py-2">
        <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={() => setShowExit(true)} className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-[#E91E8C]" aria-label="Back">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none"><path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="3" strokeLinecap="round" /></svg>
        </motion.button>
        <h2 className="text-sm font-extrabold text-white drop-shadow">{isCounting ? "Count & Match" : "Pair the Socks!"}</h2>
        <div className="w-10" />
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center gap-3 px-4">
        {cards.map((card) => {
          const isSel = selected.includes(card.id);
          const isMatch = matched.has(card.id);
          return (
            <motion.button
              key={card.id}
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => onCardTap(card)}
              className="flex aspect-[3/4] w-[20vw] max-w-[120px] min-w-[70px] flex-col items-center justify-center rounded-2xl border-[4px] border-[#9C6ADE] bg-white shadow-lg"
              style={{ opacity: isMatch ? 0.4 : 1, outline: isSel ? "4px solid #FFD54F" : undefined }}
              disabled={isMatch}
            >
              <span className="text-3xl">{card.emoji}</span>
              {!isCounting && <span className="mt-1 text-[10px] text-gray-400">🌸</span>}
            </motion.button>
          );
        })}
      </div>

      <ExitDialog open={showExit} onCancel={() => setShowExit(false)} onConfirm={onBack} />
    </div>
  );
}
