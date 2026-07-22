export type TableName = 'courses' | 'events' | 'news';

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  eventDate: string;
  imageUrl: string | null;
}

export const TABLE_LABELS: Record<TableName, string> = {
  courses: 'Cursos',
  events: 'Eventos',
  news: 'Noticias',
};
