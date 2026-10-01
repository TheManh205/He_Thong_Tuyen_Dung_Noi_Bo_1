import { apiClient } from '../../../services/apiClient';
import type { LoginResponse } from './auth.types';
import type { LoginFormData } from '../schemas/login.schema';

export const authApi = {
  login: async (credentials: LoginFormData): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },
};
