import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Format price to USD with comma separators
const formatPrice = (priceInUsd) => {
  return `$${priceInUsd.toLocaleString()}`;
};

// Extended trek data for all treks page
const allTrekData = [
  // Popular Treks
  {
    id: 1,
    title: "Everest Base Camp Trek",
    region: "Khumbu",
    duration: 14,
    difficulty: "Challenging",
    price: 1805, // $1,805 USD
    rating: 4.8,
    bestSeason: ["Spring", "Autumn"],
    highlights: ["Kala Patthar", "Namche Bazaar", "Tengboche Monastery"]
  },
  {
    id: 2,
    title: "Annapurna Circuit",
    region: "Annapurna",
    duration: 12,
    difficulty: "Moderate",
    price: 1353, // $1,353 USD (matching Annapurna Circuit price)
    rating: 4.9,
    bestSeason: ["Spring", "Autumn"],
    highlights: ["Thorong La Pass", "Manang", "Muktinath"]
  },
  // ... Add 43 more treks with similar structure
  {
    id: 45,
    title: "Upper Mustang Trek",
    region: "Mustang",
    duration: 14,
    difficulty: "Moderate",
    price: 2105, // $2,105 USD
    rating: 4.7,
    bestSeason: ["Spring", "Autumn"],
    highlights: ["Lo Manthang", "Kagbeni", "Ancient Caves"]
  }
];

