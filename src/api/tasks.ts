import api from './client';
import { Task } from '../types';

export const fetchTasks = async (): Promise<Task[]> => {
  return api.get<Task[]>('/tasks');
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  return api.post<Task>('/tasks', task);
};

export const updateTask = async (id: string, updates: Partial<Task>): Promise<Task> => {
  return api.put<Task>(`/tasks/${id}`, updates);
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
