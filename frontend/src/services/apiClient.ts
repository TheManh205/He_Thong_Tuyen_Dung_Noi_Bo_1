import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { useAuthStore } from '../features/auth/store/auth.store';

// Giả định baseURL. Bạn có thể update thành endpoint thực tế qua .env
const baseURL = import.meta.env.VITE_API_URL || '/api/v1';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor xử lý gắn Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Lấy token từ Zustand hoặc LocalStorage nếu có
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor xử lý response (sẽ làm logic Refresh Token ở PHASE 2)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Khi API trả về 401 (Hết hạn Token), bật cờ Session Expired
      useAuthStore.getState().setSessionExpired(true);
    }
    return Promise.reject(error);
  }
);
