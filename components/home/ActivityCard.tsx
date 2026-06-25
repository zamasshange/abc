"use client";

import { motion } from "framer-motion";
import { getCardImagePath } from "@/lib/cardArt";
import { CARD_H, CARD_W } from "@/lib/device";
import type { CategoryId } from "@/lib/theme";

type ActivityCardProps = {
  categoryId: CategoryId;
  cardIndex: number;
  title: string;
  style?: React.CSSProperties;
  onSelect: () => void;
};

export function ActivityCard({
  categoryId,
  cardIndex,
  title,
  style,
  onSelect,
}: ActivityCardProps) {
  const src = getCardImagePath(categoryId, cardIndex);

  return (
    <motion.button
      type="button"
      aria-label={title}
      className="shrink-0 border-0 bg-transparent p-0 active:scale-[0.98]"
      style={{ width: CARD_W, height: CARD_H, ...style }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: cardIndex * 0.03 }}
      onClick={onSelect}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={title}
        width={CARD_W}
        height={CARD_H}
        draggable={false}
        className="block h-full w-full"
        style={{ objectFit: "fill" }}
      />
    </motion.button>
  );
}
