import React, { useState, useEffect } from 'react';
import './Hero.css';

export const Hero: React.FC = () => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      if (window.scrollY > 20 || window.pageYOffset > 20) {
        setShowArrow(false);
        clearTimeout(timer); // Cancel timer if user scrolls early
      }
    };

    // Only set the timer if we are at the top
    if (window.scrollY <= 20) {
      timer = setTimeout(() => {
        if (window.scrollY <= 20 && window.pageYOffset <= 20) {
          setShowArrow(true);
        }
      }, 10000);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSlides = () => {
    setShowArrow(false); // Force hide immediately
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
            <img src="/images/LornaEvans/LornaFull.avif" alt="Lorna" className="hero-img" />
          </div>
        </div>
      </div>
      <div className={`scroll-arrow ${showArrow ? 'visible' : ''}`} onClick={scrollToSlides}>
        <div className="arrow-icon"></div>
      </div>
    </section>
  );
};
