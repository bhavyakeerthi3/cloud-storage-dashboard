import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, Tooltip,
} from 'recharts';
import './SystemMetrics.css';

function MiniBar({ value, max, color, label, unit }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="system-mini-metric">
      <div className="mini-meta">
        <span className="mini-name">{label}</span>
        <span className="mini-qty" style={{ color }}>{value}{unit}</span>
      </div>
      <div className="mini-progress">
        <div className="mini-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export default function SystemMetrics({ system }) {
  if (!system) return null;

  const { cpuUsage, ramUsed, ramTotal, netRx, netTx, iops } = system;
  const ramPct = parseFloat(((ramUsed / ramTotal) * 100).toFixed(1));

  const cpuColor = cpuUsage > 80 ? 'var(--red)' : cpuUsage > 50 ? 'var(--amber)' : 'var(--green)';
  const ramColor = ramPct > 80 ? 'var(--red)' : ramPct > 60 ? 'var(--amber)' : 'var(--accent)';

  const netData = [
    { name: 'Down', value: netRx, color: 'var(--green)' },
    { name: 'Up', value: netTx, color: 'var(--accent)' },
  ];

  return (
    <div className="system-resource-card">
      <div className="card-header">
        <h3 className="card-title">Real-time Performance</h3>
        <span className="card-badge">Engine active</span>
      </div>

      <div className="resource-grid">
        <div className="resource-tile">
          <span className="tile-label">Processor Load</span>
          <div className="gauge-box">
            <svg viewBox="0 0 36 36" className="circular-gauge">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="var(--bg-surface-3)" strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke={cpuColor} strokeWidth="3"
                strokeDasharray={`${cpuUsage}, 100`}
                strokeLinecap="round"
                className="gauge-fill"
              />
            </svg>
            <div className="gauge-val" style={{ color: cpuColor }}>{cpuUsage}%</div>
          </div>
        </div>

        <div className="resource-tile">
          <span className="tile-label">Memory Distribution</span>
          <MiniBar value={ramUsed} max={ramTotal} color={ramColor} label={`${ramUsed} / ${ramTotal} GB`} unit="" />
          <span className="tile-subtext">{ramPct}% usage detected</span>
        </div>

        <div className="resource-tile">
          <span className="tile-label">Network Throughput</span>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={netData} barSize={24} margin={{ top: 5, right: 0, left: -32, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '11px', boxShadow: 'none' }}
                cursor={{ fill: 'var(--bg-surface-3)' }}
                formatter={(v) => [`${v} Mbps`, '']}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {netData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="resource-tile">
          <span className="tile-label">Global I/O Velocity</span>
          <div className="velocity-box">
            <span className="velocity-val">{iops.toLocaleString()}</span>
            <span className="velocity-unit">tasks/s</span>
          </div>
          <span className="tile-subtext">Cumulative disk throughput</span>
        </div>
      </div>
    </div>
  );
}
