/** Letter Match — pick 3 uppercase/lowercase pairs per round */

import { UPPERCASE } from "./alphabet";

export type LetterMatchRound = {
  upper: string[];
  lower: string[];
};

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function countAligned(upper: string[], lower: string[]) {
  return upper.filter((u, i) => u.toLowerCase() === lower[i]).length;
}

/** Three random uppercase letters; lowercase column shuffled (not aligned). */
export function createLetterMatchRound(): LetterMatchRound {
  const upper = shuffle(UPPERCASE).slice(0, 3);
  let lower = shuffle(upper.map((l) => l.toLowerCase()));
  let attempts = 0;
  while (countAligned(upper, lower) > 0 && attempts < 12) {
    lower = shuffle(lower);
    attempts++;
  }
  return { upper, lower };
}

/** Fixed first round from reference screenshot */
export const LETTER_MATCH_DEMO_ROUND: LetterMatchRound = {
  upper: ["H", "J", "B"],
  lower: ["j", "b", "h"],
};

export function createLetterMatchRoundForIndex(roundIndex: number): LetterMatchRound {
  if (roundIndex === 0) return LETTER_MATCH_DEMO_ROUND;
  return createLetterMatchRound();
}
