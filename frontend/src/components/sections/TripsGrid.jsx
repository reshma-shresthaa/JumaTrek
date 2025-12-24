import React from 'react';
import { Link } from 'react-router-dom';
import { trekData } from '../../data/trekData';

// Format price to USD with comma separators
const formatPrice = (priceInUsd) => {
  return `$${priceInUsd.toLocaleString()}`;
};

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
              <div className="trip-meta">
                <i className="fas fa-calendar-alt"></i> {trek.duration} days
                <i className="fas fa-signal"></i> {trek.difficulty}
                <i className="fas fa-map-marker-alt"></i> {trek.region}
              </div>
              <div className="trip-details">
                <div className="price">{formatPrice(trek.price)}</div>
                <Link to={`/trek/${trek.id}`} className="btn">
                  <i className="fas fa-info-circle"></i> Show Details
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
