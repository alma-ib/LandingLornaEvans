import React from 'react';
import './Hero.css';

export const Hero: React.FC = () => {
  const scrollToSlides = () => {
    const slidesElement = document.getElementById('slides-section');
    if (slidesElement) {
      slidesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="stars-bg"></div>
      <div className="hero-content">
        <h1 className="hero-title">Exploring the Digital Universe</h1>
        <p className="hero-subtitle">Frontend Developer & Space Enthusiast</p>
        <button className="cta-button" onClick={scrollToSlides}>
          Begin Journey
        </button>
      </div>
    </section>
  );
};
