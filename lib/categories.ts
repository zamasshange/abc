import type { CategoryId } from "./theme";

export type ActivityCard = {
  id: string;
  title: string;
  illustration: string;
};

export type CategoryConfig = {
  id: CategoryId;
  label: string;
  row: "top" | "bottom";
  cards: ActivityCard[];
};

export const categories: CategoryConfig[] = [
  {
    id: "colors",
    label: "Colors",
    row: "top",
    cards: [
      { id: "worksheets", title: "Worksheets", illustration: "colors-worksheets" },
      { id: "matching", title: "Matching", illustration: "colors-matching" },
      { id: "fill", title: "Fill", illustration: "colors-fill" },
      { id: "pixel-art", title: "Pixel Art", illustration: "colors-pixel" },
      { id: "how-to-draw", title: "How to Draw", illustration: "colors-how-to-draw" },
      { id: "create", title: "Create", illustration: "colors-create" },
      { id: "pair", title: "Pair", illustration: "colors-pair" },
    ],
  },
  {
    id: "connect",
    label: "Connect",
    row: "top",
    cards: [
      { id: "practice", title: "Practice", illustration: "connect-practice" },
      { id: "easy", title: "Easy", illustration: "connect-easy" },
      { id: "hard", title: "Hard", illustration: "connect-hard" },
      { id: "learn", title: "Learn to draw", illustration: "connect-learn" },
      { id: "shape-draw", title: "Shape Draw", illustration: "connect-shape-draw" },
      { id: "number-draw", title: "Number Draw", illustration: "connect-number-draw" },
    ],
  },
  {
    id: "mazes",
    label: "Mazes",
    row: "top",
    cards: [
      { id: "practice", title: "Practice", illustration: "mazes-practice" },
      { id: "easy", title: "Easy", illustration: "mazes-easy" },
      { id: "hard", title: "Hard", illustration: "mazes-hard" },
      { id: "worksheets", title: "Worksheets", illustration: "mazes-worksheets" },
      { id: "numbers", title: "Numbers", illustration: "mazes-numbers" },
      { id: "match", title: "Match", illustration: "mazes-match" },
      { id: "shapes", title: "Shapes", illustration: "mazes-shapes" },
    ],
  },
  {
    id: "lines",
    label: "Lines",
    row: "bottom",
    cards: [
      { id: "dots", title: "Dots", illustration: "lines-dots" },
      { id: "line", title: "Line", illustration: "lines-line" },
      { id: "curve", title: "Curve", illustration: "lines-curve" },
      { id: "practice", title: "Practice", illustration: "lines-practice" },
    ],
  },
  {
    id: "alphabets",
    label: "Alphabets",
    row: "bottom",
    cards: [
      { id: "cursive", title: "Cursive a - z", illustration: "alpha-cursive" },
      { id: "letter-match", title: "Letter Match", illustration: "alpha-letter-match" },
      { id: "match", title: "Match", illustration: "alpha-match" },
      { id: "jigsaw", title: "Jigsaw", illustration: "alpha-jigsaw" },
    ],
  },
  {
    id: "numbers",
    label: "Numbers",
    row: "bottom",
    cards: [
      { id: "spelling", title: "Spelling", illustration: "num-spelling" },
      { id: "worksheets", title: "Worksheets", illustration: "num-worksheets" },
      { id: "match", title: "Match", illustration: "num-match" },
      { id: "jigsaw", title: "Jigsaw", illustration: "num-jigsaw" },
    ],
  },
  {
    id: "shapes",
    label: "Shapes",
    row: "bottom",
    cards: [
      { id: "learn", title: "Learn", illustration: "shapes-learn" },
      { id: "practice", title: "Practice", illustration: "shapes-practice" },
      { id: "drawings", title: "Drawings", illustration: "shapes-drawings" },
      { id: "worksheets", title: "Worksheets", illustration: "shapes-worksheets" },
    ],
  },
];

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id)!;
}
