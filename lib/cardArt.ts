import type { CategoryId } from "./theme";

/** Full card JPEGs cropped from reference screenshots — border, art, and footer included */
export function getCardImagePath(categoryId: CategoryId, cardIndex: number): string {
  return `/assets/cards/${categoryId}-${cardIndex}.jpg`;
}

export function getCardImageSrcSet(categoryId: CategoryId, cardIndex: number): string {
  const base = getCardImagePath(categoryId, cardIndex);
  return `${base} 1x, ${base.replace(".jpg", "@2x.jpg")} 2x`;
}

export const CARD_LAYOUT = {
  borderWidth: 10,
  borderRadius: 22,
  footerRatio: 0.28,
} as const;
