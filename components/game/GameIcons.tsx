/** Filled, thick-stroke game-style icons for children */

type IconProps = { className?: string };

export function PencilIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="#fff" aria-hidden>
      <path d="M4 28l2.5-.5L22 12l-4-4L4.5 23.5 4 28z" />
      <path d="M22 8l4-4 2 2-4 4-2-2z" opacity="0.85" />
    </svg>
  );
}

export function SoundIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="#fff" aria-hidden>
      <path d="M6 12v8h5l7 6V6l-7 6H6z" />
      <path d="M24 10a6 6 0 010 12M27 7a10 10 0 010 18" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function EraserIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="#fff" aria-hidden>
      <path d="M22 4l6 6-14 14H8v-6L22 4z" />
      <rect x="6" y="26" width="20" height="3" rx="1" />
    </svg>
  );
}

export function CameraIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="#fff" aria-hidden>
      <path d="M14 8h4l2-3h8a3 3 0 013 3v14a3 3 0 01-3 3H8a3 3 0 01-3-3V11a3 3 0 013-3h6z" />
      <circle cx="16" cy="17" r="5" fill="none" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

export function DeleteIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="#fff" aria-hidden>
      <path d="M8 10h16v16a2 2 0 01-2 2H10a2 2 0 01-2-2V10z" />
      <path d="M6 8h20M13 6h6l1 2H12l1-2z" />
      <rect x="13" y="14" width="2.5" height="9" rx="0.5" />
      <rect x="16.5" y="14" width="2.5" height="9" rx="0.5" />
    </svg>
  );
}

export function BackIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M18 6L8 16l10 10" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlayIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="#fff" aria-hidden>
      <path d="M10 6v20l16-10L10 6z" />
    </svg>
  );
}

export function StarIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="#fff" aria-hidden>
      <path d="M16 3l4 8.2 9 1.3-6.5 6.3 1.5 9L16 23.5 7.5 27.8 9 18.8 2.5 12.5l9-1.3L16 3z" />
    </svg>
  );
}

export function AppsIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="#fff" aria-hidden>
      <circle cx="9" cy="9" r="3.5" />
      <circle cx="23" cy="9" r="3.5" />
      <circle cx="9" cy="23" r="3.5" />
      <circle cx="23" cy="23" r="3.5" />
    </svg>
  );
}

export function DrawIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="6" y="6" width="14" height="14" rx="2" fill="none" stroke="#fff" strokeWidth="2.5" />
      <path d="M18 10l8-8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 4l6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function NotebookIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="7" y="4" width="18" height="24" rx="2.5" fill="none" stroke="#fff" strokeWidth="2.5" />
      <line x1="13" y1="4" x2="13" y2="28" stroke="#fff" strokeWidth="2" strokeDasharray="3 2" />
      <line x1="16" y1="11" x2="22" y2="11" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="16" x2="22" y2="16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MuteIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M6 12v8h5l7 6V6l-7 6H6z" fill="#fff" />
      <path d="M24 10l8 8M32 10l-8 8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function CheckIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M6 17l7 7L26 9" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MenuIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="#fff" aria-hidden>
      <circle cx="8" cy="8" r="2.5" />
      <circle cx="8" cy="16" r="2.5" />
      <circle cx="8" cy="24" r="2.5" />
      <rect x="14" y="6.5" width="14" height="3" rx="1.5" />
      <rect x="14" y="14.5" width="14" height="3" rx="1.5" />
      <rect x="14" y="22.5" width="14" height="3" rx="1.5" />
    </svg>
  );
}

export function ShopIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="#fff" aria-hidden>
      <path d="M6 12l2-8h16l2 8H6z" />
      <path d="M8 12v12a2 2 0 002 2h12a2 2 0 002-2V12" fill="none" stroke="#fff" strokeWidth="2.5" />
      <circle cx="13" cy="20" r="2" />
      <circle cx="19" cy="20" r="2" />
    </svg>
  );
}
