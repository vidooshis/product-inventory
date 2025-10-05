import axios from 'axios';

// HARDCODE the deployed backend URL - remove any localhost fallback
const API_BASE_URL = 'https://product-inventory-xm1e.onrender.com';

console.log('🔧 API Base URL:', API_BASE_URL); // This should show in browser console

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;