import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to automatically attach authorization token and format URLs
api.interceptors.request.use(
  (config: any) => {
    // Strip leading slash to prevent Axios from stripping the baseURL sub-path
    if (config.url && config.url.startsWith('/')) {
      config.url = config.url.substring(1);
    }

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor for easy error handling
api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    // Standardize error responses
    const message = error.response?.data?.message || 'Terjadi kesalahan sistem';
    const errors = error.response?.data?.errors || null;
    
    return Promise.reject({
      message,
      errors,
      status: error.response?.status,
      originalError: error,
    });
  }
);
