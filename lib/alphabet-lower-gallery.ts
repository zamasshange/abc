/** Lowercase gallery — 26 letter + picture + practice row cards */

import { LOWERCASE } from "./alphabet";

export const ALPHABET_LOWER_CARD_IDS = LOWERCASE;

export type AlphabetLowerCardId = (typeof ALPHABET_LOWER_CARD_IDS)[number];
