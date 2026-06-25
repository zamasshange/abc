/** Alphabets Match — letter to starting-sound picture */

import { UPPERCASE } from "./alphabet";

export type AlphaMatchPicture = {
  pictureId: string;
  letter: string;
};

export type AlphaMatchRound = {
  letters: string[];
  pictures: AlphaMatchPicture[];
};

/** Picture id per letter (reference + random rounds) */
export const ALPHA_MATCH_BY_LETTER: Record<string, string> = {
  A: "apple",
  B: "ball",
  C: "cat",
  D: "dog",
  E: "egg",
  F: "flag",
  G: "grapes",
  H: "hat",
  I: "igloo",
  J: "juice",
  K: "kite",
  L: "lion",
  M: "moon",
  N: "nest",
  O: "orange",
  P: "penguin",
  Q: "queen",
  R: "rainbow",
  S: "sun",
  T: "tree",
  U: "umbrella",
  V: "violin",
  W: "whale",
  X: "xylophone",
  Y: "yacht",
  Z: "zebra",
};

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function countAligned(letters: string[], pictures: AlphaMatchPicture[]) {
  return letters.filter((l, i) => l === pictures[i]?.letter).length;
}

export const ALPHA_MATCH_DEMO_ROUND: AlphaMatchRound = {
  letters: ["A", "R", "F"],
  pictures: [
    { pictureId: "rainbow", letter: "R" },
    { pictureId: "apple", letter: "A" },
    { pictureId: "flag", letter: "F" },
  ],
};

export function createAlphaMatchRound(): AlphaMatchRound {
  const letters = shuffle(UPPERCASE).slice(0, 3);
  let pictures: AlphaMatchPicture[] = shuffle(
    letters.map((letter) => ({
      letter,
      pictureId: ALPHA_MATCH_BY_LETTER[letter],
    })),
  );
  let attempts = 0;
  while (countAligned(letters, pictures) > 0 && attempts < 12) {
    pictures = shuffle(pictures);
    attempts++;
  }
  return { letters, pictures };
}

export function createAlphaMatchRoundForIndex(roundIndex: number): AlphaMatchRound {
  if (roundIndex === 0) return ALPHA_MATCH_DEMO_ROUND;
  return createAlphaMatchRound();
}
