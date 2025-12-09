import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const banksAPI = {
  getAll: () => api.get('/banks'),
  create: (data: { name: string; balance: number }) => api.post('/banks', data),
  delete: (id: number) => api.delete(`/banks/${id}`),
};

export const incomesAPI = {
  getAll: () => api.get('/incomes'),
  create: (data: { description: string; amount: number; date: string; category: string; bank: string }) => 
    api.post('/incomes', data),
  delete: (id: number) => api.delete(`/incomes/${id}`),
};

export const expensesAPI = {
  getAll: () => api.get('/expenses'),
  create: (data: { description: string; amount: number; date: string; category: string; bank: string }) => 
    api.post('/expenses', data),
  delete: (id: number) => api.delete(`/expenses/${id}`),
};

export const recurringAPI = {
  getAll: () => api.get('/recurring'),
  create: (data: { description: string; amount: number; type: string; dayOfMonth: number; category: string }) => 
    api.post('/recurring', data),
  delete: (id: number) => api.delete(`/recurring/${id}`),
};
