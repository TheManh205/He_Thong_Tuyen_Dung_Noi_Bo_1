import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from '../../pages/auth/LoginPage';
import { useAuthStore } from '../../features/auth/store/auth.store';
import { ProtectedRoute } from '../providers/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <div className="p-8">
          <h1 className="text-2xl font-bold">Dashboard (Placeholder)</h1>
          <button 
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => useAuthStore.getState().logout()}
          >
            Đăng xuất
          </button>
        </div>
      </ProtectedRoute>
    ),
  },
]);
