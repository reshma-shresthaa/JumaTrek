import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => {
  // Check if user is authenticated
  // In a real app, you would verify the token with your backend
  return !!localStorage.getItem('adminToken');
};

const ProtectedRoute = () => {
  const isAuth = isAuthenticated();
  
  return isAuth ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
