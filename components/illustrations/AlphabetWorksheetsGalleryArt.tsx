/** Alphabets Worksheets gallery thumbnails — grey worksheet previews */

import type { ReactNode } from "react";

const S = "#1a1a1a";
const GREY = "#BDBDBD";
const T = 5;

function Sheet({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <rect x="2" y="2" width="96" height="96" fill={GREY} />
      {children}
    </svg>
  );
}

function Title({ children }: { children: string }) {
  return (
    <text x="50" y="10" textAnchor="middle" fontSize={T} fontWeight="bold" fill={S}>
      {children}
    </text>
  );
}

function Box({ x, y, w = 7, h = 7 }: { x: number; y: number; w?: number; h?: number }) {
  return <rect x={x} y={y} width={w} height={h} fill="#fff" stroke={S} strokeWidth="0.8" />;
}

function Dot({ cx, cy }: { cx: number; cy: number }) {
  return <circle cx={cx} cy={cy} r="1.8" fill="#fff" stroke={S} strokeWidth="0.7" />;
}

function WordRow({ y, parts }: { y: number; parts: (string | "box")[] }) {
  let x = 8;
  return (
    <g fontSize="6" fontWeight="bold" fill={S}>
      {parts.map((p, i) => {
        if (p === "box") {
          const el = <Box key={i} x={x} y={y - 5} />;
          x += 9;
          return el;
        }
        const el = (
          <text key={i} x={x} y={y}>
            {p}
          </text>
        );
        x += p.length * 4.2 + 2;
        return el;
      })}
    </g>
  );
}

function LetterGrid({ letters, cols = 3 }: { letters: string[]; cols?: number }) {
  return (
    <g fontSize="7" fontWeight="bold" fill={S} textAnchor="middle">
      {letters.map((ch, i) => (
        <text key={i} x={18 + (i % cols) * 24} y={28 + Math.floor(i / cols) * 16}>
          {ch}
        </text>
      ))}
    </g>
  );
}

function MatchCols({ left, right }: { left: string[]; right: string[] }) {
  return (
    <g fontSize="7" fontWeight="bold" fill={S}>
      {left.map((ch, i) => (
        <g key={`l${i}`}>
          <text x="16" y={24 + i * 18}>
            {ch}
          </text>
          <Dot cx={28} cy={22 + i * 18} />
        </g>
      ))}
      {right.map((ch, i) => (
        <g key={`r${i}`}>
          <text x="72" y={24 + i * 18}>
            {ch}
          </text>
          <Dot cx={60} cy={22 + i * 18} />
        </g>
      ))}
    </g>
  );
}

function TracePair({ upper, lower }: { upper: string; lower: string }) {
  return (
    <g fontSize="8" fontWeight="bold" fill="none" stroke="#666" strokeWidth="1" strokeDasharray="2 2">
      <text x="20" y="58" fill={S} stroke="none">
        {upper}
      </text>
      <text x="50" y="58" stroke="none">
        {upper}
      </text>
      <text x="20" y="78" fill={S} stroke="none">
        {lower}
      </text>
      <text x="50" y="78" stroke="none">
        {lower}
      </text>
    </g>
  );
}

