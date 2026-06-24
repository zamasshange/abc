import type { CategoryId } from "./theme";

export type AppScreen = "splash" | "home" | "worksheets" | "tracing";

export type ScreenTarget = {
  screen: AppScreen;
  categoryId?: CategoryId;
};

const worksheetsCards = new Set([
  "colors:worksheets",
  "mazes:worksheets",
  "shapes:worksheets",
]);

const tracingCards = new Set([
  "lines:dots",
  "lines:line",
  "lines:curve",
  "lines:practice",
  "alphabets:trace-upper",
  "alphabets:trace-lower",
  "numbers:tracing",
  "numbers:practice",
  "numbers:spelling",
]);

export function getScreenForCard(categoryId: CategoryId, cardId: string): ScreenTarget {
  const key = `${categoryId}:${cardId}`;
  if (worksheetsCards.has(key)) return { screen: "worksheets", categoryId };
  if (tracingCards.has(key)) return { screen: "tracing", categoryId };
  return { screen: "home", categoryId };
}
