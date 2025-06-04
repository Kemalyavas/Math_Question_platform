import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Axios instance oluştur
const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor - token ekle
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - hata yönetimi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token geçersiz veya süresi dolmuş
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
};

// Questions API
export const questionAPI = {
  getQuestions: (params) => api.get('/questions', { params }),
  downloadQuestions: (questionIds) => api.post('/questions/download', { questionIds }),
  getQuestionById: (id) => api.get(`/questions/${id}`),
};

// Credits API
export const creditAPI = {
  purchaseCredits: (amount) => api.post('/credits/purchase', { amount }),
  getCreditHistory: () => api.get('/credits/history'),
};

export default api;