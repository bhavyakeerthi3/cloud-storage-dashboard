import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import './StorageTimeline.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="timeline-tooltip">
        <p className="tooltip-title">{label}</p>
        <div className="tooltip-items">
          {payload.map((p, i) => (
            <div key={i} className="tooltip-item">
              <span className="tooltip-dot" style={{ background: p.color }}></span>
              <span className="tooltip-name">{p.name}:</span>
              <span className="tooltip-value">{p.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function StorageTimeline({ data }) {
  const tickInterval = Math.floor((data.length - 1) / 4);

  return (
    <div className="timeline-section-card">
      <div className="card-header">
        <h3 className="card-title">Storage Utilization (24h)</h3>
        <div className="chart-legend">
          <div className="legend-pills">
            <span className="legend-pill used">
              <span className="pill-dot" />
              Used
            </span>
            <span className="legend-pill free">
              <span className="pill-dot" />
              Free
            </span>
          </div>
        </div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUsed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.01} />
              </linearGradient>
              <linearGradient id="colorFree" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--green)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="var(--green)" stopOpacity={0.01} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="time"
              tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 500 }}
              tickLine={false}
              axisLine={false}
              interval={tickInterval}
              dy={10}
            />
            <YAxis
              tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 500 }}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="used"
              name="Used"
              stroke="var(--accent)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorUsed)"
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="free"
              name="Free"
              stroke="var(--green)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorFree)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
