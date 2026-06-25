export type TemplatePath = {
  d: string;
  dashed?: boolean;
  color?: string;
  width?: number;
};

export type TemplateDot = {
  cx: number;
  cy: number;
  r?: number;
  color?: string;
  number?: number;
};

export type DrawingTemplate = {
  id: string;
  viewBox: string;
  paths: TemplatePath[];
  dots?: TemplateDot[];
  showPanda?: boolean;
  linedPaper?: boolean;
};

export const drawingTemplates: Record<string, DrawingTemplate> = {
  "lines-dots": {
    id: "lines-dots",
    viewBox: "0 0 400 280",
    paths: [
      { d: "M 220 140 L 340 140", dashed: true, color: "#1a1a1a", width: 4 },
    ],
    dots: [
      { cx: 210, cy: 140, r: 8 },
      { cx: 350, cy: 140, r: 8 },
    ],
  },
  "lines-line": {
    id: "lines-line",
    viewBox: "0 0 400 280",
    paths: [
      { d: "M 220 200 L 280 100 L 340 200", dashed: true, color: "#1a1a1a", width: 4 },
    ],
    dots: [
      { cx: 220, cy: 200, r: 8 },
      { cx: 340, cy: 200, r: 8 },
    ],
  },
  "lines-curve": {
    id: "lines-curve",
    viewBox: "0 0 400 280",
    paths: [
      { d: "M 220 200 Q 280 80 340 200", dashed: true, color: "#1a1a1a", width: 4 },
    ],
    dots: [
      { cx: 220, cy: 200, r: 8 },
      { cx: 340, cy: 200, r: 8 },
    ],
  },
  "lines-practice": {
    id: "lines-practice",
    viewBox: "0 0 400 280",
    paths: [
      { d: "M 200 180 L 320 80", dashed: true, color: "#1a1a1a", width: 4 },
    ],
    dots: [
      { cx: 200, cy: 180, r: 8 },
      { cx: 320, cy: 80, r: 8 },
    ],
  },
  "alpha-trace-upper": {
    id: "alpha-trace-upper",
    viewBox: "0 0 400 280",
    linedPaper: true,
    paths: [
      { d: "M 140 200 L 200 80 L 260 200", dashed: true, color: "#FF3333", width: 5 },
      { d: "M 165 155 L 235 155", dashed: true, color: "#FF3333", width: 5 },
      { d: "M 140 200 L 200 80 L 260 200 M 165 155 L 235 155", color: "#1a1a1a", width: 6 },
    ],
  },
  "alpha-trace-lower": {
    id: "alpha-trace-lower",
    viewBox: "0 0 400 280",
    linedPaper: true,
    paths: [
      { d: "M 200 200 A 45 45 0 1 1 200 110", dashed: true, color: "#FF3333", width: 5 },
      { d: "M 245 155 L 245 200", dashed: true, color: "#FF3333", width: 5 },
      { d: "M 200 200 A 45 45 0 1 1 200 110 M 245 155 L 245 200", color: "#1a1a1a", width: 6 },
    ],
  },
  "alpha-upper": {
    id: "alpha-upper",
    viewBox: "0 0 400 280",
    paths: [],
  },
  "alpha-lower": {
    id: "alpha-lower",
    viewBox: "0 0 400 280",
    paths: [],
  },
  "num-tracing": {
    id: "num-tracing",
    viewBox: "0 0 400 280",
    linedPaper: true,
    paths: [
      { d: "M 200 80 L 200 210", dashed: true, color: "#FF3333", width: 6 },
      { d: "M 200 80 L 200 210", color: "#1a1a1a", width: 8 },
    ],
  },
  "num-counting": {
    id: "num-counting",
    viewBox: "0 0 400 280",
    paths: [],
  },
  "num-practice": {
    id: "num-practice",
    viewBox: "0 0 400 280",
    paths: [
      { d: "M 80 60 L 180 60 L 180 220 L 80 220 Z", dashed: true, color: "#999", width: 3 },
    ],
  },
  "num-spelling": {
    id: "num-spelling",
    viewBox: "0 0 400 280",
    paths: [],
  },
  "shapes-learn": {
    id: "shapes-learn",
    viewBox: "0 0 400 280",
    paths: [
      { d: "M 120 160 A 40 40 0 1 1 120 80", dashed: true, color: "#1a1a1a", width: 4 },
      { d: "M 260 80 L 310 180 L 210 180 Z", dashed: true, color: "#1a1a1a", width: 4 },
    ],
  },
  "shapes-practice": {
    id: "shapes-practice",
    viewBox: "0 0 400 280",
    paths: [
      { d: "M 100 80 L 140 180 L 60 180 Z", dashed: true, color: "#1a1a1a", width: 4 },
      { d: "M 260 90 L 310 140 L 260 190 L 210 140 Z", dashed: true, color: "#1a1a1a", width: 4 },
    ],
  },
  "shapes-drawings": {
    id: "shapes-drawings",
    viewBox: "0 0 400 280",
    paths: [
      { d: "M 80 200 L 140 140 L 200 160 L 260 100", dashed: true, color: "#1a1a1a", width: 4 },
    ],
  },
  "connect-practice": {
    id: "connect-practice",
    viewBox: "0 0 400 280",
    paths: [
      { d: "M 80 200 L 120 160 L 160 180 L 200 140 L 240 160 L 280 120 L 320 100", dashed: true, color: "#1a1a1a", width: 3 },
    ],
    dots: [
      { cx: 80, cy: 200, r: 6, number: 1 },
      { cx: 120, cy: 160, r: 6, number: 2 },
      { cx: 160, cy: 180, r: 6, number: 3 },
      { cx: 200, cy: 140, r: 6, number: 4 },
      { cx: 240, cy: 160, r: 6, number: 5 },
      { cx: 280, cy: 120, r: 6, number: 6 },
      { cx: 320, cy: 100, r: 6, number: 7 },
    ],
  },
  "connect-easy": {
    id: "connect-easy",
    viewBox: "0 0 400 280",
    paths: [
      { d: "M 200 80 A 60 60 0 1 1 200 200", dashed: true, color: "#1a1a1a", width: 3 },
    ],
    dots: [
      { cx: 200, cy: 80, r: 6, number: 1 },
      { cx: 260, cy: 110, r: 6, number: 2 },
      { cx: 280, cy: 170, r: 6, number: 3 },
      { cx: 200, cy: 200, r: 6, number: 4 },
      { cx: 120, cy: 170, r: 6, number: 5 },
      { cx: 140, cy: 110, r: 6, number: 6 },
    ],
  },
  "connect-hard": {
    id: "connect-hard",
    viewBox: "0 0 400 280",
    paths: [
      { d: "M 200 60 A 80 80 0 1 1 200 220", dashed: true, color: "#1a1a1a", width: 3 },
    ],
    dots: Array.from({ length: 9 }).map((_, i) => {
      const a = (i / 9) * Math.PI * 2 - Math.PI / 2;
      return { cx: 200 + Math.cos(a) * 80, cy: 140 + Math.sin(a) * 80, r: 5, number: i + 1 };
    }),
  },
  "connect-learn": {
    id: "connect-learn",
    viewBox: "0 0 400 280",
    paths: [
      { d: "M 120 180 Q 120 100 200 100 Q 280 100 280 180", color: "#1a1a1a", width: 4 },
      { d: "M 200 100 Q 280 100 280 180", dashed: true, color: "#FF5555", width: 4 },
    ],
  },
  "mazes-practice": {
    id: "mazes-practice",
    viewBox: "0 0 400 280",
    paths: [
      { d: "M 200 60 A 70 70 0 1 1 200 200", color: "#1a1a1a", width: 3 },
      { d: "M 200 90 A 40 40 0 1 1 200 170", color: "#1a1a1a", width: 2 },
    ],
  },
  "square-trace": {
    id: "square-trace",
    viewBox: "0 0 400 280",
    showPanda: true,
    paths: [
      { d: "M 80 80 L 80 200", color: "#1a1a1a", width: 6 },
      { d: "M 80 200 L 200 200", color: "#1a1a1a", width: 6 },
      { d: "M 200 200 L 200 80", color: "#1a1a1a", width: 6 },
      { d: "M 80 80 L 200 80", dashed: true, color: "#5BC8F5", width: 6 },
    ],
    dots: [
      { cx: 80, cy: 80, r: 7 },
      { cx: 200, cy: 80, r: 7 },
      { cx: 80, cy: 200, r: 7 },
      { cx: 200, cy: 200, r: 7, color: "transparent" },
    ],
  },
};

export function getDrawingTemplate(id: string): DrawingTemplate {
  return drawingTemplates[id] ?? drawingTemplates["square-trace"];
}
