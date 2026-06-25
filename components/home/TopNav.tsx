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
const utilBtn = Math.round(52 * UI_SCALE);
const utilRing = Math.max(3, Math.round(4 * UI_SCALE));
const tabIconTop = Math.round(44 * UI_SCALE);
const tabIconBottom = Math.round(40 * UI_SCALE);
const topRadius = Math.round(18 * UI_SCALE);
const ribbonH = Math.max(3, Math.round(5 * UI_SCALE));
const bottomRibbonH = Math.max(5, Math.round(8 * UI_SCALE));
const activeOverlap = Math.round(14 * UI_SCALE);
const topLabelPx = Math.round(24 * UI_SCALE);
const bottomLabelPx = Math.round(28 * UI_SCALE);
const outlinePx = Math.max(2, Math.round(3 * UI_SCALE));

function OutlinedLabel({
  children,
  outlineColor,
  fontSize,
}: {
  children: string;
  outlineColor: string;
  fontSize: number;
}) {
  const o = outlinePx;
  return (
    <span
      className="relative z-[1] font-extrabold leading-none tracking-tight text-white"
      style={{
        fontSize,
        textShadow: `
          ${o}px 0 0 ${outlineColor},
          -${o}px 0 0 ${outlineColor},
          0 ${o}px 0 ${outlineColor},
          0 -${o}px 0 ${outlineColor},
          ${o}px ${o}px 0 ${outlineColor},
          -${o}px -${o}px 0 ${outlineColor},
          ${o}px -${o}px 0 ${outlineColor},
          -${o}px ${o}px 0 ${outlineColor}
        `,
      }}
    >
      {children}
    </span>
  );
}

function Ribbon({ color, position }: { color: string; position: "top" | "bottom" }) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0"
      style={{
        height: position === "top" ? ribbonH : bottomRibbonH,
        [position]: 0,
        backgroundColor: color,
      }}
    />
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
  const iconSize = row === "top" ? tabIconTop : tabIconBottom;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(id)}
      className="relative flex flex-1 items-center justify-center gap-2 border-0"
      style={{
        height: rowHeight,
        backgroundColor: tab.bg,
        borderRadius: row === "top" ? `${topRadius}px ${topRadius}px 0 0` : 0,
        marginBottom: isBottomActive ? -activeOverlap : 0,
        paddingBottom: isBottomActive ? activeOverlap : 0,
        zIndex: isBottomActive ? 20 : row === "bottom" ? 2 : 1,
      }}
      whileTap={{ scale: 0.985 }}
      aria-pressed={isActive}
    >
      <Ribbon color={tab.strip} position="top" />
      {!isBottomActive && <Ribbon color={tab.strip} position="bottom" />}

      {isBottomActive && (
        <div
          className="pointer-events-none absolute inset-x-0"
          style={{
            bottom: -activeOverlap,
            height: activeOverlap + 2,
            backgroundColor: tab.contentBg,
          }}
        />
      )}

      <OutlinedLabel
        outlineColor={tab.textOutline}
        fontSize={row === "bottom" ? bottomLabelPx : topLabelPx}
      >
        {label}
      </OutlinedLabel>
      <TabIcon id={id} className="relative z-[1] shrink-0" style={{ width: iconSize, height: iconSize }} />
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

  return (
    <header className="relative z-10 shrink-0" style={{ width: GAME_WIDTH, height: NAV_H }}>
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
              border: `${utilRing}px solid ${theme.langBtnRing}`,
              boxShadow: `inset 0 -${Math.round(4 * UI_SCALE)}px 0 rgba(0,0,0,0.12)`,
            }}
          >
            <span
              className="font-extrabold text-white"
              style={{ fontSize: Math.round(20 * UI_SCALE) }}
            >
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
              border: `${utilRing}px solid ${theme.shopBtnRing}`,
              boxShadow: `inset 0 -${Math.round(4 * UI_SCALE)}px 0 rgba(0,0,0,0.12)`,
            }}
          >
            <ShopIcon
              style={{
                width: Math.round(26 * UI_SCALE),
                height: Math.round(26 * UI_SCALE),
              }}
            />
          </button>
        </UtilCell>
      </div>

      <div className="flex w-full" style={{ height: NAV_ROW2_PX }}>
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
    </header>
  );
}
