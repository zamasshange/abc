/** Numbers Spelling gallery thumbnails — digit + trace digits + dashed word on notebook lines */

import { getNumberPhonics } from "@/lib/phonics";
import { getSpellingCard } from "@/lib/numbers-spelling-gallery";

const DASH = "2 2";
const FONT = "var(--font-fredoka), Fredoka, sans-serif";

function NotebookLines({ yBase }: { yBase: number }) {
  return (
    <>
      <line x1="4" y1={yBase} x2="96" y2={yBase} stroke="#6BB6FF" strokeWidth="0.7" />
      <line x1="4" y1={yBase + 8} x2="96" y2={yBase + 8} stroke="#E53935" strokeWidth="0.55" strokeDasharray="2 2" />
      <line x1="4" y1={yBase + 16} x2="96" y2={yBase + 16} stroke="#6BB6FF" strokeWidth="0.7" />
    </>
  );
}

function digitFontSize(n: number): number {
  if (n >= 10) return 11;
  if (n === 1) return 14;
  return 13;
}

function wordFontSize(word: string): number {
  if (word.length > 8) return 6.5;
  if (word.length > 6) return 7;
  if (word.length > 4) return 8;
  return 9;
}

function SpellingRow({
  n,
  word,
  yBase,
  light,
}: {
  n: number;
  word: string;
  yBase: number;
  light?: boolean;
}) {
  const digit = String(n);
  const wordLower = word.toLowerCase();
  const digitSize = digitFontSize(n);
  const wordSize = wordFontSize(wordLower);
  const textY = yBase + 12;
  const solidColor = light ? "#bbb" : "#888";
  const dashColor = light ? "#ccc" : "#aaa";
  const dashW = light ? "0.8" : "1";
  const secondDigitX = n >= 10 ? 28 : 26;
  const wordX = n >= 10 ? 44 : wordLower.length > 6 ? 48 : 42;

  return (
    <g>
      <NotebookLines yBase={yBase} />
      <text
        x="8"
        y={textY}
        fontSize={digitSize}
        fontFamily={FONT}
        fontWeight="700"
        fill={solidColor}
      >
        {digit}
      </text>
      <text
        x="18"
        y={textY}
        fontSize={digitSize}
        fontFamily={FONT}
        fontWeight="700"
        fill="none"
        stroke={dashColor}
        strokeWidth={dashW}
        strokeDasharray={DASH}
      >
        {digit}
      </text>
      {n < 10 && (
        <text
          x={secondDigitX}
          y={textY}
          fontSize={digitSize}
          fontFamily={FONT}
          fontWeight="700"
          fill="none"
          stroke={dashColor}
          strokeWidth={dashW}
          strokeDasharray={DASH}
        >
          {digit}
        </text>
      )}
      <text
        x={wordX}
        y={textY}
        fontSize={wordSize}
        fontFamily={FONT}
        fontWeight="700"
        fill="none"
        stroke={dashColor}
        strokeWidth={dashW}
        strokeDasharray={DASH}
      >
        {wordLower}
      </text>
    </g>
  );
}

export function NumbersSpellingGalleryArt({ cardId }: { cardId: string }) {
  const card = getSpellingCard(cardId);
  const n = card?.number ?? Number(cardId);
  const word = getNumberPhonics(String(n)).word;

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <rect x="1" y="1" width="98" height="98" fill="#fff" />
      <SpellingRow n={n} word={word} yBase={10} />
      <SpellingRow n={n} word={word} yBase={54} light />
    </svg>
  );
}
