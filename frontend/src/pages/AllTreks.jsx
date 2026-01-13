import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { trekService } from '../services/api';

// Format price to USD with comma separators
const formatPrice = (priceInUsd) => {
  return priceInUsd ? `$${priceInUsd.toLocaleString()}` : 'N/A';
};

const AllTreks = () => {
  const location = useLocation();
  const [activeTreks, setActiveTreks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    region: '',
    difficulty: '',
    duration: '',
    minPrice: '',
    maxPrice: ''
  });

  // Update filters when URL search params change
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    const regionQuery = searchParams.get('region');
    
    const updatedFilters = { ...filters };
    
    if (searchQuery) {
      updatedFilters.search = searchQuery;
    } else {
      updatedFilters.search = '';
    }
    
    if (regionQuery) {
      // Convert URL slug to proper region name if needed
      const regionName = regionQuery
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .replace('Region', '')
        .trim() + ' Region';
      
      updatedFilters.region = regionName;
    } else {
      updatedFilters.region = '';
    }
    
    setFilters(updatedFilters);
  }, [location.search]);

  // Fetch treks from API
  useEffect(() => {
    fetchTreks();
  }, [filters]); // Re-fetch when filters change

  const fetchTreks = async (currentFilters = filters) => {
    setIsLoading(true);
    try {
      // Map frontend filters to backend query params
      const params = {};
      if (currentFilters.region && currentFilters.region !== "All Regions") params.region = currentFilters.region;
      if (currentFilters.difficulty && currentFilters.difficulty !== "All Levels") params.difficulty = currentFilters.difficulty;

      if (currentFilters.minPrice) params.minPrice = currentFilters.minPrice;
      if (currentFilters.maxPrice) params.maxPrice = currentFilters.maxPrice;

      const res = await trekService.getAllTreks({ limit: 100 }); // Fetch enough

      if (res.success) {
        let result = res.data;

        // Client-side filtering to match previous robust logic
        if (currentFilters.search) {
          const searchLower = currentFilters.search.toLowerCase();
          result = result.filter(trek =>
            trek.title.toLowerCase().includes(searchLower) ||
            (trek.region && trek.region.toLowerCase().includes(searchLower))
          );
        }

        if (currentFilters.region) {
          result = result.filter(trek => trek.region === currentFilters.region);
        }

        if (currentFilters.difficulty) {
          result = result.filter(trek => trek.difficulty === currentFilters.difficulty);
        }

        if (currentFilters.duration) {
          const [min, max] = currentFilters.duration.split('-').map(Number);
          result = result.filter(trek => {
            if (max) return trek.duration >= min && trek.duration <= max;
            return trek.duration >= min;
          });
        }

        if (currentFilters.minPrice) {
          result = result.filter(trek => trek.price >= parseInt(currentFilters.minPrice));
        }

        if (currentFilters.maxPrice) {
          result = result.filter(trek => trek.price <= parseInt(currentFilters.maxPrice));
        }

        setActiveTreks(result);
      }
    } catch (error) {
      console.error("Failed to fetch treks", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    // Logic for setting filters state (same as before)
    if (name === 'minPrice' || name === 'maxPrice') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue === '') {
        setFilters(prev => {
          const next = { ...prev, [name]: '' };
          fetchTreks(next);
          return next;
        });
        return;
      }
      setFilters(prev => {
        const next = { ...prev, [name]: numericValue };
        fetchTreks(next);
        return next;
      });
      return;
    }

    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    fetchTreks(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      search: '',
      region: '',
      difficulty: '',
      duration: '',
      minPrice: '',
      maxPrice: ''
    };
    setFilters(resetFilters);
    fetchTreks(resetFilters);
  };

  // Extract unique regions and difficulties from the fetched data (or use predefined lists)
  const regions = ["Everest Region", "Annapurna Region", "Langtang Region", "Manaslu Region", "Mustang Region", "Other"];
  const difficulties = ["Easy", "Moderate", "Challenging", "Strenuous"];

  const getImageUrl = (images) => {
    if (!images || !Array.isArray(images) || images.length === 0) return 'https://via.placeholder.com/400x300';
    const image = images[0];
    if (typeof image !== 'string') return 'https://via.placeholder.com/400x300';
    if (image.startsWith('http')) return image;
    return `http://localhost:5000/${image.replace(/\\/g, '/')}`;
  };

  return (
    <div className="all-treks-page">
      <div className="section-header">
        <h1 className="section-title">All Trekking Routes</h1>
        <p className="section-subtitle">Discover amazing trekking routes across Nepal's majestic Himalayas</p>
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

            <button className="btn btn-outline" onClick={clearFilters}>
              <i className="fas fa-times"></i> Clear Filters
            </button>
          </div>
        </div>

        <div className="treks-grid-container">
          <div className="treks-header">
            <h3>Showing {activeTreks.length} Treks</h3>
          </div>

          {isLoading ? (
            <div className="loading-container" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0' }}>
              <div className="loading-spinner">
                <i className="fas fa-mountain fa-spin" style={{ fontSize: '3rem', color: '#1e88e5', marginBottom: '1rem' }}></i>
                <p>Loading treks...</p>
              </div>
            </div>
          ) : activeTreks.length === 0 ? (
            <div className="no-results">
              <i className="fas fa-mountain text-muted-large mb-16"></i>
              <h3>No Treks Found</h3>
              <p>Try adjusting your filters to find more trekking options.</p>
              <button className="btn btn-accent" onClick={clearFilters}>
                <i className="fas fa-filter"></i> Clear All Filters
              </button>
            </div>
          ) : (
            <div className="treks-grid">
              {activeTreks.map(trek => (
                <div className="trek-card" key={trek._id}>
                  <div className="trek-image">
                    <img
                      src={getImageUrl(trek.gallery)}
                      alt={trek.title}
                    />
                    <div className="trek-badge">{trek.region}</div>
                  </div>
                  <div className="trek-content">
                    <h4>{trek.title}</h4>
                    <div className="trek-meta">
                      <span><i className="fas fa-calendar-alt"></i> {trek.duration} days</span>
                      <span><i className="fas fa-signal"></i> {trek.difficulty}</span>
                      <span><i className="fas fa-map-marker-alt"></i> {trek.region}</span>
                    </div>
                    <div className="trek-highlights">
                      {(trek.highlights || []).slice(0, 3).map((highlight, idx) => (
                        <span key={idx} className="highlight-tag">{highlight}</span>
                      ))}
                    </div>
                    <div className="trek-footer">
                      <div className="trek-price">{formatPrice(trek.price)}</div>
                      <div className="trek-actions">
                        <Link to={`/trek/${trek._id}`} className="btn-trek-details">
                          <i className="fas fa-info-circle"></i> Details
                        </Link>
                        <Link to={`/booking?trek=${encodeURIComponent(trek.title)}`} className="btn-trek-book">
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