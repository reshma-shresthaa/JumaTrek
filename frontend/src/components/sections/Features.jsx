import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    {
      id: 1,
      icon: 'fas fa-users',
      title: 'Local Guides & Specialists',
      description: 'Our network of experienced local guides share their deep knowledge, culture, and authentic connections to make your trek unforgettable.',
      color: '#4a90e2'
    },
    {
      id: 2,
      icon: 'fas fa-heart',
      title: 'Authentic Experiences',
      description: 'Skip the tourist crowds and discover hidden gems. We connect you with real local communities and cultural experiences you won\'t find elsewhere.',
      color: '#e74c3c'
    },
    {
      id: 3,
      icon: 'fas fa-lock',
      title: 'Secure Booking & Payments',
      description: 'Book with confidence. Our secure payment platform protects your information and ensures transparent, hassle-free transactions.',
      color: '#27ae60'
    },
    {
      id: 4,
      icon: 'fas fa-headset',
      title: '24/7 Support',
      description: 'Our dedicated support team is available around the clock to help with planning, questions, or any concerns during your journey.',
      color: '#f39c12'
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Choose JumaTrek</h2>
          <p className="section-subtitle">
            Experience authentic treks with local expertise, safety, and community connection
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon" style={{ backgroundColor: `${feature.color}20` }}>
                <i className={feature.icon} style={{ color: feature.color }}></i>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Features;