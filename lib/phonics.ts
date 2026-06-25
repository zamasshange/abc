/** Letter → sound → word → object (phonics learning flow) */

export type PhonicsEntry = {
  letter: string;
  word: string;
  emoji: string;
};

export const PHONICS: Record<string, PhonicsEntry> = {
  A: { letter: "A", word: "Apple", emoji: "🍎" },
  B: { letter: "B", word: "Ball", emoji: "⚽" },
  C: { letter: "C", word: "Cat", emoji: "🐱" },
  D: { letter: "D", word: "Dog", emoji: "🐶" },
  E: { letter: "E", word: "Egg", emoji: "🥚" },
  F: { letter: "F", word: "Fish", emoji: "🐟" },
  G: { letter: "G", word: "Grapes", emoji: "🍇" },
  H: { letter: "H", word: "Hat", emoji: "🎩" },
  I: { letter: "I", word: "Ice cream", emoji: "🍦" },
  J: { letter: "J", word: "Juice", emoji: "🧃" },
  K: { letter: "K", word: "Kite", emoji: "🪁" },
  L: { letter: "L", word: "Lion", emoji: "🦁" },
  M: { letter: "M", word: "Moon", emoji: "🌙" },
  N: { letter: "N", word: "Nest", emoji: "🪺" },
  O: { letter: "O", word: "Orange", emoji: "🍊" },
  P: { letter: "P", word: "Penguin", emoji: "🐧" },
  Q: { letter: "Q", word: "Queen", emoji: "👑" },
  R: { letter: "R", word: "Rabbit", emoji: "🐰" },
  S: { letter: "S", word: "Sun", emoji: "☀️" },
  T: { letter: "T", word: "Tree", emoji: "🌳" },
  U: { letter: "U", word: "Umbrella", emoji: "☂️" },
  V: { letter: "V", word: "Violin", emoji: "🎻" },
  W: { letter: "W", word: "Whale", emoji: "🐋" },
  X: { letter: "X", word: "Xylophone", emoji: "🎵" },
  Y: { letter: "Y", word: "Yacht", emoji: "⛵" },
  Z: { letter: "Z", word: "Zebra", emoji: "🦓" },
};

export const NUMBER_WORDS: Record<string, { word: string; emoji: string; count: string }> = {
  "1": { word: "One", emoji: "⭐", count: "⭐" },
  "2": { word: "Two", emoji: "🍒", count: "🍒🍒" },
  "3": { word: "Three", emoji: "🎈", count: "🎈🎈🎈" },
  "4": { word: "Four", emoji: "🐶", count: "🐶🐶🐶🐶" },
  "5": { word: "Five", emoji: "⭐", count: "⭐⭐⭐⭐⭐" },
  "6": { word: "Six", emoji: "🍎", count: "🍎🍎🍎🍎🍎🍎" },
  "7": { word: "Seven", emoji: "🌈", count: "🌈×7" },
  "8": { word: "Eight", emoji: "🐙", count: "🐙×8" },
  "9": { word: "Nine", emoji: "🎵", count: "🎵×9" },
  "10": { word: "Ten", emoji: "👐", count: "🖐️🖐️" },
  "11": { word: "Eleven", emoji: "🌟", count: "🌟×11" },
  "12": { word: "Twelve", emoji: "🥚", count: "🥚×12" },
  "13": { word: "Thirteen", emoji: "🍀", count: "🍀×13" },
  "14": { word: "Fourteen", emoji: "🦋", count: "🦋×14" },
  "15": { word: "Fifteen", emoji: "🌸", count: "🌸×15" },
  "16": { word: "Sixteen", emoji: "🐝", count: "🐝×16" },
  "17": { word: "Seventeen", emoji: "🍋", count: "🍋×17" },
  "18": { word: "Eighteen", emoji: "🐢", count: "🐢×18" },
  "19": { word: "Nineteen", emoji: "🦊", count: "🦊×19" },
  "20": { word: "Twenty", emoji: "🎉", count: "🎉×20" },
};

export function getPhonics(letter: string): PhonicsEntry | null {
  const key = letter.toUpperCase();
  return PHONICS[key] ?? null;
}

export function getNumberPhonics(num: string) {
  return NUMBER_WORDS[num] ?? { word: num, emoji: "🔢", count: num };
}
