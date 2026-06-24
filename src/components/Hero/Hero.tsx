import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

export const Hero: React.FC = () => {
  const [showArrow, setShowArrow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let observer: IntersectionObserver;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        clearTimeout(timer);
        timer = setTimeout(() => {
          setShowArrow(true);
        }, 10000);
      } else {
        setIsVisible(false);
        setShowArrow(false);
        clearTimeout(timer);
      }
    };

    const handleScroll = () => {
      setShowArrow(false);
      clearTimeout(timer);
    };

    if (sectionRef.current) {
      observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.25 // Trigger animation slightly earlier when 25% of section is visible
      });
      observer.observe(sectionRef.current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSlides = () => {
    setShowArrow(false); // Force hide immediately
    const slidesElement = document.getElementById('slides-section');
    if (slidesElement) {
      slidesElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/lornaevans');
    }
  };

  return (
    <section className={`hero ${isVisible ? 'animate-in' : ''}`} ref={sectionRef}>
      <img
        src="/images/LornaEvans/Argentina-Plan-Espacial-Espacio-1140x570-jpg.webp"
        alt=""
        className="hero-bg-image"
        aria-hidden="true"
      />
      <div className="hero-overlay"></div>
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
