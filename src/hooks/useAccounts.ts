import { useState, useCallback } from 'react';
import { Account } from '../types';
import { fetchAccounts, addAccount, updateAccount, deleteAccount } from '../api/accounts';

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const loadAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAccounts();
      setAccounts(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch accounts'));
    } finally {
      setLoading(false);
    }
  }, []);
  
  const createAccount = useCallback(async (account: Omit<Account, 'id' | 'lastActive'>) => {
    try {
      const newAccount = await addAccount(account);
      setAccounts(prev => [...prev, newAccount]);
      return newAccount;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create account'));
      throw err;
    }
  }, []);
  
  const editAccount = useCallback(async (id: string, updates: Partial<Account>) => {
    try {
      const updatedAccount = await updateAccount(id, updates);
      setAccounts(prev => prev.map(a => a.id === id ? updatedAccount : a));
      return updatedAccount;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update account'));
      throw err;
    }
  }, []);
  
  const removeAccount = useCallback(async (id: string) => {
    try {
      await deleteAccount(id);
      setAccounts(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete account'));
      throw err;
    }
  }, []);
  
  return {
    accounts,
    loading,
    error,
    loadAccounts,
    createAccount,
    editAccount,
    removeAccount,
  };
}
