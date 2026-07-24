import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlobalHeader } from '../../components/GlobalHeader/GlobalHeader';
import { Footer } from '../../components/Footer/Footer';
import { InscriptionForm } from '../../components/InscriptionForm/InscriptionForm';
import { useSupabaseItem } from '../../hooks/useSupabaseItem';
import type { TableName } from '../../types/content';
import './ContentDetail.css';

const BACK_LINKS: Record<TableName, { to: string; label: string }> = {
  courses: { to: '/#cursos', label: 'Volver a Cursos' },
  events: { to: '/#eventos', label: 'Volver a Eventos' },
  news: { to: '/#noticias', label: 'Volver a Noticias' },
};

interface ContentDetailProps {
  table: TableName;
}

export const ContentDetail: React.FC<ContentDetailProps> = ({ table }) => {
  const { id } = useParams<{ id: string }>();
  const { item, loading, error } = useSupabaseItem(table, id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const backLink = BACK_LINKS[table];

  return (
    <div className="content-detail-page">
      <div className="stars-bg stars-bg--fixed"></div>
      <div className="content-detail-stack">
      <GlobalHeader />

      <main className="content-detail-main">
        {loading ? (
          <p className="content-detail-status">Cargando...</p>
        ) : error || !item ? (
          <div className="content-detail-status">
            <p>{error ? `Error al cargar el contenido: ${error}` : 'No encontramos este contenido.'}</p>
            <Link to={backLink.to} className="content-detail-back">{backLink.label}</Link>
          </div>
        ) : (
          <article className="content-detail-article">
            <Link to={backLink.to} className="content-detail-back">← {backLink.label}</Link>

            {item.imageUrl && (
              <div className="content-detail-image-wrapper">
                <img src={item.imageUrl} alt={item.title} className="content-detail-image" />
              </div>
            )}

            <span className="content-detail-date">
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              {item.dateTime}
            </span>
            <h1 className="content-detail-title">{item.title}</h1>
            <p className="content-detail-description">{item.description}</p>

            {table !== 'news' && (
              <div className="content-detail-form-wrapper">
                <InscriptionForm table={table} itemId={item.id} itemTitle={item.title} />
              </div>
            )}
          </article>
        )}
      </main>

      <Footer />
      </div>
    </div>
  );
};
