import React from 'react';
import { Link } from 'react-router-dom';
import { trekData } from '../../data/trekData';

const TripsGrid = () => {
  return (
    <section id="trips" className="section">
      <div className="section-header">
        <h2 className="section-title">Popular Adventures</h2>
        <p className="section-subtitle">Discover Nepal's most breathtaking trails with our expert local guides and small group experiences</p>
      </div>
      
      <div className="trips-grid">
        {trekData.map(trek => (
          <div className="trip" key={trek.id}>
            <div className="trip-badge">{trek.badge}</div>
            <img src={trek.image} alt={trek.title}/>
            <div className="trip-content">
              <h3 className="trip-title">{trek.title}</h3>
              <p className="muted">{trek.description}</p>
              <div className="trip-rating">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
                {trek.rating} ({trek.reviews} reviews)
              </div>
              <div className="trip-meta">
                <i className="fas fa-calendar-alt"></i> {trek.duration} days
                <i className="fas fa-signal"></i> {trek.difficulty}
                <i className="fas fa-map-marker-alt"></i> {trek.region}
              </div>
              <div className="trip-details">
                <div className="price">Rs {trek.price.toLocaleString()}</div>
                <Link to={`/booking?trek=${encodeURIComponent(trek.title)}`} className="btn">
                  <i className="fas fa-arrow-right"></i> Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link to="/all-treks" className="btn" style={{ padding: '16px 32px' }}>
          <i className="fas fa-mountain"></i> View All 45+ Trek Routes
        </Link>
      </div>
    </section>
  );
};

export default TripsGrid;