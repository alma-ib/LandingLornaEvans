import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-branding">
          <h2>Digital Explorer</h2>
          <p>Traversing the frontend universe</p>
        </div>
        
        <div className="footer-socials">
          <a href="#" className="social-link">GitHub</a>
          <a href="#" className="social-link">LinkedIn</a>
          <a href="#" className="social-link">Twitter</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Space Portfolio. All systems nominal.</p>
      </div>
    </footer>
  );
};
