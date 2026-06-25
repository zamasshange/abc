export const theme = {
  navPurple: "#C4A0E8",
  langBtn: "#4FC3F7",
  langBtnRing: "#FFFFFF",
  shopBtn: "#3DDB6E",
  shopBtnRing: "#2E7D32",
  bottomBar: "#1E3A5F",
  toolbarRed: "#D32F2F",

  tabs: {
    colors: { bg: "#FFBC73", contentBg: "#F5C4A8", textOutline: "#D97A2A", strip: "#E8953A" },
    connect: { bg: "#FF99CC", contentBg: "#FDCFE3", textOutline: "#E05599", strip: "#E05599" },
    mazes: { bg: "#5CE0A8", contentBg: "#8DE89A", textOutline: "#1A9E66", strip: "#2DB872" },
    lines: { bg: "#B8E86A", contentBg: "#C6E06D", textOutline: "#5A9E28", strip: "#8BC34A" },
    alphabets: { bg: "#66E0F5", contentBg: "#66E0F5", textOutline: "#2AAED4", strip: "#29B6F6" },
    numbers: { bg: "#FFD633", contentBg: "#FFF59D", textOutline: "#C9A000", strip: "#F5C400" },
    shapes: { bg: "#FF9999", contentBg: "#F2949C", textOutline: "#D95555", strip: "#EF5350" },
  },

  cards: {
    colors: { border: "#B388FF", footer: "#B388FF", textOutline: "#7E57C2" },
    connect: { border: "#FFCC33", footer: "#FFCC33", textOutline: "#CC9900" },
    mazes: { border: "#FF66AA", footer: "#FF66AA", textOutline: "#DD4499" },
    lines: { border: "#FF44CC", footer: "#FF44CC", textOutline: "#CC2288" },
    alphabets: { border: "#C87858", footer: "#C87858", textOutline: "#A05838" },
    numbers: { border: "#4FC3F7", footer: "#4FC3F7", textOutline: "#29A8E0" },
    shapes: { border: "#66CC66", footer: "#66CC66", textOutline: "#44AA44" },
  },
} as const;

export type CategoryId = keyof typeof theme.tabs;
