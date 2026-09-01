import React from 'react';
import { ContentList } from './ContentList/ContentList';

export const Noticias: React.FC = () => (
  <ContentList
    table="news"
    pageTitle="NOTICIAS"
    seoTitle="Noticias"
    seoDescription="Noticias y novedades de ALMA-IB: convenios, becas, charlas y avances de la comunidad aeroespacial de América Latina."
    emptyLabel="Próximamente nuevas noticias."
    ctaLabel="Leer más"
    cardPrefix="news"
  />
);
