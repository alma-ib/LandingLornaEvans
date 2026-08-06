import React from 'react';
import { Link } from 'react-router-dom';
import './AlmaFooter.css';

export const AlmaFooter: React.FC = () => {
  return (
    <div className="alma-footer">
      <div className="alma-footer-content">
        <div className="alma-footer-brand">
          <img src="/images/ALMA-IB/logo-alma-ib.png" alt="ALMA-IB Logo" className="alma-footer-logo" />
          <div>
            <h2>ALMA-IB</h2>
            <p>Latin American Aerospace Medicine, Engineering and Biotechnology Association (ALMA-IB) 501(C)(3) NONPROFIT ORGANIZATION</p>
          </div>
        </div>

        <div className="alma-footer-links">
          <p className="alma-footer-heading">Secciones</p>
          <nav className="alma-footer-nav">
            <Link to="/#nosotros">Nosotros</Link>
            <Link to="/#cursos">Cursos</Link>
            <Link to="/#eventos">Eventos</Link>
            <Link to="/#noticias">Noticias</Link>
            <Link to="/#contacto">Contacto</Link>
          </nav>
        </div>

        <div className="alma-footer-contact">
          <p className="alma-footer-heading">Contacto</p>
          <a href="mailto:contacto@alma-ib.org" className="alma-footer-email">contacto@alma-ib.org</a>
          <a
            href="https://www.instagram.com/almaib.inc/"
            target="_blank"
            rel="noopener noreferrer"
            className="alma-footer-social-btn"
            aria-label="Instagram"
          >
            <img src="/images/Iconos50x50/icons8-instagram-50.svg" alt="Instagram" />
          </a>
        </div>
      </div>
    </div>
  );
};
