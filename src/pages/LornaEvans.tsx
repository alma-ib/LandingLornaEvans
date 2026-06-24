import React, { useEffect } from 'react';
import { GlobalHeader } from '../components/GlobalHeader/GlobalHeader';
import { SlidesSection } from '../components/SlidesSection/SlidesSection';

export const LornaEvans: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('scroll-snap-active');
    return () => {
      document.documentElement.classList.remove('scroll-snap-active');
    };
  }, []);

  return (
    <div className="lorna-evans-page">
      <GlobalHeader />
      <SlidesSection />
    </div>
  );
};
