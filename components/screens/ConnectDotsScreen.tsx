"use client";

import type { ActivityId } from "@/lib/navigation";
import { getDrawingTemplate } from "@/lib/drawing/templates";
import { TemplateLayer } from "@/components/drawing/TemplateLayer";
import { DrawingShell } from "@/components/shared/DrawingShell";

const templateMap: Record<string, string> = {
  "connect-easy": "connect-easy",
  "connect-hard": "connect-hard",
  "connect-practice": "connect-practice",
  "connect-learn": "connect-learn",
};

export function ConnectDotsScreen({ activityId, onBack }: { activityId: ActivityId; onBack: () => void }) {
  const template = getDrawingTemplate(templateMap[activityId] ?? "connect-easy");
  return (
    <DrawingShell onBack={onBack}>
      <TemplateLayer template={template} />
    </DrawingShell>
  );
}
