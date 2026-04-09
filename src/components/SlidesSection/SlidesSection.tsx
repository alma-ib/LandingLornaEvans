import React, { useEffect, useRef, useState } from 'react';
import { Slide } from '../Slide/Slide';
import { Footer } from '../Footer/Footer';
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
      title: 'Mission Briefing',
      description: 'Preparing for launch. Building scalable, immersive web experiences is my primary directive.',
      imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1920&q=80',
      buttonText: 'View Logs'
    },
    {
      id: 2,
      title: 'Orbital Mechanics',
      description: 'Navigating complex codebases with precision and maintaining stable orbits in dynamic environments.',
      imageUrl: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=1920&q=80',
      buttonText: 'Systems Check'
    },
    {
      id: 3,
      title: 'Deep Space Comm',
      description: 'Ready to establish contact with earthly entities. Transmitting clean code across the galaxy.',
      imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1920&q=80',
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
