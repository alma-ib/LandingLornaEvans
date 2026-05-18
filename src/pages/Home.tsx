import React from 'react';

import { Footer } from '../components/Footer/Footer';
import { GlobalHeader } from '../components/GlobalHeader/GlobalHeader';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <div className="home-container">
      <GlobalHeader />
      {/* Hero Section */}
      <section className="home-hero">
        <div className="stars-bg"></div>
        <div className="home-hero-video-placeholder"></div>
        <div className="home-hero-content">
          <div className="alma-logo-placeholder">ALMA</div>
          <h1 className="home-hero-title">ALMA-IB</h1>
          <h2 className="home-hero-subtitle">Asociación Latinoamericana de Medicina Aeroespacial, Ingeniería y Biotecnología</h2>
        </div>
      </section>

      {/* Sponsors Bar */}
      <section className="sponsors-bar">
        <div className="sponsors-track">
           <div className="sponsor-item">ACEMA</div>
           <div className="sponsor-item">AeroBar</div>
           <div className="sponsor-item">Astronomía Gualeguay</div>
           <div className="sponsor-item">Zonodev</div>
           <div className="sponsor-item">Space Tech</div>
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
