"use client";

import { motion } from "framer-motion";
import type { ActivityCard } from "@/lib/categories";
import type { CategoryId } from "@/lib/theme";
import { theme } from "@/lib/theme";
import { CardIllustration } from "@/components/illustrations/CardIllustrations";

type ActivityCardProps = {
  card: ActivityCard;
  categoryId: CategoryId;
  cardIndex: number;
  onSelect: () => void;
};

export function ActivityCardItem({ card, categoryId, cardIndex, onSelect }: ActivityCardProps) {
  const { border, footer, textOutline } = theme.cards[categoryId];

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className="flex h-full w-[22vw] min-w-[128px] max-w-[200px] shrink-0 flex-col overflow-hidden"
      style={{
        border: `8px solid ${border}`,
        borderRadius: "20px",
        boxShadow: "0 3px 0 rgba(0,0,0,0.12)",
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: cardIndex * 0.03, duration: 0.2 }}
      whileTap={{ scale: 0.96 }}
      aria-label={card.title}
    >
      <div className="flex min-h-0 flex-[7] items-center justify-center bg-white p-[8%]">
        <CardIllustration id={card.illustration} className="h-full w-full max-h-full" />
      </div>
      <div
        className="flex shrink-0 items-center justify-center py-[6%]"
        style={{ backgroundColor: footer, minHeight: "24%" }}
      >
        <span
          className="px-1 text-center text-[clamp(9px,2.2vw,13px)] font-extrabold leading-tight text-white"
          style={{
            textShadow: `2px 2px 0 ${textOutline}, -1px -1px 0 ${textOutline}`,
          }}
        >
          {card.title}
        </span>
      </div>
    </motion.button>
  );
}
