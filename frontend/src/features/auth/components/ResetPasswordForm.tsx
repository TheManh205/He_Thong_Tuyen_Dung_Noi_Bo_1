import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ResetPasswordFormData } from '../schemas/password.schema';
import { resetPasswordSchema } from '../schemas/password.schema';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PasswordStrengthBar } from './PasswordStrengthBar';

export const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange', // Trigger validation as user types to show progress bar
  });

  const passwordValue = watch('password', '');

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      // Giả lập API đổi mật khẩu
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Password reset successfully for:', data);
      
      toast.success('Cập nhật mật khẩu thành công! Hãy đăng nhập lại.');
      navigate('/login');
    } catch {
      toast.error('Có lỗi xảy ra, token có thể đã hết hạn.');
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 sm:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
      <div className="flex flex-col items-center mb-10">
        <div className="w-12 h-12 bg-[#097353]/10 rounded-2xl flex items-center justify-center mb-5">
          <CheckCircle2 className="text-[#097353]" size={26} strokeWidth={2.5} />
        </div>
        <h2 className="text-[22px] font-extrabold text-gray-800 tracking-wide uppercase text-center">
          Tạo Mật Khẩu Mới
        </h2>
        <p className="text-[13px] text-gray-500 mt-2 text-center">
          Vui lòng nhập mật khẩu mới của bạn bên dưới.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-[13px] font-semibold text-gray-700 mb-2">Mật khẩu mới</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className="block w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-[#097353]/10 focus:border-[#097353] transition-all outline-none font-medium text-gray-700"
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
          <PasswordStrengthBar password={passwordValue} />
          {errors.password && <p className="mt-1.5 text-xs font-medium text-red-500 ml-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-gray-700 mb-2">Xác nhận mật khẩu</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              className="block w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-[#097353]/10 focus:border-[#097353] transition-all outline-none font-medium text-gray-700"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="mt-1.5 text-xs font-medium text-red-500 ml-1">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#097353] hover:bg-[#075c42] focus:outline-none focus:ring-4 focus:ring-[#097353]/20 disabled:opacity-70 transition-all active:scale-[0.98] mt-4"
        >
          {isSubmitting ? 'Đang cập nhật...' : 'Cập Nhật Mật Khẩu'}
        </button>
      </form>
    </div>
  );
};
