/** Logical game resolution from the reference app (landscape phone/tablet). */
export const GAME_WIDTH = 864;
export const GAME_HEIGHT = 388;
export const GAME_ASPECT = GAME_WIDTH / GAME_HEIGHT;

/** Nav rows measured from reference 1600×720 (row1≈89px, row2≈64px, total≈153px). */
export const NAV_ROW1_H = 89 / 720;
export const NAV_ROW2_H = 64 / 720;
export const NAV_H = Math.round((NAV_ROW1_H + NAV_ROW2_H) * GAME_HEIGHT);
export const NAV_ROW1_PX = Math.round(NAV_ROW1_H * GAME_HEIGHT);
export const NAV_ROW2_PX = Math.round(NAV_ROW2_H * GAME_HEIGHT);
export const UTIL_COL_W = 0.11;

/** Card grid — reference 1600×720; art has no column headers (trimmed) */
export const CARD_SLOT_X = [0.049, 0.29, 0.531, 0.771] as const;
export const CARD_SLOT_W = 0.228;
export const CARD_W = Math.round(CARD_SLOT_W * GAME_WIDTH);
/** Cards start just below nav — column headers were stripped from card art */
export const CARD_TOP = NAV_H + Math.round(4 * (GAME_HEIGHT / 720));
export const CARD_BOTTOM = Math.round((695 / 720) * GAME_HEIGHT);
export const CARD_H = CARD_BOTTOM - CARD_TOP;
export const CARD_GAP = Math.round(0.013 * GAME_WIDTH);

export const UI_SCALE = GAME_HEIGHT / 720;

export function getCardLeft(index: number): number {
  if (index < CARD_SLOT_X.length) {
    return Math.round(CARD_SLOT_X[index] * GAME_WIDTH);
  }
  const step = CARD_SLOT_X[1] - CARD_SLOT_X[0];
  return Math.round((CARD_SLOT_X[0] + index * step) * GAME_WIDTH);
}

export function getCardRowWidth(cardCount: number): number {
  if (cardCount === 0) return GAME_WIDTH;
  return getCardLeft(cardCount - 1) + CARD_W;
}
