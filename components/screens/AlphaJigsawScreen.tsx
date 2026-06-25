"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GameIconButton } from "@/components/game";
import { BackIcon } from "@/components/game/GameIcons";
import { JigsawPieceSvg, PointingHand } from "@/components/illustrations/AlphaJigsawArt";
import { ExitDialog } from "@/components/modals/ExitDialog";
import { RewardOverlay } from "@/components/learning/RewardOverlay";
import { getJigsawLetterForRound, getLetterJigsaw, HINT_PIECE_ID } from "@/lib/alpha-jigsaw";
import { playSuccessSound, playTapSound, speakLetter } from "@/lib/audio";
import { markComplete } from "@/lib/progress";

type PiecePos = { x: number; y: number };

const SNAP_PX = 52;
const PIECE_PX = 150;

export function AlphaJigsawScreen({ onBack }: { onBack: () => void }) {
  const [roundIndex, setRoundIndex] = useState(0);
  const letter = getJigsawLetterForRound(roundIndex);
  const puzzle = getLetterJigsaw(letter);
  const boardRef = useRef<HTMLDivElement>(null);
  const [placed, setPlaced] = useState<Set<string>>(new Set());
  const [positions, setPositions] = useState<Record<string, PiecePos>>(() => initPositions(puzzle));
  const [showExit, setShowExit] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [completedOnce, setCompletedOnce] = useState(false);

  const resetRound = useCallback((index: number) => {
    const next = getLetterJigsaw(getJigsawLetterForRound(index));
    setPlaced(new Set());
    setPositions(initPositions(next));
  }, []);

  const onAllPlaced = useCallback(() => {
    playSuccessSound();
    speakLetter(letter);
    if (!completedOnce) {
      markComplete("lettersUpper", "alpha-jigsaw");
      setCompletedOnce(true);
    }
    setTimeout(() => setShowReward(true), 500);
  }, [completedOnce, letter]);

  const trySnap = (pieceId: string, x: number, y: number) => {
    const dist = Math.hypot(x, y);
    if (dist <= SNAP_PX) {
      setPositions((prev) => ({ ...prev, [pieceId]: { x: 0, y: 0 } }));
      setPlaced((prev) => {
        const next = new Set(prev).add(pieceId);
        if (next.size === puzzle.pieces.length) {
          onAllPlaced();
        }
        return next;
      });
      return true;
    }
    setPositions((prev) => ({ ...prev, [pieceId]: { x, y } }));
    return false;
  };

  const hintPiece = puzzle.pieces.find((p) => p.id === HINT_PIECE_ID && !placed.has(p.id));

  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <div className="flex shrink-0 px-3 py-2">
        <GameIconButton color="pink" size="sm" label="Back" onClick={() => setShowExit(true)} icon={<BackIcon />} />
      </div>

      <div ref={boardRef} className="relative min-h-0 flex-1">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative" style={{ width: PIECE_PX, height: PIECE_PX }}>
            {puzzle.pieces.map((piece) => (
              <div key={`ghost-${piece.id}`} className="pointer-events-none absolute inset-0">
                <JigsawPieceSvg piece={piece} letter={letter} mode="ghost" size={PIECE_PX} />
              </div>
            ))}
          </div>
        </div>

        {puzzle.pieces.map((piece) => {
          const isPlaced = placed.has(piece.id);
          const pos = positions[piece.id] ?? { x: 0, y: 0 };
          return (
            <motion.div
              key={piece.id}
              className="absolute touch-none"
              style={{
                width: PIECE_PX,
                height: PIECE_PX,
                left: "50%",
                top: "50%",
                marginLeft: -PIECE_PX / 2,
                marginTop: -PIECE_PX / 2,
                zIndex: isPlaced ? 1 : 10,
              }}
              drag={!isPlaced}
              dragMomentum={false}
              dragElastic={0.08}
              animate={{ x: pos.x, y: pos.y }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              onDragStart={() => playTapSound()}
              onDragEnd={(_, info) => {
                if (isPlaced) return;
                const baseX = positions[piece.id]?.x ?? 0;
                const baseY = positions[piece.id]?.y ?? 0;
                trySnap(piece.id, baseX + info.offset.x, baseY + info.offset.y);
              }}
            >
              <JigsawPieceSvg piece={piece} letter={letter} mode="filled" size={PIECE_PX} />
            </motion.div>
          );
        })}

        {hintPiece && (
          <motion.div
            className="pointer-events-none absolute z-20"
            style={{
              left: "50%",
              top: "50%",
              width: 56,
              height: 64,
              marginLeft: -PIECE_PX / 2 + positions[hintPiece.id].x + 36,
              marginTop: -PIECE_PX / 2 + positions[hintPiece.id].y + 28,
            }}
            animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          >
            <PointingHand className="h-14 w-12 drop-shadow-md" />
          </motion.div>
        )}
      </div>

      <RewardOverlay
        open={showReward}
        emoji="🧩"
        onDone={() => {
          setShowReward(false);
          const next = roundIndex + 1;
          setRoundIndex(next);
          resetRound(next);
        }}
      />
      <ExitDialog open={showExit} onCancel={() => setShowExit(false)} onConfirm={onBack} />
    </div>
  );
}

function initPositions(puzzle: ReturnType<typeof getLetterJigsaw>): Record<string, PiecePos> {
  const out: Record<string, PiecePos> = {};
  for (const piece of puzzle.pieces) {
    out[piece.id] = {
      x: piece.scatterX * 320,
      y: piece.scatterY * 260,
    };
  }
  return out;
}
