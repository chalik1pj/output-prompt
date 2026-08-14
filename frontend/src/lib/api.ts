import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  // Timeout eksplisit -- sebelumnya tidak diset (default axios = tanpa batas),
  // artinya request yang macet (jaringan lambat, backend hang) membuat UI
  // "loading" selamanya tanpa pernah menunjukkan error. Ini salah satu penyebab
  // utama admin panel terasa "sangat lama": bukan selalu backend-nya lambat,
  // tapi tidak ada apa pun yang memberi tahu user kalau request sudah gagal.
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

// Handle 401 -> token kedaluwarsa/tidak valid. Sebelumnya cuma menghapus token
// dari sessionStorage tanpa memberi tahu AdminAuthProvider, jadi UI tetap
// terlihat seperti masih login (sidebar dsb) sampai user refresh manual --
// terasa seperti "macet". Sekarang paksa redirect ke login supaya statusnya
// jelas dan konsisten.
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
