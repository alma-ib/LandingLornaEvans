import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // More sensitive detection
      setScrolled(window.pageYOffset > 10 || document.documentElement.scrollTop > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <button className="navbar-home" onClick={() => window.location.reload()}>
          Lorna Evans
        </button>

        <button className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      <div className={`dropdown-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="menu-header">
          <h2 className="menu-brand">Lorna Evans</h2>
          <div className="menu-divider"></div>
        </div>

        <ul className="menu-links">
          <li><button onClick={() => { setIsMenuOpen(false); navigate('/'); }} style={{ color: 'var(--color-accent)', textShadow: '0 0 10px var(--color-accent-glow)' }}>ALMA-IB</button></li>
          <li><button onClick={() => console.log('Noticias')}>Noticias</button></li>
          <li><button onClick={() => console.log('Blog')}>Blog</button></li>
          <li><button onClick={() => scrollToSection('footer')}>Contacto</button></li>
        </ul>

        <div className="menu-social">
          <button className="social-icon-btn">
            <img src="/images/Iconos50x50/icons8-instagram-50.svg" alt="Instagram" />
          </button>
          <button className="social-icon-btn">
            <img src="/images/Iconos50x50/icons8-linkedin-50.svg" alt="LinkedIn" />
          </button>
          <button className="social-icon-btn">
            <img src="/images/Iconos50x50/icons8-twitterx-50.svg" alt="Twitter" />
          </button>
          <button className="social-icon-btn">
            <img src="/images/Iconos50x50/icons8-facebook-50.svg" alt="Facebook" />
          </button>
          <button className="social-icon-btn">
            <img src="/images/Iconos50x50/icons8-tiktok-50.svg" alt="TikTok" />
          </button>
          <button className="social-icon-btn">
            <img src="/images/Iconos50x50/icons8-youtube-play-50.svg" alt="YouTube" />
          </button>
        </div>

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
