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
      <div className="hero-container">
        <div className="hero-text">
          <h1 className="hero-title">De Argentina a la NASA, con la Luna en la mira</h1>
          <p className="hero-subtitle">Médica aeroespacial, referente científica y futura protagonista de las próximas misiones espaciales.</p>
          <button className="cta-button" onClick={scrollToSlides}>
            Conocé su Historia
          </button>
        </div>
        <div className="hero-image">
          <div className="hero-img-frame">
            <img src="/images/LornaFull.avif" alt="Lorna" className="hero-img" />
          </div>
        </div>
      </div>
    </section>
  );
};
