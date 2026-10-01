import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store/auth.store';
import type { AuthState } from '../../features/auth/store/auth.store';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state: AuthState) => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
