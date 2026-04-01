import React from 'react';
import './MetricCard.css';

export default function MetricCard({ icon, label, value, unit, sub, color, trend }) {
  const isPositive = trend > 0;
  
  return (
    <div className="metric-card">
      <div className="metric-header">
        <div className="metric-icon-box" style={{ backgroundColor: `${color}15`, color: color }}>
          {icon}
        </div>
        {trend !== undefined && (
          <div className={`metric-trend ${isPositive ? 'up' : 'down'}`}>
            <span>{isPositive ? '+' : ''}{trend}%</span>
          </div>
        )}
      </div>
      
      <div className="metric-details">
        <span className="metric-label">{label}</span>
        <div className="metric-value-row">
          <h2 className="metric-value">{value !== undefined ? value : '--'}</h2>
          {unit && <span className="metric-unit">{unit}</span>}
        </div>
        {sub && <p className="metric-sub">{sub}</p>}
      </div>
    </div>
  );
}
