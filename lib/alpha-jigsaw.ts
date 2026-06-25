/** Alphabets Jigsaw — letter puzzles (4 pieces per letter) */

import { UPPERCASE } from "./alphabet";

export type JigsawPieceDef = {
  id: string;
  /** SVG path for jigsaw region (local 0–300 space) */
  region: string;
  scatterX: number;
  scatterY: number;
};

export type LetterJigsawDef = {
  letter: string;
  pieces: JigsawPieceDef[];
};

/** Classic 2×2 jigsaw split with tabs — fits a centered letter */
const JIGSAW_REGIONS: Omit<JigsawPieceDef, "scatterX" | "scatterY">[] = [
  {
    id: "tl",
    region:
      "M 20 20 L 155 20 L 155 95 Q 175 110 155 125 L 155 145 L 20 145 Z",
  },
  {
    id: "tr",
    region:
      "M 145 20 L 280 20 L 280 145 L 145 145 L 145 125 Q 125 110 145 95 L 145 20 Z",
  },
  {
    id: "bl",
    region:
      "M 20 155 L 145 155 L 145 175 Q 165 190 145 205 L 145 280 L 20 280 Z",
  },
  {
    id: "br",
    region:
      "M 155 155 L 280 155 L 280 280 L 155 280 L 155 205 Q 135 190 155 175 L 155 155 Z",
  },
];

const SCATTER: Record<string, { x: number; y: number }> = {
  tl: { x: -0.22, y: -0.18 },
  tr: { x: 0.22, y: -0.12 },
  bl: { x: -0.2, y: 0.2 },
  br: { x: 0.24, y: 0.18 },
};

export function getLetterJigsaw(letter: string): LetterJigsawDef {
  return {
    letter: letter.toUpperCase(),
    pieces: JIGSAW_REGIONS.map((p) => ({
      ...p,
      scatterX: SCATTER[p.id].x,
      scatterY: SCATTER[p.id].y,
    })),
  };
}

export function getJigsawLetterForRound(roundIndex: number): string {
  return UPPERCASE[roundIndex % UPPERCASE.length];
}

/** First unsolved piece gets the pointing-hand hint */
export const HINT_PIECE_ID = "tl";
