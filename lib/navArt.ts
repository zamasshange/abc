import type { CategoryId } from "./theme";
import { NAV_H, NAV_ROW1_PX, GAME_WIDTH } from "./device";

/** Pixel-perfect nav strips cropped from reference screenshots (1600×153) */
export function getNavImagePath(activeId: CategoryId): string {
  return `/assets/nav/nav-full-${activeId}.jpg`;
}

export function getNavImageSrcSet(activeId: CategoryId): string {
  const base = getNavImagePath(activeId);
  return `${base} 1x, ${base.replace(".jpg", "@2x.jpg")} 2x`;
}

const ROW1_FRAC = NAV_ROW1_PX / NAV_H;
const ROW2_FRAC = 1 - ROW1_FRAC;
const UTIL_W = 0.11;
const TOP_TAB_W = (1 - UTIL_W * 2) / 3;

export type NavHitZone =
  | { kind: "category"; id: CategoryId; x: number; y: number; w: number; h: number }
  | { kind: "lang"; x: number; y: number; w: number; h: number }
  | { kind: "shop"; x: number; y: number; w: number; h: number };

/** Normalized hit zones — matches reference tab layout */
export const NAV_HIT_ZONES: NavHitZone[] = [
  { kind: "lang", x: 0, y: 0, w: UTIL_W, h: ROW1_FRAC },
  { kind: "category", id: "colors", x: UTIL_W, y: 0, w: TOP_TAB_W, h: ROW1_FRAC },
  { kind: "category", id: "connect", x: UTIL_W + TOP_TAB_W, y: 0, w: TOP_TAB_W, h: ROW1_FRAC },
  { kind: "category", id: "mazes", x: UTIL_W + TOP_TAB_W * 2, y: 0, w: TOP_TAB_W, h: ROW1_FRAC },
  { kind: "shop", x: 1 - UTIL_W, y: 0, w: UTIL_W, h: ROW1_FRAC },
  { kind: "category", id: "lines", x: 0, y: ROW1_FRAC, w: 0.25, h: ROW2_FRAC },
  { kind: "category", id: "alphabets", x: 0.25, y: ROW1_FRAC, w: 0.25, h: ROW2_FRAC },
  { kind: "category", id: "numbers", x: 0.5, y: ROW1_FRAC, w: 0.25, h: ROW2_FRAC },
  { kind: "category", id: "shapes", x: 0.75, y: ROW1_FRAC, w: 0.25, h: ROW2_FRAC },
];

export function hitZoneStyle(zone: NavHitZone) {
  return {
    left: Math.round(zone.x * GAME_WIDTH),
    top: Math.round(zone.y * NAV_H),
    width: Math.round(zone.w * GAME_WIDTH),
    height: Math.round(zone.h * NAV_H),
  };
}
