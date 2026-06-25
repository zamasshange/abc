import type { CategoryId } from "./theme";

export type ActivityCard = {
  id: string;
  title: string;
  illustration: string;
  /** Green download badge on card art (batch 1 reference) */
  downloadBadge?: boolean;
};

export type CategoryConfig = {
  id: CategoryId;
  label: string;
  row: "top" | "bottom";
  cards: ActivityCard[];
};

/** Card layout from batch 1 reference (`app/abc_preschool`) */
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
      { id: "how-to-draw", title: "How to Draw", illustration: "colors-how-to-draw", downloadBadge: true },
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
      { id: "learn", title: "Learn to draw", illustration: "connect-learn", downloadBadge: true },
      { id: "ditto", title: "Ditto", illustration: "connect-ditto" },
      { id: "match", title: "Match", illustration: "connect-match" },
      { id: "jigsaw", title: "Jigsaw", illustration: "connect-jigsaw" },
      { id: "tracing", title: "Tracing", illustration: "connect-tracing" },
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
      { id: "trace-upper", title: "Trace A - Z", illustration: "alpha-trace-upper" },
      { id: "trace-lower", title: "Trace A - Z", illustration: "alpha-trace-lower" },
      { id: "uppercase", title: "Uppercase", illustration: "alpha-upper" },
      { id: "lowercase", title: "Lowercase", illustration: "alpha-lower" },
      { id: "practice", title: "Practice", illustration: "alpha-practice" },
      { id: "worksheets", title: "Worksheets", illustration: "alpha-worksheets" },
      { id: "cursive-upper", title: "Cursive A - Z", illustration: "alpha-cursive-upper" },
      { id: "cursive-lower", title: "Cursive a - z", illustration: "alpha-cursive-lower" },
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
      { id: "tracing", title: "Tracing", illustration: "num-tracing" },
      { id: "counting", title: "Counting", illustration: "num-counting" },
      { id: "practice", title: "Practice", illustration: "num-practice" },
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
