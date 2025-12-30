import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authService } from '../../services/api';
import './UserDropdown.css';

const UserDropdown = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    navigate('/profile');
  };

  const handleLogout = async () => {
    try {
      // Call backend logout endpoint
      authService.logout();
      
      // Call the parent logout callback to update state
      if (onLogout) {
        onLogout();
      }
      
      toast.success('Logged out successfully!');
      navigate('/');
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out. Please try again.');
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  return (
    <div className="user-dropdown-container" ref={dropdownRef}>
      <button 
        className="user-button"
        onClick={toggleDropdown}
        title={`Logged in as ${user?.name || 'User'}`}
      >
        <div className="user-avatar">
          {getInitials(user?.name || 'User')}
        </div>
        <span className="user-name">{user?.name || 'User'}</span>
        <i className={`fas fa-chevron-down ${isDropdownOpen ? 'rotate' : ''}`}></i>
      </button>

      {isDropdownOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <div className="dropdown-user-info">
              <div className="dropdown-avatar">
                {getInitials(user?.name || 'User')}
              </div>
              <div className="dropdown-user-details">
                <div className="dropdown-user-name">{user?.name}</div>
                <div className="dropdown-user-email">{user?.email}</div>
              </div>
            </div>
          </div>

          <div className="dropdown-divider"></div>

          <button 
            className="dropdown-item"
            onClick={handleProfileClick}
          >
            <i className="fas fa-user"></i>
            <span>My Profile</span>
          </button>

          <button 
            className="dropdown-item logout-item"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
