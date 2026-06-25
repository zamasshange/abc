/** Cursive A–Z gallery thumbnails — ruled lines + solid + dashed tracing letters */

const CURSIVE = 'var(--font-cursive), "Caveat", cursive';

function WritingLines() {
  return (
    <>
      <line x1="4" y1="24" x2="96" y2="24" stroke="#6BB6FF" strokeWidth="1" />
      <line x1="4" y1="50" x2="96" y2="50" stroke="#E53935" strokeWidth="0.85" strokeDasharray="3 2.5" />
      <line x1="4" y1="76" x2="96" y2="76" stroke="#6BB6FF" strokeWidth="1" />
    </>
  );
}

const UPPER_SIZE: Partial<Record<string, number>> = {
  a: 24,
  b: 22,
  f: 22,
  g: 22,
  h: 22,
  i: 26,
  j: 26,
  l: 26,
  m: 18,
  n: 20,
  o: 22,
  p: 22,
  q: 22,
  r: 20,
  s: 22,
  t: 22,
  u: 22,
  v: 22,
  w: 17,
  x: 22,
  y: 22,
  z: 22,
};

const LOWER_SIZE: Partial<Record<string, number>> = {
  a: 22,
  b: 20,
  f: 20,
  g: 20,
  h: 20,
  i: 24,
  j: 24,
  l: 24,
  m: 16,
  n: 18,
  o: 20,
  p: 20,
  q: 20,
  r: 18,
  s: 20,
  t: 20,
  u: 20,
  v: 20,
  w: 15,
  x: 20,
  y: 20,
  z: 20,
};

function CursiveGlyph({
  letter,
  x,
  y,
  size,
  dashed,
}: {
  letter: string;
  x: number;
  y: number;
  size: number;
  dashed?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fontFamily={CURSIVE}
      fontWeight="700"
      fill={dashed ? "none" : "#1a1a1a"}
      stroke={dashed ? "#888" : undefined}
      strokeWidth={dashed ? 1.2 : undefined}
      strokeDasharray={dashed ? "2 2" : undefined}
    >
      {letter}
    </text>
  );
}

export function AlphabetCursiveGalleryArt({
  cardId,
  letterCase = "upper",
}: {
  cardId: string;
  letterCase?: "upper" | "lower";
}) {
  const key = cardId.toLowerCase();
  const letter = letterCase === "lower" ? key : key.toUpperCase();
  const size =
    letterCase === "lower" ? (LOWER_SIZE[key] ?? 20) : (UPPER_SIZE[key] ?? 22);
  const solidY = letterCase === "lower" ? 58 : 56;
  const row1Y = letterCase === "lower" ? 34 : 32;
  const row2Y = letterCase === "lower" ? 54 : 52;
  const traceSize = size - 4;
  const traceXs = [42, 58, 74];

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <WritingLines />
      <CursiveGlyph letter={letter} x={10} y={solidY} size={size} />
      {traceXs.map((x) => (
        <CursiveGlyph key={`r1-${x}`} letter={letter} x={x} y={row1Y} size={traceSize} dashed />
      ))}
      {traceXs.map((x) => (
        <CursiveGlyph key={`r2-${x}`} letter={letter} x={x} y={row2Y} size={traceSize} dashed />
      ))}
    </svg>
  );
}
