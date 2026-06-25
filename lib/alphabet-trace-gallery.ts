/** Trace A–Z gallery — 26 uppercase + 26 lowercase letter cards */

import { LOWERCASE, UPPERCASE } from "./alphabet";

export const ALPHABET_TRACE_UPPER_CARD_IDS = UPPERCASE.map((letter) => letter.toLowerCase());
export const ALPHABET_TRACE_LOWER_CARD_IDS = LOWERCASE;

export type AlphabetTraceUpperCardId = (typeof ALPHABET_TRACE_UPPER_CARD_IDS)[number];
export type AlphabetTraceLowerCardId = (typeof ALPHABET_TRACE_LOWER_CARD_IDS)[number];
