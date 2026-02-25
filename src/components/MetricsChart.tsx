import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

type ChartPoint = {
  label: string;
  openRate: number;
};

type Props = {
  baseOpenRate: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function MetricsChart({ baseOpenRate }: Props) {
  const data = useMemo<ChartPoint[]>(() => {
    const points: ChartPoint[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i -= 1) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);

      const label = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
      const jitter = (Math.random() - 0.5) * 6;
      const openRate = clamp(baseOpenRate + jitter, 5, 85);

      points.push({ label, openRate: Number(openRate.toFixed(1)) });
    }

    return points;
  }, [baseOpenRate]);

  return (
    <div className="h-72 w-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-white">Open Rate Trend</div>
          <div className="mt-1 text-xs text-slate-300/70">Last 7 days</div>
        </div>
        <div className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-200 ring-1 ring-indigo-400/20">
          Open rate
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
          <CartesianGrid stroke="rgba(148,163,184,0.20)" strokeDasharray="4 4" />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: 'rgba(226,232,240,0.75)' }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fontSize: 12, fill: 'rgba(226,232,240,0.75)' }}
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(v) => [`${v}%`, 'Open rate']}
            contentStyle={{
              background: 'rgba(2,6,23,0.9)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 12,
              color: 'rgba(226,232,240,0.9)',
            }}
            labelStyle={{ color: 'rgba(226,232,240,0.8)' }}
          />
          <Line type="monotone" dataKey="openRate" stroke="#818cf8" strokeWidth={2.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
