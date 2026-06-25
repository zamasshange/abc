import { DotsGalleryArt } from "@/components/illustrations/DotsGalleryArt";
import { LineGalleryArt } from "@/components/illustrations/LineGalleryArt";
import { CurveGalleryArt } from "@/components/illustrations/CurveGalleryArt";
import { PracticeGalleryArt } from "@/components/illustrations/PracticeGalleryArt";
import { AlphabetTraceGalleryArt } from "@/components/illustrations/AlphabetTraceGalleryArt";

const GREEN_BORDER = "border-[3px] border-[#1B6B3A]";

export function GalleryCardArt({ galleryId, cardId, label }: { galleryId: string; cardId: string; label?: string }) {
  if (galleryId === "lines-dots") {
    return <DotsGalleryArt cardId={cardId} />;
  }
  if (galleryId === "lines-line") {
    return <LineGalleryArt cardId={cardId} />;
  }
  if (galleryId === "lines-curve") {
    return <CurveGalleryArt cardId={cardId} />;
  }
  if (galleryId === "lines-practice") {
    return <PracticeGalleryArt cardId={cardId} />;
  }
  if (galleryId === "alphabet-trace-upper") {
    return <AlphabetTraceGalleryArt cardId={cardId} />;
  }
  const border = GREEN_BORDER;
  if (galleryId === "pixel-art-pick") return <div className={`flex aspect-square w-[26vw] max-w-[170px] min-w-[90px] items-center justify-center bg-white p-1 ${border}`}><PixelPreview id={cardId} /></div>;
  if (galleryId === "connect-worksheets") return (
    <div className={`flex aspect-[4/5] w-[28vw] max-w-[180px] min-w-[100px] flex-col bg-[#BDBDBD] p-1 ${border}`}>
      <p className="text-center text-[8px] font-bold text-black">{label ?? "Connect The Dots."}</p>
      <div className="flex flex-1 items-center justify-center bg-white"><ConnectPreview id={cardId} /></div>
    </div>
  );
  if (galleryId === "alphabet-worksheets") {
    return (
      <div className={`flex aspect-square w-[22vw] max-w-[150px] min-w-[80px] flex-col items-center bg-white p-2 ${border}`}>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black">{label ?? "A"}</span>
          <span className="text-xl">{({ A: "🍎", B: "⚽", C: "🚗" } as Record<string, string>)[label ?? "A"] ?? "⭐"}</span>
        </div>
        <div className="mt-2 w-full border-t border-gray-300 pt-1">
          <div className="flex justify-around">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="text-sm font-bold text-gray-400" style={{ fontFamily: "cursive" }}>{label ?? "A"}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (galleryId === "shapes-worksheets") return <div className={`flex aspect-square w-[26vw] max-w-[170px] min-w-[90px] items-center justify-center bg-[#9E9E9E] p-2 ${border}`}><ShapePreview id={cardId} /></div>;
  if (galleryId === "printables") return <div className={`flex aspect-square w-[26vw] max-w-[170px] min-w-[90px] items-center justify-center bg-white p-2 ${border}`}><PrintablePreview id={cardId} /></div>;
  return <div className={`flex aspect-square w-[26vw] max-w-[170px] min-w-[90px] items-center justify-center bg-white p-3 ${border}`}><LinesPreview id={cardId} /></div>;
}

function LinesPreview({ id }: { id: string }) {
  const dash = "5 4";
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden>
      {id === "vertical" && <><text x="4" y="22" fontSize="14">📏</text><line x1="28" y1="18" x2="28" y2="62" stroke="#999" strokeWidth="2" strokeDasharray={dash} /></>}
      {id === "slant" && <><text x="4" y="22" fontSize="14">✏️</text><line x1="28" y1="58" x2="68" y2="18" stroke="#999" strokeWidth="2" strokeDasharray={dash} /></>}
      {id === "arrow" && <><text x="4" y="30" fontSize="18">↖</text><line x1="28" y1="58" x2="68" y2="18" stroke="#999" strokeWidth="2" strokeDasharray={dash} /></>}
    </svg>
  );
}

function ShapePreview({ id }: { id: string }) {
  if (id === "mouse") return <svg viewBox="0 0 60 60" className="h-full w-full"><polygon points="30,8 50,28 10,28" fill="none" stroke="#111" strokeWidth="2" /><circle cx="18" cy="18" r="10" fill="none" stroke="#111" strokeWidth="2" /><circle cx="42" cy="18" r="10" fill="none" stroke="#111" strokeWidth="2" /></svg>;
  if (id === "bus") return <svg viewBox="0 0 60 60" className="h-full w-full"><rect x="8" y="20" width="44" height="24" fill="none" stroke="#111" strokeWidth="2" /><circle cx="18" cy="48" r="6" fill="none" stroke="#111" strokeWidth="2" /><circle cx="42" cy="48" r="6" fill="none" stroke="#111" strokeWidth="2" /></svg>;
  return <svg viewBox="0 0 60 60" className="h-full w-full"><polygon points="30,6 42,22 18,22" fill="none" stroke="#111" strokeWidth="2" /><rect x="20" y="22" width="20" height="28" fill="none" stroke="#111" strokeWidth="2" /></svg>;
}

function ConnectPreview({ id }: { id: string }) {
  const dots = (pts: [number, number][]) => pts.map(([x, y], i) => (
    <g key={i}><circle cx={x} cy={y} r="4" fill="#111" /><text x={x} y={y + 2} textAnchor="middle" fontSize="5" fill="#fff">{i + 1}</text></g>
  ));
  if (id === "melon") return <svg viewBox="0 0 60 50"><path d="M10 40 A25 25 0 0 1 50 40" fill="none" stroke="#111" strokeWidth="1.5" />{dots([[20,40],[30,22],[40,40],[50,40]])}</svg>;
  if (id === "elephant") return <svg viewBox="0 0 60 50"><ellipse cx="30" cy="28" rx="18" ry="14" fill="none" stroke="#111" strokeWidth="1.5" />{dots([[14,20],[22,18],[30,16],[38,18],[46,22]])}</svg>;
  return <svg viewBox="0 0 60 50"><polygon points="30,8 50,42 10,42" fill="none" stroke="#111" strokeWidth="1.5" />{dots([[30,8],[40,25],[50,42],[30,35],[10,42]])}</svg>;
}

function PixelPreview({ id }: { id: string }) {
  const colors: Record<string, string> = { w: "#fff", o: "#FF9800", g: "#4CAF50", b: "#795548", bl: "#42A5F5" };
  const grids: Record<string, string[]> = {
    orange: "w".repeat(144).split("").map((_, i) => { const r=Math.floor(i/12), c=i%12; return r<2&&c>4&&c<8?"g":r>3&&r<9&&c>3&&c<9?"o":"w"; }),
    tree: "w".repeat(144).split("").map((_, i) => { const r=Math.floor(i/12), c=i%12; return r>9&&c>4&&c<8?"b":r>2&&r<10&&Math.abs(c-6)+r<10?"g":"w"; }),
    whale: "w".repeat(144).split("").map((_, i) => { const r=Math.floor(i/12), c=i%12; return r>4&&r<8&&c>2&&c<10?"bl":"w"; }),
  };
  return <div className="grid grid-cols-12 gap-px border border-[#8D6E63]">{(grids[id]??grids.orange).map((cell, i) => <div key={i} className="aspect-square w-[10px]" style={{ backgroundColor: colors[cell] }} />)}</div>;
}

function PrintablePreview({ id }: { id: string }) {
  if (id === "rocket") return <svg viewBox="0 0 60 60"><polygon points="30,8 38,28 22,28" fill="none" stroke="#111" strokeWidth="2" /><rect x="22" y="28" width="16" height="22" fill="none" stroke="#111" strokeWidth="2" /></svg>;
  if (id === "dino") return <svg viewBox="0 0 60 60"><ellipse cx="28" cy="32" rx="16" ry="12" fill="none" stroke="#111" strokeWidth="2" /><path d="M44 28 L54 20 L54 36 Z" fill="none" stroke="#111" strokeWidth="2" /></svg>;
  return <svg viewBox="0 0 60 60"><ellipse cx="30" cy="34" rx="14" ry="10" fill="none" stroke="#111" strokeWidth="2" /><ellipse cx="22" cy="22" rx="8" ry="6" fill="none" stroke="#111" strokeDasharray="3 2" /></svg>;
}
