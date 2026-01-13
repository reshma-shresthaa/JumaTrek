import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const performSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      // Don't navigate if search is empty
      return;
    }
    navigate(`/all-treks?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <section className="hero-section">
      <div className="hero-background-image"></div>
      <div className="hero-overlay"></div>

      <div className="hero-content container">
        <h1 className="hero-title">
          Custom Treks Designed <br /> for Independent Spirits
        </h1>

        <p className="hero-subtitle">
          Collaborate with our top local experts to engineer your dream adventure.
        </p>

        <div className="hero-search-container">
          <form onSubmit={performSearch} className="hero-search-form">
            <div className="input-wrapper">
              <i className="fas fa-map-marker-alt search-icon"></i>
              <input
                type="text"
                placeholder="Where to?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="hero-search-input"
              />
            </div>
            <button type="submit" className="hero-search-btn">
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;