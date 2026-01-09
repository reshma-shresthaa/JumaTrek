import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, adminService } from '../services/api';
import BookingDetailModal from '../components/BookingDetailModal';
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/auth');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  // Separate effect to fetch bookings when user is set
  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  const fetchUserBookings = async () => {
    try {
      setLoading(true);
      console.log('Fetching all bookings from admin...');
      console.log('Current user:', user);
      const response = await adminService.getAllBookings();
      console.log('Admin bookings response:', response);
      
      if (response.success && response.data) {
        // Filter bookings for the current user
        const userBookings = response.data.filter(booking => {
          console.log('Checking booking:', booking);
          console.log('Booking user ID:', booking.user?._id);
          console.log('Current user ID:', user._id);
          console.log('Booking email:', booking.email);
          console.log('Current user email:', user.email);
          
          // Convert both IDs to strings for comparison
          if (booking.user && booking.user._id) {
            const bookingUserId = String(booking.user._id);
            const currentUserId = String(user._id);
            console.log('Comparing IDs - booking:', bookingUserId, 'current:', currentUserId);
            if (bookingUserId === currentUserId) {
              console.log('✓ Match by ID');
              return true;
            }
          }
          
          // Fallback to email comparison
          if (booking.email && user.email && booking.email.toLowerCase() === user.email.toLowerCase()) {
            console.log('✓ Match by email');
            return true;
          }
          
          console.log('✗ No match');
          return false;
        });
        
        console.log('Filtered user bookings:', userBookings);
        console.log('Total bookings found:', userBookings.length);
        setBookings(userBookings || []);
      } else {
        console.warn('API response not successful:', response);
        setBookings([]);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const memberSinceDate = user.createdAt ? formatDate(user.createdAt) : 'N/A';

  return (
    <div className="user-profile-container">
      {/* User Profile Header */}
      <div className="profile-header-card">
        <div className="profile-user-info">
          <div className="profile-avatar">
            {getInitials(user.name)}
          </div>
          <div className="profile-user-details">
            <h2>{user.name}</h2>
            <p className="member-since">Member since {memberSinceDate}</p>
          </div>
        </div>

        <div className="profile-divider"></div>

        <div className="profile-contact-info">
          <div className="contact-item">
            <label>EMAIL</label>
            <p>{user.email}</p>
          </div>
          <div className="contact-item">
            <label>PHONE</label>
            <p>{user.contact || 'Not provided'}</p>
          </div>
          <div className="contact-item">
            <label>LOCATION</label>
            <p>{user.location || 'Not provided'}</p>
          </div>
        </div>
      </div>

      {/* My Bookings Section */}
      <div className="bookings-section">
        <h3>My Bookings</h3>
        {loading ? (
          <div className="loading-message">Loading bookings...</div>
        ) : bookings.length > 0 ? (
          <div className="bookings-grid">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <h4>{booking.trek?.title || booking.trekName}</h4>
                <p className="booking-dates">
                  Date: {formatDate(booking.preferredDate)}
                </p>
                <button 
                  className="btn-view-details"
                  onClick={() => handleViewDetails(booking)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-bookings">No bookings yet</p>
        )}
      </div>

      {/* Booking Detail Modal */}
      {showModal && selectedBooking && (
        <BookingDetailModal 
          booking={selectedBooking} 
          onClose={handleCloseModal}
          formatDate={formatDate}
        />
      )}
    </div>
  );
};

export default UserProfile;
