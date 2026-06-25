/** Practice worksheet gallery — 10 reference pages × 3 cards */

export type PracticeCardKind = "match" | "path";

export const PRACTICE_GALLERY_CARDS = [
  { id: "practice-p1-animal-babies", locked: true, kind: "match" as const },
  { id: "practice-p1-homes-natural-a", locked: true, kind: "match" as const },
  { id: "practice-p1-homes-natural-b", locked: true, kind: "match" as const },
  { id: "practice-p2-vehicle-paths", locked: true, kind: "path" as const },
  { id: "practice-p2-elephant-fox", locked: true, kind: "path" as const },
  { id: "practice-p2-footprints", locked: true, kind: "match" as const },
  { id: "practice-p3-missing-parts-a", locked: true, kind: "match" as const },
  { id: "practice-p3-pet-homes", locked: true, kind: "match" as const },
  { id: "practice-p3-missing-parts-b", locked: true, kind: "match" as const },
  { id: "practice-p4-food-wild", locked: true, kind: "match" as const },
  { id: "practice-p4-footprints", locked: true, kind: "match" as const },
  { id: "practice-p4-homes-farm", locked: true, kind: "match" as const },
  { id: "practice-p5-ufo-paths", locked: true, kind: "path" as const },
  { id: "practice-p5-footprints", locked: true, kind: "match" as const },
  { id: "practice-p5-food-pets", locked: true, kind: "match" as const },
  { id: "practice-p6-animal-babies", locked: false, kind: "match" as const },
  { id: "practice-p6-bird-homes", locked: false, kind: "match" as const },
  { id: "practice-p6-footprints", locked: false, kind: "match" as const },
  { id: "practice-p7-baby-mother", locked: false, kind: "path" as const },
  { id: "practice-p7-pet-food", locked: false, kind: "match" as const },
  { id: "practice-p7-farm-homes", locked: false, kind: "match" as const },
  { id: "practice-p8-bird-homes", locked: true, kind: "match" as const },
  { id: "practice-p8-food-carnivore", locked: true, kind: "match" as const },
  { id: "practice-p8-food-herbivore", locked: true, kind: "match" as const },
  { id: "practice-p9-homes-make-a", locked: true, kind: "match" as const },
  { id: "practice-p9-homes-make-b", locked: true, kind: "match" as const },
  { id: "practice-p9-pet-food", locked: true, kind: "match" as const },
  { id: "practice-p10-homes-natural-a", locked: true, kind: "match" as const },
  { id: "practice-p10-homes-natural-b", locked: true, kind: "match" as const },
  { id: "practice-p10-baby-mother", locked: true, kind: "path" as const },
] as const;

export const PRACTICE_GALLERY_CARD_IDS = PRACTICE_GALLERY_CARDS.map((c) => c.id);

export type PracticeGalleryCardId = (typeof PRACTICE_GALLERY_CARD_IDS)[number];

export function getPracticeCardKind(cardId: string): PracticeCardKind {
  return PRACTICE_GALLERY_CARDS.find((c) => c.id === cardId)?.kind ?? "match";
}
