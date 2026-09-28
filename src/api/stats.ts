import api from './client';
import { Stats } from '../types';

export const fetchStats = async (): Promise<Stats> => {
  return api.get<Stats>('/stats');
};
