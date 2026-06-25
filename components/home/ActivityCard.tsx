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
      className="flex h-full w-[23vw] min-w-[132px] max-w-[196px] shrink-0 flex-col overflow-hidden"
      style={{
        border: `9px solid ${border}`,
        borderRadius: "18px",
        boxShadow: "0 4px 0 rgba(0,0,0,0.14)",
      }}
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 340, damping: 24, delay: cardIndex * 0.04 }}
      whileTap={{ scale: 0.94 }}
      aria-label={card.title}
    >
      <div className="relative flex min-h-0 flex-[7] items-center justify-center bg-white p-[6%]">
        <CardIllustration id={card.illustration} className="h-full w-full max-h-full" />
        {card.downloadBadge && (
          <div
            className="absolute right-[6%] top-[6%] flex h-[22%] min-h-[22px] w-[22%] min-w-[22px] max-w-[32px] items-center justify-center rounded-full border-2 border-white"
            style={{ backgroundColor: "#4CAF50" }}
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="h-[55%] w-[55%]" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v10M8 11l4 4 4-4M6 19h12" />
            </svg>
          </div>
        )}
      </div>
      <div
        className="flex shrink-0 items-center justify-center px-1 py-[5%]"
        style={{ backgroundColor: footer, minHeight: "23%" }}
      >
        <span
          className="text-center text-[clamp(10px,2.4vw,14px)] font-extrabold leading-tight text-white"
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
