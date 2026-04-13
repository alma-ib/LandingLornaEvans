import React from 'react';
import { ParallaxImage } from '../ParallaxImage/ParallaxImage';
import './Slide.css';

interface SlideProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  sideImage?: string;
  sideImageLink?: string;
  sideElement?: React.ReactNode;
  buttonText?: string;
  children?: React.ReactNode;
}

export const Slide: React.FC<SlideProps> = ({ title, description, imageUrl, sideImage, sideImageLink, sideElement, buttonText, id, children }) => {
  return (
    <div className="slide">
      <div className="slide-hero" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="slide-overlay">
          <div className="slide-inner-container">
            <div className="slide-content">
              <h2 className="slide-title">
                <span className="slide-number">0{id} /</span> {title}
              </h2>
              <p className="slide-description">{description}</p>
              {buttonText && <button className="slide-button">{buttonText}</button>}
            </div>
            {(sideElement || sideImage) && (
              <div className="slide-side-image-wrapper">
                {sideElement ? sideElement : (
                  sideImage && (
                    sideImageLink ? (
                      <a href={sideImageLink} target="_blank" rel="noopener noreferrer" className="slide-side-link">
                        <ParallaxImage src={sideImage} alt={title} className="slide-side-image" />
                      </a>
                    ) : (
                      <ParallaxImage src={sideImage} alt={title} className="slide-side-image" />
                    )
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

