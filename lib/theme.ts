export const theme = {
  navPurple: "#B87FE8",
  langBtn: "#5BCFFF",
  shopBtn: "#3DDB6E",
  bottomBar: "#1E3A5F",
  toolbarYellow: "#FFE566",

  tabs: {
    colors: { bg: "#FFB366", contentBg: "#F5C4A8", textOutline: "#D97A2A" },
    connect: { bg: "#FF99CC", contentBg: "#FDCFE3", textOutline: "#E05599" },
    mazes: { bg: "#33CC99", contentBg: "#8DE89A", textOutline: "#1A9E66" },
    lines: { bg: "#B8E86A", contentBg: "#C6E06D", textOutline: "#6FAF2E" },
    alphabets: { bg: "#66E0F5", contentBg: "#66E0F5", textOutline: "#2AAED4" },
    numbers: { bg: "#FFD633", contentBg: "#FFF59D", textOutline: "#D4A800" },
    shapes: { bg: "#FF9999", contentBg: "#F2949C", textOutline: "#D95555" },
  },

  cards: {
    colors: { border: "#9C6ADE", footer: "#9C6ADE", textOutline: "#7A4ABE" },
    connect: { border: "#FFB74D", footer: "#FFCC33", textOutline: "#E69500" },
    mazes: { border: "#FF66AA", footer: "#FF66AA", textOutline: "#DD4499" },
    lines: { border: "#FF44CC", footer: "#FF44CC", textOutline: "#DD22AA" },
    alphabets: { border: "#C87858", footer: "#C87858", textOutline: "#A05838" },
    numbers: { border: "#4FC3F7", footer: "#4FC3F7", textOutline: "#29A8E0" },
    shapes: { border: "#66CC66", footer: "#66CC66", textOutline: "#44AA44" },
  },
} as const;

export type CategoryId = keyof typeof theme.tabs;
