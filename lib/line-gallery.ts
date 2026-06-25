/** Line worksheet gallery — 7 reference pages × 3 cards */

export const LINE_GALLERY_CARD_IDS = [
  "line-p1-plane-v",
  "line-p1-umbrella-check",
  "line-p1-cloud-rain",
  "line-p2-balloons",
  "line-p2-mountain-zig",
  "line-p2-ladder-v",
  "line-p3-table-slant",
  "line-p3-box-pattern",
  "line-p3-cloud-drops",
  "line-p4-cane-bed",
  "line-p4-ladder-seg",
  "line-p4-wall-wave",
  "line-p5-star-slant",
  "line-p5-plane-slant",
  "line-p5-umbrella-left",
  "line-p6-ruler-vertical",
  "line-p6-pen-slant-r",
  "line-p6-arrow-slant-l",
  "line-p7-fruit-basket",
  "line-p7-humpty",
  "line-p7-car-paths",
] as const;

export type LineGalleryCardId = (typeof LINE_GALLERY_CARD_IDS)[number];
