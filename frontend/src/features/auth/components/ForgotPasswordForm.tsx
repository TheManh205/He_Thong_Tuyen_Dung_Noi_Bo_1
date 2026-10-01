import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ForgotPasswordFormData } from '../schemas/password.schema';
import { forgotPasswordSchema } from '../schemas/password.schema';
import { Mail, KeyRound, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // Giả lập API gọi lấy lại mật khẩu
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Reset link sent to:', data.email);
      
      toast.success('Đường dẫn khôi phục đã được gửi vào email của bạn!', { duration: 5000 });
      reset();
    } catch {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 sm:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
      <div className="flex flex-col items-center mb-10">
        <div className="w-12 h-12 bg-[#097353]/10 rounded-2xl flex items-center justify-center mb-5">
          <KeyRound className="text-[#097353]" size={26} strokeWidth={2.5} />
        </div>
        <h2 className="text-[22px] font-extrabold text-gray-800 tracking-wide uppercase text-center">
          Quên Mật Khẩu
        </h2>
        <p className="text-[13px] text-gray-500 mt-3 text-center leading-relaxed">
          Nhập email công ty của bạn. Chúng tôi sẽ gửi một đường dẫn an toàn để bạn tạo lại mật khẩu mới.
        </p>
      </div>

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
              className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-[#097353]/10 focus:border-[#097353] transition-all outline-none font-medium text-gray-700 placeholder-gray-400"
              placeholder="admin@gmail.com"
            />
          </div>
          {errors.email && <p className="mt-1.5 text-xs font-medium text-red-500 ml-1">{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#097353] hover:bg-[#075c42] focus:outline-none focus:ring-4 focus:ring-[#097353]/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98] mt-4"
        >
          {isSubmitting ? 'Đang gửi...' : 'Gửi Yêu Cầu Khôi Phục'}
        </button>

        <div className="pt-4 text-center">
          <Link to="/login" className="inline-flex items-center text-[13px] font-bold text-gray-500 hover:text-[#097353] transition-colors">
            <ArrowLeft size={14} className="mr-1.5" />
            Quay lại Đăng nhập
          </Link>
        </div>
      </form>
    </div>
  );
};
