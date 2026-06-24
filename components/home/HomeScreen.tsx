"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CategoryId } from "@/lib/theme";
import { theme } from "@/lib/theme";
import { getCategory } from "@/lib/categories";
import { getScreenForCard } from "@/lib/navigation";
import type { AppScreen, DrawingTemplateId } from "@/lib/navigation";
import { TopNav } from "./TopNav";
import { ActivityCardItem } from "./ActivityCard";
import { LanguageDialog } from "@/components/modals/LanguageDialog";
import { PressHoldDialog } from "@/components/modals/PressHoldDialog";

type HomeScreenProps = {
  initialCategory?: CategoryId;
  onNavigate: (screen: AppScreen, categoryId?: CategoryId, templateId?: DrawingTemplateId) => void;
};

export function HomeScreen({ initialCategory = "lines", onNavigate }: HomeScreenProps) {
  const [activeId, setActiveId] = useState<CategoryId>(initialCategory);
  const [langOpen, setLangOpen] = useState(false);
  const [holdOpen, setHoldOpen] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingNav = useRef<{
    screen: AppScreen;
    categoryId: CategoryId;
    templateId?: DrawingTemplateId;
  } | null>(null);
  const category = getCategory(activeId);
  const contentBg = theme.tabs[activeId].contentBg;

  const clearHold = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    setHoldOpen(false);
    pendingNav.current = null;
  };

  const handleCardPressStart = (target: ReturnType<typeof getScreenForCard>) => {
    if (target.screen === "home" || !target.categoryId) return;
    const nav = {
      screen: target.screen,
      categoryId: target.categoryId,
      templateId: target.templateId,
    };
    pendingNav.current = nav;
    setHoldOpen(true);
    holdTimer.current = setTimeout(() => {
      setHoldOpen(false);
      onNavigate(nav.screen, nav.categoryId, nav.templateId);
      holdTimer.current = null;
      pendingNav.current = null;
    }, 900);
  };

  const handleCardPressEnd = () => {
    clearHold();
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      <TopNav
        activeId={activeId}
        onSelect={setActiveId}
        onLanguagePress={() => setLangOpen(true)}
      />

      <motion.div
        className="relative flex min-h-0 flex-1 flex-col overflow-hidden"
        animate={{ backgroundColor: contentBg }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <div className="flex min-h-0 flex-1 items-stretch justify-center gap-2 overflow-x-auto px-2 py-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-3 sm:px-3 [&::-webkit-scrollbar]:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              className="flex h-full min-w-min items-stretch justify-center gap-2 sm:gap-3"
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -36 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              {category.cards.map((card, index) => {
                const target = getScreenForCard(activeId, card.id);
                return (
                  <div
                    key={card.id}
                    className="flex h-full"
                    onPointerDown={() => handleCardPressStart(target)}
                    onPointerUp={handleCardPressEnd}
                    onPointerLeave={handleCardPressEnd}
                    onPointerCancel={handleCardPressEnd}
                  >
                    <ActivityCardItem
                      card={card}
                      categoryId={activeId}
                      index={index}
                      onSelect={() => {
                        if (target.screen !== "home") {
                          handleCardPressStart(target);
                        }
                      }}
                    />
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="h-2 shrink-0" style={{ backgroundColor: theme.bottomBar }} />

      <LanguageDialog open={langOpen} onClose={() => setLangOpen(false)} />
      <PressHoldDialog open={holdOpen} />
    </div>
  );
}
