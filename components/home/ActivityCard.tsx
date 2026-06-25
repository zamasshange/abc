"use client";

import { motion } from "framer-motion";
import { getCardArtPath, getCardArtSrcSet } from "@/lib/cardArt";
import { CARD_FOOTER_H, CARD_H, CARD_W } from "@/lib/device";
import { theme, type CategoryId } from "@/lib/theme";

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
  const cardTheme = theme.cards[categoryId];
  const artSrc = getCardArtPath(categoryId, cardIndex);
  const artH = CARD_H - CARD_FOOTER_H;

  return (
    <motion.button
      type="button"
      aria-label={title}
      className="activity-card shrink-0 border-0 bg-transparent p-0 active:scale-[0.98]"
      style={{ width: CARD_W, height: CARD_H, ...style }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: cardIndex * 0.03 }}
      onClick={onSelect}
    >
      <div
        className="flex h-full w-full flex-col overflow-hidden"
        style={{
          borderRadius: Math.round(28 * (CARD_W / 338)),
          border: `${Math.round(10 * (CARD_W / 338))}px solid ${cardTheme.border}`,
          backgroundColor: "#fff",
        }}
      >
        <div className="relative flex-1 overflow-hidden bg-white" style={{ minHeight: artH }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={artSrc}
            srcSet={getCardArtSrcSet(categoryId, cardIndex)}
            alt=""
            draggable={false}
            className="card-art block h-full w-full"
          />
        </div>
        <div
          className="flex shrink-0 items-center justify-center"
          style={{
            height: CARD_FOOTER_H,
            backgroundColor: cardTheme.footer,
          }}
        >
          <span
            className="font-extrabold leading-none text-white"
            style={{
              fontSize: Math.round(34 * (CARD_W / 338)),
              textShadow: `2px 2px 0 ${cardTheme.textOutline}, -1px -1px 0 ${cardTheme.textOutline}`,
            }}
          >
            {title}
          </span>
        </div>
      </div>
    </motion.button>
  );
}
