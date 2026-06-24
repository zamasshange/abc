import type { CategoryId } from "./theme";

export type AppScreen = "splash" | "home" | "worksheets" | "tracing";

export type DrawingTemplateId =
  | "lines-dots"
  | "lines-line"
  | "lines-curve"
  | "lines-practice"
  | "alpha-trace-upper"
  | "alpha-trace-lower"
  | "alpha-upper"
  | "alpha-lower"
  | "num-tracing"
  | "num-counting"
  | "num-practice"
  | "num-spelling"
  | "shapes-learn"
  | "shapes-practice"
  | "shapes-drawings"
  | "connect-practice"
  | "connect-easy"
  | "connect-hard"
  | "connect-learn"
  | "mazes-practice"
  | "square-trace";

export type ScreenTarget = {
  screen: AppScreen;
  categoryId?: CategoryId;
  templateId?: DrawingTemplateId;
};

const worksheetsCards = new Set([
  "colors:worksheets",
  "mazes:worksheets",
  "shapes:worksheets",
]);

const drawingCardMap: Record<string, DrawingTemplateId> = {
  "lines:dots": "lines-dots",
  "lines:line": "lines-line",
  "lines:curve": "lines-curve",
  "lines:practice": "lines-practice",
  "alphabets:trace-upper": "alpha-trace-upper",
  "alphabets:trace-lower": "alpha-trace-lower",
  "alphabets:uppercase": "alpha-upper",
  "alphabets:lowercase": "alpha-lower",
  "numbers:tracing": "num-tracing",
  "numbers:counting": "num-counting",
  "numbers:practice": "num-practice",
  "numbers:spelling": "num-spelling",
  "shapes:learn": "shapes-learn",
  "shapes:practice": "shapes-practice",
  "shapes:drawings": "shapes-drawings",
  "connect:practice": "connect-practice",
  "connect:easy": "connect-easy",
  "connect:hard": "connect-hard",
  "connect:learn": "connect-learn",
  "mazes:practice": "mazes-practice",
  "mazes:easy": "mazes-practice",
  "mazes:hard": "mazes-practice",
  "colors:matching": "square-trace",
  "colors:fill": "square-trace",
  "colors:pixel-art": "square-trace",
};

export function getScreenForCard(categoryId: CategoryId, cardId: string): ScreenTarget {
  const key = `${categoryId}:${cardId}`;
  if (worksheetsCards.has(key)) return { screen: "worksheets", categoryId };
  const templateId = drawingCardMap[key];
  if (templateId) return { screen: "tracing", categoryId, templateId };
  return { screen: "home", categoryId };
}
