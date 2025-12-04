import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header id="header">
      <div className="container topbar">
        <div className="brand" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
          <div className="logo">JT</div>
          <div>
            <div className="brand-text">JUMA TREK</div>
            <div className="brand-tagline">Walk in Nepal</div>
          </div>
        </div>
        <nav id="nav" className={mobileMenuOpen ? 'mobile-open' : ''}>
          <ul>
            <li><a href="#trips" className="nav-link" onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}>Trips</a></li>
            <li><a href="#training" className="nav-link" onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}>Training</a></li>
            <li><a href="#gear" className="nav-link" onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}>Gear</a></li>
            <li><a href="#seasons" className="nav-link" onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}>Seasons</a></li>
            <li><a href="#about" className="nav-link" onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}>About</a></li>
            <li><a href="#contact" className="nav-link" onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}>Contact</a></li>
            <li><Link to="/booking" className="btn btn-book" onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}>
              <i className="fas fa-calendar-alt"></i> Book Now
            </Link></li>
          </ul>
        </nav>
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <style jsx>{`
        .mobile-open ul {
          display: flex !important;
          flex-direction: column;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          padding: 20px;
          box-shadow: var(--shadow);
        }
        
        @media (min-width: 769px) {
          #nav ul {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;