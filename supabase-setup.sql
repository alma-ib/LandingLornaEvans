-- Run this once in the Supabase SQL Editor for your new project.

create extension if not exists "pgcrypto";

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  event_date date not null,
  image_url text,
  created_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  event_date date not null,
  image_url text,
  created_at timestamptz not null default now()
);

create table public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  event_date date not null,
  image_url text,
  created_at timestamptz not null default now()
);

alter table public.courses enable row level security;
alter table public.events  enable row level security;
alter table public.news    enable row level security;

create policy "public read courses" on public.courses for select using (true);
create policy "public read events"  on public.events  for select using (true);
create policy "public read news"    on public.news    for select using (true);

create policy "auth write courses" on public.courses for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write events" on public.events for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write news" on public.news for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

insert into storage.buckets (id, name, public) values ('content-images', 'content-images', true)
  on conflict (id) do nothing;

create policy "public read content-images" on storage.objects
  for select using (bucket_id = 'content-images');
create policy "auth upload content-images" on storage.objects
  for insert to authenticated with check (bucket_id = 'content-images');
create policy "auth update content-images" on storage.objects
  for update to authenticated using (bucket_id = 'content-images');
create policy "auth delete content-images" on storage.objects
  for delete to authenticated using (bucket_id = 'content-images');

-- Seed with the content that was previously hardcoded in Home.tsx, so the
-- public site keeps showing the same cards immediately after the switch to
-- Supabase. Images point at the existing files in /public/images/ALMA-IB —
-- replace them later from the admin panel whenever you want.

insert into public.courses (title, description, event_date, image_url) values
  ('Astronomía avanzada', 'Profundiza tus conocimientos sobre el universo con expertos de la región. Exploración de agujeros negros, cosmología y evolución estelar.', '2026-07-15', '/images/ALMA-IB/curso-astronomia.png'),
  ('Mi primer telescopio', 'Aprende a usar, alinear y mantener tu equipo óptico. Ideal para principiantes que quieren dar sus primeros pasos en la observación del cielo nocturno.', '2026-07-22', '/images/ALMA-IB/curso-telescopio.png'),
  ('Medicina Aeroespacial', 'Estudia los efectos de los vuelos espaciales y la microgravedad en el cuerpo humano, y los desafíos para los futuros viajes interplanetarios de larga duración.', '2026-08-05', '/images/ALMA-IB/curso-medicina.png'),
  ('Cohetería Experimental', 'Aprende los principios físicos, diseño y aerodinámica de cohetes propulsados por combustible sólido. Talleres prácticos de simulación y construcción.', '2026-10-12', '/images/ALMA-IB/curso-coheteria.png');

insert into public.events (title, description, event_date, image_url) values
  ('Jornada de Cohetería', 'Participa en talleres prácticos y lanzamientos reales de cohetes propulsados por combustible sólido y agua.', '2026-09-12', '/images/ALMA-IB/evento-coheteria.png'),
  ('Congreso de Medicina Aeroespacial', 'Reunión anual con los mayores exponentes del continente para discutir los avances en medicina y fisiología del espacio.', '2026-10-15', '/images/ALMA-IB/evento-congreso.png'),
  ('Observación de Lluvia de Estrellas', 'Una noche única de observación astronómica con telescopios avanzados guiada por astrónomos profesionales.', '2026-11-10', '/images/ALMA-IB/evento-observacion.png'),
  ('Taller de Satélites CanSat', 'Diseña, integra y programa tu propio satélite a escala en lata y prepárate para los lanzamientos de prueba.', '2026-12-05', '/images/ALMA-IB/evento-satelite.png');

insert into public.news (title, description, event_date, image_url) values
  ('Nuevo convenio con Universidades', 'Expandimos nuestras alianzas estratégicas para fomentar la investigación aeroespacial en estudiantes de grado de toda la región.', '2026-05-28', '/images/ALMA-IB/noticia-convenio.png'),
  ('Lanzamiento exitoso del CanSat 2026', 'El último proyecto de satélite estudiantil supera todas las expectativas y logra recopilar valiosos datos atmosféricos.', '2026-06-02', '/images/ALMA-IB/noticia-cansat.png'),
  ('Beca de Investigación Aeroespacial', 'Se abren las postulaciones para la beca de investigación anual destinada a proyectos de medicina y biotecnología del espacio.', '2026-06-05', '/images/ALMA-IB/noticia-beca.png'),
  ('Webinar de Lorna Evans sobre la NASA', 'No te pierdas este webinar interactivo con Lorna Evans compartiendo sus experiencias de trabajo y colaboración con la NASA.', '2026-06-08', '/images/ALMA-IB/noticia-charla.png');

-- Inscriptions: submitted from the public "Inscribirse" form on a course or
-- event detail page. Public (anon) can insert; only the authenticated admin
-- can read/manage them.

create table public.inscriptions (
  id uuid primary key default gen_random_uuid(),
  item_table text not null check (item_table in ('courses', 'events')),
  item_id uuid not null,
  item_title text not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  message text,
  created_at timestamptz not null default now()
);

alter table public.inscriptions enable row level security;

create policy "public insert inscriptions" on public.inscriptions
  for insert with check (true);

create policy "auth manage inscriptions" on public.inscriptions for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Social links: one row per supported platform (fixed to the icon set in
-- public/images/Iconos50x50). Admin edits the url per platform from the
-- "Redes Sociales" tab; public site only shows icons with a non-null url.

create table public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text unique not null,
  url text
);

alter table public.social_links enable row level security;

create policy "public read social_links" on public.social_links for select using (true);
create policy "auth manage social_links" on public.social_links for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

insert into public.social_links (platform, url) values
  ('instagram', 'https://www.instagram.com/almaib.inc/'),
  ('linkedin', null),
  ('twitter', null),
  ('facebook', null),
  ('tiktok', null),
  ('youtube', null)
on conflict (platform) do nothing;

-- Sponsors: shown in the "Partners & Sponsors" section on Home, managed
-- from the "Sponsors" admin tab (name, logo upload, optional website url).

create table public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image_url text,
  url text,
  created_at timestamptz not null default now()
);

alter table public.sponsors enable row level security;

create policy "public read sponsors" on public.sponsors for select using (true);
create policy "auth manage sponsors" on public.sponsors for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

insert into public.sponsors (name, image_url, url) values
  ('ACEMA', '/images/ALMA-IB/acema2.png', null),
  ('AeroBar', '/images/ALMA-IB/AeroBar_20251215_234114_0000.webp', null),
  ('Astronomía Gualeguay', '/images/ALMA-IB/AtronomiaGualeguayLogoNuevo.webp', null),
  ('Zonodev', '/images/ALMA-IB/zonodev transparente.png', 'https://zonodev.ar/es/');

-- Contact form submissions, from the "CONTACTO" section on Home. Same
-- public-insert/admin-read RLS pattern as inscriptions.

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  reason text not null check (reason in ('consulta', 'curso', 'evento', 'alianza')),
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

create policy "public insert contact_submissions" on public.contact_submissions
  for insert with check (true);

create policy "auth manage contact_submissions" on public.contact_submissions for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Lets the admin mark a course/event as finished: shown in grayscale on the
-- public site and its inscription form is disabled. Added to all three
-- content tables (courses/events/news) even though the UI only surfaces it
-- for courses/events, so the shared ContentItem hooks stay schema-uniform
-- across the three tables.

alter table public.courses add column if not exists is_finished boolean not null default false;
alter table public.events  add column if not exists is_finished boolean not null default false;
alter table public.news    add column if not exists is_finished boolean not null default false;
