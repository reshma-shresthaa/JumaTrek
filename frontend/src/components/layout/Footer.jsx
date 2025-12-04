import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const openTrip = (trekName) => {
    // This would typically open a modal or navigate to trek detail
    console.log(`Opening ${trekName}`);
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div>
            <div className="footer-brand">
              <div className="logo">JT</div>
              <div>
                <div className="brand-text" style={{ color: 'white' }}>JUMA TREK</div>
                <div className="brand-tagline">Walk in Nepal</div>
              </div>
            </div>
            <div className="footer-desc">
              Experience Nepal's majestic Himalayas with expert local guides. We create authentic, responsible adventures that benefit local communities while providing unforgettable memories.
            </div>
            <div className="footer-social">
              <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Popular Treks</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openTrip('Everest Base Camp'); }}>Everest Base Camp</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openTrip('Annapurna Circuit'); }}>Annapurna Circuit</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openTrip('Langtang Valley'); }}>Langtang Valley</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openTrip('Manaslu Circuit'); }}>Manaslu Circuit</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openTrip('Upper Mustang'); }}>Upper Mustang</a></li>
              <li><Link to="/all-treks">View All Treks</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#team">Our Team</a></li>
              <li><a href="#training">Trek Preparation</a></li>
              <li><a href="#gear">Gear Guide</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#booking-guide">Booking Guide</a></li>
              <li><a href="#packing-list">Packing Lists</a></li>
              <li><a href="#travel-tips">Travel Tips</a></li>
              <li><a href="#emergency">Emergency Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div>
            <strong>JUMA TREK</strong> &nbsp;|&nbsp; 
            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>© 2024 All rights reserved &nbsp;•&nbsp; Developed by Digital and Beyond Pvt.Ltd.</span>
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.7)' }}>
              <i className="fas fa-certificate"></i>
              Licensed & Insured
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.7)' }}>
              <i className="fas fa-award"></i>
              TripAdvisor Excellence
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;