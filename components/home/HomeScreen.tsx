"use client";

import { useState } from "react";
import { ReferenceHome } from "./ReferenceHome";
import type { CategoryId } from "@/lib/theme";
import type { AppScreen, DrawingTemplateId } from "@/lib/navigation";

type HomeScreenProps = {
  initialCategory?: CategoryId;
  onNavigate: (screen: AppScreen, categoryId?: CategoryId, templateId?: DrawingTemplateId) => void;
};

export function HomeScreen({ initialCategory = "lines", onNavigate }: HomeScreenProps) {
  const [activeId, setActiveId] = useState<CategoryId>(initialCategory);

  return (
    <ReferenceHome
      activeId={activeId}
      onCategoryChange={setActiveId}
      onNavigate={onNavigate}
    />
  );
}
