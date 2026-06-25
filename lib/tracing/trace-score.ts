/** Preschool-friendly tracing progress — generous hit zone, no harsh failure */

export type TraceZone = {
  /** Center region as fractions of canvas size */
  cx: number;
  cy: number;
  w: number;
  h: number;
};

export const LETTER_ZONE: TraceZone = { cx: 0.5, cy: 0.55, w: 0.45, h: 0.5 };

const COMPLETE_THRESHOLD = 72;

export function isInZone(x: number, y: number, canvasW: number, canvasH: number, zone: TraceZone) {
  const left = (zone.cx - zone.w / 2) * canvasW;
  const right = (zone.cx + zone.w / 2) * canvasW;
  const top = (zone.cy - zone.h / 2) * canvasH;
  const bottom = (zone.cy + zone.h / 2) * canvasH;
  return x >= left && x <= right && y >= top && y <= bottom;
}

/** Returns incremental progress 0–100 based on unique grid cells painted in zone */
export function createTraceScorer(zone: TraceZone = LETTER_ZONE) {
  const cells = new Set<string>();
  const grid = 14;

  return {
    addPoint(x: number, y: number, canvasW: number, canvasH: number): number {
      if (!isInZone(x, y, canvasW, canvasH, zone)) return this.getProgress();
      const gx = Math.floor((x / canvasW) * grid);
      const gy = Math.floor((y / canvasH) * grid);
      cells.add(`${gx},${gy}`);
      return this.getProgress();
    },
    getProgress(): number {
      const maxCells = Math.floor(grid * grid * zone.w * zone.h * 0.55);
      return Math.min(100, Math.round((cells.size / Math.max(maxCells, 1)) * 100));
    },
    isComplete(): boolean {
      return this.getProgress() >= COMPLETE_THRESHOLD;
    },
    reset() {
      cells.clear();
    },
  };
}
