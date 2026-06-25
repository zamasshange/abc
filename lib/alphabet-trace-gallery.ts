/** Trace A–Z uppercase gallery — 26 letters (9 pages × 3 in reference) */

import { UPPERCASE } from "./alphabet";

export const ALPHABET_TRACE_UPPER_CARD_IDS = UPPERCASE.map((letter) => letter.toLowerCase());

export type AlphabetTraceUpperCardId = (typeof ALPHABET_TRACE_UPPER_CARD_IDS)[number];
