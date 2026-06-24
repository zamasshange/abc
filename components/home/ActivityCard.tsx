"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ActivityCard } from "@/lib/categories";
import type { CategoryId } from "@/lib/theme";
import { getCardImage } from "@/lib/categories";
import { REFERENCE_LAYOUT } from "@/lib/referenceLayout";

type ActivityCardProps = {
  card: ActivityCard;
  categoryId: CategoryId;
  cardIndex: number;
  onSelect: () => void;
};

export function ActivityCardItem({ card, categoryId, cardIndex, onSelect }: ActivityCardProps) {
  const slot = REFERENCE_LAYOUT.categories[categoryId].cards[0];
  const aspect = slot.w / slot.h;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className="relative h-full shrink-0 overflow-hidden"
      style={{
        width: `calc((100vh - 22vh) * ${aspect})`,
        minWidth: "128px",
        maxWidth: "220px",
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: cardIndex * 0.03, duration: 0.2 }}
      whileTap={{ scale: 0.96 }}
      aria-label={card.title}
    >
      <Image
        src={getCardImage(categoryId, card.cardIndex)}
        alt={card.title}
        fill
        className="object-fill"
        sizes="22vw"
        priority={cardIndex < 4}
      />
    </motion.button>
  );
}
