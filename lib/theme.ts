export const theme = {
  navPurple: "#B87FE8",
  langBtn: "#5BCFFF",
  shopBtn: "#3DDB6E",
  bottomBar: "#1E3A5F",

  tabs: {
    colors: { bg: "#FFB366", contentBg: "#F5C4A8", textOutline: "#E8954A" },
    connect: { bg: "#FF99CC", contentBg: "#FF99CC", textOutline: "#E870A8" },
    mazes: { bg: "#33CC99", contentBg: "#70F3B0", textOutline: "#28A87A" },
    lines: { bg: "#B8E86A", contentBg: "#D2FF7D", textOutline: "#8BC34A" },
    alphabets: { bg: "#66E0F5", contentBg: "#99FFFF", textOutline: "#3CC8E0" },
    numbers: { bg: "#FFD633", contentBg: "#FFF59D", textOutline: "#E6C200" },
    shapes: { bg: "#FF9999", contentBg: "#F2949C", textOutline: "#E07070" },
  },

  cards: {
    colors: { border: "#AA55FF", footer: "#AA55FF", textOutline: "#8833DD" },
    connect: { border: "#FFAA22", footer: "#FFCC33", textOutline: "#E88800" },
    mazes: { border: "#FF66AA", footer: "#FF66AA", textOutline: "#DD4499" },
    lines: { border: "#FF44CC", footer: "#FF44CC", textOutline: "#DD22AA" },
    alphabets: { border: "#C87858", footer: "#C87858", textOutline: "#A05838" },
    numbers: { border: "#4FC3F7", footer: "#4FC3F7", textOutline: "#29A8E0" },
    shapes: { border: "#66CC66", footer: "#66CC66", textOutline: "#44AA44" },
  },
} as const;

export type CategoryId = keyof typeof theme.tabs;
