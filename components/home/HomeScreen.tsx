"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ActivityCard } from "@/components/home/ActivityCard";
import { TopNav } from "@/components/home/TopNav";
import { categories } from "@/lib/categories";
import {
  CARD_H,
  CARD_TOP,
  GAME_HEIGHT,
  GAME_WIDTH,
  NAV_H,
  getCardLeft,
  getCardRowWidth,
} from "@/lib/device";
import { getScreenForCard } from "@/lib/navigation";
import type { ScreenTarget } from "@/lib/navigation";
import { theme, type CategoryId } from "@/lib/theme";

type HomeScreenProps = {
  initialCategory: CategoryId;
  onNavigate: (target: ScreenTarget) => void;
};

export function HomeScreen({ initialCategory, onNavigate }: HomeScreenProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>(initialCategory);

  const category = categories.find((c) => c.id === activeCategory)!;
  const contentBg = theme.tabs[activeCategory].contentBg;
  const rowWidth = Math.max(GAME_WIDTH, getCardRowWidth(category.cards.length));

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  return (
    <div
      className="relative overflow-hidden"
      style={{ width: GAME_WIDTH, height: GAME_HEIGHT, backgroundColor: contentBg }}
    >
      <TopNav activeId={activeCategory} onSelect={setActiveCategory} />

      {/* Content band — same color as active tab, fills below nav */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: NAV_H - Math.round(12 * (GAME_HEIGHT / 720)),
          bottom: 0,
          backgroundColor: contentBg,
          zIndex: 0,
        }}
      />

      <div
        className="touch-pan-x absolute left-0 overflow-x-auto overflow-y-hidden scrollbar-none"
        style={{
          top: CARD_TOP,
          width: GAME_WIDTH,
          height: GAME_HEIGHT - CARD_TOP,
          zIndex: 1,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="relative"
            style={{ width: rowWidth, height: CARD_H }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            {category.cards.map((card, index) => (
              <ActivityCard
                key={card.id}
                categoryId={activeCategory}
                cardIndex={index}
                title={card.title}
                style={{ position: "absolute", left: getCardLeft(index), top: 0 }}
                onSelect={() => onNavigate(getScreenForCard(activeCategory, card.id))}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
