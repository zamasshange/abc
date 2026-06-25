"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GameIconButton } from "@/components/game";
import { BackIcon } from "@/components/game/GameIcons";
import { MatchPictureIcon } from "@/components/illustrations/AlphaMatchArt";
import { ExitDialog } from "@/components/modals/ExitDialog";
import { RewardOverlay } from "@/components/learning/RewardOverlay";
import { createAlphaMatchRoundForIndex } from "@/lib/alpha-match";
import { playSuccessSound, playTapSound, speakLetter } from "@/lib/audio";
import { markComplete } from "@/lib/progress";

type Side = "letter" | "picture";

type Selection =
  | { side: "letter"; letter: string }
  | { side: "picture"; pictureId: string; letter: string };

type MatchLine = { letter: string; from: { x: number; y: number }; to: { x: number; y: number } };

export function AlphaMatchScreen({ onBack }: { onBack: () => void }) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [round, setRound] = useState(() => createAlphaMatchRoundForIndex(0));
  const [selected, setSelected] = useState<Selection | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [lines, setLines] = useState<MatchLine[]>([]);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [completedOnce, setCompletedOnce] = useState(false);

  const boardRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const pictureRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const resetRound = useCallback((index: number) => {
    setRound(createAlphaMatchRoundForIndex(index));
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
      markComplete("lettersUpper", "alpha-match");
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
      const letter = first.side === "letter" ? first.letter : second.letter;
      const pictureLetter = first.side === "picture" ? first.letter : second.letter;
      if (letter !== pictureLetter) {
        setWrongFlash(true);
        setTimeout(() => {
          setWrongFlash(false);
          setSelected(null);
        }, 450);
        return;
      }

      const pictureId =
        first.side === "picture" ? first.pictureId : (second as { pictureId: string }).pictureId;
      const from = getCenter(letterRefs.current[letter]);
      const to = getCenter(pictureRefs.current[pictureId]);
      if (from && to) {
        setLines((prev) => [...prev, { letter, from, to }]);
      }
      setMatched((prev) => new Set(prev).add(letter));
      setSelected(null);
      speakLetter(letter);

      if (matched.size + 1 >= round.letters.length) {
        onRoundComplete();
      }
    },
    [getCenter, matched.size, onRoundComplete, round.letters.length],
  );

  const onLetterTap = (letter: string) => {
    if (matched.has(letter)) return;
    playTapSound();
    speakLetter(letter);

    if (!selected) {
      setSelected({ side: "letter", letter });
      return;
    }
    if (selected.side === "letter") {
      setSelected({ side: "letter", letter });
      return;
    }
    tryMatch(selected, { side: "letter", letter });
  };

  const onPictureTap = (pictureId: string, letter: string) => {
    if (matched.has(letter)) return;
    playTapSound();

    if (!selected) {
      setSelected({ side: "picture", pictureId, letter });
      return;
    }
    if (selected.side === "picture") {
      setSelected({ side: "picture", pictureId, letter });
      return;
    }
    tryMatch(selected, { side: "picture", pictureId, letter });
  };

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setLines((prev) =>
        prev.map((line) => {
          const from = getCenter(letterRefs.current[line.letter]);
          const pic = round.pictures.find((p) => p.letter === line.letter);
          const to = pic ? getCenter(pictureRefs.current[pic.pictureId]) : null;
          if (!from || !to) return line;
          return { ...line, from, to };
        }),
      );
    });
    return () => cancelAnimationFrame(id);
  }, [getCenter, matched, round]);

  const iconSize = "clamp(4.5rem, 18vw, 7rem)";

  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <div className="flex shrink-0 px-3 py-2">
        <GameIconButton color="pink" size="sm" label="Back" onClick={() => setShowExit(true)} icon={<BackIcon />} />
      </div>

      <div ref={boardRef} className="relative min-h-0 flex-1">
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
          {lines.map((line) => (
            <line
              key={line.letter}
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

        <div className="flex h-full items-center justify-between px-[12%]">
          <div className="flex flex-col items-center gap-[clamp(28px,10vh,72px)]">
            {round.letters.map((letter) => {
              const isMatched = matched.has(letter);
              const isSelected = selected?.side === "letter" && selected.letter === letter;
              return (
                <motion.button
                  key={letter}
                  ref={(el) => {
                    letterRefs.current[letter] = el;
                  }}
                  type="button"
                  whileTap={isMatched ? undefined : { scale: 0.94 }}
                  onClick={() => onLetterTap(letter)}
                  disabled={isMatched}
                  className={`select-none text-[clamp(3.2rem,14vw,5.75rem)] font-extrabold leading-none text-black ${
                    isMatched ? "opacity-35" : ""
                  } ${isSelected ? "rounded-2xl ring-4 ring-[#FFD54F]" : ""}`}
                  aria-label={`Letter ${letter}`}
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
            {round.pictures.map(({ pictureId, letter }) => {
              const isMatched = matched.has(letter);
              const isSelected = selected?.side === "picture" && selected.pictureId === pictureId;
              return (
                <motion.button
                  key={pictureId}
                  ref={(el) => {
                    pictureRefs.current[pictureId] = el;
                  }}
                  type="button"
                  whileTap={isMatched ? undefined : { scale: 0.94 }}
                  onClick={() => onPictureTap(pictureId, letter)}
                  disabled={isMatched}
                  className={`flex items-center justify-center ${isMatched ? "opacity-35" : ""} ${
                    isSelected ? "rounded-2xl ring-4 ring-[#FFD54F]" : ""
                  }`}
                  style={{ width: iconSize, height: iconSize }}
                  aria-label={`Picture for letter ${letter}`}
                >
                  <MatchPictureIcon id={pictureId} size={96} />
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
