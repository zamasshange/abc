/** Cursive A–Z galleries — 26 letter cards each; first letter free */

import { LOWERCASE, UPPERCASE } from "./alphabet";

export const ALPHABET_CURSIVE_UPPER_CARDS = UPPERCASE.map((letter, i) => ({
  id: letter.toLowerCase(),
  locked: i !== 0,
}));

export const ALPHABET_CURSIVE_LOWER_CARDS = LOWERCASE.map((letter, i) => ({
  id: letter,
  locked: i !== 0,
}));

export const ALPHABET_CURSIVE_UPPER_CARD_IDS = ALPHABET_CURSIVE_UPPER_CARDS.map((c) => c.id);
export const ALPHABET_CURSIVE_LOWER_CARD_IDS = ALPHABET_CURSIVE_LOWER_CARDS.map((c) => c.id);
