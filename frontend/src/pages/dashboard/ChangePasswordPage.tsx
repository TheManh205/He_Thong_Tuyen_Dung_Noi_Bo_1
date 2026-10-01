import { ChangePasswordForm } from '../../features/auth/components/ChangePasswordForm';

export const ChangePasswordPage = () => {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-6">
      <div className="w-full mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Cài Đặt Bảo Mật</h1>
        <p className="text-sm text-gray-500 mt-1">Quản lý mật khẩu và các tùy chọn bảo mật tài khoản</p>
      </div>
      
      <ChangePasswordForm />
    </div>
  );
};
