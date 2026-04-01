# StorageOps — Cloud Storage Monitoring Dashboard

## 🚀 Live Demo
**[Launch Application on Vercel](https://cloud-storage-dashboard-6hxs6s4jk.vercel.app/)**

## 📊 Overview
A production-grade **real-time cloud storage monitoring dashboard** built with **React + Vite**. Monitor disk usage, storage utilization, and system metrics across local drives and cloud volumes from a single unified view.

## ✨ Features
- **6 live KPI cards** — Total Storage, Used/Free Space, IOPS, CPU, Active Alerts
- **Donut chart** — Visual used vs. free storage breakdown with dynamic threshold coloring
- **24-hour area timeline** — Storage utilization trend over the last day
- **Drive table** — All 5 volumes (SSD, HDD, Cloud) with animated progress bars & status badges
- **Alert feed** — Color-coded Critical/Warning/Info alerts with dismiss support
- **System Metrics** — SVG CPU gauge, RAM progress bar, Network I/O bar chart, live IOPS counter
- **Live polling** — Simulated REST API refreshes data every 5 seconds
- **Fully responsive** — Works on mobile, tablet, and desktop

## 🛠 Tech Stack
| Technology | Purpose |
|---|---|
| React 18 + Vite | Framework + bundler |
| Recharts | Area, Bar, Pie, Line charts |
| Vanilla CSS | Styling with CSS Grid + Flexbox |
| REST API (mock) | Simulated live metrics via `storageApi.js` |
| Vercel | Deployment target |

## 📁 Project Structure
```
cloud-storage-dashboard/
├── src/
│   ├── api/storageApi.js       ← Mock REST API (replace with real endpoints)
│   ├── hooks/useStorageData.js ← Custom polling hook
│   ├── components/
│   │   ├── Header.jsx/css      ← Navigation + health status
│   │   ├── MetricCard.jsx/css  ← KPI summary cards
│   │   ├── DiskUsageChart.jsx/css  ← Donut chart
│   │   ├── StorageTimeline.jsx/css ← 24h area chart
│   │   ├── DriveTable.jsx/css  ← Per-drive volume table
│   │   ├── AlertPanel.jsx/css  ← Alert feed with dismiss
│   │   └── SystemMetrics.jsx/css   ← CPU/RAM/Network/IOPS
│   ├── App.jsx / App.css       ← Layout + routing
│   └── main.jsx / index.css    ← Entry point
├── vercel.json                 ← Vercel SPA config
└── index.html                  ← SEO meta tags
```

## 🏃 Local Development
```bash
npm install
npm run dev
# → http://localhost:5173
```

## 🤝 Contributing
I'm always looking for ways to improve this dashboard! If you have suggestions or want to contribute:
1. **Fork** the repo
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 🔌 Connecting to a Real Backend
Replace the mock functions in `src/api/storageApi.js` with real `fetch()` calls:

```js
export async function fetchStorageMetrics() {
  const res = await fetch('https://your-api.com/api/metrics');
  return res.json();
}
```

## 📄 License
This project is licensed under the MIT License.
