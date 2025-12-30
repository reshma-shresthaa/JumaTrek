import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';
import UserDropdown from './UserDropdown';
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [logoError, setLogoError] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Check authentication status on component mount and when location changes
  useEffect(() => {
    const checkAuth = () => {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    // Reset active section if not on home page
    if (location.pathname !== '/') {
      setActiveSection('');
    }
  }, [location]);

  // Handle scroll to update active section
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const sections = ['guides', 'experiences', 'about', 'contact', 'blog'];
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
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
        setActiveSection(sectionId);
      }
    } else {
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

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

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
      return path;
    }
    return '/images/logo.png';
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Link to="/" className="logo-link" onClick={scrollToTop}>
            <div className="logo">
              {!logoError ? (
                <img
                  src={getLogoPath()}
                  alt="JUMA TREK Logo"
                  className="logo__img"
                  onError={handleLogoError}
                />
              ) : (
                <div className="logo__fallback">JT</div>
              )}
            </div>
            <div className="brand-info">
              <h1 className="brand-name" style={{ display: 'block', color: '#000', fontSize: '1.5rem' }}>JUMA TREK</h1>
              {/* <p className="brand-tagline">Custom Trek Experiences</p> */}
            </div>
          </Link>

          <nav className={`nav ${mobileMenuOpen ? 'nav--mobile-open' : ''}`}>
            <ul className="nav__list">
              {['Destinations', 'Guides', 'Experiences', 'About', 'Contact', 'Blog'].map((item) => {
                const isAnchor = item === 'Experiences';
                const path = isAnchor ? '/#experiences' : `/${item.toLowerCase()}`;
                const isActive = isAnchor
                  ? (activeSection === 'experiences' && isHomePage)
                  : location.pathname === path;

                return (
                  <li key={item} className="nav__item">
                    <Link
                      to={path}
                      className={`nav__link ${isActive ? 'nav__link--active' : ''}`}
                      onClick={(e) => {
                        if (isAnchor) {
                          handleNavigation('experiences', e);
                        } else {
                          if (mobileMenuOpen) setMobileMenuOpen(false);
                          setActiveSection(''); // Clear active section when navigating to pages
                        }
                      }}
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header__actions">
            <Link
              to="/custom-trip"
              className="nav__link"
              onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
            >
              Custom Trip
            </Link>

            {isAuthenticated && user ? (
              <UserDropdown
                user={user}
                onLogout={handleLogout}
              />
            ) : (
              <Link
                to="/auth"
                className="nav__link"
                onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>

          <button
            className="menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className="menu-toggle__icon"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;