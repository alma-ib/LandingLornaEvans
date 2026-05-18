import React from 'react';
import { Navbar } from '../components/Navbar/Navbar';
import { Hero } from '../components/Hero/Hero';
import { SlidesSection } from '../components/SlidesSection/SlidesSection';

export const LornaEvans: React.FC = () => {
  return (
    <div className="lorna-evans-page">
      <Navbar />
      <Hero />
      <SlidesSection />
    </div>
  );
};
