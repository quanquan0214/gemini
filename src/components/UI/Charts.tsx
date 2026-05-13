import React from 'react';

const C = {
  emerald: "#10b981",
  blue: "#3b82f6",
  cyan: "#06b6d4",
  orange: "#f97316",
  border: "rgba(255,255,255,0.07)",
  slate500: "#64748b",
  slate600: "#475569",
};

export const Sparkline = ({ data, color = C.emerald, height = 40, filled = true }: { data: any[], color?: string, height?: number, filled?: boolean }) => {
  if (!data?.length) return null;
  const W = 200, H = height;
  const vals = data.map((d) => typeof d === 'object' ? d.v : d);
  const min = Math.min(...vals), max = Math.max(...vals);
  const scale = (v: number) => H - ((v - min) / (max - min || 1)) * H;
  const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * W},${scale(v)}`).join(" ");
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: "block" }}>
      {filled && (
        <polygon
          points={`0,${H} ${pts} ${W},${H}`}
          fill={color}
          opacity={0.12}
        />
      )}
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
};

export const BarChart = ({ data, color = C.cyan }: { data: any[], color?: string }) => {
  const vals = data.map(d => typeof d === 'object' ? d.v : d);
  const max = Math.max(...vals);
  return (
    <svg width="100%" viewBox="0 0 200 50" preserveAspectRatio="none" style={{ display: "block" }}>
      {vals.map((v, i) => {
        const bh = (v / max) * 40;
        const x = (i / vals.length) * 200;
        const bw = 200 / vals.length - 2;
        return (
          <rect
            key={i}
            x={x + 1}
            y={50 - bh}
            width={bw}
            height={bh}
            fill={color}
            opacity={0.6 + 0.4 * (v / max)}
            rx="1"
          />
        );
      })}
    </svg>
  );
};

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export const RadialGauge = ({ value, max = 1, label, color = C.emerald, size = 80 }: { value: number, max?: number, label: string, color?: string, size?: number }) => {
  const pct = clamp(value / max, 0, 1);
  const r = size * 0.38;
  const cx = size / 2, cy = size / 2;
  const arc = (p: number) => {
    const a = -Math.PI / 2 + p * Math.PI * 1.5;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };
  const end = arc(pct);
  const d = `M ${arc(0).x} ${arc(0).y} A ${r} ${r} 0 ${pct > 0.667 ? 1 : 0} 1 ${end.x} ${end.y}`;
  const full = `M ${arc(0).x} ${arc(0).y} A ${r} ${r} 0 1 1 ${arc(0.9999).x} ${arc(0.9999).y}`;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path d={full} fill="none" stroke={C.border} strokeWidth="4" strokeLinecap="round" />
      {pct > 0 && <path d={d} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />}
      <text
        x={cx}
        y={cy - 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        fontSize="13"
        fontWeight="600"
      >
        {Math.round(pct * 100)}%
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill={C.slate500} fontSize="8">
        {label}
      </text>
    </svg>
  );
};
