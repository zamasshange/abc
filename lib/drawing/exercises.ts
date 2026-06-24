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

export type ExercisePage = {
  id: string;
  label: string;
  exercise: Exercise;
};

export function getExercisePagesForTemplate(templateId: string): ExercisePage[] {
  const horizontal: Exercise = {
    type: "horizontal-lines",
    guides: [
      { x1: 0.12, y1: 0.4, x2: 0.88, y2: 0.4, dashed: true },
      { x1: 0.12, y1: 0.6, x2: 0.88, y2: 0.6, dashed: true },
    ],
  };

  const vertical: Exercise = {
    type: "vertical-lines",
    guides: [
      { x1: 0.32, y1: 0.22, x2: 0.32, y2: 0.78, dashed: true },
      { x1: 0.68, y1: 0.22, x2: 0.68, y2: 0.78, dashed: true },
    ],
  };

  const diagonal: Exercise = {
    type: "diagonal-lines",
    guides: [
      { x1: 0.15, y1: 0.72, x2: 0.85, y2: 0.28, dashed: true },
      { x1: 0.2, y1: 0.82, x2: 0.9, y2: 0.38, dashed: true },
    ],
  };

  const curve: Exercise = {
    type: "curve-lines",
    guides: [
      { x1: 0.2, y1: 0.65, x2: 0.5, y2: 0.35, dashed: true },
      { x1: 0.5, y1: 0.35, x2: 0.8, y2: 0.65, dashed: true },
    ],
  };

  if (templateId.startsWith("lines-")) {
    return [
      { id: "h1", label: "Horizontal", exercise: horizontal },
      { id: "h2", label: "Horizontal 2", exercise: horizontal },
      { id: "v1", label: "Vertical", exercise: vertical },
      { id: "v2", label: "Vertical 2", exercise: vertical },
      { id: "d1", label: "Diagonal", exercise: diagonal },
      { id: "c1", label: "Curve", exercise: curve },
    ];
  }

  if (templateId.startsWith("alpha-") || templateId.startsWith("num-")) {
    return [
      { id: "h1", label: "Practice 1", exercise: horizontal },
      { id: "v1", label: "Practice 2", exercise: vertical },
      { id: "d1", label: "Practice 3", exercise: diagonal },
    ];
  }

  if (templateId.startsWith("connect-") || templateId.startsWith("mazes-")) {
    return [
      { id: "h1", label: "Level 1", exercise: horizontal },
      { id: "h2", label: "Level 2", exercise: horizontal },
      { id: "v1", label: "Level 3", exercise: vertical },
      { id: "d1", label: "Level 4", exercise: diagonal },
      { id: "c1", label: "Level 5", exercise: curve },
    ];
  }

  return [
    { id: "h1", label: "Trace 1", exercise: horizontal },
    { id: "v1", label: "Trace 2", exercise: vertical },
    { id: "d1", label: "Trace 3", exercise: diagonal },
  ];
}

export function getExerciseForTemplate(templateId: string): Exercise {
  return getExercisePagesForTemplate(templateId)[0].exercise;
}