const ART: Record<string, ReactNode> = {
  "alpha-ws-p1-find-mango": (
    <Sheet>
      <Title>Find the alphabet</Title>
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse
          key={i}
          cx={14 + (i % 4) * 20}
          cy={30 + Math.floor(i / 4) * 18}
          rx="6"
          ry="8"
          fill="none"
          stroke={S}
          strokeWidth="0.7"
        />
      ))}
    </Sheet>
  ),
  "alpha-ws-p1-write-correct-sun": (
    <Sheet>
      <Title>Write the correct letter</Title>
      <circle cx="12" cy="28" r="5" fill="none" stroke={S} strokeWidth="0.8" />
      <WordRow y={30} parts={["box", "U", "N"]} />
      <ellipse cx="12" cy="48" r="4" fill="none" stroke={S} strokeWidth="0.8" />
      <WordRow y={50} parts={["B", "box", "E"]} />
      <ellipse cx="12" cy="68" r="5" fill="none" stroke={S} strokeWidth="0.8" />
      <WordRow y={70} parts={["M", "A", "N", "G", "box"]} />
    </Sheet>
  ),
  "alpha-ws-p1-write-last-duck": (
    <Sheet>
      <Title>Write the last letter</Title>
      <WordRow y={30} parts={["D", "U", "C", "box"]} />
      <WordRow y={50} parts={["G", "O", "A", "box"]} />
      <WordRow y={70} parts={["F", "R", "O", "box"]} />
    </Sheet>
  ),
  "alpha-ws-p2-write-correct": (
    <Sheet>
      <Title>Write the correct letter</Title>
      <WordRow y={30} parts={["box", "U", "N"]} />
      <WordRow y={50} parts={["B", "box", "E"]} />
      <WordRow y={70} parts={["M", "A", "N", "G", "box"]} />
    </Sheet>
  ),
  "alpha-ws-p2-write-last": (
    <Sheet>
      <Title>Write the last letter</Title>
      <WordRow y={30} parts={["D", "U", "C", "box"]} />
      <WordRow y={50} parts={["G", "O", "A", "box"]} />
      <WordRow y={70} parts={["F", "R", "O", "box"]} />
    </Sheet>
  ),
  "alpha-ws-p2-find-shells": (
    <Sheet>
      <Title>Find the alphabet</Title>
      <LetterGrid letters={["a", "b", "c", "d", "e", "f", "g", "h", "i"]} cols={3} />
    </Sheet>
  ),
  "alpha-ws-p3-trace-pig": (
    <Sheet>
      <Title>Trace the letter</Title>
      <ellipse cx="18" cy="32" rx="8" ry="6" fill="none" stroke={S} strokeWidth="0.8" />
      <polygon points="70,24 78,32 70,40" fill="none" stroke={S} strokeWidth="0.8" />
      <TracePair upper="P" lower="p" />
      <TracePair upper="R" lower="r" />
    </Sheet>
  ),
  "alpha-ws-p3-write-correct-train": (
    <Sheet>
      <Title>Write the correct letter</Title>
      <WordRow y={30} parts={["box", "R", "A", "I", "N"]} />
      <WordRow y={50} parts={["A", "box", "P", "P", "L", "E"]} />
      <WordRow y={70} parts={["box", "H", "A", "I", "R"]} />
    </Sheet>
  ),
  "alpha-ws-p3-sequence-shirts": (
    <Sheet>
      <Title>Write the missing sequence</Title>
      <line x1="10" y1="40" x2="90" y2="40" stroke={S} strokeWidth="0.6" />
      <rect x="20" y="32" width="10" height="12" fill="none" stroke={S} strokeWidth="0.7" />
      <text x="40" y="42" fontSize="8" fontWeight="bold">
        B
      </text>
      <rect x="60" y="32" width="10" height="12" fill="none" stroke={S} strokeWidth="0.7" />
      <text x="82" y="36" fontSize="6">
        A C
      </text>
      <line x1="10" y1="68" x2="90" y2="68" stroke={S} strokeWidth="0.6" />
      <text x="24" y="70" fontSize="8" fontWeight="bold">
        D
      </text>
      <rect x="44" y="60" width="10" height="12" fill="none" stroke={S} strokeWidth="0.7" />
      <text x="64" y="70" fontSize="8" fontWeight="bold">
        F
      </text>
    </Sheet>
  ),
  "alpha-ws-p4-match-scramble": (
    <Sheet>
      <Title>Match the correct letter</Title>
      <LetterGrid letters={["A", "B", "C", "D", "E", "F", "G", "H", "I"]} cols={3} />
      <LetterGrid letters={["e", "g", "a", "i", "c", "h", "b", "d", "f"]} cols={3} />
    </Sheet>
  ),
  "alpha-ws-p4-trace-quail-hat": (
    <Sheet>
      <Title>Trace capital and small</Title>
      <TracePair upper="B" lower="b" />
      <TracePair upper="H" lower="h" />
    </Sheet>
  ),
  "alpha-ws-p4-path-rabbit": (
    <Sheet>
      <text x="10" y="20" fontSize="6" fontWeight="bold" fill="#c62828">
        Start
      </text>
      <path d="M18 24 Q40 50 70 70" fill="none" stroke="#888" strokeWidth="1" strokeDasharray="2 2" />
      {["R", "A", "B", "I", "T"].map((ch, i) => (
        <circle key={ch} cx={22 + i * 12} cy={30 + (i % 2) * 20} r="5" fill="none" stroke={S} strokeWidth="0.7" />
      ))}
    </Sheet>
  ),
  "alpha-ws-p5-write-first-crab": (
    <Sheet>
      <Title>Write the first letter</Title>
      <WordRow y={30} parts={["box", "R", "A", "B"]} />
      <WordRow y={50} parts={["box", "H", "I", "P"]} />
      <WordRow y={70} parts={["box", "I", "T", "E"]} />
    </Sheet>
  ),
  "alpha-ws-p5-trace-strawberry": (
    <Sheet>
      <Title>Trace the letter</Title>
      <TracePair upper="S" lower="s" />
      <TracePair upper="C" lower="c" />
    </Sheet>
  ),
  "alpha-ws-p5-write-correct-cup": (
    <Sheet>
      <Title>Write the correct letter</Title>
      <WordRow y={30} parts={["C", "box", "P"]} />
      <WordRow y={50} parts={["J", "U", "box"]} />
      <WordRow y={70} parts={["box", "A", "P"]} />
    </Sheet>
  ),
  "alpha-ws-p6-circle-m": (
    <Sheet>
      <Title>Circle all m</Title>
      <LetterGrid letters={["m", "z", "j", "q", "r", "s", "g", "c", "m"]} />
    </Sheet>
  ),
  "alpha-ws-p6-trace-elephant": (
    <Sheet>
      <Title>Trace capital and small</Title>
      <TracePair upper="E" lower="e" />
      <TracePair upper="R" lower="r" />
    </Sheet>
  ),
  "alpha-ws-p6-write-last-leaf": (
    <Sheet>
      <Title>Write the last letter</Title>
      <WordRow y={30} parts={["L", "E", "A", "box"]} />
      <WordRow y={50} parts={["V", "A", "S", "box"]} />
      <WordRow y={70} parts={["B", "A", "L", "box"]} />
    </Sheet>
  ),
  "alpha-ws-p7-complete-seq1": (
    <Sheet>
      <Title>Complete the sequence</Title>
      <WordRow y={32} parts={["P", "Q", "box", "S"]} />
      <WordRow y={52} parts={["E", "box", "G", "H"]} />
      <WordRow y={72} parts={["U", "box", "W", "X"]} />
    </Sheet>
  ),
  "alpha-ws-p7-odd-one-out1": (
    <Sheet>
      <Title>Circle odd one out</Title>
      <text x="14" y="30" fontSize="7" fontWeight="bold">
        O
      </text>
      <text x="14" y="50" fontSize="7" fontWeight="bold">
        E
      </text>
      <text x="14" y="70" fontSize="7" fontWeight="bold">
        T
      </text>
    </Sheet>
  ),
  "alpha-ws-p7-complete-seq2": (
    <Sheet>
      <Title>Complete the sequence</Title>
      <WordRow y={32} parts={["G", "box", "I", "J"]} />
      <WordRow y={52} parts={["S", "box", "U", "V"]} />
      <WordRow y={72} parts={["C", "D", "box", "F"]} />
    </Sheet>
  ),
  "alpha-ws-p8-match-uah": (
    <Sheet>
      <MatchCols left={["U", "A", "H"]} right={["A", "H", "U"]} />
    </Sheet>
  ),
  "alpha-ws-p8-match-nyg": (
    <Sheet>
      <MatchCols left={["N", "Y", "G"]} right={["Y", "G", "N"]} />
    </Sheet>
  ),
  "alpha-ws-p8-match-upper-lower": (
    <Sheet>
      <MatchCols left={["A", "H", "R"]} right={["r", "a", "h"]} />
    </Sheet>
  ),
  "alpha-ws-p9-circle-p": (
    <Sheet>
      <Title>Circle all P</Title>
      <LetterGrid letters={["A", "Q", "P", "P", "S", "K", "P", "B"]} cols={4} />
    </Sheet>
  ),
  "alpha-ws-p9-match-orv": (
    <Sheet>
      <MatchCols left={["O", "R", "V"]} right={["🐰", "🎻", "🦉"]} />
    </Sheet>
  ),
  "alpha-ws-p9-circle-k": (
    <Sheet>
      <Title>Circle all k</Title>
      <LetterGrid letters={["a", "k", "e", "s", "k", "k", "h", "v"]} cols={4} />
    </Sheet>
  ),
  "alpha-ws-p10-path-orange": (
    <Sheet>
      <circle cx="22" cy="50" r="10" fill="none" stroke="#888" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M32 50 H60" stroke="#888" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="72" cy="50" r="8" fill="none" stroke={S} strokeWidth="0.8" />
    </Sheet>
  ),
  "alpha-ws-p10-path-star": (
    <Sheet>
      <text x="18" y="52" fontSize="12" fontWeight="bold" fill="none" stroke="#888" strokeDasharray="2 2">
        S
      </text>
      <path d="M32 50 H58" stroke="#888" strokeWidth="1" strokeDasharray="2 2" />
      <polygon points="72,44 74,50 72,56 68,50" fill="none" stroke={S} strokeWidth="0.8" />
    </Sheet>
  ),
  "alpha-ws-p10-path-cupcake": (
    <Sheet>
      <text x="18" y="52" fontSize="12" fontWeight="bold" fill="none" stroke="#888" strokeDasharray="2 2">
        C
      </text>
      <path d="M32 50 H58" stroke="#888" strokeWidth="1" strokeDasharray="2 2" />
      <rect x="66" y="46" width="12" height="8" fill="none" stroke={S} strokeWidth="0.8" />
    </Sheet>
  ),
  "alpha-ws-p11-odd-one-out2": (
    <Sheet>
      <Title>Circle odd one out</Title>
      <text x="12" y="30" fontSize="7" fontWeight="bold">
        N
      </text>
      <text x="12" y="50" fontSize="7" fontWeight="bold">
        C
      </text>
      <text x="12" y="70" fontSize="7" fontWeight="bold">
        J
      </text>
    </Sheet>
  ),
  "alpha-ws-p11-match-asl": (
    <Sheet>
      <MatchCols left={["A", "S", "L"]} right={["🦁", "🍎", "☀"]} />
    </Sheet>
  ),
  "alpha-ws-p11-complete-seq3": (
    <Sheet>
      <Title>Complete the sequence</Title>
      <WordRow y={32} parts={["box", "F", "G"]} />
      <WordRow y={52} parts={["Q", "R", "box", "T"]} />
      <WordRow y={72} parts={["box", "J", "K", "L"]} />
    </Sheet>
  ),
  "alpha-ws-p12-path-yak": (
    <Sheet>
      <circle cx="20" cy="50" r="8" fill="none" stroke="#888" strokeDasharray="2 2" />
      <path d="M28 50 Q50 30 72 50 Q50 70 28 50" fill="none" stroke="#888" strokeDasharray="2 2" />
      <text x="74" y="54" fontSize="10" fontWeight="bold">
        Y
      </text>
    </Sheet>
  ),
  "alpha-ws-p12-path-nest": (
    <Sheet>
      <circle cx="20" cy="50" r="8" fill="none" stroke="#888" strokeDasharray="2 2" />
      <path d="M28 50 H70" stroke="#888" strokeDasharray="2 2" />
      <text x="74" y="54" fontSize="10" fontWeight="bold">
        N
      </text>
    </Sheet>
  ),
  "alpha-ws-p12-path-hat": (
    <Sheet>
      <circle cx="20" cy="50" r="8" fill="none" stroke="#888" strokeDasharray="2 2" />
      <path d="M28 50 H70" stroke="#888" strokeDasharray="2 2" />
      <text x="74" y="54" fontSize="10" fontWeight="bold">
        H
      </text>
    </Sheet>
  ),
  "alpha-ws-p13-complete-abc": (
    <Sheet>
      <Title>Complete the sequence</Title>
      <WordRow y={32} parts={["A", "B", "box", "D"]} />
      <WordRow y={52} parts={["M", "box", "O", "P"]} />
      <WordRow y={72} parts={["box", "X", "box", "Z"]} />
    </Sheet>
  ),
  "alpha-ws-p13-circle-a": (
    <Sheet>
      <Title>Circle all A</Title>
      <LetterGrid letters={["X", "A", "O", "M", "O", "A", "A", "W", "R"]} cols={3} />
    </Sheet>
  ),
  "alpha-ws-p13-odd-one-out3": (
    <Sheet>
      <Title>Circle odd one out</Title>
      <text x="12" y="30" fontSize="7" fontWeight="bold">
        M
      </text>
      <text x="12" y="50" fontSize="7" fontWeight="bold">
        K
      </text>
      <text x="12" y="70" fontSize="7" fontWeight="bold">
        S
      </text>
    </Sheet>
  ),
  "alpha-ws-p14-match-gbm": (
    <Sheet>
      <MatchCols left={["G", "B", "M"]} right={["b", "m", "g"]} />
    </Sheet>
  ),
  "alpha-ws-p14-match-jei": (
    <Sheet>
      <MatchCols left={["J", "E", "I"]} right={["e", "i", "j"]} />
    </Sheet>
  ),
  "alpha-ws-p14-path-pig": (
    <Sheet>
      <circle cx="18" cy="40" r="7" fill="none" stroke="#888" strokeDasharray="2 2" />
      <path d="M26 40 Q50 55 74 70" fill="none" stroke="#888" strokeDasharray="2 2" />
      <ellipse cx="78" cy="72" rx="8" ry="6" fill="none" stroke={S} strokeWidth="0.8" />
    </Sheet>
  ),
  "alpha-ws-p15-match-ugp": (
    <Sheet>
      <MatchCols left={["U", "G", "P"]} right={["🐷", "☂", "🐐"]} />
    </Sheet>
  ),
  "alpha-ws-p15-match-dnq": (
    <Sheet>
      <MatchCols left={["D", "N", "Q"]} right={["q", "d", "n"]} />
    </Sheet>
  ),
  "alpha-ws-p15-odd-one-out4": (
    <Sheet>
      <Title>Circle odd one out</Title>
      <text x="12" y="30" fontSize="7" fontWeight="bold">
        A
      </text>
      <text x="12" y="50" fontSize="7" fontWeight="bold">
        D
      </text>
      <text x="12" y="70" fontSize="7" fontWeight="bold">
        P
      </text>
    </Sheet>
  ),
  "alpha-ws-p16-match-bwj": (
    <Sheet>
      <MatchCols left={["B", "W", "J"]} right={["🐋", "🤡", "⚽"]} />
    </Sheet>
  ),
  "alpha-ws-p16-match-bze": (
    <Sheet>
      <MatchCols left={["B", "Z", "E"]} right={["E", "B", "Z"]} />
    </Sheet>
  ),
  "alpha-ws-p16-match-xfk": (
    <Sheet>
      <MatchCols left={["X", "F", "K"]} right={["F", "K", "X"]} />
    </Sheet>
  ),
};

export function AlphabetWorksheetsGalleryArt({ cardId }: { cardId: string }) {
  return <>{ART[cardId] ?? ART["alpha-ws-p1-find-mango"]}</>;
}
