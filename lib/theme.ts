export const theme = {
  navPurple: "#C49AE8",
  langBtn: "#4FC3F7",
  shopBtn: "#3DDB6E",
  bottomBar: "#1A3352",
  toolbarRed: "#D32F2F",
  toolbarOrange: "#F57C00",

  tabs: {
    colors: { bg: "#FF9933", contentBg: "#F5C4A8", textOutline: "#CC6600" },
    connect: { bg: "#FF66B2", contentBg: "#FDCFE3", textOutline: "#CC3388" },
    mazes: { bg: "#33CC99", contentBg: "#76E8B1", textOutline: "#1A9966" },
    lines: { bg: "#B8E050", contentBg: "#C6E06D", textOutline: "#6B9E22" },
    alphabets: { bg: "#33D6F5", contentBg: "#66E0F5", textOutline: "#1A9EC4" },
    numbers: { bg: "#FFCC00", contentBg: "#FFF59D", textOutline: "#CC9900" },
    shapes: { bg: "#FF8080", contentBg: "#F2949C", textOutline: "#CC4444" },
  },

  cards: {
    colors: { border: "#BA68C8", footer: "#BA68C8", textOutline: "#8E44AD" },
    connect: { border: "#FFCC33", footer: "#FFCC33", textOutline: "#CC9900" },
    mazes: { border: "#FF6B6B", footer: "#FF6B6B", textOutline: "#CC3333" },
    lines: { border: "#FF44CC", footer: "#FF44CC", textOutline: "#CC2299" },
    alphabets: { border: "#C87858", footer: "#C87858", textOutline: "#9E5030" },
    numbers: { border: "#4FC3F7", footer: "#4FC3F7", textOutline: "#2196C4" },
    shapes: { border: "#69F0AE", footer: "#69F0AE", textOutline: "#33AA66" },
  },
} as const;

export type CategoryId = keyof typeof theme.tabs;
