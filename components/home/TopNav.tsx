"use client";

import type { CategoryId } from "@/lib/theme";
import { GAME_WIDTH, NAV_H } from "@/lib/device";
import {
  NAV_HIT_ZONES,
  getNavImagePath,
  getNavImageSrcSet,
  hitZoneStyle,
} from "@/lib/navArt";

type TopNavProps = {
  activeId: CategoryId;
  onSelect: (id: CategoryId) => void;
  onLanguagePress?: () => void;
};

export function TopNav({ activeId, onSelect, onLanguagePress }: TopNavProps) {
  const src = getNavImagePath(activeId);

  return (
    <div className="relative z-10 shrink-0" style={{ width: GAME_WIDTH, height: NAV_H }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        srcSet={getNavImageSrcSet(activeId)}
        alt="Navigation"
        width={GAME_WIDTH}
        height={NAV_H}
        draggable={false}
        className="nav-strip block h-full w-full"
      />

      {NAV_HIT_ZONES.map((zone) => {
        const style = hitZoneStyle(zone);
        if (zone.kind === "lang") {
          return (
            <button
              key="lang"
              type="button"
              aria-label="Language"
              className="nav-hit absolute border-0 bg-transparent p-0"
              style={style}
              onClick={onLanguagePress}
            />
          );
        }
        if (zone.kind === "shop") {
          return (
            <button
              key="shop"
              type="button"
              aria-label="Shop"
              className="nav-hit absolute border-0 bg-transparent p-0"
              style={style}
            />
          );
        }
        return (
          <button
            key={zone.id}
            type="button"
            aria-label={zone.id}
            aria-pressed={activeId === zone.id}
            className="nav-hit absolute border-0 bg-transparent p-0"
            style={style}
            onClick={() => onSelect(zone.id)}
          />
        );
      })}
    </div>
  );
}
