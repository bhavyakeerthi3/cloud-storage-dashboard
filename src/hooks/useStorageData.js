import { useState, useEffect, useCallback } from 'react';
import { fetchStorageMetrics, fetchTimeline, fetchAlerts, dismissAlert } from '../api/storageApi';

export function useStorageData(pollInterval = 5000) {
  const [metrics, setMetrics] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  const refresh = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      const [m, t, a] = await Promise.all([
        fetchStorageMetrics(),
        fetchTimeline(),
        fetchAlerts(),
      ]);
      setMetrics(m);
      setTimeline(t);
      setAlerts(a);
      setLastUpdated(new Date());
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      if (isInitial) setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    refresh(true);
  }, [refresh]);

  // Polling
  useEffect(() => {
    const timer = setInterval(() => refresh(false), pollInterval);
    return () => clearInterval(timer);
  }, [refresh, pollInterval]);

  const handleDismissAlert = useCallback((id) => {
    dismissAlert(id);
    setAlerts(prev => prev.filter(a => a.id !== id));
  }, []);

  return { metrics, timeline, alerts, loading, lastUpdated, error, refresh, handleDismissAlert };
}
