"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GameIconButton } from "@/components/game";
import { BackIcon } from "@/components/game/GameIcons";
import { ExitDialog } from "@/components/modals/ExitDialog";
import { RewardOverlay } from "@/components/learning/RewardOverlay";
import { playSuccessSound, playTapSound, speakLetter } from "@/lib/audio";
import { createLetterMatchRoundForIndex } from "@/lib/letter-match";
import { markComplete } from "@/lib/progress";

type Side = "upper" | "lower";

type Selection = { side: Side; letter: string };

type MatchLine = { upper: string; from: { x: number; y: number }; to: { x: number; y: number } };

export function LetterMatchScreen({ onBack }: { onBack: () => void }) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [round, setRound] = useState(() => createLetterMatchRoundForIndex(0));
  const [selected, setSelected] = useState<Selection | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [lines, setLines] = useState<MatchLine[]>([]);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [completedOnce, setCompletedOnce] = useState(false);

  const boardRef = useRef<HTMLDivElement>(null);
  const upperRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const lowerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const resetRound = useCallback((index: number) => {
    setRound(createLetterMatchRoundForIndex(index));
    setSelected(null);
    setMatched(new Set());
    setLines([]);
    setWrongFlash(false);
  }, []);

  const getCenter = useCallback((el: HTMLButtonElement | null) => {
    const board = boardRef.current;
    if (!el || !board) return null;
    const boardRect = board.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - boardRect.left,
      y: rect.top + rect.height / 2 - boardRect.top,
    };
  }, []);

  const advanceRound = useCallback(() => {
    const next = roundIndex + 1;
    setRoundIndex(next);
    resetRound(next);
  }, [roundIndex, resetRound]);

  const onRoundComplete = useCallback(() => {
    playSuccessSound();
    if (!completedOnce) {
      markComplete("lettersUpper", "letter-match");
      setCompletedOnce(true);
    }
    setTimeout(() => {
      if (roundIndex >= 2) {
        setShowReward(true);
      } else {
        advanceRound();
      }
    }, 700);
  }, [advanceRound, completedOnce, roundIndex]);

  const tryMatch = useCallback(
    (first: Selection, second: Selection) => {
      const upperLetter = first.side === "upper" ? first.letter : second.letter;
      const lowerLetter = first.side === "lower" ? first.letter : second.letter;
      if (upperLetter.toLowerCase() !== lowerLetter.toLowerCase()) {
        setWrongFlash(true);
        setTimeout(() => {
          setWrongFlash(false);
          setSelected(null);
        }, 450);
        return;
      }

      const upperEl = upperRefs.current[upperLetter];
      const lowerEl = lowerRefs.current[lowerLetter];
      const from = getCenter(upperEl);
      const to = getCenter(lowerEl);
      if (from && to) {
        setLines((prev) => [...prev, { upper: upperLetter, from, to }]);
      }
      setMatched((prev) => new Set(prev).add(upperLetter));
      setSelected(null);
      speakLetter(upperLetter);

      if (matched.size + 1 >= round.upper.length) {
        onRoundComplete();
      }
    },
    [getCenter, matched.size, onRoundComplete, round.upper.length],
  );

  const onLetterTap = (side: Side, letter: string) => {
    if (matched.has(side === "upper" ? letter : letter.toUpperCase())) return;

    playTapSound();
    if (side === "upper") speakLetter(letter);

    if (!selected) {
      setSelected({ side, letter });
      return;
    }

    if (selected.side === side) {
      setSelected({ side, letter });
      return;
    }

    tryMatch(selected, { side, letter });
  };

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setLines((prev) =>
        prev.map((line) => {
          const from = getCenter(upperRefs.current[line.upper]);
          const lower = line.upper.toLowerCase();
          const to = getCenter(lowerRefs.current[lower]);
          if (!from || !to) return line;
          return { ...line, from, to };
        }),
      );
    });
    return () => cancelAnimationFrame(id);
  }, [getCenter, matched, round]);

  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <div className="flex shrink-0 px-3 py-2">
        <GameIconButton color="pink" size="sm" label="Back" onClick={() => setShowExit(true)} icon={<BackIcon />} />
      </div>

      <div ref={boardRef} className="relative min-h-0 flex-1">
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
          {lines.map((line) => (
            <line
              key={line.upper}
              x1={line.from.x}
              y1={line.from.y}
              x2={line.to.x}
              y2={line.to.y}
              stroke="#1a1a1a"
              strokeWidth="2.5"
              strokeDasharray="7 5"
              strokeLinecap="round"
            />
          ))}
        </svg>

        <div className="flex h-full items-center justify-between px-[14%]">
          <div className="flex flex-col items-center gap-[clamp(28px,10vh,72px)]">
            {round.upper.map((letter) => {
              const isMatched = matched.has(letter);
              const isSelected = selected?.side === "upper" && selected.letter === letter;
              return (
                <motion.button
                  key={letter}
                  ref={(el) => {
                    upperRefs.current[letter] = el;
                  }}
                  type="button"
                  whileTap={isMatched ? undefined : { scale: 0.94 }}
                  onClick={() => onLetterTap("upper", letter)}
                  disabled={isMatched}
                  className={`select-none text-[clamp(3.2rem,14vw,5.75rem)] font-extrabold leading-none text-black ${
                    isMatched ? "opacity-35" : ""
                  } ${isSelected ? "rounded-2xl ring-4 ring-[#FFD54F]" : ""}`}
                  aria-label={`Uppercase ${letter}`}
                >
                  {letter}
                </motion.button>
              );
            })}
          </div>

          <motion.div
            animate={wrongFlash ? { x: [0, -10, 10, -8, 8, 0] } : { x: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-[clamp(28px,10vh,72px)]"
          >
            {round.lower.map((letter) => {
              const upperKey = letter.toUpperCase();
              const isMatched = matched.has(upperKey);
              const isSelected = selected?.side === "lower" && selected.letter === letter;
              return (
                <motion.button
                  key={letter}
                  ref={(el) => {
                    lowerRefs.current[letter] = el;
                  }}
                  type="button"
                  whileTap={isMatched ? undefined : { scale: 0.94 }}
                  onClick={() => onLetterTap("lower", letter)}
                  disabled={isMatched}
                  className={`select-none text-[clamp(3.2rem,14vw,5.75rem)] font-extrabold leading-none text-black ${
                    isMatched ? "opacity-35" : ""
                  } ${isSelected ? "rounded-2xl ring-4 ring-[#FFD54F]" : ""}`}
                  aria-label={`Lowercase ${letter}`}
                >
                  {letter}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>

      <RewardOverlay
        open={showReward}
        emoji="⭐"
        onDone={() => {
          setShowReward(false);
          advanceRound();
        }}
      />
      <ExitDialog open={showExit} onCancel={() => setShowExit(false)} onConfirm={onBack} />
    </div>
  );
}
