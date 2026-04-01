import React from 'react';
import './DriveTable.css';

const SSDIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const HDDIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="2" y1="10" x2="22" y2="10"></line>
    <line x1="7" y1="21" x2="17" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);

const CloudIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19c2.5 0 4.5-2 4.5-4.5 0-2.4-1.9-4.3-4.3-4.5-1.1-2.9-4-5-7.2-5-3.3 0-6.1 2.3-7 5.4C1.9 11 0 13.1 0 15.5 0 18 2 20 4.5 20h13"></path>
  </svg>
);

const typeIcons = {
  SSD: <SSDIcon />,
  HDD: <HDDIcon />,
  Cloud: <CloudIcon />,
};

const statusConfig = {
  critical: { color: 'var(--red)', bg: 'var(--red-bg)', text: 'Critical' },
  warning:  { color: 'var(--amber)', bg: 'var(--amber-bg)', text: 'Warning'  },
  healthy:  { color: 'var(--green)', bg: 'var(--green-bg)', text: 'Healthy'  },
};

function ProgressBar({ pct, status }) {
  const cfg = statusConfig[status] || statusConfig.healthy;
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-fill"
        style={{ width: `${Math.min(pct, 100)}%`, background: cfg.color }}
      />
    </div>
  );
}

export default function DriveTable({ drives }) {
  if (!drives || drives.length === 0) {
    return <div className="drive-table-section"><p>Loading storage data...</p></div>;
  }

  return (
    <div className="drive-table-section">
      <div className="card-header">
        <h3 className="card-title">Storage Volumes</h3>
        <span className="card-badge">{drives.length} total</span>
      </div>

      <div className="table-wrapper">
        <table className="storage-table">
          <thead>
            <tr>
              <th>Volume Name</th>
              <th>Type</th>
              <th>Used / Total</th>
              <th>Usage</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {drives.map((drive) => {
              const cfg = statusConfig[drive.status] || statusConfig.healthy;
              return (
                <tr key={drive.id} className="storage-row">
                  <td className="volume-info">
                    <div className="volume-icon-wrapper">
                      {typeIcons[drive.type] || <HDDIcon />}
                    </div>
                    <div className="volume-text">
                      <span className="volume-label">{drive.label}</span>
                      <span className="volume-id">{drive.id} Partition</span>
                    </div>
                  </td>
                  <td>
                    <span className="type-chip">{drive.type}</span>
                  </td>
                  <td className="data-text">
                    <span className="used-val">{drive.usedGB} GB</span>
                    <span className="total-val"> / {drive.totalGB} GB</span>
                  </td>
                  <td className="progress-cell">
                    <ProgressBar pct={drive.usedPct} status={drive.status} />
                    <span className="pct-val" style={{ color: cfg.color }}>{drive.usedPct}%</span>
                  </td>
                  <td>
                    <span
                      className="status-pill"
                      style={{ color: cfg.color, background: cfg.bg }}
                    >
                      {cfg.text}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
