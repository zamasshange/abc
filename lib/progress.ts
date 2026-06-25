/** Learning progress — letters, stars, avatars, streaks, My World */

import {
  type AvatarId,
  type AchievementId,
  type DailyChallengeType,
  ACHIEVEMENTS,
  CATEGORY_TOTALS,
  STARS_PER_ACTIVITY,
  STARS_PER_CHEST,
  getDailyChallengeForDate,
} from "./my-world";

export type ProgressState = {
  lettersUpper: Record<string, boolean>;
  lettersLower: Record<string, boolean>;
  numbers: Record<string, boolean>;
  lines: Record<string, boolean>;
  shapes: Record<string, boolean>;
  colors: Record<string, boolean>;
  connect: Record<string, boolean>;
  mazes: Record<string, boolean>;
  worksheets: number;
  activitiesCompleted: number;
  streak: number;
  lastVisit: string;
  totalMinutes: number;
  /** My World */
  avatarId: AvatarId;
  totalStars: number;
  unlockedAvatars: AvatarId[];
  stickers: string[];
  achievements: AchievementId[];
  chestsOpened: number;
  dailyChallengeDate: string;
  dailyChallengeType: DailyChallengeType;
  dailyChallengeProgress: number;
  dailyChallengeDone: boolean;
  todayActivityCount: number;
};

const STORAGE_KEY = "abc-preschool-progress";
const PROGRESS_EVENT = "abc-progress-updated";

const defaultState = (): ProgressState => ({
  lettersUpper: {},
  lettersLower: {},
  numbers: {},
  lines: {},
  shapes: {},
  colors: {},
  connect: {},
  mazes: {},
  worksheets: 0,
  activitiesCompleted: 0,
  streak: 0,
  lastVisit: "",
  totalMinutes: 0,
  avatarId: "mascot",
  totalStars: 0,
  unlockedAvatars: ["mascot", "boy", "girl", "animal"],
  stickers: [],
  achievements: [],
  chestsOpened: 0,
  dailyChallengeDate: "",
  dailyChallengeType: "trace-letters",
  dailyChallengeProgress: 0,
  dailyChallengeDone: false,
  todayActivityCount: 0,
});

function notify() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(PROGRESS_EVENT));
  }
}

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return syncDailyChallenge(defaultState());
    return syncDailyChallenge({ ...defaultState(), ...JSON.parse(raw) });
  } catch {
    return syncDailyChallenge(defaultState());
  }
}

