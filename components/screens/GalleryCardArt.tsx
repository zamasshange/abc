import type { GalleryId } from "@/lib/galleries";

type Props = {
  galleryId: GalleryId;
  cardIndex: number;
};

export function GalleryCardArt({ galleryId, cardIndex }: Props) {
  const border = "border-[4px] border-[#2D8B4E]";
  const size = "aspect-square w-[26vw] max-w-[170px] min-w-[90px]";

  if (galleryId === "pixel-art-pick") {
    const ids = ["orange", "tree", "whale"];
    return (
      <div className={`flex ${size} items-center justify-center bg-white p-1 ${border}`}>
        <PixelPreview id={ids[cardIndex] ?? "orange"} />
      </div>
    );
  }

  if (galleryId === "connect-worksheets") {
    const ids = ["melon", "elephant", "house"];
    return (
      <div className={`flex ${size} flex-col bg-[#BDBDBD] p-1 ${border}`}>
        <p className="text-center text-[8px] font-bold text-black">Connect The Dots.</p>
        <div className="flex flex-1 items-center justify-center bg-white">
          <ConnectPreview id={ids[cardIndex] ?? "melon"} />
        </div>
      </div>
    );
  }

  if (galleryId === "alphabet-worksheets") {
    const letters = ["A", "B", "C"];
    const icons = ["🍎", "⚽", "🚗"];
    const letter = letters[cardIndex] ?? "A";
    return (
      <div className={`flex ${size} flex-col items-center bg-white p-2 ${border}`}>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black">{letter}</span>
          <span className="text-xl">{icons[cardIndex]}</span>
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

  if (galleryId === "numbers-worksheets") {
    const nums = ["1", "2", "3"];
    const words = ["one", "two", "three"];
    const n = nums[cardIndex] ?? "1";
    return (
      <div className={`flex ${size} flex-col justify-center bg-white p-3 ${border}`}>
        <div className="text-3xl font-black text-gray-700">{n}</div>
        <div className="mt-2 border-t border-gray-200 pt-2 text-lg text-gray-400" style={{ fontFamily: "cursive" }}>
          {words[cardIndex]}
        </div>
      </div>
    );
  }

  if (galleryId === "shapes-worksheets") {
    const ids = ["mouse", "bus", "rocket"];
    return (
      <div className={`flex ${size} items-center justify-center bg-[#9E9E9E] p-2 ${border}`}>
        <ShapePreview id={ids[cardIndex] ?? "mouse"} />
      </div>
    );
  }

  if (galleryId === "printables") {
    const ids = ["rocket", "dino", "bee"];
    return (
      <div className={`flex ${size} items-center justify-center bg-white p-2 ${border}`}>
        <PrintablePreview id={ids[cardIndex] ?? "rocket"} />
      </div>
    );
  }

  const lineTypes = ["vertical", "slant", "arrow"] as const;
  return (
    <div className={`flex ${size} items-center justify-center bg-white p-3 ${border}`}>
      <LinesPreview id={lineTypes[cardIndex] ?? "vertical"} />
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
        </>
      )}
      {id === "slant" && (
        <line x1="28" y1="58" x2="68" y2="18" stroke="#999" strokeWidth="2" strokeDasharray={dash} />
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

function ShapePreview({ id }: { id: string }) {
  if (id === "mouse") {
    return (
      <svg viewBox="0 0 60 60" className="h-full w-full" aria-hidden>
        <polygon points="30,8 50,28 10,28" fill="none" stroke="#111" strokeWidth="2" />
        <circle cx="18" cy="18" r="10" fill="none" stroke="#111" strokeWidth="2" />
        <circle cx="42" cy="18" r="10" fill="none" stroke="#111" strokeWidth="2" />
      </svg>
    );
  }
  if (id === "bus") {
    return (
      <svg viewBox="0 0 60 60" className="h-full w-full" aria-hidden>
        <rect x="8" y="20" width="44" height="24" rx="2" fill="none" stroke="#111" strokeWidth="2" />
        <circle cx="18" cy="48" r="6" fill="none" stroke="#111" strokeWidth="2" />
        <circle cx="42" cy="48" r="6" fill="none" stroke="#111" strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 60" className="h-full w-full" aria-hidden>
      <polygon points="30,6 42,22 18,22" fill="none" stroke="#111" strokeWidth="2" />
      <rect x="20" y="22" width="20" height="28" fill="none" stroke="#111" strokeWidth="2" />
    </svg>
  );
}

function ConnectPreview({ id }: { id: string }) {
  if (id === "melon") {
    return (
      <svg viewBox="0 0 60 50" className="h-full w-full" aria-hidden>
        <path d="M10 40 A25 25 0 0 1 50 40" fill="none" stroke="#111" strokeWidth="1.5" />
      </svg>
    );
  }
  if (id === "elephant") {
    return (
      <svg viewBox="0 0 60 50" className="h-full w-full" aria-hidden>
        <ellipse cx="30" cy="28" rx="18" ry="14" fill="none" stroke="#111" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 50" className="h-full w-full" aria-hidden>
      <polygon points="30,8 50,42 10,42" fill="none" stroke="#111" strokeWidth="1.5" />
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
        r > 4 && r < 8 && c > 2 && c < 10 ? "bl" : "w",
      ),
    ),
  };
  const colors: Record<string, string> = { w: "#fff", o: "#FF9800", g: "#4CAF50", b: "#795548", bl: "#42A5F5" };
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
      </svg>
    );
  }
  if (id === "dino") {
    return (
      <svg viewBox="0 0 60 60" className="h-full w-full" aria-hidden>
        <ellipse cx="28" cy="32" rx="16" ry="12" fill="none" stroke="#111" strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 60" className="h-full w-full" aria-hidden>
      <ellipse cx="30" cy="34" rx="14" ry="10" fill="none" stroke="#111" strokeWidth="2" />
    </svg>
  );
}
