"use client";

import type { AvatarId } from "@/lib/my-world";
import { AVATARS } from "@/lib/my-world";

/** Smiling panda mascot — default avatar */
function MascotFace({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="24" r="22" fill="#fff" stroke="#1a1a1a" strokeWidth="2" />
      <circle cx="14" cy="14" r="8" fill="#1a1a1a" />
      <circle cx="34" cy="14" r="8" fill="#1a1a1a" />
      <ellipse cx="17" cy="22" rx="5" ry="6" fill="#1a1a1a" />
      <ellipse cx="31" cy="22" rx="5" ry="6" fill="#1a1a1a" />
      <circle cx="17" cy="22" r="2.5" fill="#5BC8F5" />
      <circle cx="31" cy="22" r="2.5" fill="#5BC8F5" />
      <ellipse cx="24" cy="30" rx="4" ry="3" fill="#1a1a1a" />
      <path d="M18 34 Q24 40 30 34" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="24" cy="33" rx="3" ry="2" fill="#FF99BB" />
    </svg>
  );
}

const EMOJI_MAP: Record<AvatarId, string> = Object.fromEntries(
  AVATARS.map((a) => [a.id, a.emoji]),
) as Record<AvatarId, string>;

type AvatarCircleProps = {
  avatarId: AvatarId;
  size?: "sm" | "md" | "lg";
  selected?: boolean;
  locked?: boolean;
  onClick?: () => void;
};

const sizes = { sm: "h-9 w-9 sm:h-10 sm:w-10", md: "h-14 w-14", lg: "h-20 w-20" };

export function AvatarCircle({ avatarId, size = "sm", selected, locked, onClick }: AvatarCircleProps) {
  const isButton = !!onClick;
  const inner = (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-full border-[3px] bg-gradient-to-b from-[#FFE082] to-[#FFCA28] shadow-md ${sizes[size]} ${selected ? "border-[#E91E63] ring-2 ring-[#F48FB1]" : "border-white"} ${locked ? "opacity-50 grayscale" : ""}`}
    >
      {avatarId === "mascot" ? (
        <MascotFace className="h-[85%] w-[85%]" />
      ) : (
        <span className={size === "sm" ? "text-xl" : size === "md" ? "text-3xl" : "text-5xl"}>
          {EMOJI_MAP[avatarId]}
        </span>
      )}
      {locked && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-lg">🔒</span>
      )}
    </div>
  );

  if (!isButton) return inner;

  return (
    <button type="button" onClick={onClick} disabled={locked} className="shrink-0" aria-label={`Avatar ${avatarId}`}>
      {inner}
    </button>
  );
}

export function MyWorldNavButton({ avatarId, onPress }: { avatarId: AvatarId; onPress?: () => void }) {
  return (
    <div
      className="flex w-[12%] min-w-[56px] max-w-[72px] shrink-0 items-center justify-center self-stretch px-1"
      style={{ backgroundColor: "#C49AE8" }}
    >
      <button
        type="button"
        onClick={onPress}
        className="relative touch-manipulation"
        aria-label="My World"
      >
        <AvatarCircle avatarId={avatarId} size="sm" />
        <span
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-white px-1.5 py-px text-[7px] font-extrabold text-white"
          style={{
            background: "linear-gradient(180deg, #ff80c4 0%, #ff4da6 100%)",
            boxShadow: "0 3px 0 #a01460",
          }}
        >
          MY WORLD
        </span>
      </button>
    </div>
  );
}
