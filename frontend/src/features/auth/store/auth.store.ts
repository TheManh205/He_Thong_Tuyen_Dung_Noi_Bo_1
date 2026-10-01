import { create } from 'zustand';
import type { UserInfo } from '../api/auth.types';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
  isSessionExpired: boolean;
  setCredentials: (data: { accessToken: string; refreshToken: string; userInfo: UserInfo }) => void;
  setSessionExpired: (status: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  userInfo: JSON.parse(localStorage.getItem('userInfo') || 'null'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
  isSessionExpired: false,

  setCredentials: ({ accessToken, refreshToken, userInfo }: { accessToken: string; refreshToken: string; userInfo: UserInfo }) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    set({ accessToken, refreshToken, userInfo, isAuthenticated: true, isSessionExpired: false });
  },

  setSessionExpired: (status: boolean) => {
    set({ isSessionExpired: status });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    set({ accessToken: null, refreshToken: null, userInfo: null, isAuthenticated: false, isSessionExpired: false });
  },
}));
