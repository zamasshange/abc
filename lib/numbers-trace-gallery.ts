/** Numbers Tracing gallery — digits 1–10 (4 scroll pages × 3 cards) */

export const NUMBERS_TRACE_CARD_IDS = Array.from({ length: 10 }, (_, i) => String(i + 1));

export type NumbersTraceCardId = (typeof NUMBERS_TRACE_CARD_IDS)[number];
