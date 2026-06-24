import type { CategoryId } from "./theme";
import layout from "@/public/assets/layout.json";

export type HitZone = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  action?: string;
};

export type CardZone = {
  index: number;
  x: number;
  y: number;
  w: number;
  h: number;
  file: string;
};

export const REFERENCE_LAYOUT = layout;

export function getHomeScreenImage(category: CategoryId): string {
  return `/assets/screens/home-${category}.jpg`;
}

export function getNavHitZones(): HitZone[] {
  const zones: HitZone[] = [];
  const { nav } = REFERENCE_LAYOUT;

  for (const tab of nav.row1.tabs) {
    zones.push({
      id: tab.id,
      x: tab.x,
      y: nav.row1.y,
      w: tab.w,
      h: nav.row1.h,
      action: tab.action,
    });
  }
  for (const tab of nav.row2.tabs) {
    zones.push({
      id: tab.id,
      x: tab.x,
      y: nav.row2.y,
      w: tab.w,
      h: nav.row2.h,
    });
  }
  return zones;
}

export function getCardZones(category: CategoryId): CardZone[] {
  const cat = REFERENCE_LAYOUT.categories[category];
  if (!cat) return [];
  return cat.cards;
}

export const ALL_CATEGORY_IDS: CategoryId[] = [
  "colors",
  "connect",
  "mazes",
  "lines",
  "alphabets",
  "numbers",
  "shapes",
];

export function isCategoryId(id: string): id is CategoryId {
  return ALL_CATEGORY_IDS.includes(id as CategoryId);
}
