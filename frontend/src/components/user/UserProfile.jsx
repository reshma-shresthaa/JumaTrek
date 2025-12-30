import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, User as UserIcon } from 'lucide-react';
import { authService } from '../../services/api';

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
    window.location.reload(); // Refresh to update the UI
  };

  const handleProfile = () => {
    navigate('/profile');
    setIsOpen(false);
  };

  if (!user) return null;

  // Get first name or use first part of email if name is not available
  const displayName = user.name ? user.name.split(' ')[0] : user.email.split('@')[0];

  return (
    <div className="user-profile" ref={dropdownRef}>
      <button 
        className="user-profile-button" 
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="user-avatar">
          {user.name ? user.name.charAt(0).toUpperCase() : <UserIcon size={18} />}
        </div>
        <span className="user-name">{displayName}</span>
        <svg 
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`} 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={handleProfile}>
            <User size={16} />
            <span>Profile</span>
          </button>
          <button className="dropdown-item" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}

      <style jsx>{`
        .user-profile {
          position: relative;
          margin-left: 1rem;
        }

        .user-profile-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          padding: 0.375rem 0.75rem 0.375rem 0.375rem;
          cursor: pointer;
          transition: all 0.2s ease;
          background-color: #f8fafc;
        }

        .user-profile-button:hover {
          background-color: #f1f5f9;
          border-color: #cbd5e1;
        }

        .user-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #4a6fa5;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        .user-name {
          font-weight: 500;
          color: #334155;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 120px;
        }

        .dropdown-arrow {
          transition: transform 0.2s ease;
          opacity: 0.7;
        }

        .dropdown-arrow.open {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          right: 0;
          top: calc(100% + 0.5rem);
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          min-width: 180px;
          z-index: 50;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          animation: fadeIn 0.15s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.625rem 1rem;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
          color: #334155;
          transition: all 0.15s ease;
        }

        .dropdown-item:hover {
          background-color: #f8fafc;
          color: #1e40af;
        }

        .dropdown-item svg {
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .user-profile {
            margin: 0.5rem 0;
            width: 100%;
          }
          
          .user-profile-button {
            width: 100%;
            justify-content: space-between;
          }
          
          .dropdown-menu {
            position: static;
            width: 100%;
            margin-top: 0.5rem;
            box-shadow: none;
            border: 1px solid #e2e8f0;
          }
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
