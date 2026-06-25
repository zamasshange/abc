import type { CategoryId } from "./theme";
import type { GalleryId } from "./galleries";
import { getGallery } from "./galleries";
import { getPracticeCardKind } from "./practice-gallery";

/** Mirrors GunjanApps ABC Preschool: each activity opens its own screen type */
export type AppScreen =
  | "splash"
  | "home"
  | "my-world"
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
  | "colors-how-to-draw"
  | "connect-ditto"
  | "connect-match"
  | "connect-jigsaw"
  | "connect-tracing"
  | "alpha-practice"
  | "alpha-worksheets"
  | "alpha-cursive-upper"
  | "alpha-cursive-lower"
  | "alpha-letter-match"
  | "alpha-match"
  | "alpha-jigsaw"
  | "num-worksheets"
  | "num-match"
  | "num-jigsaw";

export type ScreenTarget = {
  screen: AppScreen;
  categoryId?: CategoryId;
  activityId?: ActivityId;
  galleryId?: GalleryId;
  pageId?: string;
};

const routes: Record<string, ScreenTarget> = {
  "lines:dots": { screen: "gallery", galleryId: "lines-dots", categoryId: "lines" },
  "lines:line": { screen: "gallery", galleryId: "lines-line", categoryId: "lines" },
  "lines:curve": { screen: "gallery", galleryId: "lines-curve", categoryId: "lines" },
  "lines:practice": { screen: "gallery", galleryId: "lines-practice", categoryId: "lines" },

  "alphabets:trace-upper": { screen: "gallery", galleryId: "alphabet-trace-upper", categoryId: "alphabets" },
  "alphabets:trace-lower": { screen: "letter-tracing", activityId: "alpha-trace-lower", categoryId: "alphabets" },
  "alphabets:uppercase": { screen: "gallery", galleryId: "alphabet-worksheets", categoryId: "alphabets" },
  "alphabets:lowercase": { screen: "letter-tracing", activityId: "alpha-trace-lower", categoryId: "alphabets" },
  "alphabets:practice": { screen: "letter-tracing", activityId: "alpha-practice", categoryId: "alphabets" },
  "alphabets:worksheets": { screen: "gallery", galleryId: "alphabet-worksheets", categoryId: "alphabets" },
  "alphabets:cursive-upper": { screen: "letter-tracing", activityId: "alpha-cursive-upper", categoryId: "alphabets" },
  "alphabets:cursive-lower": { screen: "letter-tracing", activityId: "alpha-cursive-lower", categoryId: "alphabets" },
  "alphabets:letter-match": { screen: "matching", activityId: "alpha-letter-match", categoryId: "alphabets" },
  "alphabets:match": { screen: "matching", activityId: "alpha-match", categoryId: "alphabets" },
  "alphabets:jigsaw": { screen: "matching", activityId: "alpha-jigsaw", categoryId: "alphabets" },

  "numbers:tracing": { screen: "letter-tracing", activityId: "num-tracing", categoryId: "numbers" },
  "numbers:counting": { screen: "matching", activityId: "num-counting", categoryId: "numbers" },
  "numbers:practice": { screen: "line-tracing", activityId: "num-practice", categoryId: "numbers" },
  "numbers:spelling": { screen: "letter-tracing", activityId: "num-spelling", categoryId: "numbers" },
  "numbers:worksheets": { screen: "gallery", galleryId: "numbers-worksheets", categoryId: "numbers" },
  "numbers:match": { screen: "matching", activityId: "num-match", categoryId: "numbers" },
  "numbers:jigsaw": { screen: "matching", activityId: "num-jigsaw", categoryId: "numbers" },

  "shapes:learn": { screen: "learn-to-draw", activityId: "shapes-learn", categoryId: "shapes" },
  "shapes:practice": { screen: "free-draw", activityId: "shapes-practice", categoryId: "shapes" },
  "shapes:drawings": { screen: "free-draw", activityId: "shapes-drawings", categoryId: "shapes" },
  "shapes:worksheets": { screen: "gallery", galleryId: "shapes-worksheets", categoryId: "shapes" },

  "connect:practice": { screen: "connect-dots", activityId: "connect-practice", categoryId: "connect" },
  "connect:easy": { screen: "connect-dots", activityId: "connect-easy", categoryId: "connect" },
  "connect:hard": { screen: "connect-dots", activityId: "connect-hard", categoryId: "connect" },
  "connect:learn": { screen: "learn-to-draw", activityId: "connect-learn", categoryId: "connect" },
  "connect:ditto": { screen: "line-tracing", activityId: "connect-ditto", categoryId: "connect" },
  "connect:match": { screen: "matching", activityId: "connect-match", categoryId: "connect" },
  "connect:jigsaw": { screen: "matching", activityId: "connect-jigsaw", categoryId: "connect" },
  "connect:tracing": { screen: "line-tracing", activityId: "connect-tracing", categoryId: "connect" },

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
  if (galleryId === "alphabet-trace-upper" || galleryId === "alphabet-worksheets") {
    return { screen: "letter-tracing", activityId, categoryId, pageId: cardId };
  }
  if (galleryId === "numbers-worksheets" && !card.locked) {
    return { screen: "letter-tracing", activityId, categoryId };
  }
  if (galleryId === "shapes-worksheets" && !card.locked) {
    return { screen: "learn-to-draw", activityId, categoryId };
  }
  if (galleryId === "lines-dots" || galleryId === "lines-line" || galleryId === "lines-curve" || galleryId === "lines-worksheets") {
    return { screen: "line-tracing", activityId, categoryId, pageId: cardId };
  }
  if (galleryId === "lines-practice") {
    const kind = getPracticeCardKind(cardId);
    if (kind === "path") {
      return { screen: "line-tracing", activityId, categoryId, pageId: cardId };
    }
    return { screen: "matching", activityId, categoryId, pageId: cardId };
  }
  return null;
}

/** @deprecated alias */
export type DrawingTemplateId = ActivityId;
