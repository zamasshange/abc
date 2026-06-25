import type { CategoryId } from "./theme";

/** Full card JPEGs cropped from game_video2 — border, art, and footer included */
export function getCardImagePath(categoryId: CategoryId, cardIndex: number): string {
  return `/assets/cards/${categoryId}-${cardIndex}.jpg`;
}

export const CARD_LAYOUT = {
  borderWidth: 10,
  borderRadius: 22,
  footerRatio: 0.28,
} as const;
