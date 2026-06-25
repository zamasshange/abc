type TabIconProps = {
  id: string;
  className?: string;
  style?: React.CSSProperties;
};

export function TabIcon({ id, className = "h-7 w-7", style }: TabIconProps) {
  switch (id) {
    case "colors":
      return (
        <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden>
          <ellipse cx="22" cy="28" rx="14" ry="11" fill="#fff" stroke="#5C3D1E" strokeWidth="1.5" />
          <circle cx="15" cy="26" r="3.5" fill="#FF5555" />
          <circle cx="22" cy="22" r="3.5" fill="#55AAFF" />
          <circle cx="29" cy="26" r="3.5" fill="#FFDD55" />
          <circle cx="22" cy="32" r="3.5" fill="#2DB84D" />
          <rect x="32" y="8" width="5" height="20" rx="2" fill="#E8C49A" stroke="#5C3D1E" strokeWidth="1.5" transform="rotate(25 34.5 18)" />
          <ellipse cx="36" cy="6" rx="3.5" ry="2.5" fill="#FF5555" transform="rotate(25 36 6)" />
        </svg>
      );
    case "connect":
      return (
        <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden>
          <circle cx="10" cy="38" r="4.5" fill="#FFDD55" stroke="#1a1a1a" strokeWidth="1.2" />
          <circle cx="28" cy="22" r="4.5" fill="#FFDD55" stroke="#1a1a1a" strokeWidth="1.2" />
          <circle cx="38" cy="10" r="4.5" fill="#FFDD55" stroke="#1a1a1a" strokeWidth="1.2" />
          <line x1="14" y1="34" x2="24" y2="24" stroke="#FF66CC" strokeWidth="5" strokeLinecap="round" />
          <line x1="24" y1="24" x2="34" y2="14" stroke="#FF66CC" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    case "mazes":
      return (
        <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden>
          <rect x="8" y="8" width="32" height="32" rx="3" fill="#2DB84D" stroke="#1a6B30" strokeWidth="2" />
          <path d="M14 14 H34 M14 22 H26 M22 22 V34 M14 30 H30" stroke="#1a6B30" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "lines":
      return (
        <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden>
          <circle cx="8" cy="20" r="3.5" fill="#FFDD55" stroke="#1a1a1a" strokeWidth="1" />
          <circle cx="40" cy="20" r="3.5" fill="#FFDD55" stroke="#1a1a1a" strokeWidth="1" />
          <path d="M12 20 Q24 10 36 20" fill="none" stroke="#5CB85C" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="8" cy="32" r="3.5" fill="#FFDD55" stroke="#1a1a1a" strokeWidth="1" />
          <circle cx="40" cy="32" r="3.5" fill="#FFDD55" stroke="#1a1a1a" strokeWidth="1" />
          <path d="M12 32 Q24 22 36 32" fill="none" stroke="#5CB85C" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case "alphabets":
      return (
        <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden>
          <circle cx="24" cy="28" r="14" fill="#FF4444" stroke="#1a1a1a" strokeWidth="2" />
          <ellipse cx="24" cy="14" rx="5" ry="8" fill="#2DB84D" stroke="#1a6B30" strokeWidth="1.5" />
          <path d="M18 14 Q24 6 30 14" fill="none" stroke="#1a6B30" strokeWidth="2" />
        </svg>
      );
    case "numbers":
      return (
        <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden>
          <rect x="6" y="18" width="12" height="12" rx="2" fill="#55AAFF" stroke="#1a1a1a" strokeWidth="1.5" />
          <text x="12" y="27" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">1</text>
          <rect x="18" y="14" width="12" height="12" rx="2" fill="#FF66AA" stroke="#1a1a1a" strokeWidth="1.5" />
          <text x="24" y="23" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">2</text>
          <rect x="30" y="10" width="12" height="12" rx="2" fill="#FFDD55" stroke="#1a1a1a" strokeWidth="1.5" />
          <text x="36" y="19" textAnchor="middle" fill="#1a1a1a" fontSize="9" fontWeight="bold">3</text>
        </svg>
      );
    case "shapes":
      return (
        <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden>
          <polygon points="24,6 38,32 10,32" fill="#FF66AA" stroke="#1a1a1a" strokeWidth="1.5" />
          <circle cx="14" cy="38" r="8" fill="#FFDD55" stroke="#1a1a1a" strokeWidth="1.5" />
          <rect x="28" y="30" width="14" height="14" rx="2" fill="#2DB84D" stroke="#1a6B30" strokeWidth="1.5" />
        </svg>
      );
    default:
      return null;
  }
}

export function ShopIcon({
  className = "h-5 w-5",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" aria-hidden>
      <path
        d="M6 6h15l-1.5 9H8L6 6zM6 6L5 3H2M9 20a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
