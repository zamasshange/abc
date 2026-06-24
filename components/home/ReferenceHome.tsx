"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CategoryId } from "@/lib/theme";
import { getCategory } from "@/lib/categories";
import { getScreenForCard } from "@/lib/navigation";
import type { AppScreen, DrawingTemplateId } from "@/lib/navigation";
import {
  getHomeScreenImage,
  getNavHitZones,
  getCardZones,
  isCategoryId,
} from "@/lib/referenceLayout";
import { LanguageDialog } from "@/components/modals/LanguageDialog";
import { PressHoldDialog } from "@/components/modals/PressHoldDialog";

type ReferenceHomeProps = {
  activeId: CategoryId;
  onCategoryChange: (id: CategoryId) => void;
  onNavigate: (screen: AppScreen, categoryId?: CategoryId, templateId?: DrawingTemplateId) => void;
};

export function ReferenceHome({ activeId, onCategoryChange, onNavigate }: ReferenceHomeProps) {
  const [langOpen, setLangOpen] = useState(false);
  const [holdOpen, setHoldOpen] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingCard = useRef<number | null>(null);

  const category = getCategory(activeId);
  const cardZones = getCardZones(activeId);
  const navZones = getNavHitZones();

  const clearHold = useCallback(() => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    setHoldOpen(false);
    pendingCard.current = null;
  }, []);

  const startCardHold = useCallback(
    (cardIndex: number) => {
      const card = category.cards[cardIndex];
      if (!card) return;
      const target = getScreenForCard(activeId, card.id);
      if (target.screen === "home") return;

      pendingCard.current = cardIndex;
      setHoldOpen(true);
      holdTimer.current = setTimeout(() => {
        setHoldOpen(false);
        onNavigate(target.screen, activeId, target.templateId);
        holdTimer.current = null;
        pendingCard.current = null;
      }, 850);
    },
    [activeId, category.cards, onNavigate]
  );

  const handleNavTap = (id: string, action?: string) => {
    if (action === "language") {
      setLangOpen(true);
      return;
    }
    if (action === "shop") return;
    if (isCategoryId(id)) onCategoryChange(id);
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          className="absolute inset-0"
          initial={{ opacity: 0.85 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.85 }}
          transition={{ duration: 0.15 }}
        >
          <Image
            src={getHomeScreenImage(activeId)}
            alt=""
            fill
            className="object-fill"
            priority
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Nav hit zones */}
      {navZones.map((zone) => (
        <button
          key={`${zone.id}-${zone.y}`}
          type="button"
          className="absolute z-10 cursor-pointer bg-transparent"
          style={{
            left: `${zone.x * 100}%`,
            top: `${zone.y * 100}%`,
            width: `${zone.w * 100}%`,
            height: `${zone.h * 100}%`,
          }}
          onClick={() => handleNavTap(zone.id, zone.action)}
          aria-label={zone.id}
        />
      ))}

      {/* Card hit zones */}
      {cardZones.map((zone) => (
        <button
          key={zone.index}
          type="button"
          className="absolute z-10 cursor-pointer bg-transparent active:bg-white/5"
          style={{
            left: `${zone.x * 100}%`,
            top: `${zone.y * 100}%`,
            width: `${zone.w * 100}%`,
            height: `${zone.h * 100}%`,
          }}
          onPointerDown={() => startCardHold(zone.index)}
          onPointerUp={clearHold}
          onPointerLeave={clearHold}
          onPointerCancel={clearHold}
          aria-label={category.cards[zone.index]?.title ?? `Card ${zone.index}`}
        />
      ))}

      <LanguageDialog open={langOpen} onClose={() => setLangOpen(false)} />
      <PressHoldDialog open={holdOpen} />
    </div>
  );
}
