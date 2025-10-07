import api from './api';

export const getExpenses = () => api.get('/expenses', {headers: `Authorization: Bearer`});
export const getExpenseById = (id) => api.get(`/expenses/${id}`);
export const addExpense = (data) => api.post('/expenses', data);
export const updateExpense = (id, data) => api.patch(`/expenses/${id}`, data);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);
