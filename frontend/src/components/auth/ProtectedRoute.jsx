import { Navigate, Outlet } from 'react-router-dom';
import { adminService } from '../../services/adminApi';

const ProtectedRoute = () => {
  const isAuth = adminService.isAuthenticated();
  
  return isAuth ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
