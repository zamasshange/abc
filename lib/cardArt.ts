import type { CategoryId } from "./theme";

/** Reference card art extracted from GunjanApps ABC Preschool screenshots */
export function getCardArtPath(categoryId: CategoryId, cardIndex: number): string | null {
  const path = `/assets/cards/${categoryId}-${cardIndex}.jpg`;
  return path;
}

export function hasCardArt(categoryId: CategoryId, cardIndex: number): boolean {
  // Cards 0-3 extracted per category from reference photos
  return cardIndex >= 0 && cardIndex <= 3;
}
