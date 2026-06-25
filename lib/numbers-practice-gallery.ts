/** Numbers Practice gallery — count objects + trace number (1–20) */

export type NumPracticeExercise = {
  count: number;
  object: string;
};

export type NumPracticeCard = {
  id: string;
  exercises: NumPracticeExercise[];
  locked: boolean;
};

export const NUMBERS_PRACTICE_CARDS: NumPracticeCard[] = [
  { id: "num-pr-p1-a", exercises: [{ count: 1, object: "cake" }, { count: 2, object: "bear" }], locked: false },
  { id: "num-pr-p1-b", exercises: [{ count: 3, object: "ball" }, { count: 4, object: "icecream" }], locked: false },
  { id: "num-pr-p1-c", exercises: [{ count: 5, object: "candy" }, { count: 6, object: "chick" }], locked: false },
  { id: "num-pr-p2-a", exercises: [{ count: 7, object: "strawberry" }, { count: 8, object: "cherry" }], locked: false },
  { id: "num-pr-p2-b", exercises: [{ count: 9, object: "kite" }, { count: 10, object: "pencil" }], locked: false },
  { id: "num-pr-p2-c", exercises: [{ count: 11, object: "stroller" }], locked: true },
  { id: "num-pr-p3-a", exercises: [{ count: 12, object: "watermelon" }], locked: true },
  { id: "num-pr-p3-b", exercises: [{ count: 13, object: "car" }], locked: true },
  { id: "num-pr-p3-c", exercises: [{ count: 14, object: "rocket" }], locked: true },
  { id: "num-pr-p4-a", exercises: [{ count: 15, object: "butterfly" }], locked: true },
  { id: "num-pr-p4-b", exercises: [{ count: 16, object: "lollipop" }], locked: true },
  { id: "num-pr-p4-c", exercises: [{ count: 17, object: "cupcake" }], locked: true },
  { id: "num-pr-p5-a", exercises: [{ count: 18, object: "paintbrush" }], locked: true },
  { id: "num-pr-p5-b", exercises: [{ count: 19, object: "balloon" }], locked: true },
  { id: "num-pr-p5-c", exercises: [{ count: 20, object: "apple" }], locked: true },
];

export const NUMBERS_PRACTICE_CARD_IDS = NUMBERS_PRACTICE_CARDS.map((c) => c.id);

export function getNumPracticeCard(id: string) {
  return NUMBERS_PRACTICE_CARDS.find((c) => c.id === id);
}
