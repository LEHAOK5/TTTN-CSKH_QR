import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Trỏ về Backend
  headers: {
    'Content-Type': 'application/json'
  }
});

// Middleware tự động gắn Token vào Header nếu có (dành cho Lễ tân)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
