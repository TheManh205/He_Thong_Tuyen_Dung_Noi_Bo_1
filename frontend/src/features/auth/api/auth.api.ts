import { apiClient } from '../../../services/apiClient';
import type { LoginResponse } from './auth.types';
import type { LoginFormData } from '../schemas/login.schema';

export const authApi = {
  login: async (credentials: LoginFormData): Promise<LoginResponse> => {
    // Giả lập backend (Fake API)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'admin@gmail.com' && credentials.password === 'Admin@123') {
          resolve({
            accessToken: 'fake-jwt-token-12345',
            refreshToken: 'fake-refresh-token',
            userInfo: {
              id: '1',
              email: 'admin@gmail.com',
              fullName: 'Quản Trị Viên',
              roles: ['ADMIN'],
            }
          });
        } else if (credentials.email === 'hr@gmail.com' && credentials.password === 'Hr@12345') {
          resolve({
            accessToken: 'fake-jwt-token-hr',
            refreshToken: 'fake-refresh-token',
            userInfo: {
              id: '2',
              email: 'hr@gmail.com',
              fullName: 'Trưởng Phòng Nhân Sự',
              roles: ['HR_MANAGER'],
            }
          });
        } else {
          reject({ response: { status: 401 } }); // Bắn lỗi sai mật khẩu
        }
      }, 800); // Giả lập độ trễ mạng
    });
  },
};
