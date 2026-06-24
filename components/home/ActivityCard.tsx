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
      className="flex w-[23vw] min-w-[88px] max-w-[130px] shrink-0 flex-col overflow-hidden rounded-2xl sm:min-w-[105px] sm:max-w-[150px]"
      style={{ border: `6px solid ${border}` }}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 24,
        delay: index * 0.07,
      }}
      whileTap={{ scale: 0.92 }}
      aria-label={card.title}
    >
      <div className="flex aspect-[1.05] items-center justify-center bg-white p-1.5 sm:p-2">
        <CardIllustration id={card.illustration} />
      </div>
      <div
        className="flex min-h-[32px] items-center justify-center px-1 py-1.5 sm:min-h-[36px]"
        style={{ backgroundColor: footer }}
      >
        <span
          className="text-center text-[10px] font-extrabold leading-tight text-white sm:text-xs"
          style={{
            textShadow: `1.5px 1.5px 0 ${textOutline}, -1px -1px 0 ${textOutline}`,
          }}
        >
          {card.title}
        </span>
      </div>
    </motion.button>
  );
}
