import axios from 'axios';

// Use environment variable for base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://product-inventory-xm1e.onrender.com';

console.log('API Base URL:', API_BASE_URL); // Add this for debugging

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