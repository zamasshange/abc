import { DOTS_GALLERY_CARD_IDS } from "./dots-gallery";
import { LINE_GALLERY_CARD_IDS } from "./line-gallery";
import { CURVE_GALLERY_CARDS } from "./curve-gallery";
import { PRACTICE_GALLERY_CARDS } from "./practice-gallery";
import { ALPHABET_TRACE_LOWER_CARD_IDS, ALPHABET_TRACE_UPPER_CARD_IDS } from "./alphabet-trace-gallery";
import { ALPHABET_UPPER_CARD_IDS } from "./alphabet-upper-gallery";
import { ALPHABET_LOWER_CARD_IDS } from "./alphabet-lower-gallery";
import { ALPHABET_PRACTICE_CARD_IDS } from "./alphabet-practice-gallery";
import { ALPHABET_WORKSHEET_CARDS } from "./alphabet-worksheets-gallery";
import { ALPHABET_CURSIVE_LOWER_CARDS, ALPHABET_CURSIVE_UPPER_CARDS } from "./alphabet-cursive-gallery";
import { NUMBERS_PRACTICE_CARDS } from "./numbers-practice-gallery";
import { NUMBERS_TRACE_CARD_IDS } from "./numbers-trace-gallery";
import { NUMBERS_COUNTING_CARDS } from "./numbers-counting-gallery";
import { NUMBERS_SPELLING_CARDS } from "./numbers-spelling-gallery";

export type GalleryId =
  | "lines-dots"
  | "lines-line"
  | "lines-curve"
  | "lines-practice"
  | "lines-worksheets"
  | "alphabet-trace-upper"
  | "alphabet-trace-lower"
  | "alphabet-upper"
  | "alphabet-lower"
  | "alphabet-practice"
  | "alphabet-worksheets"
  | "alphabet-cursive-upper"
  | "alphabet-cursive-lower"
  | "numbers-trace"
  | "numbers-counting"
  | "numbers-practice"
  | "numbers-spelling"
  | "numbers-worksheets"
  | "shapes-worksheets"
  | "connect-worksheets"
  | "pixel-art-pick"
  | "printables"
  | "mazes-worksheets";

export type GalleryCard = {
  id: string;
  label?: string;
  locked?: boolean;
  activityId?: string;
};

export type GalleryConfig = {
  id: GalleryId;
  showDownload?: boolean;
  showCenterTabs?: boolean;
  /** Three cards per swipe page (Dots gallery) */
  paged?: boolean;
  cards: GalleryCard[];
};

/** Free worksheets first, then locked — matches GunjanApps scroll order */
function sortUnlockedFirst<T extends { locked?: boolean }>(cards: T[]): T[] {
  return [...cards.filter((c) => !c.locked), ...cards.filter((c) => c.locked)];
}

