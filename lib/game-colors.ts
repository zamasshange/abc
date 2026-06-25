/** Vibrant preschool game palette — ring (dark), base, light (highlight surface), shadow */
export const gameColors = {
  pink: {
    ring: "var(--game-pink-ring)",
    base: "var(--game-pink)",
    light: "var(--game-pink-light)",
    shadow: "var(--game-pink-shadow)",
  },
  purple: {
    ring: "var(--game-purple-ring)",
    base: "var(--game-purple)",
    light: "var(--game-purple-light)",
    shadow: "var(--game-purple-shadow)",
  },
  orange: {
    ring: "var(--game-orange-ring)",
    base: "var(--game-orange)",
    light: "var(--game-orange-light)",
    shadow: "var(--game-orange-shadow)",
  },
  blue: {
    ring: "var(--game-blue-ring)",
    base: "var(--game-blue)",
    light: "var(--game-blue-light)",
    shadow: "var(--game-blue-shadow)",
  },
  green: {
    ring: "var(--game-green-ring)",
    base: "var(--game-green)",
    light: "var(--game-green-light)",
    shadow: "var(--game-green-shadow)",
  },
  yellow: {
    ring: "var(--game-yellow-ring)",
    base: "var(--game-yellow)",
    light: "var(--game-yellow-light)",
    shadow: "var(--game-yellow-shadow)",
  },
  red: {
    ring: "var(--game-red-ring)",
    base: "var(--game-red)",
    light: "var(--game-red-light)",
    shadow: "var(--game-red-shadow)",
  },
} as const;

export type GameColorName = keyof typeof gameColors;

export function getGameColor(name: GameColorName) {
  return gameColors[name];
}
