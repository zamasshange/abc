"use client";

import { motion } from "framer-motion";
import type { ActivityCard } from "@/lib/categories";
import type { CategoryId } from "@/lib/theme";
import { theme } from "@/lib/theme";
import { CardIllustration } from "@/components/illustrations/CardIllustrations";

type ActivityCardProps = {
  card: ActivityCard;
  categoryId: CategoryId;
  index: number;
  onSelect: () => void;
};

export function ActivityCardItem({ card, categoryId, index, onSelect }: ActivityCardProps) {
  const { border, footer, textOutline } = theme.cards[categoryId];

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className="flex h-[min(72vh,340px)] w-[min(24vw,155px)] min-w-[100px] max-w-[170px] shrink-0 flex-col overflow-hidden"
      style={{
        border: `8px solid ${border}`,
        borderRadius: "22px",
        boxShadow: "0 3px 0 rgba(0,0,0,0.12)",
      }}
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 24,
        delay: index * 0.06,
      }}
      whileTap={{ scale: 0.94 }}
      aria-label={card.title}
    >
      <div className="flex flex-[3] items-center justify-center bg-white p-2 sm:p-2.5">
        <CardIllustration id={card.illustration} />
      </div>
      <div
        className="flex flex-1 items-center justify-center px-1 py-1"
        style={{ backgroundColor: footer }}
      >
        <span
          className="text-center text-[11px] font-extrabold leading-tight text-white sm:text-sm"
          style={{
            textShadow: `2px 2px 0 ${textOutline}, -1px -1px 0 ${textOutline}, 0 2px 0 ${textOutline}`,
          }}
        >
          {card.title}
        </span>
      </div>
    </motion.button>
  );
}
