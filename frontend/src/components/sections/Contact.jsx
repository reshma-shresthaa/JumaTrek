import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    preferred_date: '',
    trek_duration: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitContactForm = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We\'ll respond within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      preferred_date: '',
      trek_duration: '',
      message: ''
    });
  };

  const openMap = () => {
    window.open('https://maps.google.com?q=Thamel,Kathmandu,Nepal', '_blank');
  };

  return (
    <section id="contact" className="section">
      <div className="section-header">
        <h2 className="section-title">Plan Your Adventure</h2>
        <p className="section-subtitle">Ready to explore Nepal\'s mountains? Let\'s create your perfect trek experience</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
        <div className="contact-form">
          <h3 style={{ marginBottom: '24px', fontSize: '24px' }}>Get in Touch</h3>
          <form onSubmit={submitContactForm}>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <select 
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select a topic</option>
                <option value="Trek Inquiry">Trek Inquiry</option>
                <option value="Custom Itinerary">Custom Itinerary</option>
                <option value="Group Booking">Group Booking</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="preferred_date">Preferred Trekking Date</label>
              <input 
                type="date" 
                id="preferred_date" 
                name="preferred_date" 
                value={formData.preferred_date}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="trek_duration">Preferred Duration (days)</label>
              <select 
                id="trek_duration" 
                name="trek_duration" 
                value={formData.trek_duration}
                onChange={handleChange}
              >
                <option value="">Select duration</option>
                <option value="1-3">1-3 days</option>
                <option value="4-8">4-8 days</option>
                <option value="9-15">9-15 days</option>
                <option value="16+">16+ days</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message *</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your trekking plans, group size, and any special requests..." 
                required
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <button type="submit" className="btn" style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
                <i className="fas fa-paper-plane"></i> Send Message
              </button>
              <p className="muted" style={{ marginTop: '12px', fontSize: '14px' }}>
                We'll respond within 24 hours. For urgent inquiries, please call us at +977-1-4423456
              </p>
            </div>
          </form>
        </div>
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--secondary)', boxShadow: '0 10px 40px var(--shadow)' }}>
            <h4 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-map-marker-alt" style={{ color: 'var(--brand)' }}></i>
              Our Office
            </h4>
            <div style={{ color: 'var(--muted)', marginBottom: '16px' }}>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-dark)' }}>Kathmandu Office</p>
              <p style={{ margin: '4px 0 0 0' }}>Thamel, Kathmandu 44600<br />Nepal</p>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ margin: '0 0 8px 0' }}><i className="fas fa-envelope" style={{ color: 'var(--brand)', marginRight: '8px' }}></i> hello@jumatrek.com</p>
              <p style={{ margin: '0 0 8px 0' }}><i className="fas fa-phone" style={{ color: 'var(--brand)', marginRight: '8px' }}></i> +977 01 5555 123</p>
              <p style={{ margin: 0 }}><i className="fas fa-clock" style={{ color: 'var(--brand)', marginRight: '8px' }}></i> 9 AM - 6 PM (Nepal Time)</p>
            </div>
            <button className="btn" onClick={openMap} style={{ width: '100%', background: 'var(--accent)' }}>
              <i className="fas fa-directions"></i> Get Directions
            </button>
          </div>
          
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--secondary)', boxShadow: '0 10px 40px var(--shadow)' }}>
            <h4 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-shield-alt" style={{ color: 'var(--brand)' }}></i>
              Safety & Support
            </h4>
            <p className="muted" style={{ fontSize: '14px', marginBottom: '16px' }}>All treks follow updated safety protocols and are covered by comprehensive insurance.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <i className="fas fa-check-circle" style={{ color: 'var(--brand)' }}></i>
                24/7 Emergency Support
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <i className="fas fa-check-circle" style={{ color: 'var(--brand)' }}></i>
                Satellite Communication
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <i className="fas fa-check-circle" style={{ color: 'var(--brand)' }}></i>
                Medical Insurance Included
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <i className="fas fa-check-circle" style={{ color: 'var(--brand)' }}></i>
                Helicopter Evacuation Coverage
              </div>
            </div>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--secondary)', boxShadow: '0 10px 40px var(--shadow)' }}>
            <h4 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-users" style={{ color: 'var(--brand)' }}></i>
              Why Choose Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '4px' }}>Expert Local Guides</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Born and raised in the mountains</div>
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '4px' }}>Small Groups Only</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Maximum 12 people per trek</div>
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '4px' }}>Responsible Tourism</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Supporting local communities</div>
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '4px' }}>Flexible Bookings</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Free changes up to 30 days</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Contact;