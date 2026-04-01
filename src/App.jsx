import React from 'react';
import './App.css';
import Header from './components/Header';
import MetricCard from './components/MetricCard';
import DiskUsageChart from './components/DiskUsageChart';
import StorageTimeline from './components/StorageTimeline';
import DriveTable from './components/DriveTable';
import AlertPanel from './components/AlertPanel';
import SystemMetrics from './components/SystemMetrics';
import { useStorageData } from './hooks/useStorageData';

const DatabaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

const ChartBarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
);

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ZapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const ActivityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-spinner" />
      <p>Initializing Storage Engine...</p>
    </div>
  );
}

export default function App() {
  const { metrics, timeline, alerts, loading, lastUpdated, refresh, handleDismissAlert } = useStorageData(5000);

  if (loading) return <LoadingScreen />;

  const { summary, drives, system } = metrics || {};

  const kpis = [
    {
      icon: <DatabaseIcon />, label: 'Aggregate Storage', color: '#6366f1',
      value: summary ? (summary.totalGB / 1000).toFixed(1) : '--', unit: 'TB',
      sub: `${drives?.length || 0} active volumes`,
    },
    {
      icon: <ChartBarIcon />, label: 'Current Overhead', color: '#f59e0b',
      value: summary ? summary.usedGB.toFixed(0) : '--', unit: 'GB',
      sub: `${summary?.usedPct ?? '--'}% fill rate`,
      trend: 2.4,
    },
    {
      icon: <CheckIcon />, label: 'Remaining Credits', color: '#16a34a',
      value: summary ? summary.freeGB.toFixed(0) : '--', unit: 'GB',
      sub: 'Buffer available',
    },
    {
      icon: <ZapIcon />, label: 'Network I/O', color: '#7c3aed',
      value: system ? system.iops.toLocaleString() : '--', unit: 'ops/s',
      sub: 'Transaction velocity',
    },
    {
      icon: <ActivityIcon />, label: 'Host Latency', color: '#0ea5e9',
      value: system ? system.cpuUsage : '--', unit: '%',
      sub: 'Processor pressure',
    },
    {
      icon: <BellIcon />, label: 'Incident Log', color: '#ef4444',
      value: alerts.length,
      sub: `${alerts.filter(a => a.severity === 'critical').length} high priority`,
    },
  ];

  return (
    <div className="app">
      <Header
        lastUpdated={lastUpdated}
        onRefresh={() => refresh(false)}
        health={summary?.health}
        loading={loading}
      />

      <main className="dashboard-main">
        <section className="kpi-grid">
          {kpis.map((kpi, idx) => (
            <MetricCard key={idx} {...kpi} />
          ))}
        </section>

        <section className="row-two">
          <DiskUsageChart summary={summary} />
          <StorageTimeline data={timeline} />
        </section>

        <section className="row-three">
          <DriveTable drives={drives} />
        </section>

        <section className="row-four">
          <AlertPanel alerts={alerts} onDismiss={handleDismissAlert} />
          <SystemMetrics system={system} />
        </section>
      </main>

      <footer className="dashboard-footer">
        <div className="footer-left">
          <span>Enterprise Storage Monitoring Framework v4.0.2</span>
        </div>
        <div className="footer-right">
          <span>Real-time Telemetry Active</span>
        </div>
      </footer>
    </div>
  );
}
