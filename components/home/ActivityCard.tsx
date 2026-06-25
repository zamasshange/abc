"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ActivityCard } from "@/lib/categories";
import type { CategoryId } from "@/lib/theme";
import { theme } from "@/lib/theme";
import { CardIllustration } from "@/components/illustrations/CardIllustrations";
import { getCardArtPath, hasCardArt } from "@/lib/cardArt";

type ActivityCardProps = {
  card: ActivityCard;
  categoryId: CategoryId;
  cardIndex: number;
  onSelect: () => void;
};

export function ActivityCardItem({ card, categoryId, cardIndex, onSelect }: ActivityCardProps) {
  const { border, footer, textOutline } = theme.cards[categoryId];
  const useRefArt = hasCardArt(categoryId, cardIndex);
  const artPath = getCardArtPath(categoryId, cardIndex);

  if (useRefArt && artPath) {
    return (
      <motion.button
        type="button"
        onClick={onSelect}
        className="relative h-full w-[24vw] min-w-[140px] max-w-[210px] shrink-0 overflow-hidden"
        style={{ borderRadius: "16px", filter: "drop-shadow(0 4px 0 rgba(0,0,0,0.18))" }}
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 340, damping: 24, delay: cardIndex * 0.04 }}
        whileTap={{ scale: 0.94 }}
        aria-label={card.title}
      >
        <Image
          src={artPath}
          alt={card.title}
          fill
          className="object-contain object-center"
          sizes="(max-width: 768px) 24vw, 210px"
          priority={cardIndex < 2}
        />
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className="flex h-full w-[24vw] min-w-[140px] max-w-[210px] shrink-0 flex-col overflow-hidden"
      style={{
        border: `10px solid ${border}`,
        borderRadius: "16px",
        boxShadow: "0 5px 0 rgba(0,0,0,0.16)",
      }}
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 340, damping: 24, delay: cardIndex * 0.04 }}
      whileTap={{ scale: 0.94 }}
      aria-label={card.title}
    >
      <div className="flex min-h-0 flex-[7] items-center justify-center bg-white p-[5%]">
        <CardIllustration id={card.illustration} className="h-full w-full max-h-full" />
      </div>
      <div className="flex shrink-0 items-center justify-center py-[6%]" style={{ backgroundColor: footer, minHeight: "24%" }}>
        <span
          className="px-1 text-center text-[clamp(11px,2.6vw,15px)] font-extrabold leading-tight text-white"
          style={{ textShadow: `2px 2px 0 ${textOutline}, -1px -1px 0 ${textOutline}, 0 2px 0 ${textOutline}` }}
        >
          {card.title}
        </span>
      </div>
    </motion.button>
  );
}
