export type GalleryId =
  | "lines-worksheets"
  | "alphabet-worksheets"
  | "shapes-worksheets"
  | "connect-worksheets"
  | "pixel-art-pick"
  | "printables"
  | "mazes-worksheets"
  | "colors-worksheets"
  | "numbers-worksheets";

export type GalleryCard = {
  activityId?: string;
  locked?: boolean;
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
      { activityId: "lines-line" },
      { activityId: "lines-practice" },
      { activityId: "lines-curve" },
    ],
  },
  "alphabet-worksheets": {
    id: "alphabet-worksheets",
    showDownload: true,
    cards: [
      { activityId: "alpha-cursive" },
      { activityId: "alpha-cursive" },
      { activityId: "alpha-cursive" },
    ],
  },
  "shapes-worksheets": {
    id: "shapes-worksheets",
    cards: [
      { activityId: "shapes-learn", locked: true },
      { activityId: "shapes-practice", locked: true },
      { activityId: "shapes-drawings", locked: true },
    ],
  },
  "connect-worksheets": {
    id: "connect-worksheets",
    showDownload: true,
    showCenterTabs: true,
    cards: [
      { activityId: "connect-easy", locked: true },
      { activityId: "connect-easy", locked: true },
      { activityId: "connect-hard", locked: true },
    ],
  },
  "pixel-art-pick": {
    id: "pixel-art-pick",
    cards: [
      { activityId: "pixel-orange" },
      { activityId: "pixel-tree" },
      { activityId: "pixel-whale" },
    ],
  },
  printables: {
    id: "printables",
    showDownload: true,
    cards: [
      { activityId: "connect-learn" },
      { activityId: "connect-learn" },
      { activityId: "connect-learn" },
    ],
  },
  "mazes-worksheets": {
    id: "mazes-worksheets",
    showDownload: true,
    cards: [
      { activityId: "mazes-practice" },
      { activityId: "mazes-easy" },
      { activityId: "mazes-hard" },
    ],
  },
  "colors-worksheets": {
    id: "colors-worksheets",
    showDownload: true,
    showCenterTabs: true,
    cards: [
      { activityId: "colors-matching" },
      { activityId: "colors-matching" },
      { activityId: "colors-matching" },
    ],
  },
  "numbers-worksheets": {
    id: "numbers-worksheets",
    showDownload: true,
    cards: [
      { activityId: "num-spelling" },
      { activityId: "num-spelling" },
      { activityId: "num-spelling" },
    ],
  },
};

export function getGallery(id: GalleryId) {
  return galleries[id];
}
