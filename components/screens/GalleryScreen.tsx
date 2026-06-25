"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { GalleryId } from "@/lib/galleries";
import { getGallery } from "@/lib/galleries";
import { GalleryToolbar } from "@/components/shared/GalleryToolbar";
import { GalleryCardArt } from "./GalleryCardArt";
import { DownloadingDialog } from "@/components/modals/DownloadingDialog";

type GalleryScreenProps = {
  galleryId: GalleryId;
  onBack: () => void;
  onSelectCard: (cardIndex: number) => void;
};

export function GalleryScreen({ galleryId, onBack, onSelectCard }: GalleryScreenProps) {
  const gallery = getGallery(galleryId);
  const firstOpen = gallery.cards.findIndex((c) => !c.locked);
  const [downloading, setDownloading] = useState(false);
  const downloadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCardTap = (index: number) => {
    const card = gallery.cards[index];
    if (!card) return;

    if (card.locked) {
      setDownloading(true);
      if (downloadTimer.current) clearTimeout(downloadTimer.current);
      downloadTimer.current = setTimeout(() => setDownloading(false), 2200);
      return;
    }

    onSelectCard(index);
  };

  return (
    <div className="worksheets-bg relative flex h-full w-full flex-col overflow-hidden">
      <GalleryToolbar
        onBack={onBack}
        onPlay={() => firstOpen >= 0 && onSelectCard(firstOpen)}
        showCenterTabs={gallery.showCenterTabs}
      />

      <div className="relative flex min-h-0 flex-1 touch-pan-x items-center gap-3 overflow-x-auto px-4 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {gallery.cards.map((card, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => handleCardTap(i)}
            className="relative shrink-0 touch-manipulation"
          >
            <GalleryCardArt galleryId={galleryId} cardIndex={i} />
            {card.locked && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50">
                  <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden>
                    <rect x="14" y="22" width="20" height="16" rx="3" fill="#FFC107" stroke="#F9A825" strokeWidth="2" />
                    <path d="M18 22 V16 a6 6 0 0 1 12 0 v6" fill="none" stroke="#F9A825" strokeWidth="3" />
                  </svg>
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
            className="rounded-2xl border-[3px] border-[#689F38] bg-[#8BC34A] px-10 py-2.5 text-sm font-extrabold text-white"
            style={{ textShadow: "1px 1px 0 #558B2F", boxShadow: "0 4px 0 #689F38" }}
          >
            Download And Print
          </motion.button>
        </div>
      )}

      <DownloadingDialog open={downloading} />
    </div>
  );
}
