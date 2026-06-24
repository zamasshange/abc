"use client";

import { motion } from "framer-motion";
import type { GalleryId } from "@/lib/galleries";
import { getGallery } from "@/lib/galleries";
import { GalleryToolbar } from "@/components/shared/GalleryToolbar";
import { GalleryCardArt } from "./GalleryCardArt";

type GalleryScreenProps = {
  galleryId: GalleryId;
  onBack: () => void;
  onSelectCard: (cardIndex: number) => void;
};

export function GalleryScreen({ galleryId, onBack, onSelectCard }: GalleryScreenProps) {
  const gallery = getGallery(galleryId);
  const firstOpen = gallery.cards.findIndex((c) => !c.locked);

  return (
    <div className="worksheets-bg relative flex h-full w-full flex-col overflow-hidden">
      <GalleryToolbar
        onBack={onBack}
        onPlay={() => firstOpen >= 0 && onSelectCard(firstOpen)}
        showCenterTabs={gallery.showCenterTabs}
      />

      <div className="flex min-h-0 flex-1 items-center gap-2 overflow-x-auto px-3 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {gallery.cards.map((card, i) => (
          <motion.button
            key={i}
            type="button"
            whileTap={card.locked ? undefined : { scale: 0.95 }}
            onClick={() => !card.locked && onSelectCard(i)}
            className="relative shrink-0"
            disabled={card.locked}
          >
            <GalleryCardArt galleryId={galleryId} cardIndex={i} />
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
            onClick={() => firstOpen >= 0 && onSelectCard(firstOpen)}
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
