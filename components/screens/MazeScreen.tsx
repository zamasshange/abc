"use client";

import type { ActivityId } from "@/lib/navigation";
import { getDrawingTemplate } from "@/lib/drawing/templates";
import { TemplateLayer } from "@/components/drawing/TemplateLayer";
import { DrawingShell } from "@/components/shared/DrawingShell";

const titles: Record<string, string> = {
  "mazes-practice": "The Chicken is Finding Way to Eggs",
  "mazes-easy": "Help the Bunny Find the Carrot",
  "mazes-hard": "Find the Way to the Star",
  "mazes-numbers": "Count Your Way Through the Maze",
  "mazes-match": "Match and Find the Path",
  "mazes-shapes": "Shape Maze Adventure",
};

export function MazeScreen({ activityId, onBack }: { activityId: ActivityId; onBack: () => void }) {
  const template = getDrawingTemplate(activityId.startsWith("mazes-") ? "mazes-practice" : "mazes-practice");
  const title = titles[activityId] ?? "Find Your Way!";

  return (
    <DrawingShell
      onBack={onBack}
      header={
        <div className="flex shrink-0 items-center border-b border-gray-200 px-2 py-1">
          <span className="flex-1 text-center text-xs font-bold text-gray-800">{title}</span>
        </div>
      }
    >
      <TemplateLayer template={template} />
    </DrawingShell>
  );
}
