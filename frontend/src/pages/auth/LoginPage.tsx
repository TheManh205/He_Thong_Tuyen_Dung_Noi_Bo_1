import { LoginForm } from '../../features/auth/components/LoginForm';
import heroImg from '../../assets/hero.png';

export const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-[#0d7350] text-white p-12">
        {/* Illustration */}
        <div className="w-full max-w-[420px] mb-8">
           <img 
             src={heroImg} 
             alt="Hệ Thống Tuyển Dụng" 
             className="w-full h-auto object-contain rounded-2xl shadow-2xl" 
           />
        </div>
        <h1 className="text-3xl font-extrabold tracking-widest uppercase text-center mt-2 drop-shadow-md">
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
