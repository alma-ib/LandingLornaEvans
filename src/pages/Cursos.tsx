import React from 'react';
import { ContentList } from './ContentList/ContentList';

export const Cursos: React.FC = () => (
  <ContentList
    table="courses"
    pageTitle="CURSOS"
    seoTitle="Cursos"
    seoDescription="Cursos de ALMA-IB en medicina aeroespacial, cohetería, astronomía e ingeniería espacial. Formación abierta para la comunidad de América Latina."
    emptyLabel="Próximamente nuevos cursos."
    ctaLabel="Inscribirse"
    cardPrefix="course"
  />
);
