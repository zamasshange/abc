/** Curve worksheet gallery — 9 reference pages × 3 cards */

export const CURVE_GALLERY_CARDS = [
  { id: "curve-p1-car-road", locked: true },
  { id: "curve-p1-truck-zig", locked: true },
  { id: "curve-p1-necklace-u", locked: true },
  { id: "curve-p2-frog-rain", locked: true },
  { id: "curve-p2-number-3", locked: true },
  { id: "curve-p2-orange-c", locked: true },
  { id: "curve-p3-cup-c", locked: true },
  { id: "curve-p3-wheel-circle", locked: true },
  { id: "curve-p3-chair-arch", locked: true },
  { id: "curve-p4-mouse-cheese", locked: false },
  { id: "curve-p4-whale-scallop", locked: true },
  { id: "curve-p4-cat-wave", locked: true },
  { id: "curve-p5-rabbit-hump", locked: false },
  { id: "curve-p5-bird-wave", locked: false },
  { id: "curve-p5-monkey-loop", locked: false },
  { id: "curve-p6-dolphin-wave", locked: false },
  { id: "curve-p6-cat-step", locked: false },
  { id: "curve-p6-bee-loop", locked: false },
  { id: "curve-p7-bird-loop", locked: true },
  { id: "curve-p7-squirrel-s", locked: true },
  { id: "curve-p7-fish-arch", locked: true },
  { id: "curve-p8-butterfly-wave", locked: false },
  { id: "curve-p8-dog-zig", locked: false },
  { id: "curve-p8-frog-arch", locked: false },
  { id: "curve-p9-leaf-hump", locked: true },
  { id: "curve-p9-snake-s", locked: true },
  { id: "curve-p9-mouse-loop", locked: true },
] as const;

export const CURVE_GALLERY_CARD_IDS = CURVE_GALLERY_CARDS.map((c) => c.id);

export type CurveGalleryCardId = (typeof CURVE_GALLERY_CARD_IDS)[number];
