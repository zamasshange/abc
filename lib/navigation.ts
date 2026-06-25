import type { CategoryId } from "./theme";
import type { GalleryId } from "./galleries";
import { getGallery } from "./galleries";

/** Mirrors GunjanApps ABC Preschool: each activity opens its own screen type */
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
  | "free-draw";

export type ActivityId =
  | "lines-dots"
  | "lines-line"
  | "lines-curve"
  | "lines-practice"
  | "alpha-trace-upper"
  | "alpha-trace-lower"
  | "alpha-upper"
  | "alpha-lower"
  | "num-tracing"
  | "num-counting"
  | "num-practice"
  | "num-spelling"
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
  | "colors-how-to-draw";

export type ScreenTarget = {
  screen: AppScreen;
  categoryId?: CategoryId;
  activityId?: ActivityId;
  galleryId?: GalleryId;
  pageId?: string;
};

const routes: Record<string, ScreenTarget> = {
  "lines:dots": { screen: "line-tracing", activityId: "lines-dots", categoryId: "lines" },
  "lines:line": { screen: "line-tracing", activityId: "lines-line", categoryId: "lines" },
  "lines:curve": { screen: "line-tracing", activityId: "lines-curve", categoryId: "lines" },
  "lines:practice": { screen: "line-tracing", activityId: "lines-practice", categoryId: "lines" },

  "alphabets:trace-upper": { screen: "letter-tracing", activityId: "alpha-trace-upper", categoryId: "alphabets" },
  "alphabets:trace-lower": { screen: "letter-tracing", activityId: "alpha-trace-lower", categoryId: "alphabets" },
  "alphabets:uppercase": { screen: "gallery", galleryId: "alphabet-worksheets", categoryId: "alphabets" },
  "alphabets:lowercase": { screen: "letter-tracing", activityId: "alpha-trace-lower", categoryId: "alphabets" },

  "numbers:tracing": { screen: "letter-tracing", activityId: "num-tracing", categoryId: "numbers" },
  "numbers:counting": { screen: "matching", activityId: "num-counting", categoryId: "numbers" },
  "numbers:practice": { screen: "line-tracing", activityId: "num-practice", categoryId: "numbers" },
  "numbers:spelling": { screen: "letter-tracing", activityId: "num-spelling", categoryId: "numbers" },

  "shapes:learn": { screen: "learn-to-draw", activityId: "shapes-learn", categoryId: "shapes" },
  "shapes:practice": { screen: "free-draw", activityId: "shapes-practice", categoryId: "shapes" },
  "shapes:drawings": { screen: "free-draw", activityId: "shapes-drawings", categoryId: "shapes" },
  "shapes:worksheets": { screen: "gallery", galleryId: "shapes-worksheets", categoryId: "shapes" },

  "connect:practice": { screen: "gallery", galleryId: "connect-worksheets", categoryId: "connect" },
  "connect:easy": { screen: "connect-dots", activityId: "connect-easy", categoryId: "connect" },
  "connect:hard": { screen: "connect-dots", activityId: "connect-hard", categoryId: "connect" },
  "connect:learn": { screen: "learn-to-draw", activityId: "connect-learn", categoryId: "connect" },
  "connect:shape-draw": { screen: "learn-to-draw", activityId: "shapes-learn", categoryId: "connect" },
  "connect:number-draw": { screen: "letter-tracing", activityId: "num-tracing", categoryId: "connect" },

  "mazes:worksheets": { screen: "gallery", galleryId: "mazes-worksheets", categoryId: "mazes" },
  "mazes:numbers": { screen: "maze", activityId: "mazes-numbers", categoryId: "mazes" },
  "mazes:match": { screen: "maze", activityId: "mazes-match", categoryId: "mazes" },
  "mazes:shapes": { screen: "maze", activityId: "mazes-shapes", categoryId: "mazes" },
  "mazes:practice": { screen: "maze", activityId: "mazes-practice", categoryId: "mazes" },
  "mazes:easy": { screen: "maze", activityId: "mazes-easy", categoryId: "mazes" },
  "mazes:hard": { screen: "maze", activityId: "mazes-hard", categoryId: "mazes" },

  "colors:worksheets": { screen: "gallery", galleryId: "printables", categoryId: "colors" },
  "colors:pixel-art": { screen: "gallery", galleryId: "pixel-art-pick", categoryId: "colors" },
  "colors:how-to-draw": { screen: "learn-to-draw", activityId: "colors-how-to-draw", categoryId: "colors" },
  "colors:create": { screen: "free-draw", activityId: "colors-create", categoryId: "colors" },
  "colors:pair": { screen: "matching", activityId: "colors-pair", categoryId: "colors" },
  "colors:matching": { screen: "matching", activityId: "colors-pair", categoryId: "colors" },
  "colors:fill": { screen: "pixel-art", activityId: "pixel-orange", categoryId: "colors" },
  "colors:practice": { screen: "gallery", galleryId: "connect-worksheets", categoryId: "colors" },
  "colors:learn": { screen: "learn-to-draw", activityId: "connect-learn", categoryId: "colors" },
};

export function getScreenForCard(categoryId: CategoryId, cardId: string): ScreenTarget {
  return routes[`${categoryId}:${cardId}`] ?? { screen: "home", categoryId };
}

export function getScreenForGalleryCard(
  galleryId: GalleryId,
  cardId: string,
  categoryId: CategoryId,
): ScreenTarget | null {
  const card = getGallery(galleryId).cards.find((c) => c.id === cardId);
  if (!card?.activityId) return null;
  const activityId = card.activityId as ActivityId;

  if (galleryId === "connect-worksheets" || galleryId === "printables") {
    return { screen: "connect-dots", activityId, categoryId };
  }
  if (galleryId === "pixel-art-pick") return { screen: "pixel-art", activityId, categoryId };
  if (galleryId === "mazes-worksheets") return { screen: "maze", activityId, categoryId };
  if (galleryId === "alphabet-worksheets") {
    return { screen: "letter-tracing", activityId, categoryId, pageId: cardId };
  }
  if (galleryId === "shapes-worksheets" && !card.locked) {
    return { screen: "learn-to-draw", activityId, categoryId };
  }
  if (galleryId === "lines-worksheets") return { screen: "line-tracing", activityId, categoryId };
  return null;
}

/** @deprecated alias */
export type DrawingTemplateId = ActivityId;
