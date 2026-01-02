import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authService } from '../../services/api';
import './AuthForm.css';

const AuthForm = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const { name, email, contactNo, password, confirmPassword } = formData;

  const validateForm = () => {
    if (!email || !password) {
      setError('Email and password are required');
      return false;
    }

    if (!isLogin) {
      if (!name) {
        setError('Name is required');
        return false;
      }
      if (!contactNo) {
        setError('Contact number is required');
        return false;
      }
      if (!/^[0-9]{10}$/.test(contactNo)) {
        setError('Please enter a valid 10-digit contact number');
        return false;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
    }
    
    return true;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      let response;
      if (isLogin) {
        response = await authService.login(email, password);
        toast.success('Login successful! Welcome back!');
      } else {
        response = await authService.signup({ name, email, contactNo, password });
        toast.success('Account created successfully! Welcome to Juma Trek!');
      }
      
      if (onAuthSuccess) {
        onAuthSuccess();
      }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const switchAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
    // Clear any existing toasts when switching modes
    toast.dismiss();
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="auth-tabs">
          <button 
            type="button"
            className={`tab ${isLogin ? 'active' : ''}`}
            onClick={() => !isLogin && switchAuthMode()}
            disabled={isLoading}
          >
            Login
          </button>
          <button 
            type="button"
            className={`tab ${!isLogin ? 'active' : ''}`}
            onClick={() => isLogin && switchAuthMode()}
            disabled={isLoading}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                required={!isLogin}
                placeholder="Enter your full name"
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label>Contact</label>
              <input
                type="tel"
                name="contactNo"
                value={contactNo}
                onChange={handleChange}
                required={!isLogin}
                placeholder="Enter your mobile number"
                pattern="[0-9]{10}"
                maxLength="10"
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              minLength="6"
              placeholder="Enter your password"
            />
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required={!isLogin}
                placeholder="Confirm your password"
              />
            </div>
          )}
          
          {error && <div className="error-message">{error}</div>}
          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                {isLogin ? 'Logging in...' : 'Creating account...'}
              </>
            ) : isLogin ? (
              'Login'
            ) : (
              'Create Account'
            )}
          </button>
          
          <div className="auth-footer">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <button 
                  type="button" 
                  onClick={switchAuthMode} 
                  className="link-button"
                  disabled={isLoading}
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button 
                  type="button" 
                  onClick={switchAuthMode} 
                  className="link-button"
                  disabled={isLoading}
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;