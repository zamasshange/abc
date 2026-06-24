"use client";

import { motion } from "framer-motion";
import type { CategoryId } from "@/lib/theme";
import { categories } from "@/lib/categories";
import { theme } from "@/lib/theme";
import { TabIcon, ShopIcon } from "@/components/icons/TabIcons";

type TopNavProps = {
  activeId: CategoryId;
  onSelect: (id: CategoryId) => void;
};

function OutlinedLabel({
  children,
  outlineColor,
  size = "sm",
}: {
  children: string;
  outlineColor: string;
  size?: "sm" | "md";
}) {
  const textSize = size === "md" ? "text-sm sm:text-base" : "text-xs sm:text-sm";
  return (
    <span
      className={`font-extrabold leading-none text-white ${textSize}`}
      style={{
        textShadow: `2px 2px 0 ${outlineColor}, -1px -1px 0 ${outlineColor}, 1px -1px 0 ${outlineColor}, -1px 1px 0 ${outlineColor}, 0 2px 0 ${outlineColor}`,
      }}
    >
      {children}
    </span>
  );
}

function CategoryTab({
  id,
  label,
  isActive,
  onSelect,
  row,
}: {
  id: CategoryId;
  label: string;
  isActive: boolean;
  onSelect: (id: CategoryId) => void;
  row: "top" | "bottom";
}) {
  const tab = theme.tabs[id];
  const darker = tab.textOutline;
  const isBottomActive = row === "bottom" && isActive;
  const isTopActive = row === "top" && isActive;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(id)}
      className="relative flex flex-1 items-center justify-center gap-1.5 px-1 sm:gap-2 sm:px-2"
      style={{
        backgroundColor: tab.bg,
        borderRadius: row === "top" ? "14px 14px 0 0" : "0",
        boxShadow: isActive ? "none" : `inset 0 -4px 0 ${darker}`,
        paddingTop: row === "top" ? (isTopActive ? "8px" : "6px") : isBottomActive ? "10px" : "7px",
        paddingBottom: isBottomActive ? "14px" : row === "top" && isTopActive ? "8px" : row === "bottom" ? "8px" : "6px",
        marginBottom: isBottomActive ? "-6px" : 0,
        zIndex: isActive ? 20 : 1,
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      aria-pressed={isActive}
    >
      <OutlinedLabel outlineColor={darker} size={row === "bottom" ? "md" : "sm"}>
        {label}
      </OutlinedLabel>
      <TabIcon id={id} className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
    </motion.button>
  );
}

function UtilityButton({
  children,
  bg,
  label,
}: {
  children: React.ReactNode;
  bg: string;
  label: string;
}) {
  return (
    <button
      type="button"
      className="flex w-[11%] min-w-[42px] max-w-[58px] shrink-0 items-center justify-center py-1"
      style={{ backgroundColor: theme.navPurple }}
      aria-label={label}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-full sm:h-10 sm:w-10"
        style={{
          backgroundColor: bg,
          boxShadow: "inset 0 -3px 0 rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.25)",
        }}
      >
        {children}
      </div>
    </button>
  );
}

export function TopNav({ activeId, onSelect }: TopNavProps) {
  const topTabs = categories.filter((c) => c.row === "top");
  const bottomTabs = categories.filter((c) => c.row === "bottom");

  return (
    <div className="shrink-0">
      <div className="flex items-stretch">
        <UtilityButton bg={theme.langBtn} label="Language">
          <span className="text-[10px] font-extrabold text-white sm:text-xs">EN</span>
        </UtilityButton>

        <div className="flex flex-1">
          {topTabs.map((tab) => (
            <CategoryTab
              key={tab.id}
              id={tab.id}
              label={tab.label}
              isActive={activeId === tab.id}
              onSelect={onSelect}
              row="top"
            />
          ))}
        </div>

        <UtilityButton bg={theme.shopBtn} label="Shop">
          <ShopIcon className="h-4 w-4" />
        </UtilityButton>
      </div>

      <div className="flex">
        {bottomTabs.map((tab) => (
          <CategoryTab
            key={tab.id}
            id={tab.id}
            label={tab.label}
            isActive={activeId === tab.id}
            onSelect={onSelect}
            row="bottom"
          />
        ))}
      </div>
    </div>
  );
}
