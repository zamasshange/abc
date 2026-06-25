/** Alphabets Match — line-art pictures for letter matching */

import type { ReactNode } from "react";

const S = "#1a1a1a";

export function MatchPictureIcon({ id, size = 72 }: { id: string; size?: number }) {
  const icons: Record<string, ReactNode> = {
    apple: (
      <>
        <circle cx="36" cy="42" r="18" fill="none" stroke={S} strokeWidth="2.2" />
        <path d="M36 24 Q40 18 44 22" fill="none" stroke={S} strokeWidth="1.8" />
        <line x1="42" y1="20" x2="48" y2="14" stroke={S} strokeWidth="1.6" />
      </>
    ),
    rainbow: (
      <>
        <path d="M18 48 Q36 18 54 48" fill="none" stroke={S} strokeWidth="2" />
        <path d="M22 48 Q36 24 50 48" fill="none" stroke={S} strokeWidth="2" />
        <path d="M26 48 Q36 30 46 48" fill="none" stroke={S} strokeWidth="2" />
        <ellipse cx="18" cy="48" rx="8" ry="5" fill="none" stroke={S} strokeWidth="1.6" />
        <ellipse cx="54" cy="48" rx="8" ry="5" fill="none" stroke={S} strokeWidth="1.6" />
      </>
    ),
    flag: (
      <>
        <line x1="24" y1="16" x2="24" y2="58" stroke={S} strokeWidth="2.2" />
        <path d="M24 18 L52 26 L52 42 L24 34 Z" fill="none" stroke={S} strokeWidth="2" />
        <line x1="30" y1="22" x2="46" y2="26" stroke={S} strokeWidth="1" />
        <line x1="30" y1="30" x2="46" y2="34" stroke={S} strokeWidth="1" />
      </>
    ),
    ball: (
      <>
        <circle cx="36" cy="38" r="20" fill="none" stroke={S} strokeWidth="2.2" />
        <path d="M18 38 Q36 24 54 38" fill="none" stroke={S} strokeWidth="1.6" />
      </>
    ),
    cat: (
      <>
        <ellipse cx="36" cy="42" rx="18" ry="14" fill="none" stroke={S} strokeWidth="2" />
        <polygon points="22,30 26,18 30,30" fill="none" stroke={S} strokeWidth="1.8" />
        <polygon points="42,30 46,18 50,30" fill="none" stroke={S} strokeWidth="1.8" />
      </>
    ),
    dog: (
      <>
        <ellipse cx="36" cy="42" rx="20" ry="14" fill="none" stroke={S} strokeWidth="2" />
        <ellipse cx="22" cy="28" rx="8" ry="10" fill="none" stroke={S} strokeWidth="1.8" />
        <ellipse cx="50" cy="28" rx="8" ry="10" fill="none" stroke={S} strokeWidth="1.8" />
      </>
    ),
    egg: <ellipse cx="36" cy="40" rx="14" ry="18" fill="none" stroke={S} strokeWidth="2.2" />,
    grapes: (
      <>
        <circle cx="28" cy="34" r="7" fill="none" stroke={S} strokeWidth="1.8" />
        <circle cx="40" cy="30" r="7" fill="none" stroke={S} strokeWidth="1.8" />
        <circle cx="44" cy="42" r="7" fill="none" stroke={S} strokeWidth="1.8" />
        <circle cx="32" cy="46" r="7" fill="none" stroke={S} strokeWidth="1.8" />
        <path d="M36 22 Q38 16 40 22" fill="none" stroke={S} strokeWidth="1.6" />
      </>
    ),
    hat: (
      <>
        <rect x="20" y="36" width="32" height="14" fill="none" stroke={S} strokeWidth="2" />
        <ellipse cx="36" cy="36" rx="22" ry="8" fill="none" stroke={S} strokeWidth="2" />
      </>
    ),
    igloo: (
      <>
        <path d="M16 50 Q36 22 56 50 Z" fill="none" stroke={S} strokeWidth="2.2" />
        <rect x="28" y="42" width="16" height="10" fill="none" stroke={S} strokeWidth="1.8" />
      </>
    ),
    juice: (
      <>
        <rect x="26" y="28" width="20" height="28" rx="2" fill="none" stroke={S} strokeWidth="2" />
        <line x1="30" y1="24" x2="42" y2="24" stroke={S} strokeWidth="2" />
        <line x1="30" y1="36" x2="42" y2="36" stroke={S} strokeWidth="1.2" />
      </>
    ),
    kite: (
      <>
        <path d="M36 16 L52 38 L36 48 L20 38 Z" fill="none" stroke={S} strokeWidth="2.2" />
        <line x1="36" y1="48" x2="36" y2="56" stroke={S} strokeWidth="1.8" />
      </>
    ),
    lion: (
      <>
        <circle cx="36" cy="38" r="20" fill="none" stroke={S} strokeWidth="2" />
        <circle cx="36" cy="38" r="12" fill="none" stroke={S} strokeWidth="1.4" />
      </>
    ),
    moon: (
      <path d="M44 20 Q28 28 28 44 Q28 56 44 52 Q34 48 34 36 Q34 26 44 20" fill="none" stroke={S} strokeWidth="2.2" />
    ),
    nest: (
      <>
        <path d="M18 44 Q36 56 54 44" fill="none" stroke={S} strokeWidth="2.2" />
        <ellipse cx="36" cy="40" rx="14" ry="6" fill="none" stroke={S} strokeWidth="1.8" />
      </>
    ),
    orange: (
      <>
        <circle cx="36" cy="40" r="18" fill="none" stroke={S} strokeWidth="2.2" />
        <line x1="36" y1="22" x2="36" y2="16" stroke={S} strokeWidth="1.6" />
        <path d="M38 18 Q42 14 44 18" fill="none" stroke={S} strokeWidth="1.4" />
      </>
    ),
    penguin: (
      <>
        <ellipse cx="36" cy="42" rx="14" ry="18" fill="none" stroke={S} strokeWidth="2" />
        <ellipse cx="36" cy="44" rx="8" ry="12" fill="none" stroke={S} strokeWidth="1.4" />
      </>
    ),
    queen: (
      <>
        <circle cx="36" cy="34" r="12" fill="none" stroke={S} strokeWidth="2" />
        <path d="M24 46 L30 38 L36 46 L42 38 L48 46" fill="none" stroke={S} strokeWidth="2" />
      </>
    ),
    sun: (
      <>
        <circle cx="36" cy="38" r="12" fill="none" stroke={S} strokeWidth="2.2" />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4;
          const x1 = 36 + Math.cos(a) * 16;
          const y1 = 38 + Math.sin(a) * 16;
          const x2 = 36 + Math.cos(a) * 22;
          const y2 = 38 + Math.sin(a) * 22;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={S} strokeWidth="1.8" />;
        })}
      </>
    ),
    tree: (
      <>
        <rect x="32" y="40" width="8" height="18" fill="none" stroke={S} strokeWidth="2" />
        <circle cx="36" cy="30" r="16" fill="none" stroke={S} strokeWidth="2" />
      </>
    ),
    umbrella: (
      <>
        <path d="M16 38 Q36 18 56 38" fill="none" stroke={S} strokeWidth="2.2" />
        <line x1="36" y1="38" x2="36" y2="56" stroke={S} strokeWidth="2" />
      </>
    ),
    violin: (
      <>
        <ellipse cx="36" cy="42" rx="10" ry="14" fill="none" stroke={S} strokeWidth="2" />
        <line x1="36" y1="28" x2="36" y2="56" stroke={S} strokeWidth="1.6" />
        <path d="M44 30 L48 24" stroke={S} strokeWidth="1.8" />
      </>
    ),
    whale: (
      <>
        <path d="M14 40 Q28 24 50 36 Q56 40 50 46 Q30 54 14 40" fill="none" stroke={S} strokeWidth="2.2" />
        <circle cx="22" cy="38" r="2" fill={S} />
      </>
    ),
    xylophone: (
      <>
        <rect x="18" y="32" width="36" height="6" fill="none" stroke={S} strokeWidth="2" />
        {[24, 32, 40, 48].map((x) => (
          <line key={x} x1={x} y1="38" x2={x} y2="52" stroke={S} strokeWidth="2" />
        ))}
      </>
    ),
    yacht: (
      <>
        <path d="M16 46 L56 46 L48 34 L24 34 Z" fill="none" stroke={S} strokeWidth="2" />
        <line x1="36" y1="34" x2="36" y2="18" stroke={S} strokeWidth="2" />
        <path d="M36 18 L52 28" stroke={S} strokeWidth="1.8" />
      </>
    ),
    zebra: (
      <>
        <ellipse cx="36" cy="42" rx="22" ry="14" fill="none" stroke={S} strokeWidth="2" />
        <line x1="24" y1="36" x2="48" y2="36" stroke={S} strokeWidth="1.2" />
        <line x1="26" y1="42" x2="46" y2="42" stroke={S} strokeWidth="1.2" />
        <line x1="28" y1="48" x2="44" y2="48" stroke={S} strokeWidth="1.2" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 72 72" width={size} height={size} className="shrink-0" aria-hidden>
      {icons[id] ?? icons.apple}
    </svg>
  );
}
