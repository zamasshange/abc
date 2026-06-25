/** Learning progress — letters, numbers, activities, streaks, badges */

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
};

const STORAGE_KEY = "abc-preschool-progress";

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
});

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

export function saveProgress(state: ProgressState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function touchVisit(state: ProgressState): ProgressState {
  const today = new Date().toISOString().slice(0, 10);
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

export function markComplete(
  category: keyof Pick<
    ProgressState,
    "lettersUpper" | "lettersLower" | "numbers" | "lines" | "shapes" | "colors" | "connect" | "mazes"
  >,
  id: string,
): ProgressState {
  let state = touchVisit(loadProgress());
  const bucket = { ...state[category], [id]: true };
  state = {
    ...state,
    [category]: bucket,
    activitiesCompleted: state.activitiesCompleted + 1,
  };
  saveProgress(state);
  return state;
}

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
  };
}
