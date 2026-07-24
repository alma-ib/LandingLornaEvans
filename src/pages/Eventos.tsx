import React from 'react';
import { ContentList } from './ContentList/ContentList';

export const Eventos: React.FC = () => (
  <ContentList
    table="events"
    pageTitle="EVENTOS"
    emptyLabel="Próximamente nuevos eventos."
    ctaLabel="Inscribirse"
    cardPrefix="event"
  />
);
