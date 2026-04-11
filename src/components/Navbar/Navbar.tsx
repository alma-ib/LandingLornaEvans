import React, { useState } from 'react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className="navbar-home" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Lorna Evans
        </button>
        
        <button className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      <div className={`dropdown-menu ${isMenuOpen ? 'active' : ''}`}>
        <ul className="menu-links">
          <li><button onClick={() => scrollToSection('hero')}>Hogar</button></li>
          <li><button onClick={() => scrollToSection('slides-section')}>Misiones</button></li>
          <li><button onClick={() => scrollToSection('footer')}>Contacto</button></li>
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
