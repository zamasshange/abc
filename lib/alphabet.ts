/** Letter/number sequences for tracing activities */

export const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const LOWERCASE = "abcdefghijklmnopqrstuvwxyz".split("");
export const NUMBERS = Array.from({ length: 20 }, (_, i) => String(i + 1));

export function getTracingPages(activityId: string, startPageId?: string): string[] {
  if (activityId === "alpha-practice") return UPPERCASE;
  if (activityId === "alpha-trace-upper" || activityId === "alpha-upper" || activityId === "alpha-cursive-upper") return UPPERCASE;
  if (activityId === "alpha-trace-lower" || activityId === "alpha-lower" || activityId === "alpha-cursive-lower") return LOWERCASE;
  if (activityId.startsWith("num-")) return NUMBERS;
  if (startPageId && UPPERCASE.includes(startPageId.toUpperCase())) return UPPERCASE;
  return UPPERCASE;
}

export function initialPageIndex(pages: string[], pageId?: string): number {
  if (!pageId) return 0;
  const idx = pages.findIndex((p) => p.toLowerCase() === pageId.toLowerCase());
  return idx >= 0 ? idx : 0;
}

export function isNumberActivity(activityId: string) {
  return activityId.startsWith("num-");
}

export function isLowerActivity(activityId: string) {
  return activityId.includes("lower") || activityId === "alpha-cursive-lower";
}

/** @deprecated use speakLetter from @/lib/audio */
export { speakLetter } from "./audio";