export const galleries: Record<GalleryId, GalleryConfig> = {
  "lines-dots": {
    id: "lines-dots",
    showDownload: true,
    showCenterTabs: true,
    cards: DOTS_GALLERY_CARD_IDS.map((id) => ({
      id,
      activityId: "lines-dots",
    })),
  },
  "lines-line": {
    id: "lines-line",
    showDownload: true,
    showCenterTabs: true,
    cards: LINE_GALLERY_CARD_IDS.map((id) => ({
      id,
      activityId: "lines-line",
    })),
  },
  "lines-curve": {
    id: "lines-curve",
    showDownload: true,
    showCenterTabs: true,
    cards: sortUnlockedFirst(
      CURVE_GALLERY_CARDS.map(({ id, locked }) => ({
        id,
        activityId: "lines-curve",
        locked,
      })),
    ),
  },
  "lines-practice": {
    id: "lines-practice",
    showDownload: true,
    showCenterTabs: true,
    cards: sortUnlockedFirst(
      PRACTICE_GALLERY_CARDS.map(({ id, locked }) => ({
        id,
        activityId: "lines-practice",
        locked,
      })),
    ),
  },
  "lines-worksheets": {
    id: "lines-worksheets",
    showDownload: true,
    showCenterTabs: true,
    cards: [
      { id: "vertical", activityId: "lines-line" },
      { id: "slant", activityId: "lines-practice" },
      { id: "arrow", activityId: "lines-curve" },
    ],
  },
  "alphabet-trace-upper": {
    id: "alphabet-trace-upper",
    showDownload: true,
    showCenterTabs: true,
    cards: ALPHABET_TRACE_UPPER_CARD_IDS.map((id) => ({
      id,
      label: id.toUpperCase(),
      activityId: "alpha-trace-upper",
    })),
  },
  "alphabet-trace-lower": {
    id: "alphabet-trace-lower",
    showDownload: true,
    showCenterTabs: true,
    cards: ALPHABET_TRACE_LOWER_CARD_IDS.map((id) => ({
      id,
      label: id,
      activityId: "alpha-trace-lower",
    })),
  },
  "alphabet-upper": {
    id: "alphabet-upper",
    showDownload: true,
    showCenterTabs: true,
    cards: ALPHABET_UPPER_CARD_IDS.map((id) => ({
      id,
      label: id.toUpperCase(),
      activityId: "alpha-upper",
    })),
  },
  "alphabet-lower": {
    id: "alphabet-lower",
    showDownload: true,
    showCenterTabs: true,
    cards: ALPHABET_LOWER_CARD_IDS.map((id) => ({
      id,
      label: id,
      activityId: "alpha-lower",
    })),
  },
  "alphabet-practice": {
    id: "alphabet-practice",
    showDownload: true,
    showCenterTabs: true,
    cards: ALPHABET_PRACTICE_CARD_IDS.map((id) => ({
      id,
      label: id.toUpperCase(),
      activityId: "alpha-practice",
    })),
  },
  "alphabet-worksheets": {
    id: "alphabet-worksheets",
    showDownload: true,
    showCenterTabs: true,
    cards: sortUnlockedFirst(
      ALPHABET_WORKSHEET_CARDS.map(({ id, locked }) => ({
        id,
        activityId: "alpha-worksheets",
        locked,
      })),
    ),
  },
  "alphabet-cursive-upper": {
    id: "alphabet-cursive-upper",
    showDownload: true,
    showCenterTabs: true,
    cards: sortUnlockedFirst(
      ALPHABET_CURSIVE_UPPER_CARDS.map(({ id, locked }) => ({
        id,
        label: id.toUpperCase(),
        activityId: "alpha-cursive-upper",
        locked,
      })),
    ),
  },
  "alphabet-cursive-lower": {
    id: "alphabet-cursive-lower",
    showDownload: true,
    showCenterTabs: true,
    cards: sortUnlockedFirst(
      ALPHABET_CURSIVE_LOWER_CARDS.map(({ id, locked }) => ({
        id,
        label: id,
        activityId: "alpha-cursive-lower",
        locked,
      })),
    ),
  },
  "numbers-trace": {
    id: "numbers-trace",
    showDownload: true,
    showCenterTabs: true,
    cards: NUMBERS_TRACE_CARD_IDS.map((id) => ({
      id,
      label: id,
      activityId: "num-tracing",
    })),
  },
  "numbers-counting": {
    id: "numbers-counting",
    showDownload: true,
    showCenterTabs: true,
    cards: sortUnlockedFirst(
      NUMBERS_COUNTING_CARDS.map(({ id, locked }) => ({
        id,
        label: id,
        activityId: "num-counting",
        locked,
      })),
    ),
  },
  "numbers-practice": {
    id: "numbers-practice",
    showDownload: true,
    showCenterTabs: true,
    cards: sortUnlockedFirst(
      NUMBERS_PRACTICE_CARDS.map(({ id, locked, exercises }) => ({
        id,
        label: exercises.map((e) => String(e.count)).join(" · "),
        activityId: "num-practice",
        locked,
      })),
    ),
  },
  "numbers-spelling": {
    id: "numbers-spelling",
    showDownload: true,
    showCenterTabs: true,
    cards: sortUnlockedFirst(
      NUMBERS_SPELLING_CARDS.map(({ id, locked }) => ({
        id,
        label: id,
        activityId: "num-spelling",
        locked,
      })),
    ),
  },
  "numbers-worksheets": {
    id: "numbers-worksheets",
    showDownload: true,
    cards: [
      { id: "seq-1", label: "1 2 ___", activityId: "num-tracing" },
      { id: "seq-2", label: "8 ___ 10", activityId: "num-tracing" },
      { id: "seq-3", locked: true, activityId: "num-practice" },
    ],
  },
  "shapes-worksheets": {
    id: "shapes-worksheets",
    cards: [
      { id: "mouse", locked: true, activityId: "shapes-learn" },
      { id: "bus", locked: true, activityId: "shapes-practice" },
      { id: "rocket", locked: true, activityId: "shapes-drawings" },
    ],
  },
  "connect-worksheets": {
    id: "connect-worksheets",
    showDownload: true,
    showCenterTabs: true,
    cards: [
      { id: "melon", label: "Connect The Dots.", activityId: "connect-easy" },
      { id: "elephant", label: "Connect The Dots.", activityId: "connect-easy" },
      { id: "house", label: "Connect The Dots.", activityId: "connect-hard" },
    ],
  },
  "pixel-art-pick": {
    id: "pixel-art-pick",
    cards: [
      { id: "orange", activityId: "pixel-orange" },
      { id: "tree", activityId: "pixel-tree" },
      { id: "whale", activityId: "pixel-whale" },
    ],
  },
  "printables": {
    id: "printables",
    showDownload: true,
    cards: [
      { id: "rocket", activityId: "connect-learn" },
      { id: "dino", activityId: "connect-learn" },
      { id: "bee", activityId: "connect-learn" },
    ],
  },
  "mazes-worksheets": {
    id: "mazes-worksheets",
    showDownload: true,
    cards: [
      { id: "shapes", activityId: "mazes-practice" },
      { id: "numbers", activityId: "mazes-numbers" },
      { id: "match", activityId: "mazes-match" },
    ],
  },
};

export function getGallery(id: GalleryId) {
  return galleries[id];
}
