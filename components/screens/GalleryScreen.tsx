"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import type { GalleryId } from "@/lib/galleries";
import { getGallery } from "@/lib/galleries";
import { GalleryToolbar, WorksheetGalleryCard } from "@/components/shared/GalleryToolbar";
import { GalleryCardArt } from "./GalleryCardArt";
import { DownloadingDialog } from "@/components/modals/DownloadingDialog";
import { PressHoldDialog } from "@/components/modals/PressHoldDialog";

export function GalleryScreen({
  galleryId,
  onBack,
  onSelectCard,
  onPlay,
}: {
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
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isScrollGallery =
    galleryId === "lines-dots" ||
    galleryId === "lines-line" ||
    galleryId === "lines-curve" ||
    galleryId === "lines-practice" ||
    galleryId === "alphabet-trace-upper" ||
    galleryId === "alphabet-trace-lower" ||
    galleryId === "alphabet-upper" ||
    galleryId === "alphabet-lower" ||
    galleryId === "alphabet-practice" ||
    galleryId === "alphabet-worksheets" ||
    galleryId === "alphabet-cursive-upper" ||
    galleryId === "alphabet-cursive-lower" ||
    galleryId === "numbers-trace" ||
    galleryId === "numbers-counting" ||
    galleryId === "numbers-practice";

  const updateScrollHint = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 12;
    setCanScrollRight(!atEnd);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), isScrollGallery ? 1200 : 1800);
    return () => clearTimeout(t);
  }, [galleryId, isScrollGallery]);

  useEffect(() => {
    if (!isScrollGallery) return;
    updateScrollHint();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollHint, { passive: true });
    window.addEventListener("resize", updateScrollHint);
    return () => {
      el.removeEventListener("scroll", updateScrollHint);
      window.removeEventListener("resize", updateScrollHint);
    };
  }, [isScrollGallery, updateScrollHint, loading]);

  const handleCardPress = useCallback(
    (cardId: string, locked: boolean) => {
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
    },
    [onSelectCard, unlocked],
  );

  const renderCard = (card: (typeof gallery.cards)[0]) => {
    const isLocked = card.locked && !unlocked.has(card.id);
    const inner = <GalleryCardArt galleryId={galleryId} cardId={card.id} label={card.label} />;

    return (
      <motion.button
        key={card.id}
        type="button"
        whileTap={isLocked ? undefined : { scale: 0.96 }}
        onPointerDown={() => handleCardPress(card.id, !!card.locked)}
        className="relative shrink-0 snap-start scroll-ml-3"
      >
        {isScrollGallery ? <WorksheetGalleryCard dimmed={isLocked}>{inner}</WorksheetGalleryCard> : inner}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/40">
              <span className="text-3xl">🔒</span>
            </div>
          </div>
        )}
      </motion.button>
    );
  };

  return (
    <div className={`relative flex h-full w-full flex-col overflow-hidden ${isScrollGallery ? "dots-gallery-bg" : "worksheets-bg"}`}>
      <GalleryToolbar
        onBack={onBack}
        onPlay={onPlay ?? (first ? () => onSelectCard(first.id) : undefined)}
        showCenterTabs={gallery.showCenterTabs}
        activeTab={tab}
        onTabChange={setTab}
      />

      <div className="relative min-h-0 flex-1">
        <div
          ref={scrollRef}
          className={
            isScrollGallery
              ? "flex h-full items-center gap-2.5 overflow-x-auto overflow-y-hidden scroll-smooth px-3 py-2 snap-x snap-proximity [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              : "relative flex h-full min-h-0 items-center gap-2.5 overflow-x-auto px-3 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          }
        >
          {gallery.cards.map(renderCard)}
          {isScrollGallery && <div className="w-1 shrink-0 snap-none" aria-hidden />}

          <DownloadingDialog open={loading} />
          <PressHoldDialog open={holdCard !== null} />
        </div>

        {isScrollGallery && canScrollRight && (
          <>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[18%] min-w-[52px] max-w-[88px]"
              style={{ background: "linear-gradient(to left, rgba(72,198,216,0.95) 0%, transparent 100%)" }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute right-0 top-[18%] z-20 h-[64%] w-0 border-r-[3px] border-dashed border-black/70"
              aria-hidden
            />
            <motion.div
              className="pointer-events-none absolute right-1.5 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 shadow-sm"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                <path d="M10 6l6 6-6 6" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </>
        )}
      </div>

      {gallery.showDownload && (
        <div className="flex shrink-0 justify-center px-4 pb-3 pt-1">
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => first && onSelectCard(first.id)}
            className="gunjan-download-btn min-w-[min(88%,320px)] rounded-2xl px-8 py-2.5 text-[clamp(13px,3.2vw,16px)] font-extrabold tracking-wide text-white"
          >
            Download And Print
          </motion.button>
        </div>
      )}
    </div>
  );
}
