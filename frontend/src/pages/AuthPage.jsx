import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../services/api';
import AuthForm from '../components/auth/AuthForm';

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';

  // Check if user is already logged in
  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const handleAuthSuccess = () => {
    // Force a state update by dispatching the authStateChange event
    window.dispatchEvent(new Event('authStateChange'));
    // Small delay to ensure state updates propagate
    setTimeout(() => {
      navigate(redirectPath, { replace: true });
    }, 100);
  };

  return (
    <div className="auth-page">
      <AuthForm onAuthSuccess={handleAuthSuccess} />
    </div>
  );
};

export default AuthPage;
