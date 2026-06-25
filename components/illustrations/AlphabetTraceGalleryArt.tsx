/** Trace A–Z gallery thumbnails — handwriting lines + hollow uppercase letters */

function WritingLines() {
  return (
    <>
      <line x1="6" y1="26" x2="94" y2="26" stroke="#6BB6FF" strokeWidth="1.1" />
      <line x1="6" y1="50" x2="94" y2="50" stroke="#E53935" strokeWidth="0.9" strokeDasharray="3 2.5" />
      <line x1="6" y1="74" x2="94" y2="74" stroke="#6BB6FF" strokeWidth="1.1" />
    </>
  );
}

const LETTER_SIZE: Partial<Record<string, number>> = {
  i: 52,
  j: 52,
  l: 52,
  m: 44,
  w: 42,
};

export function AlphabetTraceGalleryArt({ cardId }: { cardId: string }) {
  const letter = cardId.toUpperCase();
  const size = LETTER_SIZE[cardId] ?? 48;

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
        {letter}
      </text>
    </svg>
  );
}
