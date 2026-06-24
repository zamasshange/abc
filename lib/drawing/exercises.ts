export type ExerciseType =
  | "horizontal-lines"
  | "vertical-lines"
  | "diagonal-lines"
  | "curve-lines"
  | "custom";

export type GuideLine = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashed?: boolean;
};

export type Exercise = {
  type: ExerciseType;
  guides: GuideLine[];
  dotRadius?: number;
};

export function getExerciseForTemplate(templateId: string): Exercise {
  if (templateId.includes("curve")) {
    return {
      type: "curve-lines",
      guides: [
        { x1: 0.28, y1: 0.62, x2: 0.72, y2: 0.62, dashed: true },
        { x1: 0.28, y1: 0.78, x2: 0.72, y2: 0.78, dashed: true },
      ],
    };
  }
  if (templateId.includes("practice") || templateId.includes("diagonal")) {
    return {
      type: "diagonal-lines",
      guides: [
        { x1: 0.22, y1: 0.72, x2: 0.78, y2: 0.32, dashed: true },
        { x1: 0.22, y1: 0.82, x2: 0.78, y2: 0.42, dashed: true },
      ],
    };
  }
  if (
    templateId.includes("vertical") ||
    templateId === "num-tracing" ||
    templateId.includes("upper") ||
    templateId.includes("lower")
  ) {
    return {
      type: "vertical-lines",
      guides: [
        { x1: 0.35, y1: 0.25, x2: 0.35, y2: 0.75, dashed: true },
        { x1: 0.65, y1: 0.25, x2: 0.65, y2: 0.75, dashed: true },
      ],
    };
  }
  return {
    type: "horizontal-lines",
    guides: [
      { x1: 0.15, y1: 0.42, x2: 0.85, y2: 0.42, dashed: true },
      { x1: 0.15, y1: 0.62, x2: 0.85, y2: 0.62, dashed: true },
    ],
  };
}
