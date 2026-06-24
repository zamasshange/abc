"use client";

import type { DrawingTemplate } from "@/lib/drawing/templates";

type TemplateLayerProps = {
  template: DrawingTemplate;
};

function LinedPaper({ viewBox }: { viewBox: string }) {
  const [, , w, h] = viewBox.split(" ").map(Number);
  const lines = [h * 0.35, h * 0.5, h * 0.65, h * 0.8];
  return (
    <g>
      {lines.map((y, i) => (
        <line
          key={y}
          x1={w * 0.1}
          y1={y}
          x2={w * 0.9}
          y2={y}
          stroke={i === 1 ? "#FFAAAA" : "#AADDFF"}
          strokeWidth={i === 1 ? 1.5 : 2}
          strokeDasharray={i === 1 ? "6 4" : undefined}
        />
      ))}
    </g>
  );
}

function PandaMascot() {
  return (
    <g transform="translate(260, 30) scale(0.85)">
      <ellipse cx="70" cy="100" rx="50" ry="55" fill="#fff" stroke="#1a1a1a" strokeWidth="2.5" />
      <circle cx="30" cy="35" r="18" fill="#1a1a1a" />
      <circle cx="110" cy="35" r="18" fill="#1a1a1a" />
      <ellipse cx="52" cy="82" rx="14" ry="17" fill="#1a1a1a" />
      <ellipse cx="88" cy="82" rx="14" ry="17" fill="#1a1a1a" />
      <circle cx="52" cy="82" r="7" fill="#5BC8F5" />
      <circle cx="88" cy="82" r="7" fill="#5BC8F5" />
      <circle cx="55" cy="79" r="3" fill="#fff" />
      <circle cx="91" cy="79" r="3" fill="#fff" />
      <ellipse cx="70" cy="98" rx="6" ry="5" fill="#1a1a1a" />
      <path d="M64 106 Q70 114 76 106" fill="none" stroke="#1a1a1a" strokeWidth="2" />
      <ellipse cx="70" cy="110" rx="5" ry="3" fill="#FF99BB" />
      <ellipse cx="38" cy="145" rx="12" ry="15" fill="#1a1a1a" />
      <ellipse cx="102" cy="145" rx="12" ry="15" fill="#1a1a1a" />
      <ellipse cx="118" cy="72" rx="10" ry="12" fill="#1a1a1a" />
      <ellipse cx="128" cy="62" rx="8" ry="10" fill="#fff" stroke="#1a1a1a" strokeWidth="1.5" />
      <g transform="translate(30, 10) rotate(-35)">
        <rect x="0" y="0" width="16" height="100" rx="3" fill="#E84393" stroke="#1a1a1a" strokeWidth="1.5" />
        <polygon points="0,0 16,0 8,-14" fill="#E8C49A" stroke="#1a1a1a" strokeWidth="1.5" />
        <polygon points="8,-14 6,-19 10,-19" fill="#1a1a1a" />
        <ellipse cx="8" cy="100" rx="9" ry="6" fill="#FF99BB" stroke="#1a1a1a" strokeWidth="1.5" />
      </g>
      <ellipse cx="22" cy="72" rx="10" ry="12" fill="#1a1a1a" />
    </g>
  );
}

export function TemplateLayer({ template }: TemplateLayerProps) {
  return (
    <svg
      viewBox={template.viewBox}
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {template.linedPaper && <LinedPaper viewBox={template.viewBox} />}
      {template.paths.map((path, i) => (
        <path
          key={i}
          d={path.d}
          fill="none"
          stroke={path.color ?? "#1a1a1a"}
          strokeWidth={path.width ?? 4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={path.dashed ? "10 8" : undefined}
        />
      ))}
      {template.dots?.map((dot, i) => (
        <circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r ?? 7}
          fill={dot.color ?? "#FF3333"}
          stroke={dot.color === "transparent" ? "none" : "#CC2222"}
          strokeWidth={1}
        />
      ))}
      {template.showPanda && <PandaMascot />}
    </svg>
  );
}
