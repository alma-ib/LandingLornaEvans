import React, { useRef, useEffect } from 'react';

import { Footer } from '../components/Footer/Footer';
import { GlobalHeader } from '../components/GlobalHeader/GlobalHeader';
import './Home.css';

export const Home: React.FC = () => {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const logoFixedRef = useRef<HTMLDivElement>(null);
  const logoFlowRef  = useRef<HTMLDivElement>(null);

  // ── Effect 1: unlock video for programmatic seeking ─────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const unlock = () => {
      video.play()
        .then(() => { video.pause(); video.currentTime = 0; })
        .catch(() => {});
    };
    if (video.readyState >= 2) unlock();
    else video.addEventListener('canplay', unlock, { once: true });
  }, []);

  // ── Effect 2: video scroll-scrubbing (independent rAF loop) ──────────────
  useEffect(() => {
    let rafId: number;
    let lastScrollY = -1;

    const scrub = () => {
      const scrollY = window.pageYOffset;
      if (scrollY !== lastScrollY) {
        lastScrollY = scrollY;
        const video = videoRef.current;
        if (video && video.duration > 0) {
          // Linear scrub: full hero height (100vh) maps to full video duration
          const progress = Math.min(scrollY / window.innerHeight, 1);
          video.currentTime = progress * video.duration;
        }
      }
      rafId = requestAnimationFrame(scrub);
    };

    rafId = requestAnimationFrame(scrub);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // ── Effect 3: logo scroll animation (independent rAF loop) ───────────────
  useEffect(() => {
    let rafId: number;
    let lastScrollY = -1;

    const animate = () => {
      const scrollY = window.pageYOffset;
      if (scrollY !== lastScrollY) {
        lastScrollY = scrollY;

        const logo = logoFixedRef.current;
        if (logo) {
          const heroHeight = window.innerHeight;

          // Animation completes when user reaches 60% of hero scroll
          const raw = Math.min(scrollY / (heroHeight * 0.6), 1);
          // easeInOut
          const p = raw < 0.5
            ? 2 * raw * raw
            : 1 - Math.pow(-2 * raw + 2, 2) / 2;

          // Target: left side of fixed header
          // Navbar padding: 40px desktop, 20px mobile → logo center lands there
          const endX = window.innerWidth < 768 ? 50 : 76;
          const endY = 33; // center of 65px-tall scrolled header

          // CSS owns left:50vw top:42vh — only transform is touched here
          const dx = (endX - window.innerWidth  * 0.5) * p;
          const dy = (endY - window.innerHeight * 0.42) * p;

          // Scale: 120px → 70px  (ratio ≈ 0.583)
          const scale = 1 - (1 - 70 / 120) * p;

          logo.style.transform =
            `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${scale.toFixed(4)})`;
        }
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="home-container">
      <GlobalHeader />

      {/* Fixed animated logo */}
      <div ref={logoFixedRef} className="alma-logo-fixed">
        <img src="/images/Alma-ib/logo-alma-ib.png" alt="ALMA-IB" />
      </div>

      {/* Hero Section */}
      <section className="home-hero">
        <div className="stars-bg"></div>

        {/* Scroll-scrubbed video background */}
        <video
          ref={videoRef}
          className="home-hero-video"
          muted
          playsInline
          preload="auto"
        >
          <source src="/images/Alma-ib/10343918-hd_24fps_H264.mp4" type="video/mp4" />
        </video>
        <div className="home-hero-video-overlay"></div>

        <div className="home-hero-content">
          {/* Invisible spacer that keeps layout as if logo were in flow */}
          <div ref={logoFlowRef} className="alma-logo-flow">
            <img src="/images/Alma-ib/logo-alma-ib.png" alt="" aria-hidden="true" />
          </div>
          <h1 className="home-hero-title">ALMA-IB</h1>
          <h2 className="home-hero-subtitle">Asociación Latinoamericana de Medicina Aeroespacial, Ingeniería y Biotecnología</h2>
        </div>
      </section>

      {/* Sponsors Bar */}
      <section className="sponsors-bar">
        <div className="sponsors-inner">
          <div className="sponsors-header">
            <h2 className="sponsors-title">Partners & Sponsors</h2>
            <p className="sponsors-subtitle">
              Gracias a quienes hacen posible esta misión. Si tu organización quiere ser parte de un proyecto que inspira a la próxima generación espacial latinoamericana, ¡sumate!
            </p>
            <a href="#contacto" className="cta-button sponsors-cta">Quiero ser sponsor</a>
          </div>
          <div className="sponsors-track">
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

      {/* NOSOTROS */}
      <section id="nosotros" className="home-section">
        <h2 className="section-title">NOSOTROS</h2>
        <div className="section-content-center">
          <p className="section-description">
            Nuestra misión es impulsar la ciencia y tecnología aeroespacial en Latinoamérica, conectando profesionales y entusiastas en medicina, ingeniería y biotecnología.
          </p>
          <button className="cta-button">Ver más</button>
        </div>
      </section>

      {/* CURSOS */}
      <section id="cursos" className="home-section alt-bg">
        <h2 className="section-title">CURSOS</h2>
        <div className="grid-container">
          <div className="grid-card">
            <h3>Astronomía avanzada</h3>
            <p>Profundiza tus conocimientos sobre el universo con expertos de la región.</p>
          </div>
          <div className="grid-card">
            <h3>Mi primer telescopio</h3>
            <p>Aprende a usar y mantener tu equipo, ideal para principiantes.</p>
          </div>
        </div>
        <div className="section-action">
          <button className="cta-button">Ver más</button>
        </div>
      </section>

      {/* EVENTOS */}
      <section id="eventos" className="home-section">
        <h2 className="section-title">EVENTOS</h2>
        <div className="grid-container">
          <div className="grid-card">
            <h3>Jornada de Cohetería</h3>
            <p className="event-date">Próximamente</p>
            <p>Participa en talleres prácticos y lanzamientos reales.</p>
          </div>
          <div className="grid-card">
            <h3>Congreso de Medicina Aeroespacial</h3>
            <p className="event-date">Octubre 2026</p>
            <p>Reunión anual con los mayores exponentes del continente.</p>
          </div>
        </div>
        <div className="section-action">
          <button className="cta-button">Ver más</button>
        </div>
      </section>

      {/* NOTICIAS */}
      <section id="noticias" className="home-section alt-bg">
        <h2 className="section-title">NOTICIAS</h2>
        <div className="news-feed">
          <div className="news-item">
            <div className="news-content">
              <h3>Nuevo convenio firmado con Universidades</h3>
              <p>Expandimos nuestras alianzas estratégicas para fomentar la investigación en estudiantes de grado.</p>
            </div>
          </div>
          <div className="news-item">
            <div className="news-content">
              <h3>Lanzamiento exitoso del CanSat 2026</h3>
              <p>El último proyecto estudiantil supera las expectativas y logra recopilar datos atmosféricos valiosos.</p>
            </div>
          </div>
        </div>
        <div className="section-action">
          <button className="cta-button">Ver más</button>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="home-section">
        <h2 className="section-title">CONTACTO</h2>
        <div className="contact-container">
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <input type="text" placeholder="Nombre" className="form-input" required />
              <input type="text" placeholder="Apellido" className="form-input" required />
            </div>
            <input type="email" placeholder="Email" className="form-input" required />
            <select className="form-input" defaultValue="" required>
              <option value="" disabled>Motivo de contacto...</option>
              <option value="consulta">Consulta General</option>
              <option value="curso">Inscripción a Cursos</option>
              <option value="evento">Eventos</option>
              <option value="alianza">Alianza / Patrocinio</option>
            </select>
            <textarea placeholder="Mensaje" rows={5} className="form-textarea" required></textarea>
            <button type="submit" className="cta-button submit-btn">Enviar Mensaje</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};
