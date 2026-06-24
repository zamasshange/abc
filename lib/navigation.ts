import type { CategoryId } from "./theme";
import type { GalleryId } from "./galleries";
import { getGallery } from "./galleries";

export type AppScreen =
  | "splash"
  | "home"
  | "gallery"
  | "line-tracing"
  | "letter-tracing"
  | "maze"
  | "connect-dots"
  | "learn-to-draw"
  | "matching"
  | "pixel-art"
  | "free-draw"
  | "letter-match"
  | "jigsaw";

export type ActivityId =
  | "lines-dots"
  | "lines-line"
  | "lines-curve"
  | "lines-practice"
  | "alpha-cursive"
  | "alpha-letter-match"
  | "alpha-match"
  | "alpha-jigsaw"
  | "num-spelling"
  | "num-worksheets"
  | "num-match"
  | "num-jigsaw"
  | "shapes-learn"
  | "shapes-practice"
  | "shapes-drawings"
  | "connect-practice"
  | "connect-easy"
  | "connect-hard"
  | "connect-learn"
  | "mazes-practice"
  | "mazes-easy"
  | "mazes-hard"
  | "mazes-numbers"
  | "mazes-match"
  | "mazes-shapes"
  | "pixel-orange"
  | "pixel-tree"
  | "pixel-whale"
  | "colors-pair"
  | "colors-create"
  | "colors-how-to-draw"
  | "colors-fill"
  | "colors-matching";

export type ScreenTarget = {
  screen: AppScreen;
  categoryId?: CategoryId;
  activityId?: ActivityId;
  galleryId?: GalleryId;
};

const cardRoutes: Record<string, ScreenTarget> = {
  "lines:dots": { screen: "line-tracing", activityId: "lines-dots", categoryId: "lines" },
  "lines:line": { screen: "line-tracing", activityId: "lines-line", categoryId: "lines" },
  "lines:curve": { screen: "line-tracing", activityId: "lines-curve", categoryId: "lines" },
  "lines:practice": { screen: "line-tracing", activityId: "lines-practice", categoryId: "lines" },

  "alphabets:cursive": { screen: "letter-tracing", activityId: "alpha-cursive", categoryId: "alphabets" },
  "alphabets:letter-match": { screen: "letter-match", activityId: "alpha-letter-match", categoryId: "alphabets" },
  "alphabets:match": { screen: "matching", activityId: "alpha-match", categoryId: "alphabets" },
  "alphabets:jigsaw": { screen: "jigsaw", activityId: "alpha-jigsaw", categoryId: "alphabets" },

  "numbers:spelling": { screen: "letter-tracing", activityId: "num-spelling", categoryId: "numbers" },
  "numbers:worksheets": { screen: "gallery", galleryId: "numbers-worksheets", categoryId: "numbers" },
  "numbers:match": { screen: "matching", activityId: "num-match", categoryId: "numbers" },
  "numbers:jigsaw": { screen: "jigsaw", activityId: "num-jigsaw", categoryId: "numbers" },

  "shapes:learn": { screen: "learn-to-draw", activityId: "shapes-learn", categoryId: "shapes" },
  "shapes:practice": { screen: "free-draw", activityId: "shapes-practice", categoryId: "shapes" },
  "shapes:drawings": { screen: "free-draw", activityId: "shapes-drawings", categoryId: "shapes" },
  "shapes:worksheets": { screen: "gallery", galleryId: "shapes-worksheets", categoryId: "shapes" },

  "connect:practice": { screen: "gallery", galleryId: "connect-worksheets", categoryId: "connect" },
  "connect:easy": { screen: "connect-dots", activityId: "connect-easy", categoryId: "connect" },
  "connect:hard": { screen: "connect-dots", activityId: "connect-hard", categoryId: "connect" },
  "connect:learn": { screen: "learn-to-draw", activityId: "connect-learn", categoryId: "connect" },

  "mazes:practice": { screen: "maze", activityId: "mazes-practice", categoryId: "mazes" },
  "mazes:easy": { screen: "maze", activityId: "mazes-easy", categoryId: "mazes" },
  "mazes:hard": { screen: "maze", activityId: "mazes-hard", categoryId: "mazes" },
  "mazes:worksheets": { screen: "gallery", galleryId: "mazes-worksheets", categoryId: "mazes" },
  "mazes:numbers": { screen: "maze", activityId: "mazes-numbers", categoryId: "mazes" },
  "mazes:match": { screen: "maze", activityId: "mazes-match", categoryId: "mazes" },
  "mazes:shapes": { screen: "maze", activityId: "mazes-shapes", categoryId: "mazes" },

  "colors:worksheets": { screen: "gallery", galleryId: "colors-worksheets", categoryId: "colors" },
  "colors:matching": { screen: "matching", activityId: "colors-matching", categoryId: "colors" },
  "colors:fill": { screen: "pixel-art", activityId: "colors-fill", categoryId: "colors" },
  "colors:pixel-art": { screen: "gallery", galleryId: "pixel-art-pick", categoryId: "colors" },
  "colors:how-to-draw": { screen: "learn-to-draw", activityId: "colors-how-to-draw", categoryId: "colors" },
  "colors:create": { screen: "free-draw", activityId: "colors-create", categoryId: "colors" },
  "colors:pair": { screen: "matching", activityId: "colors-pair", categoryId: "colors" },
};

export function getScreenForCard(categoryId: CategoryId, cardId: string): ScreenTarget {
  return cardRoutes[`${categoryId}:${cardId}`] ?? { screen: "home", categoryId };
}

export function getScreenForGalleryCard(
  galleryId: GalleryId,
  cardIndex: number,
  categoryId: CategoryId,
): ScreenTarget | null {
  const gallery = getGallery(galleryId);
  const card = gallery.cards[cardIndex];
  if (!card?.activityId) return null;
  const activityId = card.activityId as ActivityId;

  if (galleryId.includes("connect") || galleryId === "printables" || galleryId === "mazes-worksheets") {
    return { screen: "connect-dots", activityId, categoryId };
  }
  if (galleryId === "pixel-art-pick") return { screen: "pixel-art", activityId, categoryId };
  if (galleryId === "alphabet-worksheets") return { screen: "letter-tracing", activityId: "alpha-cursive", categoryId };
  if (galleryId === "numbers-worksheets") return { screen: "letter-tracing", activityId: "num-spelling", categoryId };
  if (galleryId === "shapes-worksheets") return { screen: "learn-to-draw", activityId: "shapes-learn", categoryId };
  if (galleryId === "lines-worksheets") return { screen: "line-tracing", activityId: "lines-line", categoryId };
  if (galleryId === "colors-worksheets") return { screen: "matching", activityId: "colors-matching", categoryId };
  return null;
}

/** @deprecated */
export type DrawingTemplateId = ActivityId;
