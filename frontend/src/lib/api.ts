import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add auth token to admin requests
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      sessionStorage.removeItem('admin_token');
      sessionStorage.removeItem('admin_user');
      if (!window.location.pathname.includes('/admin-panel/login')) {
        window.location.href = '/admin-panel/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;