export function saveProgress(state: ProgressState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  notify();
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function syncDailyChallenge(state: ProgressState): ProgressState {
  const today = todayStr();
  if (state.dailyChallengeDate === today) return state;
  const def = getDailyChallengeForDate(today);
  return {
    ...state,
    dailyChallengeDate: today,
    dailyChallengeType: def.type,
    dailyChallengeProgress: 0,
    dailyChallengeDone: false,
    todayActivityCount: 0,
  };
}

function touchVisit(state: ProgressState): ProgressState {
  const today = todayStr();
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  let streak = state.streak;
  if (state.lastVisit === today) {
    /* same day */
  } else if (state.lastVisit === yesterday) {
    streak += 1;
  } else if (state.lastVisit) {
    streak = 1;
  } else {
    streak = 1;
  }
  return { ...state, lastVisit: today, streak };
}

function checkAchievements(state: ProgressState): ProgressState {
  const unlocked = new Set(state.achievements);
  const upper = countCompleted(state.lettersUpper);
  const lower = countCompleted(state.lettersLower);
  const nums = countCompleted(state.numbers);
  const shapes = countCompleted(state.shapes);
  const colors = countCompleted(state.colors) + countCompleted(state.connect);
  const mazes = countCompleted(state.mazes);

  if (upper + lower >= 20) unlocked.add("abc-master");
  if (nums >= 10) unlocked.add("number-hero");
  if (shapes >= 4) unlocked.add("shape-explorer");
  if (colors >= 5) unlocked.add("color-wizard");
  if (mazes >= 3) unlocked.add("maze-champion");
  if (state.activitiesCompleted >= 15) unlocked.add("creative-artist");

  return { ...state, achievements: [...unlocked] };
}

function bumpDailyChallenge(state: ProgressState, type: DailyChallengeType): ProgressState {
  if (state.dailyChallengeDone || state.dailyChallengeType !== type) return state;
  const def = getDailyChallengeForDate(todayStr());
  const progress = state.dailyChallengeProgress + 1;
  if (progress >= def.goal) {
    return {
      ...state,
      dailyChallengeProgress: progress,
      dailyChallengeDone: true,
      totalStars: state.totalStars + def.bonusStars,
    };
  }
  return { ...state, dailyChallengeProgress: progress };
}

function activityChallengeType(
  category: keyof Pick<ProgressState, "lettersUpper" | "lettersLower" | "numbers" | "lines" | "shapes" | "colors" | "connect" | "mazes">,
): DailyChallengeType | null {
  if (category === "lettersUpper" || category === "lettersLower") return "trace-letters";
  if (category === "numbers") return "numbers";
  if (category === "mazes") return "mazes";
  if (category === "colors" || category === "connect") return "color";
  return null;
}

export function markComplete(
  category: keyof Pick<
    ProgressState,
    "lettersUpper" | "lettersLower" | "numbers" | "lines" | "shapes" | "colors" | "connect" | "mazes"
  >,
  id: string,
): ProgressState {
  let state = syncDailyChallenge(touchVisit(loadProgress()));
  if (state[category][id]) return state;

  const bucket = { ...state[category], [id]: true };
  state = {
    ...state,
    [category]: bucket,
    activitiesCompleted: state.activitiesCompleted + 1,
    todayActivityCount: state.todayActivityCount + 1,
    totalStars: state.totalStars + STARS_PER_ACTIVITY,
  };

  const challengeType = activityChallengeType(category);
  if (challengeType) state = bumpDailyChallenge(state, challengeType);

  state = checkAchievements(state);
  saveProgress(state);
  return state;
}

export function setAvatar(id: AvatarId): ProgressState {
  const state = loadProgress();
  if (!state.unlockedAvatars.includes(id)) return state;
  const next = { ...state, avatarId: id };
  saveProgress(next);
  return next;
}

export function unlockAvatar(id: AvatarId): ProgressState {
  const state = loadProgress();
  if (state.unlockedAvatars.includes(id)) return state;
  const next = { ...state, unlockedAvatars: [...state.unlockedAvatars, id] };
  saveProgress(next);
  return next;
}

export function openRewardChest(): { state: ProgressState; reward: string; emoji: string } | null {
  let state = loadProgress();
  const chestsAvailable = Math.floor(state.totalStars / STARS_PER_CHEST) - state.chestsOpened;
  if (chestsAvailable <= 0) return null;

  const roll = state.chestsOpened % 4;
  let reward = "Bonus Stars!";
  let emoji = "⭐";

  if (roll === 0) {
    state = { ...state, totalStars: state.totalStars + 5 };
    reward = "Bonus Stars!";
    emoji = "⭐";
  } else if (roll === 1) {
    const sticker = ["🦄", "🌈", "🍭", "🦋", "🌟"][state.stickers.length % 5];
    state = { ...state, stickers: [...state.stickers, sticker] };
    reward = "New Sticker!";
    emoji = sticker;
  } else if (roll === 2) {
    const locked = (["robot", "dinosaur", "space"] as AvatarId[]).find((a) => !state.unlockedAvatars.includes(a));
    if (locked) {
      state = { ...state, unlockedAvatars: [...state.unlockedAvatars, locked] };
      reward = "New Avatar!";
      emoji = AVATAR_EMOJI[locked];
    } else {
      state = { ...state, totalStars: state.totalStars + 8 };
      reward = "Bonus Stars!";
      emoji = "⭐";
    }
  } else {
    reward = "Super Dance!";
    emoji = "🎉";
  }

  state = { ...state, chestsOpened: state.chestsOpened + 1 };
  saveProgress(state);
  return { state, reward, emoji };
}

const AVATAR_EMOJI: Record<AvatarId, string> = {
  mascot: "🐼",
  boy: "👦",
  girl: "👧",
  animal: "🐻",
  robot: "🤖",
  dinosaur: "🦕",
  space: "🚀",
};

export function countCompleted(map: Record<string, boolean>) {
  return Object.values(map).filter(Boolean).length;
}

export type BadgeLevel = "bronze" | "silver" | "gold" | "master";

export function getBadgeLevel(state: ProgressState): BadgeLevel | null {
  const letters = countCompleted(state.lettersUpper) + countCompleted(state.lettersLower);
  const numbers = countCompleted(state.numbers);
  const total = letters + numbers + state.activitiesCompleted;
  if (total >= 80) return "master";
  if (total >= 40) return "gold";
  if (total >= 15) return "silver";
  if (total >= 5) return "bronze";
  return null;
}

export function getCategoryPercent(state: ProgressState, key: keyof typeof CATEGORY_TOTALS): number {
  let done = 0;
  if (key === "alphabets") {
    done = countCompleted(state.lettersUpper) + countCompleted(state.lettersLower);
  } else if (key === "numbers") done = countCompleted(state.numbers);
  else if (key === "shapes") done = countCompleted(state.shapes);
  else if (key === "colors") done = countCompleted(state.colors) + countCompleted(state.connect);
  else if (key === "lines") done = countCompleted(state.lines);
  else if (key === "mazes") done = countCompleted(state.mazes);
  return Math.min(100, Math.round((done / CATEGORY_TOTALS[key]) * 100));
}

export function getChestsReady(state: ProgressState) {
  return Math.max(0, Math.floor(state.totalStars / STARS_PER_CHEST) - state.chestsOpened);
}

export function getProgressSummary(state: ProgressState) {
  return {
    lettersUpper: countCompleted(state.lettersUpper),
    lettersLower: countCompleted(state.lettersLower),
    numbers: countCompleted(state.numbers),
    lines: countCompleted(state.lines),
    shapes: countCompleted(state.shapes),
    activitiesCompleted: state.activitiesCompleted,
    streak: state.streak,
    badge: getBadgeLevel(state),
    totalStars: state.totalStars,
    avatarId: state.avatarId,
    achievements: state.achievements,
    chestsReady: getChestsReady(state),
  };
}

export function subscribeProgress(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener(PROGRESS_EVENT, handler);
  return () => window.removeEventListener(PROGRESS_EVENT, handler);
}

export { ACHIEVEMENTS };
