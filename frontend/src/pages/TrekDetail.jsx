import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const TrekDetail = () => {
  const { id } = useParams();
  const [trek, setTrek] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample detailed trek data - in real app, this would come from API
  const trekDetails = {
    1: {
      id: 1,
      title: "Everest Base Camp Trek",
      description: "The classic trek to the base of the world's highest mountain, offering breathtaking views of Everest and surrounding peaks. This iconic journey takes you through Sherpa villages, ancient monasteries, and stunning Himalayan landscapes.",
      duration: 14,
      difficulty: "Challenging",
      maxAltitude: "5,545m (Kala Patthar)",
      region: "Khumbu",
      season: "Spring (Mar-May) & Autumn (Sep-Nov)",
      groupSize: "2-12 people",
      price: 240000,
      rating: 4.8,
      reviews: 203,
      highlights: [
        "Spectacular views of Mount Everest",
        "Visit to Tengboche Monastery",
        "Kala Patthar sunrise view",
        "Explore Namche Bazaar",
        "Experience Sherpa culture"
      ],
      itinerary: [
        { day: 1, title: "Kathmandu to Lukla Flight", description: "Fly to Lukla and trek to Phakding" },
        { day: 2, title: "Phakding to Namche Bazaar", description: "Trek through beautiful pine forests" },
        { day: 3, title: "Acclimatization Day", description: "Hike to Everest View Hotel" },
        // ... more days
      ],
      includes: [
        "All meals during trek",
        "Experienced English-speaking guide",
        "Porter service (1 porter per 2 trekkers)",
        "Accommodation in tea houses",
        "All necessary permits",
        "Airport transfers",
        "Medical kit and oxygen"
      ],
      excludes: [
        "International flights",
        "Nepal visa fee",
        "Travel insurance",
        "Personal expenses",
        "Tips for guide and porter",
        "Alcoholic beverages"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        "https://images.unsplash.com/photo-1551632811-561732d1e306",
        "https://images.unsplash.com/photo-1528181304800-259b08848526"
      ]
    }
    // ... other trek details
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const trekData = trekDetails[id] || trekDetails[1];
      setTrek(trekData);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <i className="fas fa-mountain fa-spin"></i>
          <p>Loading trek details...</p>
        </div>
      </div>
    );
  }

  if (!trek) {
    return (
      <div className="not-found">
        <h2>Trek Not Found</h2>
        <p>The trek you're looking for doesn't exist.</p>
        <Link to="/all-treks" className="btn">Browse All Treks</Link>
      </div>
    );
  }

  return (
    <div className="trek-detail-page">
      <div className="trek-hero">
        <div className="trek-hero-content">
          <div className="trek-breadcrumb">
            <Link to="/all-treks">All Treks</Link> / <Link to={`/region/${trek.region.toLowerCase()}`}>{trek.region}</Link> / <span>{trek.title}</span>
          </div>
          <h1>{trek.title}</h1>
          <div className="trek-rating">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`fas fa-star ${i < Math.floor(trek.rating) ? 'filled' : ''}`}></i>
            ))}
            <span>{trek.rating} ({trek.reviews} reviews)</span>
          </div>
          <div className="trek-meta">
            <span><i className="fas fa-calendar-alt"></i> {trek.duration} days</span>
            <span><i className="fas fa-signal"></i> {trek.difficulty}</span>
            <span><i className="fas fa-mountain"></i> Max altitude: {trek.maxAltitude}</span>
            <span><i className="fas fa-users"></i> Group: {trek.groupSize}</span>
          </div>
          <div className="trek-price">
            <span className="price-label">Starting from</span>
            <span className="price-amount">Rs {trek.price.toLocaleString()}</span>
            <span className="price-person">per person</span>
          </div>
          <div className="trek-actions">
            <Link to={`/booking?trek=${encodeURIComponent(trek.title)}`} className="btn btn-primary">
              <i className="fas fa-calendar-check"></i> Book This Trek
            </Link>
            <button className="btn btn-outline">
              <i className="fas fa-download"></i> Download Itinerary
            </button>
          </div>
        </div>
        <div className="trek-hero-image">
          <img src={trek.gallery[0] + "?q=80&w=1200&auto=format&fit=crop"} alt={trek.title} />
        </div>
      </div>

      <div className="trek-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <i className="fas fa-info-circle"></i> Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
          onClick={() => setActiveTab('itinerary')}
        >
          <i className="fas fa-route"></i> Itinerary
        </button>
        <button 
          className={`tab-btn ${activeTab === 'includes' ? 'active' : ''}`}
          onClick={() => setActiveTab('includes')}
        >
          <i className="fas fa-check-circle"></i> What's Included
        </button>
        <button 
          className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
          onClick={() => setActiveTab('gallery')}
        >
          <i className="fas fa-images"></i> Gallery
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          <i className="fas fa-star"></i> Reviews
        </button>
      </div>

      <div className="trek-tab-content">
        {activeTab === 'overview' && (
          <div className="tab-pane">
            <div className="overview-grid">
              <div className="overview-description">
                <h3>About This Trek</h3>
                <p>{trek.description}</p>
                
                <h4>Highlights</h4>
                <div className="highlights-grid">
                  {trek.highlights.map((highlight, index) => (
                    <div key={index} className="highlight-item">
                      <i className="fas fa-check"></i>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <h4>Best Time to Go</h4>
                <p>The best seasons for this trek are {trek.season}. During these periods, you can expect clear skies, moderate temperatures, and the best mountain views.</p>
              </div>

              <div className="overview-sidebar">
                <div className="quick-facts">
                  <h4>Quick Facts</h4>
                  <div className="fact-item">
                    <span className="fact-label">Duration</span>
                    <span className="fact-value">{trek.duration} days</span>
                  </div>
                  <div className="fact-item">
                    <span className="fact-label">Difficulty</span>
                    <span className="fact-value">{trek.difficulty}</span>
                  </div>
                  <div className="fact-item">
                    <span className="fact-label">Max Altitude</span>
                    <span className="fact-value">{trek.maxAltitude}</span>
                  </div>
                  <div className="fact-item">
                    <span className="fact-label">Walking Hours</span>
                    <span className="fact-value">4-7 hours/day</span>
                  </div>
                  <div className="fact-item">
                    <span className="fact-label">Accommodation</span>
                    <span className="fact-value">Tea Houses</span>
                  </div>
                  <div className="fact-item">
                    <span className="fact-label">Meals</span>
                    <span className="fact-value">Full Board</span>
                  </div>
                </div>

                <div className="cta-box">
                  <h4>Ready to Book?</h4>
                  <p>Limited spots available for next season</p>
                  <Link to={`/booking?trek=${encodeURIComponent(trek.title)}`} className="btn" style={{ width: '100%' }}>
                    <i className="fas fa-calendar-alt"></i> Check Availability
                  </Link>
                  <div className="contact-info">
                    <p><i className="fas fa-phone"></i> Call us: +977 01 5555 123</p>
                    <p><i className="fas fa-envelope"></i> trek@jumatrek.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div className="tab-pane">
            <div className="itinerary-container">
              <h3>Day-by-Day Itinerary</h3>
              <div className="itinerary-timeline">
                {trek.itinerary.map((day, index) => (
                  <div key={index} className="itinerary-day">
                    <div className="day-number">Day {day.day}</div>
                    <div className="day-content">
                      <h4>{day.title}</h4>
                      <p>{day.description}</p>
                      {day.highlights && (
                        <div className="day-highlights">
                          {day.highlights.map((hl, idx) => (
                            <span key={idx} className="highlight-badge">{hl}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'includes' && (
          <div className="tab-pane">
            <div className="includes-container">
              <div className="includes-section">
                <h3><i className="fas fa-check-circle" style={{ color: 'var(--success)' }}></i> What's Included</h3>
                <div className="includes-list">
                  {trek.includes.map((item, index) => (
                    <div key={index} className="include-item">
                      <i className="fas fa-check"></i>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="excludes-section">
                <h3><i className="fas fa-times-circle" style={{ color: 'var(--danger)' }}></i> What's Not Included</h3>
                <div className="excludes-list">
                  {trek.excludes.map((item, index) => (
                    <div key={index} className="exclude-item">
                      <i className="fas fa-times"></i>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="trek-cta">
        <div className="cta-content">
          <h2>Ready for Your Adventure?</h2>
          <p>Join our small group trek and experience the Himalayas like never before.</p>
          <div className="cta-actions">
            <Link to={`/booking?trek=${encodeURIComponent(trek.title)}`} className="btn btn-large">
              <i className="fas fa-calendar-check"></i> Book Now
            </Link>
            <button className="btn btn-outline btn-large">
              <i className="fas fa-question-circle"></i> Ask a Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrekDetail;