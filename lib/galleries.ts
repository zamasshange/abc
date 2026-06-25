export type GalleryId =
  | "lines-worksheets"
  | "alphabet-worksheets"
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
  cards: GalleryCard[];
};

export const galleries: Record<GalleryId, GalleryConfig> = {
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
  "alphabet-worksheets": {
    id: "alphabet-worksheets",
    showDownload: true,
    cards: [
      { id: "a", label: "A", activityId: "alpha-trace-upper" },
      { id: "b", label: "B", activityId: "alpha-trace-upper" },
      { id: "c", label: "C", activityId: "alpha-trace-upper" },
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
