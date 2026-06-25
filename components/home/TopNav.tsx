"use client";

import { useSyncExternalStore } from "react";
import type { CategoryId } from "@/lib/theme";
import { categories } from "@/lib/categories";
import { theme } from "@/lib/theme";
import { TabIcon } from "@/components/icons/TabIcons";
import { GameCircleButton, GameMenuButton } from "@/components/game";
import { ShopIcon } from "@/components/game/GameIcons";
import { MyWorldNavButton } from "@/components/myworld/AvatarCircle";
import { loadProgress, subscribeProgress } from "@/lib/progress";
import { playTapSound } from "@/lib/audio";

type TopNavProps = {
  activeId: CategoryId;
  onSelect: (id: CategoryId) => void;
  onMyWorldPress?: () => void;
};

function lighten(hex: string, amount = 0.22): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, ((n >> 16) & 0xff) + Math.round(255 * amount));
  const g = Math.min(255, ((n >> 8) & 0xff) + Math.round(255 * amount));
  const b = Math.min(255, (n & 0xff) + Math.round(255 * amount));
  return `rgb(${r},${g},${b})`;
}

function CategoryTab({
  id, label, isActive, onSelect, row,
}: {
  id: CategoryId; label: string; isActive: boolean; onSelect: (id: CategoryId) => void; row: "top" | "bottom";
}) {
  const tab = theme.tabs[id];

  return (
    <GameMenuButton
      label={label}
      isActive={isActive}
      row={row}
      bgColor={tab.bg}
      ringColor={tab.textOutline}
      lightColor={lighten(tab.bg)}
      shadowColor={tab.textOutline}
      textOutline={tab.textOutline}
      onClick={() => onSelect(id)}
    >
      <TabIcon id={id} className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
    </GameMenuButton>
  );
}

function ShopButton() {
  return (
    <div
      className="flex w-[12%] min-w-[56px] max-w-[72px] shrink-0 items-center justify-center self-stretch px-1"
      style={{ backgroundColor: theme.navPurple }}
    >
      <GameCircleButton color="green" size="sm" label="Shop">
        <ShopIcon className="h-6 w-6" />
      </GameCircleButton>
    </div>
  );
}

function useAvatarId() {
  return useSyncExternalStore(
    subscribeProgress,
    () => loadProgress().avatarId,
    () => "mascot" as const,
  );
}

export function TopNav({ activeId, onSelect, onMyWorldPress }: TopNavProps) {
  const topTabs = categories.filter((c) => c.row === "top");
  const bottomTabs = categories.filter((c) => c.row === "bottom");
  const avatarId = useAvatarId();

  return (
    <div className="shrink-0">
      <div className="flex items-stretch gap-px">
        <MyWorldNavButton
          avatarId={avatarId}
          onPress={() => { playTapSound(); onMyWorldPress?.(); }}
        />
        <div className="flex flex-1 gap-0.5">
          {topTabs.map((tab) => (
            <CategoryTab key={tab.id} id={tab.id} label={tab.label} isActive={activeId === tab.id} onSelect={onSelect} row="top" />
          ))}
        </div>
        <ShopButton />
      </div>
      <div className="flex gap-0.5">
        {bottomTabs.map((tab) => (
          <CategoryTab key={tab.id} id={tab.id} label={tab.label} isActive={activeId === tab.id} onSelect={onSelect} row="bottom" />
        ))}
      </div>
    </div>
  );
}
