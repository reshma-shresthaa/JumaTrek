import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingService, authService } from '../services/api';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const queryParams = new URLSearchParams(location.search);
  const trekName = queryParams.get('trek') || '';

  const [formData, setFormData] = useState({
    trek: trekName,
    name: '',
    email: '',
    phone: '',
    country: '',
    groupSize: '1',
    preferredDate: '',
    message: '',
    paymentMethod: 'bank-transfer',
    agreeTerms: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      alert("You need to be logged in to book a trek.");
      navigate('/login');
      return;
    }


    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.contact || prev.phone
      }));
    }

    if (trekName) {
      setFormData(prev => ({ ...prev, trek: trekName }));
    }
  }, [trekName, navigate, user, isAuthenticated, authLoading]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await bookingService.createBooking(formData);
      alert('Thank you for your booking request! You will receive a confirmation email shortly. Please review your details and contact if any updates are required.');
      navigate('/');

    } catch (err) {
      console.error("Booking error:", err);
      setError(err.toString());
      alert(`Booking failed: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <div className="section-header">
        <h1 className="section-title">Book Your Trek</h1>
        <p className="section-subtitle">Fill out this form to secure your spot on an unforgettable Himalayan adventure</p>
      </div>

      <div className="booking-container">
        <div className="booking-form">
          {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3><i className="fas fa-user"></i> Personal Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3><i className="fas fa-mountain"></i> Trek Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Selected Trek *</label>
                  <select
                    name="trek"
                    value={formData.trek}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a trek</option>
                    <option value="Everest Base Camp">Everest Base Camp Trek</option>
                    <option value="Annapurna Circuit">Annapurna Circuit</option>
                    <option value="Langtang Valley">Langtang Valley Trek</option>
                    <option value="Manaslu Circuit">Manaslu Circuit</option>
                    <option value="Upper Mustang">Upper Mustang Trek</option>
                    <option value="Custom">Custom Trek (Contact us)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Group Size *</label>
                  <select
                    name="groupSize"
                    value={formData.groupSize}
                    onChange={handleChange}
                    required
                  >
                    <option value="1">1 Person (Solo)</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5+">5+ People</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Preferred Start Date *</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}

                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h3><i className="fas fa-comment"></i> Additional Information</h3>
              <div className="form-group">
                <label>Special Requests or Questions</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about any dietary restrictions, medical conditions, or special requests..."
                />
              </div>
            </div>

            <div className="form-section">
              <h3><i className="fas fa-credit-card"></i> Payment Method</h3>
              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank-transfer"
                    checked={formData.paymentMethod === 'bank-transfer'}
                    onChange={handleChange}
                  />
                  <div className="payment-details">
                    <strong>Bank Transfer</strong>
                    <span>Secure international bank transfer</span>
                  </div>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit-card"
                    checked={formData.paymentMethod === 'credit-card'}
                    onChange={handleChange}
                  />
                  <div className="payment-details">
                    <strong>Credit Card</strong>
                    <span>Pay online with secure payment gateway</span>
                  </div>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleChange}
                  />
                  <div className="payment-details">
                    <strong>PayPal</strong>
                    <span>Secure payment through PayPal</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="form-section">
              <div className="terms-agreement">
                <label>
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                  />
                  I agree to the <a href="#terms">Terms & Conditions</a> and <a href="#privacy">Privacy Policy</a> *
                </label>
                <p className="muted" style={{ fontSize: '14px', marginTop: '8px' }}>
                  A 30% deposit is required to confirm your booking. Full payment is due 60 days before departure.
                </p>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn" style={{ padding: '16px 32px', fontSize: '18px' }}>
                <i className="fas fa-paper-plane"></i> Submit Booking Request
              </button>
              <p className="muted" style={{ marginTop: '16px' }}>
                We'll send you a confirmation email with payment instructions within 24 hours.
              </p>
            </div>
          </form>
        </div>

        <div className="booking-sidebar">
          <div className="sidebar-card">
            <h4><i className="fas fa-info-circle"></i> Booking Information</h4>
            <ul className="info-list">
              <li><i className="fas fa-check"></i> Free cancellation up to 60 days before</li>
              <li><i className="fas fa-check"></i> 30% deposit to confirm booking</li>
              <li><i className="fas fa-check"></i> Group discounts available</li>
              <li><i className="fas fa-check"></i> All meals and accommodation included</li>
              <li><i className="fas fa-check"></i> Experienced guide and porters</li>
              <li><i className="fas fa-check"></i> Comprehensive insurance included</li>
            </ul>
          </div>

          <div className="sidebar-card">
            <h4><i className="fas fa-headset"></i> Need Help?</h4>
            <div className="contact-info">
              <p><i className="fas fa-phone"></i> +977 01 5555 123</p>
              <p><i className="fas fa-envelope"></i> booking@jumatrek.com</p>
              <p><i className="fas fa-clock"></i> 24/7 Support Available</p>
            </div>
            <button className="btn" style={{ width: '100%', marginTop: '16px', background: 'var(--accent)' }}>
              <i className="fas fa-whatsapp"></i> Chat on WhatsApp
            </button>
          </div>

          <div className="sidebar-card">
            <h4><i className="fas fa-file-pdf"></i> Important Documents</h4>
            <div className="document-links">
              <a href="#" className="document-link">
                <i className="fas fa-download"></i> Trekking Checklist
              </a>
              <a href="#" className="document-link">
                <i className="fas fa-download"></i> Terms & Conditions
              </a>
              <a href="#" className="document-link">
                <i className="fas fa-download"></i> Insurance Information
              </a>
              <a href="#" className="document-link">
                <i className="fas fa-download"></i> Visa Requirements
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;