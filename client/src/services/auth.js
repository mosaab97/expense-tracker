import api from './api';

export const login = (data) => api.post('/users/login', data);
export const signup = (data) => api.post('/users/signup', data);
export const getProfile = () => api.get('/users/me');