const AllTreks = () => {
  const [filteredTreks, setFilteredTreks] = useState(allTrekData);
  const [filters, setFilters] = useState({
    region: '',
    difficulty: '',
    duration: '',
    minPrice: '250',
    maxPrice: ''
  });

  const regions = [...new Set(allTrekData.map(trek => trek.region))];
  const difficulties = [...new Set(allTrekData.map(trek => trek.difficulty))];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    
    // Handle price inputs
    if (name === 'minPrice' || name === 'maxPrice') {
      // Remove any non-digit characters and ensure it's not negative
      const numericValue = value.replace(/\D/g, '');
      if (numericValue === '') {
        setFilters({ ...filters, [name]: '' });
        return;
      }
      
      // For minPrice, ensure it's at least 250
      if (name === 'minPrice' && parseInt(numericValue, 10) < 250) {
        setFilters({ ...filters, minPrice: '250' });
        return;
      }
      
      // For maxPrice, ensure it's not negative
      if (name === 'maxPrice' && numericValue.startsWith('-')) {
        return;
      }
      
      setFilters({ ...filters, [name]: numericValue });
      applyFilters({ ...filters, [name]: numericValue });
      return;
    }
    
    const newFilters = {
      ...filters,
      [name]: value
    };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filterValues) => {
    let result = allTrekData;

    if (filterValues.region) {
      result = result.filter(trek => trek.region === filterValues.region);
    }

    if (filterValues.difficulty) {
      result = result.filter(trek => trek.difficulty === filterValues.difficulty);
    }

    if (filterValues.duration) {
      const [min, max] = filterValues.duration.split('-').map(Number);
      result = result.filter(trek => {
        if (max) return trek.duration >= min && trek.duration <= max;
        return trek.duration >= min;
      });
    }

    if (filterValues.minPrice) {
      result = result.filter(trek => trek.price >= parseInt(filterValues.minPrice));
    }

    if (filterValues.maxPrice) {
      result = result.filter(trek => trek.price <= parseInt(filterValues.maxPrice));
    }

    setFilteredTreks(result);
  };

  const clearFilters = () => {
    setFilters({
      region: '',
      difficulty: '',
      duration: '',
      minPrice: '',
      maxPrice: ''
    });
    setFilteredTreks(allTrekData);
  };

  return (
    <div className="all-treks-page">
      <div className="section-header">
        <h1 className="section-title">All Trekking Routes</h1>
        <p className="section-subtitle">Discover 45+ amazing trekking routes across Nepal's majestic Himalayas</p>
      </div>

      <div className="treks-container">
        <div className="filters-sidebar">
          <div className="filter-section">
            <h4><i className="fas fa-filter"></i> Filters</h4>
            
            <div className="filter-group">
              <label>Region</label>
              <select name="region" value={filters.region} onChange={handleFilterChange}>
                <option value="">All Regions</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Difficulty</label>
              <select name="difficulty" value={filters.difficulty} onChange={handleFilterChange}>
                <option value="">All Levels</option>
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Duration</label>
              <select name="duration" value={filters.duration} onChange={handleFilterChange}>
                <option value="">Any Duration</option>
                <option value="1-3">1-3 days</option>
                <option value="4-7">4-7 days</option>
                <option value="8-14">8-14 days</option>
                <option value="15-">15+ days</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Price Range ($)</label>
              <div className="price-range">
                <input 
                  type="number" 
                  name="minPrice" 
                  placeholder="Min" 
                  value={filters.minPrice}
                  min="250"
                  onChange={handleFilterChange}
                />
                <span>to</span>
                <input 
                  type="number" 
                  name="maxPrice" 
                  placeholder="Max" 
                  value={filters.maxPrice}
                  min="0"
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            <button 
              className="btn btn-secondary" 
              onClick={clearFilters} 
              style={{
                width: '100%',
                marginTop: '16px',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#f0f0f0',
                color: '#333',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            >
              <i className="fas fa-times"></i> Clear Filters
            </button>
          </div>

          <div className="trek-stats">
            <h4><i className="fas fa-chart-bar"></i> Trek Statistics</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{allTrekData.length}</div>
                <div className="stat-label">Total Treks</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{regions.length}</div>
                <div className="stat-label">Regions</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{difficulties.length}</div>
                <div className="stat-label">Difficulty Levels</div>
              </div>
            </div>
          </div>
        </div>

        <div className="treks-grid-container">
          <div className="treks-header">
            <h3>Showing {filteredTreks.length} of {allTrekData.length} Treks</h3>
          </div>

          {filteredTreks.length === 0 ? (
            <div className="no-results">
              <i className="fas fa-mountain" style={{ fontSize: '48px', color: 'var(--muted)', marginBottom: '16px' }}></i>
              <h3>No Treks Found</h3>
              <p>Try adjusting your filters to find more trekking options.</p>
              <button 
                className="btn" 
                onClick={clearFilters}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#4a6fa5',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(74, 111, 165, 0.3)'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3a5a8f'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4a6fa5'}
              >
                <i className="fas fa-filter"></i> Clear All Filters
              </button>
            </div>
          ) : (
            <div className="treks-grid">
              {filteredTreks.map(trek => (
                <div className="trek-card" key={trek.id}>
                  <div className="trek-image">
                    <img 
                      src={`https://images.unsplash.com/photo-${1500000000000 + trek.id}?q=80&w=400&auto=format&fit=crop`} 
                      alt={trek.title} 
                    />
                    <div className="trek-badge">{trek.region}</div>
                  </div>
                  <div className="trek-content">
                    <h4>{trek.title}</h4>
                    <div className="trek-meta">
                      <span><i className="fas fa-calendar-alt"></i> {trek.duration} days</span>
                      <span><i className="fas fa-signal"></i> {trek.difficulty}</span>
                    </div>
                    <div className="trek-highlights">
                      {trek.highlights.slice(0, 3).map((highlight, idx) => (
                        <span key={idx} className="highlight-tag">{highlight}</span>
                      ))}
                    </div>
                    <div className="trek-footer">
                      <div className="trek-price">{formatPrice(trek.price)}</div>
                      <div className="trek-actions">
                        <Link 
                          to={`/trek/${trek.id}`} 
                          className="btn btn-outline"
                          style={{
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: '2px solid #4a6fa5',
                            backgroundColor: 'transparent',
                            color: '#4a6fa5',
                            fontWeight: '600',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#4a6fa5';
                            e.currentTarget.style.color = 'white';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#4a6fa5';
                          }}
                        >
                          <i className="fas fa-info-circle"></i> Details
                        </Link>
                        <Link 
                          to={`/booking?trek=${encodeURIComponent(trek.title)}`} 
                          className="btn"
                          style={{
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: 'none',
                            backgroundColor: '#4a6fa5',
                            color: 'white',
                            fontWeight: '600',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 2px 8px rgba(74, 111, 165, 0.3)'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3a5a8f'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4a6fa5'}
                        >
                          <i className="fas fa-calendar"></i> Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTreks;