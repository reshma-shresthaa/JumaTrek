import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Handle scroll to update active section
  useEffect(() => {
    if (!isHomePage) return;
    
    const handleScroll = () => {
      const sections = ['trips', 'training', 'gear', 'seasons', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Set initial active section
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const scrollToTop = () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
    setActiveSection('');
  };

  const handleNavigation = (sectionId, e) => {
    e.preventDefault();
    
    if (isHomePage) {
      // If already on home page, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
        setActiveSection(sectionId);
      }
    } else {
      // If on another page, navigate to home with hash
      navigate(`/#${sectionId}`);
    }
    
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogoError = () => {
    setLogoError(true);
  };

  // Try multiple possible logo paths
  const logoPaths = [
    '/src/assets/images/logo.png',
    'src/assets/images/logo.png',
    '/images/logo.png',
    '/logo.png',
    './logo.png',
    'logo.png',
    '/images/logo.jpg',
    '/logo.jpg'
  ];

  const getLogoPath = () => {
    for (const path of logoPaths) {
      // This is a simple check - in production, you might want to preload or verify differently
      return path;
    }
    return '/images/logo.png'; // Default fallback
  };

  return (
    <header id="header">
      <div className="container topbar">
        <div className="brand" onClick={scrollToTop} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
          {!logoError ? (
            <img 
              src={getLogoPath()}
              alt="Juma Trek Logo" 
              style={{ height: '50px', width: 'auto' }}
              onError={handleLogoError}
            />
          ) : (
            <div className="logo-fallback" style={{
              height: '50px',
              width: '50px',
              backgroundColor: '#4a6fa5',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              JT
            </div>
          )}
          <div>
            <div className="brand-text">JUMA TREK</div>
            <div className="brand-tagline">Walk in Nepal</div>
          </div>
        </div>
        <nav id="nav" className={mobileMenuOpen ? 'mobile-open' : ''}>
          <ul>
            {['trips', 'training', 'gear', 'seasons', 'about', 'contact'].map((section) => (
              <li key={section}>
                <Link 
                  to={isHomePage ? '#' : `/#${section}`}
                  className={`nav-link ${activeSection === section && isHomePage ? 'active' : ''}`}
                  onClick={(e) => handleNavigation(section, e)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                to="/auth" 
                className="btn btn-auth" 
                onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
              >
                <i className="fas fa-user"></i> Login / Sign Up
              </Link>
            </li>
          </ul>
        </nav>
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <style jsx>{`
        #header {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background-color: white;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-text {
          font-size: 24px;
          font-weight: bold;
          color: #2c3e50;
          letter-spacing: 1px;
        }

        .brand-tagline {
          font-size: 12px;
          color: #7f8c8d;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .nav-link {
          display: inline-block;
          padding: 8px 4px;
          margin: 0 4px;
          border-radius: 6px;
          color: #4a6fa5; /* Matching the blue color from the Book Now button */
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          font-weight: 500;
          background-color: transparent;
        }

        .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: #3a5a80; /* Slightly darker blue on hover */
          box-shadow: 0 2px 8px rgba(74, 111, 165, 0.2);
        }

        .nav-link.active {
          background-color: rgba(74, 111, 165, 0.15); /* Light blue background for active state */
          color: #4a6fa5;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(74, 111, 165, 0.2);
        }

        .nav-link.active:hover {
          background-color: rgba(74, 111, 165, 0.2);
          box-shadow: 0 2px 8px rgba(74, 111, 165, 0.3);
        }

        .btn-auth {
          padding: 8px 16px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background-color: #2c3e50;
          color: white;
          border: 1px solid #2c3e50;
        }

        .btn-auth:hover {
          background-color: #e74c3c;
          border-color: #e74c3c;
        }

        @media (max-width: 768px) {
          .btn-auth {
            justify-content: center;
            width: 100%;
          }
        }

        .mobile-open ul {
          display: flex !important;
          flex-direction: column;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          padding: 10px 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .mobile-open .nav-link {
          margin: 4px 0;
          padding: 10px 16px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        
        @media (min-width: 769px) {
          #nav ul {
            display: flex !important;
            align-items: center;
          }
          
          #header .topbar {
            padding: 5px 0;
            transition: all 0.3s ease;
          }
          
          #header.scrolled .topbar {
            padding: 10px 0;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;