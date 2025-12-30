import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/auth');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  return (
    <div className="user-profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1>My Profile</h1>
        </div>

        <div className="profile-content">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              {getInitials(user.name)}
            </div>
          </div>

          <div className="profile-info">
            <div className="info-group">
              <label>Full Name</label>
              <div className="info-value">{user.name}</div>
            </div>

            <div className="info-group">
              <label>Email Address</label>
              <div className="info-value">{user.email}</div>
            </div>

            <div className="info-group">
              <label>Contact Number</label>
              <div className="info-value">{user.contact}</div>
            </div>

            {user.role && (
              <div className="info-group">
                <label>Role</label>
                <div className="info-value">{user.role}</div>
              </div>
            )}

            {user._id && (
              <div className="info-group">
                <label>User ID</label>
                <div className="info-value" style={{ fontSize: '12px', color: '#7f8c8d' }}>
                  {user._id}
                </div>
              </div>
            )}
          </div>

          <div className="profile-actions">
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
