import type { ActivityCard } from "./categories";

const CARD_IMAGE_MAP: Record<string, string> = {
  "lines-dots": "/assets/cards/lines-dots.jpg",
  "lines-line": "/assets/cards/lines-line.jpg",
  "lines-curve": "/assets/cards/lines-curve.jpg",
  "lines-practice": "/assets/cards/lines-practice.jpg",
  "alpha-trace-upper": "/assets/cards/alpha-trace-upper.jpg",
  "alpha-trace-lower": "/assets/cards/alpha-trace-lower.jpg",
  "alpha-upper": "/assets/cards/alpha-uppercase.jpg",
  "alpha-lower": "/assets/cards/alpha-lowercase.jpg",
};

export function getCardImage(illustrationId: string): string | null {
  return CARD_IMAGE_MAP[illustrationId] ?? null;
}

export function cardHasImage(illustrationId: string): boolean {
  return illustrationId in CARD_IMAGE_MAP;
}
