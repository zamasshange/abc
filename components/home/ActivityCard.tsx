"use client";

import { motion } from "framer-motion";
import { CARD_BORDER, CARD_FOOTER_H, CARD_H, CARD_RADIUS, CARD_W } from "@/lib/device";
import { getCardImagePath, getCardImageSrcSet } from "@/lib/cardArt";
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
  const colors = theme.cards[categoryId];
  const src = getCardImagePath(categoryId, cardIndex);
  const artH = CARD_H - CARD_FOOTER_H - CARD_BORDER * 2;
  const footerFont = Math.round(36 * (CARD_W / 338));

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
          borderRadius: CARD_RADIUS,
          border: `${CARD_BORDER}px solid ${colors.border}`,
          backgroundColor: "#ffffff",
          boxSizing: "border-box",
        }}
      >
        <div
          className="relative shrink-0 overflow-hidden bg-white"
          style={{ height: artH, width: "100%" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            srcSet={getCardImageSrcSet(categoryId, cardIndex)}
            alt=""
            width={CARD_W - CARD_BORDER * 2}
            height={artH}
            draggable={false}
            className="card-illustration block"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div
          className="flex shrink-0 items-center justify-center"
          style={{
            height: CARD_FOOTER_H,
            backgroundColor: colors.footer,
          }}
        >
          <span
            className="font-extrabold leading-none text-white"
            style={{
              fontSize: footerFont,
              textShadow: `2px 2px 0 ${colors.textOutline}, -1px -1px 0 ${colors.textOutline}`,
            }}
          >
            {title}
          </span>
        </div>
      </div>
    </motion.button>
  );
}
