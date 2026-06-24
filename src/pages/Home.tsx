import React, { useState, useEffect } from 'react';

import { Footer } from '../components/Footer/Footer';
import { GlobalHeader } from '../components/GlobalHeader/GlobalHeader';
import './Home.css';
import { Hero } from '../components/Hero/Hero';

interface Course {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  imageUrl: string;
}

const COURSES: Course[] = [
  {
    id: 1,
    title: "Astronomía avanzada",
    description: "Profundiza tus conocimientos sobre el universo con expertos de la región. Exploración de agujeros negros, cosmología y evolución estelar.",
    dateTime: "15/07/2026",
    imageUrl: "/images/ALMA-IB/curso-astronomia.png",
  },
  {
    id: 2,
    title: "Mi primer telescopio",
    description: "Aprende a usar, alinear y mantener tu equipo óptico. Ideal para principiantes que quieren dar sus primeros pasos en la observación del cielo nocturno.",
    dateTime: "22/07/2026",
    imageUrl: "/images/ALMA-IB/curso-telescopio.png",
  },
  {
    id: 3,
    title: "Medicina Aeroespacial",
    description: "Estudia los efectos de los vuelos espaciales y la microgravedad en el cuerpo humano, y los desafíos para los futuros viajes interplanetarios de larga duración.",
    dateTime: "5/08/2026",
    imageUrl: "/images/ALMA-IB/curso-medicina.png",
  },
  {
    id: 4,
    title: "Cohetería Experimental",
    description: "Aprende los principios físicos, diseño y aerodinámica de cohetes propulsados por combustible sólido. Talleres prácticos de simulación y construcción.",
    dateTime: "12/10/2026",
    imageUrl: "/images/ALMA-IB/curso-coheteria.png",
  },
];

interface EventItem {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  imageUrl: string;
}

const EVENTS: EventItem[] = [
  {
    id: 1,
    title: "Jornada de Cohetería",
    description: "Participa en talleres prácticos y lanzamientos reales de cohetes propulsados por combustible sólido y agua.",
    dateTime: "12/09/2026",
    imageUrl: "/images/ALMA-IB/evento-coheteria.png",
  },
  {
    id: 2,
    title: "Congreso de Medicina Aeroespacial",
    description: "Reunión anual con los mayores exponentes del continente para discutir los avances en medicina y fisiología del espacio.",
    dateTime: "15/10/2026",
    imageUrl: "/images/ALMA-IB/evento-congreso.png",
  },
  {
    id: 3,
    title: "Observación de Lluvia de Estrellas",
    description: "Una noche única de observación astronómica con telescopios avanzados guiada por astrónomos profesionales.",
    dateTime: "10/11/2026",
    imageUrl: "/images/ALMA-IB/evento-observacion.png",
  },
  {
    id: 4,
    title: "Taller de Satélites CanSat",
    description: "Diseña, integra y programa tu propio satélite a escala en lata y prepárate para los lanzamientos de prueba.",
    dateTime: "05/12/2026",
    imageUrl: "/images/ALMA-IB/evento-satelite.png",
  },
];

interface NewsItem {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  imageUrl: string;
}

const NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Nuevo convenio con Universidades",
    description: "Expandimos nuestras alianzas estratégicas para fomentar la investigación aeroespacial en estudiantes de grado de toda la región.",
    dateTime: "28/05/2026",
    imageUrl: "/images/ALMA-IB/noticia-convenio.png",
  },
  {
    id: 2,
    title: "Lanzamiento exitoso del CanSat 2026",
    description: "El último proyecto de satélite estudiantil supera todas las expectativas y logra recopilar valiosos datos atmosféricos.",
    dateTime: "02/06/2026",
    imageUrl: "/images/ALMA-IB/noticia-cansat.png",
  },
  {
    id: 3,
    title: "Beca de Investigación Aeroespacial",
    description: "Se abren las postulaciones para la beca de investigación anual destinada a proyectos de medicina y biotecnología del espacio.",
    dateTime: "05/06/2026",
    imageUrl: "/images/ALMA-IB/noticia-beca.png",
  },
  {
    id: 4,
    title: "Webinar de Lorna Evans sobre la NASA",
    description: "No te pierdas este webinar interactivo con Lorna Evans compartiendo sus experiencias de trabajo y colaboración con la NASA.",
    dateTime: "08/06/2026",
    imageUrl: "/images/ALMA-IB/noticia-charla.png",
  },
];

