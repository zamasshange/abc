"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AvatarId } from "@/lib/my-world";
import { AVATARS, ACHIEVEMENTS, getDailyChallengeForDate } from "@/lib/my-world";
import {
  loadProgress,
  setAvatar,
  openRewardChest,
  getCategoryPercent,
  getChestsReady,
  subscribeProgress,
  type ProgressState,
} from "@/lib/progress";
import { playTapSound, playCheerSound, speak } from "@/lib/audio";
import { AvatarCircle } from "@/components/myworld/AvatarCircle";
import { ParentDashboard } from "@/components/screens/ParentDashboard";

type MyWorldScreenProps = {
  onBack: () => void;
};

const PROGRESS_COLORS: Record<string, string> = {
  Alphabets: "#33D6F5",
  Numbers: "#FFCC00",
  Shapes: "#FF8080",
  Colors: "#BA68C8",
  Lines: "#B8E050",
  Mazes: "#33CC99",
};

function AnimatedStars({ count }: { count: number }) {
  const [display, setDisplay] = useState(count);
  useEffect(() => {
    const start = display;
    const diff = count - start;
    if (diff === 0) return;
    const steps = Math.min(Math.abs(diff), 20);
    let step = 0;
    const id = setInterval(() => {
      step += 1;
      setDisplay(Math.round(start + (diff * step) / steps));
      if (step >= steps) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [count, display]);

  return (
    <motion.div
      className="flex items-center gap-2"
      key={count}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 0.4 }}
    >
      <span className="text-4xl">⭐</span>
      <span className="text-3xl font-extrabold text-[#FF9800]">{display}</span>
    </motion.div>
  );
}

function ChestModal({ reward, emoji, onClose }: { reward: string; emoji: string; onClose: () => void }) {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute text-xl"
          style={{ left: `${(i * 13) % 90}%`, top: "10%" }}
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 200, opacity: 0, rotate: 360 }}
          transition={{ duration: 1.2, delay: i * 0.04 }}
        >
          ✨
        </motion.span>
      ))}
      <motion.div
        className="flex flex-col items-center rounded-3xl border-[5px] border-[#FFD54F] bg-white px-12 py-8 shadow-2xl"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.span
          className="text-7xl"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.8, repeat: 2 }}
        >
          {emoji}
        </motion.span>
        <p className="mt-4 text-xl font-extrabold text-[#E91E63]">{reward}</p>
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={onClose}
          className="mt-4 rounded-full bg-[#4CAF50] px-8 py-2 text-sm font-extrabold text-white shadow"
        >
          Yay!
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export function MyWorldScreen({ onBack }: MyWorldScreenProps) {
  const [state, setState] = useState<ProgressState>(() => loadProgress());
  const [chestReward, setChestReward] = useState<{ reward: string; emoji: string } | null>(null);
  const [parentOpen, setParentOpen] = useState(false);

  const refresh = useCallback(() => setState(loadProgress()), []);

  useEffect(() => subscribeProgress(refresh), [refresh]);

  const daily = getDailyChallengeForDate(state.dailyChallengeDate || new Date().toISOString().slice(0, 10));
  const chestsReady = getChestsReady(state);

  const pickAvatar = (id: AvatarId) => {
    if (!state.unlockedAvatars.includes(id)) return;
    playTapSound();
    setState(setAvatar(id));
    speak(`Hi friend!`);
  };

  const openChest = () => {
    if (chestsReady <= 0) return;
    playTapSound();
    const result = openRewardChest();
    if (result) {
      playCheerSound();
      setState(result.state);
      setChestReward({ reward: result.reward, emoji: result.emoji });
    }
  };

  const progressRows = [
    { label: "Alphabets", key: "alphabets" as const },
    { label: "Numbers", key: "numbers" as const },
    { label: "Shapes", key: "shapes" as const },
    { label: "Colors", key: "colors" as const },
    { label: "Lines", key: "lines" as const },
    { label: "Mazes", key: "mazes" as const },
  ];

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden"
      style={{ background: "linear-gradient(165deg, #E1BEE7 0%, #B3E5FC 40%, #FFF9C4 100%)" }}
    >
      <div className="flex shrink-0 items-center justify-between px-3 py-2">
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => { playTapSound(); onBack(); }}
          className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-[#9C6ADE] shadow"
          aria-label="Back"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </motion.button>
        <h1 className="text-lg font-extrabold text-[#7B1FA2] drop-shadow-sm">My World</h1>
        <button
          type="button"
          onClick={() => setParentOpen(true)}
          className="text-[10px] font-bold text-[#9C6ADE] underline"
        >
          Parents
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden px-3 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex h-full min-w-min gap-3">
          {/* Avatar */}
          <section className="flex w-[200px] shrink-0 flex-col rounded-2xl border-[4px] border-white bg-white/80 p-3 shadow-lg">
            <h2 className="mb-2 text-center text-xs font-extrabold text-[#E91E63]">Pick Me!</h2>
            <div className="flex flex-1 flex-col items-center justify-center gap-2">
              <AvatarCircle avatarId={state.avatarId} size="lg" />
              <div className="flex flex-wrap justify-center gap-2">
                {AVATARS.map((a) => (
                  <AvatarCircle
                    key={a.id}
                    avatarId={a.id}
                    size="md"
                    selected={state.avatarId === a.id}
                    locked={!state.unlockedAvatars.includes(a.id)}
                    onClick={() => pickAvatar(a.id)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Stars + Streak */}
          <section className="flex w-[160px] shrink-0 flex-col gap-3">
            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border-[4px] border-[#FFD54F] bg-white/90 p-3 shadow-lg">
              <p className="text-xs font-extrabold text-[#FF9800]">Stars</p>
              <AnimatedStars count={state.totalStars} />
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl border-[4px] border-[#FF7043] bg-white/90 p-3 shadow-lg">
              <span className="text-3xl">🔥</span>
              <p className="text-2xl font-extrabold text-[#E64A19]">{state.streak}</p>
              <p className="text-[10px] font-bold text-gray-500">Day Streak</p>
            </div>
          </section>

          {/* Badges */}
          <section className="flex w-[220px] shrink-0 flex-col rounded-2xl border-[4px] border-white bg-white/80 p-3 shadow-lg">
            <h2 className="mb-2 text-center text-xs font-extrabold text-[#9C6ADE]">Badges</h2>
            <div className="grid flex-1 grid-cols-2 gap-2 content-center">
              {ACHIEVEMENTS.map((b) => {
                const unlocked = state.achievements.includes(b.id);
                return (
                  <div
                    key={b.id}
                    className="flex flex-col items-center rounded-xl border-2 p-2 text-center"
                    style={{
                      borderColor: unlocked ? b.color : "#ddd",
                      backgroundColor: unlocked ? `${b.color}22` : "#f5f5f5",
                      opacity: unlocked ? 1 : 0.45,
                    }}
                  >
                    <span className="text-2xl">{b.emoji}</span>
                    <span className="text-[9px] font-extrabold leading-tight text-gray-700">{b.title}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Progress */}
          <section className="flex w-[200px] shrink-0 flex-col rounded-2xl border-[4px] border-white bg-white/80 p-3 shadow-lg">
            <h2 className="mb-2 text-center text-xs font-extrabold text-[#43A047]">Learning</h2>
            <div className="flex flex-1 flex-col justify-center gap-2">
              {progressRows.map(({ label, key }) => {
                const pct = getCategoryPercent(state, key);
                const color = PROGRESS_COLORS[label];
                return (
                  <div key={key}>
                    <div className="mb-0.5 flex justify-between text-[9px] font-bold text-gray-600">
                      <span>{label}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Daily challenge + Chest */}
          <section className="flex w-[180px] shrink-0 flex-col gap-3">
            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border-[4px] border-[#42A5F5] bg-white/90 p-3 shadow-lg">
              <span className="text-2xl">🎯</span>
              <p className="mt-1 text-center text-[10px] font-extrabold text-[#1565C0]">Today&apos;s Challenge</p>
              <p className="text-center text-xs font-bold text-gray-700">{daily.label}</p>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-[#42A5F5]"
                  style={{
                    width: `${Math.min(100, (state.dailyChallengeProgress / daily.goal) * 100)}%`,
                  }}
                />
              </div>
              <p className="mt-1 text-[10px] font-bold text-gray-500">
                {state.dailyChallengeDone ? "Done! ⭐" : `${state.dailyChallengeProgress}/${daily.goal}`}
              </p>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.94 }}
              onClick={openChest}
              disabled={chestsReady <= 0}
              className="relative flex flex-col items-center rounded-2xl border-[4px] border-[#FFB300] bg-gradient-to-b from-[#FFE082] to-[#FFA000] p-3 shadow-lg disabled:opacity-50"
            >
              {chestsReady > 0 && (
                <motion.span
                  className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#E91E63] text-xs font-bold text-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  {chestsReady}
                </motion.span>
              )}
              <span className="text-4xl">🎁</span>
              <p className="text-[10px] font-extrabold text-white drop-shadow">Reward Chest</p>
              <p className="text-[8px] font-bold text-white/90">Every 20 ⭐</p>
            </motion.button>

            {state.stickers.length > 0 && (
              <div className="rounded-xl border-2 border-dashed border-[#CE93D8] bg-white/70 p-2 text-center">
                <p className="text-[9px] font-bold text-gray-500">Stickers</p>
                <div className="flex flex-wrap justify-center gap-1">
                  {state.stickers.slice(-6).map((s, i) => (
                    <span key={i} className="text-lg">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      <AnimatePresence>
        {chestReward && (
          <ChestModal reward={chestReward.reward} emoji={chestReward.emoji} onClose={() => setChestReward(null)} />
        )}
      </AnimatePresence>

      <ParentDashboard open={parentOpen} onClose={() => setParentOpen(false)} />
    </div>
  );
}
