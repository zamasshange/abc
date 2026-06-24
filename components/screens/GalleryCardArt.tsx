type Props = {
  galleryId: string;
  cardId: string;
  label?: string;
};

export function GalleryCardArt({ galleryId, cardId, label }: Props) {
  const border = "border-[4px] border-[#2D8B4E]";

  if (galleryId === "pixel-art-pick") {
    return (
      <div className={`flex aspect-square w-[26vw] max-w-[170px] min-w-[90px] items-center justify-center bg-white p-1 ${border}`}>
        <PixelPreview id={cardId} />
      </div>
    );
  }

  if (galleryId === "connect-worksheets") {
    return (
      <div className={`flex aspect-[4/5] w-[28vw] max-w-[180px] min-w-[100px] flex-col bg-[#BDBDBD] p-1 ${border}`}>
        <p className="text-center text-[8px] font-bold text-black">{label ?? "Connect The Dots."}</p>
        <div className="flex flex-1 items-center justify-center bg-white">
          <ConnectPreview id={cardId} />
        </div>
      </div>
    );
  }

  if (galleryId === "alphabet-worksheets") {
    const letter = label ?? "A";
    return (
      <div className={`flex aspect-square w-[26vw] max-w-[170px] min-w-[90px] flex-col items-center bg-white p-2 ${border}`}>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black">{letter}</span>
          <AlphabetIcon letter={letter} />
        </div>
        <div className="mt-2 w-full border-t border-gray-300 pt-1">
          <div className="flex justify-around">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="text-sm font-bold text-gray-400" style={{ fontFamily: "cursive" }}>
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (galleryId === "shapes-worksheets") {
    return (
      <div className={`flex aspect-square w-[26vw] max-w-[170px] min-w-[90px] items-center justify-center bg-[#9E9E9E] p-2 ${border}`}>
        <ShapePreview id={cardId} />
      </div>
    );
  }

  if (galleryId === "printables") {
    return (
      <div className={`flex aspect-square w-[26vw] max-w-[170px] min-w-[90px] items-center justify-center bg-white p-2 ${border}`}>
        <PrintablePreview id={cardId} />
      </div>
    );
  }

  // lines-worksheets default
  return (
    <div className={`flex aspect-square w-[26vw] max-w-[170px] min-w-[90px] items-center justify-center bg-white p-3 ${border}`}>
      <LinesPreview id={cardId} />
    </div>
  );
}

function LinesPreview({ id }: { id: string }) {
  const dash = "5 4";
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden>
      {id === "vertical" && (
        <>
          <text x="4" y="22" fontSize="14">📏</text>
          <line x1="28" y1="18" x2="28" y2="62" stroke="#999" strokeWidth="2" strokeDasharray={dash} />
          <text x="4" y="42" fontSize="14">📏</text>
          <line x1="28" y1="38" x2="28" y2="72" stroke="#999" strokeWidth="2" strokeDasharray={dash} />
        </>
      )}
      {id === "slant" && (
        <>
          <text x="4" y="22" fontSize="14">✏️</text>
          <line x1="28" y1="58" x2="68" y2="18" stroke="#999" strokeWidth="2" strokeDasharray={dash} />
          <text x="4" y="52" fontSize="14">✏️</text>
          <line x1="28" y1="68" x2="68" y2="28" stroke="#999" strokeWidth="2" strokeDasharray={dash} />
        </>
      )}
      {id === "arrow" && (
        <>
          <text x="4" y="30" fontSize="18">↖</text>
          <line x1="28" y1="58" x2="68" y2="18" stroke="#999" strokeWidth="2" strokeDasharray={dash} />
        </>
      )}
    </svg>
  );
}

function AlphabetIcon({ letter }: { letter: string }) {
  const icons: Record<string, string> = { A: "🍎", B: "⚽", C: "🚗" };
  return <span className="text-xl">{icons[letter] ?? "⭐"}</span>;
}

function ShapePreview({ id }: { id: string }) {
  if (id === "mouse") {
    return (
      <svg viewBox="0 0 60 60" className="h-full w-full" aria-hidden>
        <polygon points="30,8 50,28 10,28" fill="none" stroke="#111" strokeWidth="2" />
        <circle cx="18" cy="18" r="10" fill="none" stroke="#111" strokeWidth="2" />
        <circle cx="42" cy="18" r="10" fill="none" stroke="#111" strokeWidth="2" />
        <circle cx="24" cy="32" r="3" fill="#111" />
        <circle cx="36" cy="32" r="3" fill="#111" />
        <polygon points="30,38 26,44 34,44" fill="#111" />
      </svg>
    );
  }
  if (id === "bus") {
    return (
      <svg viewBox="0 0 60 60" className="h-full w-full" aria-hidden>
        <rect x="8" y="20" width="44" height="24" rx="2" fill="none" stroke="#111" strokeWidth="2" />
        <rect x="14" y="26" width="12" height="10" fill="none" stroke="#111" strokeWidth="1.5" />
        <rect x="30" y="26" width="12" height="10" fill="none" stroke="#111" strokeWidth="1.5" />
        <circle cx="18" cy="48" r="6" fill="none" stroke="#111" strokeWidth="2" />
        <circle cx="42" cy="48" r="6" fill="none" stroke="#111" strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 60" className="h-full w-full" aria-hidden>
      <polygon points="30,6 42,22 18,22" fill="none" stroke="#111" strokeWidth="2" />
      <rect x="20" y="22" width="20" height="28" fill="none" stroke="#111" strokeWidth="2" />
      <circle cx="30" cy="32" r="5" fill="none" stroke="#111" strokeWidth="1.5" />
      <polygon points="14,38 20,50 20,38" fill="none" stroke="#111" strokeWidth="1.5" />
      <polygon points="46,38 40,50 40,38" fill="none" stroke="#111" strokeWidth="1.5" />
    </svg>
  );
}

function ConnectPreview({ id }: { id: string }) {
  if (id === "melon") {
    return (
      <svg viewBox="0 0 60 50" className="h-full w-full" aria-hidden>
        <path d="M10 40 A25 25 0 0 1 50 40" fill="none" stroke="#111" strokeWidth="1.5" />
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => {
          const a = Math.PI + (i / 7) * Math.PI;
          const x = 30 + 20 * Math.cos(a);
          const y = 40 + 20 * Math.sin(a);
          return (
            <g key={n}>
              <circle cx={x} cy={y} r="4" fill="#111" />
              <text x={x} y={y + 2} textAnchor="middle" fontSize="5" fill="#fff">{n}</text>
            </g>
          );
        })}
      </svg>
    );
  }
  if (id === "elephant") {
    return (
      <svg viewBox="0 0 60 50" className="h-full w-full" aria-hidden>
        <ellipse cx="30" cy="28" rx="18" ry="14" fill="none" stroke="#111" strokeWidth="1.5" />
        <path d="M12 28 Q4 32 6 42" fill="none" stroke="#111" strokeWidth="1.5" />
        {[1, 2, 3, 4, 5].map((n, i) => (
          <g key={n}>
            <circle cx={14 + i * 8} cy={20 - i} r="3.5" fill="#111" />
            <text x={14 + i * 8} y={21} textAnchor="middle" fontSize="4" fill="#fff">{n}</text>
          </g>
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 50" className="h-full w-full" aria-hidden>
      <polygon points="30,8 50,42 10,42" fill="none" stroke="#111" strokeWidth="1.5" />
      {[1, 2, 3, 4, 5].map((n, i) => (
        <g key={n}>
          <circle cx={18 + i * 6} cy={38 - i * 4} r="3.5" fill="#111" />
          <text x={18 + i * 6} y={39 - i * 4} textAnchor="middle" fontSize="4" fill="#fff">{n}</text>
        </g>
      ))}
    </svg>
  );
}

function PixelPreview({ id }: { id: string }) {
  const grids: Record<string, string[][]> = {
    orange: Array.from({ length: 12 }, (_, r) =>
      Array.from({ length: 12 }, (_, c) =>
        r < 2 && c > 4 && c < 8 ? "g" : r > 3 && r < 9 && c > 3 && c < 9 ? "o" : "w",
      ),
    ),
    tree: Array.from({ length: 12 }, (_, r) =>
      Array.from({ length: 12 }, (_, c) => {
        if (r > 9 && c > 4 && c < 8) return "b";
        if (r > 2 && r < 10 && Math.abs(c - 6) + r < 10) return "g";
        return "w";
      }),
    ),
    whale: Array.from({ length: 12 }, (_, r) =>
      Array.from({ length: 12 }, (_, c) =>
        r > 4 && r < 8 && c > 2 && c < 10 ? "bl" : r === 6 && c === 4 ? "k" : "w",
      ),
    ),
  };
  const colors: Record<string, string> = { w: "#fff", o: "#FF9800", g: "#4CAF50", b: "#795548", bl: "#42A5F5", k: "#111" };
  const grid = grids[id] ?? grids.orange;
  return (
    <div className="grid grid-cols-12 gap-px border border-[#8D6E63] p-0.5">
      {grid.flat().map((cell, i) => (
        <div key={i} className="aspect-square w-[10px]" style={{ backgroundColor: colors[cell] }} />
      ))}
    </div>
  );
}

function PrintablePreview({ id }: { id: string }) {
  if (id === "rocket") {
    return (
      <svg viewBox="0 0 60 60" className="h-full w-full" aria-hidden>
        <polygon points="30,8 38,28 22,28" fill="none" stroke="#111" strokeWidth="2" />
        <rect x="22" y="28" width="16" height="22" fill="none" stroke="#111" strokeWidth="2" />
        <circle cx="30" cy="36" r="4" fill="none" stroke="#111" strokeWidth="1.5" strokeDasharray="3 2" />
        <polygon points="22,38 14,48 22,48" fill="none" stroke="#111" strokeWidth="1.5" strokeDasharray="3 2" />
      </svg>
    );
  }
  if (id === "dino") {
    return (
      <svg viewBox="0 0 60 60" className="h-full w-full" aria-hidden>
        <ellipse cx="28" cy="32" rx="16" ry="12" fill="none" stroke="#111" strokeWidth="2" />
        <path d="M44 28 L54 20 L54 36 Z" fill="none" stroke="#111" strokeWidth="2" />
        <circle cx="20" cy="26" r="2" fill="#111" />
        <circle cx="24" cy="22" r="3" fill="none" stroke="#111" strokeDasharray="2 2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 60" className="h-full w-full" aria-hidden>
      <ellipse cx="30" cy="34" rx="14" ry="10" fill="none" stroke="#111" strokeWidth="2" />
      <ellipse cx="22" cy="22" rx="8" ry="6" fill="none" stroke="#111" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="18" y1="34" x2="42" y2="34" stroke="#111" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="18" y1="38" x2="42" y2="38" stroke="#111" strokeWidth="1.5" strokeDasharray="4 3" />
    </svg>
  );
}
