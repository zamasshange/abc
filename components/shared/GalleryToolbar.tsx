"use client";

import {
  GameIconButton,
  GameSquareButton,
  AppsIcon,
  BackIcon,
  DrawIcon,
  MuteIcon,
  NotebookIcon,
  PlayIcon,
  StarIcon,
} from "@/components/game";

export function GalleryToolbar({
  onBack,
  onPlay,
  showCenterTabs,
  activeTab = "draw",
  onTabChange,
}: {
  onBack: () => void;
  onPlay?: () => void;
  showCenterTabs?: boolean;
  activeTab?: "draw" | "notebook";
  onTabChange?: (t: "draw" | "notebook") => void;
}) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-2 px-2 py-2">
      <div className="flex items-center gap-2">
        <GameIconButton color="pink" size="sm" label="Back" onClick={onBack} icon={<BackIcon />} />
        <GameIconButton color="pink" size="sm" label="Music muted" icon={<MuteIcon />} />
      </div>

      {showCenterTabs ? (
        <div className="flex items-center gap-2">
          <GameSquareButton
            color="pink"
            wide
            selected={activeTab === "draw"}
            label="Draw"
            onClick={() => onTabChange?.("draw")}
          >
            <DrawIcon />
          </GameSquareButton>
          <GameSquareButton
            color="blue"
            wide
            selected={activeTab === "notebook"}
            label="Notebook"
            onClick={() => onTabChange?.("notebook")}
          >
            <NotebookIcon />
          </GameSquareButton>
        </div>
      ) : (
        <div />
      )}

      <div className="flex items-center gap-2">
        <GameSquareButton color="orange" size="sm" label="Apps">
          <div className="flex flex-col items-center leading-none">
            <AppsIcon className="h-5 w-5" />
            <span className="mt-0.5 text-[8px] font-extrabold text-white drop-shadow-sm">Apps</span>
          </div>
        </GameSquareButton>
        <GameIconButton color="red" size="sm" label="Play" onClick={onPlay} icon={<PlayIcon />} />
        <GameIconButton color="green" size="sm" label="Star" icon={<StarIcon />} />
      </div>
    </div>
  );
}

const BORDER = "#1B6B3A";

export function WorksheetGalleryCard({ children, dimmed }: { children: React.ReactNode; dimmed?: boolean }) {
  return (
    <div
      className={`flex aspect-square w-[21vw] min-w-[96px] max-w-[148px] shrink-0 items-stretch shadow-sm ${dimmed ? "bg-[#9E9E9E]" : "bg-white"}`}
      style={{ border: `3px solid ${BORDER}` }}
    >
      {children}
    </div>
  );
}

/** @deprecated use WorksheetGalleryCard */
export const DotsGalleryCard = WorksheetGalleryCard;
