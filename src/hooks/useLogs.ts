import { useState, useCallback, useEffect } from 'react';
import { LogEntry } from '../types';
import { fetchLogs } from '../api/logs';

export function useLogs(autoRefresh = true, refreshInterval = 5000) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const loadLogs = useCallback(async () => {
    try {
      const data = await fetchLogs(50);
      setLogs(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch logs'));
    }
  }, []);
  
  const addLogEntry = useCallback((log: LogEntry) => {
    setLogs(prev => [log, ...prev].slice(0, 100));
  }, []);
  
  useEffect(() => {
    loadLogs();
    
    if (autoRefresh) {
      const interval = setInterval(loadLogs, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, loadLogs]);
  
  return { logs, loading, error, loadLogs, addLogEntry };
}
