/** Letter/number sequences for tracing activities (GunjanApps ABC Preschool) */

export const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const LOWERCASE = "abcdefghijklmnopqrstuvwxyz".split("");
export const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export function getTracingPages(activityId: string, startPageId?: string): string[] {
  if (activityId === "alpha-trace-upper" || activityId === "alpha-upper") return UPPERCASE;
  if (activityId === "alpha-trace-lower" || activityId === "alpha-lower") return LOWERCASE;
  if (activityId.startsWith("num-")) return NUMBERS;
  if (startPageId && UPPERCASE.includes(startPageId.toUpperCase())) return UPPERCASE;
  return UPPERCASE;
}

export function initialPageIndex(pages: string[], pageId?: string): number {
  if (!pageId) return 0;
  const single = pageId.length === 1 ? pageId : pageId;
  const idx = pages.findIndex((p) => p.toLowerCase() === single.toLowerCase());
  return idx >= 0 ? idx : 0;
}

/** Phonics label spoken on letter tap (browser TTS stub) */
export function speakLetter(char: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const text = char.length === 1 && /[a-zA-Z]/.test(char) ? char : char;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
}
