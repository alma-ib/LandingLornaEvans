import React from 'react';
import { ContentList } from './ContentList/ContentList';

export const Eventos: React.FC = () => (
  <ContentList
    table="events"
    pageTitle="EVENTOS"
    seoTitle="Eventos"
    seoDescription="Eventos, congresos y observaciones de ALMA-IB: encuentros del ecosistema aeroespacial latinoamericano para especialistas y estudiantes."
    emptyLabel="Próximamente nuevos eventos."
    ctaLabel="Inscribirse"
    cardPrefix="event"
  />
);
