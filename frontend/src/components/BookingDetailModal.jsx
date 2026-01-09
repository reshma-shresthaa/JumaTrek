import React from 'react';
import './BookingDetailModal.css';

const BookingDetailModal = ({ booking, onClose, formatDate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
      case 'completed':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Booking Details</h2>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          {/* Trek Information */}
          <div className="detail-section">
            <h3>Trek Information</h3>
            <div className="detail-item">
              <span className="detail-label">Trek Name</span>
              <span className="detail-value">{booking.trek?.title || booking.trekName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status</span>
              <span className={`status-badge ${getStatusColor(booking.status)}`}>
                {booking.status}
              </span>
            </div>
          </div>

          {/* Guest Information */}
          <div className="detail-section">
            <h3>Guest Information</h3>
            <div className="detail-item">
              <span className="detail-label">Name</span>
              <span className="detail-value">{booking.name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email</span>
              <span className="detail-value">{booking.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Phone</span>
              <span className="detail-value">{booking.phone}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Country</span>
              <span className="detail-value">{booking.country}</span>
            </div>
          </div>

          {/* Booking Details */}
          <div className="detail-section">
            <h3>Booking Details</h3>
            <div className="detail-item">
              <span className="detail-label">Date</span>
              <span className="detail-value">{formatDate(booking.preferredDate)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Group Size</span>
              <span className="detail-value">{booking.groupSize} {booking.groupSize === 1 ? 'person' : 'people'}</span>
            </div>
            {booking.paymentMethod && (
              <div className="detail-item">
                <span className="detail-label">Payment Method</span>
                <span className="detail-value">
                  {booking.paymentMethod.charAt(0).toUpperCase() + booking.paymentMethod.slice(1).replace('-', ' ')}
                </span>
              </div>
            )}
            {booking.totalPrice && (
              <div className="detail-item">
                <span className="detail-label">Total Price</span>
                <span className="detail-value price">${booking.totalPrice.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Special Message */}
          {booking.message && (
            <div className="detail-section">
              <h3>Message</h3>
              <p className="message-text">{booking.message}</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="modal-btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailModal;
