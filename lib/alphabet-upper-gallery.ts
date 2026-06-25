/** Uppercase gallery — 26 letter + picture + practice row cards */

import { UPPERCASE } from "./alphabet";

export const ALPHABET_UPPER_CARD_IDS = UPPERCASE.map((letter) => letter.toLowerCase());

export type AlphabetUpperCardId = (typeof ALPHABET_UPPER_CARD_IDS)[number];

/** Object keyword per letter (for art lookup) */
export const UPPER_LETTER_OBJECTS: Record<string, string> = {
  a: "apple",
  b: "ball",
  c: "car",
  d: "dog",
  e: "elephant",
  f: "fox",
  g: "goat",
  h: "hat",
  i: "igloo",
  j: "jester",
  k: "kangaroo",
  l: "lion",
  m: "mouse",
  n: "nest",
  o: "owl",
  p: "pig",
  q: "queen",
  r: "rabbit",
  s: "sun",
  t: "train",
  u: "umbrella",
  v: "violin",
  w: "whale",
  x: "xylophone",
  y: "yak",
  z: "zebra",
};
