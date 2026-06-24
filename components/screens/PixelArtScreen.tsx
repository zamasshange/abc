"use client";

import Image from "next/image";
import { ReferenceActivityScreen } from "./ReferenceActivityScreen";

export function PixelArtScreen({ onBack }: { onBack: () => void }) {
  return (
    <ReferenceActivityScreen variant="pixel-art" onBack={onBack}>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0" />
    </ReferenceActivityScreen>
  );
}

/** Pixel grid overlay on reference pixel-art screen */
export function PixelArtGridScreen({ onBack }: { onBack: () => void }) {
  return <ReferenceActivityScreen variant="pixel-art" onBack={onBack} />;
}
