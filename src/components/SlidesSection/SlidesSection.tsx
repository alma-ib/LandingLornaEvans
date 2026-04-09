import React, { useEffect, useRef, useState } from 'react';
import { Slide } from '../Slide/Slide';
import './SlidesSection.css';

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

export const SlidesSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isFullyVisible, setIsFullyVisible] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // 1. Intersection Observer to detect full visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFullyVisible(entry.isIntersecting && entry.intersectionRatio >= 0.99);
      },
      {
        threshold: 1.0,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // 2. Body scroll locking when fully visible
  useEffect(() => {
    if (isFullyVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullyVisible]);

  // 3. Edge Escape Logic via Wheel and Touch events
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isFullyVisible) return;

    let isEscaping = false;
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (isEscaping) return;

      if (e.deltaY < 0 && activeSlideIndex === 0) {
        isEscaping = true;
        document.body.style.overflow = '';
        window.scrollBy({ top: -100, behavior: 'smooth' });
      } else if (e.deltaY > 0 && activeSlideIndex === slides.length - 1) {
        isEscaping = true;
        document.body.style.overflow = '';
        window.scrollBy({ top: 100, behavior: 'smooth' });
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isEscaping) return;
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      // Ensure minimum swipe distance to prevent accidental triggers
      if (Math.abs(deltaY) < 10) return;

      if (deltaY < 0 && activeSlideIndex === 0) {
        isEscaping = true;
        document.body.style.overflow = '';
        window.scrollBy({ top: -100, behavior: 'smooth' });
      } else if (deltaY > 0 && activeSlideIndex === slides.length - 1) {
        isEscaping = true;
        document.body.style.overflow = '';
        window.scrollBy({ top: 100, behavior: 'smooth' });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isFullyVisible, activeSlideIndex]);

  const handleScroll = () => {
    if (containerRef.current) {
      const index = Math.round(containerRef.current.scrollTop / containerRef.current.clientHeight);
      setActiveSlideIndex(index);
    }
  };

  return (
    <section
      id="slides-section"
      ref={containerRef}
      className={`slides-container ${isFullyVisible ? 'is-visible' : ''}`}
      onScroll={handleScroll}
    >
      {slides.map((slide) => (
        <Slide key={slide.id} {...slide} />
      ))}
    </section>
  );
};
