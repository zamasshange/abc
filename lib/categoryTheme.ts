import {
  Apple,
  Hash,
  Map,
  Palette,
  Route,
  Shapes,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { CategoryId } from "./theme";

export type CategoryTheme = {
  icon: LucideIcon;
  iconGradient: string;
  cardGradient: string;
  glowColor: string;
};

export const categoryThemes: Record<CategoryId, CategoryTheme> = {
  colors: {
    icon: Palette,
    iconGradient: "from-orange-400 to-orange-500",
    cardGradient: "from-orange-400 via-orange-500 to-orange-600",
    glowColor: "rgba(249, 115, 22, 0.55)",
  },
  connect: {
    icon: Route,
    iconGradient: "from-pink-400 to-pink-500",
    cardGradient: "from-pink-400 via-pink-500 to-pink-600",
    glowColor: "rgba(236, 72, 153, 0.55)",
  },
  mazes: {
    icon: Map,
    iconGradient: "from-green-400 to-green-500",
    cardGradient: "from-green-400 via-green-500 to-emerald-600",
    glowColor: "rgba(34, 197, 94, 0.55)",
  },
  lines: {
    icon: Waves,
    iconGradient: "from-lime-400 to-lime-500",
    cardGradient: "from-lime-400 via-lime-500 to-lime-600",
    glowColor: "rgba(132, 204, 22, 0.55)",
  },
  alphabets: {
    icon: Apple,
    iconGradient: "from-cyan-400 to-sky-500",
    cardGradient: "from-cyan-400 via-sky-400 to-sky-500",
    glowColor: "rgba(14, 165, 233, 0.55)",
  },
  numbers: {
    icon: Hash,
    iconGradient: "from-yellow-400 to-amber-500",
    cardGradient: "from-yellow-400 via-amber-400 to-amber-500",
    glowColor: "rgba(245, 158, 11, 0.55)",
  },
  shapes: {
    icon: Shapes,
    iconGradient: "from-rose-300 to-pink-400",
    cardGradient: "from-rose-300 via-pink-400 to-pink-500",
    glowColor: "rgba(244, 114, 182, 0.55)",
  },
};
