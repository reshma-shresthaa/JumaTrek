import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { trekService } from '../services/api';

// Format price to USD with comma separators
const formatPrice = (priceInUsd) => {
  return `$${priceInUsd ? priceInUsd.toLocaleString() : 'N/A'}`;
};

const TrekDetail = () => {
  const { id } = useParams();
  const [trek, setTrek] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedItinerary, setExpandedItinerary] = useState(false);

  useEffect(() => {
    const fetchTrek = async () => {
      try {
        const res = await trekService.getTrekById(id);
        if (res.success) {
          setTrek(res.data);
        }
      } catch (error) {
        console.error('Failed to fetch trek details', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTrek();
    }
  }, [id]);

  const getImageUrl = (image) => {
    if (!image || typeof image !== 'string') return 'https://via.placeholder.com/1200x600?text=No+Image';
    if (image.startsWith('http')) return image;
    return `http://localhost:5000/${image.replace(/\\/g, '/')}`;
  };

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
    <div className="trek-detail-page" style={{ padding: '2rem 4rem' }}>
      <div className="trek-hero">
        <div className="trek-hero-content">
          <div className="trek-breadcrumb">
            <Link to="/all-treks">All Treks</Link> / <span>{trek.region}</span> / <span>{trek.title}</span>
          </div>
          <h1>{trek.title}</h1>
          <div className="trek-meta">
            <span><i className="fas fa-calendar-alt"></i> {trek.duration} days</span>
            <span><i className="fas fa-signal"></i> {trek.difficulty}</span>
            <span><i className="fas fa-mountain"></i> Max altitude: {trek.maxAltitude}m</span>
            <span><i className="fas fa-users"></i> Group: {trek.groupSize || '2-12'}</span>
          </div>
          <div className="trek-price">
            <span className="price-label">Starting from</span>
            <span className="price-amount">{formatPrice(trek.price)}</span>
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
          {trek.gallery && trek.gallery.length > 0 && (
            <img src={getImageUrl(trek.gallery[0])} alt={trek.title} />
          )}
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
      </div>

      <div className="trek-tab-content">
        {activeTab === 'overview' && (
          <div className="tab-pane">
            <div className="overview-grid">
              <div className="overview-description">
                <h3>About This Trek</h3>
                <div
                  className="trek-description-content"
                  dangerouslySetInnerHTML={{ __html: trek.description }}
                />

                <div className="info-grid">
                  <h4>OVERVIEW</h4>
                  <div className="info-grid-columns">
                    <div className="info-column">
                      <div className="info-item">
                        <div className="info-label">REGION</div>
                        <div className="info-value">{trek.region}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">BEST SEASON</div>
                        {/* Assuming bestSeason is array, join */}
                        <div className="info-value">{Array.isArray(trek.bestSeason) ? trek.bestSeason.join(', ') : trek.bestSeason}</div>
                      </div>
                    </div>
                    <div className="info-column">
                      <div className="info-item">
                        <div className="info-label">DIFFICULTY</div>
                        <div className="info-value">{trek.difficulty}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">MAX ALTITUDE</div>
                        <div className="info-value">{trek.maxAltitude}m</div>
                      </div>
                    </div>
                  </div>
                </div>

                <h4>Highlights</h4>
                <div className="highlights-grid">
                  {trek.highlights && trek.highlights.map((highlight, index) => (
                    <div key={index} className="highlight-item">
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overview-sidebar">
                <div className="quick-facts">
                  <h4>Quick Facts</h4>
                  <div className="fact-item">
                    <span className="fact-label">Duration</span>
                    <span className="fact-value">{trek.duration} days</span>
                  </div>
                  <div className="fact-item">
                    <span className="fact-label">Group Size</span>
                    <span className="fact-value">{trek.groupSize}</span>
                  </div>
                </div>

                <div className="cta-box">
                  <h4>Ready to Book?</h4>
                  <p>Limited spots available for next season</p>
                  <Link to={`/booking?trek=${encodeURIComponent(trek.title)}`} className="btn" style={{ width: '100%' }}>
                    Check Availability
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
              <div className="itinerary-header">
                <h3>Day-by-Day Itinerary</h3>
              </div>
              <div className="detailed-itinerary">
                <div className="detailed-itinerary-content">
                  {trek.itinerary && trek.itinerary.map((day, index) => (
                    <div key={index} className="detailed-day">
                      <div className="day-header">
                        <h4>Day {day.day}: {day.title}</h4>
                      </div>
                      <div className="day-content">
                        <div
                          className="day-description"
                          dangerouslySetInnerHTML={{ __html: day.description }}
                        />
                        <div className="day-details">
                          <div className="detail-row">
                            {day.maxAltitude && (
                              <div className="detail-item">
                                <div className="detail-label">MAX ALTITUDE</div>
                                <div className="detail-value">{day.maxAltitude}</div>
                              </div>
                            )}
                            {day.accommodation && (
                              <div className="detail-item">
                                <div className="detail-label">ACCOMMODATION</div>
                                <div className="detail-value">{day.accommodation}</div>
                              </div>
                            )}
                            {day.meals && (
                              <div className="detail-item">
                                <div className="detail-label">MEALS</div>
                                <div className="detail-value">{day.meals}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                  {trek.includes && trek.includes.map((item, index) => (
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
                  {trek.excludes && trek.excludes.map((item, index) => (
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

        {activeTab === 'gallery' && (
          <div className="tab-pane">
            <div className="gallery-container">
              <h3>Photo Gallery</h3>
              <div className="gallery-grid">
                {trek.gallery && trek.gallery.map((image, index) => (
                  <div key={index} className="gallery-item">
                    <img
                      src={getImageUrl(image)}
                      alt={`${trek.title} - ${index + 1}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrekDetail;