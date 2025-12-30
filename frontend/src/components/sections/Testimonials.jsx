import React, { useState } from 'react';
import { testimonialData } from '../../data/testimonialData';
import './Testimonials.css';

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
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Our Trekkers Say</h2>
          <p className="section-subtitle">Real experiences from adventurers who've walked Nepal's mountains with us</p>
        </div>
        
        <div className="testimonials-grid">
          {testimonialData.map(testimonial => (
            <div className="testimonial-card" key={testimonial.id}>
              <div className="testimonial-stars">
                {Array.from({length: 5}).map((_, i) => (
                  <i key={i} className={`fas fa-star ${i < (testimonial.rating || 5) ? 'filled' : ''}`}></i>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {testimonial.image ? (
                    <img src={testimonial.image} alt={testimonial.name} />
                  ) : (
                    testimonial.initials
                  )}
                </div>
                <div className="testimonial-info">
                  <strong className="author-name">{testimonial.name}</strong>
                  <p className="author-details">{testimonial.country} • {testimonial.trek}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials-cta">
          <button className="btn btn--primary btn--lg" onClick={openTestimonialForm}>
            <i className="fas fa-comment"></i> Share Your Experience
          </button>
        </div>
      </div>

      {/* Testimonial Form Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeTestimonialModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Share Your Trek Experience</h2>
              <button className="modal-close" onClick={closeTestimonialModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <form id="testimonialForm" onSubmit={submitTestimonial}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input type="text" name="name" placeholder="Enter your name" required />
                  </div>
                  <div className="form-group">
                    <label>Your Country *</label>
                    <input type="text" name="country" placeholder="Where are you from?" required />
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
                    rows="5" 
                    required 
                    placeholder="Tell us about your experience... What made it special?"
                  />
                </div>
                
                <div className="form-group">
                  <label>Rating *</label>
                  <div className="rating-input">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button 
                        key={star}
                        type="button"
                        className={`star-btn ${star <= rating ? 'active' : ''}`}
                        onClick={() => handleStarClick(star)}
                      >
                        <i className="fas fa-star"></i>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="form-group checkbox">
                  <label>
                    <input type="checkbox" name="consent" required />
                    <span>I consent to have my testimonial displayed on JumaTrek</span>
                  </label>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn btn--outline" onClick={closeTestimonialModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn--primary">
                    <i className="fas fa-check"></i> Submit Testimonial
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