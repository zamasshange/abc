import type { CategoryId } from "./theme";

/** Card art only (illustration area, no footer) — footers are rendered as live text */
export function getCardArtPath(categoryId: CategoryId, cardIndex: number): string {
  return `/assets/cards/${categoryId}-${cardIndex}-art.jpg`;
}

export function getCardArtSrcSet(categoryId: CategoryId, cardIndex: number): string {
  const base = getCardArtPath(categoryId, cardIndex);
  return `${base} 1x, ${base.replace(".jpg", "@2x.jpg")} 2x`;
}

/** @deprecated Use getCardArtPath — full card JPEGs kept for tooling */
export function getCardImagePath(categoryId: CategoryId, cardIndex: number): string {
  return `/assets/cards/${categoryId}-${cardIndex}.jpg`;
}

export function getCardImageSrcSet(categoryId: CategoryId, cardIndex: number): string {
  const base = getCardImagePath(categoryId, cardIndex);
  return `${base} 1x, ${base.replace(".jpg", "@2x.jpg")} 2x`;
}

export const CARD_LAYOUT = {
  borderWidth: 10,
  borderRadius: 28,
  footerRatio: 0.22,
} as const;
