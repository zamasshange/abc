import type { CategoryId } from "./theme";

export type ActivityCard = {
  id: string;
  title: string;
  /** index in /assets/cards/{categoryId}-{cardIndex}.jpg */
  cardIndex: number;
};

export type CategoryConfig = {
  id: CategoryId;
  label: string;
  row: "top" | "bottom";
  cards: ActivityCard[];
};

/** Card lists match abc_preschool1 reference screenshots exactly */
export const categories: CategoryConfig[] = [
  {
    id: "colors",
    label: "Colors",
    row: "top",
    cards: [
      { id: "worksheets", title: "Worksheets", cardIndex: 0 },
      { id: "matching", title: "Matching", cardIndex: 1 },
      { id: "fill", title: "Fill", cardIndex: 2 },
      { id: "pixel-art", title: "Pixel Art", cardIndex: 3 },
      { id: "how-to-draw", title: "How to Draw", cardIndex: 4 },
      { id: "create", title: "Create", cardIndex: 5 },
      { id: "pair", title: "Pair", cardIndex: 6 },
    ],
  },
  {
    id: "connect",
    label: "Connect",
    row: "top",
    cards: [
      { id: "practice", title: "Practice", cardIndex: 0 },
      { id: "easy", title: "Easy", cardIndex: 1 },
      { id: "hard", title: "Hard", cardIndex: 2 },
      { id: "learn", title: "Learn to draw", cardIndex: 3 },
    ],
  },
  {
    id: "mazes",
    label: "Mazes",
    row: "top",
    cards: [
      { id: "practice", title: "Practice", cardIndex: 0 },
      { id: "easy", title: "Easy", cardIndex: 1 },
      { id: "hard", title: "Hard", cardIndex: 2 },
      { id: "worksheets", title: "Worksheets", cardIndex: 3 },
      { id: "numbers", title: "Numbers", cardIndex: 4 },
      { id: "match", title: "Match", cardIndex: 5 },
      { id: "shapes", title: "Shapes", cardIndex: 6 },
    ],
  },
  {
    id: "lines",
    label: "Lines",
    row: "bottom",
    cards: [
      { id: "dots", title: "Dots", cardIndex: 0 },
      { id: "line", title: "Line", cardIndex: 1 },
      { id: "curve", title: "Curve", cardIndex: 2 },
      { id: "practice", title: "Practice", cardIndex: 3 },
    ],
  },
  {
    id: "alphabets",
    label: "Alphabets",
    row: "bottom",
    cards: [
      { id: "cursive", title: "Cursive a - z", cardIndex: 0 },
      { id: "letter-match", title: "Letter Match", cardIndex: 1 },
      { id: "match", title: "Match", cardIndex: 2 },
      { id: "jigsaw", title: "Jigsaw", cardIndex: 3 },
    ],
  },
  {
    id: "numbers",
    label: "Numbers",
    row: "bottom",
    cards: [
      { id: "spelling", title: "Spelling", cardIndex: 0 },
      { id: "worksheets", title: "Worksheets", cardIndex: 1 },
      { id: "match", title: "Match", cardIndex: 2 },
      { id: "jigsaw", title: "Jigsaw", cardIndex: 3 },
    ],
  },
  {
    id: "shapes",
    label: "Shapes",
    row: "bottom",
    cards: [
      { id: "learn", title: "Learn", cardIndex: 0 },
      { id: "practice", title: "Practice", cardIndex: 1 },
      { id: "drawings", title: "Drawings", cardIndex: 2 },
      { id: "worksheets", title: "Worksheets", cardIndex: 3 },
    ],
  },
];

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id)!;
}

export function getCardImage(categoryId: CategoryId, cardIndex: number) {
  return `/assets/cards/${categoryId}-${cardIndex}.jpg`;
}
