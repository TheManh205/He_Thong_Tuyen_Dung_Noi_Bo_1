import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { LoginFormData } from '../schemas/login.schema';
import { loginSchema } from '../schemas/login.schema';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '../store/auth.store';
import axios from 'axios';
import { Lock, Mail, AlertTriangle } from 'lucide-react';

export const SessionExpiredModal = () => {
  const isSessionExpired = useAuthStore((state) => state.isSessionExpired);
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  if (!isSessionExpired) return null;

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      const response = await authApi.login(data);
      setCredentials(response); // Điều này sẽ tự động đặt isSessionExpired = false thông qua store
      reset();
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && (err.response?.status === 400 || err.response?.status === 401)) {
        setError('Mật khẩu không chính xác. Vui lòng thử lại.');
      } else {
        setError('Có lỗi xảy ra, không thể khôi phục phiên đăng nhập.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Phiên Đăng Nhập Hết Hạn</h2>
          <p className="text-sm text-gray-500 mt-2">
            Vì lý do bảo mật, vui lòng đăng nhập lại để tiếp tục công việc của bạn. Dữ liệu đang nhập dở sẽ không bị mất.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                type="email"
                {...register('email')}
                className="block w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                placeholder="Email của bạn"
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                type="password"
                {...register('password')}
                className="block w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                placeholder="Nhập lại mật khẩu"
              />
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-500/20 disabled:opacity-70 transition-colors"
          >
            {isSubmitting ? 'Đang xác thực...' : 'Khôi Phục Phiên Đăng Nhập'}
          </button>
        </form>
      </div>
    </div>
  );
};
