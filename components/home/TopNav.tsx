"use client";

import { motion } from "framer-motion";
import type { CategoryId } from "@/lib/theme";
import { categories } from "@/lib/categories";
import { theme } from "@/lib/theme";
import { TabIcon, ShopIcon } from "@/components/icons/TabIcons";

type TopNavProps = {
  activeId: CategoryId;
  onSelect: (id: CategoryId) => void;
  onLanguagePress?: () => void;
};

function OutlinedLabel({ children, outlineColor, size = "sm" }: { children: string; outlineColor: string; size?: "sm" | "md" }) {
  const textSize = size === "md" ? "text-[13px] sm:text-[15px]" : "text-[11px] sm:text-[13px]";
  return (
    <span
      className={`font-extrabold leading-none tracking-wide text-white ${textSize}`}
      style={{
        textShadow: `2px 2px 0 ${outlineColor}, -1px -1px 0 ${outlineColor}, 1px -1px 0 ${outlineColor}, -1px 1px 0 ${outlineColor}, 0 2px 0 ${outlineColor}`,
      }}
    >
      {children}
    </span>
  );
}

function CategoryTab({
  id, label, isActive, onSelect, row,
}: {
  id: CategoryId; label: string; isActive: boolean; onSelect: (id: CategoryId) => void; row: "top" | "bottom";
}) {
  const tab = theme.tabs[id];
  const darker = tab.textOutline;
  const isBottomActive = row === "bottom" && isActive;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(id)}
      className="relative flex flex-1 items-center justify-center gap-1 px-0.5 sm:gap-1.5 sm:px-1"
      style={{
        backgroundColor: tab.bg,
        borderRadius: row === "top" ? "12px 12px 0 0" : "0",
        boxShadow: isActive ? "none" : `inset 0 -5px 0 ${darker}`,
        paddingTop: row === "top" ? (isActive ? "7px" : "5px") : isBottomActive ? "9px" : "6px",
        paddingBottom: isBottomActive ? "12px" : row === "bottom" ? "7px" : "5px",
        marginBottom: isBottomActive ? "-8px" : 0,
        zIndex: isActive ? 20 : 1,
      }}
      whileTap={{ scale: 0.97 }}
      aria-pressed={isActive}
    >
      <OutlinedLabel outlineColor={darker} size={row === "bottom" ? "md" : "sm"}>{label}</OutlinedLabel>
      <TabIcon id={id} className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
    </motion.button>
  );
}

function UtilityButton({ children, bg, label, onClick }: { children: React.ReactNode; bg: string; label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-[10.5%] min-w-[44px] max-w-[56px] shrink-0 items-center justify-center self-stretch"
      style={{ backgroundColor: theme.navPurple }}
      aria-label={label}
    >
      <div className="gunjan-btn-3d flex h-9 w-9 items-center justify-center rounded-full sm:h-10 sm:w-10" style={{ backgroundColor: bg }}>
        {children}
      </div>
    </button>
  );
}

export function TopNav({ activeId, onSelect, onLanguagePress }: TopNavProps) {
  const topTabs = categories.filter((c) => c.row === "top");
  const bottomTabs = categories.filter((c) => c.row === "bottom");

  return (
    <div className="shrink-0 shadow-sm">
      <div className="flex items-stretch">
        <UtilityButton bg={theme.langBtn} label="Language" onClick={onLanguagePress}>
          <span className="text-[10px] font-extrabold text-white sm:text-[11px]">EN</span>
        </UtilityButton>
        <div className="flex flex-1">{topTabs.map((tab) => (
          <CategoryTab key={tab.id} id={tab.id} label={tab.label} isActive={activeId === tab.id} onSelect={onSelect} row="top" />
        ))}</div>
        <UtilityButton bg={theme.shopBtn} label="Shop"><ShopIcon className="h-4 w-4" /></UtilityButton>
      </div>
      <div className="flex">{bottomTabs.map((tab) => (
        <CategoryTab key={tab.id} id={tab.id} label={tab.label} isActive={activeId === tab.id} onSelect={onSelect} row="bottom" />
      ))}</div>
    </div>
  );
}
