"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { GalleryId } from "@/lib/galleries";
import { getGallery } from "@/lib/galleries";
import { GalleryToolbar } from "@/components/shared/GalleryToolbar";
import { GalleryCardArt } from "./GalleryCardArt";
import { DownloadingDialog } from "@/components/modals/DownloadingDialog";
import { PressHoldDialog } from "@/components/modals/PressHoldDialog";

export function GalleryScreen({ galleryId, onBack, onSelectCard, onPlay }: {
  galleryId: GalleryId;
  onBack: () => void;
  onSelectCard: (cardId: string) => void;
  onPlay?: () => void;
}) {
  const gallery = getGallery(galleryId);
  const first = gallery.cards.find((c) => !c.locked);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"draw" | "notebook">("draw");
  const [holdCard, setHoldCard] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, [galleryId]);

  const handleCardPress = useCallback((cardId: string, locked: boolean) => {
    if (!locked || unlocked.has(cardId)) {
      onSelectCard(cardId);
      return;
    }
    setHoldCard(cardId);
    const timer = setTimeout(() => {
      setUnlocked((s) => new Set(s).add(cardId));
      setHoldCard(null);
      onSelectCard(cardId);
    }, 850);
    const up = () => {
      clearTimeout(timer);
      setHoldCard(null);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointerup", up);
  }, [onSelectCard, unlocked]);

  return (
    <div className="worksheets-bg relative flex h-full w-full flex-col overflow-hidden">
      <GalleryToolbar
        onBack={onBack}
        onPlay={onPlay ?? (first ? () => onSelectCard(first.id) : undefined)}
        showCenterTabs={gallery.showCenterTabs}
        activeTab={tab}
        onTabChange={setTab}
      />

      <div className="relative flex min-h-0 flex-1 items-center gap-2 overflow-x-auto px-3 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {gallery.cards.map((card) => {
          const isLocked = card.locked && !unlocked.has(card.id);
          return (
            <motion.button
              key={card.id}
              type="button"
              whileTap={isLocked ? undefined : { scale: 0.95 }}
              onPointerDown={() => handleCardPress(card.id, !!card.locked)}
              className="relative shrink-0"
            >
              <GalleryCardArt galleryId={galleryId} cardId={card.id} label={card.label} />
              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/40">
                    <span className="text-3xl">🔒</span>
                  </div>
                </div>
              )}
            </motion.button>
          );
        })}
        <DownloadingDialog open={loading} />
        <PressHoldDialog open={holdCard !== null} />
      </div>

      {gallery.showDownload && (
        <div className="flex shrink-0 justify-center px-3 pb-3">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => first && onSelectCard(first.id)}
            className="rounded-2xl gunjan-download-btn px-10 py-2.5 text-sm font-extrabold text-white"
          >
            Download And Print
          </motion.button>
        </div>
      )}
    </div>
  );
}
