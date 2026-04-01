import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
} from 'recharts';
import './DiskUsageChart.css';

export default function DiskUsageChart({ summary }) {
  if (!summary) return <div className="chart-placeholder">Loading...</div>;

  const data = [
    { name: 'Used', value: summary.usedGB },
    { name: 'Free', value: summary.freeGB },
  ];

  const usedPct = summary.usedPct;
  const statusColor = usedPct > 75 ? '#dc2626' : usedPct > 55 ? '#d97706' : '#16a34a';

  return (
    <div className="disk-usage-card">
      <div className="card-header">
        <h3 className="card-title">Total Utilization</h3>
        <div className="card-badge">{ (summary.totalGB / 1000).toFixed(1) } TB Capacity</div>
      </div>

      <div className="pie-container">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={4}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={statusColor} />
              <Cell fill="var(--bg-surface-3)" />
            </Pie>
            <Tooltip
              contentStyle={{ 
                background: '#fff', 
                border: '1px solid rgba(0,0,0,0.1)', 
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                padding: '8px 12px'
              }}
              itemStyle={{ fontWeight: 600, color: '#334155' }}
              formatter={(v) => [`${v.toFixed(1)} GB`, '']}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="chart-overlay">
          <span className="overlay-pct" style={{ color: statusColor }}>{usedPct}%</span>
          <span className="overlay-label">utilized</span>
        </div>
      </div>

      <div className="legend-row">
        <div className="legend-item">
          <div className="legend-dot" style={{ background: statusColor }}></div>
          <div className="legend-info">
            <span className="legend-label">Used Space</span>
            <span className="legend-value">{summary.usedGB.toFixed(0)} GB</span>
          </div>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: 'var(--bg-surface-3)' }}></div>
          <div className="legend-info">
            <span className="legend-label">Available</span>
            <span className="legend-value">{summary.freeGB.toFixed(0)} GB</span>
          </div>
        </div>
      </div>
    </div>
  );
}
