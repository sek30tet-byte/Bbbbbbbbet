import api from './client';
import { Account } from '../types';

export const fetchAccounts = async (): Promise<Account[]> => {
  return api.get<Account[]>('/accounts');
};

export const addAccount = async (account: Omit<Account, 'id' | 'lastActive'>): Promise<Account> => {
  return api.post<Account>('/accounts', account);
};

export const updateAccount = async (id: string, updates: Partial<Account>): Promise<Account> => {
  return api.put<Account>(`/accounts/${id}`, updates);
};

export const deleteAccount = async (id: string): Promise<void> => {
  await api.delete(`/accounts/${id}`);
};
