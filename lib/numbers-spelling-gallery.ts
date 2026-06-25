/** Numbers Spelling gallery — digits 1–20 with word tracing (7 scroll pages × 3 cards) */

export type SpellingCard = {
  id: string;
  number: number;
  locked: boolean;
};

export const NUMBERS_SPELLING_CARDS: SpellingCard[] = [
  { id: "1", number: 1, locked: false },
  { id: "2", number: 2, locked: false },
  { id: "3", number: 3, locked: false },
  { id: "4", number: 4, locked: false },
  { id: "5", number: 5, locked: false },
  { id: "6", number: 6, locked: false },
  { id: "7", number: 7, locked: false },
  { id: "8", number: 8, locked: false },
  { id: "9", number: 9, locked: false },
  { id: "10", number: 10, locked: false },
  { id: "11", number: 11, locked: true },
  { id: "12", number: 12, locked: true },
  { id: "13", number: 13, locked: true },
  { id: "14", number: 14, locked: true },
  { id: "15", number: 15, locked: true },
  { id: "16", number: 16, locked: true },
  { id: "17", number: 17, locked: true },
  { id: "18", number: 18, locked: true },
  { id: "19", number: 19, locked: true },
  { id: "20", number: 20, locked: true },
];

export const NUMBERS_SPELLING_CARD_IDS = NUMBERS_SPELLING_CARDS.map((c) => c.id);

export function getSpellingCard(id: string) {
  return NUMBERS_SPELLING_CARDS.find((c) => c.id === id);
}
