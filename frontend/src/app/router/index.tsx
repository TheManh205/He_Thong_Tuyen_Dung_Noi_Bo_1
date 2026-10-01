import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from '../../pages/auth/LoginPage';
import { ForgotPasswordPage } from '../../pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '../../pages/auth/ResetPasswordPage';
import { DashboardLayout } from '../../shared/components/layout/DashboardLayout';
import { ChangePasswordPage } from '../../pages/dashboard/ChangePasswordPage';
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
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800">Tổng Quan Hệ Thống</h1>
            <p className="text-gray-500 mt-2">Chào mừng bạn trở lại! Vui lòng chọn chức năng từ menu bên trái.</p>
          </div>
        )
      },
      {
        path: 'change-password',
        element: <ChangePasswordPage />,
      }
    ]
  },
]);
