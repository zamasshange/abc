"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ActivityId } from "@/lib/navigation";
import { playTapSound, playSuccessSound, speak } from "@/lib/audio";
import { markComplete } from "@/lib/progress";
import { RewardOverlay } from "@/components/learning/RewardOverlay";
import { ExitDialog } from "@/components/modals/ExitDialog";

type Card = { id: string; emoji: string; pair: string };

function getCards(activityId: ActivityId): { title: string; cards: Card[]; category: "colors" | "numbers" | "alphabets" } {
  if (activityId.includes("counting") || activityId.includes("num-match")) {
    return {
      title: "Count & Match",
      category: "numbers",
      cards: [
        { id: "c1", emoji: "🍎", pair: "1" },
        { id: "c2", emoji: "🍎🍎", pair: "2" },
        { id: "n1", emoji: "1", pair: "1" },
        { id: "n2", emoji: "2", pair: "2" },
      ],
    };
  }
  if (activityId.includes("alpha")) {
    return {
      title: "Letter Match",
      category: "alphabets",
      cards: [
        { id: "a1", emoji: "A", pair: "apple" },
        { id: "a2", emoji: "🍎", pair: "apple" },
        { id: "b1", emoji: "B", pair: "ball" },
        { id: "b2", emoji: "⚽", pair: "ball" },
      ],
    };
  }
  if (activityId.includes("pattern") || activityId.includes("pair")) {
    return {
      title: "Pattern Match",
      category: "colors",
      cards: [
        { id: "r1", emoji: "🔴", pair: "1" },
        { id: "b1", emoji: "🔵", pair: "2" },
        { id: "r2", emoji: "🔴", pair: "1" },
        { id: "b2", emoji: "🔵", pair: "2" },
      ],
    };
  }
  return {
    title: "Pair the Socks!",
    category: "colors",
    cards: [
      { id: "s1", emoji: "🧦", pair: "a" },
      { id: "s2", emoji: "🧦", pair: "a" },
      { id: "s3", emoji: "🧦", pair: "b" },
      { id: "s4", emoji: "🧦", pair: "b" },
    ],
  };
}

export function MatchingScreen({ activityId, onBack }: { activityId: ActivityId; onBack: () => void }) {
  const { title, cards, category } = getCards(activityId);
  const [selected, setSelected] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [showExit, setShowExit] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const onTap = (card: Card) => {
    if (matched.has(card.id) || selected.includes(card.id)) return;
    playTapSound();
    const next = [...selected, card.id];
    if (next.length === 2) {
      const [a, b] = next.map((id) => cards.find((c) => c.id === id)!);
      if (a.pair === b.pair) {
        const newMatched = new Set([...matched, a.id, b.id]);
        setMatched(newMatched);
        speak("Great match!");
        if (newMatched.size === cards.length) {
          playSuccessSound();
          if (category === "numbers") markComplete("numbers", activityId);
          else if (category === "alphabets") markComplete("lettersUpper", activityId);
          else markComplete("colors", activityId);
          setTimeout(() => setShowReward(true), 500);
        }
      }
      setTimeout(() => setSelected([]), 600);
    } else setSelected(next);
  };

  return (
    <div className="relative flex h-full w-full flex-col" style={{ background: "linear-gradient(180deg,#F5C4A8 0%,#F8BBD0 100%)" }}>
      <div className="flex shrink-0 items-center justify-between px-3 py-2">
        <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={() => setShowExit(true)} className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-[#E91E8C]" aria-label="Back">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none"><path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="3" strokeLinecap="round" /></svg>
        </motion.button>
        <h2 className="text-sm font-extrabold text-white drop-shadow">{title}</h2>
        <div className="w-10" />
      </div>
      <div className="flex flex-1 items-center justify-center gap-3 px-4">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => onTap(card)}
            className="flex aspect-[3/4] w-[20vw] max-w-[120px] min-w-[70px] flex-col items-center justify-center rounded-2xl border-[4px] border-[#9C6ADE] bg-white shadow-lg"
            style={{ opacity: matched.has(card.id) ? 0.4 : 1, outline: selected.includes(card.id) ? "4px solid #FFD54F" : undefined }}
            disabled={matched.has(card.id)}
          >
            <span className="text-3xl">{card.emoji}</span>
          </motion.button>
        ))}
      </div>
      <RewardOverlay open={showReward} emoji="🎉" onDone={() => { setShowReward(false); onBack(); }} />
      <ExitDialog open={showExit} onCancel={() => setShowExit(false)} onConfirm={onBack} />
    </div>
  );
}
