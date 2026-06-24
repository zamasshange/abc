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
import { LanguageDialog } from "@/components/modals/LanguageDialog";

type HomeScreenProps = {
  initialCategory?: CategoryId;
  onNavigate: (screen: AppScreen, categoryId?: CategoryId, templateId?: DrawingTemplateId) => void;
};

export function HomeScreen({ initialCategory = "lines", onNavigate }: HomeScreenProps) {
  const [activeId, setActiveId] = useState<CategoryId>(initialCategory);
  const [langOpen, setLangOpen] = useState(false);
  const category = getCategory(activeId);
  const contentBg = theme.tabs[activeId].contentBg;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <TopNav
        activeId={activeId}
        onSelect={setActiveId}
        onLanguagePress={() => setLangOpen(true)}
      />

      <motion.div
        className="flex min-h-0 flex-1 flex-col"
        animate={{ backgroundColor: contentBg }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex min-h-0 flex-1 items-stretch overflow-x-auto overflow-y-hidden px-3 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              className="flex h-full min-w-min items-stretch gap-3 pr-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
            >
              {category.cards.map((card, index) => (
                <ActivityCardItem
                  key={card.id}
                  card={card}
                  categoryId={activeId}
                  cardIndex={index}
                  onSelect={() => {
                    const target = getScreenForCard(activeId, card.id);
                    if (target.screen !== "home" && target.categoryId) {
                      onNavigate(target.screen, target.categoryId, target.templateId);
                    }
                  }}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="h-[3px] shrink-0" style={{ backgroundColor: theme.bottomBar }} />

      <LanguageDialog open={langOpen} onClose={() => setLangOpen(false)} />
    </div>
  );
}
