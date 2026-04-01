import React from 'react';
import './Header.css';

const CloudIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19c2.5 0 4.5-2 4.5-4.5 0-2.4-1.9-4.3-4.3-4.5-1.1-2.9-4-5-7.2-5-3.3 0-6.1 2.3-7 5.4C1.9 11 0 13.1 0 15.5 0 18 2 20 4.5 20h13"></path>
  </svg>
);

const RefreshIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6"></path>
    <path d="M1 20v-6h6"></path>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
);

export default function Header({ lastUpdated, onRefresh, health, loading }) {
  const isHealthy = health === 'Healthy';
  
  return (
    <header className="dashboard-header">
      <div className="header-container">
        <div className="header-left">
          <div className="header-logo">
            <div className="logo-icon-wrapper">
              <CloudIcon />
            </div>
            <div className="logo-text">
              <h1 className="header-title">StorageOps</h1>
              <span className="header-subtitle">Infrastructure Monitor</span>
            </div>
          </div>
        </div>

        <div className="header-right">
          <div className="live-status">
            <span className="live-pill">
              <span className="live-dot" />
              LIVE
            </span>
          </div>

          <div className="vertical-divider" />

          <div className={`system-health ${health?.toLowerCase()}`}>
            <span className="health-label">System {health || 'Offline'}</span>
          </div>

          <div className="last-sync">
            <span className="sync-label">Last sync:</span>
            <span className="sync-time">{lastUpdated ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--:--'}</span>
          </div>

          <button className={`header-action-btn ${loading ? 'is-loading' : ''}`} onClick={onRefresh} title="Refresh metrics">
            <RefreshIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
