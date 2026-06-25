"use client";

import { motion } from "framer-motion";
import type { GalleryId } from "@/lib/galleries";
import { getGallery } from "@/lib/galleries";
import { GalleryToolbar } from "@/components/shared/GalleryToolbar";
import { GalleryCardArt } from "./GalleryCardArt";

export function GalleryScreen({ galleryId, onBack, onSelectCard, onPlay }: {
  galleryId: GalleryId; onBack: () => void; onSelectCard: (cardId: string) => void; onPlay?: () => void;
}) {
  const gallery = getGallery(galleryId);
  const first = gallery.cards.find((c) => !c.locked);

  return (
    <div className="worksheets-bg relative flex h-full w-full flex-col overflow-hidden">
      <GalleryToolbar onBack={onBack} onPlay={onPlay ?? (first ? () => onSelectCard(first.id) : undefined)} showCenterTabs={gallery.showCenterTabs} />
      <div className="flex min-h-0 flex-1 items-center gap-2 overflow-x-auto px-3 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {gallery.cards.map((card) => (
          <motion.button key={card.id} type="button" whileTap={card.locked ? undefined : { scale: 0.95 }}
            onClick={() => !card.locked && onSelectCard(card.id)} className="relative shrink-0" disabled={card.locked}>
            <GalleryCardArt galleryId={galleryId} cardId={card.id} label={card.label} />
            {card.locked && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/40"><span className="text-3xl">🔒</span></div>
              </div>
            )}
          </motion.button>
        ))}
      </div>
      {gallery.showDownload && (
        <div className="flex shrink-0 justify-center px-3 pb-3">
          <motion.button type="button" whileTap={{ scale: 0.95 }} onClick={() => first && onSelectCard(first.id)}
            className="rounded-2xl gunjan-download-btn px-10 py-2.5 text-sm font-extrabold text-white">Download And Print</motion.button>
        </div>
      )}
    </div>
  );
}
