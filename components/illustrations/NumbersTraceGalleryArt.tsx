/** Numbers Tracing gallery thumbnails — handwriting lines + hollow digits */

function WritingLines() {
  return (
    <>
      <line x1="6" y1="26" x2="94" y2="26" stroke="#6BB6FF" strokeWidth="1.1" />
      <line x1="6" y1="50" x2="94" y2="50" stroke="#E53935" strokeWidth="0.9" strokeDasharray="3 2.5" />
      <line x1="6" y1="74" x2="94" y2="74" stroke="#6BB6FF" strokeWidth="1.1" />
    </>
  );
}

function digitSize(n: number): number {
  if (n >= 10) return 36;
  if (n === 1) return 52;
  return 48;
}

export function NumbersTraceGalleryArt({ cardId }: { cardId: string }) {
  const n = Number(cardId);
  const digit = Number.isFinite(n) ? String(n) : cardId;
  const size = Number.isFinite(n) ? digitSize(n) : 48;

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <WritingLines />
      <text
        x="50"
        y="64"
        textAnchor="middle"
        fontSize={size}
        fontFamily="var(--font-fredoka), Fredoka, sans-serif"
        fontWeight="700"
        fill="#fff"
        stroke="#1a1a1a"
        strokeWidth="2.2"
        paintOrder="stroke fill"
      >
        {digit}
      </text>
    </svg>
  );
}
