import React from 'react';
import './AlertPanel.css';

const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const WarningIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const ErrorIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);

const severityColors = {
  critical: { color: 'var(--red)', bg: 'var(--red-bg)', icon: <ErrorIcon /> },
  warning:  { color: 'var(--amber)', bg: 'var(--amber-bg)', icon: <WarningIcon /> },
  info:     { color: 'var(--blue)', bg: 'var(--blue-bg)', icon: <InfoIcon /> },
};

export default function AlertPanel({ alerts, onDismiss }) {
  return (
    <div className="alert-section-card">
      <div className="card-header">
        <h3 className="card-title">Security & System Events</h3>
        <span className="card-badge">{alerts.length} Active</span>
      </div>

      <div className="alerts-container">
        {alerts.length === 0 && (
          <div className="empty-alerts">
            <span className="empty-text">No active alerts. System status nominal.</span>
          </div>
        )}
        {alerts.map((alert) => {
          const cfg = severityColors[alert.severity] || severityColors.info;
          return (
            <div
              key={alert.id}
              className="alert-tile"
              style={{ borderLeft: `4px solid ${cfg.color}` }}
            >
              <div className="alert-icon-box" style={{ color: cfg.color }}>
                {cfg.icon}
              </div>
              <div className="alert-content">
                <div className="alert-top">
                  <span className="alert-msg">{alert.message}</span>
                  <span className="alert-ts">{alert.time}</span>
                </div>
                <div className="alert-footer">
                  <span className="alert-tag" style={{ color: cfg.color, background: cfg.bg }}>
                    {alert.severity}
                  </span>
                </div>
              </div>
              <button
                className="dismiss-btn"
                onClick={() => onDismiss(alert.id)}
                title="Dismiss event"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
