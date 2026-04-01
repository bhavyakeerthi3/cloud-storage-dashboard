// Mock REST API — simulates a real backend returning storage metrics
// In production, replace these with actual fetch() calls to your API endpoints

const BASE_DELAY = 300; // Simulates network latency

function randomFluctuation(base, range) {
  return Math.max(0, base + (Math.random() - 0.5) * range * 2);
}

function generateTimeSeriesData(points = 24) {
  const data = [];
  const now = Date.now();
  let usedValue = 58;
  for (let i = points; i >= 0; i--) {
    usedValue = Math.min(99, Math.max(20, usedValue + (Math.random() - 0.45) * 3));
    const ts = new Date(now - i * 3600 * 1000);
    data.push({
      time: ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      used: parseFloat(usedValue.toFixed(1)),
      free: parseFloat((100 - usedValue).toFixed(1)),
    });
  }
  return data;
}

const DRIVES = [
  { id: 'C', label: 'C:\\ System', totalGB: 500, typeIcon: '💿', type: 'SSD' },
  { id: 'D', label: 'D:\\ Data', totalGB: 1000, typeIcon: '🗄️', type: 'HDD' },
  { id: 'E', label: 'E:\\ Media', totalGB: 2000, typeIcon: '🗄️', type: 'HDD' },
  { id: 'S3', label: 'AWS S3 Bucket', totalGB: 5000, typeIcon: '☁️', type: 'Cloud' },
  { id: 'GCS', label: 'GCS Storage', totalGB: 3000, typeIcon: '☁️', type: 'Cloud' },
];

let driveUsage = { C: 78, D: 45, E: 62, S3: 34, GCS: 21 };

const alertPool = [
  { id: 1, severity: 'critical', message: 'C:\\ drive usage exceeded 75% threshold', time: '2 min ago', icon: '🔴' },
  { id: 2, severity: 'warning', message: 'E:\\ Media drive I/O latency spike detected', time: '8 min ago', icon: '🟡' },
  { id: 3, severity: 'info', message: 'Snapshot backup completed for GCS bucket', time: '15 min ago', icon: '🔵' },
  { id: 4, severity: 'warning', message: 'S3 bucket approaching 40% capacity limit', time: '22 min ago', icon: '🟡' },
  { id: 5, severity: 'info', message: 'System storage health check passed', time: '1 hr ago', icon: '🔵' },
  { id: 6, severity: 'critical', message: 'Unexpected write spike on D:\\ volume', time: '1 hr ago', icon: '🔴' },
];

// Simulate /api/metrics — overall system snapshot
export async function fetchStorageMetrics() {
  await new Promise(r => setTimeout(r, BASE_DELAY));

  // Fluctuate drive usage slightly each poll
  Object.keys(driveUsage).forEach(k => {
    driveUsage[k] = Math.min(99, Math.max(5, driveUsage[k] + (Math.random() - 0.5) * 1.5));
  });

  const drives = DRIVES.map(d => ({
    ...d,
    usedGB: parseFloat(((driveUsage[d.id] / 100) * d.totalGB).toFixed(1)),
    freeGB: parseFloat(((1 - driveUsage[d.id] / 100) * d.totalGB).toFixed(1)),
    usedPct: parseFloat(driveUsage[d.id].toFixed(1)),
    status: driveUsage[d.id] > 75 ? 'critical' : driveUsage[d.id] > 55 ? 'warning' : 'healthy',
  }));

  const totalGB = drives.reduce((s, d) => s + d.totalGB, 0);
  const usedGB = drives.reduce((s, d) => s + d.usedGB, 0);
  const freeGB = totalGB - usedGB;
  const usedPct = parseFloat(((usedGB / totalGB) * 100).toFixed(1));

  const cpuUsage = parseFloat(randomFluctuation(42, 18).toFixed(1));
  const ramUsed = parseFloat(randomFluctuation(11.8, 2).toFixed(1));
  const ramTotal = 16;
  const netRx = parseFloat(randomFluctuation(180, 80).toFixed(1));
  const netTx = parseFloat(randomFluctuation(95, 40).toFixed(1));
  const iops = Math.floor(randomFluctuation(1200, 400));
  const health = drives.filter(d => d.status === 'critical').length > 1
    ? 'Critical' : drives.filter(d => d.status === 'warning').length > 1
    ? 'Warning' : 'Healthy';

  return {
    summary: { totalGB, usedGB, freeGB, usedPct, health },
    drives,
    system: { cpuUsage, ramUsed, ramTotal, netRx, netTx, iops },
    timestamp: new Date().toISOString(),
  };
}

// Simulate /api/timeline — usage over last 24h
export async function fetchTimeline() {
  await new Promise(r => setTimeout(r, BASE_DELAY + 100));
  return generateTimeSeriesData(24);
}

// Simulate /api/alerts
export async function fetchAlerts() {
  await new Promise(r => setTimeout(r, BASE_DELAY));
  return alertPool;
}

export function dismissAlert(id) {
  const idx = alertPool.findIndex(a => a.id === id);
  if (idx !== -1) alertPool.splice(idx, 1);
}
