import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './GlobalHeader.css';

export const GlobalHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 10 || document.documentElement.scrollTop > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash navigation
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        // Need a slight timeout to allow the page to render if navigating from another page
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-home" onClick={closeMenu}>
          ALMA-IB
        </Link>


        {/* Mobile Menu Toggle */}
        <button className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`dropdown-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="menu-header">
          <h2 className="menu-brand">ALMA-IB</h2>
          <div className="menu-divider"></div>
        </div>

        <ul className="menu-links">
          <li><Link to="/#nosotros" onClick={closeMenu}>NOSOTROS</Link></li>
          <li><Link to="/#cursos" onClick={closeMenu}>CURSOS</Link></li>
          <li><Link to="/#eventos" onClick={closeMenu}>EVENTOS</Link></li>
          <li><Link to="/#noticias" onClick={closeMenu}>NOTICIAS</Link></li>
          <li><Link to="/#contacto" onClick={closeMenu}>CONTACTO</Link></li>
        </ul>

        <div className="menu-rocket">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2.5c0,0-5.5,2.5-5.5,10.5h11C17.5,5,12,2.5,12,2.5z M12,18c-1.1,0-2-0.9-2-2h4C14,17.1,13.1,18,12,18z M7,14v2h2v-2H7z M15,14v2h2v-2H15z" />
          </svg>
          <div className="rocket-flame"></div>
        </div>
      </div>
    </nav>
  );
};
