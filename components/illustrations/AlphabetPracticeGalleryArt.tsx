/** Alphabets Practice gallery — solid + dashed upper & lower rows */

const S = "#1a1a1a";
const DASH = "2 2";
const FONT = "var(--font-fredoka), Fredoka, sans-serif";

function LetterRow({
  letter,
  baselineY,
  solidX = 12,
  solidSize = 18,
  traceSize = 13,
}: {
  letter: string;
  baselineY: number;
  solidX?: number;
  solidSize?: number;
  traceSize?: number;
}) {
  const slots = [30, 46, 62, 78];
  const textY = baselineY + 4;

  return (
    <g>
      <line x1="8" y1={baselineY + 6} x2="92" y2={baselineY + 6} stroke="#B0BEC5" strokeWidth="0.7" />
      <text
        x={solidX}
        y={textY}
        fontSize={solidSize}
        fontFamily={FONT}
        fontWeight="700"
        fill={S}
      >
        {letter}
      </text>
      {slots.map((x, i) => (
        <text
          key={x}
          x={x}
          y={textY}
          textAnchor="middle"
          fontSize={traceSize}
          fontFamily={FONT}
          fontWeight="700"
          fill="none"
          stroke={i === 0 ? S : "#aaa"}
          strokeWidth={i === 0 ? "1.3" : "1"}
          strokeDasharray={i === 0 ? undefined : DASH}
        >
          {letter}
        </text>
      ))}
    </g>
  );
}

export function AlphabetPracticeGalleryArt({ cardId }: { cardId: string }) {
  const key = cardId.toLowerCase();
  const upper = key.toUpperCase();
  const lower = key;

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <LetterRow letter={upper} baselineY={22} solidSize={20} traceSize={14} />
      <LetterRow letter={lower} baselineY={58} solidSize={18} traceSize={13} />
    </svg>
  );
}
