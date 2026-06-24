export const theme = {
  navPurple: "#C9A8E8",
  langBtn: "#4FC3F7",
  shopBtn: "#3DDB6E",
  bottomBar: "#1E3A5F",
  toolbarRed: "#D32F2F",

  tabs: {
    colors: { bg: "#FFB366", contentBg: "#F5C4A8", textOutline: "#D97A2A" },
    connect: { bg: "#FF99CC", contentBg: "#FDCFE3", textOutline: "#E05599" },
    mazes: { bg: "#33CC99", contentBg: "#8DE89A", textOutline: "#1A9E66" },
    lines: { bg: "#B8E86A", contentBg: "#C6E06D", textOutline: "#6FAF2E" },
    alphabets: { bg: "#66E0F5", contentBg: "#66E0F5", textOutline: "#2AAED4" },
    numbers: { bg: "#FFD633", contentBg: "#FFF59D", textOutline: "#D4A800" },
    shapes: { bg: "#FF9999", contentBg: "#F2949C", textOutline: "#D95555" },
  },
} as const;

export type CategoryId = keyof typeof theme.tabs;
