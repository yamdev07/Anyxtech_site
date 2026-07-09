interface Point {
  date: string;
  count: number;
}

export default function TrafficChart({ data }: { data: Point[] }) {
  const width = 700;
  const height = 220;
  const padding = 24;
  const max = Math.max(1, ...data.map((d) => d.count));

  const stepX = data.length > 1 ? (width - padding * 2) / (data.length - 1) : 0;
  const points = data.map((d, i) => {
    const x = padding + i * stepX;
    const y = height - padding - (d.count / max) * (height - padding * 2);
    return { x, y };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1]?.x ?? padding},${height - padding} L${padding},${height - padding} Z`;

  const total = data.reduce((sum, d) => sum + d.count, 0);

  if (total === 0) {
    return (
      <div className="grid h-[220px] place-items-center text-sm text-soft">
        Pas encore assez de visites pour afficher une tendance.
      </div>
    );
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-[220px] w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1db9ff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#1db9ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((r) => (
        <line
          key={r}
          x1={padding}
          x2={width - padding}
          y1={padding + r * (height - padding * 2)}
          y2={padding + r * (height - padding * 2)}
          stroke="var(--border)"
          strokeWidth={1}
        />
      ))}
      <path d={areaPath} fill="url(#trafficFill)" />
      <path d={linePath} fill="none" stroke="#1db9ff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
