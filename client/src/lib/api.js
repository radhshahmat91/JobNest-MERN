import axios from 'axios';
export const api = axios.create({baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'});
api.interceptors.request.use(config => {
  const token = localStorage.getItem('jobnest_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export function saveSession(data) {
  localStorage.setItem('jobnest_token', data.token);
  localStorage.setItem('jobnest_user', JSON.stringify(data.user));
}
export function getUser() {
  try { return JSON.parse(localStorage.getItem('jobnest_user') || 'null'); } catch { return null; }
}
export function clearSession() {
  localStorage.removeItem('jobnest_token'); localStorage.removeItem('jobnest_user');
}
