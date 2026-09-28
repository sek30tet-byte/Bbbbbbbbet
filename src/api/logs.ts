import api from './client';
import { LogEntry } from '../types';

export const fetchLogs = async (limit?: number): Promise<LogEntry[]> => {
  const params = limit ? `?limit=${limit}` : '';
  return api.get<LogEntry[]>(`/logs${params}`);
};

export const clearLogs = async (): Promise<void> => {
  await api.delete('/logs');
};
