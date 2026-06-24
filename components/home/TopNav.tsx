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
}: {
  children: string;
  outlineColor: string;
}) {
  return (
    <span
      className="text-[11px] font-extrabold leading-none text-white sm:text-sm"
      style={{
        textShadow: `1.5px 1.5px 0 ${outlineColor}, -1px -1px 0 ${outlineColor}, 1px -1px 0 ${outlineColor}, -1px 1px 0 ${outlineColor}`,
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

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(id)}
      className="relative flex flex-1 items-center justify-center gap-1 border-r border-black/10 px-0.5 py-1.5 last:border-r-0 sm:gap-1.5 sm:py-2"
      style={{
        backgroundColor: tab.bg,
        borderRadius: row === "top" ? "12px 12px 0 0" : isActive ? "0" : "0 0 0 0",
        boxShadow: isActive ? "none" : `inset 0 -3px 0 ${darker}`,
        marginBottom: isActive ? -1 : 0,
        zIndex: isActive ? 10 : 1,
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      aria-pressed={isActive}
    >
      <TabIcon id={id} className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
      <OutlinedLabel outlineColor={darker}>{label}</OutlinedLabel>
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
    <motion.button
      type="button"
      whileTap={{ scale: 0.9 }}
      className="flex w-[13%] min-w-[44px] max-w-[56px] shrink-0 items-center justify-center py-1.5"
      style={{ backgroundColor: theme.navPurple }}
      aria-label={label}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-full sm:h-10 sm:w-10"
        style={{ backgroundColor: bg, boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.15)" }}
      >
        {children}
      </div>
    </motion.button>
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
