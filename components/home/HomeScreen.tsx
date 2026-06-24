"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CategoryId } from "@/lib/theme";
import { theme } from "@/lib/theme";
import { getCategory } from "@/lib/categories";
import { getScreenForCard } from "@/lib/navigation";
import type { AppScreen } from "@/lib/navigation";
import { TopNav } from "./TopNav";
import { ActivityCardItem } from "./ActivityCard";

type HomeScreenProps = {
  initialCategory?: CategoryId;
  onNavigate: (screen: AppScreen, categoryId?: CategoryId) => void;
};

export function HomeScreen({ initialCategory = "lines", onNavigate }: HomeScreenProps) {
  const [activeId, setActiveId] = useState<CategoryId>(initialCategory);
  const category = getCategory(activeId);
  const contentBg = theme.tabs[activeId].contentBg;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <TopNav activeId={activeId} onSelect={setActiveId} />

      <motion.div
        className="flex flex-1 flex-col overflow-hidden"
        animate={{ backgroundColor: contentBg }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex flex-1 items-center justify-center overflow-x-auto overflow-y-hidden px-2 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              className="flex min-w-min items-center justify-center gap-2 sm:gap-3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {category.cards.map((card, index) => (
                <ActivityCardItem
                  key={card.id}
                  card={card}
                  categoryId={activeId}
                  index={index}
                  onSelect={() => {
                    const target = getScreenForCard(activeId, card.id);
                    if (target.screen !== "home") {
                      onNavigate(target.screen, activeId);
                    }
                  }}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="h-1.5 shrink-0 sm:h-2" style={{ backgroundColor: theme.bottomBar }} />
    </div>
  );
}
