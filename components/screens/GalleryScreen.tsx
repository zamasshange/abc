"use client";

import Image from "next/image";
import type { GalleryId } from "@/lib/galleries";
import { getGallery } from "@/lib/galleries";

type GalleryScreenProps = {
  galleryId: GalleryId;
  onBack: () => void;
  onSelectCard: (cardIndex: number) => void;
};

function HitZone({
  zone,
  label,
  onClick,
  disabled,
}: {
  zone: { x: number; y: number; w: number; h: number };
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="absolute z-10 touch-manipulation"
      style={{
        left: `${zone.x * 100}%`,
        top: `${zone.y * 100}%`,
        width: `${zone.w * 100}%`,
        height: `${zone.h * 100}%`,
      }}
      aria-label={label}
    />
  );
}

export function GalleryScreen({ galleryId, onBack, onSelectCard }: GalleryScreenProps) {
  const gallery = getGallery(galleryId);
  const firstOpen = gallery.cards.findIndex((c) => !c.locked);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <Image
        src={gallery.image}
        alt=""
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />

      <HitZone zone={gallery.zones.back} label="Back" onClick={onBack} />
      <HitZone
        zone={gallery.zones.play}
        label="Play"
        onClick={() => firstOpen >= 0 && onSelectCard(firstOpen)}
      />

      {gallery.zones.download && (
        <HitZone
          zone={gallery.zones.download}
          label="Download"
          onClick={() => firstOpen >= 0 && onSelectCard(firstOpen)}
        />
      )}

      {gallery.zones.cardSlots.map((slot, i) => {
        const card = gallery.cards[i];
        if (!card) return null;
        return (
          <HitZone
            key={i}
            zone={slot}
            label={`Card ${i + 1}`}
            disabled={card.locked}
            onClick={() => !card.locked && onSelectCard(i)}
          />
        );
      })}
    </div>
  );
}
