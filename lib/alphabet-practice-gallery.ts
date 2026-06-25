/** Alphabets Practice gallery — 26 cards, upper + lower rows per letter */

import { UPPERCASE } from "./alphabet";

export const ALPHABET_PRACTICE_CARD_IDS = UPPERCASE.map((letter) => letter.toLowerCase());

export type AlphabetPracticeCardId = (typeof ALPHABET_PRACTICE_CARD_IDS)[number];
