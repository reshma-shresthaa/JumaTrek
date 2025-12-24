import React, { useState } from 'react';
import { testimonialData } from '../../data/testimonialData';

const Testimonials = () => {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);

  const openTestimonialForm = () => {
    setShowModal(true);
  };

  const closeTestimonialModal = () => {
    setShowModal(false);
    setRating(0);
  };

  const submitTestimonial = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const testimonial = Object.fromEntries(formData.entries());
    testimonial.rating = rating;
    console.log('Testimonial submitted:', testimonial);
    alert('Thank you for sharing your experience!');
    closeTestimonialModal();
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <section className="testimonials section">
      <div className="section-header">
        <h2 className="section-title">What Our Trekkers Say</h2>
        <p className="section-subtitle">Real experiences from adventurers who've walked Nepal's mountains with us</p>
      </div>
      
      <div className="testimonials-grid">
        {testimonialData.map(testimonial => (
          <div className="testimonial" key={testimonial.id}>
            <div className="testimonial-text">
              {testimonial.text}
            </div>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{testimonial.initials}</div>
              <div className="testimonial-info">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.country} • {testimonial.trek} {testimonial.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn" onClick={openTestimonialForm} style={{ padding: '16px 32px' }}>
          <i className="fas fa-plus-circle"></i> Add Your Experience
        </button>
      </div>

      {/* Testimonial Form Modal */}
      {showModal && (
        <div id="testimonialModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Share Your Experience</h2>
              <button className="modal-close" onClick={closeTestimonialModal}>&times;</button>
            </div>
            <div className="modal-body">
              <form id="testimonialForm" onSubmit={submitTestimonial}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input type="text" name="name" required />
                  </div>
                  <div className="form-group">
                    <label>Your Country *</label>
                    <input type="text" name="country" required />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Trek Completed *</label>
                    <select name="trek" required>
                      <option value="">Select a trek</option>
                      <option value="Everest Base Camp">Everest Base Camp</option>
                      <option value="Annapurna Circuit">Annapurna Circuit</option>
                      <option value="Langtang Valley">Langtang Valley</option>
                      <option value="Manaslu Circuit">Manaslu Circuit</option>
                      <option value="Upper Mustang">Upper Mustang</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Year Completed *</label>
                    <select name="year" required>
                      <option value="">Select year</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Your Testimonial *</label>
                  <textarea 
                    name="testimonial" 
                    rows="6" 
                    required 
                    placeholder="Tell us about your experience... What made it special? How was the guide? What surprised you?"
                  />
                </div>
                
                <div className="form-group">
                  <label>Rating</label>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span 
                        key={star}
                        className={`star ${star <= rating ? 'active' : ''}`}
                        onClick={() => handleStarClick(star)}
                      >
                        ☆
                      </span>
                    ))}
                  </div>
                  <input type="hidden" name="rating" value={rating} />
                </div>
                
                <div className="form-group">
                  <label>
                    <input type="checkbox" name="consent" required />
                    I consent to have my testimonial displayed on the Juma Trek website
                  </label>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={closeTestimonialModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn">
                    <i className="fas fa-paper-plane"></i> Submit Testimonial
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;