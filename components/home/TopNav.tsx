"use client";

import { motion } from "framer-motion";
import type { CategoryId } from "@/lib/theme";
import { categories } from "@/lib/categories";
import { theme } from "@/lib/theme";
import { TabIcon, ShopIcon } from "@/components/icons/TabIcons";
import {
  GAME_WIDTH,
  NAV_H,
  NAV_ROW1_PX,
  NAV_ROW2_PX,
  UI_SCALE,
  UTIL_COL_W,
} from "@/lib/device";

type TopNavProps = {
  activeId: CategoryId;
  onSelect: (id: CategoryId) => void;
  onLanguagePress?: () => void;
};

const utilColW = Math.round(GAME_WIDTH * UTIL_COL_W);
const utilBtn = Math.round(44 * UI_SCALE);
const utilBorder = Math.max(2, Math.round(3 * UI_SCALE));
const tabIcon = Math.round(34 * UI_SCALE);
const topPadY = Math.round(8 * UI_SCALE);
const bottomPadY = Math.round(6 * UI_SCALE);
const activePadTop = Math.round(6 * UI_SCALE);
const activePadBottom = Math.round(12 * UI_SCALE);
const activeOverlap = Math.round(-12 * UI_SCALE);
const stripH = Math.max(2, Math.round(3 * UI_SCALE));
const topRadius = Math.round(14 * UI_SCALE);
const topLabelPx = Math.max(10, Math.round(13 * UI_SCALE));
const bottomLabelPx = Math.max(12, Math.round(16 * UI_SCALE));

function OutlinedLabel({
  children,
  outlineColor,
  fontSize,
}: {
  children: string;
  outlineColor: string;
  fontSize: number;
}) {
  const o = Math.max(1, Math.round(2 * UI_SCALE));
  return (
    <span
      className="font-extrabold leading-none tracking-tight text-white"
      style={{
        fontSize,
        textShadow: `${o}px ${o}px 0 ${outlineColor}, -${o}px -${o}px 0 ${outlineColor}, ${o}px -${o}px 0 ${outlineColor}, -${o}px ${o}px 0 ${outlineColor}`,
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
  rowHeight,
}: {
  id: CategoryId;
  label: string;
  isActive: boolean;
  onSelect: (id: CategoryId) => void;
  row: "top" | "bottom";
  rowHeight: number;
}) {
  const tab = theme.tabs[id];
  const isBottomActive = row === "bottom" && isActive;
  const stripInset = Math.max(4, Math.round(5 * UI_SCALE));

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(id)}
      className="relative flex flex-1 items-center justify-center border-0"
      style={{
        height: rowHeight,
        gap: Math.round(5 * UI_SCALE),
        paddingLeft: Math.round(4 * UI_SCALE),
        paddingRight: Math.round(4 * UI_SCALE),
        backgroundColor: isBottomActive ? tab.contentBg : tab.bg,
        borderRadius: row === "top" ? `${topRadius}px ${topRadius}px 0 0` : 0,
        boxShadow: isBottomActive ? "none" : `inset 0 -${stripInset}px 0 ${tab.strip}`,
        paddingTop: row === "top" ? topPadY : isBottomActive ? activePadTop : bottomPadY,
        paddingBottom: row === "top" ? topPadY : isBottomActive ? activePadBottom : bottomPadY,
        marginBottom: isBottomActive ? activeOverlap : 0,
        zIndex: isActive ? 20 : 1,
      }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={isActive}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{ height: stripH, backgroundColor: tab.strip, opacity: 0.85 }}
      />
      <OutlinedLabel
        outlineColor={tab.textOutline}
        fontSize={row === "bottom" ? bottomLabelPx : topLabelPx}
      >
        {label}
      </OutlinedLabel>
      <TabIcon id={id} className="shrink-0" style={{ width: tabIcon, height: tabIcon }} />
    </motion.button>
  );
}

function UtilCell({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center"
      style={{ width: utilColW, height: NAV_ROW1_PX, backgroundColor: theme.navPurple }}
      aria-label={label}
    >
      {children}
    </div>
  );
}

export function TopNav({ activeId, onSelect, onLanguagePress }: TopNavProps) {
  const topTabs = categories.filter((c) => c.row === "top");
  const bottomTabs = categories.filter((c) => c.row === "bottom");
  const activeContentBg = theme.tabs[activeId].contentBg;

  return (
    <div className="relative z-10 flex w-full shrink-0 flex-col" style={{ height: NAV_H }}>
      {/* Row 1: EN util | top tabs | cart util */}
      <div className="flex w-full" style={{ height: NAV_ROW1_PX, backgroundColor: theme.navPurple }}>
        <UtilCell label="Language">
          <button
            type="button"
            onClick={onLanguagePress}
            className="flex items-center justify-center rounded-full border-0"
            style={{
              width: utilBtn,
              height: utilBtn,
              backgroundColor: theme.langBtn,
              border: `${utilBorder}px solid ${theme.langBtnRing}`,
              boxShadow: `inset 0 -${Math.max(2, Math.round(3 * UI_SCALE))}px 0 rgba(0,0,0,0.15)`,
            }}
          >
            <span className="font-extrabold text-white" style={{ fontSize: topLabelPx }}>
              EN
            </span>
          </button>
        </UtilCell>

        <div className="flex min-w-0 flex-1">
          {topTabs.map((tab) => (
            <CategoryTab
              key={tab.id}
              id={tab.id}
              label={tab.label}
              isActive={activeId === tab.id}
              onSelect={onSelect}
              row="top"
              rowHeight={NAV_ROW1_PX}
            />
          ))}
        </div>

        <UtilCell label="Shop">
          <button
            type="button"
            className="flex items-center justify-center rounded-full border-0"
            style={{
              width: utilBtn,
              height: utilBtn,
              backgroundColor: theme.shopBtn,
              border: `${utilBorder}px solid ${theme.shopBtnRing}`,
              boxShadow: `inset 0 -${Math.max(2, Math.round(3 * UI_SCALE))}px 0 rgba(0,0,0,0.15)`,
            }}
          >
            <ShopIcon style={{ width: Math.round(18 * UI_SCALE), height: Math.round(18 * UI_SCALE) }} />
          </button>
        </UtilCell>
      </div>

      {/* Row 2: full-width bottom tabs edge to edge */}
      <div
        className="flex w-full"
        style={{ height: NAV_ROW2_PX, backgroundColor: activeContentBg }}
      >
        {bottomTabs.map((tab) => (
          <CategoryTab
            key={tab.id}
            id={tab.id}
            label={tab.label}
            isActive={activeId === tab.id}
            onSelect={onSelect}
            row="bottom"
            rowHeight={NAV_ROW2_PX}
          />
        ))}
      </div>
    </div>
  );
}
