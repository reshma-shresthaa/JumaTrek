import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';

const AuthPage = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    // Redirect to home or previous page after successful authentication
    navigate('/');
  };

  return (
    <div className="auth-page">
      <AuthForm onAuthSuccess={handleAuthSuccess} />
    </div>
  );
};

export default AuthPage;
