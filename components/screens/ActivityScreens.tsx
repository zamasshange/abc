"use client";

import { ReferenceActivityScreen } from "./ReferenceActivityScreen";

export function LineTracingScreen({ onBack }: { onBack: () => void }) {
  return <ReferenceActivityScreen variant="line-tracing" onBack={onBack} />;
}

export function MazeActivityScreen({ onBack }: { onBack: () => void }) {
  return <ReferenceActivityScreen variant="maze" onBack={onBack} />;
}

export function LetterTracingScreen({ onBack }: { onBack: () => void }) {
  return <ReferenceActivityScreen variant="letter-tracing" onBack={onBack} />;
}

export function ConnectDotsScreen({ onBack }: { onBack: () => void }) {
  return <ReferenceActivityScreen variant="connect-dots" onBack={onBack} />;
}

export function LearnToDrawScreen({ onBack }: { onBack: () => void }) {
  return <ReferenceActivityScreen variant="learn-to-draw" onBack={onBack} />;
}

export function LetterMatchScreen({ onBack }: { onBack: () => void }) {
  return <ReferenceActivityScreen variant="letter-match" onBack={onBack} />;
}

export function MatchingActivityScreen({ onBack }: { onBack: () => void }) {
  return <ReferenceActivityScreen variant="matching" onBack={onBack} />;
}

export function FreeDrawScreen({ onBack }: { onBack: () => void }) {
  return <ReferenceActivityScreen variant="free-draw" onBack={onBack} />;
}

export function JigsawScreen({ onBack }: { onBack: () => void }) {
  return <ReferenceActivityScreen variant="letter-tracing" onBack={onBack} />;
}
