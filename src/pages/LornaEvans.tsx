import React, { useEffect } from 'react';
import { GlobalHeader } from '../components/GlobalHeader/GlobalHeader';
import { SlidesSection } from '../components/SlidesSection/SlidesSection';
import { Seo } from '../components/Seo/Seo';

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
      <Seo
        title="Lorna Evans"
        description="Médica aeroespacial argentina y referente científica: su camino desde Argentina hacia la NASA y las próximas misiones a la Luna."
        type="article"
      />
      <GlobalHeader />
      <SlidesSection />
    </div>
  );
};
