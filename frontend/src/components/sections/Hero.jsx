import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredTrek } from '../../data/trekData';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [filters, setFilters] = useState([]);

  const performSearch = () => {
    // This would typically make an API call
    console.log('Searching with:', { searchQuery, duration, difficulty, filters });
  };

  const toggleFilter = (filter) => {
    if (filters.includes(filter)) {
      setFilters(filters.filter(f => f !== filter));
    } else {
      setFilters([...filters, filter]);
    }
  };

  return (
    <section className="hero">
      <div>
        <div className="hero-badge">
          <i className="fas fa-mountain"></i>
          Small group • Local-led • Responsible
        </div>
        <h1>Real treks, led by local guides</h1>
        <p>Join small-group treks across Nepal — from Annapurna's tea-house trails to remote Himalayan passes. Expert guides, flexible bookings, meaningful connections with local communities.</p>

        <div className="search">
          <form onSubmit={(e) => { e.preventDefault(); performSearch(); }}>
            <div className="search-row">
              <input 
                id="searchQuery" 
                placeholder="Search destination, trail or experience"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select id="duration" value={duration} onChange={(e) => setDuration(e.target.value)}>
                <option value="">Duration</option>
                <option value="1-3">1–3 days</option>
                <option value="4-8">4–8 days</option>
                <option value="9-15">9–15 days</option>
                <option value="16+">16+ days</option>
              </select>
              <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="">Difficulty</option>
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="challenging">Challenging</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <div className="search-filters">
              {['teahouse', 'camping', 'cultural', 'photography', 'peak'].map(filter => (
                <div 
                  key={filter}
                  className={`filter-chip ${filters.includes(filter) ? 'active' : ''}`}
                  onClick={() => toggleFilter(filter)}
                  data-filter={filter}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </div>
              ))}
            </div>
            <button className="btn" type="submit" style={{ width: '100%' }}>
              <i className="fas fa-search"></i> Find Your Adventure
            </button>  
          </form>
        </div>

      </div>

      <aside>
        <div className="featured-trip">
          <h3>Featured Adventure</h3>
          <img src={featuredTrek.image} alt={featuredTrek.title}/>
          <div className="trip-info">
            <div className="trip-details">
              <strong>{featuredTrek.title}</strong>
              <div className="trip-meta">
                <i className="fas fa-calendar-alt"></i> {featuredTrek.duration} days
                <i className="fas fa-signal"></i> {featuredTrek.difficulty}
              </div>
            </div>
            <div className="price">${featuredTrek.price.toLocaleString()}</div>
          </div>
          <Link to={`/booking?trek=${encodeURIComponent(featuredTrek.title)}`} className="btn" style={{ width: '100%', marginTop: '16px' }}>
            <i className="fas fa-arrow-right"></i> Book This Trek
          </Link>
        </div>
      </aside>
    </section>
  );
};

export default Hero;