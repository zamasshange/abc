"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ActivityCard } from "@/lib/categories";
import type { CategoryId } from "@/lib/theme";
import { theme } from "@/lib/theme";
import { getCardImage } from "@/lib/cardAssets";
import { CardIllustration } from "@/components/illustrations/CardIllustrations";

type ActivityCardProps = {
  card: ActivityCard;
  categoryId: CategoryId;
  index: number;
  onSelect: () => void;
};

export function ActivityCardItem({ card, categoryId, index, onSelect }: ActivityCardProps) {
  const { border, footer, textOutline } = theme.cards[categoryId];
  const cardImage = getCardImage(card.illustration);

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className="flex h-full w-[23%] min-w-[108px] max-w-[200px] shrink-0 flex-col overflow-hidden"
      style={{
        border: `9px solid ${border}`,
        borderRadius: "20px",
        boxShadow: "0 4px 0 rgba(0,0,0,0.15)",
      }}
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 22,
        delay: index * 0.05,
      }}
      whileTap={{ scale: 0.93 }}
      aria-label={card.title}
    >
      <div className="relative flex min-h-0 flex-[3] items-center justify-center overflow-hidden bg-white">
        {cardImage ? (
          <Image
            src={cardImage}
            alt=""
            fill
            className="object-cover object-top"
            sizes="200px"
            priority={index < 2}
          />
        ) : (
          <div className="p-2">
            <CardIllustration id={card.illustration} />
          </div>
        )}
      </div>
      <div
        className="flex shrink-0 items-center justify-center px-1 py-2"
        style={{ backgroundColor: footer, minHeight: "28%" }}
      >
        <span
          className="text-center text-xs font-extrabold leading-tight text-white sm:text-sm"
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