interface Pillar {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const PILLARS: Pillar[] = [
  {
    id: 1,
    title: "Medicina Aeroespacial",
    description: "Investigamos los efectos del espacio en el cuerpo humano para garantizar la salud en futuras misiones tripuladas.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Ingeniería Espacial",
    description: "Desarrollamos proyectos de cohetes, satélites y tecnologías de punta para el sector aeroespacial latinoamericano.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Biotecnología",
    description: "Exploramos aplicaciones biotecnológicas para los desafíos de la vida en el espacio, desde fisiología hasta bioingeniería.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1"/>
        <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z"/>
        <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Comunidad Regional",
    description: "Conectamos especialistas, instituciones y comunidades educativas de toda América Latina para fortalecer el ecosistema espacial.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
];

export const Home: React.FC = () => {
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isNosotrosSlide, setIsNosotrosSlide] = useState(window.innerWidth <= 640);

  // Drag states for Courses
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  // States and Drag states for Events
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isEventDragging, setIsEventDragging] = useState(false);
  const [eventDragStartX, setEventDragStartX] = useState(0);
  const [eventDragOffset, setEventDragOffset] = useState(0);

  // States and Drag states for News
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isNewsDragging, setIsNewsDragging] = useState(false);
  const [newsDragStartX, setNewsDragStartX] = useState(0);
  const [newsDragOffset, setNewsDragOffset] = useState(0);

  // States and Drag states for Nosotros pillars
  const [currentNosotrosIndex, setCurrentNosotrosIndex] = useState(0);
  const [isNosotrosDragging, setIsNosotrosDragging] = useState(false);
  const [nosotrosDragStartX, setNosotrosDragStartX] = useState(0);
  const [nosotrosDragOffset, setNosotrosDragOffset] = useState(0);

  // Form states
  const [contactNombre, setContactNombre] = useState("");
  const [contactApellido, setContactApellido] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMotivo, setContactMotivo] = useState("");
  const [contactMensaje, setContactMensaje] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsNosotrosSlide(window.innerWidth <= 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('scroll-snap-active');
    return () => {
      document.documentElement.classList.remove('scroll-snap-active');
    };
  }, []);

  // Sync indices on resize
  useEffect(() => {
    const maxIndex = isMobile ? COURSES.length - 1 : COURSES.length - 2;
    if (currentCourseIndex > maxIndex) {
      setCurrentCourseIndex(maxIndex);
    }
  }, [isMobile, currentCourseIndex]);

  useEffect(() => {
    const maxIndex = isMobile ? EVENTS.length - 1 : EVENTS.length - 2;
    if (currentEventIndex > maxIndex) {
      setCurrentEventIndex(maxIndex);
    }
  }, [isMobile, currentEventIndex]);

  useEffect(() => {
    const maxIndex = isMobile ? NEWS.length - 1 : NEWS.length - 2;
    if (currentNewsIndex > maxIndex) {
      setCurrentNewsIndex(maxIndex);
    }
  }, [isMobile, currentNewsIndex]);

  // Navigation helpers for Courses
  const nextSlide = () => {
    const totalSlides = isMobile ? COURSES.length : COURSES.length - 1;
    setCurrentCourseIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    const totalSlides = isMobile ? COURSES.length : COURSES.length - 1;
    setCurrentCourseIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const setSlide = (index: number) => {
    setCurrentCourseIndex(index);
  };

  // Navigation helpers for Events
  const nextEventSlide = () => {
    const totalSlides = isMobile ? EVENTS.length : EVENTS.length - 1;
    setCurrentEventIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevEventSlide = () => {
    const totalSlides = isMobile ? EVENTS.length : EVENTS.length - 1;
    setCurrentEventIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const setEventSlide = (index: number) => {
    setCurrentEventIndex(index);
  };

  // Navigation helpers for News
  const nextNewsSlide = () => {
    const totalSlides = isMobile ? NEWS.length : NEWS.length - 1;
    setCurrentNewsIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevNewsSlide = () => {
    const totalSlides = isMobile ? NEWS.length : NEWS.length - 1;
    setCurrentNewsIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const setNewsSlide = (index: number) => {
    setCurrentNewsIndex(index);
  };

  // Courses drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button, a')) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
    setIsAutoplayPaused(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - dragStartX;
    setDragOffset(diff);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    const threshold = 60;
    const totalSlides = isMobile ? COURSES.length : COURSES.length - 1;

    if (dragOffset < -threshold) {
      setCurrentCourseIndex((prev) => (prev + 1) % totalSlides);
    } else if (dragOffset > threshold) {
      setCurrentCourseIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    }

    setDragOffset(0);
    setIsAutoplayPaused(false);
  };

  // Events drag handlers
  const handleEventPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button, a')) return;
    setIsEventDragging(true);
    setEventDragStartX(e.clientX);
    setEventDragOffset(0);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleEventPointerMove = (e: React.PointerEvent) => {
    if (!isEventDragging) return;
    const currentX = e.clientX;
    const diff = currentX - eventDragStartX;
    setEventDragOffset(diff);
  };

  const handleEventPointerUp = (e: React.PointerEvent) => {
    if (!isEventDragging) return;
    setIsEventDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    const threshold = 60;
    const totalSlides = isMobile ? EVENTS.length : EVENTS.length - 1;

    if (eventDragOffset < -threshold) {
      setCurrentEventIndex((prev) => (prev + 1) % totalSlides);
    } else if (eventDragOffset > threshold) {
      setCurrentEventIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    }

    setEventDragOffset(0);
  };

  // News drag handlers
  const handleNewsPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button, a')) return;
    setIsNewsDragging(true);
    setNewsDragStartX(e.clientX);
    setNewsDragOffset(0);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleNewsPointerMove = (e: React.PointerEvent) => {
    if (!isNewsDragging) return;
    const currentX = e.clientX;
    const diff = currentX - newsDragStartX;
    setNewsDragOffset(diff);
  };

  const handleNewsPointerUp = (e: React.PointerEvent) => {
    if (!isNewsDragging) return;
    setIsNewsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    const threshold = 60;
    const totalSlides = isMobile ? NEWS.length : NEWS.length - 1;

    if (newsDragOffset < -threshold) {
      setCurrentNewsIndex((prev) => (prev + 1) % totalSlides);
    } else if (newsDragOffset > threshold) {
      setCurrentNewsIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    }

    setNewsDragOffset(0);
  };

  // Nosotros drag handlers
  const handleNosotrosPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button, a')) return;
    setIsNosotrosDragging(true);
    setNosotrosDragStartX(e.clientX);
    setNosotrosDragOffset(0);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleNosotrosPointerMove = (e: React.PointerEvent) => {
    if (!isNosotrosDragging) return;
    setNosotrosDragOffset(e.clientX - nosotrosDragStartX);
  };

  const handleNosotrosPointerUp = (e: React.PointerEvent) => {
    if (!isNosotrosDragging) return;
    setIsNosotrosDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (nosotrosDragOffset < -60) {
      setCurrentNosotrosIndex((prev) => (prev + 1) % PILLARS.length);
    } else if (nosotrosDragOffset > 60) {
      setCurrentNosotrosIndex((prev) => (prev - 1 + PILLARS.length) % PILLARS.length);
    }
    setNosotrosDragOffset(0);
  };

  useEffect(() => {
    if (isAutoplayPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplayPaused]);
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.12,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach((el) => observer.observe(el));

    return () => {
      elementsToReveal.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="home-container">
      <GlobalHeader />


      {/* Hero Section */}
      <section className="home-hero">
        <div className="stars-bg"></div>

        {/* Autoplay looping video background */}
        <video
          className="home-hero-video"
          muted
          playsInline
          preload="auto"
          autoPlay
          loop
        >
          <source src="/images/ALMA-IB/10343918-hd_24fps_H264.mp4" type="video/mp4" />
        </video>
        <div className="home-hero-video-overlay"></div>

        <div className="home-hero-content">
          {/* Logo inside the Hero content */}
          <div className="alma-logo-hero">
            <img src="/images/ALMA-IB/logo-alma-ib.png" alt="ALMA-IB Logo" />
          </div>
          <h1 className="home-hero-title">ALMA-IB</h1>
          <h2 className="home-hero-subtitle">Asociación Latinoamericana de Medicina Aeroespacial, Ingeniería y Biotecnología</h2>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="home-section">
        <h2 className="section-title reveal">NOSOTROS</h2>
        <p className="nosotros-intro reveal reveal-delay-1">
          La Asociación Latinoamericana de Medicina Aeroespacial, Ingeniería y Biotecnología (ALMA-IB) impulsa el desarrollo científico, tecnológico y académico del sector aeroespacial en América Latina.
        </p>

        {isNosotrosSlide ? (
          /* Slideshow — mobile ≤640px */
          <div
            className="slideshow-wrapper nosotros-slideshow-wrapper reveal reveal-scale reveal-delay-1"
            onPointerDown={handleNosotrosPointerDown}
            onPointerMove={handleNosotrosPointerMove}
            onPointerUp={handleNosotrosPointerUp}
            onPointerCancel={handleNosotrosPointerUp}
            style={{ touchAction: 'pan-y', cursor: isNosotrosDragging ? 'grabbing' : 'grab' }}
          >
            <button className="slideshow-arrow prev" onClick={() => setCurrentNosotrosIndex((p) => (p - 1 + PILLARS.length) % PILLARS.length)} aria-label="Anterior">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button className="slideshow-arrow next" onClick={() => setCurrentNosotrosIndex((p) => (p + 1) % PILLARS.length)} aria-label="Siguiente">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <div className="slideshow-track-outer">
              <div
                className="slideshow-track"
                style={{
                  transform: `translateX(calc(-${currentNosotrosIndex * 100}% + ${nosotrosDragOffset}px))`,
                  transition: isNosotrosDragging ? 'none' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                  pointerEvents: isNosotrosDragging ? 'none' : 'auto',
                }}
              >
                {PILLARS.map((pillar) => (
                  <div className="slideshow-slide" key={pillar.id}>
                    <div className="nosotros-card nosotros-card--slide">
                      <div className="nosotros-card-icon">{pillar.icon}</div>
                      <h3 className="nosotros-card-title">{pillar.title}</h3>
                      <p className="nosotros-card-description">{pillar.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="slideshow-dots">
              {PILLARS.map((_, index) => (
                <button
                  key={index}
                  className={`slideshow-dot ${index === currentNosotrosIndex ? 'active' : ''}`}
                  onClick={() => setCurrentNosotrosIndex(index)}
                  aria-label={`Ir a diapositiva ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Grid — desktop >640px */
          <div className="nosotros-grid">
            {PILLARS.map((pillar, i) => (
              <div key={pillar.id} className={`nosotros-card reveal reveal-scale reveal-delay-${i + 1}`}>
                <div className="nosotros-card-icon">{pillar.icon}</div>
                <h3 className="nosotros-card-title">{pillar.title}</h3>
                <p className="nosotros-card-description">{pillar.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <Hero />

      {/* CURSOS */}
      <section id="cursos" className="home-section alt-bg">
        <h2 className="section-title reveal">CURSOS</h2>

        <div
          className="slideshow-wrapper reveal reveal-scale reveal-delay-1"
          onMouseEnter={() => setIsAutoplayPaused(true)}
          onMouseLeave={() => setIsAutoplayPaused(false)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: 'pan-y', cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {/* Controls */}
          <button className="slideshow-arrow prev" onClick={prevSlide} aria-label="Anterior">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <button className="slideshow-arrow next" onClick={nextSlide} aria-label="Siguiente">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          {/* Slides Track Outer */}
          <div className="slideshow-track-outer">
            <div
              className="slideshow-track"
              style={{
                transform: `translateX(calc(-${currentCourseIndex * (isMobile ? 100 : 50)}% + ${dragOffset}px))`,
                transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                pointerEvents: isDragging ? 'none' : 'auto'
              }}
            >
              {COURSES.map((course) => (
                <div className="slideshow-slide" key={course.id}>
                  <div className="course-card">
                    <div className="course-image-wrapper">
                      <img src={course.imageUrl} alt={course.title} className="course-image" draggable="false" />
                      <div className="course-image-overlay"></div>
                    </div>
                    <div className="course-content">
                      <span className="course-date-badge">
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="clock-icon"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        {course.dateTime}
                      </span>
                      <h3 className="course-title">{course.title}</h3>
                      <p className="course-description">{course.description}</p>
                      <a className="cta-button course-enroll-btn" href="https://www.instagram.com/almaib.inc/" target="_blank" rel="noopener noreferrer">
                        Inscribirse
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicators */}
          <div className="slideshow-dots">
            {Array.from({ length: isMobile ? COURSES.length : COURSES.length - 1 }).map((_, index) => (
              <button
                key={index}
                className={`slideshow-dot ${index === currentCourseIndex ? 'active' : ''}`}
                onClick={() => setSlide(index)}
                aria-label={`Ir a diapositiva ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* EVENTOS */}
      <section id="eventos" className="home-section">
        <h2 className="section-title reveal">EVENTOS</h2>

        <div
          className="slideshow-wrapper reveal reveal-scale reveal-delay-1"
          onPointerDown={handleEventPointerDown}
          onPointerMove={handleEventPointerMove}
          onPointerUp={handleEventPointerUp}
          onPointerCancel={handleEventPointerUp}
          style={{ touchAction: 'pan-y', cursor: isEventDragging ? 'grabbing' : 'grab' }}
        >
          {/* Controls */}
          <button className="slideshow-arrow prev" onClick={prevEventSlide} aria-label="Anterior">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <button className="slideshow-arrow next" onClick={nextEventSlide} aria-label="Siguiente">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          {/* Slides Track Outer */}
          <div className="slideshow-track-outer">
            <div
              className="slideshow-track"
              style={{
                transform: `translateX(calc(-${currentEventIndex * (isMobile ? 100 : 50)}% + ${eventDragOffset}px))`,
                transition: isEventDragging ? 'none' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                pointerEvents: isEventDragging ? 'none' : 'auto'
              }}
            >
              {EVENTS.map((event) => (
                <div className="slideshow-slide" key={event.id}>
                  <div className="event-card">
                    <div className="event-image-wrapper">
                      <img src={event.imageUrl} alt={event.title} className="event-image" draggable="false" />
                      <div className="event-image-overlay"></div>
                    </div>
                    <div className="event-content">
                      <span className="event-date-badge">
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="clock-icon"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        {event.dateTime}
                      </span>
                      <h3 className="event-title">{event.title}</h3>
                      <p className="event-description">{event.description}</p>
                      <a className="cta-button event-enroll-btn" href="https://www.instagram.com/almaib.inc/" target="_blank" rel="noopener noreferrer">
                        Inscribirse
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicators */}
          <div className="slideshow-dots">
            {Array.from({ length: isMobile ? EVENTS.length : EVENTS.length - 1 }).map((_, index) => (
              <button
                key={index}
                className={`slideshow-dot ${index === currentEventIndex ? 'active' : ''}`}
                onClick={() => setEventSlide(index)}
                aria-label={`Ir a diapositiva ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* NOTICIAS */}
      <section id="noticias" className="home-section alt-bg">
        <h2 className="section-title reveal">NOTICIAS</h2>

        <div
          className="slideshow-wrapper reveal reveal-scale reveal-delay-1"
          onPointerDown={handleNewsPointerDown}
          onPointerMove={handleNewsPointerMove}
          onPointerUp={handleNewsPointerUp}
          onPointerCancel={handleNewsPointerUp}
          style={{ touchAction: 'pan-y', cursor: isNewsDragging ? 'grabbing' : 'grab' }}
        >
          {/* Controls */}
          <button className="slideshow-arrow prev" onClick={prevNewsSlide} aria-label="Anterior">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <button className="slideshow-arrow next" onClick={nextNewsSlide} aria-label="Siguiente">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          {/* Slides Track Outer */}
          <div className="slideshow-track-outer">
            <div
              className="slideshow-track"
              style={{
                transform: `translateX(calc(-${currentNewsIndex * (isMobile ? 100 : 50)}% + ${newsDragOffset}px))`,
                transition: isNewsDragging ? 'none' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                pointerEvents: isNewsDragging ? 'none' : 'auto'
              }}
            >
              {NEWS.map((news) => (
                <div className="slideshow-slide" key={news.id}>
                  <div className="news-card">
                    <div className="news-image-wrapper">
                      <img src={news.imageUrl} alt={news.title} className="news-image" draggable="false" />
                      <div className="news-image-overlay"></div>
                    </div>
                    <div className="news-content">
                      <span className="news-date-badge">
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="clock-icon"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        {news.dateTime}
                      </span>
                      <h3 className="news-title">{news.title}</h3>
                      <p className="news-description">{news.description}</p>
                      <a className="cta-button news-enroll-btn" href="https://www.instagram.com/almaib.inc/" target="_blank" rel="noopener noreferrer">
                        Leer más
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicators */}
          <div className="slideshow-dots">
            {Array.from({ length: isMobile ? NEWS.length : NEWS.length - 1 }).map((_, index) => (
              <button
                key={index}
                className={`slideshow-dot ${index === currentNewsIndex ? 'active' : ''}`}
                onClick={() => setNewsSlide(index)}
                aria-label={`Ir a diapositiva ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Bar */}
      <section className="sponsors-bar">
        <div className="sponsors-inner">
          <div className="sponsors-header reveal reveal-left">
            <h2 className="sponsors-title">Partners & Sponsors</h2>
            <p className="sponsors-subtitle">
              Gracias a quienes hacen posible esta misión. Si tu organización quiere ser parte de un proyecto que inspira a la próxima generación espacial latinoamericana, ¡sumate!
            </p>
            <a href="#contacto" className="cta-button sponsors-cta">Quiero ser sponsor</a>
          </div>
          <div className="sponsors-track reveal reveal-right reveal-delay-1">
            <div className="sponsor-item">
              <img src="/images/ALMA-IB/acema2.png" alt="ACEMA" className="sponsor-logo" />
            </div>
            <div className="sponsor-item">
              <img src="/images/ALMA-IB/AeroBar_20251215_234114_0000.webp" alt="AeroBar" className="sponsor-logo" />
            </div>
            <div className="sponsor-item">
              <img src="/images/ALMA-IB/AtronomiaGualeguayLogoNuevo.webp" alt="Astronomía Gualeguay" className="sponsor-logo" />
            </div>
            <div className="sponsor-item">
              <img src="/images/ALMA-IB/zonodev transparente.png" alt="Zonodev" className="sponsor-logo" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="contact-section-wrapper">
        <div className="contact-inner">
          <h2 className="section-title reveal">CONTACTO</h2>
          <div className="contact-container reveal reveal-scale reveal-delay-1">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="form-input"
                  value={contactNombre}
                  onChange={(e) => setContactNombre(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  className="form-input"
                  value={contactApellido}
                  onChange={(e) => setContactApellido(e.target.value)}
                  required
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="form-input"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
              />
              <select
                className="form-input"
                value={contactMotivo}
                onChange={(e) => setContactMotivo(e.target.value)}
                required
              >
                <option value="" disabled>Motivo de contacto...</option>
                <option value="consulta">Consulta General</option>
                <option value="curso">Inscripción a Cursos</option>
                <option value="evento">Eventos</option>
                <option value="alianza">Alianza / Patrocinio</option>
              </select>
              <textarea
                placeholder="Mensaje"
                rows={5}
                className="form-textarea"
                value={contactMensaje}
                onChange={(e) => setContactMensaje(e.target.value)}
                required
              ></textarea>
              <button type="submit" className="cta-button submit-btn">Enviar Mensaje</button>
            </form>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
};
