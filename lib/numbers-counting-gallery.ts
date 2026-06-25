/** Numbers Counting gallery — digits 1–20 with object grids (7 scroll pages × 3 cards) */

export type CountingObject =
  | "apple"
  | "cherry"
  | "gingerbread"
  | "donut"
  | "candy"
  | "icecream"
  | "girl"
  | "duck"
  | "egg"
  | "leaf"
  | "chocolate"
  | "cupcake"
  | "bear"
  | "rocket"
  | "dinosaur"
  | "popsicle"
  | "pie"
  | "candycane"
  | "pretzel"
  | "lollipop";

export type CountingCard = {
  id: string;
  count: number;
  object: CountingObject;
  locked: boolean;
};

export const NUMBERS_COUNTING_CARDS: CountingCard[] = [
  { id: "1", count: 1, object: "apple", locked: false },
  { id: "2", count: 2, object: "cherry", locked: false },
  { id: "3", count: 3, object: "gingerbread", locked: false },
  { id: "4", count: 4, object: "donut", locked: false },
  { id: "5", count: 5, object: "candy", locked: false },
  { id: "6", count: 6, object: "icecream", locked: false },
  { id: "7", count: 7, object: "girl", locked: false },
  { id: "8", count: 8, object: "duck", locked: false },
  { id: "9", count: 9, object: "egg", locked: false },
  { id: "10", count: 10, object: "leaf", locked: false },
  { id: "11", count: 11, object: "chocolate", locked: true },
  { id: "12", count: 12, object: "cupcake", locked: true },
  { id: "13", count: 13, object: "bear", locked: true },
  { id: "14", count: 14, object: "rocket", locked: true },
  { id: "15", count: 15, object: "dinosaur", locked: true },
  { id: "16", count: 16, object: "popsicle", locked: true },
  { id: "17", count: 17, object: "pie", locked: true },
  { id: "18", count: 18, object: "candycane", locked: true },
  { id: "19", count: 19, object: "pretzel", locked: true },
  { id: "20", count: 20, object: "lollipop", locked: true },
];

export const NUMBERS_COUNTING_CARD_IDS = NUMBERS_COUNTING_CARDS.map((c) => c.id);

export function getCountingCard(id: string) {
  return NUMBERS_COUNTING_CARDS.find((c) => c.id === id);
}
