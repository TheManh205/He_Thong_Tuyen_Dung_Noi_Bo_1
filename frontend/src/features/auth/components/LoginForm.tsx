import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { LoginFormData } from '../schemas/login.schema';
import { loginSchema } from '../schemas/login.schema';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '../store/auth.store';
import type { AuthState } from '../store/auth.store';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ShieldCheck, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const setCredentials = useAuthStore((state: AuthState) => state.setCredentials);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      const response = await authApi.login(data);
      setCredentials(response);
      navigate('/dashboard');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 400 || status === 401) {
          setError('Email hoặc mật khẩu không chính xác');
        } else if (status === 423) {
          setError('Tài khoản bị tạm khóa 15 phút do nhập sai quá 5 lần liên tiếp');
        } else {
          setError('Có lỗi xảy ra, vui lòng thử lại sau');
        }
      } else {
        setError('Có lỗi xảy ra, vui lòng thử lại sau');
      }
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 sm:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
      <div className="flex flex-col items-center mb-10">
        <div className="w-12 h-12 bg-[#0d7350]/10 rounded-2xl flex items-center justify-center mb-5">
          <ShieldCheck className="text-[#0d7350]" size={26} strokeWidth={2.5} />
        </div>
        <h2 className="text-[22px] font-extrabold text-gray-800 tracking-wide uppercase text-center">
          Hệ Thống Tuyển Dụng Nội Bộ
        </h2>
        <p className="text-[13px] font-bold text-gray-600 mt-2.5">Đăng nhập hệ thống</p>
        <p className="text-[11px] text-gray-400 mt-1 font-medium tracking-wide">dành cho cán bộ và nhân sự tuyển dụng</p>
      </div>
      
      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm text-center font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-[13px] font-semibold text-gray-700 mb-2">Email công ty</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              type="email"
              {...register('email')}
              className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-[#0d7350]/10 focus:border-[#0d7350] transition-all outline-none font-medium text-gray-700 placeholder-gray-400"
              placeholder="admin@gmail.com"
            />
          </div>
          {errors.email && <p className="mt-1.5 text-xs font-medium text-red-500 ml-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-gray-700 mb-2">Mật khẩu</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className="block w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-[#0d7350]/10 focus:border-[#0d7350] transition-all outline-none font-medium text-gray-700 placeholder-gray-400"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="mt-1.5 text-xs font-medium text-red-500 ml-1">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between pt-2 pb-4">
          <label className="flex items-center cursor-pointer group">
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <div className={`block w-9 h-5 rounded-full transition-colors duration-300 ${rememberMe ? 'bg-[#0d7350]' : 'bg-gray-200'}`}></div>
              <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${rememberMe ? 'transform translate-x-4' : ''}`}></div>
            </div>
            <span className="ml-2.5 text-[13px] font-semibold text-gray-500 group-hover:text-gray-800 transition-colors">Ghi nhớ phiên đăng nhập</span>
          </label>
          
          <Link to="/forgot-password" className="text-[13px] font-bold text-[#0d7350] hover:text-[#095239] transition-colors">
            Quên mật khẩu?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#0d7350] hover:bg-[#0a5c40] focus:outline-none focus:ring-4 focus:ring-[#0d7350]/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
        >
          {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
};
