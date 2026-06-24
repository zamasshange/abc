"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CategoryId } from "@/lib/theme";
import { theme } from "@/lib/theme";
import { getCategory } from "@/lib/categories";
import { getScreenForCard } from "@/lib/navigation";
import type { AppScreen, DrawingTemplateId } from "@/lib/navigation";
import { TopNav } from "./TopNav";
import { ActivityCardItem } from "./ActivityCard";

type HomeScreenProps = {
  initialCategory?: CategoryId;
  onNavigate: (screen: AppScreen, categoryId?: CategoryId, templateId?: DrawingTemplateId) => void;
};

export function HomeScreen({ initialCategory = "lines", onNavigate }: HomeScreenProps) {
  const [activeId, setActiveId] = useState<CategoryId>(initialCategory);
  const category = getCategory(activeId);
  const contentBg = theme.tabs[activeId].contentBg;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <TopNav activeId={activeId} onSelect={setActiveId} />

      <motion.div
        className="relative flex flex-1 flex-col overflow-hidden"
        animate={{ backgroundColor: contentBg }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <div className="flex flex-1 items-center justify-center overflow-x-auto overflow-y-hidden px-3 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              className="flex min-w-min items-center justify-center gap-3 sm:gap-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
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
                      onNavigate(target.screen, activeId, target.templateId);
                    }
                  }}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="h-2 shrink-0 sm:h-2.5" style={{ backgroundColor: theme.bottomBar }} />
    </div>
  );
}
