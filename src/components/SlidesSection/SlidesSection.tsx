import React, { useEffect, useRef, useState } from 'react';
import { Slide } from '../Slide/Slide';
import { Footer } from '../Footer/Footer';
import { OverlappingImages } from '../OverlappingImages/OverlappingImages';
import './SlidesSection.css';

export const SlidesSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [isFullyVisible, setIsFullyVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFullyVisible(entry.isIntersecting && entry.intersectionRatio >= 0.99);
      },
      { threshold: 1.0 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // Correct 1: Trigger initial progress fill
  useEffect(() => {
    if (isFullyVisible && activeSlide === 0) {
      setActiveSlide(1);
    }
  }, [isFullyVisible, activeSlide]);

  // Correction 2: Detect footer visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  const slides = [
    {
      id: 1,
      title: 'De Lanús al sueño espacial',
      description: 'Nacida en Argentina, Lorna comenzó su camino con una vocación clara: aprender, superarse y llegar más lejos de lo imaginable. Sus raíces marcaron el inicio de una historia extraordinaria.',
      imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1920&q=80',
      sideElement: <OverlappingImages imageFront="/images/LornaArgNasa.avif" imageBack="/images/LornaPileta.avif" />,
      buttonText: 'Ver Entrevistas'
    },
    {
      id: 2,
      title: 'Trabajando hoy para las misiones de mañana',
      description: 'Hoy se desempeña como médica aeroespacial en NASA, trabajando en desafíos reales vinculados a la salud humana y la exploración espacial. Su presente ya inspira a miles.',
      imageUrl: '/images/art002e009288orig.jpg',
      sideImage: '/images/LornaInstagramPhone.png',
      sideImageLink: 'https://www.instagram.com/lorna.am/',
      buttonText: 'Ver sus últimas Publicaciones'
    },
    {
      id: 3,
      title: 'La Luna como próximo objetivo',
      description: 'Su meta es formar parte de futuras misiones espaciales y convertirse en astronauta. Con la mirada puesta en la Luna, Lorna podría hacer historia para Argentina.',
      imageUrl: '/images/art002e012702~large.jpg',
      buttonText: 'Initialize Signal'
    }
  ];

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const slideHeight = e.currentTarget.clientHeight;
    // Calculate which slide is currently in view (index 0, 1, 2)
    const newIndex = Math.min(Math.round(scrollTop / slideHeight) + 1, slides.length);
    if (newIndex !== activeSlide) {
      setActiveSlide(newIndex);
    }
  };

  return (
    <section 
      id="slides-section" 
      ref={containerRef}
      className={`slides-container ${isFullyVisible ? 'is-visible' : ''}`}
      onScroll={handleScroll}
    >
      <div className="slides-top-shadow"></div>
      {slides.map((slide, index) => {
        const isLast = index === slides.length - 1;
        return (
          <Slide 
            key={slide.id} 
            {...slide} 
          >
            {isLast && (
              <div ref={footerRef}>
                <Footer />
              </div>
            )}
          </Slide>
        );
      })}

      {/* Progress Timeline Tracker */}
      {isFullyVisible && (
        <div className={`timeline-fixed-container ${isFooterVisible ? 'is-hidden' : ''}`}>
          <div 
            className="timeline-progress" 
            style={{ width: `${(activeSlide / slides.length) * 100}%` }}
          ></div>
        </div>
      )}
    </section>
  );
};
