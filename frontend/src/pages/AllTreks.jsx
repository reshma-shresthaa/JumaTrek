import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Extended trek data for all treks page
const allTrekData = [
  // Popular Treks
  {
    id: 1,
    title: "Everest Base Camp Trek",
    region: "Khumbu",
    duration: 14,
    difficulty: "Challenging",
    price: 240000,
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
    price: 220000,
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
    price: 350000,
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
    minPrice: '',
    maxPrice: ''
  });

  const regions = [...new Set(allTrekData.map(trek => trek.region))];
  const difficulties = [...new Set(allTrekData.map(trek => trek.difficulty))];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
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
              <label>Price Range (Rs)</label>
              <div className="price-range">
                <input 
                  type="number" 
                  name="minPrice" 
                  placeholder="Min" 
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                />
                <span>to</span>
                <input 
                  type="number" 
                  name="maxPrice" 
                  placeholder="Max" 
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            <button className="btn btn-secondary" onClick={clearFilters} style={{ width: '100%', marginTop: '16px' }}>
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
            <div className="sort-options">
              <select>
                <option>Sort by: Popularity</option>
                <option>Sort by: Price (Low to High)</option>
                <option>Sort by: Price (High to Low)</option>
                <option>Sort by: Duration</option>
                <option>Sort by: Difficulty</option>
              </select>
            </div>
          </div>

          {filteredTreks.length === 0 ? (
            <div className="no-results">
              <i className="fas fa-mountain" style={{ fontSize: '48px', color: 'var(--muted)', marginBottom: '16px' }}></i>
              <h3>No Treks Found</h3>
              <p>Try adjusting your filters to find more trekking options.</p>
              <button className="btn" onClick={clearFilters}>
                Clear All Filters
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
                      <span><i className="fas fa-star"></i> {trek.rating}</span>
                    </div>
                    <div className="trek-highlights">
                      {trek.highlights.slice(0, 3).map((highlight, idx) => (
                        <span key={idx} className="highlight-tag">{highlight}</span>
                      ))}
                    </div>
                    <div className="trek-footer">
                      <div className="trek-price">Rs {trek.price.toLocaleString()}</div>
                      <div className="trek-actions">
                        <Link to={`/trek/${trek.id}`} className="btn btn-outline">
                          <i className="fas fa-info-circle"></i> Details
                        </Link>
                        <Link to={`/booking?trek=${encodeURIComponent(trek.title)}`} className="btn">
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