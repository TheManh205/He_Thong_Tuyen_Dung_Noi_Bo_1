import { LoginForm } from '../../features/auth/components/LoginForm';
import heroImg from '../../assets/hero.png';

export const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-[#097353] text-white p-12">
        {/* Illustration */}
        <div className="w-full max-w-lg mb-4 flex justify-center">
           <img 
             src={heroImg} 
             alt="Hệ Thống Tuyển Dụng" 
             className="w-full h-auto object-cover rounded-2xl shadow-xl" 
           />
        </div>
        <h1 className="text-[34px] font-black uppercase text-center mt-6 text-white tracking-normal">
          Phát Triển Nội Bộ
        </h1>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gray-50/50 lg:bg-white">
        <LoginForm />
      </div>
    </div>
  );
};
