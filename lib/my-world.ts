/** My World — avatars, achievements, daily challenges, chest rewards */

export type AvatarId = "mascot" | "boy" | "girl" | "animal" | "robot" | "dinosaur" | "space";

export type AchievementId =
  | "abc-master"
  | "number-hero"
  | "shape-explorer"
  | "color-wizard"
  | "maze-champion"
  | "creative-artist";

export type DailyChallengeType = "trace-letters" | "mazes" | "color" | "numbers";

export const AVATARS: { id: AvatarId; label: string; emoji: string; unlockStars?: number }[] = [
  { id: "mascot", label: "Panda", emoji: "🐼" },
  { id: "boy", label: "Boy", emoji: "👦" },
  { id: "girl", label: "Girl", emoji: "👧" },
  { id: "animal", label: "Animal", emoji: "🐻" },
  { id: "robot", label: "Robot", emoji: "🤖", unlockStars: 20 },
  { id: "dinosaur", label: "Dino", emoji: "🦕", unlockStars: 40 },
  { id: "space", label: "Space", emoji: "🚀", unlockStars: 60 },
];

export const ACHIEVEMENTS: {
  id: AchievementId;
  title: string;
  emoji: string;
  color: string;
}[] = [
  { id: "abc-master", title: "ABC Master", emoji: "🔤", color: "#33D6F5" },
  { id: "number-hero", title: "Number Hero", emoji: "🔢", color: "#FFCC00" },
  { id: "shape-explorer", title: "Shape Explorer", emoji: "🔷", color: "#FF8080" },
  { id: "color-wizard", title: "Color Wizard", emoji: "🎨", color: "#BA68C8" },
  { id: "maze-champion", title: "Maze Champion", emoji: "🏆", color: "#33CC99" },
  { id: "creative-artist", title: "Creative Artist", emoji: "✏️", color: "#FF9933" },
];

export const CATEGORY_TOTALS = {
  alphabets: 52,
  numbers: 20,
  shapes: 8,
  colors: 12,
  lines: 12,
  mazes: 10,
} as const;

export type DailyChallengeDef = {
  type: DailyChallengeType;
  label: string;
  goal: number;
  bonusStars: number;
};

const DAILY_POOL: DailyChallengeDef[] = [
  { type: "trace-letters", label: "Trace 5 Letters", goal: 5, bonusStars: 10 },
  { type: "mazes", label: "Complete 2 Mazes", goal: 2, bonusStars: 10 },
  { type: "color", label: "Color 1 Picture", goal: 1, bonusStars: 8 },
  { type: "numbers", label: "Learn 3 Numbers", goal: 3, bonusStars: 10 },
];

export function getDailyChallengeForDate(dateStr: string): DailyChallengeDef {
  const day = dateStr.split("-").reduce((a, b) => a + parseInt(b, 10), 0);
  return DAILY_POOL[day % DAILY_POOL.length];
}

export const STARS_PER_ACTIVITY = 3;
export const STARS_PER_CHEST = 20;

export const CHEST_REWARDS = [
  { type: "stars" as const, label: "Bonus Stars!", emoji: "⭐", amount: 5 },
  { type: "sticker" as const, label: "Cool Sticker!", emoji: "🌟" },
  { type: "avatar" as const, label: "New Avatar!", emoji: "🎭" },
  { type: "celebration" as const, label: "Super Dance!", emoji: "🎉" },
];
