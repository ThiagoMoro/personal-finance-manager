import axios from 'axios';
import type { Bank, Income, Expense, RecurringPayment } from '../types';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const banksAPI = {
  getAll: () => api.get<Bank[]>('/banks'),
  getById: (id: number) => api.get<Bank>(`/banks/${id}`),
  create: (bank: Omit<Bank, 'id'>) => api.post<Bank>('/banks', bank),
  update: (id: number, bank: Partial<Bank>) => api.put<Bank>(`/banks/${id}`, bank),
  delete: (id: number) => api.delete(`/banks/${id}`),
};

export const incomesAPI = {
  getAll: () => api.get<Income[]>('/incomes'),
  create: (income: Omit<Income, 'id'>) => api.post<Income>('/incomes', income),
  delete: (id: number) => api.delete(`/incomes/${id}`),
};

export const expensesAPI = {
  getAll: () => api.get<Expense[]>('/expenses'),
  create: (expense: Omit<Expense, 'id'>) => api.post<Expense>('/expenses', expense),
  delete: (id: number) => api.delete(`/expenses/${id}`),
};

export const recurringAPI = {
  getAll: () => api.get<RecurringPayment[]>('/recurring'),
  create: (payment: Omit<RecurringPayment, 'id'>) => api.post<RecurringPayment>('/recurring', payment),
  delete: (id: number) => api.delete(`/recurring/${id}`),
};

export default api;
