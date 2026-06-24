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
  image: string;
  cards: GalleryCard[];
  zones: {
    back: { x: number; y: number; w: number; h: number };
    play: { x: number; y: number; w: number; h: number };
    download?: { x: number; y: number; w: number; h: number };
    cardSlots: { x: number; y: number; w: number; h: number }[];
  };
};

/** Hit zones as fractions of screen — measured from abc_preschool1 screenshots */
export const galleries: Record<GalleryId, GalleryConfig> = {
  "lines-worksheets": {
    id: "lines-worksheets",
    image: "/assets/gallery/lines-worksheets.jpg",
    cards: [
      { activityId: "lines-line" },
      { activityId: "lines-practice" },
      { activityId: "lines-curve" },
    ],
    zones: {
      back: { x: 0.02, y: 0.04, w: 0.08, h: 0.18 },
      play: { x: 0.84, y: 0.04, w: 0.08, h: 0.18 },
      download: { x: 0.28, y: 0.78, w: 0.44, h: 0.16 },
      cardSlots: [
        { x: 0.14, y: 0.22, w: 0.22, h: 0.52 },
        { x: 0.39, y: 0.22, w: 0.22, h: 0.52 },
        { x: 0.64, y: 0.22, w: 0.22, h: 0.52 },
      ],
    },
  },
  "alphabet-worksheets": {
    id: "alphabet-worksheets",
    image: "/assets/gallery/alphabet-worksheets.jpg",
    cards: [{ activityId: "alpha-cursive" }, { activityId: "alpha-cursive" }, { activityId: "alpha-cursive" }],
    zones: {
      back: { x: 0.02, y: 0.04, w: 0.08, h: 0.18 },
      play: { x: 0.84, y: 0.04, w: 0.08, h: 0.18 },
      download: { x: 0.28, y: 0.78, w: 0.44, h: 0.16 },
      cardSlots: [
        { x: 0.12, y: 0.2, w: 0.24, h: 0.55 },
        { x: 0.38, y: 0.2, w: 0.24, h: 0.55 },
        { x: 0.64, y: 0.2, w: 0.24, h: 0.55 },
      ],
    },
  },
  "shapes-worksheets": {
    id: "shapes-worksheets",
    image: "/assets/gallery/shapes-worksheets.jpg",
    cards: [
      { activityId: "shapes-learn", locked: true },
      { activityId: "shapes-practice", locked: true },
      { activityId: "shapes-drawings", locked: true },
    ],
    zones: {
      back: { x: 0.02, y: 0.04, w: 0.08, h: 0.18 },
      play: { x: 0.84, y: 0.04, w: 0.08, h: 0.18 },
      cardSlots: [
        { x: 0.14, y: 0.22, w: 0.22, h: 0.52 },
        { x: 0.39, y: 0.22, w: 0.22, h: 0.52 },
        { x: 0.64, y: 0.22, w: 0.22, h: 0.52 },
      ],
    },
  },
  "connect-worksheets": {
    id: "connect-worksheets",
    image: "/assets/gallery/connect-worksheets.jpg",
    cards: [
      { activityId: "connect-easy", locked: true },
      { activityId: "connect-easy", locked: true },
      { activityId: "connect-hard", locked: true },
    ],
    zones: {
      back: { x: 0.02, y: 0.04, w: 0.08, h: 0.18 },
      play: { x: 0.84, y: 0.04, w: 0.08, h: 0.18 },
      download: { x: 0.28, y: 0.78, w: 0.44, h: 0.16 },
      cardSlots: [
        { x: 0.1, y: 0.18, w: 0.26, h: 0.56 },
        { x: 0.37, y: 0.18, w: 0.26, h: 0.56 },
        { x: 0.64, y: 0.18, w: 0.26, h: 0.56 },
      ],
    },
  },
  "pixel-art-pick": {
    id: "pixel-art-pick",
    image: "/assets/gallery/pixel-art-pick.jpg",
    cards: [
      { activityId: "pixel-orange" },
      { activityId: "pixel-tree" },
      { activityId: "pixel-whale" },
    ],
    zones: {
      back: { x: 0.02, y: 0.04, w: 0.08, h: 0.18 },
      play: { x: 0.84, y: 0.04, w: 0.08, h: 0.18 },
      cardSlots: [
        { x: 0.14, y: 0.22, w: 0.22, h: 0.52 },
        { x: 0.39, y: 0.22, w: 0.22, h: 0.52 },
        { x: 0.64, y: 0.22, w: 0.22, h: 0.52 },
      ],
    },
  },
  printables: {
    id: "printables",
    image: "/assets/gallery/printables.jpg",
    cards: [
      { activityId: "connect-learn" },
      { activityId: "connect-learn" },
      { activityId: "connect-learn" },
    ],
    zones: {
      back: { x: 0.02, y: 0.04, w: 0.08, h: 0.18 },
      play: { x: 0.84, y: 0.04, w: 0.08, h: 0.18 },
      download: { x: 0.28, y: 0.78, w: 0.44, h: 0.16 },
      cardSlots: [
        { x: 0.12, y: 0.2, w: 0.24, h: 0.55 },
        { x: 0.38, y: 0.2, w: 0.24, h: 0.55 },
        { x: 0.64, y: 0.2, w: 0.24, h: 0.55 },
      ],
    },
  },
  "mazes-worksheets": {
    id: "mazes-worksheets",
    image: "/assets/gallery/mazes-worksheets.jpg",
    cards: [
      { activityId: "mazes-practice" },
      { activityId: "mazes-easy" },
      { activityId: "mazes-hard" },
    ],
    zones: {
      back: { x: 0.02, y: 0.04, w: 0.08, h: 0.18 },
      play: { x: 0.84, y: 0.04, w: 0.08, h: 0.18 },
      download: { x: 0.28, y: 0.78, w: 0.44, h: 0.16 },
      cardSlots: [
        { x: 0.14, y: 0.22, w: 0.22, h: 0.52 },
        { x: 0.39, y: 0.22, w: 0.22, h: 0.52 },
        { x: 0.64, y: 0.22, w: 0.22, h: 0.52 },
      ],
    },
  },
  "colors-worksheets": {
    id: "colors-worksheets",
    image: "/assets/gallery/colors-worksheets.jpg",
    cards: [
      { activityId: "colors-matching" },
      { activityId: "colors-matching" },
      { activityId: "colors-matching" },
    ],
    zones: {
      back: { x: 0.02, y: 0.04, w: 0.08, h: 0.18 },
      play: { x: 0.84, y: 0.04, w: 0.08, h: 0.18 },
      download: { x: 0.28, y: 0.78, w: 0.44, h: 0.16 },
      cardSlots: [
        { x: 0.1, y: 0.18, w: 0.26, h: 0.56 },
        { x: 0.37, y: 0.18, w: 0.26, h: 0.56 },
        { x: 0.64, y: 0.18, w: 0.26, h: 0.56 },
      ],
    },
  },
  "numbers-worksheets": {
    id: "numbers-worksheets",
    image: "/assets/gallery/numbers-worksheets.jpg",
    cards: [
      { activityId: "num-spelling" },
      { activityId: "num-spelling" },
      { activityId: "num-spelling" },
    ],
    zones: {
      back: { x: 0.02, y: 0.04, w: 0.08, h: 0.18 },
      play: { x: 0.84, y: 0.04, w: 0.08, h: 0.18 },
      download: { x: 0.28, y: 0.78, w: 0.44, h: 0.16 },
      cardSlots: [
        { x: 0.12, y: 0.2, w: 0.24, h: 0.55 },
        { x: 0.38, y: 0.2, w: 0.24, h: 0.55 },
        { x: 0.64, y: 0.2, w: 0.24, h: 0.55 },
      ],
    },
  },
};

export function getGallery(id: GalleryId) {
  return galleries[id];
}
