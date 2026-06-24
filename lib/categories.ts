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
      { id: "pixel-art", title: "Pixel Art", illustration: "colors-pixel" },
      { id: "how-to-draw", title: "How to Draw", illustration: "connect-learn" },
      { id: "create", title: "Create", illustration: "colors-fill" },
      { id: "pair", title: "Pair", illustration: "colors-matching" },
      { id: "worksheets", title: "Worksheets", illustration: "colors-worksheets" },
      { id: "matching", title: "Matching", illustration: "colors-matching" },
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
      { id: "shape-draw", title: "Shape Draw", illustration: "shapes-learn" },
      { id: "number-draw", title: "Number Draw", illustration: "num-tracing" },
    ],
  },
  {
    id: "mazes",
    label: "Mazes",
    row: "top",
    cards: [
      { id: "worksheets", title: "Worksheets", illustration: "mazes-worksheets" },
      { id: "numbers", title: "Numbers", illustration: "mazes-easy" },
      { id: "match", title: "Match", illustration: "mazes-hard" },
      { id: "shapes", title: "Shapes", illustration: "mazes-practice" },
      { id: "practice", title: "Practice", illustration: "mazes-practice" },
      { id: "easy", title: "Easy", illustration: "mazes-easy" },
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
      { id: "trace-upper", title: "Trace A - Z", illustration: "alpha-trace-upper" },
      { id: "trace-lower", title: "Trace A - Z", illustration: "alpha-trace-lower" },
      { id: "uppercase", title: "Uppercase", illustration: "alpha-upper" },
      { id: "lowercase", title: "Lowercase", illustration: "alpha-lower" },
    ],
  },
  {
    id: "numbers",
    label: "Numbers",
    row: "bottom",
    cards: [
      { id: "tracing", title: "Tracing", illustration: "num-tracing" },
      { id: "counting", title: "Counting", illustration: "num-counting" },
      { id: "practice", title: "Practice", illustration: "num-practice" },
      { id: "spelling", title: "Spelling", illustration: "num-spelling" },
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
