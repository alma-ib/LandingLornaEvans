import React from 'react';
import { Slide } from '../Slide/Slide';
import { Footer } from '../Footer/Footer';
import { OverlappingImages } from '../OverlappingImages/OverlappingImages';
import './SlidesSection.css';

export const SlidesSection: React.FC = () => {
  const slides = [
    {
      id: 1,
      title: 'De Lanús al sueño espacial',
      description: 'Nacida en Argentina, Lorna comenzó su camino con una vocación clara: aprender, superarse y llegar más lejos de lo imaginable. Sus raíces marcaron el inicio de una historia extraordinaria.',
      imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1920&q=80',
      sideElement: <OverlappingImages imageFront="/images/LornaEvans/LornaArgNasa.avif" imageBack="/images/LornaEvans/LornaPileta.avif" />,
      buttonText: 'Ver Entrevistas'
    },
    {
      id: 2,
      title: 'Trabajando hoy para las misiones de mañana',
      description: 'Hoy se desempeña como médica aeroespacial en NASA, trabajando en desafíos reales vinculados a la salud humana y la exploración espacial. Su presente ya inspira a miles.',
      imageUrl: '/images/LornaEvans/art002e009288orig.jpg',
      sideImage: '/images/LornaEvans/LornaInstagramPhone.png',
      sideImageLink: 'https://www.instagram.com/lorna.am/',
      buttonText: 'Ver sus últimas Publicaciones'
    },
    {
      id: 3,
      title: 'La Luna como próximo objetivo',
      description: 'Su meta es formar parte de futuras misiones espaciales y convertirse en astronauta. Con la mirada puesta en la Luna, Lorna podría hacer historia para Argentina.',
      imageUrl: '/images/LornaEvans/art002e012702~large.jpg',
      buttonText: 'Ver Mas'
    }
  ];

  return (
    <section id="slides-section" className="slides-container">
      {slides.map((slide) => (
        <Slide key={slide.id} {...slide} />
      ))}
      <Footer />
    </section>
  );
};
