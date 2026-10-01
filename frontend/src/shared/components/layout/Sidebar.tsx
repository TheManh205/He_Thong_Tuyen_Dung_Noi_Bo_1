import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../../features/auth/store/auth.store';
import { LayoutDashboard, Users, Briefcase, Calendar, Settings, ShieldCheck } from 'lucide-react';

const MENU_ITEMS = [
  { path: '/dashboard', label: 'Tổng quan', icon: LayoutDashboard, roles: ['ALL'] },
  { path: '/candidates', label: 'Ứng viên', icon: Users, roles: ['HR_MANAGER', 'INTERVIEWER', 'ADMIN'] },
  { path: '/jobs', label: 'Tin tuyển dụng', icon: Briefcase, roles: ['HR_MANAGER', 'ADMIN'] },
  { path: '/interviews', label: 'Phỏng vấn', icon: Calendar, roles: ['HR_MANAGER', 'INTERVIEWER', 'ADMIN'] },
  { path: '/settings', label: 'Cài đặt hệ thống', icon: Settings, roles: ['ADMIN'] },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  const userInfo = useAuthStore((state) => state.userInfo);
  const userRoles = userInfo?.roles || [];

  // Lọc menu theo RBAC
  const filteredMenu = MENU_ITEMS.filter((item) => {
    if (item.roles.includes('ALL')) return true;
    return item.roles.some((r) => userRoles.includes(r));
  });

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar Content */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#097353] text-white transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto flex flex-col shadow-2xl`}>
        <div className="h-16 flex items-center px-6 bg-black/10 border-b border-white/10">
          <ShieldCheck className="text-white mr-3" size={24} />
          <h1 className="text-lg font-bold tracking-wider uppercase">HR Portal</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {filteredMenu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-white text-[#097353] font-bold shadow-md' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white font-medium'
                }`}
              >
                <Icon size={20} className="mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-white/10 bg-black/10">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
              {userInfo?.fullName?.charAt(0) || 'U'}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-semibold truncate">{userInfo?.fullName || 'Người dùng'}</p>
              <p className="text-xs text-white/60 truncate">{userRoles.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
