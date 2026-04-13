import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="https://zonodev.ar/es/" target="_blank" rel="noopener noreferrer" className="footer-branding">
          <div className="footer-logo-container">
            <img src="/images/zonodevLogo.png" alt="Zonodev Logo" className="footer-logo" />
            <h2>Zonodev</h2>
          </div>
          <p>Sistemas de Gestión y Desarrollo Web</p>
        </a>

        <div className="footer-social-wrapper">
          <p className="footer-social-title">Redes de Zonodev</p>
          <div className="footer-socials">
            <a href="https://zonodev.ar/es/" target="_blank" rel="noopener noreferrer" className="social-link">WEB</a>
            <a href="https://www.linkedin.com/company/zonodev" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
            <a href="https://www.instagram.com/zonodev/" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Zonodev. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
