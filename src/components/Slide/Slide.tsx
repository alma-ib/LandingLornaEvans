import React from 'react';
import './Slide.css';

interface SlideProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  buttonText?: string;
  children?: React.ReactNode;
}

export const Slide: React.FC<SlideProps> = ({ title, description, imageUrl, buttonText, id, children }) => {
  return (
    <div className="slide">
      <div className="slide-hero" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="slide-overlay">
          <div className="slide-content">
            <h2 className="slide-title">
              <span className="slide-number">0{id} /</span> {title}
            </h2>
            <p className="slide-description">{description}</p>
            {buttonText && <button className="slide-button">{buttonText}</button>}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

