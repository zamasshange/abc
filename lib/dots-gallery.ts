/** Dots gallery card ids — 6 reference pages × 3 cards */

export const DOTS_GALLERY_CARD_IDS = [
  "dots-p1-h",
  "dots-p1-v",
  "dots-p1-diag-up",
  "dots-p2-diag-down",
  "dots-p2-animals",
  "dots-p2-triple-h",
  "dots-p3-zig-toys",
  "dots-p3-vertical-animals",
  "dots-p3-mixed",
  "dots-p4-arches",
  "dots-p4-waves",
  "dots-p4-double-hump",
  "dots-p5-zig-animals",
  "dots-p5-curves-down",
  "dots-p5-diagonal-bugs",
  "dots-p6-arc-out",
  "dots-p6-arc-in",
  "dots-p6-stagger-bugs",
] as const;

export type DotsGalleryCardId = (typeof DOTS_GALLERY_CARD_IDS)[number];
