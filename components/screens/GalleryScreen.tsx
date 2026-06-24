"use client";

import { motion } from "framer-motion";
import type { GalleryId } from "@/lib/galleries";
import { getGallery } from "@/lib/galleries";
import { GalleryToolbar } from "@/components/shared/GalleryToolbar";
import { GalleryCardArt } from "./GalleryCardArt";

type GalleryScreenProps = {
  galleryId: GalleryId;
  onBack: () => void;
  onSelectCard: (cardId: string) => void;
  onPlay?: () => void;
};

export function GalleryScreen({ galleryId, onBack, onSelectCard, onPlay }: GalleryScreenProps) {
  const gallery = getGallery(galleryId);
  const firstUnlocked = gallery.cards.find((c) => !c.locked);

  return (
    <div className="worksheets-bg relative flex h-full w-full flex-col overflow-hidden">
      <GalleryToolbar
        onBack={onBack}
        onPlay={onPlay ?? (firstUnlocked ? () => onSelectCard(firstUnlocked.id) : undefined)}
        showCenterTabs={gallery.showCenterTabs}
      />

      <div className="flex min-h-0 flex-1 items-center gap-2 overflow-x-auto px-3 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {gallery.cards.map((card) => (
          <motion.button
            key={card.id}
            type="button"
            whileTap={card.locked ? undefined : { scale: 0.95 }}
            onClick={() => !card.locked && onSelectCard(card.id)}
            className="relative shrink-0"
            disabled={card.locked}
          >
            <GalleryCardArt galleryId={galleryId} cardId={card.id} label={card.label} />
            {card.locked && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/40">
                  <span className="text-3xl">🔒</span>
                </div>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {gallery.showDownload && (
        <div className="flex shrink-0 justify-center px-3 pb-3">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => firstUnlocked && onSelectCard(firstUnlocked.id)}
            className="rounded-2xl border-[3px] border-[#689F38] bg-[#AED581] px-10 py-2.5 text-sm font-extrabold text-white"
            style={{ textShadow: "1px 1px 0 #689F38", boxShadow: "0 4px 0 #689F38" }}
          >
            Download And Print
          </motion.button>
        </div>
      )}
    </div>
  );
}
